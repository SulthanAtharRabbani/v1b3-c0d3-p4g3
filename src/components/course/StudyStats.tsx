'use client';

import { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import { Clock, TrendingUp, BookOpen, Brain, Target, Flame, BarChart3, ChevronDown, ChevronUp, Timer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useStudyTrackingStore, ActivityType } from '@/lib/stores/study-tracking-store';

interface StudyStatsProps {
  className?: string;
  compact?: boolean;
}

const activityIcons: Record<ActivityType, typeof BookOpen> = {
  lesson: BookOpen,
  quiz: Target,
  flashcard: Brain,
  notes: BookOpen,
  focus: Timer,
  review: BookOpen,
};

const activityLabels: Record<ActivityType, string> = {
  lesson: 'Lessons',
  quiz: 'Quizzes',
  flashcard: 'Flashcards',
  notes: 'Notes',
  focus: 'Focus Mode',
  review: 'Review',
};

const activityColors: Record<ActivityType, string> = {
  lesson: 'bg-blue-500',
  quiz: 'bg-purple-500',
  flashcard: 'bg-amber-500',
  notes: 'bg-green-500',
  focus: 'bg-rose-500',
  review: 'bg-cyan-500',
};

// Custom hook for hydration-safe state
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

// Component for live timer display
function LiveTimer({ startedAt }: { startedAt: string }) {
  const [elapsed, setElapsed] = useState(0);
  const mounted = useMounted();
  const formatDetailedTime = useStudyTrackingStore(state => state.formatDetailedTime);
  
  useEffect(() => {
    if (!mounted) return;
    
    const startTime = new Date(startedAt).getTime();
    
    const updateElapsed = () => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    };
    
    // Use requestAnimationFrame for smoother updates
    let animationId: number;
    let lastUpdate = 0;
    
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate >= 1000) {
        updateElapsed();
        lastUpdate = timestamp;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    updateElapsed(); // Initial update
    
    return () => cancelAnimationFrame(animationId);
  }, [startedAt, mounted]);
  
  if (!mounted) {
    return <span>00:00</span>;
  }
  
  return <span>{formatDetailedTime(elapsed)}</span>;
}

