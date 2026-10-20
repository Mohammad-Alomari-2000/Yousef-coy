import React, { useState } from 'react';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { UserX, Shield, Skull, Target, DollarSign, Cpu, Globe, Crosshair, FileWarning } from 'lucide-react';

export const Slide2_ThreatActor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dossier'>('dossier');
  const refData = TEXTBOOK_CONFIG.references.slide2_threat_actor;

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto">
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

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('dossier')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
            activeTab === 'dossier'
              ? 'bg-slate-900 border-rose-500/50 text-rose-300'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <Skull className="w-4 h-4 text-rose-400" />
          <span>ملف المهاجم (Threat Actor Dossier)</span>
          <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded font-mono">جديد</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
            activeTab === 'overview'
              ? 'bg-slate-900 border-cyan-500/50 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>المشهد العام للتهديدات السيبرانية</span>
        </button>
      </div>

      {/* Tab 1: Threat Actor Dossier */}
      {activeTab === 'dossier' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-rose-500/40 shadow-xl space-y-4">
            
            {/* Dossier Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-500/50 flex items-center justify-center text-rose-400 font-mono text-xl font-bold shadow-inner">
                  APT-X
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">الرمز الميداني: فصيل "ShadowWorm Syndicate"</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-mono">
                      RaaS Operator
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    مجموعة جريمة إلكترونية منظمة متخصصة في ابتزاز قطاع التعليم باستخدام برمجيات الفدية الخدمية.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-500">C2 Server:</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-rose-400 font-bold">
                  {TEXTBOOK_CONFIG.ips.attackerC2}
                </span>
              </div>
            </div>

            {/* 4 Pillars of the Actor Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pillar 1: Motive */}
              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <DollarSign className="w-4 h-4" />
                  <span>الدافع الاستراتيجي (Motive)</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  مالي بحت (Financial Extortion & Double Extortion)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  الحصول على فدية مالية بالعملات المشفرة (2 BTC) مع استخدام أسلوب الابتزاز المزدوج: تشفير الملفات التشغيلية والمطالبة بفدية لاسترجاعها، والتهديد بنشر بيانات وسجلات علامات 450 طالباً على الإنترنت المظلم إن لم يُدفع المبلغ.
                </p>
              </div>

              {/* Pillar 2: Skill Level */}
              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>مستوى المهارة والقدرات (Skill Level)</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  متوسط إلى متقدم (Ransomware-as-a-Service Affiliate)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  يستخدم شفرات تشفير هجينة جاهزة مطورة بواسطة مبرمجين محترفين، مع مهارات عالية في الهندسة الاجتماعية المحلية، واكتشاف الثغرات في بروتوكول SMB 445، وأدوات استخراج الذاكرة والاعتماد.
                </p>
              </div>

              {/* Pillar 3: Target */}
              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
                  <Target className="w-4 h-4" />
                  <span>الهدف المحدد (Target Assets)</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  نظام SIS وخادم النطاق AD وسجلات 450 طالباً
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  استهداف الأجهزة التي تحوي بيانات الطلبة الحساسة (الجهاز 192.168.1.104 للتسجيل، والخادم 192.168.1.15 لنظام SIS، وخادم إدارة النطاق 192.168.1.10) لتعطيل العملية المدرسية بالكامل وخلق حالة ذعر فوري.
                </p>
              </div>

              {/* Pillar 4: Method */}
              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                  <Crosshair className="w-4 h-4" />
                  <span>الأسلوب والتكتيك (Method & TTPs)</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  تصيد موجه + استغلال SMB + تشفير هجين (AES + RSA)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  إرسال بريد احتيالي منتحل لنطاق شبيه ({TEXTBOOK_CONFIG.domains.phishing}) بملف ذي امتداد مزدوج، وتصعيد الصلاحيات بكلمات مرور مكررة، ثم تفعيل قدرة الدودة على الانتشار التلقائي بدون تدخل بشري عبر SMB 445.
                </p>
              </div>

            </div>

            {/* Note on Attacker Infrastructure */}
            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-start gap-2.5 text-xs text-rose-300">
              <FileWarning className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">المؤشرات السيبرانية الموثقة (Indicators of Compromise):</span> خادم القيادة والتحكم الخارجي C2 موثق بالرقم المرجعي التوثيقي RFC 5737: <span className="font-mono font-bold text-white px-1 bg-slate-950 rounded">{TEXTBOOK_CONFIG.ips.attackerC2}</span> عبر المنفذ المشفر 443 لنقل كشوف علامات 450 طالباً قبل التشفير.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-cyan-400">1. المهاجمون بدوافع مالية</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              يمثلون أكثر من 80% من هجمات الفدية على قطاع التعليم؛ يستغلون ضعف الميزانيات ونقص كوادر الأمن لحصد مبالغ سريعة.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-purple-400">2. مفهوم RaaS</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              برمجيات الفدية كخدمة: المطورون يوفرون الفيروس وشبكة C2 والمنتسبون (Affiliates) ينفذون الاختراق ويقتسمون أرباح الفدية بنسب محددة.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-emerald-400">3. أثر التوعية البشرية</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              العنصر البشري هو خط الدفاع الأول؛ تدريب موظفي التسجيل على كشف روابط التصيد يقلل فرص الاختراق الأولي بأكثر من 70%.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
