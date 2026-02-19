'use client';

import { useMemo } from 'react';
import { BarChart3, Clock, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/lib/storage/progress-store';
import { useCourses } from '@/lib/courses-context';
import { getTotalLessons } from '@/lib/courses';
import { STREAK_ACHIEVEMENTS, DEFAULT_COURSE_ACHIEVEMENTS } from '@/types';

export function StudyStatistics() {
  const { progress } = useProgressStore();
  const { courses } = useCourses();

  // Calculate statistics
  const totalLessonsCompleted = Object.values(progress.courses).reduce(
    (acc, cp) => acc + cp.completedLessons.length,
    0
  );

  const totalCoursesStarted = Object.keys(progress.courses).length;

  const completedCourses = courses.filter((course) => {
    const cp = progress.courses[course.id];
    if (!cp) return false;
    const totalLessons = getTotalLessons(course);
    return cp.completedLessons.length === totalLessons;
  }).length;

  const totalQuizAttempts = Object.values(progress.courses).reduce(
    (acc, cp) => acc + Object.keys(cp.quizScores).length,
    0
  );

  const averageQuizScore = (() => {
    const allScores = Object.values(progress.courses).flatMap((cp) =>
      Object.values(cp.quizScores)
    );
    if (allScores.length === 0) return 0;
    return Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
  })();

  const totalStudyTime = progress.totalStudyTime;
  const hours = Math.floor(totalStudyTime / 3600);
  const minutes = Math.floor((totalStudyTime % 3600) / 60);

  // Calculate achievements from courses + streak
  const allAchievements = useMemo(() => {
    const achievements = [...STREAK_ACHIEVEMENTS, ...DEFAULT_COURSE_ACHIEVEMENTS];
    for (const course of courses) {
      if (course.achievements) {
        achievements.push(...course.achievements);
      }
    }
    return achievements;
  }, [courses]);

  const unlockedCount = useMemo(() => {
    let count = 0;
    // Streak achievements
    for (const streak of STREAK_ACHIEVEMENTS) {
      if (progress.currentStreak >= streak.requirement) {
        count++;
      }
    }
    // Course achievements
    for (const courseId of Object.keys(progress.courses)) {
      const courseProgress = progress.courses[courseId];
      count += courseProgress.unlockedAchievements?.length || 0;
    }
    return count;
  }, [progress]);

  // Recent activity
  const recentCourses = Object.entries(progress.courses)
    .filter(([_, cp]) => cp.lastAccessedAt)
    .sort((a, b) => 
      new Date(b[1].lastAccessedAt!).getTime() - new Date(a[1].lastAccessedAt!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">Lessons Completed</span>
            </div>
            <div className="text-3xl font-bold mt-2">{totalLessonsCompleted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Courses Completed</span>
            </div>
            <div className="text-3xl font-bold mt-2">{completedCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">Study Time</span>
            </div>
            <div className="text-3xl font-bold mt-2">
              {hours}h {minutes}m
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-muted-foreground">Avg Quiz Score</span>
            </div>
            <div className="text-3xl font-bold mt-2">{averageQuizScore}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress by Course */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentCourses.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No courses started yet. Start learning to see your progress!
            </p>
          ) : (
            <div className="space-y-4">
              {recentCourses.map(([courseId, courseProgress]) => {
                const course = courses.find((c) => c.id === courseId);
                if (!course) return null;
                const totalLessons = getTotalLessons(course);
                const completed = courseProgress.completedLessons.length;
                const percent = Math.round((completed / totalLessons) * 100);

                return (
                  <div key={courseId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{course.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {completed}/{totalLessons} lessons
                      </span>
                    </div>
                    <Progress value={percent} className="h-2" />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold">{unlockedCount}/{allAchievements.length}</div>
            <Progress 
              value={(unlockedCount / allAchievements.length) * 100} 
              className="flex-1 h-2" 
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {allAchievements.slice(0, 5).map((achievement) => {
              // Check if streak achievement
              const isStreak = 'requirement' in achievement && typeof achievement.requirement === 'number';
              const unlocked = isStreak
                ? progress.currentStreak >= (achievement as { requirement: number }).requirement
                : Object.values(progress.courses).some(cp => cp.unlockedAchievements?.includes(achievement.id));
              
              return (
                <div
                  key={achievement.id}
                  className={`p-2 rounded-lg text-center ${
                    unlocked ? 'bg-primary/10' : 'bg-muted opacity-50'
                  }`}
                  title={`${achievement.title}: ${achievement.description}`}
                >
                  <div className="text-xs truncate">{achievement.title}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{progress.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{progress.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{totalQuizAttempts}</div>
            <div className="text-sm text-muted-foreground">Quiz Attempts</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
