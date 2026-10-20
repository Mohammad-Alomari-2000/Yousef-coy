import React from 'react';
import { useIncident } from '../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../utils/textbookConfig.ts';
import { X, BookOpen, Lightbulb, HelpCircle, CheckCircle2 } from 'lucide-react';

const TEACHER_NOTES: Record<number, {
  slideTitle: string;
  refKey: keyof typeof TEXTBOOK_CONFIG.references;
  objectives: string[];
  pedagogyTips: string;
  discussionQuestions: string[];
}> = {
  0: {
    slideTitle: "مقدمة المحاكاة وسيناريو مدرسة الأمل النموذجية",
    refKey: "slide1_intro",
    objectives: [
      "فهم سياق الهجوم الموجه على المؤسسات التعليمية",
      "إدراك أن الحوادث السيبرانية تحدث عبر تسلسل زمني دقيق",
      "التعرف على دور موظفي التسجيل والبيانات الحساسة كهدف رئيسي"
    ],
    pedagogyTips: "اطرح على الطلبة تساؤلاً: لماذا تستهدف عصابات الفدية المدارس بالذات؟ ناقش معهم أهمية علامات الطلبة وسجلاتهم وقابليتها للابتزاز.",
    discussionQuestions: [
      "ما هي أثمن الأصول الرقمية في مدرستك من وجهة نظرك؟",
      "هل تعتقد أن المدارس مستثناة من الهجمات المنظمة؟ ولماذا؟"
    ]
  },
  1: {
    slideTitle: "ملف التهديد وملف المهاجم (Threat Actor Dossier)",
    refKey: "slide2_threat_actor",
    objectives: [
      "التمييز بين دوافع المهاجمين (مالية، تجسسية، تخريبية)",
      "فهم نموذج برمجيات الفدية كخدمة (RaaS)",
      "تحليل ملف المهاجم من حيث المهارة والمستهدفات والأساليب"
    ],
    pedagogyTips: "افتح تبويب 'ملف المهاجم' ودع الطلبة يحللون التكتيكات قبل الانتقال لفحص الشبكة.",
    discussionQuestions: [
      "ما الفارق بين مهاجم هاوٍ (Script Kiddie) ومجموعة فدية محترفة متخصصة؟",
      "كيف يجني مشغلو RaaS أموالهم حتى لو لم يكتبوا الشيفرة بأنفسهم؟"
    ]
  },
  2: {
    slideTitle: "خريطة الشبكة وأداة الفحص والـ Ping التفاعلية",
    refKey: "slide3_network_topology",
    objectives: [
      "استخدام أمر Ping لتحليل زمن الاستجابة وTTL ورصد الثغرات والمنافذ المفتوحة",
      "فهم أثر تجزئة الشبكات (VLAN Segmentation) في حماية أجهزة المختبرات",
      "ملاحظة التغير في حالة الأجهزة عند تحريك ساعة الحادثة بين 00:00 و 07:00 و 10:00"
    ],
    pedagogyTips: "وجه الطلبة لفحص 192.168.1.10 في الدقيقة 00:00 (طبيعي/ثغرة)، ثم قدم الساعة إلى 07:00 وأعد الفحص لمشاهدة التحذير الأحمر والاتصال بـ 203.0.113.45.",
    discussionQuestions: [
      "ماذا يعني ارتفاع التذبذب (Jitter) ووجود اتصال صادر بالمنفذ 443؟",
      "لماذا تفشل محاولات الوصول إلى شبكة المختبرات 192.168.2.0/24؟"
    ]
  },
  3: {
    slideTitle: "مصفوفة تقييم المخاطر السيبرانية وحساب الحرجية",
    refKey: "slide4_risk_assessment",
    objectives: [
      "تطبيق معادلة الخطر المعتمدة: (التهديد × الثغرة × الأثر) ÷ 125 × 100",
      "تصنيف مستويات الخطر حسب العتبات (منخفض 0-33، متوسط 34-66، مرتفع 67-100)",
      "ربط مؤشرات الحرجية بأولويات تخصيص ميزانيات الحماية"
    ],
    pedagogyTips: "اطلب من كل فريق حساب خطر تسريب علامات التوجيهي مقارنة بتعطل شاشة الإعلانات في المدخل.",
    discussionQuestions: [
      "إذا كان التهديد مرتفعاً لكن الثغرة معدومة، كم يبلغ الخطر الإجمالي؟",
      "كيف يؤثر التشفير في خفض عامل الأثر (Impact)؟"
    ]
  },
  4: {
    slideTitle: "موسوعة التهديدات السيبرانية والتشفير الهجين",
    refKey: "slide5_threat_encyclopedia",
    objectives: [
      "التمييز العلمي بين الفيروس (يحتاج تدخلاً) والدودة السيبرانية (تنتشر ذاتياً)",
      "فهم آلية التشفير الهجين: تشفير الملفات بـ AES وتشفير مفتاح AES بواسطة RSA",
      "دراسة تهديدات مثل SQL Injection و Man-in-the-Middle و Spear Phishing"
    ],
    pedagogyTips: "ركز على سبب استخدام التشفير الهجين: سرعة التشفير المتناظر للملفات الكبيرة، وأمان التشفير غير المتناظر لنقل المفاتيح.",
    discussionQuestions: [
      "لماذا لا يستخدم المخترق مفتاح RSA وحده لتشفير كافة الملفات الضخمة؟",
      "كيف استغلت دودة الفدية منفذ SMB 445 للانتشار التلقائي؟"
    ]
  },
  5: {
    slideTitle: "معمل كشف التصيد الاحتيالي الموجه (Spear Phishing)",
    refKey: "slide6_phishing_lab",
    objectives: [
      "كشف علامات البريد الاحتيالي الأربعة بالتدقيق المباشر",
      "تحليل الامتداد المزدوج المضلل (.xlsm.exe) والأيقونات الزائفة",
      "ملاحظة النطاقات الشبيهة (Typosquatting) مثل al-amal-schools-portal.example"
    ],
    pedagogyTips: "شجع الطلبة على تمرير الفأرة فوق الروابط قبل النقر للتحقق من الوجهة الحقيقية.",
    discussionQuestions: [
      "ما هي هندسة الإلحاح والضغط النفسي المستخدمة في عبارة 'افتحي الملف لتحديث الكشوف فوراً'؟",
      "كيف تمنع أنظمة التصفية المتقدمة الامتدادات المزدوجة التنفيذية؟"
    ]
  },
  6: {
    slideTitle: "لعبة مطابقة التهديد والثغرة والضابط الوقائي",
    refKey: "slide7_matching_game",
    objectives: [
      "ربط كل تهديد بالثغرة التي استغلها وضابط الحماية الدفاعي المناسب",
      "ترسيخ الدفاع المتعمق (Defense-in-Depth)",
      "تعزيز التنافسية الإيجابية بين فرق الصف"
    ],
    pedagogyTips: "اجعل الطلبة يتنافسون لحل الحالات الأربع وجمع النقاط لفريقهم في لوحة الشرف.",
    discussionQuestions: [
      "هل يكفي وجود جدار ناري إذا كانت كلمات المرور معادة الاستخدام وضعيفة؟",
      "ما أهمية التوثيق متعدد العوامل (MFA) في إحباط سرقة بيانات الاعتماد؟"
    ]
  },
  7: {
    slideTitle: "غرفة القرار وإدارة الأزمة (الدقيقة 10:00 - شاشة الفدية)",
    refKey: "slide8_decision_room",
    objectives: [
      "اتخاذ القرار المناسب عند وقوع الكارثة تحت ضغط العداد الزمني",
      "إدراك كارثية إطفاء الأجهزة فجأة (فقدان أدلة الذاكرة ومفتاح فك التشفير)",
      "فهم عواقب دفع الفدية والالتزام بالعزل الشبكي الحكيم"
    ],
    pedagogyTips: "دع الطلبة يناقشون الخيارات الثلاثة قبل الضغط. نبههم إلى أن الخيار (ب) هو الوحيد الذي يفتح أدلة الذاكرة في الشريحة 13.",
    discussionQuestions: [
      "لماذا تفضل فرق الاستجابة فصل كابل الشبكة بدلاً من الضغط على زر إيقاف التشغيل؟",
      "لماذا تحظر التشريعات دفع الفدية للمنظمات الإجرامية؟"
    ]
  },
  8: {
    slideTitle: "محاكي النسخ الاحتياطي: التراكمي vs التفاضلي",
    refKey: "slide9_backup_strategies",
    objectives: [
      "المقارنة العملية بين النسخ التراكمي والنسخ التفاضلي",
      "تحديد وسائط الاستعادة المطلوبة ليوم الخميس في كل استراتيجية",
      "تطبيق قاعدة النسخ الاحتياطي الذهبية 3-2-1"
    ],
    pedagogyTips: "بدّل بين التراكمي والتفاضلي واستعرض حركة الملفات المطلوبة للتعافي مع مقارنة أزمنة الاستعادة.",
    discussionQuestions: [
      "ماذا يحدث للنسخ التراكمي إذا تعرض شريط يوم الثلاثاء للتلف؟",
      "أيهما أفضل لمستشفى أو مدرسة ذات نظام درجات حيوي؟"
    ]
  },
  9: {
    slideTitle: "مركز العمليات الأمنية (SOC) وتحليل السجلات",
    refKey: "slide10_soc_dashboard",
    objectives: [
      "قراءة وتحليل سجلات النظام السيبرانية (Syslog / SIEM)",
      "متابعة تحول قاعدة جدار الحماية من SMB 445 ALLOWED إلى BLOCKED",
      "ربط السجلات بالخط الزمني للحادثة بدقة"
    ],
    pedagogyTips: "حرك شريط الوقت في الأعلى وشاهد كيف تتساقط السجلات الجديدة بالتزامن مع توقيت الحادثة.",
    discussionQuestions: [
      "ما هي المؤشرات الدالة على التسريب الخارجي (IoC) في السجلات؟",
      "كيف يساعد الربط الآلي للسجلات في اكتشاف الهجمات المعقدة؟"
    ]
  },
  10: {
    slideTitle: "سلسلة القتل السيبراني (Cyber Kill Chain)",
    refKey: "slide11_kill_chain",
    objectives: [
      "حفظ وفهم المراحل السبع لسلسلة القتل السيبراني من لوكهيد مارتن",
      "تحديد نقطة كسر السلسلة في كل مرحلة لمنع اكتمال الهجوم",
      "ربط كل حدث في مدرسة الأمل بالمرحلة المكافئة له"
    ],
    pedagogyTips: "أكد للطلبة أن المدافعين يفوزون إذا كسروا حلقة واحدة فقط، بينما يحتاج المهاجم لإكمال السلسلة كلها.",
    discussionQuestions: [
      "في أي مرحلة كان يمكن للموظفة سارة إيقاف الهجوم تماماً؟",
      "ما الفرق بين مرحلة التثبيت ومرحلة القيادة والتحكم؟"
    ]
  },
  11: {
    slideTitle: "حاسبة مؤشرات التعافي (RTO & RPO)",
    refKey: "slide12_rto_rpo",
    objectives: [
      "حساب نقطة الاستعادة المستهدفة (RPO) والهدف الزمني للتعافي (RTO)",
      "تصور نافذة فقدان البيانات وساعات التوقف عن العمل بيانياً",
      "إجراء مقايضة التكلفة والجاهزية بين فترات النسخ وسرعة الاستعادة"
    ],
    pedagogyTips: "جرب تغيير فترة النسخ من 24 ساعة إلى ساعة واحدة، ولاحظ كيف ينخفض فقدان البيانات لكن تزيد متطلبات التخزين.",
    discussionQuestions: [
      "إذا حدث الهجوم عند الساعة 10:00 وآخر نسخة كانت 06:00، كم ساعة من البيانات ضاعت؟",
      "كيف تساهم خطة RTO المنخفضة في استمرار الامتحانات المدرسية دون انقطاع؟"
    ]
  },
  12: {
    slideTitle: "التحقيق الجنائي الرقمي وسلسلة الحيازة والأدلة",
    refKey: "slide13_digital_forensics",
    objectives: [
      "ترتيب الأدلة حسب سرعة التلاشي (Order of Volatility): RAM أولاً ثم الشبكة ثم الأقراص",
      "مطابقة بصمة التجزئة الرقمية SHA-256 للتأكد من عدم العبث بالأدلة",
      "ملء نموذج سلسلة الحيازة القانوني (Chain of Custody)"
    ],
    pedagogyTips: "هذه الشريحة تفتح كنزاً حقيقياً إذا اختار الطلبة العزل في الشريحة 8: استخراج مفتاح AES من الذاكرة الحية لفك تشفير بيانات الطلبة!",
    discussionQuestions: [
      "لماذا تتلاشى بيانات الذاكرة RAM فور انقطاع التيار الكهربائي؟",
      "لماذا ترفض المحاكم أي دليل رقمي لا يمتلك سلسلة حيازة موثقة؟"
    ]
  },
  13: {
    slideTitle: "الإطار التشريعي وقانون حماية البيانات الشخصية الأردني 2023",
    refKey: "slide14_legal_framework",
    objectives: [
      "فهم نصوص قانون حماية البيانات الشخصية الأردني رقم 24 لسنة 2023",
      "التعرف على واجب الإشعار خلال 72 ساعة والمسؤولية الجزائية والمدنية للمؤسسات",
      "حماية بيانات القصّر (الطلبة) والتعامل مع تسريب الخصوصية"
    ],
    pedagogyTips: "ناقش الفرق بين التزام التبليغ والتستر؛ كيف يؤدي التستر إلى مضاعفة العقوبات وفقدان ثقة المجتمع المدرسي.",
    discussionQuestions: [
      "ما هي حقوق أولياء الأمور إذا تم تسريب علامات أبنائهم على الإنترنت المظلم؟",
      "ما هي الغرامات المترتبة على الإهمال الجسيم في حماية قواعد البيانات؟"
    ]
  },
  14: {
    slideTitle: "الاختبار التحصيلي النهائي وإصدار الشهادة المعتمدة",
    refKey: "slide15_quiz",
    objectives: [
      "قياس مدى استيعاب المفاهيم والمصطلحات والمهارات العملية",
      "تثبيت الفهم من خلال الشروحات الفورية بعد كل إجابة",
      "تتويج الطالب/الفريق بشهادة إنجاز تفاعلية قابلة للطباعة والتصدير"
    ],
    pedagogyTips: "دع كل فريق يحل الاختبار بالتصويت؛ الفائز يحصل على شهادة شرف باسم فريقه أو الطالب.",
    discussionQuestions: [
      "ما هو السؤال الأكثر إثارة للجدل بين أعضاء الفريق؟ ولماذا؟",
      "كيف ستطبق ما تعلمته في حماية أجهزتك الشخصية وحساباتك المدرسية؟"
    ]
  },
  15: {
    slideTitle: "المركز الإثرائي وبطاقة الخروج التأملية (Exit Ticket)",
    refKey: "slide16_enrichment",
    objectives: [
      "تزويد الطلبة بروابط ومصادر معتمدة للتعلم الذاتي من المركز الوطني للأمن السيبراني",
      "إتاحة تخصيص روابط الفيديو للمعلم بسهولة عبر حقول إدخال تفاعلية",
      "تعبئة وتصدير تذكرة الخروج (Exit Ticket) لتقييم المخرجات التأملية للحصة"
    ],
    pedagogyTips: "خصص 5 دقائق في نهاية الحصة ليقوم كل طالب بطباعة أو تصدير تذكرة الخروج كدليل على التعلم النشط.",
    discussionQuestions: [
      "ما هي أهم معلومة جديدة غيّرت مفهومك للأمن السيبراني اليوم؟",
      "ما هي الخطوة الأولى التي ستقوم بها لو وصلك بريد احتيالي في منزلك؟"
    ]
  }
};

