'use client';

import { Flame, BookOpen, Trophy } from 'lucide-react';
import { useStats } from '@/hooks/useStats';
import { Card, CardContent } from '@/components/ui/card';
import { useSyncExternalStore } from 'react';

export function QuickStatsBar() {
  const stats = useStats();
  
  // Use useSyncExternalStore for safe client-only values (avoids hydration mismatch)
  const isMounted = useSyncExternalStore(
    () => () => {}, // no-op subscribe
    () => true,     // client: mounted
    () => false     // server: not mounted
  );

  // Use placeholder on server, actual values on client
  const displayLessons = isMounted ? stats.totalCompletedLessons : '—';
  const displayCourses = isMounted ? stats.coursesInProgress : '—';
  const displayStreak = isMounted ? stats.currentStreak : '—';

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30">
        <CardContent className="p-4 text-center">
          <BookOpen className="h-5 w-5 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {displayLessons}
          </div>
          <div className="text-xs text-muted-foreground">Lessons Completed</div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30">
        <CardContent className="p-4 text-center">
          <Trophy className="h-5 w-5 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {displayCourses}
          </div>
          <div className="text-xs text-muted-foreground">Courses in Progress</div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
            {displayStreak}
          </div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </CardContent>
      </Card>
    </div>
  );
}
