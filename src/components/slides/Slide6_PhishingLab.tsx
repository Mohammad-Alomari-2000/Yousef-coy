import React, { useState } from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Mail,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  ExternalLink,
  ShieldAlert,
  Search,
  Sparkles,
  Info
} from 'lucide-react';

export const Slide6_PhishingLab: React.FC = () => {
  const { addScoreToActiveTeam } = useIncident();
  const refData = TEXTBOOK_CONFIG.references.slide6_phishing_lab;

  // Track discovered clues (1, 2, 3, 4)
  const [discoveredClues, setDiscoveredClues] = useState<number[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [linkHovered, setLinkHovered] = useState<boolean>(false);

  const clues = [
    {
      id: 1,
      name: 'عنوان المرسل المنتحل (Spoofed Domain)',
      desc: `النطاق المستخدم هو (${TEXTBOOK_CONFIG.domains.phishing}) وهو نطاق مشبوه يشبه اسم المدرسة، بينما النطاق الرسمي المعتمد هو (${TEXTBOOK_CONFIG.domains.legitimate}).`,
      points: 25
    },
    {
      id: 2,
      name: 'هندسة الإلحاح والضغط النفسي (Urgency Trick)',
      desc: 'عبارة "افتحي الملف لتحديث الكشوف فوراً قبل نهاية الدوام تجنباً للإجراءات القانونية" صُممت لتعطيل التفكير المنطقي وإثارة الخوف.',
      points: 25
    },
    {
      id: 3,
      name: 'الرابط التوجيهي الخارجي المشبوه (Deceptive Link)',
      desc: `الرابط المكتوب يوحي ببوابة الوزارة، لكن الوجهة الحقيقية تشير إلى (${TEXTBOOK_CONFIG.domains.phishing}/portal-auth) لسرقة بيانات الاعتماد.`,
      points: 25
    },
    {
      id: 4,
      name: 'امتداد المرفق المزدوج التنفيذي (.xlsm.exe)',
      desc: 'الملف ينتهي بـ .exe متنكراً بأيقونة إكسل وجزء .xlsm لخداع الموظفة وحثها على فتح برمجية الفدية التنفيذية.',
      points: 25
    }
  ];

  const handleClueClick = (clueId: number) => {
    if (!discoveredClues.includes(clueId)) {
      sounds.playSuccess();
      const updated = [...discoveredClues, clueId];
      setDiscoveredClues(updated);
      addScoreToActiveTeam(25, 'اكتشاف قرينة تصيد احتيالي');
      const foundClue = clues.find(c => c.id === clueId);
      setFeedbackMessage({
        text: `أحسنت! تم اكتشاف: ${foundClue?.name} (+25 نقطة)`,
        isError: false
      });
    }
  };

  const handleSafeClick = (partName: string) => {
    sounds.playClick();
    setFeedbackMessage({
      text: `هذا الجزء سليم (${partName})؛ لا توجد فيه قرينة تدل على التصيد الاحتيالي. استمر في التدقيق!`,
      isError: true
    });
  };

  const isAttachmentDiscovered = discoveredClues.includes(4);
  const isSenderDiscovered = discoveredClues.includes(1);
  const isUrgencyDiscovered = discoveredClues.includes(2);
  const isLinkDiscovered = discoveredClues.includes(3);
  const allDiscovered = discoveredClues.length === 4;

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

      {/* Lab Instruction & Progress */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/70 text-cyan-400 border border-cyan-800/50">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              معمل فحص رسائل التصيد الاحتيالي الموجه (Spear Phishing Lab)
            </h3>
            <p className="text-xs text-slate-400">
              انقر على أجزاء الرسالة أدناه لكشف القرائن الأربعة المشبوهة بدقة (إذا نقرت جزءاً بريئاً ستتلقى تنبيهاً).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="text-xs font-mono font-bold text-slate-300">
            تم اكتشاف: <span className="text-rose-400 text-sm">{discoveredClues.length}</span> / 4
          </div>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
              style={{ width: `${(discoveredClues.length / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Banner */}
      {feedbackMessage && (
        <div className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition animate-fade-in ${
          feedbackMessage.isError
            ? 'bg-slate-900/90 text-amber-300 border-amber-500/50'
            : 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
        }`}>
          {feedbackMessage.isError ? <Info className="w-4 h-4 text-amber-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* The Simulated Email Interface */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Email Client Header Bar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-400" />
            <span className="font-bold text-slate-200">صندوق بريد التسجيل: سارة عياصرة (192.168.1.104)</span>
          </div>
          <div
            onClick={() => handleSafeClick('طابع وقت وصول الرسالة')}
            className="cursor-pointer hover:text-slate-200 font-mono text-[11px]"
            title="انقر للتدقيق"
          >
            الخميس 08:30 صباحاً (00:00 في المحاكاة)
          </div>
        </div>

        {/* Email Header Details */}
        <div className="p-4 border-b border-slate-800/80 space-y-2 bg-slate-900/30 text-xs">
          
          {/* Subject */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 w-16">الموضوع:</span>
            <span
              onClick={() => handleSafeClick('عنوان الموضوع')}
              className="font-bold text-slate-100 cursor-pointer hover:bg-slate-800/40 px-1 rounded"
            >
              [هام وعاجل جداً] تحديث كشوف علامات طلبة الثانوية العامة - مدرسة الأمل النموذجية
            </span>
          </div>

          {/* From field */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 w-16">من:</span>
            <div
              onClick={() => handleClueClick(1)}
              className={`p-1 rounded cursor-pointer transition border ${
                isSenderDiscovered
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold'
                  : 'bg-slate-900 border-slate-800 hover:border-amber-500/50 text-slate-200'
              }`}
              title="انقر لفحص عنوان المرسل"
            >
              <span className="font-semibold">وزارة التربية والتعليم - قسم الامتحانات المدرسية </span>
              <span className="font-mono text-[11px]" dir="ltr">
                &lt;exam-control@{TEXTBOOK_CONFIG.domains.phishing}&gt;
              </span>
              {isSenderDiscovered && (
                <span className="mr-2 text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-sans">
                  نطاق احتيالي منتحل!
                </span>
              )}
            </div>
          </div>

          {/* To field */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 w-16">إلى:</span>
            <span
              onClick={() => handleSafeClick('عنوان المستلم سارة')}
              className="text-slate-300 font-mono cursor-pointer hover:bg-slate-800/40 px-1 rounded"
              dir="ltr"
            >
              sarah.registration@{TEXTBOOK_CONFIG.domains.legitimate}
            </span>
          </div>
        </div>

        {/* Email Body Content */}
        <div className="p-5 md:p-6 space-y-4 text-xs md:text-sm leading-relaxed text-slate-200">
          
          <div
            onClick={() => handleSafeClick('التحية الافتتاحية')}
            className="cursor-pointer hover:bg-slate-900/40 p-1 rounded inline-block"
          >
            الأخت الزميلة سارة عياصرة المحترمة / قسم القبول والتسجيل،
          </div>

          <p onClick={() => handleSafeClick('الفقرة التمهيدية')} className="cursor-pointer hover:bg-slate-900/40 p-1 rounded">
            تحية طيبة وبعد،،،
            نظراً لاعتماد التعديلات الوزارية الأخيرة على معدلات المواد العلمية للفصل الدراسي الحالي، نرسل لكم المرفق المعتمد لكشوف علامات طلبة مدرسة الأمل النموذجية للمطابقة العاجلة.
          </p>

          {/* Urgency Clue */}
          <div
            onClick={() => handleClueClick(2)}
            className={`p-3 rounded-lg border cursor-pointer transition ${
              isUrgencyDiscovered
                ? 'bg-rose-950/50 border-rose-500 text-rose-200 font-bold'
                : 'bg-slate-900/70 border-slate-800 hover:border-amber-500/50 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-rose-400 font-extrabold text-sm">
                "افتحي الملف لتحديث الكشوف فوراً قبل نهاية الدوام، مع العلم أن أي تأخير يعرض إدارة المدرسة للمساءلة القانونية وحجب نتائج 450 طالباً!"
              </span>
              {isUrgencyDiscovered && (
                <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded">
                  أسلوب الضغط النفسي والإلحاح!
                </span>
              )}
            </div>
          </div>

          {/* Deceptive Link with hover preview */}
          <div className="space-y-1">
            <div className="text-slate-300">
              يمكنكم أيضاً مراجعة التعليمات الوزارية من خلال الرابط الإلكتروني التالي:
            </div>
            
            <div
              onClick={() => handleClueClick(3)}
              onMouseEnter={() => setLinkHovered(true)}
              onMouseLeave={() => setLinkHovered(false)}
              className={`p-2.5 rounded-lg border cursor-pointer inline-flex flex-col gap-1 transition ${
                isLinkDiscovered
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500 text-cyan-400'
              }`}
            >
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="underline">https://moe.gov.jo/portal/exams/grades-audit</span>
                {isLinkDiscovered && (
                  <span className="mr-2 text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-sans">
                    رابط تصيد خارجي!
                  </span>
                )}
              </div>

              {/* Status bar URL reveal on hover/tap */}
              {(linkHovered || isLinkDiscovered) && (
                <div className="text-[11px] font-mono text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800" dir="ltr">
                  Target Destination: https://{TEXTBOOK_CONFIG.domains.phishing}/login-verify?token=evil
                </div>
              )}
            </div>
          </div>

          {/* Attachment Box: Removes "ملغوم!" and EXE badge until discovered; shows fake Excel icon */}
          <div className="pt-3 border-t border-slate-800/80">
            <div className="text-xs font-semibold text-slate-400 mb-2">المرفقات الآمنة المرفوعة (1):</div>
            
            <div
              onClick={() => handleClueClick(4)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                isAttachmentDiscovered
                  ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950/50'
                  : 'bg-slate-900 border-slate-800 hover:border-amber-500/60'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Fake Excel Icon */}
                <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-white flex items-center gap-2" dir="ltr">
                    <span>Grades_Update_Final.xlsm.exe</span>
                    {isAttachmentDiscovered && (
                      <span className="text-[10px] bg-rose-600 text-white px-2 py-0.2 rounded font-sans font-bold">
                        ملغوم! ملف تنفيذي مقنّع (.exe)
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                    {isAttachmentDiscovered
                      ? 'تم كشف الحيلة: الملف ليس جدول بيانات إكسل حقيقي بل حمولة برمجية الفدية التنفيذية!'
                      : 'جدول بيانات Microsoft Excel مدعوم بوحدات الماكرو (حجم: 2.4 MB)'}
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold font-mono px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                {isAttachmentDiscovered ? 'قيد الحظر' : 'تنزيل المرفق'}
              </div>
            </div>
          </div>

          {/* Safe Sign-off */}
          <div
            onClick={() => handleSafeClick('التوقيع الرسمي والتذييل')}
            className="cursor-pointer hover:bg-slate-900/40 p-1 rounded text-slate-400 text-xs"
          >
            مع وافر التقدير والاحترام،<br />
            مديرية الامتحانات والاختبارات المدرسية.
          </div>

        </div>

      </div>

      {/* Success Modal Screen at 4/4 */}
      {allDiscovered && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/60 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-300">
                رائع جداً! تم كشف جميع قرائن التصيد الاحتيالي الأربعة بنجاح (4/4)!
              </h4>
              <p className="text-xs text-slate-300">
                حصل فريقك على 100 نقطة كاملة. لو قامت سارة بهذا التدقيق لما تمكنت دودة الفدية من الدخول إطلاقاً.
              </p>
            </div>
          </div>

          <button
            onClick={() => setDiscoveredClues([])}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold shrink-0"
          >
            إعادة التدريب
          </button>
        </div>
      )}

    </div>
  );
};
