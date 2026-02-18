import type { Course, CourseCategory } from '@/types';
import { controlSystemsCourse } from '@/lib/content/control-systems';
import { signalsSystemsCourse } from '@/lib/content/signals-systems';

// Central registry - add new courses here
export const courses: Course[] = [
  controlSystemsCourse,
  signalsSystemsCourse,
  // Add more courses below...
];

// Helper functions
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return courses.filter((c) => c.category === category);
}

export function getAllCategories(): CourseCategory[] {
  return [...new Set(courses.map((c) => c.category))];
}

export function getTotalLessons(course: Course): number {
  return course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
}

export function getLessonById(course: Course, lessonId: string) {
  for (const courseModule of course.modules) {
    const lesson = courseModule.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { lesson, module: courseModule };
    }
  }
  return null;
}

export function getModuleById(course: Course, lessonId: string) {
  for (const courseModule of course.modules) {
    const lesson = courseModule.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return courseModule;
    }
  }
  return null;
}

export function getNextLesson(course: Course, currentLessonId: string) {
  let foundCurrent = false;
  for (const courseModule of course.modules) {
    for (const lesson of courseModule.lessons) {
      if (foundCurrent) {
        return { lesson, module: courseModule };
      }
      if (lesson.id === currentLessonId) {
        foundCurrent = true;
      }
    }
  }
  return null;
}

export function getPreviousLesson(course: Course, currentLessonId: string) {
  let previous: { lesson: typeof course.modules[0]['lessons'][0]; module: typeof course.modules[0] } | null = null;
  for (const courseModule of course.modules) {
    for (const lesson of courseModule.lessons) {
      if (lesson.id === currentLessonId) {
        return previous;
      }
      previous = { lesson, module: courseModule };
    }
  }
  return null;
}

export function getFirstLesson(course: Course) {
  if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
    return {
      lesson: course.modules[0].lessons[0],
      module: course.modules[0],
    };
  }
  return null;
}
