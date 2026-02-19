import type { Course } from '@/types';

// No built-in courses - all courses are loaded from public/courses/ folder
export const courses: Course[] = [];

// Helper functions
export function getCourseBySlug(slug: string, allCourses: Course[]): Course | undefined {
  return allCourses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: string, allCourses: Course[]): Course[] {
  return allCourses.filter((c) => c.category === category);
}

export function getAllCategories(allCourses: Course[]): string[] {
  return [...new Set(allCourses.map((c) => c.category))];
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
