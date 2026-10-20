import React, { useState, useEffect } from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { generatePingResult } from '../../utils/incidentLogic.ts';
import { PingReply } from '../../types/incident.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Network,
  Server,
  Laptop,
  Shield,
  Terminal,
  Send,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Info
} from 'lucide-react';

export const Slide3_NetworkTopology: React.FC = () => {
  const { currentTime, isContained, getDeviceCurrentState } = useIncident();
  const refData = TEXTBOOK_CONFIG.references.slide3_network_topology;

  const [inputIp, setInputIp] = useState<string>(TEXTBOOK_CONFIG.ips.adServer);
  const [terminalHistory, setTerminalHistory] = useState<PingReply[]>([]);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [currentPingingLineIndex, setCurrentPingingLineIndex] = useState<number>(0);

  const firewallLabel = isContained ? 'SMB 445 Blocked' : 'SMB 445 Permitted';

  // Run initial ping so the terminal is immediately populated and responsive
  useEffect(() => {
    const initial = generatePingResult(TEXTBOOK_CONFIG.ips.adServer, currentTime, isContained);
    setTerminalHistory([initial]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePing = (targetIpToUse?: string) => {
    const ip = (targetIpToUse || inputIp).trim();
    if (!ip) return;
    sounds.playClick();
    setIsPinging(true);
    setCurrentPingingLineIndex(0);

    const result = generatePingResult(ip, currentTime, isContained);

    // Realistic terminal line typing simulation
    let lineIdx = 0;
    const interval = setInterval(() => {
      lineIdx++;
      setCurrentPingingLineIndex(lineIdx);
      if (lineIdx >= result.lines.length) {
        clearInterval(interval);
        setIsPinging(false);
        setTerminalHistory(prev => [result, ...prev.slice(0, 4)]);
        if (result.status === 'compromised' || result.status === 'encrypted') {
          sounds.playAlert();
        } else if (result.status === 'safe') {
          sounds.playSuccess();
        }
      }
    }, 160);
  };

  const handleNodeClick = (ip: string) => {
    setInputIp(ip);
    handlePing(ip);
  };

  const nodes = [
    {
      id: 'firewall',
      name: 'الجدار الناري الرئيسي (Firewall)',
      ip: TEXTBOOK_CONFIG.ips.firewall,
      role: 'بوابة الشبكة والتحكم بالمنافذ',
      vlan: 'VLAN 1 (Management)',
      state: 'safe',
      icon: Shield,
      subBadge: firewallLabel,
      subBadgeColor: isContained ? 'bg-blue-900/60 text-blue-300 border-blue-500' : 'bg-amber-900/60 text-amber-300 border-amber-500'
    },
    {
      id: 'sarah',
      name: 'جهاز الموظفة سارة (قسم التسجيل)',
      ip: TEXTBOOK_CONFIG.ips.sarahPc,
      role: 'استقبال طلبات التسجيل ونقطة التسلل الأولى',
      vlan: 'VLAN 10 (Admin Staff)',
      state: getDeviceCurrentState(TEXTBOOK_CONFIG.ips.sarahPc),
      icon: Laptop
    },
    {
      id: 'ad',
      name: 'خادم النطاق الرئيسي (Active Directory)',
      ip: TEXTBOOK_CONFIG.ips.adServer,
      role: 'إدارة الهويات وحسابات المشرفين',
      vlan: 'VLAN 10 (Servers)',
      state: getDeviceCurrentState(TEXTBOOK_CONFIG.ips.adServer),
      icon: Server
    },
    {
      id: 'sis',
      name: 'خادم نظام معلومات الطلبة (SIS Server)',
      ip: TEXTBOOK_CONFIG.ips.sisServer,
      role: 'قواعد بيانات علامات 450 طالباً والسجلات',
      vlan: 'VLAN 10 (Servers)',
      state: getDeviceCurrentState(TEXTBOOK_CONFIG.ips.sisServer),
      icon: Server
    },
    {
      id: 'mgmt',
      name: 'جهاز إدارة المدرسة (Management PC)',
      ip: TEXTBOOK_CONFIG.ips.managementPc,
      role: 'مكتب الإدارة والحسابات',
      vlan: 'VLAN 10 (Admin Staff)',
      state: getDeviceCurrentState(TEXTBOOK_CONFIG.ips.managementPc),
      icon: Laptop
    },
    {
      id: 'labs',
      name: 'مختبرات الحاسوب للطلبة (Labs VLAN 20)',
      ip: '192.168.2.15',
      role: 'أجهزة تدريب الطلبة (معزولة بالكامل)',
      vlan: 'VLAN 20 (Students)',
      state: 'isolated',
      icon: Network,
      subBadge: 'VLAN Segregated (Protected)',
      subBadgeColor: 'bg-indigo-900/60 text-indigo-300 border-indigo-500'
    }
  ];

  const getStateBadge = (state: string) => {
    switch (state) {
      case 'safe':
        return { label: 'سليم (Safe)', color: 'bg-emerald-950 text-emerald-400 border-emerald-600' };
      case 'vulnerable':
        return { label: 'معرض للثغرة (Vulnerable)', color: 'bg-amber-950 text-amber-400 border-amber-600' };
      case 'compromised':
        return { label: 'مخترق نشط (Compromised)', color: 'bg-rose-950 text-rose-400 border-rose-600 animate-pulse' };
      case 'encrypted':
        return { label: 'مشفر بالفدية (Encrypted)', color: 'bg-red-950 text-red-300 border-red-700' };
      case 'isolated':
        return { label: 'معزول ومحمي (Isolated)', color: 'bg-indigo-950 text-indigo-400 border-indigo-600' };
      case 'contained':
        return { label: 'تم الاحتواء (Contained)', color: 'bg-blue-950 text-blue-400 border-blue-600' };
      default:
        return { label: 'غير معروف', color: 'bg-slate-800 text-slate-400 border-slate-700' };
    }
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-6xl mx-auto">
      {/* Textbook Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span className="font-semibold text-slate-200">{refData.unit}</span>
          <span>•</span>
          <span>{refData.topic}</span>
        </div>
        <div className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
          مرجع الكتاب: {refData.pages}
        </div>
      </div>

      {/* Main Grid: Interactive Topology Map & Live Ping Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Topology Map (Left 7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">خريطة الشبكة التفاعلية - مدرسة الأمل</h3>
            </div>
            <div className="text-[11px] text-slate-400">
              انقر على أي عقدة لاختبار فحصها مباشرة
            </div>
          </div>

          {/* Network Legend */}
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]">
            <span className="text-slate-400 font-semibold ml-1">دليل الحالات:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">سليم</span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">معرض للثغرة</span>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700">مخترق (C2)</span>
            <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700">مشفر بالفدية</span>
            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700">معزول (VLAN)</span>
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700">تم الاحتواء</span>
          </div>

          {/* Node Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodes.map((node) => {
              const Icon = node.icon;
              const badge = getStateBadge(node.state);
              const isSelected = inputIp === node.ip;

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node.ip)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-950/50 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100">{node.name}</div>
                        <div className="text-[11px] font-mono text-cyan-400">{node.ip}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                    {node.role}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-mono">{node.vlan}</span>
                    <span className={`px-2 py-0.5 rounded border font-medium ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  {node.subBadge && (
                    <div className="mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border block text-center font-mono font-bold ${node.subBadgeColor}`}>
                        {node.subBadge}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/60 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              قاعدة الفحص التعليمية: لاحظ كيف يتغير استجابة الخادم <span className="font-mono text-cyan-300">192.168.1.10</span> من أصفر (ثغرة مفتوحة) عند 00:00 إلى أحمر خاضع للاختراق والاتصال بـ <span className="font-mono text-rose-400">{TEXTBOOK_CONFIG.ips.attackerC2}</span> عند تقديم الساعة إلى 07:00!
            </span>
          </div>

        </div>

        {/* Live Ping Terminal (Right 5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col shadow-2xl overflow-hidden min-h-[460px]">
          
          {/* Terminal Window Header */}
          <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 mr-2 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                soc_diagnostics@al-amal:~# ping
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">ICMP / State-Aware</span>
          </div>

          {/* IP Input Form */}
          <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputIp}
                onChange={(e) => setInputIp(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePing()}
                placeholder="أدخل عنوان IP (مثال: 192.168.1.10)"
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                dir="ltr"
              />
            </div>
            <button
              onClick={() => handlePing()}
              disabled={isPinging}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded text-xs font-bold font-mono flex items-center gap-1 transition"
            >
              <span>{isPinging ? 'جارٍ الفحص...' : 'PING'}</span>
              <Send className="w-3 h-3" />
            </button>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-3.5 font-mono text-xs overflow-y-auto space-y-4 text-slate-300 select-text" dir="ltr">
            {terminalHistory.length === 0 ? (
              <div className="text-slate-600 text-center pt-8">
                Ready. Select a node or enter an IP address above to begin diagnostics.
              </div>
            ) : (
              terminalHistory.map((entry, idx) => (
                <div key={idx} className="space-y-1.5 border-b border-slate-800/70 pb-3">
                  <div className="flex items-center justify-between text-[11px] pb-1">
                    <span className="text-cyan-400 font-bold">$ ping -c 3 {entry.ip}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      entry.badgeColor === 'emerald' ? 'bg-emerald-950 text-emerald-400' :
                      entry.badgeColor === 'amber' ? 'bg-amber-950 text-amber-400' :
                      entry.badgeColor === 'rose' ? 'bg-rose-950 text-rose-400' :
                      entry.badgeColor === 'indigo' ? 'bg-indigo-950 text-indigo-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      STATUS: {entry.status.toUpperCase()}
                    </span>
                  </div>

                  {entry.lines.map((line, lIdx) => {
                    const isError = line.includes('CRITICAL') || line.includes('ALERT') || line.includes('ANOMALY');
                    const isWarning = line.includes('VULNERABILITY');
                    const isTimedOut = line.includes('timed out');
                    return (
                      <div
                        key={lIdx}
                        className={`text-[11px] leading-tight ${
                          isError ? 'text-rose-400 font-bold' :
                          isWarning ? 'text-amber-400 font-bold' :
                          isTimedOut ? 'text-indigo-400' : 'text-slate-300'
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })}

                  {entry.alertMessageAr && (
                    <div className="mt-2 p-2 rounded bg-slate-900/90 border border-slate-800 text-xs font-sans text-slate-200" dir="rtl">
                      {entry.alertMessageAr}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
