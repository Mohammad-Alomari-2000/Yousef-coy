import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRisk,
  getDeviceState,
  getNetworkStatus,
  generatePingResult,
  calculateRtoRpo,
  evaluateBackup,
  formatTime
} from './incidentLogic.ts';

test('Time formatting handles edge cases', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(135), '02:15');
  assert.equal(formatTime(405), '06:45');
  assert.equal(formatTime(600), '10:00');
  assert.equal(formatTime(999), '10:00'); // Clamped
});

test('Network status correctly transitions across incident milestones', () => {
  // Before 02:15
  assert.equal(getNetworkStatus(0, false).status, 'normal');
  assert.equal(getNetworkStatus(134, false).status, 'normal');

  // 02:15 to 06:44
  assert.equal(getNetworkStatus(135, false).status, 'suspicious');
  assert.equal(getNetworkStatus(404, false).status, 'suspicious');

  // 06:45 to 10:00
  assert.equal(getNetworkStatus(405, false).status, 'under_attack');
  assert.equal(getNetworkStatus(600, false).status, 'under_attack');

  // When contained
  assert.equal(getNetworkStatus(405, true).status, 'contained');
});

test('Device states reflect clock and containment', () => {
  // AD Server at 00:00 (vulnerable)
  assert.equal(getDeviceState('192.168.1.10', 0, false), 'vulnerable');
  // AD Server at 07:00 (420s) -> compromised
  assert.equal(getDeviceState('192.168.1.10', 420, false), 'compromised');
  // AD Server at 10:00 (600s) -> encrypted
  assert.equal(getDeviceState('192.168.1.10', 600, false), 'encrypted');

  // Isolated VLAN is always isolated
  assert.equal(getDeviceState('192.168.2.15', 0, false), 'isolated');
  assert.equal(getDeviceState('192.168.2.15', 500, false), 'isolated');
});

test('Risk formula matches (T x V x I) / 125 * 100 with 33/66/100 thresholds', () => {
  // Low: 1 x 1 x 1 = 1 / 125 * 100 = 0.8% -> low
  const lowRisk = calculateRisk(1, 1, 1);
  assert.equal(lowRisk.level, 'low');
  assert.ok(lowRisk.score <= 33);

  // Medium: 3 x 3 x 3 = 27 / 125 * 100 = 21.6 -> wait, let's test 4 x 4 x 3 = 48 / 125 * 100 = 38.4%
  const medRisk = calculateRisk(4, 4, 3);
  assert.equal(medRisk.level, 'medium');
  assert.ok(medRisk.score >= 34 && medRisk.score <= 66);

  // High: 5 x 5 x 5 = 125 / 125 * 100 = 100%
  const highRisk = calculateRisk(5, 5, 5);
  assert.equal(highRisk.level, 'high');
  assert.equal(highRisk.score, 100);
});

test('Ping Tool responds appropriately to clock state and target IP', () => {
  // Test requirement from prompt:
  // "FINAL CHECK: set the clock to 00:00 and ping 192.168.1.10 (should be green/vulnerable), then set it to 07:00 and ping again (must be red). Verify every slide reflects the same clock state."
  const pingAt0 = generatePingResult('192.168.1.10', 0, false);
  assert.equal(pingAt0.status, 'vulnerable');
  assert.equal(pingAt0.badgeColor, 'amber');

  const pingAt7 = generatePingResult('192.168.1.10', 420, false); // 07:00 is 420s
  assert.equal(pingAt7.status, 'compromised');
  assert.equal(pingAt7.badgeColor, 'rose');
  assert.ok(pingAt7.lines.some(l => l.includes('203.0.113.45:443')));

  // Test VLAN isolation
  const pingVlan = generatePingResult('192.168.2.22', 0, false);
  assert.equal(pingVlan.status, 'isolated');
  assert.equal(pingVlan.badgeColor, 'indigo');

  // Test invalid IP
  const pingBad = generatePingResult('999.999.1.1', 0, false);
  assert.equal(pingBad.status, 'unreachable');
});

test('Backup logic: Incremental requires 5 sets on Thursday; Differential requires 2 sets', () => {
  const inc = evaluateBackup('incremental', 'thursday');
  assert.equal(inc.totalSetsCount, 5);

  const diff = evaluateBackup('differential', 'thursday');
  assert.equal(diff.totalSetsCount, 2);
});

test('RTO and RPO calculation', () => {
  const res = calculateRtoRpo(4, 1000, 100);
  assert.equal(res.rpoHours, 4);
  assert.ok(res.rtoHours > 0);
});
