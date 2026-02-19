'use client';

import { useProgressStore } from '@/lib/storage/progress-store';
import { useCourses } from '@/lib/courses-context';

export function useStreak() {
  const { progress, updateStreak } = useProgressStore();

  return {
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    lastActiveDate: progress.lastActiveDate,
    updateStreak,
  };
}

export function useStats() {
  const { progress, getTotalCompletedLessons } = useProgressStore();
  const { courses } = useCourses();

  // Calculate courses in progress
  const coursesInProgress = Object.keys(progress.courses).filter((courseId) => {
    const courseProgress = progress.courses[courseId];
    return courseProgress.completedLessons.length > 0;
  }).length;

  // Calculate completed courses
  const completedCourses = Object.keys(progress.courses).filter((courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return false;
    const courseProgress = progress.courses[courseId];
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    return courseProgress.completedLessons.length === totalLessons;
  }).length;

  // Calculate total unlocked achievements from all courses
  const totalAchievements = Object.values(progress.courses).reduce((acc, courseProgress) => {
    return acc + (courseProgress.unlockedAchievements?.length || 0);
  }, 0);

  return {
    totalCompletedLessons: getTotalCompletedLessons(),
    coursesInProgress,
    completedCourses,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    achievements: totalAchievements,
  };
}
