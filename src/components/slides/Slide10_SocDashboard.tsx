import React, { useState } from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { formatTime } from '../../utils/incidentLogic.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Activity,
  Shield,
  ShieldAlert,
  Server,
  Terminal,
  Lock,
  Unlock,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Radio,
  FileText
} from 'lucide-react';

interface SocLogEntry {
  seconds: number;
  timeStr: string;
  sourceIp: string;
  destIp: string;
  protocol: string;
  action: 'ALLOWED' | 'ALERT' | 'BLOCKED' | 'SYSTEM';
  messageAr: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const CANONICAL_LOGS: SocLogEntry[] = [
  {
    seconds: 0,
    timeStr: '00:00:12',
    sourceIp: '192.168.1.1',
    destIp: '192.168.1.104',
    protocol: 'SMTP / 25',
    action: 'ALLOWED',
    messageAr: `وصول بريد إلكتروني خارجي من نطاق (${TEXTBOOK_CONFIG.domains.phishing}) إلى الموظفة سارة.`,
    severity: 'low'
  },
  {
    seconds: 60,
    timeStr: '01:00:05',
    sourceIp: '192.168.1.104',
    destIp: '192.168.1.1',
    protocol: 'DNS / 53',
    action: 'ALLOWED',
    messageAr: `استعلام عن اسم النطاق (${TEXTBOOK_CONFIG.domains.phishing}). الاستجابة: IP خارجي.`,
    severity: 'low'
  },
  {
    seconds: 135, // 02:15
    timeStr: '02:15:30',
    sourceIp: '192.168.1.104',
    destIp: '192.168.1.104',
    protocol: 'SYSTEM / EXEC',
    action: 'ALERT',
    messageAr: 'تشغيل ملف تنفيذي ذي امتداد مزدوج (Grades_Update_Final.xlsm.exe). بدء حقن حمولة الفدية في الذاكرة.',
    severity: 'medium'
  },
  {
    seconds: 200,
    timeStr: '03:20:10',
    sourceIp: '192.168.1.104',
    destIp: '192.168.1.1',
    protocol: 'HTTP / 80',
    action: 'ALERT',
    messageAr: 'محاولة استدعاء مكتبات PowerShell مشفرة لتفريغ بيانات الاعتماد المحلية SAM.',
    severity: 'medium'
  },
  {
    seconds: 270, // 04:30
    timeStr: '04:30:15',
    sourceIp: '192.168.1.104',
    destIp: '192.168.1.104',
    protocol: 'PRIVILEGE',
    action: 'ALERT',
    messageAr: 'تم تصعيد الصلاحيات بنجاح إلى Administrator باستخدام كلمة مرور المشرف المحلي المعاد استخدامها.',
    severity: 'high'
  },
  {
    seconds: 340,
    timeStr: '05:40:00',
    sourceIp: '192.168.1.104',
    destIp: '192.168.1.255',
    protocol: 'ARP / SMB',
    action: 'ALERT',
    messageAr: 'مسح شبكي استطلاعي نشط بحثاً عن المنافذ المفتوحة 445 على النطاق المحلي.',
    severity: 'high'
  },
  {
    seconds: 405, // 06:45
    timeStr: '06:45:22',
    sourceIp: '192.168.1.104',
    destIp: '192.168.1.10',
    protocol: 'SMB / 445',
    action: 'ALERT',
    messageAr: 'حركة جانبية ناجحة (Lateral Movement) عبر SMB 445 نحو خادم النطاق الرئيسي AD.',
    severity: 'critical'
  },
  {
    seconds: 420, // 07:00
    timeStr: '07:00:10',
    sourceIp: '192.168.1.104',
    destIp: '192.168.1.15',
    protocol: 'SMB / 445',
    action: 'ALERT',
    messageAr: 'انتشار دودة الفدية إلى خادم نظام معلومات الطلبة SIS ومحاولة الوصول لقاعدة بيانات الدرجات.',
    severity: 'critical'
  },
  {
    seconds: 530, // 08:50
    timeStr: '08:50:45',
    sourceIp: '192.168.1.15',
    destIp: TEXTBOOK_CONFIG.ips.attackerC2,
    protocol: 'HTTPS / 443',
    action: 'ALERT',
    messageAr: `[DATA EXFILTRATION] تسريب كشوفات علامات 450 طالباً مشفرة إلى خادم القيادة والتحكم C2 (${TEXTBOOK_CONFIG.ips.attackerC2}:443).`,
    severity: 'critical'
  },
  {
    seconds: 600, // 10:00
    timeStr: '10:00:00',
    sourceIp: '192.168.1.15',
    destIp: 'LOCAL_DISK',
    protocol: 'CRYPTO / AES',
    action: 'ALERT',
    messageAr: 'اكتمال تشفير ملفات SIS ووضع رسالة الفدية READ_ME_DECRYPT.txt.enc والمطالبة بـ 2 BTC.',
    severity: 'critical'
  }
];

export const Slide10_SocDashboard: React.FC = () => {
  const {
    currentTime,
    isContained,
    setIsContained,
    networkStatus,
    addScoreToActiveTeam
  } = useIncident();

  const refData = TEXTBOOK_CONFIG.references.slide10_soc_dashboard;
  const [logFilter, setLogFilter] = useState<'all' | 'alerts' | 'firewall'>('all');

  // Logs appear progressively by canonical timestamp
  const visibleLogs = CANONICAL_LOGS.filter(l => l.seconds <= currentTime);

  // If contained, prepend containment rule log
  const displayLogs = isContained
    ? [
        {
          seconds: currentTime,
          timeStr: 'ACTIVE NOW',
          sourceIp: '192.168.1.1',
          destIp: '0.0.0.0/0',
          protocol: 'FIREWALL / RULE',
          action: 'BLOCKED' as const,
          messageAr: 'قاعدة طوارئ نشطة: تم تغيير جدار الحماية إلى [SMB 445 BLOCKED] وعزل كافة الأجهزة المشتبه بها.',
          severity: 'high' as const
        },
        ...visibleLogs
      ]
    : visibleLogs;

  const handleContainIncident = () => {
    sounds.playContainment();
    setIsContained(true);
    addScoreToActiveTeam(40, 'تفعيل احتواء الحادثة وحظر SMB 445 من لوحة SOC');
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

      {/* SOC Header & Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        
        {/* Network State Widget */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-xl">
          <div>
            <div className="text-[11px] text-slate-400">حالة الشبكة الآنية</div>
            <div className="text-sm font-bold text-white mt-0.5">{networkStatus.labelAr}</div>
            <div className="text-[10px] text-slate-500 font-mono">ساعة الحادثة: {formatTime(currentTime)}</div>
          </div>
          <div className={`p-2.5 rounded-xl border ${networkStatus.badgeColor}`}>
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Firewall SMB 445 Rule Widget */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-xl">
          <div>
            <div className="text-[11px] text-slate-400">حالة منفذ SMB 445</div>
            <div className={`text-sm font-bold font-mono mt-0.5 ${isContained ? 'text-blue-400' : 'text-amber-400'}`}>
              {isContained ? 'SMB 445: BLOCKED' : 'SMB 445: ALLOWED'}
            </div>
            <div className="text-[10px] text-slate-500">الجدار الناري الداخلي</div>
          </div>
          <div className={`p-2.5 rounded-xl border ${isContained ? 'bg-blue-950/70 border-blue-500 text-blue-400' : 'bg-amber-950/70 border-amber-500 text-amber-400'}`}>
            {isContained ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
          </div>
        </div>

        {/* Exfiltrated Data Widget */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-xl">
          <div>
            <div className="text-[11px] text-slate-400">بيانات الطلبة المسربة</div>
            <div className="text-sm font-bold font-mono text-rose-400 mt-0.5">
              {currentTime >= 530 ? '450 طالب (علامات كاملة)' : '0 سجل (حتى الآن)'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Dest: {TEXTBOOK_CONFIG.ips.attackerC2}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* Containment Action Button */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-center shadow-xl">
          {isContained ? (
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-blue-300 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> تم تطبيق العزل والاحتواء
              </span>
              <div className="text-[10px] text-slate-400">الجدار الناري يحظر المنفذ 445</div>
            </div>
          ) : (
            <button
              onClick={handleContainIncident}
              className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-rose-950/50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>تطبيق حظر SMB 445 واحتواء الهجوم</span>
            </button>
          )}
        </div>

      </div>

      {/* SIEM / Syslog Live Terminal Feed */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Terminal Header */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white font-mono">
              SOC SIEM Log Stream (تتدرج السجلات تلقائياً وفق ساعة الحادثة)
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
              سجلات ظاهرة: {displayLogs.length}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">تصفية السجلات:</span>
            <button
              onClick={() => setLogFilter('all')}
              className={`px-2 py-0.5 rounded text-[11px] ${logFilter === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              الكل
            </button>
            <button
              onClick={() => setLogFilter('alerts')}
              className={`px-2 py-0.5 rounded text-[11px] ${logFilter === 'alerts' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              الإنذارات الحرجة
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="max-h-[360px] overflow-y-auto font-mono text-xs text-slate-300 divide-y divide-slate-800/60" dir="ltr">
          {displayLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-sans">
              لا توجد سجلات بعد في الدقيقة 00:00. حرك شريط الوقت في الأعلى أو شغل المحاكاة لمشاهدة تدفق السجلات.
            </div>
          ) : (
            displayLogs
              .filter(l => logFilter === 'all' || l.action === 'ALERT' || l.action === 'BLOCKED')
              .map((log, idx) => {
                const isCritical = log.severity === 'critical';
                const isBlocked = log.action === 'BLOCKED';
                return (
                  <div
                    key={idx}
                    className={`p-3 flex flex-col md:flex-row md:items-center justify-between gap-2 transition ${
                      isBlocked ? 'bg-blue-950/30' : isCritical ? 'bg-rose-950/20' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 text-[11px] font-mono">{log.timeStr}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action === 'BLOCKED' ? 'bg-blue-950 text-blue-400 border border-blue-700' :
                        log.action === 'ALERT' ? 'bg-rose-950 text-rose-400 border border-rose-700' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {log.action}
                      </span>
                      <span className="text-cyan-400 font-bold">{log.protocol}</span>
                    </div>

                    <div className="flex-1 md:px-4 text-[11px] text-slate-200 font-sans" dir="rtl">
                      {log.messageAr}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono shrink-0">
                      <span>SRC: {log.sourceIp}</span>
                      <span>→</span>
                      <span>DST: {log.destIp}</span>
                    </div>
                  </div>
                );
              })
          )}
        </div>

      </div>
    </div>
  );
};
