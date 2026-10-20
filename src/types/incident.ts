export type DeviceState = 'safe' | 'vulnerable' | 'compromised' | 'encrypted' | 'isolated' | 'contained';

export type NetworkStatus = 'normal' | 'suspicious' | 'under_attack' | 'contained';

export interface DeviceInfo {
  id: string;
  name: string;
  ip: string;
  role: string;
  vlan: string;
  os: string;
  riskyPort?: string;
}

export interface IncidentMilestone {
  timeInSeconds: number; // 0 to 600
  timeString: string; // '00:00' to '10:00'
  titleAr: string;
  descriptionAr: string;
  killChainPhase: string;
  affectedDevices: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface PingReply {
  status: 'safe' | 'vulnerable' | 'compromised' | 'encrypted' | 'isolated' | 'contained' | 'unreachable';
  ip: string;
  lines: string[];
  ttl?: number;
  timeMs?: number;
  alertMessageAr?: string;
  badgeColor: 'emerald' | 'amber' | 'rose' | 'indigo' | 'slate';
}

export interface RiskEvaluation {
  threat: number; // 1-5
  vulnerability: number; // 1-5
  impact: number; // 1-5
  rawFormula: string;
  score: number; // 0-100
  level: 'low' | 'medium' | 'high';
  color: string;
  labelAr: string;
}
