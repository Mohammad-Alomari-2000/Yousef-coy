import React, { useState } from 'react';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  ShieldAlert,
  Code2,
  Mail,
  Zap,
  Radio,
  KeyRound,
  FileCode,
  Users2,
  Search,
  Filter,
  Key,
  Info
} from 'lucide-react';

interface ThreatCard {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'malware' | 'web' | 'social';
  icon: React.ElementType;
  severity: 'حرج' | 'مرتفع' | 'متوسط';
  color: string;
  descriptionAr: string;
  hybridEncryptionNote?: string;
  scenarioAr: string;
  mitigationAr: string;
}

export const Slide5_ThreatEncyclopedia: React.FC = () => {
  const refData = TEXTBOOK_CONFIG.references.slide5_threat_encyclopedia;
  const [filter, setFilter] = useState<'all' | 'malware' | 'web' | 'social'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<ThreatCard | null>(null);

  const threats: ThreatCard[] = [
    {
      id: 'ransomworm',
      nameAr: 'دودة الفدية (Ransomworm / دودة الفدية)',
      nameEn: 'WannaCry / LockBit Style Hybrid Ransomworm',
      category: 'malware',
      icon: ShieldAlert,
      severity: 'حرج',
      color: 'border-rose-500/70 text-rose-400 bg-rose-950/20',
      descriptionAr: 'برمجية خبيثة هجينة تجمع بين قدرة الدودة على الانتشار الذاتي التلقائي عبر الشبكة (دون حاجة لتدخل بشري عبر ثغرة SMB 445)، وقدرة برمجية الفدية على تشفير الملفات والمطالبة بمقابل مالي.',
      hybridEncryptionNote: 'تعتمد التشفير الهجين (Hybrid Encryption): حيث تُشفر الملفات الضخمة وقواعد بيانات SIS بخوارزمية AES المتناظرة فائقة السرعة، ثم يُشفر مفتاح AES بمفتاح RSA العام للمهاجم. مفتاح فك التشفير الحقيقي يظل عالقاً في ذاكرة RAM الحية كما سنكتشف في الشريحة 13!',
      scenarioAr: 'انتشرت تلقائياً من جهاز سارة 192.168.1.104 إلى خادم النطاق AD وخادم SIS خلال دقائق مستغلة المنفذ 445.',
      mitigationAr: 'تعطيل بروتوكول SMBv1، إغلاق منفذ 445 على الجدار الناري، وعزل الأجهزة وتحديث ترقيعات الأمان فوراً.'
    },
    {
      id: 'sqli',
      nameAr: 'حقن لغة الاستعلامات البنيوية (SQL Injection)',
      nameEn: 'SQL Injection Attack',
      category: 'web',
      icon: Code2,
      severity: 'حرج',
      color: 'border-amber-500/70 text-amber-400 bg-amber-950/20',
      descriptionAr: 'استغلال عدم تدقيق وتطهير مدخلات المستخدم في صفحات الويب لتمرير أوامر SQL خبيثة لقاعدة البيانات مباشرة وتجاوز المصادقة أو سرقة السجلات.',
      scenarioAr: `محاولة المهاجم ذي العنوان المرجعي ${TEXTBOOK_CONFIG.ips.sqliAttacker} حقن عبارة: (' OR '1'='1) في بوابة استعلام نتائج الطلبة للوصول إلى قاعدة بيانات الدرجات دون اسم مستخدم.`,
      mitigationAr: 'استخدام الاستعلامات المعلمة (Parameterized Queries / Prepared Statements) وتطبيق مبدأ الصلاحيات الدنيا لقواعد البيانات.'
    },
    {
      id: 'spear_phishing',
      nameAr: 'التصيد الاحتيالي الموجه (Spear Phishing)',
      nameEn: 'Spear Phishing Email',
      category: 'social',
      icon: Mail,
      severity: 'مرتفع',
      color: 'border-cyan-500/70 text-cyan-400 bg-cyan-950/20',
      descriptionAr: 'رسائل بريد إلكتروني احتيالية مصممة خصيصاً لاستهداف موظف محدد أو قسم بعينه بناء على جمع معلومات مسبق (Reconnaissance) لخداعه بفتح مرفق ملغوم أو تسليم بيانات سرية.',
      scenarioAr: `إرسال بريد احتيالي لسارة في قسم التسجيل من نطاق منتحل (${TEXTBOOK_CONFIG.domains.phishing}) بعنوان كشوفات تعديل الدرجات.`,
      mitigationAr: 'تفعيل بروتوكولات حماية البريد (SPF, DKIM, DMARC) والتدريب التوعوي الصارم للموظفين.'
    },
    {
      id: 'ddos',
      nameAr: 'هجوم حجب الخدمة الموزع (DDoS Attack)',
      nameEn: 'Distributed Denial of Service',
      category: 'web',
      icon: Zap,
      severity: 'مرتفع',
      color: 'border-purple-500/70 text-purple-400 bg-purple-950/20',
      descriptionAr: 'إغراق خوادم المدرسة أو بوابتها الإلكترونية بآلاف الطلبات الوهمية المتزامنة من شبكة روبوتات مخترقة (Botnet) لإرباك موارد المعالج وعرض النطاق وشل النظام عن خدمة الطلاب والمعلمين.',
      scenarioAr: 'إغراق بوابة الامتحانات الإلكترونية بسيل من حزم SYN Flood لمنع الطلبة من تسليم إجاباتهم في الوقت المحدد.',
      mitigationAr: 'استخدام خدمات التخفيف السحابية، ووضع قيود معدل الطلبات (Rate Limiting) بجدران الحماية WAF.'
    },
    {
      id: 'mitm',
      nameAr: 'هجوم الوسيط (Man-in-the-Middle)',
      nameEn: 'Man-in-the-Middle (MitM)',
      category: 'web',
      icon: Radio,
      severity: 'مرتفع',
      color: 'border-blue-500/70 text-blue-400 bg-blue-950/20',
      descriptionAr: 'اعتراض حركة الاتصال بين جهاز المستخدم وخادم المدرسة دون علمهما، مما يتيح للمهاجم قراءة البيانات غير المشفرة أو تعديلها أثناء انتقالها عبر شبكة Wi-Fi غير آمنة.',
      scenarioAr: 'إنشاء نقطة وصول لاسلكية وهمية (Rogue AP) باسم شبكة المدرسة واعتراض كلمات مرور دخول حسابات المعلمين.',
      mitigationAr: 'فرض التشفير التام عبر بروتوكول HTTPS/TLS، وتطبيق شهادات الأمان الصارمة ورفض الشبكات المفتوحة.'
    },
    {
      id: 'brute_force',
      nameAr: 'هجوم القوة العمياء وتخمين كلمات المرور (Brute Force)',
      nameEn: 'Brute Force & Dictionary Attack',
      category: 'web',
      icon: KeyRound,
      severity: 'متوسط',
      color: 'border-orange-500/70 text-orange-400 bg-orange-950/20',
      descriptionAr: 'محاولة تسجيل الدخول آلياً بتجربة آلاف الاحتمالات وقواميس كلمات المرور الشائعة حتى الوصول للكلمة الصحيحة.',
      scenarioAr: 'محاولات تسجيل دخول متكررة على حساب مشرف النطاق باستخدام قوائم كلمات مرور شائعة مثل Password123.',
      mitigationAr: 'قفل الحساب بعد عدد محدد من المحاولات الفاشلة، وفرض كلمات مرور معقدة وتفعيل التوثيق الثنائي (MFA).'
    },
    {
      id: 'trojan',
      nameAr: 'أحصنة طروادة (Trojan Horse)',
      nameEn: 'Trojan Horse Malware',
      category: 'malware',
      icon: FileCode,
      severity: 'مرتفع',
      color: 'border-emerald-500/70 text-emerald-400 bg-emerald-950/20',
      descriptionAr: 'برمجيات خبيثة تتخفى داخل برامج تبدو مفيدة أو بريئة (مثل تحديث برنامج الدرجات أو قارئ PDF) لتنفيذ مهام تخريبية بمجرد تشغيلها.',
      scenarioAr: 'الملف الملغوم (Grades_Update_Final.xlsm.exe) ظهر للموظفة كأيقونة إكسل اعتيادية بينما يحمل في باطنه حمولة الفدية.',
      mitigationAr: 'حظر تشغيل الملفات التنفيذية من مجلدات التنزيل والبريد، واستخدام قوائم التطبيقات المسموحة (Application Whitelisting).'
    },
    {
      id: 'social_eng',
      nameAr: 'الهندسة الاجتماعية المباشرة (Social Engineering)',
      nameEn: 'Direct Social Engineering & Pretexting',
      category: 'social',
      icon: Users2,
      severity: 'متوسط',
      color: 'border-pink-500/70 text-pink-400 bg-pink-950/20',
      descriptionAr: 'استغلال الطبيعة النفسية البشرية والثقة والمساعدة لخداع الأفراد ودفعهم للإفصاح عن معلومات سرية أو منح صلاحيات دون اختراق تقني.',
      scenarioAr: 'اتصال هاتفي يدعي فيه المتصل أنه من الدعم الفني بالوزارة يطلب من الموظفة سارة تزويده بكلمة سر بوابة الإدارة للصيانة.',
      mitigationAr: 'وضع إجراءات تحقق رسمية قبل مشاركة أي بيانات، وثقافة التحقق المتبادل بين موظفي المدرسة.'
    }
  ];

  const filteredThreats = threats.filter(t => {
    const matchesFilter = filter === 'all' || t.category === filter;
    const matchesSearch = t.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

      {/* Critical Concept Note: Worm vs Virus */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/50 flex items-start gap-3 shadow-lg">
        <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-rose-300">ملاحظة المنهاج الجوهرية (الفارق العلمي بين الدودة والفيروس):</span>{' '}
          الفارق الأساسي هو أن <strong className="text-white">دودة الفدية (Worm)</strong> تنتشر تلقائياً وبشكل ذاتي عبر الشبكة دون أي حاجة لتدخل بشري مستغلة الثغرات في البروتوكولات (مثل منفذ SMB 445)، بينما <strong className="text-white">الفيروس (Virus)</strong> يظل خاملاً ويحتاج حتماً إلى ملف ناقل وتدخل المستخدم لتشغيله أو نسخه!
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => { sounds.playClick(); setFilter('all'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              filter === 'all' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            جميع التهديدات ({threats.length})
          </button>
          <button
            onClick={() => { sounds.playClick(); setFilter('malware'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              filter === 'malware' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            البرمجيات الخبيثة (Malware)
          </button>
          <button
            onClick={() => { sounds.playClick(); setFilter('web'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              filter === 'web' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            هجمات الويب والشبكات
          </button>
          <button
            onClick={() => { sounds.playClick(); setFilter('social'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              filter === 'social' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            الهندسة الاجتماعية
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في التهديدات..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Threat Cards Grid (8 unique cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredThreats.map((threat) => {
          const Icon = threat.icon;
          return (
            <div
              key={threat.id}
              onClick={() => {
                sounds.playClick();
                setSelectedThreat(threat);
              }}
              className={`p-4 rounded-xl border bg-slate-900/80 hover:bg-slate-800/80 cursor-pointer transition flex flex-col justify-between space-y-3 shadow-lg hover:scale-[1.01] ${threat.color}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-current">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    threat.severity === 'حرج' ? 'bg-rose-900 text-rose-200' :
                    threat.severity === 'مرتفع' ? 'bg-amber-900 text-amber-200' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {threat.severity}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{threat.nameAr}</h4>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5" dir="ltr">{threat.nameEn}</div>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                  {threat.descriptionAr}
                </p>
              </div>

              {threat.hybridEncryptionNote && (
                <div className="p-2 rounded bg-rose-950/60 border border-rose-800/60 text-[10px] text-rose-300">
                  <span className="font-bold flex items-center gap-1">
                    <Key className="w-3 h-3" /> التشفير الهجين (AES+RSA)
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-400 font-semibold flex items-center justify-between">
                <span>عرض التفاصيل والسيناريو</span>
                <span>←</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Threat Modal Detail */}
      {selectedThreat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in no-print">
          <div className="bg-slate-900 border border-rose-500/50 rounded-xl shadow-2xl max-w-xl w-full p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-400">
                  <selectedThreat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedThreat.nameAr}</h3>
                  <div className="text-xs font-mono text-slate-400" dir="ltr">{selectedThreat.nameEn}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedThreat(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <p className="text-slate-300">{selectedThreat.descriptionAr}</p>

              {selectedThreat.hybridEncryptionNote && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/50 text-rose-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-rose-300">
                    <Key className="w-4 h-4" />
                    آلية التشفير الهجين (AES للبيانات + RSA للمفتاح):
                  </div>
                  <div>{selectedThreat.hybridEncryptionNote}</div>
                </div>
              )}

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-300">السيناريو في مدرسة الأمل:</div>
                <div className="text-slate-300">{selectedThreat.scenarioAr}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-300">إجراءات الحماية والوقاية (Mitigation):</div>
                <div className="text-slate-300">{selectedThreat.mitigationAr}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedThreat(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
