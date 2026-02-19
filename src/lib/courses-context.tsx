'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import type { Course } from '@/types';

// Course context type
type CoursesContextType = {
  courses: Course[];
  isLoading: boolean;
  getCourseBySlug: (slug: string) => Course | undefined;
  refreshCourses: () => void;
};

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from API (scans public/courses/ folder)
  const refreshCourses = useCallback(async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    queueMicrotask(() => refreshCourses());
  }, [refreshCourses]);

  // Get course by slug
  const getCourseBySlug = useCallback((slug: string) => {
    return courses.find(c => c.slug === slug);
  }, [courses]);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        isLoading,
        getCourseBySlug,
        refreshCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}
