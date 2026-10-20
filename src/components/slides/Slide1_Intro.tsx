import React from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { ShieldAlert, Terminal, Users, Play, AlertOctagon, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';

export const Slide1_Intro: React.FC = () => {
  const { setCurrentSlide, jumpToTime, togglePlay } = useIncident();
  const refData = TEXTBOOK_CONFIG.references.slide1_intro;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Textbook Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-semibold text-slate-200">{refData.unit}</span>
          <span>•</span>
          <span>{refData.topic}</span>
        </div>
        <div className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
          مرجع الكتاب: {refData.pages}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/40 border border-rose-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            محاكاة الاستجابة لحوادث الأمن السيبراني المتقدمة
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            سيناريو الهجوم بدودة الفدية على{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
              {TEXTBOOK_CONFIG.schoolName}
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
            في صباح يوم الخميس، تعرضت أنظمة المدرسة لاختراق سيبراني منسق بدأ برسالة بريد تصيد احتيالي موجه، 
            ثم تطور خلال 10 دقائق فقط إلى انتشار ذاتي لدودة الفدية عبر الشبكة وتشفير نظام معلومات الطلبة (SIS) 
            وتسريب بيانات حساسة لـ 450 طالباً. ستخوض بصفتك عضواً في فريق الدفاع السيبراني تجربة تحليل الحادثة خطوة بخطوة.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400">مدة الحادثة المقررة</div>
              <div className="text-lg font-bold font-mono text-rose-400">10:00 دقائق</div>
              <div className="text-[11px] text-slate-500">ساعة محاكاة مركزية</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400">طريقة الدخول الأولى</div>
              <div className="text-lg font-bold text-amber-300">تصيد موجه</div>
              <div className="text-[11px] text-slate-500">ملف ملغوم ذو امتداد مزدوج</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400">آلية الانتشار الداخلي</div>
              <div className="text-lg font-bold text-cyan-400">دودة فدية عبر SMB</div>
              <div className="text-[11px] text-slate-500">المنفذ 445 وكلمة مرور المشرف</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400">البيانات المتضررة</div>
              <div className="text-lg font-bold text-purple-400">450 سجلاً للطلبة</div>
              <div className="text-[11px] text-slate-500">نظام SIS وعلامات التوجيهي</div>
            </div>
          </div>

          {/* Call to actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setCurrentSlide(1)}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-950 flex items-center gap-2 transition"
            >
              <span>ابدأ دراسة ملف المهاجم والتهديد</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                jumpToTime(0);
                togglePlay();
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>بدء تشغيل ساعة الحادثة (00:00)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Incident Rules & Expectations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-200">التحكم المركزي بالساعة</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            جميع الشرائح الـ 16 (فحص الشبكة، لوحة SOC، سلسلة القتل، شاشة الفدية) مرتبطة بساعة الحادثة المشتركة أعلى الشاشة وتتغير استجاباتها تلقائياً.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-200">فحص حقيقي للشبكة والأدلة</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            أداة Ping ستعطيك استجابات واقعية مطابقة لحالة الجهاز الآنية، مع تتبع بصمات الهاش SHA-256 وسلسلة الحيازة القانونية.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-200">تنافس صفي وتدريب عملي</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            اجمع النقاط لفريقك من خلال حل تحديات التصيد وغرفة القرار ولعبة المطابقة، مع استخراج شهادة إنجاز وبطاقة خروج معتمدة.
          </p>
        </div>
      </div>
    </div>
  );
};
