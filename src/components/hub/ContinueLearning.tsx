'use client';

import { useMemo } from 'react';
import { Flame, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/lib/storage/progress-store';
import { useCourses } from '@/lib/courses-context';
import { getTotalLessons } from '@/lib/courses';
import type { Lesson } from '@/types';
import { useRouter } from 'next/navigation';

export function ContinueLearning() {
  const { progress } = useProgressStore();
  const { courses } = useCourses();
  const router = useRouter();

  // Find the most recently accessed course with progress
  const lastCourse = useMemo(() => {
    const courseEntries = Object.entries(progress.courses)
      .filter(([_, cp]) => cp.lastAccessedAt)
      .sort((a, b) => 
        new Date(b[1].lastAccessedAt!).getTime() - new Date(a[1].lastAccessedAt!).getTime()
      );

    if (courseEntries.length === 0) return null;

    const [courseId, courseProgress] = courseEntries[0];
    const course = courses.find((c) => c.id === courseId);
    if (!course) return null;

    const totalLessons = getTotalLessons(course);
    const completedLessons = courseProgress.completedLessons.length;
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Find next lesson to continue
    let nextLesson: Lesson | null = null;
    if (courseProgress.lastAccessedLesson) {
      const currentLesson = course.modules
        .flatMap((m) => m.lessons)
        .find((l) => l.id === courseProgress.lastAccessedLesson);
      
      if (currentLesson) {
        nextLesson = currentLesson;
      }
    }

    // Find first incomplete lesson
    if (!nextLesson) {
      for (const courseModule of course.modules) {
        for (const lesson of courseModule.lessons) {
          if (!courseProgress.completedLessons.includes(lesson.id)) {
            nextLesson = lesson;
            break;
          }
        }
        if (nextLesson) break;
      }
    }

    return {
      course,
      courseProgress,
      totalLessons,
      completedLessons,
      percentage,
      nextLesson,
    };
  }, [progress.courses, courses]);

  // Prefetch course on hover
  const handleMouseEnter = () => {
    if (lastCourse) {
      const url = `/courses/${lastCourse.course.slug}${
        lastCourse.nextLesson ? `?lesson=${lastCourse.nextLesson.id}` : ''
      }`;
      router.prefetch(url.split('?')[0]);
    }
  };

  if (!lastCourse) {
    return null;
  }

  return (
    <Card className="border-0 shadow-md bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" onMouseEnter={handleMouseEnter}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: lastCourse.course.color + '20' }}
          >
            <CheckCircle
              className="h-7 w-7"
              style={{ color: lastCourse.course.color }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{lastCourse.course.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {lastCourse.nextLesson
                ? `Next: ${lastCourse.nextLesson.title}`
                : 'All lessons completed!'}
            </p>
            <div className="flex items-center gap-3">
              <Progress value={lastCourse.percentage} className="h-2 flex-1" />
              <span className="text-sm font-medium">{lastCourse.percentage}%</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-4"
          onClick={() =>
            router.push(
              `/courses/${lastCourse.course.slug}${
                lastCourse.nextLesson ? `?lesson=${lastCourse.nextLesson.id}` : ''
              }`
            )
          }
        >
          Continue
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
