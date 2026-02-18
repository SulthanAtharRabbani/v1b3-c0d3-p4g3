import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, CourseProgress, UserSettings, Note } from '@/types';

interface ProgressState {
  progress: UserProgress;
  // Actions
  markLessonComplete: (courseId: string, lessonId: string) => void;
  unmarkLessonComplete: (courseId: string, lessonId: string) => void;
  isLessonComplete: (courseId: string, lessonId: string) => boolean;
  updateQuizScore: (courseId: string, moduleId: string, score: number) => void;
  toggleBookmark: (courseId: string, lessonId: string) => void;
  isBookmarked: (courseId: string, lessonId: string) => boolean;
  saveNote: (courseId: string, lessonId: string, note: string) => void;
  getNote: (courseId: string, lessonId: string) => string;
  getNoteWithMeta: (courseId: string, lessonId: string) => Note | null;
  deleteNote: (courseId: string, lessonId: string) => void;
  getAllNotes: () => { courseId: string; courseName?: string; lessonId: string; note: Note }[];
  updateLastAccessed: (courseId: string, lessonId: string) => void;
  updateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  hasAchievement: (achievementId: string) => boolean;
  updateSettings: (settings: Partial<UserSettings>) => void;
  getCourseProgress: (courseId: string) => CourseProgress;
  getCompletedLessonsCount: (courseId: string) => number;
  getCourseCompletionPercentage: (courseId: string, totalLessons: number) => number;
  getTotalCompletedLessons: () => number;
  resetProgress: () => void;
}

const defaultSettings: UserSettings = {
  theme: 'system',
  userName: '',
  dailyGoal: 30,
};

const defaultProgress: UserProgress = {
  totalStudyTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  courses: {},
  achievements: [],
  settings: defaultSettings,
};

const getToday = () => new Date().toISOString().split('T')[0];

