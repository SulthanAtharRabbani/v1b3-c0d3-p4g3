'use client';

import { useProgressStore } from '@/lib/storage/progress-store';
import { courses } from '@/lib/courses';

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

  return {
    totalCompletedLessons: getTotalCompletedLessons(),
    coursesInProgress,
    completedCourses,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    achievements: progress.achievements.length,
  };
}
