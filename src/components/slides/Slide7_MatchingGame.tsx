import React, { useState } from 'react';
import { useIncident } from '../../context/IncidentContext.tsx';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Shuffle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Shield,
  HelpCircle
} from 'lucide-react';

interface Scenario {
  id: number;
  threat: string;
  vuln: string;
  mitigation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    threat: 'انتشار دودة الفدية ذاتياً عبر الأجهزة دون تدخل بشري',
    vuln: 'منفذ SMB 445 مفتوح على الشبكة الداخلية مع استخدام بروتوكول SMBv1 غير المرقع',
    mitigation: 'إغلاق منفذ 445 على الجدار الناري وعزل الشبكات VLANs وتثبيت الترقيعات الأمنية'
  },
  {
    id: 2,
    threat: 'تسريب كشوفات علامات 450 طالباً إلى خادم C2 الخارجي (203.0.113.45)',
    vuln: 'غياب التصفية على الاتصالات الصادرة (Outbound Traffic) وعدم مراقبة حركة البيانات',
    mitigation: 'تفعيل قواعد منع تسريب البيانات (DLP) وتطبيق جدار ناري يرصد اتصالات C2 غير المعتادة'
  },
  {
    id: 3,
    threat: 'تصعيد الصلاحيات من مستخدم عادي إلى مدير عام (Domain Admin)',
    vuln: 'إعادة استخدام نفس كلمة مرور المشرف المحلي عبر أجهزة التسجيل والإدارة بدون تغيير',
    mitigation: 'تطبيق حل كلمات المرور المحلية المتغيرة (LAPS) وتفعيل التوثيق متعدد العوامل (MFA)'
  },
  {
    id: 4,
    threat: 'خداع الموظفة بفتح مرفق تنفيذي متنكر (.xlsm.exe)',
    vuln: 'إخفاء امتدادات الملفات الافتراضية بنظام التشغيل وضعف الوعي الأمني بمخاطر المرفقات',
    mitigation: 'إظهار امتدادات الملفات إجبارياً عبر سياسات النطاق وحظر تشغيل .exe من البريد الإلكتروني'
  }
];

