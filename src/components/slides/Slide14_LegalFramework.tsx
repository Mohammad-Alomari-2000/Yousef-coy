import React, { useState } from 'react';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Scale,
  ShieldAlert,
  Clock,
  AlertCircle,
  FileText,
  Building2,
  Users,
  CheckCircle2,
  Info
} from 'lucide-react';

export const Slide14_LegalFramework: React.FC = () => {
  const refData = TEXTBOOK_CONFIG.references.slide14_legal_framework;
  const [selectedTimelineStage, setSelectedTimelineStage] = useState<number>(1);

  const legalArticles = [
    {
      number: 'المادة (13) و (14)',
      title: 'واجب الإشعار الفوري عن الخروقات (72 ساعة)',
      content: 'يلزم القانون إدارة مدرسة الأمل النموذجية بإشعار مجلس حماية البيانات الشخصية والمركز الوطني للأمن السيبراني خلال مدة لا تتجاوز 72 ساعة من تاريخ العلم باختراق قواعد بيانات SIS وتسريب بيانات الـ 450 طالباً.'
    },
    {
      number: 'المادة (16)',
      title: 'إشعار أصحاب البيانات (أولياء الأمور والطلبة)',
      content: 'في حال كان التسريب يشكل خطراً جسيماً على خصوصية وحقوق الطلبة ودرجاتهم وسجلاتهم المدنية، تلتزم المدرسة بإبلاغ أولياء الأمور فوراً مع توضيح طبيعة البيانات المسربة والتدابير المتخذة لمعالجة الأثر.'
    },
    {
      number: 'المادة (21) و (22)',
      title: 'حماية خاصة لبيانات القصّر والأطفال',
      content: 'يعامل القانون بيانات الطلبة كبيانات ذات خصوصية مشددة، ويفرض تدابير فنية وتنظيمية مضاعفة، ويحظر معالجتها أو استغلالها دون موافقة صريحة من الولي الشرعي.'
    },
    {
      number: 'المادة (29) و (30)',
      title: 'العقوبات والمسؤولية المدنية والجزائية',
      content: 'يفرض القانون غرامات مالية مشددة على المؤسسات المهملة في حماية البيانات، بالإضافة إلى التعويض المدني للمتضررين، وتتضاعف العقوبة في حال محاولة التستر أو إخفاء الحادثة السيبرانية.'
    }
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

      {/* Main Law Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950/40 border border-blue-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 shrink-0">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                الإطار التشريعي: قانون حماية البيانات الشخصية الأردني لسنة 2023
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">
                قانون رقم (24) لسنة 2023
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              تحديد المسؤوليات القانونية لإدارة مدرسة الأمل النموذجية وفريق الأمن السيبراني عقب تسريب علامات 450 طالباً.
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Notification Window Timeline */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>الجدول الزمني القانوني للإشعار والتبليغ عن الخرق:</span>
          </div>
          <span className="text-[11px] text-amber-400 font-mono font-bold">مهلة لا تتجاوز 72 ساعة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-rose-400 font-mono">الساعات 0 - 24: التدابير الفورية</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              عزل الأنظمة المصابة، وتفعيل خطة الطوارئ، واستدعاء فريق التحقيق الجنائي لجمع الأدلة وتوثيق بصمات الهاش.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-amber-400 font-mono">الساعات 24 - 48: تقييم الأثر والمخاطر</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              حصر قواعد البيانات المتأثرة (تأكيد تسريب علامات 450 طالباً)، والتأكد من نطاق التسريب لخادم C2 الخارجي.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-emerald-400 font-mono">حتى 72 ساعة كحد أقصى: الإشعار الرسمي</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              تسليم التقرير الرسمي لـ (مجلس حماية البيانات والمركز الوطني للأمن السيبراني)، وإبلاغ أولياء الأمور بشفافية.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Legal Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {legalArticles.map((art, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 font-mono">{art.number}</span>
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
            </div>
            <h4 className="text-xs font-bold text-white">{art.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {art.content}
            </p>
          </div>
        ))}
      </div>

      {/* Transparency vs Concealment Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>مسار الامتثال والشفافية النظامية:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            التبليغ السريع يتيح للمركز الوطني NCSC التدخل التقني لحجب خادم المهاجم، ويحمي المدرسة من الغرامات القصوى، ويعزز مصداقية الإدارة أمام المجتمع.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <span>مخاطر التستر وإخفاء الحادثة:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            محاولة إخفاء تسريب بيانات الطلبة تدمر سمعة المدرسة عند نشرها من قبل المخترقين، وتعرّض المسؤولين للملاحقة الجزائية والغرامات ومساءلة القضاء.
          </p>
        </div>
      </div>
    </div>
  );
};
