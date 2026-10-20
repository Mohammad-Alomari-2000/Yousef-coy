import React, { useState } from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Search,
  Key,
  ShieldCheck,
  FileCheck2,
  HardDrive,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

interface VolatilityItem {
  id: string;
  nameAr: string;
  rank: number; // 1 = most volatile, 2 = medium, 3 = least volatile
  desc: string;
}

const INITIAL_VOLATILITY: VolatilityItem[] = [
  { id: 'disk', nameAr: 'أقراص التخزين الدائمة (Hard Drives & SSDs)', rank: 3, desc: 'بيانات غير متطايرة تحتفظ بمحتواها حتى بعد انقطاع التيار الكهربائي.' },
  { id: 'ram', nameAr: 'الذاكرة الحية المتطايرة (RAM)', rank: 1, desc: 'أعلى سرعة تلاشٍ؛ تفقد كل محتوياتها فور انقطاع الكهرباء وتضم مفاتيح التشفير والعمليات الحية.' },
  { id: 'network', nameAr: 'اتصالات الشبكة وجداول التوجيه والكاش (Network State & ARP Cache)', rank: 2, desc: 'اتصالات نشطة وسجلات تتبدد مع إعادة تشغيل بطاقة الشبكة أو الجهاز.' }
];

export const Slide13_DigitalForensics: React.FC = () => {
  const { evidenceUnlocked, addScoreToActiveTeam } = useIncident();
  const refData = TEXTBOOK_CONFIG.references.slide13_digital_forensics;

  const [activeTab, setActiveTab] = useState<'volatility' | 'hash' | 'custody' | 'ram_key'>('volatility');

  // (a) Volatility state
  const [volatilityOrder, setVolatilityOrder] = useState<VolatilityItem[]>(INITIAL_VOLATILITY);
  const [volatilityFeedback, setVolatilityFeedback] = useState<string | null>(null);

  // (b) Hash state
  const originalHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const [copyHash, setCopyHash] = useState<string>(originalHash);
  const [hashVerified, setHashVerified] = useState<boolean | null>(null);

  // (c) Chain of Custody form state
  const [custodyData, setCustodyData] = useState({
    evidenceId: 'EVD-2026-AMAL-001',
    evidenceDesc: 'صورة جنائية طبق الأصل (Raw Forensic DD Image) لخادم SIS 192.168.1.15',
    collectorName: 'فريق الاستجابة - مدرسة الأمل',
    dateTime: '2026-10-19 10:15 صباحاً',
    hashSha256: originalHash,
    location: 'خزنة الأدلة الرقمية المقفلة - غرفة السيرفرات',
    custodyTransfer: 'تم التسليم إلى وحدة مكافحة الجرائم الإلكترونية للمطابقة الجنائية'
  });

  const moveVolatility = (index: number, direction: 'up' | 'down') => {
    sounds.playClick();
    const newItems = [...volatilityOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setVolatilityOrder(newItems);
  };

  const checkVolatilityOrder = () => {
    // Correct order: rank 1 (RAM), rank 2 (Network), rank 3 (Disk)
    const isCorrect = volatilityOrder[0].rank === 1 && volatilityOrder[1].rank === 2 && volatilityOrder[2].rank === 3;
    if (isCorrect) {
      sounds.playSuccess();
      setVolatilityFeedback('صحيح 100%! ترتيب التلاشي للأدلة الرقمية وفق معايير RFC 3227: الذاكرة RAM أولاً، ثم اتصالات الشبكة، ثم أقراص التخزين (+30 نقطة).');
      addScoreToActiveTeam(30, 'ترتيب صحيح لأدلة التلاشي الرقمي');
    } else {
      sounds.playAlert();
      setVolatilityFeedback('الترتيب غير صحيح! تذكر أن الأدلة التي تفقد محتواها بمجرد فصل الكهرباء تأتي أولاً.');
    }
  };

  const handleVerifyHash = () => {
    sounds.playClick();
    if (copyHash.trim().toLowerCase() === originalHash.toLowerCase()) {
      sounds.playSuccess();
      setHashVerified(true);
      addScoreToActiveTeam(20, 'التحقق من سلامة الدليل الجنائي ببصمة الهاش');
    } else {
      sounds.playAlert();
      setHashVerified(false);
    }
  };

  const handlePrintCustody = () => {
    window.print();
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

      {/* Forensics Lab Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-800 gap-2">
        <button
          onClick={() => { sounds.playClick(); setActiveTab('volatility'); }}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
            activeTab === 'volatility'
              ? 'bg-slate-900 border-cyan-500/50 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>(أ) ترتيب التلاشي للأدلة (Order of Volatility)</span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('hash'); }}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
            activeTab === 'hash'
              ? 'bg-slate-900 border-cyan-500/50 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4 text-cyan-400" />
          <span>(ب) فحص مطابقة الهاش SHA-256</span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('custody'); }}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
            activeTab === 'custody'
              ? 'bg-slate-900 border-cyan-500/50 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-cyan-400" />
          <span>(ج) استمارة سلسلة الحيازة (Chain of Custody)</span>
        </button>

        {evidenceUnlocked && (
          <button
            onClick={() => { sounds.playClick(); setActiveTab('ram_key'); }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
              activeTab === 'ram_key'
                ? 'bg-slate-900 border-amber-500/50 text-amber-300'
                : 'border-transparent text-amber-400 hover:text-amber-200'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>(د) مفتاح التشفير المستخرج من RAM (مفتوح!)</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">Secret</span>
          </button>
        )}
      </div>

      {/* Tab A: Order of Volatility Activity */}
      {activeTab === 'volatility' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-sm font-bold text-white">
                نشاط تفاعلي: ترتيب جمع الأدلة الرقمية حسب سرعة التلاشي (RFC 3227)
              </h3>
              <p className="text-xs text-slate-400">
                استخدم أزرار الأسهم لترتيب الأدلة من الأكثر تطايراً وتلاشياً في الأعلى إلى الأقل تطايراً في الأسفل.
              </p>
            </div>
            <button
              onClick={checkVolatilityOrder}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تحقق من صحة الترتيب</span>
            </button>
          </div>

          {volatilityFeedback && (
            <div className={`p-3 rounded-lg border text-xs font-semibold ${
              volatilityFeedback.includes('صحيح')
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60'
                : 'bg-rose-950/80 text-rose-300 border-rose-500/60'
            }`}>
              {volatilityFeedback}
            </div>
          )}

          <div className="space-y-3">
            {volatilityOrder.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 transition hover:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 font-mono">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{item.nameAr}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveVolatility(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-20 text-slate-300"
                    title="تحريك لأعلى"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveVolatility(idx, 'down')}
                    disabled={idx === volatilityOrder.length - 1}
                    className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-20 text-slate-300"
                    title="تحريك لأسفل"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab B: SHA-256 Hash Verification */}
      {activeTab === 'hash' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white">
              فحص مطابقة بصمة التجزئة الرقمية (SHA-256 Hash Verification)
            </h3>
            <p className="text-xs text-slate-400">
              قاعدة القبول القضائي: لا يُقبل الدليل الرقمي في المحكمة ما لم تتطابق بصمة الهاش للصورة الجنائية مع القرص الأصلي بتطابق تام بنسبة 100%.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Original hash */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-sans font-bold">بصمة القرص الأصلي لخادم SIS (Original Disk):</div>
              <div className="text-cyan-400 font-bold break-all select-all">{originalHash}</div>
            </div>

            {/* Copy hash */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-sans font-bold">بصمة الصورة الجنائية المأخوذة للتحقيق (Forensic Bit-Stream Image):</div>
              <input
                type="text"
                value={copyHash}
                onChange={(e) => {
                  setCopyHash(e.target.value);
                  setHashVerified(null);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleVerifyHash}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>إجراء التحقق والمطابقة الآن</span>
              </button>

              <button
                onClick={() => setCopyHash(originalHash.replace('e', 'f'))}
                className="text-[11px] text-slate-400 hover:text-rose-400 underline"
              >
                محاكاة تلاعب أو تلف في الصورة الجنائية
              </button>

              <button
                onClick={() => setCopyHash(originalHash)}
                className="text-[11px] text-slate-400 hover:text-emerald-400 underline"
              >
                إعادة البصمة الصحيحة
              </button>
            </div>

            {hashVerified === true && (
              <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500 text-emerald-300 flex items-center gap-2.5 font-sans">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong>تطابق تام (Bit-by-Bit Identical):</strong> بصمة الهاش متطابقة 100%. الدليل الرقمي سليم، ولم يتم التلاعب بأي بايت أثناء الاستخراج، وهو صالح للاستخدام في التحقيق الجنائي والمحاكمة.
                </div>
              </div>
            )}

            {hashVerified === false && (
              <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500 text-rose-300 flex items-center gap-2.5 font-sans">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <strong>فشل المطابقة (Hash Mismatch):</strong> البصمتان غير متطابقتين! هذا يعني حدوث تلف في البيانات أو تلاعب مقصود، والدليل باطل قانونياً.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab C: Chain of Custody Form */}
      {activeTab === 'custody' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-sm font-bold text-white">
                استمارة سلسلة الحيازة الرقمية (Chain of Custody Form)
              </h3>
              <p className="text-xs text-slate-400">
                توثيق رسمي غير منقطع لمسار الدليل الجنائي منذ لحظة التحريز حتى وصوله للمحكمة.
              </p>
            </div>

            <button
              onClick={handlePrintCustody}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>طباعة الاستمارة (Print / PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">رقم معرّف الدليل (Evidence ID):</label>
              <input
                type="text"
                value={custodyData.evidenceId}
                onChange={(e) => setCustodyData({ ...custodyData, evidenceId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">اسم المحقق الرقمي ومسؤول التحريز:</label>
              <input
                type="text"
                value={custodyData.collectorName}
                onChange={(e) => setCustodyData({ ...custodyData, collectorName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">تاريخ وساعة التحريز الدقيقة:</label>
              <input
                type="text"
                value={custodyData.dateTime}
                onChange={(e) => setCustodyData({ ...custodyData, dateTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">مكان الحفظ الحالي الآمن:</label>
              <input
                type="text"
                value={custodyData.location}
                onChange={(e) => setCustodyData({ ...custodyData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 font-sans"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-slate-400 font-semibold">وصف الدليل ومصدره:</label>
              <input
                type="text"
                value={custodyData.evidenceDesc}
                onChange={(e) => setCustodyData({ ...custodyData, evidenceDesc: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 font-sans"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-slate-400 font-semibold">بصمة التجزئة الرقمية SHA-256 المعتمدة:</label>
              <input
                type="text"
                value={custodyData.hashSha256}
                readOnly
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-cyan-400 font-mono select-all"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-slate-400 font-semibold">بيانات التسليم والجهة المستلمة:</label>
              <textarea
                value={custodyData.custodyTransfer}
                onChange={(e) => setCustodyData({ ...custodyData, custodyTransfer: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 font-sans"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab D: RAM Key Extraction (Unlocked only if Option B was chosen in Slide 8) */}
      {activeTab === 'ram_key' && evidenceUnlocked && (
        <div className="bg-amber-950/30 border-2 border-amber-500 rounded-xl p-5 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center gap-3 border-b border-amber-800/80 pb-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                تم استخراج مفتاح فك التشفير الحقيقي (AES Decryption Key) من الذاكرة الحية!
              </h3>
              <p className="text-xs text-amber-300">
                بفضل قراركم بعدم إطفاء الأجهزة في الشريحة 8، استطاع فريق التحقيق الرقمي قراءة تفريغ الذاكرة (Memory Dump) واستخلاص المفتاح.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-amber-800 font-mono text-xs space-y-2 text-slate-300">
            <div className="text-slate-500">
              volatility.py -f memdump.raw --profile=Win10x64_19041 yarascan -Y "AES_KEY"
            </div>
            <div className="text-emerald-400 font-bold">
              [+] Match found at offset 0x0004FA1B in process 'system_updater.exe' (PID 4812)
            </div>
            <div className="p-3 rounded bg-slate-900 border border-slate-800 text-amber-300 text-sm font-bold flex items-center justify-between" dir="ltr">
              <span>AES-256-CBC KEY: 4A7F9B2C1D8E03F5927A6B8C4D1E3F5A</span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-sans">مفتاح صالح</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-amber-800/60 text-xs text-slate-200 leading-relaxed">
            <strong>الإنجاز الأمني:</strong> باستخدام هذا المفتاح، استعادت مدرسة الأمل النموذجية علامات الـ 450 طالباً دون دفع مليم واحد لعصابة الفدية، وتم إحباط خطة الابتزاز بالكامل!
          </div>
        </div>
      )}

    </div>
  );
};
