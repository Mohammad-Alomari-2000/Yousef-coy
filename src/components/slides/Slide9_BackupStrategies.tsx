import React, { useState } from 'react';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { evaluateBackup } from '../../utils/incidentLogic.ts';
import { sounds } from '../../utils/soundEffects.ts';
import { Database, HardDrive, Clock, ShieldCheck, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const Slide9_BackupStrategies: React.FC = () => {
  const [strategy, setStrategy] = useState<'incremental' | 'differential'>('incremental');
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [restoredSteps, setRestoredSteps] = useState<number[]>([]);

  const refData = TEXTBOOK_CONFIG.references.slide9_backup_strategies;
  const evaluation = evaluateBackup(strategy, 'thursday');

  const daysData = [
    { dayAr: 'الأحد', type: 'Full Backup', size: '100 GB', incSize: '100 GB', diffSize: '100 GB', note: 'النسخة الكاملة الأسبوعية الأساسية' },
    { dayAr: 'الإثنين', type: 'Daily Changes', size: '10 GB', incSize: '+10 GB (تراكمي)', diffSize: '+10 GB (تفاضلي)', note: 'تغييرات الإثنين فقط' },
    { dayAr: 'الثلاثاء', type: 'Daily Changes', size: '12 GB', incSize: '+12 GB (تراكمي)', diffSize: '+22 GB (تفاضلي من الأحد)', note: 'تغييرات الثلاثاء فقط' },
    { dayAr: 'الأربعاء', type: 'Daily Changes', size: '14 GB', incSize: '+14 GB (تراكمي)', diffSize: '+36 GB (تفاضلي من الأحد)', note: 'تغييرات الأربعاء فقط' },
    { dayAr: 'الخميس', type: 'Day of Attack', size: '15 GB', incSize: '+15 GB (تراكمي)', diffSize: '+51 GB (تفاضلي من الأحد)', note: 'تغييرات الخميس حتى وقوع الهجوم' },
  ];

  const handleToggleStrategy = (newStrategy: 'incremental' | 'differential') => {
    sounds.playClick();
    setStrategy(newStrategy);
    setRestoredSteps([]);
    setIsRestoring(false);
  };

  const handleSimulateRestore = () => {
    sounds.playClick();
    setIsRestoring(true);
    setRestoredSteps([]);

    const stepsToAnimate = strategy === 'incremental' ? [0, 1, 2, 3, 4] : [0, 4];
    stepsToAnimate.forEach((stepIdx, idx) => {
      setTimeout(() => {
        sounds.playSuccess();
        setRestoredSteps(prev => [...prev, stepIdx]);
        if (idx === stepsToAnimate.length - 1) {
          setIsRestoring(false);
        }
      }, (idx + 1) * 600);
    });
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

      {/* Top Toggle Strategy Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              محاكي استراتيجيات النسخ الاحتياطي: التراكمي (Incremental) مقابل التفاضلي (Differential)
            </h3>
            <p className="text-xs text-slate-400">
              سيناريو الخميس: تعرض نظام SIS للتشفير؛ قارن بين آلية الاستعادة وسرعتها في كل طريقة.
            </p>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleToggleStrategy('incremental')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
              strategy === 'incremental'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>النسخ التراكمي (Incremental)</span>
          </button>

          <button
            onClick={() => handleToggleStrategy('differential')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
              strategy === 'differential'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>النسخ التفاضلي (Differential)</span>
          </button>
        </div>
      </div>

      {/* Days Backup Sets Representation */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>وسائط النسخ المتوفرة خلال الأسبوع (حتى لحظة هجوم الخميس):</span>
          </div>

          <button
            onClick={handleSimulateRestore}
            disabled={isRestoring}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRestoring ? 'جارٍ محاكاة الاستعادة...' : 'محاكاة استعادة بيانات الخميس'}</span>
          </button>
        </div>

        {/* 5 Day Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {daysData.map((d, idx) => {
            const isNeeded = strategy === 'incremental' ? true : (idx === 0 || idx === 4);
            const isRestored = restoredSteps.includes(idx);

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                  isRestored
                    ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/50 scale-105'
                    : isNeeded
                    ? 'bg-slate-900 border-cyan-500/50'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-white">{d.dayAr}</span>
                    <span className="font-mono text-[10px] text-cyan-400">{idx === 0 ? 'Full' : (strategy === 'incremental' ? 'Inc' : 'Diff')}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {strategy === 'incremental' ? d.incSize : d.diffSize}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px]">
                  {isRestored ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> تم تطبيق النسخة
                    </span>
                  ) : isNeeded ? (
                    <span className="text-amber-300 font-medium">مطلوبة للاستعادة</span>
                  ) : (
                    <span className="text-slate-600">غير مطلوبة (تُهمل)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Details Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800">
          
          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">عدد الوسائط المطلوبة للاستعادة</div>
            <div className="text-xl font-bold font-mono text-cyan-300">
              {evaluation.totalSetsCount} وسائط
            </div>
            <div className="text-[11px] text-slate-400 leading-relaxed">
              {evaluation.restoreStepsExplanationAr}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">زمن الاستعادة المتوقع (RTO)</div>
            <div className="text-xl font-bold font-mono text-amber-300">
              ~{evaluation.restoreTimeMinutes} دقيقة
            </div>
            <div className="text-[11px] text-slate-400 leading-relaxed">
              {evaluation.restoreTimeRatingAr}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">كفاءة استهلاك التخزين</div>
            <div className="text-xl font-bold text-emerald-300">
              {strategy === 'incremental' ? 'عالية جداً (151 GB)' : 'متوسطة (222 GB)'}
            </div>
            <div className="text-[11px] text-slate-400 leading-relaxed">
              {evaluation.storageEfficiencyAr}
            </div>
          </div>

        </div>

      </div>

      {/* Golden Rule 3-2-1 */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-300">
              قاعدة النسخ الاحتياطي الذهبية (3-2-1 Backup Rule)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
              • <strong>3 نسخ من البيانات:</strong> نسخة العمل الأصلية + نسختان احتياطيتان.<br />
              • <strong>2 وسيطين مختلفين:</strong> قرص صلب محلي NAS + وسيط سحابي مشفر أو شريط مغناطيسي.<br />
              • <strong>1 نسخة خارج الموقع أو معزولة (Air-Gapped):</strong> غير متصلة بالشبكة إطلاقاً حتى لا تصلها دودة الفدية!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
