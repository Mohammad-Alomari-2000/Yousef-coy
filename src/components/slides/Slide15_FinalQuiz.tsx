import React, { useState } from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Printer,
  Sparkles,
  RotateCcw,
  Trophy
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'ما الفارق الجوهري بين دودة الفدية (Ransomworm) والفيروس التقليدي (Virus)؟',
    options: [
      'الدودة تنتشر ذاتياً عبر الشبكة دون تدخل بشري، بينما يحتاج الفيروس إلى ملف ناقل وتدخل المستخدم.',
      'الفيروس يستهدف الشبكات فقط بينما تستهدف الدودة الملفات الفردية فقط.',
      'لا يوجد أي فارق، الاسمان مترادفان في علم الأمن السيبراني.',
      'الفيروس يطلب فدية دائماً بينما الدودة تكتفي بالتجسس.'
    ],
    correctIndex: 0,
    explanationAr: 'الدودة تمتاز بقدرتها على الانتشار التلقائي الذاتي عبر منافذ الشبكة المفتوحة مثل SMB 445، في حين يحتاج الفيروس لتدخل المستخدم لتشغيل الملف الحامل.'
  },
  {
    id: 2,
    question: 'لماذا يعتبر إطفاء الجهاز المشتبه به عند ظهور شاشة الفدية خطأً جنائياً جسيماً؟',
    options: [
      'لأنه يؤدي إلى تلف الشاشة واللوحة الأم للجهاز.',
      'لأنه يتسبب في فقدان الأدلة الحية المتطايرة في الذاكرة (RAM) ومفتاح فك التشفير AES.',
      'لأن ذلك يمنع المهاجم من إرسال أداة فك التشفير.',
      'لأن إطفاء الجهاز مخالف لقوانين شركة الكهرباء.'
    ],
    correctIndex: 1,
    explanationAr: 'بيانات الذاكرة RAM تتلاشى فور انقطاع التيار الكهربائي (Volatile)، وبفقدانها يضيع مفتاح فك التشفير وسجلات الاتصال المباشر بخادم القيادة والتحكم C2.'
  },
  {
    id: 3,
    question: 'ما هو المنفذ الشبكي الذي استغلته دودة الفدية للحركة الجانبية نحو خادم النطاق وخادم SIS؟',
    options: [
      'المنفذ 80 (HTTP)',
      'المنفذ 53 (DNS)',
      'المنفذ 445 (SMB)',
      'المنفذ 21 (FTP)'
    ],
    correctIndex: 2,
    explanationAr: 'منفذ SMB 445 يستخدم لمشاركة الملفات والطباعة في شبكات ويندوز، واستغلال ثغراته يتيح التنقل التلقائي وتنفيذ الأوامر عن بعد.'
  },
  {
    id: 4,
    question: 'وفق قانون حماية البيانات الشخصية الأردني لسنة 2023، ما هي المهلة القصوى لإشعار الجهات المختصة؟',
    options: [
      'خلال 24 ساعة فقط',
      'خلال مدة لا تتجاوز 72 ساعة من تاريخ العلم بالخرق',
      'خلال شهر كامل من الحادثة',
      'لا يوجد أي إلزام زمني محدد'
    ],
    correctIndex: 1,
    explanationAr: 'ألزم القانون الأردني (المادة 13 و 14) مسؤولي البيانات بالإشعار خلال مدة لا تتجاوز 72 ساعة لضمان التدخل السريع للحد من الأضرار.'
  },
  {
    id: 5,
    question: 'في هجوم الفدية الهجين، ما الدور الذي تؤديه كل من خوارزميتي AES و RSA؟',
    options: [
      'تُستخدم AES لتشفير الملفات الضخمة لسرعتها، وتُستخدم RSA لتشفير مفتاح AES وحمايته.',
      'تُستخدم RSA لتشفير الملفات فقط، وتُستخدم AES للاتصال بالشبكة.',
      'تُستخدم AES لاختراق كلمة المرور، وRSA لتدمير الأقراص.',
      'تستخدمان لنفس الغرض دون تمايز.'
    ],
    correctIndex: 0,
    explanationAr: 'التشفير الهجين يجمع بين سرعة التشفير المتناظر (AES) في تشفير قواعد البيانات الكبيرة، وأمان التشفير غير المتناظر (RSA) في قفل المفتاح المتناظر بمفتاح المهاجم العام.'
  },
  {
    id: 6,
    question: 'عند استعادة بيانات يوم الخميس بنظام النسخ التفاضلي (Differential)، كم وسيطاً نحتاج؟',
    options: [
      '5 وسائط (الأحد + الإثنين + الثلاثاء + الأربعاء + الخميس)',
      'وسيطان فقط: نسخة الأحد الكاملة + نسخة الخميس التفاضلية',
      'وسيط واحد فقط هو نسخة الخميس',
      'جميع أشرطة الشهر الماضي'
    ],
    correctIndex: 1,
    explanationAr: 'النسخ التفاضلي يسجل تراكم التغييرات منذ آخر نسخة كاملة؛ لذا تكفي نسخة الأحد الكاملة ونسخة الخميس التفاضلية لاستعادة كافة البيانات.'
  }
];

