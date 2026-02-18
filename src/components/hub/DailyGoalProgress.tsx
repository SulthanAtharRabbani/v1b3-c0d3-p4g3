'use client';

import { Target, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/lib/storage/progress-store';

export function DailyGoalProgress() {
  const { progress } = useProgressStore();
  const dailyGoal = progress.settings.dailyGoal || 30; // Default 30 minutes

  // Calculate today's study time (simplified - using total for demo)
  // In a real app, you'd track daily sessions
  const todayMinutes = Math.floor(progress.totalStudyTime / 60) % 1440; // Cap at 24 hours
  const progressPercent = Math.min((todayMinutes / dailyGoal) * 100, 100);
  const isGoalMet = todayMinutes >= dailyGoal;

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/50 dark:to-teal-900/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Daily Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isGoalMet ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : (
                <Clock className="h-5 w-5 text-emerald-600/70 dark:text-emerald-400/70" />
              )}
              <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {todayMinutes}<span className="text-sm font-normal text-muted-foreground">/{dailyGoal} min</span>
              </span>
            </div>
            {isGoalMet && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                Goal Met!
              </span>
            )}
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {isGoalMet
              ? "🎉 Amazing! You've reached your daily goal!"
              : `${dailyGoal - todayMinutes} more minutes to reach your goal`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
