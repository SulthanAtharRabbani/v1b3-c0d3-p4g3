'use client';

import { Flame, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStreak } from '@/hooks/useStats';

export function StreakCounter() {
  const { currentStreak, longestStreak } = useStreak();

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/50 dark:to-amber-900/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Flame
                className={`h-10 w-10 ${
                  currentStreak > 0 ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'
                }`}
                style={{
                  animation: currentStreak > 0 ? 'fire-pulse 2s ease-in-out infinite' : 'none',
                }}
              />
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-700 dark:text-orange-300">{currentStreak}</div>
              <div className="text-xs text-muted-foreground">current streak</div>
            </div>
          </div>
          <div className="h-10 w-px bg-orange-200 dark:bg-orange-800/50" />
          <div>
            <div className="text-xl font-semibold text-orange-600 dark:text-orange-400">
              {longestStreak}
            </div>
            <div className="text-xs text-muted-foreground">best streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
