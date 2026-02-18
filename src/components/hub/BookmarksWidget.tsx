'use client';

import { useMemo } from 'react';
import { Bookmark, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/lib/storage/progress-store';
import { courses } from '@/lib/courses';
import { useRouter } from 'next/navigation';

export function BookmarksWidget() {
  const { progress } = useProgressStore();
  const router = useRouter();

  // Get all bookmarked lessons with their context
  const bookmarkedLessons = useMemo(() => {
    const bookmarks: Array<{
      courseId: string;
      courseSlug: string;
      courseTitle: string;
      courseColor: string;
      moduleId: string;
      moduleTitle: string;
      lessonId: string;
      lessonTitle: string;
      isComplete: boolean;
    }> = [];

    for (const courseId of Object.keys(progress.courses)) {
      const courseProgress = progress.courses[courseId];
      const course = courses.find(c => c.id === courseId);
      
      if (!course || !courseProgress.bookmarks) continue;

      for (const lessonId of courseProgress.bookmarks) {
        // Find the lesson and module
        for (const courseModule of course.modules) {
          const lesson = courseModule.lessons.find(l => l.id === lessonId);
          if (lesson) {
            bookmarks.push({
              courseId,
              courseSlug: course.slug,
              courseTitle: course.title,
              courseColor: course.color,
              moduleId: courseModule.id,
              moduleTitle: courseModule.title,
              lessonId,
              lessonTitle: lesson.title,
              isComplete: courseProgress.completedLessons.includes(lessonId),
            });
            break;
          }
        }
      }
    }

    return bookmarks;
  }, [progress.courses]);

  if (bookmarkedLessons.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-950/50 dark:to-sky-900/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          Bookmarks
          <span className="text-cyan-600 dark:text-cyan-400 text-xs font-medium ml-auto">
            {bookmarkedLessons.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {bookmarkedLessons.slice(0, 5).map((bookmark) => (
            <button
              key={bookmark.lessonId}
              onClick={() => router.push(`/courses/${bookmark.courseSlug}?lesson=${bookmark.lessonId}`)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors text-left group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: bookmark.courseColor + '20' }}
              >
                {bookmark.isComplete ? (
                  <CheckCircle className="h-4 w-4" style={{ color: bookmark.courseColor }} />
                ) : (
                  <Bookmark className="h-4 w-4" style={{ color: bookmark.courseColor }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{bookmark.lessonTitle}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {bookmark.courseTitle}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
          ))}
        </div>
        {bookmarkedLessons.length > 5 && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            +{bookmarkedLessons.length - 5} more bookmarks
          </p>
        )}
      </CardContent>
    </Card>
  );
}
