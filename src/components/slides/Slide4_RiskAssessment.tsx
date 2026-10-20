import React, { useState } from 'react';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { calculateRisk } from '../../utils/incidentLogic.ts';
import { sounds } from '../../utils/soundEffects.ts';
import { AlertCircle, Gauge, Sliders, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export const Slide4_RiskAssessment: React.FC = () => {
  const [threat, setThreat] = useState<number>(5);
  const [vulnerability, setVulnerability] = useState<number>(4);
  const [impact, setImpact] = useState<number>(5);

  const refData = TEXTBOOK_CONFIG.references.slide4_risk_assessment;
  const evaluation = calculateRisk(threat, vulnerability, impact);

  const presets = [
    {
      title: 'هجوم دودة الفدية على نظام SIS وسجلات 450 طالباً',
      threat: 5,
      vulnerability: 4,
      impact: 5,
      note: 'تهديد RaaS نشط + ثغرة SMB ومكافح قديم + أثر قانوني وتشغيلي كارثي'
    },
    {
      title: 'محاولة تصيد بريدي لموظف بدون صلاحيات حساسة',
      threat: 4,
      vulnerability: 3,
      impact: 3,
      note: 'تهديد متكرر + وعي متوسط + أثر محدود لإمكانية الاحتواء السريع'
    },
    {
      title: 'هجوم حجب الخدمة المؤقت على موقع المدرسة الترويجي',
      threat: 3,
      vulnerability: 3,
      impact: 2,
      note: 'تهديد معتاد + حماية سحابية جزئية + أثر سمعة طفيف دون مساس بالبيانات'
    },
    {
      title: 'عطل في طابعة قسم التسجيل الورقية',
      threat: 1,
      vulnerability: 2,
      impact: 1,
      note: 'تهديد منخفض جداً + أثر مؤقت لا يمس السلامة السيبرانية'
    }
  ];

  const handlePreset = (p: typeof presets[0]) => {
    sounds.playClick();
    setThreat(p.threat);
    setVulnerability(p.vulnerability);
    setImpact(p.impact);
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto">
      {/* Textbook Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="font-semibold text-slate-200">{refData.unit}</span>
          <span>•</span>
          <span>{refData.topic}</span>
        </div>
        <div className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
          مرجع الكتاب: {refData.pages}
        </div>
      </div>

      {/* Main Grid: Sliders vs Risk Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Sliders Area (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">معايير مصفوفة تقييم الخطر السيبراني</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Scale: 1 (أدنى) - 5 (أقصى)</span>
          </div>

          {/* Factor 1: Threat (T) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">1. عامل التهديد السيبراني (Threat - T)</span>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800">
                القيمة: {threat} / 5
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={threat}
              onChange={(e) => setThreat(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>1: تهديد نادر/هاوٍ</span>
              <span>3: هجمات عشوائية شائعة</span>
              <span>5: جماعة إجرامية منظمة (RaaS)</span>
            </div>
          </div>

          {/* Factor 2: Vulnerability (V) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">2. عامل الثغرة والضعف الأمني (Vulnerability - V)</span>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-rose-400 border border-slate-800">
                القيمة: {vulnerability} / 5
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={vulnerability}
              onChange={(e) => setVulnerability(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>1: أنظمة محدثة وMFA مفعل</span>
              <span>3: تحديثات غير منتظمة</span>
              <span>5: منفذ SMB 445 مكشوف وكلمة مكررة</span>
            </div>
          </div>

          {/* Factor 3: Impact (I) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">3. عامل الأثر والأضرار الناتجة (Impact - I)</span>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-purple-400 border border-slate-800">
                القيمة: {impact} / 5
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={impact}
              onChange={(e) => setImpact(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>1: توقف طفيف لا يؤثر على التدريس</span>
              <span>3: توقف جزئي مؤقت</span>
              <span>5: تسريب علامات 450 طالباً وتوقف الامتحانات</span>
            </div>
          </div>

          {/* Presets */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>سيناريوهات تطبيقية جاهزة من واقع مدرسة الأمل:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePreset(p)}
                  className="text-right p-2 rounded bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-[11px] text-slate-300 transition"
                >
                  <div className="font-bold text-slate-200 truncate">{p.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">{p.note}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Calculation Result & Formula Gauge (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Gauge className="w-4 h-4" />
              <span>معادلة الحساب المعتمدة في المنهاج:</span>
            </div>

            {/* Formula Block */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono space-y-1">
              <div className="text-xs text-slate-400">Risk Score = (T × V × I) ÷ 125 × 100</div>
              <div className="text-sm font-bold text-amber-300" dir="ltr">
                ({threat} × {vulnerability} × {impact}) ÷ 125 × 100 = {evaluation.score}%
              </div>
            </div>

            {/* Gauge Result Card */}
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center space-y-2 ${
              evaluation.level === 'high' ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/40' :
              evaluation.level === 'medium' ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-950/40' :
              'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
            }`}>
              <div className="text-xs font-medium text-slate-400">مؤشر الخطر الإجمالي المحسوب</div>
              <div className={`text-4xl font-extrabold font-mono ${evaluation.color}`}>
                {evaluation.score}%
              </div>
              <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                evaluation.level === 'high' ? 'bg-rose-900 text-rose-200' :
                evaluation.level === 'medium' ? 'bg-amber-900 text-amber-200' :
                'bg-emerald-900 text-emerald-200'
              }`}>
                {evaluation.labelAr}
              </div>
            </div>

            {/* Threshold Guide */}
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="text-slate-400 font-semibold mb-1">عتبات التصنيف الإلزامية:</div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800 text-[11px]">
                <span className="text-emerald-400 font-bold">منخفض (0 - 33%)</span>
                <span className="text-slate-400">مراقبة دورية وإجراءات اعتيادية</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800 text-[11px]">
                <span className="text-amber-400 font-bold">متوسط (34 - 66%)</span>
                <span className="text-slate-400">خطة علاجية وجدولة تحديثات أمنية</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800 text-[11px]">
                <span className="text-rose-400 font-bold">مرتفع / حرج (67 - 100%)</span>
                <span className="text-slate-400">استنفار فوري وتدخل عاجل للإدارة</span>
              </div>
            </div>

          </div>

          <div className="p-2.5 rounded bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              نصيحة المنهاج: إذا بلغت نسبة الخطر 67% فأكثر، يحظر تأجيل معالجة الثغرة وتُعطى الأولوية المطلقة لحماية الأصول المتأثرة.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
