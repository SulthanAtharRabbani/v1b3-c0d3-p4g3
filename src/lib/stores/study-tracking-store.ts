import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Activity types for tracking
export type ActivityType = 'lesson' | 'quiz' | 'flashcard' | 'notes' | 'focus' | 'review';

// Single activity session
export interface ActivitySession {
  id: string;
  type: ActivityType;
  courseId?: string;
  courseName?: string;
  lessonId?: string;
  lessonTitle?: string;
  startedAt: string;
  endedAt?: string;
  duration: number; // seconds
  metadata?: {
    quizScore?: number;
    flashcardsReviewed?: number;
    focusModeUsed?: boolean;
  };
}

// Daily study record
export interface DailyStudyRecord {
  date: string; // YYYY-MM-DD
  totalSeconds: number;
  byActivity: Record<ActivityType, number>;
  byCourse: Record<string, number>; // courseId -> seconds
  sessions: ActivitySession[];
  lessonsViewed: string[]; // lesson IDs
  quizzesTaken: number;
  quizAverageScore: number;
  focusTime: number;
}

// Course-specific stats
export interface CourseStudyStats {
  courseId: string;
  courseName: string;
  totalSeconds: number;
  lastStudied?: string;
  sessionsCount: number;
  lessonsViewed: string[];
}

// Study tracking state
interface StudyTrackingState {
  // Current session tracking
  currentSession: ActivitySession | null;
  isActive: boolean;
  
  // Aggregated data
  dailyRecords: Record<string, DailyStudyRecord>; // date string -> record
  courseStats: Record<string, CourseStudyStats>; // courseId -> stats
  totalStudyTime: number; // all time in seconds
  
  // Activity log (last 100 sessions)
  recentActivity: ActivitySession[];
  
  // Actions
  startSession: (type: ActivityType, data?: {
    courseId?: string;
    courseName?: string;
    lessonId?: string;
    lessonTitle?: string;
  }) => void;
  
  endSession: (metadata?: ActivitySession['metadata']) => void;
  
  updateCurrentSession: (data: Partial<ActivitySession>) => void;
  
  // Getters
  getTodayStats: () => DailyStudyRecord;
  getWeekStats: () => { totalSeconds: number; byActivity: Record<ActivityType, number>; dailyBreakdown: { date: string; seconds: number }[] };
  getCourseStats: (courseId: string) => CourseStudyStats | null;
  getMonthlyStats: () => { totalSeconds: number; activeDays: number; averagePerDay: number };
  
  // Utility
  formatTime: (seconds: number) => string;
  formatDetailedTime: (seconds: number) => string;
}

// Helper to get today's date string
const getDateString = (date: Date = new Date()) => date.toISOString().split('T')[0];

// Generate unique session ID
const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Get default empty daily record
const getEmptyDailyRecord = (date: string): DailyStudyRecord => ({
  date,
  totalSeconds: 0,
  byActivity: {
    lesson: 0,
    quiz: 0,
    flashcard: 0,
    notes: 0,
    focus: 0,
    review: 0,
  },
  byCourse: {},
  sessions: [],
  lessonsViewed: [],
  quizzesTaken: 0,
  quizAverageScore: 0,
  focusTime: 0,
});

// Get default empty activity record
const getEmptyActivityRecord = (): Record<ActivityType, number> => ({
  lesson: 0,
  quiz: 0,
  flashcard: 0,
  notes: 0,
  focus: 0,
  review: 0,
});

