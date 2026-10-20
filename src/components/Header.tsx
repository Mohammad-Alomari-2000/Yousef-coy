import React, { useState } from 'react';
import { useIncident } from '../context/IncidentContext.tsx';
import { formatTime, TIMELINE_MILESTONES } from '../utils/incidentLogic.ts';
import { TEXTBOOK_CONFIG } from '../utils/textbookConfig.ts';
import {
  Play,
  Pause,
  RotateCcw,
  Shield,
  Volume2,
  VolumeX,
  Maximize2,
  BookOpen,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Clock,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface HeaderProps {
  slideTitles: string[];
}

export const Header: React.FC<HeaderProps> = ({ slideTitles }) => {
  const {
    currentTime,
    setCurrentTime,
    isPlaying,
    togglePlay,
    resetSimulation,
    jumpToTime,
    isContained,
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide,
    networkStatus,
    teams,
    activeTeamId,
    setActiveTeamId,
    toggleTeacherNotes,
    increaseFontSize,
    decreaseFontSize,
    isMuted,
    toggleMute,
    toggleFullscreen
  } = useIncident();

  const [showTeamsMenu, setShowTeamsMenu] = useState(false);
  const [showMilestonesMenu, setShowMilestonesMenu] = useState(false);

  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  return (
    <header className="no-print bg-slate-900/90 backdrop-blur border-b border-slate-800 text-slate-200 sticky top-0 z-40 px-3 py-2.5 shadow-xl select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        
        {/* Top Row: School info, Live Network Status, Teams, Slide Nav, Tools */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          {/* Brand & School Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-inner">
              <Shield className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-slate-100 truncate tracking-wide">
                  {TEXTBOOK_CONFIG.schoolName}
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                  حادثة دودة الفدية
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {TEXTBOOK_CONFIG.curriculumName}
              </p>
            </div>
          </div>

          {/* Network State Badge */}
          <div className="flex items-center gap-2">
            <div className={`px-2.5 py-1 rounded-md border text-xs font-semibold flex items-center gap-1.5 transition-all ${networkStatus.badgeColor}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              <span>حالة الشبكة: {networkStatus.labelAr}</span>
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              title="الشريحة السابقة (السهم الأيمن)"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition"
              aria-label="الشريحة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-2 text-xs">
              <span className="text-slate-400">الشريحة</span>
              <select
                value={currentSlide}
                onChange={(e) => setCurrentSlide(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-rose-500 max-w-[160px] md:max-w-[220px] truncate"
                aria-label="اختر الشريحة"
              >
                {slideTitles.map((title, idx) => (
                  <option key={idx} value={idx}>
                    {idx + 1}. {title}
                  </option>
                ))}
              </select>
              <span className="text-slate-400 font-mono">/ 16</span>
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === 15}
              title="الشريحة التالية (السهم الأيسر)"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition"
              aria-label="الشريحة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Right Tools: Team Points, Font Size, Notes, Audio, Fullscreen */}
          <div className="flex items-center gap-1.5">
            {/* Teams score pill & dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTeamsMenu(!showTeamsMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-medium transition"
                title="لوحة الفرق والتنافس"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate max-w-[100px]">{activeTeam.name.split(' ')[0]}</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 font-bold font-mono">
                  {activeTeam.score} نقطة
                </span>
              </button>

              {showTeamsMenu && (
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2 z-50">
                  <div className="text-xs font-semibold text-slate-300 pb-1.5 mb-1.5 border-b border-slate-800 flex justify-between items-center">
                    <span>التنافس الصفي (اختر الفريق النشط):</span>
                  </div>
                  <div className="space-y-1">
                    {teams.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setActiveTeamId(t.id);
                          setShowTeamsMenu(false);
                        }}
                        className={`flex items-center justify-between p-1.5 rounded cursor-pointer text-xs transition ${
                          t.id === activeTeamId ? 'bg-slate-800 text-white font-bold border border-rose-500/50' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{t.name}</span>
                        <span className="font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 font-bold">
                          {t.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Font Zoom Controls */}
            <div className="flex items-center bg-slate-950/70 border border-slate-800 rounded-md p-0.5 text-slate-400">
              <button
                onClick={decreaseFontSize}
                className="px-1.5 py-0.5 hover:text-white text-xs font-bold rounded"
                title="تصغير الخط (A-)"
              >
                A−
              </button>
              <button
                onClick={increaseFontSize}
                className="px-1.5 py-0.5 hover:text-white text-xs font-bold rounded"
                title="تكبير الخط للبروجيكتور (A+)"
              >
                A+
              </button>
            </div>

            {/* Teacher Notes Button */}
            <button
              onClick={toggleTeacherNotes}
              className="p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition flex items-center gap-1"
              title="ملاحظات المعلم والإرشادات (اضغط N)"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">إرشادات المعلم</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              className={`p-1.5 rounded-md border text-xs transition ${
                isMuted ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-slate-800 border-slate-700 text-emerald-400 hover:text-emerald-300'
              }`}
              title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
              aria-label={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition"
              title="وضع ملء الشاشة للعارض (اضغط F)"
              aria-label="وضع ملء الشاشة"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Shared Incident Clock Scrubber & Milestones */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-2 flex flex-col md:flex-row items-center gap-3">
          
          {/* Controls: Play/Pause, Time, Reset */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={togglePlay}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50'
              }`}
              title={isPlaying ? 'إيقاف المحاكاة مؤقتاً' : 'تشغيل تدفق زمن الحادثة'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'إيقاف مؤقت' : 'تشغيل المحاكاة'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={resetSimulation}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-medium flex items-center gap-1 transition"
              title="إعادة ضبط المحاكاة إلى الدقيقة 00:00"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط المحاكاة</span>
            </button>

            {/* Big Clock Display */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-0.5 rounded border border-slate-800 font-mono text-sm font-bold text-rose-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTime(currentTime)}</span>
              <span className="text-[10px] text-slate-500 font-normal">/ 10:00</span>
            </div>
          </div>

          {/* Timeline Range Scrubber */}
          <div className="flex-1 w-full flex items-center gap-2 px-1">
            <span className="text-[11px] font-mono text-slate-500">00:00</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max="600"
                step="1"
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:accent-rose-400 focus:outline-none"
                aria-label="خط زمن الحادثة السيبرانية"
              />
            </div>
            <span className="text-[11px] font-mono text-slate-500">10:00</span>
          </div>

          {/* Milestone Quick Jumps */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-0.5 text-[11px] shrink-0">
            {TIMELINE_MILESTONES.map((m) => {
              const isActive = Math.abs(currentTime - m.timeInSeconds) <= 15;
              return (
                <button
                  key={m.timeString}
                  onClick={() => jumpToTime(m.timeInSeconds)}
                  className={`px-2 py-0.5 rounded font-mono transition whitespace-nowrap border ${
                    isActive
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/80 font-bold'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title={`${m.timeString} - ${m.titleAr} (${m.killChainPhase})`}
                >
                  {m.timeString}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </header>
  );
};
