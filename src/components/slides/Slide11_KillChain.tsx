import React from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { formatTime } from '../../utils/incidentLogic.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  ShieldAlert,
  Search,
  PackagePlus,
  Mail,
  Zap,
  HardDriveDownload,
  Radio,
  FileKey,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

interface KillChainStage {
  id: number;
  nameAr: string;
  nameEn: string;
  timelineMinutes: string;
  timelineSeconds: number;
  eventAtSchoolAr: string;
  breakPointAr: string;
  icon: React.ElementType;
}

const KILL_CHAIN_STAGES: KillChainStage[] = [
  {
    id: 1,
    nameAr: '1. الاستطلاع (Reconnaissance)',
    nameEn: 'Reconnaissance',
    timelineMinutes: 'قبل الحادثة',
    timelineSeconds: 0,
    eventAtSchoolAr: `جمع عناوين بريد موظفي مدرسة الأمل من موقع المدرسة وشبكات التواصل، وتحديد الموظفة سارة كهدف مثالي لامتلاكها صلاحيات التسجيل.`,
    breakPointAr: 'تقليل المعلومات الحساسة المنشورة علناً وتوعية الموظفين بعدم نشر بريدهم على المنتديات.',
    icon: Search
  },
  {
    id: 2,
    nameAr: '2. التسليح (Weaponization)',
    nameEn: 'Weaponization',
    timelineMinutes: 'قبل الحادثة',
    timelineSeconds: 0,
    eventAtSchoolAr: `تجهيز ملف تنفيذي مزدوج الامتداد (Grades_Update_Final.xlsm.exe) يحمل دودة الفدية وشفرة التشفير الهجين (AES+RSA).`,
    breakPointAr: 'أنظمة كشف التهديدات المتقدمة (Threat Intelligence) ومسح الملفات التنفيذية المشبوهة.',
    icon: PackagePlus
  },
  {
    id: 3,
    nameAr: '3. التوصيل (Delivery)',
    nameEn: 'Delivery',
    timelineMinutes: '00:00',
    timelineSeconds: 0,
    eventAtSchoolAr: `وصول رسالة البريد الاحتيالي الموجه من النطاق المنتحل (${TEXTBOOK_CONFIG.domains.phishing}) إلى صندوق بريد سارة.`,
    breakPointAr: 'تطبيق بروتوكولات حماية النطاق (SPF, DKIM, DMARC) وفلاتر حظر النطاقات المشبوهة.',
    icon: Mail
  },
  {
    id: 4,
    nameAr: '4. الاستغلال (Exploitation)',
    nameEn: 'Exploitation',
    timelineMinutes: '02:15',
    timelineSeconds: 135,
    eventAtSchoolAr: `سارة تفتح المرفق على الجهاز 192.168.1.104 تحت تأثير الإلحاح، لتبدأ البرمجية الخبيثة في تنفيذ شفرتها.`,
    breakPointAr: 'تدريب الموظفين على فحص المرفقات، وحظر تشغيل الملفات التنفيذية في بيئة المستخدمين.',
    icon: Zap
  },
  {
    id: 5,
    nameAr: '5. التثبيت والتجذر (Installation)',
    nameEn: 'Installation & Lateral Movement',
    timelineMinutes: '04:30 - 06:45',
    timelineSeconds: 270,
    eventAtSchoolAr: `تصعيد الصلاحيات بكلمة مرور المشرف المكررة، ثم الانتشار الذاتي عبر منفذ SMB 445 إلى خادم AD (192.168.1.10) وخادم SIS (192.168.1.15).`,
    breakPointAr: 'إدارة كلمات المرور (LAPS)، حظر بروتوكول SMB 445 على الشبكة الداخلية، وعزل الشبكات VLANs.',
    icon: HardDriveDownload
  },
  {
    id: 6,
    nameAr: '6. القيادة والتحكم (Command & Control)',
    nameEn: 'Command & Control (C2)',
    timelineMinutes: '08:50',
    timelineSeconds: 530,
    eventAtSchoolAr: `فتح قناة اتصال مشفرة عبر المنفذ 443 بخادم المهاجم الخارجي (${TEXTBOOK_CONFIG.ips.attackerC2}) وتسريب بيانات 450 طالباً.`,
    breakPointAr: 'مراقبة الاتصالات الصادرة (Egress Filtering)، وحظر الاتصالات غير المعتادة بجدران الحماية.',
    icon: Radio
  },
  {
    id: 7,
    nameAr: '7. تحقيق الأهداف (Actions on Objectives)',
    nameEn: 'Actions on Objectives',
    timelineMinutes: '10:00',
    timelineSeconds: 600,
    eventAtSchoolAr: `تشفير قواعد بيانات نظام SIS وظهور شاشة الفدية وطلب 2 BTC والابتزاز بنشر درجات الطلبة.`,
    breakPointAr: 'وجود نسخ احتياطية معزولة (Air-Gapped)، وخطة استجابة سريعة للعزل دون إطفاء الأجهزة.',
    icon: FileKey
  }
];

