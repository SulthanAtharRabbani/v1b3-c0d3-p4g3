import type { Course, CourseAchievement } from '@/types';

export interface AchievementCheckResult {
  achievementId: string;
  newlyUnlocked: boolean;
}

// Check all achievement requirements for a course
export function checkAchievements(
  course: Course,
  completedLessons: string[],
  quizScores: Record<string, number>,
  notesCount: number,
  flashcardsReviewed: boolean,
  existingUnlocked: string[]
): AchievementCheckResult[] {
  const results: AchievementCheckResult[] = [];
  const achievements = course.achievements || [];
  
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.length;
  const completionPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  for (const achievement of achievements) {
    if (existingUnlocked.includes(achievement.id)) {
      continue; // Already unlocked
    }

    let shouldUnlock = false;

    switch (achievement.requirement) {
      case 'complete-first':
        // First lesson completed
        if (achievement.type === 'lesson' && completedCount >= 1) {
          shouldUnlock = true;
        }
        break;

      case 'complete-50':
        // 50% of course completed
        if (completionPercentage >= 50) {
          shouldUnlock = true;
        }
        break;

      case 'complete-all':
        // All lessons completed
        if (completedCount === totalLessons && totalLessons > 0) {
          shouldUnlock = true;
        }
        break;

      case 'score-100':
        // Got 100% on any quiz
        if (Object.values(quizScores).some(score => score === 100)) {
          shouldUnlock = true;
        }
        break;

      case 'all-perfect':
        // Got 100% on all quizzes
        const modulesWithQuiz = course.modules.filter(m => m.quizQuestions && m.quizQuestions.length > 0);
        if (modulesWithQuiz.length > 0) {
          const allPerfect = modulesWithQuiz.every(m => quizScores[m.id] === 100);
          if (allPerfect) {
            shouldUnlock = true;
          }
        }
        break;

      case 'review-all-flashcards':
        // All flashcards reviewed
        if (flashcardsReviewed) {
          shouldUnlock = true;
        }
        break;

      case 'first-note':
        // Created first note
        if (notesCount >= 1) {
          shouldUnlock = true;
        }
        break;

      default:
        // Custom requirements can be added later
        break;
    }

    results.push({
      achievementId: achievement.id,
      newlyUnlocked: shouldUnlock,
    });
  }

  return results;
}

// Legacy achievement ID mapping for backward compatibility
export const LEGACY_ACHIEVEMENT_MAP: Record<string, string> = {
  'first-lesson': 'first-steps',
  'quiz-perfect': 'quiz-master',
  'module-complete': 'module-master',
  'course-complete': 'course-complete',
};