export const Slide15_FinalQuiz: React.FC = () => {
  const { teams, activeTeamId, addScoreToActiveTeam } = useIncident();
  const refData = TEXTBOOK_CONFIG.references.slide15_quiz;
  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [recipientName, setRecipientName] = useState(activeTeam.name);

  const handleSelectOption = (qId: number, optIdx: number) => {
    sounds.playClick();
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / QUESTIONS.length) * 100);
  };

  const handleSubmitQuiz = () => {
    const finalPct = calculateScore();
    sounds.playSuccess();
    setShowResults(true);
    addScoreToActiveTeam(finalPct, 'اجتياز الاختبار النهائي للمحاكاة');
  };

  const handleResetQuiz = () => {
    sounds.playClick();
    setAnswers({});
    setShowResults(false);
  };

  const scorePct = calculateScore();
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto">
      {/* Textbook Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 no-print">
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

      {/* Quiz Header Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-xl no-print">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              الاختبار التحصيلي الشامل لكفايات الأمن السيبراني
            </h3>
            <p className="text-xs text-slate-400">
              أجب عن الأسئلة التالية لحصد نقاط التنافس الصفي واستخراج شهادة الإنجاز المعتمدة.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-slate-300">
          تمت الإجابة: <span className="text-cyan-400">{Object.keys(answers).length}</span> / {QUESTIONS.length}
        </div>
      </div>

      {/* Questions List */}
      {!showResults ? (
        <div className="space-y-4 no-print">
          {QUESTIONS.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                  سؤال {idx + 1}
                </span>
                <h4 className="text-xs md:text-sm font-bold text-slate-100 leading-relaxed">
                  {q.question}
                </h4>
              </div>

              <div className="space-y-2 pr-6">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[q.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`w-full text-right p-3 rounded-lg border text-xs transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-500 text-white font-bold shadow-md shadow-cyan-950/40'
                          : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mr-2 ${
                        isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-3">
            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-30 text-white rounded-xl text-sm font-bold shadow-lg transition flex items-center gap-2"
            >
              <span>تسليم الإجابات وعرض النتيجة والشهادة</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results and Printable Certificate */
        <div className="space-y-6">
          
          {/* Result Overview Banner */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl no-print">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl border ${
                scorePct >= 70 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' : 'bg-amber-950/80 border-amber-500 text-amber-400'
              }`}>
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">نتيجة الاختبار التحصيلي: {scorePct}%</h3>
                <p className="text-xs text-slate-300">
                  {scorePct >= 70
                    ? 'أداء متميز وجاهزية عالية في الاستجابة للحوادث السيبرانية! تم إصدار الشهادة.'
                    : 'محاولة جيدة؛ راجع الشروحات أدناه لتعزيز المفاهيم ثم أعد الاختبار.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الشهادة الرسمية</span>
              </button>
              <button
                onClick={handleResetQuiz}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                title="إعادة الاختبار"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Official Arabic Certificate */}
          <div className="p-8 md:p-12 rounded-2xl bg-slate-950 text-slate-100 border-4 border-amber-500/70 shadow-2xl relative overflow-hidden print:border-4 print:border-amber-600 print:text-black print:bg-white">
            
            {/* Certificate Decorative Elements */}
            <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
            <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />

            <div className="text-center space-y-4 max-w-2xl mx-auto">
              
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-bold font-mono">
                  KINGDOM OF JORDAN - MINISTRY OF EDUCATION CURRICULUM
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-amber-300 tracking-wide">
                  شهادة إنجاز في الاستجابة للحوادث السيبرانية
                </h2>
                <div className="text-xs text-slate-400 font-medium">
                  CERTIFICATE OF CYBER INCIDENT RESPONSE MASTERY
                </div>
              </div>

              <div className="py-2">
                <div className="text-xs text-slate-400">تشهد إدارة التدريب السيبراني في</div>
                <div className="text-lg font-bold text-white mt-1">
                  {TEXTBOOK_CONFIG.schoolName}
                </div>
              </div>

              <div className="py-2 border-y border-amber-500/30">
                <div className="text-xs text-slate-400">بأن البطل السيبراني / الفريق:</div>
                <div className="no-print mt-1">
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="text-center font-bold text-xl text-amber-300 bg-slate-900 border border-slate-700 rounded px-4 py-1 max-w-sm mx-auto block"
                    placeholder="اكتب اسم الطالب أو الفريق هنا"
                  />
                </div>
                <div className="hidden print:block text-2xl font-bold text-amber-600 mt-2">
                  {recipientName}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
                قد أتم بنجاح محاكاة الاستجابة لحادثة دودة الفدية، وأظهر كفاءة متميزة في فحص الشبكات، 
                وتحليل سلسلة القتل السيبراني (Kill Chain)، واستخراج الأدلة الرقمية الجنائية، 
                والامتثال لقانون حماية البيانات الشخصية الأردني لسنة 2023 بمعدل تحصيلي: 
                <strong className="text-amber-400 font-mono text-sm mr-1">{scorePct}%</strong>.
              </p>

              <div className="pt-6 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-800">
                <div>
                  <div className="font-bold text-slate-200">المركز الوطني للأمن السيبراني</div>
                  <div className="text-[10px]">Jordan NCSC Standard</div>
                </div>

                <div className="w-16 h-16 rounded-full border-2 border-amber-500/40 flex items-center justify-center text-amber-400 font-mono text-[9px] font-bold text-center">
                  ختم الاعتماد<br />OFFICIAL
                </div>

                <div>
                  <div className="font-bold text-slate-200">منسق الأمن السيبراني المدرسي</div>
                  <div className="text-[10px] font-mono">2026-10-19</div>
                </div>
              </div>

            </div>
          </div>

          {/* Explanations & Review List */}
          <div className="space-y-3 no-print">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>مراجعة الإجابات والشروح النموذجية للكفايات:</span>
            </h4>

            {QUESTIONS.map((q, idx) => {
              const isCorrect = answers[q.id] === q.correctIndex;
              return (
                <div key={q.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">س{idx + 1}: {q.question}</span>
                    {isCorrect ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> إجابة صحيحة
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> إجابة غير دقيقة
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">
                    <span className="font-bold text-cyan-300">الشرح التعليمي: </span>
                    {q.explanationAr}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};
