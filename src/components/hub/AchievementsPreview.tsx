'use client';

import { useMemo, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Award, Lock, Trophy, Flame, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { STREAK_ACHIEVEMENTS, DEFAULT_COURSE_ACHIEVEMENTS, type CourseAchievement, type StreakAchievement } from '@/types';
import { useProgressStore } from '@/lib/storage/progress-store';
import { useCourses } from '@/lib/courses-context';
import { cn } from '@/lib/utils';

function AchievementIcon({ unlocked, icon, size = 'md' }: { unlocked: boolean; icon: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  // Get icon from Lucide icons
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = icons[icon] || Award;

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center bg-gradient-to-br transition-all duration-300 shrink-0',
        sizeClasses[size],
        unlocked
          ? 'from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-lg shadow-amber-500/30'
          : 'from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700',
        !unlocked && 'opacity-60'
      )}
    >
      {unlocked ? (
        <IconComponent className={cn(iconSizes[size], 'text-white')} />
      ) : (
        <Lock className={cn(iconSizes[size], 'text-gray-400 dark:text-gray-500')} />
      )}
    </div>
  );
}

interface AchievementWithCourse {
  achievement: CourseAchievement | StreakAchievement;
  courseTitle?: string;
  courseColor?: string;
}

// Achievement card component
function AchievementCard({
  achievement,
  courseTitle,
  courseColor,
  unlocked,
  isStreak,
  currentStreak,
}: {
  achievement: CourseAchievement | StreakAchievement;
  courseTitle?: string;
  courseColor?: string;
  unlocked: boolean;
  isStreak: boolean;
  currentStreak: number;
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all',
        unlocked
          ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800'
          : 'bg-muted/30 border-border hover:bg-muted/50'
      )}
    >
      <AchievementIcon
        unlocked={unlocked}
        icon={achievement.icon}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className={cn(
            'font-semibold text-sm sm:text-base',
            unlocked ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'
          )}>
            {achievement.title}
          </h4>
          {unlocked && (
            <Badge variant="outline" className="text-xs bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
              Unlocked!
            </Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
          {achievement.description}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {isStreak ? (
            <Badge variant="outline" className="text-xs gap-1">
              <Flame className="h-3 w-3 text-orange-500" />
              Streak
            </Badge>
          ) : (
            <>
              <Badge variant="outline" className="text-xs">
                {(achievement as CourseAchievement).type}
              </Badge>
              {courseTitle && (
                <Badge
                  variant="secondary"
                  className="text-xs max-w-[120px] truncate"
                  style={{
                    backgroundColor: courseColor ? `${courseColor}20` : undefined,
                    color: courseColor || undefined,
                  }}
                >
                  {courseTitle}
                </Badge>
              )}
            </>
          )}
        </div>
        {!unlocked && isStreak && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{currentStreak} / {(achievement as StreakAchievement).requirement} days</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all"
                style={{
                  width: `${Math.min(100, (currentStreak / (achievement as StreakAchievement).requirement) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Achievement list component
function AchievementList({
  achievements,
  isUnlocked,
  currentStreak,
}: {
  achievements: AchievementWithCourse[];
  isUnlocked: (achievement: CourseAchievement | StreakAchievement) => boolean;
  currentStreak: number;
}) {
  return (
    <div className="grid gap-2 sm:gap-3 py-2 sm:py-4">
      {achievements.map(({ achievement, courseTitle, courseColor }) => {
        const unlocked = isUnlocked(achievement);
        const isStreak = 'requirement' in achievement && typeof achievement.requirement === 'number';

        return (
          <AchievementCard
            key={`${achievement.id}-${courseTitle || 'global'}`}
            achievement={achievement}
            courseTitle={courseTitle}
            courseColor={courseColor}
            unlocked={unlocked}
            isStreak={isStreak}
            currentStreak={currentStreak}
          />
        );
      })}
    </div>
  );
}

export function AchievementsPreview() {
  const { progress } = useProgressStore();
  const { courses } = useCourses();
  const [showAll, setShowAll] = useState(false);

  // Collect all achievements from courses + default ones + streak achievements
  const allAchievements = useMemo((): AchievementWithCourse[] => {
    const achievements: AchievementWithCourse[] = [];

    // Add streak achievements (global, not course-specific)
    for (const streak of STREAK_ACHIEVEMENTS) {
      achievements.push({ achievement: streak });
    }

    // Add default course achievements (for each course that doesn't have custom ones)
    for (const course of courses) {
      if (!course.achievements || course.achievements.length === 0) {
        for (const defaultAch of DEFAULT_COURSE_ACHIEVEMENTS) {
          achievements.push({
            achievement: defaultAch,
            courseTitle: course.title,
            courseColor: course.color,
          });
        }
      }
    }

    // Add custom achievements from each course
    for (const course of courses) {
      if (course.achievements) {
        for (const ach of course.achievements) {
          achievements.push({
            achievement: ach,
            courseTitle: course.title,
            courseColor: course.color,
          });
        }
      }
    }

    return achievements;
  }, [courses]);

  // Count unlocked achievements - must match the isUnlocked logic exactly
  const unlockedCount = useMemo(() => {
    let count = 0;

    // Count unlocked streak achievements
    for (const streak of STREAK_ACHIEVEMENTS) {
      if (progress.currentStreak >= streak.requirement) {
        count++;
      }
    }

    // Count unlocked course achievements by checking each achievement in our list
    for (const { achievement } of allAchievements) {
      // Skip streak achievements (already counted above)
      if ('requirement' in achievement && typeof achievement.requirement === 'number') {
        continue;
      }

      // Check if this course achievement is unlocked
      for (const courseId of Object.keys(progress.courses)) {
        const courseProgress = progress.courses[courseId];
        if (courseProgress.unlockedAchievements?.includes(achievement.id)) {
          count++;
          break; // Found this achievement unlocked, move to next
        }
      }
    }

    return count;
  }, [progress, allAchievements]);

  // Get first 6 achievements to display in the preview
  const previewAchievements = allAchievements.slice(0, 6);

  // Check if a specific achievement is unlocked
  const isUnlocked = (achievement: CourseAchievement | StreakAchievement): boolean => {
    // Streak achievements
    if ('requirement' in achievement && typeof achievement.requirement === 'number') {
      return progress.currentStreak >= achievement.requirement;
    }

    // Course achievements - check all courses
    for (const courseId of Object.keys(progress.courses)) {
      const courseProgress = progress.courses[courseId];
      if (courseProgress.unlockedAchievements?.includes(achievement.id)) {
        return true;
      }
    }

    return false;
  };

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/50 dark:to-purple-900/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            Achievements
          </span>
          <span className="text-violet-600 dark:text-violet-400 text-xs font-medium">
            {unlockedCount}/{allAchievements.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allAchievements.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            Complete courses to unlock achievements
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6 gap-2">
              {previewAchievements.map(({ achievement }) => {
                const unlocked = isUnlocked(achievement);
                return (
                  <div
                    key={achievement.id}
                    className="flex flex-col items-center gap-1"
                    title={`${achievement.title}: ${achievement.description}`}
                  >
                    <AchievementIcon unlocked={unlocked} icon={achievement.icon} size="sm" />
                  </div>
                );
              })}
            </div>

            {/* Single responsive dialog for all devices */}
            <Dialog open={showAll} onOpenChange={setShowAll}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                >
                  View All Achievements
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl flex flex-col">
                <DialogHeader className="shrink-0">
                  <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                    All Achievements
                    <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
                      {unlockedCount} / {allAchievements.length} Unlocked
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <AchievementList
                    achievements={allAchievements}
                    isUnlocked={isUnlocked}
                    currentStreak={progress.currentStreak}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardContent>
    </Card>
  );
}
