import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNetworkStatus, getDeviceState, formatTime } from '../utils/incidentLogic.ts';
import { NetworkStatus, DeviceState } from '../types/incident.ts';
import { sounds } from '../utils/soundEffects.ts';

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

interface IncidentContextType {
  currentTime: number; // 0 to 600 seconds
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  resetSimulation: () => void;
  jumpToTime: (time: number) => void;
  isContained: boolean;
  setIsContained: (contained: boolean) => void;
  evidenceUnlocked: boolean;
  setEvidenceUnlocked: (unlocked: boolean) => void;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  networkStatus: { status: NetworkStatus; labelAr: string; badgeColor: string };
  getDeviceCurrentState: (ip: string) => DeviceState;
  
  // Teams & Scoring
  teams: Team[];
  activeTeamId: string;
  setActiveTeamId: (id: string) => void;
  addScoreToActiveTeam: (points: number, reason?: string) => void;
  
  // Classroom Controls
  teacherNotesOpen: boolean;
  setTeacherNotesOpen: (open: boolean) => void;
  toggleTeacherNotes: () => void;
  fontScale: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const DEFAULT_TEAMS: Team[] = [
  { id: 'team1', name: 'فريق الصقور (Blue Team)', score: 0, color: 'text-blue-400 border-blue-500' },
  { id: 'team2', name: 'فريق النشامى (Cyber Guard)', score: 0, color: 'text-emerald-400 border-emerald-500' },
  { id: 'team3', name: 'فريق الرواد (Threat Hunters)', score: 0, color: 'text-amber-400 border-amber-500' },
  { id: 'team4', name: 'فريق السيبرانيين (SOC Analysts)', score: 0, color: 'text-purple-400 border-purple-500' },
];

const IncidentContext = createContext<IncidentContextType | null>(null);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTimeState] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isContained, setIsContainedState] = useState<boolean>(false);
  const [evidenceUnlocked, setEvidenceUnlocked] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Teams
  const [teams, setTeams] = useState<Team[]>(DEFAULT_TEAMS);
  const [activeTeamId, setActiveTeamId] = useState<string>('team1');

  // UI / Classroom
  const [teacherNotesOpen, setTeacherNotesOpen] = useState<boolean>(false);
  const [fontScale, setFontScale] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const setCurrentTime = (time: number) => {
    const clamped = Math.max(0, Math.min(600, Math.floor(time)));
    setCurrentTimeState(clamped);
  };

  const jumpToTime = (time: number) => {
    sounds.playClick();
    setCurrentTime(time);
  };

  const resetSimulation = () => {
    sounds.playAlert();
    setCurrentTimeState(0);
    setIsPlaying(false);
    setIsContainedState(false);
    setEvidenceUnlocked(false);
  };

  const togglePlay = () => {
    sounds.playClick();
    setIsPlaying(prev => !prev);
  };

  const setIsContained = (contained: boolean) => {
    setIsContainedState(contained);
    if (contained) {
      sounds.playContainment();
    }
  };

  // Clock progression when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeState(prev => {
        if (prev >= 600) {
          setIsPlaying(false);
          return 600;
        }
        return prev + 5; // 5 seconds per step for comfortable demonstration
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Network Status
  const networkStatus = getNetworkStatus(currentTime, isContained);

  const getDeviceCurrentState = (ip: string) => {
    return getDeviceState(ip, currentTime, isContained);
  };

  // Slides navigation
  const nextSlide = () => {
    sounds.playClick();
    setCurrentSlide(prev => Math.min(15, prev + 1));
  };

  const prevSlide = () => {
    sounds.playClick();
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  // Keyboard navigation & Shortcuts (Arrows for slides, N for notes, F for fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside input / textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        // In Arabic RTL, left arrow goes next!
        nextSlide();
      } else if (e.key === 'ArrowRight') {
        // Right arrow goes prev in RTL!
        prevSlide();
      } else if (e.key.toLowerCase() === 'n') {
        setTeacherNotesOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addScoreToActiveTeam = (points: number) => {
    if (points > 0) sounds.playSuccess();
    setTeams(prev => prev.map(t => t.id === activeTeamId ? { ...t, score: Math.max(0, t.score + points) } : t));
  };

  const toggleTeacherNotes = () => {
    sounds.playClick();
    setTeacherNotesOpen(prev => !prev);
  };

  const increaseFontSize = () => {
    setFontScale(prev => {
      const next = Math.min(1.3, prev + 0.1);
      document.documentElement.style.setProperty('--app-font-scale', next.toString());
      return next;
    });
  };

  const decreaseFontSize = () => {
    setFontScale(prev => {
      const next = Math.max(0.85, prev - 0.1);
      document.documentElement.style.setProperty('--app-font-scale', next.toString());
      return next;
    });
  };

  const toggleMute = () => {
    sounds.enabled = !sounds.enabled;
    setIsMuted(!sounds.enabled);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <IncidentContext.Provider
      value={{
        currentTime,
        setCurrentTime,
        isPlaying,
        togglePlay,
        resetSimulation,
        jumpToTime,
        isContained,
        setIsContained,
        evidenceUnlocked,
        setEvidenceUnlocked,
        currentSlide,
        setCurrentSlide,
        nextSlide,
        prevSlide,
        networkStatus,
        getDeviceCurrentState,
        teams,
        activeTeamId,
        setActiveTeamId,
        addScoreToActiveTeam,
        teacherNotesOpen,
        setTeacherNotesOpen,
        toggleTeacherNotes,
        fontScale,
        increaseFontSize,
        decreaseFontSize,
        isMuted,
        toggleMute,
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncident = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncident must be used within an IncidentProvider');
  }
  return context;
};