export const Slide7_MatchingGame: React.FC = () => {
  const { addScoreToActiveTeam } = useIncident();
  const refData = TEXTBOOK_CONFIG.references.slide7_matching_game;

  const [selectedThreatId, setSelectedThreatId] = useState<number | null>(null);
  const [selectedVulnId, setSelectedVulnId] = useState<number | null>(null);
  const [selectedMitigationId, setSelectedMitigationId] = useState<number | null>(null);

  const [completedMatches, setCompletedMatches] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  // Shuffled items for classroom interaction
  const [shuffledVulns] = useState(() => [
    { id: 2, text: SCENARIOS[1].vuln },
    { id: 4, text: SCENARIOS[3].vuln },
    { id: 1, text: SCENARIOS[0].vuln },
    { id: 3, text: SCENARIOS[2].vuln }
  ]);

  const [shuffledMitigations] = useState(() => [
    { id: 3, text: SCENARIOS[2].mitigation },
    { id: 1, text: SCENARIOS[0].mitigation },
    { id: 4, text: SCENARIOS[3].mitigation },
    { id: 2, text: SCENARIOS[1].mitigation }
  ]);

  const handleMatchAttempt = (tId: number, vId: number, mId: number) => {
    if (tId === vId && vId === mId) {
      sounds.playSuccess();
      setCompletedMatches(prev => [...prev, tId]);
      addScoreToActiveTeam(30, 'مطابقة صحيحة للثلاثية الأمنية');
      setFeedback({
        text: 'أحسنت! مطابقة صحيحة 100%: تم ربط التهديد بالثغرة والضابط العلاجي المناسب (+30 نقطة)',
        isCorrect: true
      });
      setSelectedThreatId(null);
      setSelectedVulnId(null);
      setSelectedMitigationId(null);
    } else {
      sounds.playAlert();
      setFeedback({
        text: 'محاولة غير متطابقة! راجع طبيعة الثغرة المستغلة وكيف يسدها الضابط الوقائي المناسب.',
        isCorrect: false
      });
    }
  };

  const handleSelectThreat = (id: number) => {
    if (completedMatches.includes(id)) return;
    sounds.playClick();
    setSelectedThreatId(id);
    if (selectedVulnId && selectedMitigationId) {
      handleMatchAttempt(id, selectedVulnId, selectedMitigationId);
    }
  };

  const handleSelectVuln = (id: number) => {
    if (completedMatches.includes(id)) return;
    sounds.playClick();
    setSelectedVulnId(id);
    if (selectedThreatId && selectedMitigationId) {
      handleMatchAttempt(selectedThreatId, id, selectedMitigationId);
    }
  };

  const handleSelectMitigation = (id: number) => {
    if (completedMatches.includes(id)) return;
    sounds.playClick();
    setSelectedMitigationId(id);
    if (selectedThreatId && selectedVulnId) {
      handleMatchAttempt(selectedThreatId, selectedVulnId, id);
    }
  };

  const resetGame = () => {
    sounds.playAlert();
    setSelectedThreatId(null);
    setSelectedVulnId(null);
    setSelectedMitigationId(null);
    setCompletedMatches([]);
    setFeedback(null);
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

      {/* Header & Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Shuffle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              لعبة مطابقة ثلاثية الدفاع: التهديد ← الثغرة المستغلة ← الضابط الوقائي
            </h3>
            <p className="text-xs text-slate-400">
              اختر عنصراً من كل عمود لإكمال الربط الصحيح وحصد النقاط لفريقك.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono font-bold text-slate-300">
            المكتمل: <span className="text-emerald-400 text-sm">{completedMatches.length}</span> / 4
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition"
            title="إعادة ضبط اللعبة"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة البدء</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition animate-fade-in ${
          feedback.isCorrect
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60'
            : 'bg-rose-950/80 text-rose-300 border-rose-500/60'
        }`}>
          {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Three Columns Matching Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Column 1: Threats */}
        <div className="space-y-3">
          <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs font-bold text-rose-300 text-center flex items-center justify-center gap-2">
            <span>العمود 1: نمط التهديد (Threat)</span>
          </div>

          <div className="space-y-2">
            {SCENARIOS.map((s) => {
              const isCompleted = completedMatches.includes(s.id);
              const isSelected = selectedThreatId === s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => handleSelectThreat(s.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs transition leading-relaxed min-h-[90px] flex items-center justify-between ${
                    isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-slate-400 opacity-60 pointer-events-none line-through'
                      : isSelected
                      ? 'bg-rose-900/60 border-rose-400 text-white font-bold shadow-lg shadow-rose-950/60 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-rose-500/40 text-slate-300'
                  }`}
                >
                  <span>{s.threat}</span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Vulnerabilities */}
        <div className="space-y-3">
          <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-900/60 text-xs font-bold text-amber-300 text-center flex items-center justify-center gap-2">
            <span>العمود 2: الثغرة المستغلة (Vulnerability)</span>
          </div>

          <div className="space-y-2">
            {shuffledVulns.map((v) => {
              const isCompleted = completedMatches.includes(v.id);
              const isSelected = selectedVulnId === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => handleSelectVuln(v.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs transition leading-relaxed min-h-[90px] flex items-center justify-between ${
                    isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-slate-400 opacity-60 pointer-events-none line-through'
                      : isSelected
                      ? 'bg-amber-900/60 border-amber-400 text-white font-bold shadow-lg shadow-amber-950/60 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40 text-slate-300'
                  }`}
                >
                  <span>{v.text}</span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Mitigations */}
        <div className="space-y-3">
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-xs font-bold text-emerald-300 text-center flex items-center justify-center gap-2">
            <span>العمود 3: الضابط الوقائي (Mitigation)</span>
          </div>

          <div className="space-y-2">
            {shuffledMitigations.map((m) => {
              const isCompleted = completedMatches.includes(m.id);
              const isSelected = selectedMitigationId === m.id;

              return (
                <div
                  key={m.id}
                  onClick={() => handleSelectMitigation(m.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs transition leading-relaxed min-h-[90px] flex items-center justify-between ${
                    isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-slate-400 opacity-60 pointer-events-none line-through'
                      : isSelected
                      ? 'bg-emerald-900/60 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-950/60 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40 text-slate-300'
                  }`}
                >
                  <span>{m.text}</span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Completion Trophy Card */}
      {completedMatches.length === 4 && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/70 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-emerald-300">تهانينا! أتقنتم مبدأ الدفاع المتعمق (Defense in Depth)</div>
              <div className="text-xs text-slate-300">تمت مطابقة جميع التهديدات مع الثغرات والحلول بنجاح (+120 نقطة للفريق).</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
