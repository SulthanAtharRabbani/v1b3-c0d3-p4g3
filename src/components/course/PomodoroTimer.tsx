'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer, Coffee, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PomodoroTimerProps {
  className?: string;
}

type TimerPhase = 'work' | 'shortBreak' | 'longBreak';

// Timer durations in seconds
const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK = 5 * 60; // 5 minutes
const LONG_BREAK = 15 * 60; // 15 minutes (can be extended to 30)

// Alarm sound - using Web Audio API
function useAlarmSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playAlarm = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      
      // Play 3 beeps
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
    } catch (e) {
      console.error('Failed to play alarm:', e);
    }
  }, []);

  return { playAlarm };
}

const STORAGE_KEY = 'eduhub-pomodoro-state';

export function PomodoroTimer({ className }: PomodoroTimerProps) {
  const { playAlarm } = useAlarmSound();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Track completion state to avoid cascading setState
  const completionTriggeredRef = useRef(false);
  
  const [state, setState] = useState<PomodoroState>(() => {
    // Load from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            isRunning: false, // Always start paused
            timeRemaining: parsed.timeRemaining || WORK_DURATION,
          };
        } catch {
          // ignore
        }
      }
    }
    return {
      phase: 'work',
      timeRemaining: WORK_DURATION,
      isRunning: false,
      completedPomodoros: 0,
      completedSets: 0,
    };
  });

  // Timer effect - check for completion inside the interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.isRunning) {
      interval = setInterval(() => {
        setState((prev) => {
          if (prev.timeRemaining <= 1) {
            // Time's up - handle phase transition
            if (soundEnabled) {
              playAlarm();
            }
            
            if (prev.phase === 'work') {
              const newCompletedPomodoros = prev.completedPomodoros + 1;
              
              // Check if set is complete (4 pomodoros)
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
              // Break completed, start work
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

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

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
        timeRemaining: prev.timeRemaining + 15 * 60, // Add 15 minutes
      }));
    }
  }, [state.phase]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Calculate progress
  const totalTime = state.phase === 'work' ? WORK_DURATION : state.phase === 'shortBreak' ? SHORT_BREAK : LONG_BREAK;
  const progress = ((totalTime - state.timeRemaining) / totalTime) * 100;

  // Phase labels
  const phaseLabels: Record<TimerPhase, string> = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  const phaseColors: Record<TimerPhase, string> = {
    work: 'text-rose-600 dark:text-rose-400',
    shortBreak: 'text-emerald-600 dark:text-emerald-400',
    longBreak: 'text-blue-600 dark:text-blue-400',
  };

  const progressColors: Record<TimerPhase, string> = {
    work: 'bg-rose-500',
    shortBreak: 'bg-emerald-500',
    longBreak: 'bg-blue-500',
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Pomodoro Timer
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? (
              <Bell className="h-3.5 w-3.5" />
            ) : (
              <BellOff className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Phase indicator */}
        <div className="flex items-center justify-between">
          <span className={cn('text-xs font-medium', phaseColors[state.phase])}>
            {phaseLabels[state.phase]}
          </span>
          <span className="text-xs text-muted-foreground">
            {state.completedPomodoros + 1}/4 pomodoros
          </span>
        </div>

        {/* Progress bar */}
        <Progress value={progress} className={cn('h-2', progressColors[state.phase])} />

        {/* Timer display */}
        <div className="text-center py-2">
          <div className={cn('text-4xl font-mono font-bold', phaseColors[state.phase])}>
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
                <Pause className="h-3.5 w-3.5 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 mr-1" />
                Start
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={resetCurrentPhase}>
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={skipPhase}>
            Skip
          </Button>
        </div>

        {/* Long break extension */}
        {state.phase === 'longBreak' && (
          <Button variant="outline" size="sm" className="w-full" onClick={extendLongBreak}>
            <Coffee className="h-3.5 w-3.5 mr-1" />
            Add 15 min
          </Button>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
          <span>Sets completed: {state.completedSets}</span>
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={resetAll}>
            Reset All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// State type defined after usage
interface PomodoroState {
  phase: TimerPhase;
  timeRemaining: number;
  isRunning: boolean;
  completedPomodoros: number;
  completedSets: number;
}