// Helper to create a default course progress
const createDefaultCourseProgress = (courseId: string): CourseProgress => ({
  courseId,
  completedLessons: [],
  quizScores: {},
  bookmarks: [],
  notes: {},
  notesV2: {},
  startedAt: new Date().toISOString(),
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: defaultProgress,

      markLessonComplete: (courseId, lessonId) => {
        set((state) => {
          const courseProgress = state.progress.courses[courseId] || {
            courseId,
            completedLessons: [],
            quizScores: {},
            bookmarks: [],
            notes: {},
            startedAt: new Date().toISOString(),
          };

          if (courseProgress.completedLessons.includes(lessonId)) {
            return state;
          }

          const newCompletedLessons = [...courseProgress.completedLessons, lessonId];
          
          return {
            progress: {
              ...state.progress,
              courses: {
                ...state.progress.courses,
                [courseId]: {
                  ...courseProgress,
                  completedLessons: newCompletedLessons,
                  lastAccessedAt: new Date().toISOString(),
                },
              },
            },
          };
        });
        
        // Check for achievements
        const state = get();
        const totalCompleted = state.getTotalCompletedLessons();
        
        if (totalCompleted === 1) {
          state.unlockAchievement('first-steps');
        }
        if (totalCompleted >= 100) {
          state.unlockAchievement('century');
        }
      },

      unmarkLessonComplete: (courseId, lessonId) => {
        set((state) => {
          const courseProgress = state.progress.courses[courseId];
          if (!courseProgress) return state;

          return {
            progress: {
              ...state.progress,
              courses: {
                ...state.progress.courses,
                [courseId]: {
                  ...courseProgress,
                  completedLessons: courseProgress.completedLessons.filter((id) => id !== lessonId),
                },
              },
            },
          };
        });
      },

      isLessonComplete: (courseId, lessonId) => {
        const state = get();
        const courseProgress = state.progress.courses[courseId];
        return courseProgress?.completedLessons.includes(lessonId) ?? false;
      },

      updateQuizScore: (courseId, moduleId, score) => {
        set((state) => {
          const courseProgress = state.progress.courses[courseId] || {
            courseId,
            completedLessons: [],
            quizScores: {},
            bookmarks: [],
            notes: {},
          };

          const currentBest = courseProgress.quizScores[moduleId] ?? 0;
          const newScore = Math.max(currentBest, score);

          return {
            progress: {
              ...state.progress,
              courses: {
                ...state.progress.courses,
                [courseId]: {
                  ...courseProgress,
                  quizScores: {
                    ...courseProgress.quizScores,
                    [moduleId]: newScore,
                  },
                },
              },
            },
          };
        });

        // Check for quiz achievements
        if (score === 100) {
          get().unlockAchievement('quiz-ace');
        }
      },

      toggleBookmark: (courseId, lessonId) => {
        set((state) => {
          const courseProgress = state.progress.courses[courseId] || {
            courseId,
            completedLessons: [],
            quizScores: {},
            bookmarks: [],
            notes: {},
          };

          const isCurrentlyBookmarked = courseProgress.bookmarks.includes(lessonId);
          const newBookmarks = isCurrentlyBookmarked
            ? courseProgress.bookmarks.filter((id) => id !== lessonId)
            : [...courseProgress.bookmarks, lessonId];

          return {
            progress: {
              ...state.progress,
              courses: {
                ...state.progress.courses,
                [courseId]: {
                  ...courseProgress,
                  bookmarks: newBookmarks,
                },
              },
            },
          };
        });
      },

      isBookmarked: (courseId, lessonId) => {
        const state = get();
        const courseProgress = state.progress.courses[courseId];
        return courseProgress?.bookmarks.includes(lessonId) ?? false;
      },

      saveNote: (courseId, lessonId, content) => {
        const now = new Date().toISOString();
        set((state) => {
          const courseProgress = state.progress.courses[courseId] || createDefaultCourseProgress(courseId);
          const existingNote = courseProgress.notesV2?.[lessonId];
          
          const note: Note = {
            id: existingNote?.id || `note-${Date.now()}`,
            content,
            createdAt: existingNote?.createdAt || now,
            updatedAt: now,
          };

          return {
            progress: {
              ...state.progress,
              courses: {
                ...state.progress.courses,
                [courseId]: {
                  ...courseProgress,
                  notes: {
                    ...courseProgress.notes,
                    [lessonId]: content, // Keep legacy for backward compatibility
                  },
                  notesV2: {
                    ...courseProgress.notesV2,
                    [lessonId]: note,
                  },
                },
              },
            },
          };
        });
      },

      getNote: (courseId, lessonId) => {
        const state = get();
        // Prefer notesV2 content, fallback to legacy notes
        return state.progress.courses[courseId]?.notesV2?.[lessonId]?.content 
          ?? state.progress.courses[courseId]?.notes[lessonId] 
          ?? '';
      },

      getNoteWithMeta: (courseId, lessonId) => {
        const state = get();
        return state.progress.courses[courseId]?.notesV2?.[lessonId] ?? null;
      },

      deleteNote: (courseId, lessonId) => {
        set((state) => {
          const courseProgress = state.progress.courses[courseId];
          if (!courseProgress) return state;

          const { [lessonId]: _, ...remainingNotes } = courseProgress.notes;
          const { [lessonId]: __, ...remainingNotesV2 } = courseProgress.notesV2 || {};

          return {
            progress: {
              ...state.progress,
              courses: {
                ...state.progress.courses,
                [courseId]: {
                  ...courseProgress,
                  notes: remainingNotes,
                  notesV2: remainingNotesV2,
                },
              },
            },
          };
        });
      },

      getAllNotes: () => {
        const state = get();
        const allNotes: { courseId: string; courseName?: string; lessonId: string; note: Note }[] = [];
        
        for (const [courseId, courseProgress] of Object.entries(state.progress.courses)) {
          if (courseProgress.notesV2) {
            for (const [lessonId, note] of Object.entries(courseProgress.notesV2)) {
              if (note.content.trim()) {
                allNotes.push({
                  courseId,
                  lessonId,
                  note,
                });
              }
            }
          }
        }
        
        // Sort by most recently updated
        return allNotes.sort((a, b) => 
          new Date(b.note.updatedAt).getTime() - new Date(a.note.updatedAt).getTime()
        );
      },

      updateLastAccessed: (courseId, lessonId) => {
        set((state) => {
          const courseProgress = state.progress.courses[courseId] || {
            courseId,
            completedLessons: [],
            quizScores: {},
            bookmarks: [],
            notes: {},
            startedAt: new Date().toISOString(),
          };

          return {
            progress: {
              ...state.progress,
              courses: {
                ...state.progress.courses,
                [courseId]: {
                  ...courseProgress,
                  lastAccessedLesson: lessonId,
                  lastAccessedAt: new Date().toISOString(),
                },
              },
            },
          };
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = getToday();
          const lastActive = state.progress.lastActiveDate;
          
          if (lastActive === today) {
            return state; // Already updated today
          }

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          let newStreak = 1;
          if (lastActive === yesterdayStr) {
            newStreak = state.progress.currentStreak + 1;
          }

          const newLongestStreak = Math.max(newStreak, state.progress.longestStreak);

          // Check streak achievements
          const achievements = [...state.progress.achievements];
          if (newStreak >= 7 && !achievements.includes('week-warrior')) {
            achievements.push('week-warrior');
          }
          if (newStreak >= 30 && !achievements.includes('month-master')) {
            achievements.push('month-master');
          }

          return {
            progress: {
              ...state.progress,
              currentStreak: newStreak,
              longestStreak: newLongestStreak,
              lastActiveDate: today,
              achievements,
            },
          };
        });
      },

      unlockAchievement: (achievementId) => {
        set((state) => {
          if (state.progress.achievements.includes(achievementId)) {
            return state;
          }

          return {
            progress: {
              ...state.progress,
              achievements: [...state.progress.achievements, achievementId],
            },
          };
        });
      },

      hasAchievement: (achievementId) => {
        return get().progress.achievements.includes(achievementId);
      },

      updateSettings: (settings) => {
        set((state) => ({
          progress: {
            ...state.progress,
            settings: {
              ...state.progress.settings,
              ...settings,
            },
          },
        }));
      },

      getCourseProgress: (courseId) => {
        return get().progress.courses[courseId] ?? {
          courseId,
          completedLessons: [],
          quizScores: {},
          bookmarks: [],
          notes: {},
        };
      },

      getCompletedLessonsCount: (courseId) => {
        const courseProgress = get().progress.courses[courseId];
        return courseProgress?.completedLessons.length ?? 0;
      },

      getCourseCompletionPercentage: (courseId, totalLessons) => {
        const completed = get().getCompletedLessonsCount(courseId);
        if (totalLessons === 0) return 0;
        return Math.round((completed / totalLessons) * 100);
      },

      getTotalCompletedLessons: () => {
        const state = get();
        let total = 0;
        for (const courseProgress of Object.values(state.progress.courses)) {
          total += courseProgress.completedLessons.length;
        }
        return total;
      },

      resetProgress: () => {
        set({ progress: defaultProgress });
      },
    }),
    {
      name: 'eduhub-progress',
    }
  )
);
