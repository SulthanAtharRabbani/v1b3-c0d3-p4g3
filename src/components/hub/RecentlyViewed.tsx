'use client';

import { useEffect, useState } from 'react';
import { Clock, ExternalLink, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { courses, getLessonById } from '@/lib/courses';
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

export function RecentlyViewed({ className, maxItems = 5 }: RecentlyViewedProps) {
  const [recentItems, setRecentItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('eduhub-recently-viewed');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        // Using microtask to avoid synchronous setState warning
        queueMicrotask(() => setRecentItems(items.slice(0, maxItems)));
      } catch {
        queueMicrotask(() => setRecentItems([]));
      }
    }
  }, [maxItems]);

  const clearHistory = () => {
    localStorage.removeItem('eduhub-recently-viewed');
    setRecentItems([]);
  };

  if (recentItems.length === 0) return null;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
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
      <CardContent className="px-3 pb-3">
        <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-thin">
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
