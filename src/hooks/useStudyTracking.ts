'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useStudyTrackingStore, ActivityType } from '@/lib/stores/study-tracking-store';

interface UseStudyTrackingOptions {
  type: ActivityType;
  courseId?: string;
  courseName?: string;
  lessonId?: string;
  lessonTitle?: string;
  enabled?: boolean;
}

/**
 * Hook to automatically track study time for a specific activity.
 * Starts tracking when mounted, ends when unmounted or when deps change.
 */
export function useStudyTracking(options: UseStudyTrackingOptions) {
  const { type, courseId, courseName, lessonId, lessonTitle, enabled = true } = options;
  
  const startSession = useStudyTrackingStore(state => state.startSession);
  const endSession = useStudyTrackingStore(state => state.endSession);
  const updateCurrentSession = useStudyTrackingStore(state => state.updateCurrentSession);
  const isActive = useStudyTrackingStore(state => state.isActive);
  
  const sessionStarted = useRef(false);
  const lastDeps = useRef<string>('');
  
  // Create a key from deps to detect changes
  const depsKey = `${type}-${courseId}-${lessonId}`;
  
  // Start session on mount or when deps change
  useEffect(() => {
    if (!enabled) return;
    
    // If deps changed and we have an active session, end it first
    if (sessionStarted.current && lastDeps.current !== depsKey) {
      endSession();
      sessionStarted.current = false;
    }
    
    // Start new session
    if (!sessionStarted.current) {
      startSession(type, {
        courseId,
        courseName,
        lessonId,
        lessonTitle,
      });
      sessionStarted.current = true;
      lastDeps.current = depsKey;
    }
    
    // End session on unmount or when deps change
    return () => {
      if (sessionStarted.current) {
        endSession();
        sessionStarted.current = false;
      }
    };
  }, [enabled, type, courseId, courseName, lessonId, lessonTitle, depsKey, startSession, endSession]);
  
  // Update session data if props change
  useEffect(() => {
    if (sessionStarted.current && (courseId || lessonId || lessonTitle)) {
      updateCurrentSession({
        courseId,
        courseName,
        lessonId,
        lessonTitle,
      });
    }
  }, [courseId, courseName, lessonId, lessonTitle, updateCurrentSession]);
  
  // End session manually
  const endCurrentSession = useCallback((metadata?: { quizScore?: number; flashcardsReviewed?: number }) => {
    if (sessionStarted.current) {
      endSession(metadata);
      sessionStarted.current = false;
    }
  }, [endSession]);
  
  return {
    isActive,
    endSession: endCurrentSession,
  };
}

/**
 * Hook to track visibility-based study time.
 * Pauses tracking when tab is not visible.
 */
export function useVisibilityTracking() {
  const isActive = useStudyTrackingStore(state => state.isActive);
  const currentSession = useStudyTrackingStore(state => state.currentSession);
  const endSession = useStudyTrackingStore(state => state.endSession);
  const startSession = useStudyTrackingStore(state => state.startSession);
  
  const pausedSession = useRef<typeof currentSession>(null);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActive && currentSession) {
        // Pause: save current session state
        pausedSession.current = { ...currentSession };
        endSession();
      } else if (!document.hidden && pausedSession.current) {
        // Resume: start new session with same data
        const prev = pausedSession.current;
        startSession(prev.type, {
          courseId: prev.courseId,
          courseName: prev.courseName,
          lessonId: prev.lessonId,
          lessonTitle: prev.lessonTitle,
        });
        pausedSession.current = null;
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, currentSession, endSession, startSession]);
}

/**
 * Hook to track quiz completion with score.
 */
export function useQuizTracking(courseId?: string, courseName?: string) {
  const endSession = useStudyTrackingStore(state => state.endSession);
  
  const completeQuiz = useCallback((score: number) => {
    endSession({ quizScore: score });
  }, [endSession]);
  
  return { completeQuiz };
}
