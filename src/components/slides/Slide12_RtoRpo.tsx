import React, { useState } from 'react';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { calculateRtoRpo } from '../../utils/incidentLogic.ts';
import { sounds } from '../../utils/soundEffects.ts';
import { Clock, HardDrive, Zap, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const Slide12_RtoRpo: React.FC = () => {
  const [backupInterval, setBackupInterval] = useState<number>(4); // Backup every 4 hours
  const [dataSizeGb, setDataSizeGb] = useState<number>(150); // 150 GB school DB
  const [restoreSpeedMbps, setRestoreSpeedMbps] = useState<number>(500); // 500 Mbps LAN

  const refData = TEXTBOOK_CONFIG.references.slide12_rto_rpo;
  const metrics = calculateRtoRpo(backupInterval, restoreSpeedMbps, dataSizeGb);

  const presets = [
    { label: 'الوضع الحالي لمدرسة الأمل (نسخ كل 24 ساعة)', interval: 24, size: 150, speed: 100 },
    { label: 'خطة التعافي المحسنة (نسخ كل 4 ساعات)', interval: 4, size: 150, speed: 500 },
    { label: 'جاهزية الامتحانات الحرجة (نسخ كل 1 ساعة وشبكة جيجابت)', interval: 1, size: 150, speed: 1000 },
  ];

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto">
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

      {/* Main Grid: Inputs vs Visual Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Inputs (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">مدخلات معايير خطة استمرارية الأعمال</h3>
          </div>

          {/* Input 1: Backup Interval (RPO) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">فترة إجراء النسخ الاحتياطي (RPO Interval)</span>
              <span className="font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                كل {backupInterval} ساعات
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={backupInterval}
              onChange={(e) => setBackupInterval(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>كل ساعة (فقدان شبه معدوم)</span>
              <span>كل 12 ساعة</span>
              <span>كل 24 ساعة (فقدان يوم كامل)</span>
            </div>
          </div>

          {/* Input 2: Data Size (GB) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">حجم قواعد بيانات المدرسة (SIS Data Size)</span>
              <span className="font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                {dataSizeGb} GB
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="25"
              value={dataSizeGb}
              onChange={(e) => setDataSizeGb(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Input 3: Network Restore Speed (Mbps) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">سرعة نقل بيانات الاستعادة من النسخ (Throughput)</span>
              <span className="font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                {restoreSpeedMbps} Mbps
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={restoreSpeedMbps}
              onChange={(e) => setRestoreSpeedMbps(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Presets */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400">تفضيلات جاهزة للمقارنة:</div>
            <div className="space-y-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sounds.playClick();
                    setBackupInterval(p.interval);
                    setDataSizeGb(p.size);
                    setRestoreSpeedMbps(p.speed);
                  }}
                  className="w-full text-right p-2 rounded bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition flex items-center justify-between"
                >
                  <span className="font-medium text-slate-200">{p.label}</span>
                  <span className="font-mono text-cyan-400 text-[10px]">RPO={p.interval}h</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Output: Indicators & Visual Timeline (6 cols) */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* RPO and RTO Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/50 space-y-1">
                <div className="text-[11px] text-slate-400 font-semibold">نقطة الاستعادة المستهدفة (RPO)</div>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {metrics.rpoHours} ساعة
                </div>
                <div className="text-[10px] text-amber-200/80">
                  أقصى فترة زمنية مسموح بفقدان بياناتها
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-1">
                <div className="text-[11px] text-slate-400 font-semibold">الهدف الزمني للتعافي (RTO)</div>
                <div className="text-2xl font-bold font-mono text-rose-400">
                  {metrics.rtoHours} ساعة
                </div>
                <div className="text-[10px] text-rose-200/80">
                  المدة المقدرة لتوقف النظام قبل عودته
                </div>
              </div>

            </div>

            {/* Visual Timeline of Disaster and Recovery */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <span>المخطط الزمني البصري للحادثة والتعافي:</span>
              </div>

              <div className="relative pt-4 pb-2">
                
                {/* Horizontal line */}
                <div className="h-2 bg-slate-800 rounded-full w-full relative">
                  {/* RPO segment (Yellow) */}
                  <div
                    className="absolute right-1/4 h-2 bg-amber-500 rounded-r-full"
                    style={{ width: `${Math.min(30, (metrics.rpoHours / 24) * 35)}%` }}
                  />
                  {/* Incident point */}
                  <div className="absolute right-1/4 -top-2 w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold animate-ping" />
                  <div className="absolute right-1/4 -top-2 w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                    !
                  </div>
                  {/* RTO segment (Rose) */}
                  <div
                    className="absolute left-1/4 h-2 bg-rose-500 rounded-l-full"
                    style={{ width: `${Math.min(40, (metrics.rtoHours / 10) * 40)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 pt-4">
                  <div className="text-right">
                    <span className="text-amber-400 font-bold block">نافذة فقدان البيانات (RPO)</span>
                    <span>{metrics.rpoHours} ساعة ضائعة من السجلات</span>
                  </div>
                  <div className="text-center font-bold text-rose-400">
                    لحظة وقوع التشفير
                  </div>
                  <div className="text-left">
                    <span className="text-rose-400 font-bold block">زمن الانقطاع (RTO)</span>
                    <span>{metrics.rtoHours} ساعة حتى اكتمال الاستعادة</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong>أثر ذلك على الامتحانات المدرسية:</strong> إذا كان RTO يتجاوز ساعتين، تتعطل جلسات امتحانات الطلبة، مما يستدعي الاستثمار في وسائط استعادة أسرع أو نسخ متماثل (Replication) في الوقت الحقيقي.
          </div>

        </div>

      </div>
    </div>
  );
};