export const TeacherNotesModal: React.FC = () => {
  const { currentSlide, teacherNotesOpen, setTeacherNotesOpen } = useIncident();

  if (!teacherNotesOpen) return null;

  const currentNotes = TEACHER_NOTES[currentSlide] || TEACHER_NOTES[0];
  const refData = TEXTBOOK_CONFIG.references[currentNotes.refKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                دليل المعلم والإرشادات التدريسية
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  الشريحة {currentSlide + 1}
                </span>
              </h2>
              <p className="text-xs text-slate-400 truncate max-w-md">
                {currentNotes.slideTitle}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setTeacherNotesOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="إغلاق دليل المعلم"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-sm">
          
          {/* Textbook Alignment Banner */}
          <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs text-cyan-400 font-medium">مرجع الكتاب المدرسي المعتمد:</div>
              <div className="text-sm font-semibold text-slate-200">{refData?.unit}</div>
              <div className="text-xs text-slate-400">{refData?.topic}</div>
            </div>
            <div className="px-3 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-amber-300 self-start sm:self-center font-bold">
              {refData?.pages}
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              الأهداف التعليمية والكفايات المستهدفة:
            </h3>
            <ul className="space-y-1.5 pr-2">
              {currentNotes.objectives.map((obj, i) => (
                <li key={i} className="text-slate-300 flex items-start gap-2 text-xs leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pedagogy Tips */}
          <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40">
            <h3 className="text-xs font-bold text-cyan-300 mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              إضاءة تربوية واستراتيجية التدريس المقترحة:
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentNotes.pedagogyTips}
            </p>
          </div>

          {/* Discussion Questions */}
          <div>
            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              أسئلة التفكير الناقد والمناقشة الصفية:
            </h3>
            <div className="space-y-2">
              {currentNotes.discussionQuestions.map((q, i) => (
                <div key={i} className="p-2.5 rounded bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                  <span className="text-amber-400 font-bold ml-1.5">س{i + 1}:</span>
                  {q}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>نصيحة سريعة: اضغط زر <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-slate-200">N</kbd> في أي وقت لفتح وإغلاق هذه النافذة.</span>
          <button
            onClick={() => setTeacherNotesOpen(false)}
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium transition"
          >
            فهمت
          </button>
        </div>

      </div>
    </div>
  );
};
