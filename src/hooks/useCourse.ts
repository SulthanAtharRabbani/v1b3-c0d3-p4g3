'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import { useCourses } from '@/lib/courses-context';
import type { Course, Module, Lesson } from '@/types';

interface SearchResult {
  item: {
    type: 'course' | 'module' | 'lesson';
    course: Course;
    module?: Module;
    lesson?: Lesson;
    title: string;
    content: string;
  };
  score?: number;
}

// Build search index
function buildSearchIndex(courses: Course[]) {
  const items: SearchResult['item'][] = [];

  for (const course of courses) {
    // Add course
    items.push({
      type: 'course',
      course,
      title: course.title,
      content: `${course.title} ${course.subtitle} ${course.description}`,
    });

    // Add modules and lessons
    for (const courseModule of course.modules) {
      items.push({
        type: 'module',
        course,
        module: courseModule,
        title: courseModule.title,
        content: `${courseModule.title} ${courseModule.description}`,
      });

      for (const lesson of courseModule.lessons) {
        items.push({
          type: 'lesson',
          course,
          module: courseModule,
          lesson,
          title: lesson.title,
          content: `${lesson.title} ${lesson.content.replace(/[#*$]/g, '')}`,
        });
      }
    }
  }

  return items;
}

export function useSearch() {
  const { courses } = useCourses();
  const fuseRef = useRef<Fuse<SearchResult['item']> | null>(null);

  useEffect(() => {
    const items = buildSearchIndex(courses);
    fuseRef.current = new Fuse(items, {
      keys: ['title', 'content'],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [courses]);

  const search = useCallback((query: string): SearchResult[] => {
    if (!fuseRef.current || !query.trim()) return [];
    
    const results = fuseRef.current.search(query, { limit: 20 });
    
    return results.map((result) => ({
      item: result.item,
      score: result.score,
    }));
  }, []);

  return { search };
}

export function useCourse(slug: string) {
  const { getCourseBySlug, isLoading } = useCourses();
  const course = getCourseBySlug(slug);
  return { course, isLoading };
}

export function useLesson(courseSlug: string, lessonId: string) {
  const { getCourseBySlug } = useCourses();
  const course = getCourseBySlug(courseSlug);
  
  if (!course) return { course: null, lesson: null, courseModule: null };
  
  // Find lesson
  for (const courseModule of course.modules) {
    const lesson = courseModule.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { course, lesson, courseModule };
    }
  }
  
  return { course, lesson: null, courseModule: null };
}
