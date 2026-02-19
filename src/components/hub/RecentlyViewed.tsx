'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Clock, ExternalLink, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useCourses } from '@/lib/courses-context';
import { getLessonById } from '@/lib/courses';
import Link from 'next/link';

interface RecentlyViewedItem {
  courseId: string;
  lessonId: string;
  viewedAt: string;
}

interface RecentlyViewedProps {
  className?: string;
  maxItems?: number;
}

// Custom hook for hydration-safe state
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function RecentlyViewed({ className, maxItems = 5 }: RecentlyViewedProps) {
  const mounted = useMounted();
  const [recentItems, setRecentItems] = useState<RecentlyViewedItem[]>([]);
  const { courses } = useCourses();

  useEffect(() => {
    if (!mounted) return;
    
    const saved = localStorage.getItem('eduhub-recently-viewed');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        queueMicrotask(() => setRecentItems(items.slice(0, maxItems)));
      } catch {
        queueMicrotask(() => setRecentItems([]));
      }
    }
  }, [maxItems, mounted]);

  const clearHistory = () => {
    localStorage.removeItem('eduhub-recently-viewed');
    setRecentItems([]);
  };

  // During SSR or when no items, show a placeholder or nothing
  if (!mounted) {
    return (
      <Card className={cn('flex flex-col h-full', className)}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between shrink-0">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recently Viewed
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 flex-1 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (recentItems.length === 0) {
    return (
      <Card className={cn('flex flex-col h-full', className)}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between shrink-0">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recently Viewed
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 flex-1 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">No recent activity</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('flex flex-col h-full', className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between shrink-0">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recently Viewed
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </CardHeader>
      <CardContent className="px-3 pb-3 flex-1 min-h-0">
        <ScrollArea className="h-full" style={{ maxHeight: '200px' }}>
          <div className="space-y-1 pr-2">
            {recentItems.map((item, index) => {
              const course = courses.find((c) => c.id === item.courseId);
              const lessonData = course ? getLessonById(course, item.lessonId) : null;

              if (!course || !lessonData) return null;

              const { lesson } = lessonData;
              const viewedDate = new Date(item.viewedAt);
              const timeAgo = getTimeAgo(viewedDate);

              return (
                <Link
                  key={`${item.courseId}-${item.lessonId}-${index}`}
                  href={`/courses/${course.slug}?lesson=${item.lessonId}`}
                  className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {course.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <span>{timeAgo}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Utility function to save recently viewed
export function saveRecentlyViewed(courseId: string, lessonId: string) {
  if (typeof window === 'undefined') return;
  
  const saved = localStorage.getItem('eduhub-recently-viewed');
  let items: RecentlyViewedItem[] = [];

  try {
    items = saved ? JSON.parse(saved) : [];
  } catch {
    items = [];
  }

  // Remove existing entry for this lesson
  items = items.filter(
    (item) => !(item.courseId === courseId && item.lessonId === lessonId)
  );

  // Add new entry at the beginning
  items.unshift({
    courseId,
    lessonId,
    viewedAt: new Date().toISOString(),
  });

  // Keep only last 20 items
  items = items.slice(0, 20);

  localStorage.setItem('eduhub-recently-viewed', JSON.stringify(items));
}
