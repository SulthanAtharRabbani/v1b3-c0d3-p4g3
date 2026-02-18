'use client';

import { Award, Lock, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ACHIEVEMENTS, type Achievement } from '@/types';
import { useProgressStore } from '@/lib/storage/progress-store';
import { cn } from '@/lib/utils';

const tierColors = {
  bronze: 'from-amber-600 to-amber-800',
  silver: 'from-gray-400 to-gray-600',
  gold: 'from-yellow-400 to-yellow-600',
  platinum: 'from-slate-300 to-slate-500',
};

function AchievementIcon({ achievement, unlocked }: { achievement: Achievement; unlocked: boolean }) {
  return (
    <div
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br transition-transform hover:scale-110',
        unlocked ? tierColors[achievement.tier] : 'from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700',
        !unlocked && 'opacity-50'
      )}
    >
      {unlocked ? (
        <Award className="h-5 w-5 text-white" />
      ) : (
        <Lock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      )}
    </div>
  );
}

export function AchievementsPreview() {
  const { progress } = useProgressStore();
  const unlockedIds = progress.achievements;

  // Get first 6 achievements to display
  const displayAchievements = ACHIEVEMENTS.slice(0, 6);

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/50 dark:to-purple-900/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            Achievements
          </span>
          <span className="text-violet-600 dark:text-violet-400 text-xs font-medium">
            {unlockedIds.length}/{ACHIEVEMENTS.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-2">
          {displayAchievements.map((achievement) => {
            const unlocked = unlockedIds.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className="flex flex-col items-center gap-1"
                title={`${achievement.title}: ${achievement.description}`}
              >
                <AchievementIcon achievement={achievement} unlocked={unlocked} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
