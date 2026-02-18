'use client';

import { useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Timer, Coffee, Bell, BellOff, ChevronUp, ChevronDown, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type TimerPhase = 'work' | 'shortBreak' | 'longBreak';

// Timer durations in seconds
const WORK_DURATION = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

// Default state for SSR
const DEFAULT_STATE: PomodoroState = {
  phase: 'work',
  timeRemaining: WORK_DURATION,
  isRunning: false,
  completedPomodoros: 0,
  completedSets: 0,
};

// Alarm sound using Web Audio API
function useAlarmSound() {
  const playAlarm = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playBeep = (freq: number, delay: number, duration: number) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.5, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + duration);
        }, delay);
      };
      
      playBeep(800, 0, 0.5);
      playBeep(800, 600, 0.5);
      playBeep(1000, 1200, 0.8);
    } catch {
      // Audio not supported
    }
  }, []);

  return { playAlarm };
}

const STORAGE_KEY = 'eduhub-pomodoro-state';

interface PomodoroState {
  phase: TimerPhase;
  timeRemaining: number;
  isRunning: boolean;
  completedPomodoros: number;
  completedSets: number;
}

export function PomodoroWidget() {
  const { playAlarm } = useAlarmSound();
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Always start with default state for SSR consistency
  const [state, setState] = useState<PomodoroState>(DEFAULT_STATE);

  // Load saved state from localStorage after hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Use queueMicrotask to avoid synchronous setState in effect
        queueMicrotask(() => {
          setState({
            ...parsed,
            isRunning: false, // Always start paused
            timeRemaining: parsed.timeRemaining || WORK_DURATION,
          });
        });
      }
    } catch {
      // ignore
    }
    queueMicrotask(() => setIsHydrated(true));
  }, []);

  // Timer effect with phase transition logic inside
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.isRunning) {
      interval = setInterval(() => {
        setState((prev) => {
          if (prev.timeRemaining <= 1) {
            if (soundEnabled) {
              playAlarm();
            }
            
            if (prev.phase === 'work') {
              const newCompletedPomodoros = prev.completedPomodoros + 1;
              
              if (newCompletedPomodoros >= 4) {
                return {
                  phase: 'longBreak',
                  timeRemaining: LONG_BREAK,
                  isRunning: false,
                  completedPomodoros: 0,
                  completedSets: prev.completedSets + 1,
                };
              }
              
              return {
                ...prev,
                phase: 'shortBreak',
                timeRemaining: SHORT_BREAK,
                isRunning: false,
                completedPomodoros: newCompletedPomodoros,
              };
            } else {
              return {
                ...prev,
                phase: 'work',
                timeRemaining: WORK_DURATION,
                isRunning: false,
              };
            }
          }
          
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isRunning, soundEnabled, playAlarm]);

  // Save to localStorage (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const toggleTimer = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  }, []);

  const resetCurrentPhase = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      timeRemaining: prev.phase === 'work' ? WORK_DURATION : prev.phase === 'shortBreak' ? SHORT_BREAK : LONG_BREAK,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState({
      phase: 'work',
      timeRemaining: WORK_DURATION,
      isRunning: false,
      completedPomodoros: 0,
      completedSets: 0,
    });
  }, []);

  const skipPhase = useCallback(() => {
    setState((prev) => {
      if (prev.phase === 'work') {
        const newCompletedPomodoros = prev.completedPomodoros + 1;
        if (newCompletedPomodoros >= 4) {
          return {
            phase: 'longBreak',
            timeRemaining: LONG_BREAK,
            isRunning: false,
            completedPomodoros: 0,
            completedSets: prev.completedSets + 1,
          };
        }
        return {
          ...prev,
          phase: 'shortBreak',
          timeRemaining: SHORT_BREAK,
          isRunning: false,
          completedPomodoros: newCompletedPomodoros,
        };
      } else {
        return {
          ...prev,
          phase: 'work',
          timeRemaining: WORK_DURATION,
          isRunning: false,
        };
      }
    });
  }, []);

  const extendLongBreak = useCallback(() => {
    if (state.phase === 'longBreak') {
      setState((prev) => ({
        ...prev,
        timeRemaining: prev.timeRemaining + 15 * 60,
      }));
    }
  }, [state.phase]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const totalTime = state.phase === 'work' ? WORK_DURATION : state.phase === 'shortBreak' ? SHORT_BREAK : LONG_BREAK;
  const progress = ((totalTime - state.timeRemaining) / totalTime) * 100;

  const phaseLabels: Record<TimerPhase, string> = {
    work: 'Focus',
    shortBreak: 'Break',
    longBreak: 'Long Break',
  };

  const phaseColors: Record<TimerPhase, string> = {
    work: 'bg-rose-500',
    shortBreak: 'bg-emerald-500',
    longBreak: 'bg-blue-500',
  };

  const phaseTextColors: Record<TimerPhase, string> = {
    work: 'text-rose-600 dark:text-rose-400',
    shortBreak: 'text-emerald-600 dark:text-emerald-400',
    longBreak: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {/* Collapsed / Mini view */}
      <div className={isExpanded ? 'hidden' : 'block'}>
        <div className="flex items-center gap-1">
          {/* Quick play/pause */}
          <button
            onClick={toggleTimer}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform",
              state.phase === 'work' 
                ? "bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                : state.phase === 'shortBreak'
                ? "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            )}
          >
            {state.isRunning ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white ml-0.5" />
            )}
          </button>
          
          {/* Timer display */}
          <button
            onClick={() => setIsExpanded(true)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 bg-card border rounded-full shadow-lg hover:bg-accent/50 transition-colors cursor-pointer",
            )}
          >
            <div className={cn(
              "w-2.5 h-2.5 rounded-full",
              phaseColors[state.phase]
            )} />
            <span className="text-sm font-mono font-medium">
              {formatTime(state.timeRemaining)}
            </span>
            <span className="text-xs text-muted-foreground">
              {phaseLabels[state.phase]}
            </span>
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Expanded view */}
      <div className={isExpanded ? 'block' : 'hidden'}>
        <div className="w-72 bg-card border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-rose-500" />
              <span className="font-medium text-sm">Pomodoro</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? (
                  <Bell className="h-3.5 w-3.5" />
                ) : (
                  <BellOff className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => setIsExpanded(false)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Phase & Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={cn('text-sm font-medium', phaseTextColors[state.phase])}>
                  {phaseLabels[state.phase]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {state.completedPomodoros + 1}/4
                </span>
              </div>
              <Progress value={progress} className={cn('h-2', phaseColors[state.phase])} />
            </div>

            {/* Timer Display */}
            <div className="text-center">
              <div className={cn('text-5xl font-mono font-bold', phaseTextColors[state.phase])}>
                {formatTime(state.timeRemaining)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button
                variant={state.isRunning ? 'secondary' : 'default'}
                size="sm"
                onClick={toggleTimer}
                className="flex-1"
              >
                {state.isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={resetCurrentPhase}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={skipPhase}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Long break extension */}
            {state.phase === 'longBreak' && (
              <Button variant="outline" size="sm" className="w-full" onClick={extendLongBreak}>
                <Coffee className="h-4 w-4 mr-2" />
                Add 15 min
              </Button>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
              <span>Sets: {state.completedSets}</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={resetAll}>
                Reset All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