export const Slide11_KillChain: React.FC = () => {
  const { currentTime, jumpToTime } = useIncident();
  const refData = TEXTBOOK_CONFIG.references.slide11_kill_chain;

  // Determine active stage from clock
  const getStageStatus = (stageSecs: number, index: number) => {
    if (currentTime >= stageSecs && (index === 6 || currentTime < KILL_CHAIN_STAGES[index + 1]?.timelineSeconds)) {
      return 'active';
    }
    if (currentTime >= stageSecs) {
      return 'completed';
    }
    return 'upcoming';
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-6xl mx-auto">
      {/* Textbook Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span className="font-semibold text-slate-200">{refData.unit}</span>
          <span>•</span>
          <span>{refData.topic}</span>
        </div>
        <div className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
          مرجع الكتاب: {refData.pages}
        </div>
      </div>

      {/* Intro Header */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              نموذج سلسلة القتل السيبراني (Cyber Kill Chain - 7 Phases)
            </h3>
            <p className="text-xs text-slate-400">
              مراحل الهجوم السبع من لوكهيد مارتن مطبقة على حادثة مدرسة الأمل ومربوطة بساعة الحادثة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-slate-400">الوقت الآني:</span>
          <span className="font-bold text-rose-300">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* 7 Kill Chain Stages Stack */}
      <div className="space-y-3">
        {KILL_CHAIN_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const status = getStageStatus(stage.timelineSeconds, idx);
          const isCurrentActive = status === 'active';

          return (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border transition-all ${
                isCurrentActive
                  ? 'bg-rose-950/60 border-rose-500 shadow-xl shadow-rose-950/60 scale-[1.01]'
                  : status === 'completed'
                  ? 'bg-slate-900/80 border-slate-700/80 text-slate-300'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                
                {/* Title & Stage Details */}
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg border shrink-0 ${
                    isCurrentActive
                      ? 'bg-rose-600 text-white border-rose-400'
                      : status === 'completed'
                      ? 'bg-slate-800 text-emerald-400 border-emerald-600/50'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white">{stage.nameAr}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300" dir="ltr">
                        {stage.nameEn}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                        التوقيت: {stage.timelineMinutes}
                      </span>
                      {isCurrentActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                          المرحلة النشطة الآن!
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {stage.eventAtSchoolAr}
                    </p>
                  </div>
                </div>

                {/* Jump Clock Button */}
                <button
                  onClick={() => jumpToTime(stage.timelineSeconds)}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono transition shrink-0 self-start md:self-center border border-slate-700"
                >
                  انتقال الساعة إلى {formatTime(stage.timelineSeconds)}
                </button>

              </div>

              {/* Break the chain defense point */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-start gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <span className="font-bold text-emerald-300">نقطة كسر السلسلة (Break the Chain):</span>{' '}
                  {stage.breakPointAr}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Defensive Wisdom Footer */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <div>
          <strong>القاعدة الذهبية لفريق الدفاع السيبراني:</strong> المهاجم يحتاج لإكمال جميع الحلقات السبع بنجاح ليحقق غايته، بينما يكفي المدافعين كسر حلقة واحدة فقط لإفشال الهجوم بالكامل وحماية المدرسة!
        </div>
      </div>
    </div>
  );
};