export const useStudyTrackingStore = create<StudyTrackingState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      isActive: false,
      dailyRecords: {},
      courseStats: {},
      totalStudyTime: 0,
      recentActivity: [],

      startSession: (type, data = {}) => {
        const state = get();
        
        // End existing session if any
        if (state.currentSession) {
          state.endSession();
        }
        
        const session: ActivitySession = {
          id: generateSessionId(),
          type,
          courseId: data.courseId,
          courseName: data.courseName,
          lessonId: data.lessonId,
          lessonTitle: data.lessonTitle,
          startedAt: new Date().toISOString(),
          duration: 0,
        };
        
        set({ currentSession: session, isActive: true });
      },

      endSession: (metadata) => {
        const state = get();
        if (!state.currentSession) return;
        
        const endedAt = new Date().toISOString();
        const startTime = new Date(state.currentSession.startedAt).getTime();
        const duration = Math.floor((new Date(endedAt).getTime() - startTime) / 1000);
        
        // Minimum 5 seconds to count as a session
        if (duration < 5) {
          set({ currentSession: null, isActive: false });
          return;
        }
        
        const completedSession: ActivitySession = {
          ...state.currentSession,
          endedAt,
          duration,
          metadata,
        };
        
        const today = getDateString();
        const dailyRecord = state.dailyRecords[today] || getEmptyDailyRecord(today);
        
        // Update daily record
        const updatedDailyRecord: DailyStudyRecord = {
          ...dailyRecord,
          totalSeconds: dailyRecord.totalSeconds + duration,
          byActivity: {
            ...dailyRecord.byActivity,
            [completedSession.type]: dailyRecord.byActivity[completedSession.type] + duration,
          },
          byCourse: completedSession.courseId
            ? {
                ...dailyRecord.byCourse,
                [completedSession.courseId]: (dailyRecord.byCourse[completedSession.courseId] || 0) + duration,
              }
            : dailyRecord.byCourse,
          sessions: [...dailyRecord.sessions, completedSession],
          lessonsViewed: completedSession.lessonId && !dailyRecord.lessonsViewed.includes(completedSession.lessonId)
            ? [...dailyRecord.lessonsViewed, completedSession.lessonId]
            : dailyRecord.lessonsViewed,
          quizzesTaken: completedSession.type === 'quiz' ? dailyRecord.quizzesTaken + 1 : dailyRecord.quizzesTaken,
          quizAverageScore: metadata?.quizScore !== undefined && completedSession.type === 'quiz'
            ? (dailyRecord.quizAverageScore * dailyRecord.quizzesTaken + metadata.quizScore) / (dailyRecord.quizzesTaken + 1)
            : dailyRecord.quizAverageScore,
          focusTime: completedSession.type === 'focus' ? dailyRecord.focusTime + duration : dailyRecord.focusTime,
        };
        
        // Update course stats
        let updatedCourseStats = state.courseStats;
        if (completedSession.courseId && completedSession.courseName) {
          const existingStats = state.courseStats[completedSession.courseId] || {
            courseId: completedSession.courseId,
            courseName: completedSession.courseName,
            totalSeconds: 0,
            sessionsCount: 0,
            lessonsViewed: [],
          };
          
          updatedCourseStats = {
            ...state.courseStats,
            [completedSession.courseId]: {
              ...existingStats,
              totalSeconds: existingStats.totalSeconds + duration,
              lastStudied: endedAt,
              sessionsCount: existingStats.sessionsCount + 1,
              lessonsViewed: completedSession.lessonId && !existingStats.lessonsViewed.includes(completedSession.lessonId)
                ? [...existingStats.lessonsViewed, completedSession.lessonId]
                : existingStats.lessonsViewed,
            },
          };
        }
        
        // Update recent activity (keep last 100)
        const updatedRecentActivity = [completedSession, ...state.recentActivity].slice(0, 100);
        
        set({
          currentSession: null,
          isActive: false,
          dailyRecords: {
            ...state.dailyRecords,
            [today]: updatedDailyRecord,
          },
          courseStats: updatedCourseStats,
          totalStudyTime: state.totalStudyTime + duration,
          recentActivity: updatedRecentActivity,
        });
      },

      updateCurrentSession: (data) => {
        const state = get();
        if (!state.currentSession) return;
        
        set({
          currentSession: {
            ...state.currentSession,
            ...data,
          },
        });
      },

      getTodayStats: () => {
        const state = get();
        const today = getDateString();
        return state.dailyRecords[today] || getEmptyDailyRecord(today);
      },

      getWeekStats: () => {
        const state = get();
        let totalSeconds = 0;
        const byActivity = getEmptyActivityRecord();
        const dailyBreakdown: { date: string; seconds: number }[] = [];
        
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = getDateString(date);
          const record = state.dailyRecords[dateStr];
          
          const daySeconds = record?.totalSeconds || 0;
          totalSeconds += daySeconds;
          dailyBreakdown.push({ date: dateStr, seconds: daySeconds });
          
          if (record) {
            for (const [activity, time] of Object.entries(record.byActivity)) {
              byActivity[activity as ActivityType] += time;
            }
          }
        }
        
        return { totalSeconds, byActivity, dailyBreakdown: dailyBreakdown.reverse() };
      },

      getCourseStats: (courseId) => {
        const state = get();
        return state.courseStats[courseId] || null;
      },

      getMonthlyStats: () => {
        const state = get();
        let totalSeconds = 0;
        let activeDays = 0;
        
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = getDateString(date);
          const record = state.dailyRecords[dateStr];
          
          if (record && record.totalSeconds > 0) {
            totalSeconds += record.totalSeconds;
            activeDays++;
          }
        }
        
        return {
          totalSeconds,
          activeDays,
          averagePerDay: activeDays > 0 ? Math.floor(totalSeconds / activeDays) : 0,
        };
      },

      formatTime: (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
          return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
      },

      formatDetailedTime: (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
          return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      },
    }),
    {
      name: 'eduhub-study-tracking',
      partialize: (state) => ({
        dailyRecords: state.dailyRecords,
        courseStats: state.courseStats,
        totalStudyTime: state.totalStudyTime,
        recentActivity: state.recentActivity,
      }),
    }
  )
);