export function StudyStats({ className, compact = false }: StudyStatsProps) {
  const [showDetails, setShowDetails] = useState(false);
  const mounted = useMounted();
  
  const getTodayStats = useStudyTrackingStore(state => state.getTodayStats);
  const getWeekStats = useStudyTrackingStore(state => state.getWeekStats);
  const getMonthlyStats = useStudyTrackingStore(state => state.getMonthlyStats);
  const formatTime = useStudyTrackingStore(state => state.formatTime);
  const formatDetailedTime = useStudyTrackingStore(state => state.formatDetailedTime);
  const totalStudyTime = useStudyTrackingStore(state => state.totalStudyTime);
  const currentSession = useStudyTrackingStore(state => state.currentSession);
  
  const todayStats = getTodayStats();
  const weekStats = getWeekStats();
  const monthlyStats = getMonthlyStats();
  
  // Calculate activity breakdown for today
  const totalActivityTime = Object.values(todayStats.byActivity).reduce((a, b) => a + b, 0);
  
  // Week chart data - normalize to max
  const maxWeekTime = Math.max(...weekStats.dailyBreakdown.map(d => d.seconds), 1);
  
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Study Stats
          </div>
          {currentSession && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Recording</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Session (if active) */}
        {mounted && currentSession && (
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-primary">
                {activityLabels[currentSession.type]}
                {currentSession.lessonTitle && `: ${currentSession.lessonTitle.slice(0, 30)}...`}
              </span>
              <span className="text-xs text-muted-foreground">Now</span>
            </div>
            <div className="text-2xl font-mono font-bold text-primary">
              <LiveTimer startedAt={currentSession.startedAt} />
            </div>
          </div>
        )}
        
        {/* Today's Stats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Today</span>
            <span className="text-xs text-muted-foreground">
              {mounted ? `${todayStats.lessonsViewed.length} lessons • ${todayStats.quizzesTaken} quizzes` : '— lessons • — quizzes'}
            </span>
          </div>
          <div className="text-3xl font-mono font-bold">
            {mounted ? formatDetailedTime(todayStats.totalSeconds) : '00:00'}
          </div>
        </div>
        
        {/* Activity Breakdown */}
        {mounted && totalActivityTime > 0 && (
          <div className="space-y-2">
            <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
              {Object.entries(todayStats.byActivity).map(([activity, time]) => {
                if (time === 0) return null;
                const pct = (time / totalActivityTime) * 100;
                return (
                  <div
                    key={activity}
                    className={cn('h-full', activityColors[activity as ActivityType])}
                    style={{ width: `${pct}%` }}
                    title={`${activityLabels[activity as ActivityType]}: ${formatTime(time)}`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(todayStats.byActivity).map(([activity, time]) => {
                if (time === 0) return null;
                const Icon = activityIcons[activity as ActivityType];
                return (
                  <div key={activity} className="flex items-center gap-1">
                    <div className={cn('w-2 h-2 rounded-full', activityColors[activity as ActivityType])} />
                    <Icon className="h-3 w-3 text-muted-foreground" />
                    <span>{formatTime(time)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Week Overview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">This Week</span>
            <span className="font-medium">
              {mounted ? formatTime(weekStats.totalSeconds) : '—'}
            </span>
          </div>
          <div className="flex items-end gap-1 h-8">
            {weekStats.dailyBreakdown.map((day, i) => {
              const height = (day.seconds / maxWeekTime) * 100;
              const isToday = i === weekStats.dailyBreakdown.length - 1;
              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-0.5"
                >
                  <div
                    className={cn(
                      'w-full rounded-t transition-all',
                      isToday ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}
                    style={{ height: mounted ? `${Math.max(height, 4)}%` : '20%' }}
                  />
                  <span className="text-[8px] text-muted-foreground">
                    {mounted ? new Date(day.date).toLocaleDateString('en', { weekday: 'short' }).charAt(0) : '-'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold">
              {mounted ? formatTime(monthlyStats.averagePerDay) : '—'}
            </div>
            <div className="text-xs text-muted-foreground">Avg/day (30d)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {mounted ? formatTime(totalStudyTime) : '—'}
            </div>
            <div className="text-xs text-muted-foreground">All time</div>
          </div>
        </div>
        
        {/* Expand for Details */}
        {!compact && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show More Details
                </>
              )}
            </Button>
            
            {showDetails && (
              <div className="space-y-3 pt-2 border-t">
                {/* Monthly Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    This Month
                  </span>
                  <div className="text-right">
                    <div className="font-medium">{formatTime(monthlyStats.totalSeconds)}</div>
                    <div className="text-xs text-muted-foreground">{monthlyStats.activeDays} active days</div>
                  </div>
                </div>
                
                {/* Focus Time */}
                {todayStats.focusTime > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      Focus Mode Today
                    </span>
                    <span className="font-medium">{formatTime(todayStats.focusTime)}</span>
                  </div>
                )}
                
                {/* Quiz Performance */}
                {todayStats.quizzesTaken > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Quiz Avg Today
                    </span>
                    <span className="font-medium">{Math.round(todayStats.quizAverageScore)}%</span>
                  </div>
                )}
                
                {/* Weekly Activity Breakdown */}
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Weekly Activity</span>
                  {Object.entries(weekStats.byActivity).map(([activity, time]) => {
                    if (time === 0) return null;
                    const Icon = activityIcons[activity as ActivityType];
                    return (
                      <div key={activity} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Icon className="h-3 w-3" />
                          {activityLabels[activity as ActivityType]}
                        </span>
                        <span>{formatTime(time)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
