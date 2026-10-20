import React, { useState, useEffect } from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Skull,
  AlertOctagon,
  Clock,
  PowerOff,
  Network,
  Coins,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Key,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const Slide8_DecisionRoom: React.FC = () => {
  const {
    jumpToTime,
    setIsContained,
    setEvidenceUnlocked,
    addScoreToActiveTeam,
    setCurrentSlide
  } = useIncident();

  const refData = TEXTBOOK_CONFIG.references.slide8_decision_room;

  // Classroom emergency decision timer (60 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'TIMEOUT' | null>(null);

  // Jump global simulation clock to 10:00 on entering this slide
  useEffect(() => {
    jumpToTime(600); // 10:00
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Emergency countdown
  useEffect(() => {
    if (!timerRunning || selectedOption !== null) return;
    if (timeLeft <= 0) {
      sounds.playAlert();
      setSelectedOption('TIMEOUT');
      setTimerRunning(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timerRunning, selectedOption]);

  const handleChooseOption = (option: 'A' | 'B' | 'C') => {
    sounds.playClick();
    setSelectedOption(option);
    setTimerRunning(false);

    if (option === 'B') {
      sounds.playSuccess();
      setIsContained(true);
      setEvidenceUnlocked(true);
      addScoreToActiveTeam(50, 'اتخاذ القرار الصحيح بعزل الشبكة وحفظ أدلة RAM');
    } else {
      sounds.playAlert();
    }
  };

  const resetDecision = () => {
    sounds.playClick();
    setSelectedOption(null);
    setTimeLeft(60);
    setTimerRunning(true);
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto">
      {/* Textbook Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="font-semibold text-slate-200">{refData.unit}</span>
          <span>•</span>
          <span>{refData.topic}</span>
        </div>
        <div className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
          مرجع الكتاب: {refData.pages}
        </div>
      </div>

      {/* Slide Title Banner with canonical 10:00 minute */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-red-950/90 via-slate-900 to-rose-950/90 border border-red-600/60 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-600/30 border border-red-500/50 text-red-400">
            <Skull className="w-7 h-7 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white">
                غرفة اتخاذ القرار وإدارة الأزمة (الدقيقة 10:00 - شاشة الفدية)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-red-600 text-white font-mono font-bold animate-pulse">
                RANSOM SCREEN
              </span>
            </div>
            <p className="text-xs text-slate-300">
              ظهرت رسالة طلب الفدية على شاشات خادم SIS والإدارة؛ أنتم الآن قادة الاستجابة للحادثة وعليكم اتخاذ القرار قبل فوات الأوان.
            </p>
          </div>
        </div>

        {/* Classroom Countdown Timer */}
        <div className="flex items-center gap-2 bg-slate-950/90 px-4 py-2 rounded-xl border border-red-600/50 shrink-0">
          <Clock className={`w-5 h-5 ${timeLeft <= 15 ? 'text-red-400 animate-spin' : 'text-amber-400'}`} />
          <div className="text-center font-mono">
            <div className="text-[10px] text-slate-400">مهلة القرار الصفي</div>
            <div className={`text-xl font-extrabold ${timeLeft <= 15 ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Ransom Screen Mockup */}
      <div className="bg-red-950/40 border-2 border-red-600 rounded-2xl p-5 shadow-2xl space-y-4 font-mono text-center relative overflow-hidden" dir="ltr">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-1">
          <div className="text-xl md:text-2xl font-black text-red-500 tracking-wider">
            ☠ ALL YOUR SIS DATABASE &amp; 450 STUDENTS' GRADES ARE ENCRYPTED ☠
          </div>
          <div className="text-xs text-red-300 font-sans">
            تم تشفير كافة سجلات مدرسة الأمل النموذجية بواسطة خوارزمية هجينة (AES-256 + RSA-2048)
          </div>
        </div>

        <div className="p-3 bg-black/70 border border-red-700/60 rounded-xl text-xs text-red-200 max-w-2xl mx-auto space-y-2 text-left" dir="ltr">
          <p className="leading-relaxed">
            - We have exfiltrated 450 students' confidential records and exam grades to our secure external storage (203.0.113.45).<br />
            - If you do not pay <span className="text-yellow-400 font-bold">2.0 BTC</span> within 24 hours, your data will be permanently dumped onto the Dark Web and local media will be notified.<br />
            - BTC Wallet: <span className="text-white bg-slate-900 px-2 py-0.5 rounded font-bold">bc1q-amal-school-ransom-demo-rf5737</span>
          </p>
        </div>
      </div>

      {/* Three Crucial Decisions (If not decided yet) */}
      {selectedOption === null && (
        <div className="space-y-3">
          <div className="text-center text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>ما هو الإجراء الفوري الواجب اتخاذه من قبل فريق الاستجابة للحوادث؟</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Option A */}
            <button
              onClick={() => handleChooseOption('A')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-rose-500/80 hover:bg-slate-800 text-right space-y-2 transition shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 group-hover:scale-110 transition">
                  <PowerOff className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 font-mono">الخيار (أ)</span>
              </div>
              <h4 className="text-sm font-bold text-white">إطفاء الأجهزة فجأة</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                سحب كوابل الكهرباء وإطفاء الخوادم فوراً لمنع كتابة المزيد من الملفات المشفرة.
              </p>
            </button>

            {/* Option B */}
            <button
              onClick={() => handleChooseOption('B')}
              className="p-4 rounded-xl bg-slate-900/90 border-2 border-cyan-500/60 hover:border-emerald-400 hover:bg-slate-800 text-right space-y-2 transition shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition">
                  <Network className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-400 font-mono">الخيار (ب)</span>
              </div>
              <h4 className="text-sm font-bold text-emerald-300">عزل الشبكة وإبقاء الأجهزة تعمل</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                فصل كوابل إيثرنت (Ethernet) وحظر المنفذ 445، مع إبقاء الأجهزة قيد التشغيل لحفظ الذاكرة RAM.
              </p>
            </button>

            {/* Option C */}
            <button
              onClick={() => handleChooseOption('C')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500/80 hover:bg-slate-800 text-right space-y-2 transition shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 font-mono">الخيار (ج)</span>
              </div>
              <h4 className="text-sm font-bold text-white">التفاوض ودفع الفدية (2 BTC)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                تحويل المبلغ المطلوب لعصابة الفدية لاستلام أداة فك التشفير وتجنب التشهير بالطلبة.
              </p>
            </button>

          </div>
        </div>
      )}

      {/* Consequence Screen: Option A */}
      {selectedOption === 'A' && (
        <div className="p-5 rounded-2xl bg-rose-950/70 border border-rose-500 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-rose-800/80 pb-3">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-rose-400" />
              <div>
                <h3 className="text-base font-bold text-white">نتيجة الخيار (أ): كارثة جنائية وفقدان أدلة الذاكرة!</h3>
                <span className="text-xs text-rose-300 font-medium">القرار خاطئ (-20 نقطة)</span>
              </div>
            </div>
            <button onClick={resetDecision} className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> إعادة المحاولة
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            بإطفاء التيار الكهربائي فجأة، <strong>تلاشت تماماً محتويات الذاكرة المتطايرة (RAM)</strong>! 
            كانت الذاكرة تحوي مفتاح فك التشفير (AES Key) غير المحمي بعد، ومعلومات الاتصال المباشر بخادم المهاجم C2، 
            وقائمة العمليات الخبيثة. ضاع المفتاح إلى الأبد ولن تتمكنوا من استخراج الدليل في الشريحة 13.
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-rose-800 text-xs text-rose-300">
            <strong>قاعدة الاستجابة للحوادث (NIST / المنهاج الأردني):</strong> لا تقم بإطفاء الجهاز المشتبه به، بل اعزله فوراً عن الشبكة عبر فصل كابل الإنترنت أو تعطيل Wi-Fi للحفاظ على الذاكرة الرقمية الحية.
          </div>
        </div>
      )}

      {/* Consequence Screen: Option B (CORRECT!) */}
      {selectedOption === 'B' && (
        <div className="p-5 rounded-2xl bg-emerald-950/70 border-2 border-emerald-500 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-base font-bold text-white">نتيجة الخيار (ب): قرار دفاعي احترافي مثالي! (+50 نقطة)</h3>
                <span className="text-xs text-emerald-300 font-medium">تم الاحتواء التام بنجاح وحفظ أدلة RAM الحية</span>
              </div>
            </div>
            <button onClick={resetDecision} className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> مراجعة الخيارات
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            بفصل الشبكة دون إطفاء الطاقة:
            1. تم إيقاف انتشار دودة الفدية فوراً إلى بقية أجهزة المدرسة ومختبرات الحاسوب (VLAN 20).
            2. قُطعت قناة الاتصال الصادرة إلى خادم القيادة والتحكم C2 ({TEXTBOOK_CONFIG.ips.attackerC2}).
            3. تم الحفاظ على محتويات الذاكرة الحية (RAM) سليمة، <strong>مما يفتح لكم الآن إمكانية استخراج مفتاح فك التشفير والأدلة الجنائية في الشريحة 13!</strong>
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <Key className="w-4 h-4 text-amber-400" />
              <span>مكافأة الإنجاز: تم فتح تحليل الأدلة الجنائية ومفتاح التشفير (Slide 13)</span>
            </div>
            <button
              onClick={() => setCurrentSlide(12)} // Slide 13 is index 12
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
            >
              <span>الانتقال لمختبر الأدلة الرقمية (الشريحة 13)</span>
              <span>←</span>
            </button>
          </div>
        </div>
      )}

      {/* Consequence Screen: Option C */}
      {selectedOption === 'C' && (
        <div className="p-5 rounded-2xl bg-amber-950/70 border border-amber-500 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-amber-800/80 pb-3">
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-base font-bold text-white">نتيجة الخيار (ج): دفع الفدية خيار محفوف بالمخاطر وغير قانوني!</h3>
                <span className="text-xs text-amber-300 font-medium">مخالفة نظامية (-30 نقطة)</span>
              </div>
            </div>
            <button onClick={resetDecision} className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> إعادة المحاولة
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            1. <strong>لا يوجد أي ضمان لاستعادة البيانات:</strong> تشير الإحصاءات إلى أن 47% من الضحايا الذين دفعوا لم يستعيدوا كافة ملفاتهم أو استلموا مفاتيح فك تشفير معطوبة.<br />
            2. <strong>البيانات سُربت بالفعل:</strong> خادم C2 قام بتسريب كشوفات علامات 450 طالباً عند الدقيقة 08:50، وبالتالي قد يتم ابتزاز المدرسة مجدداً بنشرها.<br />
            3. <strong>مخالفة قانونية:</strong> دفع الفدية يمول شبكات الجريمة المنظمة ويعد مخالفة للتعليمات الصادرة عن المركز الوطني للأمن السيبراني وقانون حماية البيانات الشخصية الأردني لسنة 2023.
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-amber-800 text-xs text-amber-300">
            <strong>نصيحة المنهاج:</strong> الحل العلمي السليم هو الاستعادة من النسخ الاحتياطية النظيفة المعزولة (Air-gapped) والاعتماد على التحقيق الجنائي لاستعادة المفاتيح.
          </div>
        </div>
      )}

      {/* Consequence Screen: Timeout */}
      {selectedOption === 'TIMEOUT' && (
        <div className="p-5 rounded-2xl bg-red-950/90 border-2 border-red-600 shadow-2xl space-y-3 animate-fade-in text-center">
          <Clock className="w-8 h-8 text-red-500 mx-auto animate-pulse" />
          <h3 className="text-base font-bold text-white">انتهى الوقت دون قرار حاسم!</h3>
          <p className="text-xs text-red-200 leading-relaxed max-w-xl mx-auto">
            تسبب التردد وبطء الاستجابة في انتشار دودة الفدية إلى كافة الأجهزة المتبقية عبر منفذ SMB 445، وتعرضت وسائط النسخ المتصلة للتشفير أيضاً! في حوادث الأمن السيبراني كل ثانية تحدث فرقاً بين النجاة والكارثة.
          </p>
          <button
            onClick={resetDecision}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold font-mono transition"
          >
            إعادة بدء سيناريو اتخاذ القرار
          </button>
        </div>
      )}

    </div>
  );
};
