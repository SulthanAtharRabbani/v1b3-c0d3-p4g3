'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { Clock, BarChart3, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/shared/Badge';
import { courses, getTotalLessons } from '@/lib/courses';
import { useProgressStore } from '@/lib/storage/progress-store';
import { CATEGORIES, type CourseCategory } from '@/types';
import { cn } from '@/lib/utils';

// Get icon component from string name
function getIcon(iconName: string): React.ComponentType<{ className?: string; style?: React.CSSProperties }> {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>;
  return icons[iconName] || LucideIcons.BookOpen;
}

export function CategoryFilter({
  selected,
  onSelect,
}: {
  selected: CourseCategory | 'all';
  onSelect: (category: CourseCategory | 'all') => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelect('all')}
      >
        All Courses
      </Button>
      {CATEGORIES.map((category) => (
        <Button
          key={category.id}
          variant={selected === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(category.id)}
          className={cn(
            selected === category.id && 'text-white'
          )}
          style={{
            backgroundColor: selected === category.id ? category.color : undefined,
            borderColor: selected === category.id ? category.color : undefined,
          }}
        >
          {category.displayName}
        </Button>
      ))}
    </div>
  );
}

export function CourseGrid({ category }: { category: CourseCategory | 'all' }) {
  const { getCompletedLessonsCount } = useProgressStore();
  const router = useRouter();

  const filteredCourses = useMemo(() => {
    if (category === 'all') return courses;
    return courses.filter((c) => c.category === category);
  }, [category]);

  // Prefetch on hover
  const handleMouseEnter = (slug: string) => {
    router.prefetch(`/courses/${slug}`);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.map((course) => {
        const Icon = getIcon(course.icon);
        const totalLessons = getTotalLessons(course);
        const completedLessons = getCompletedLessonsCount(course.id);
        const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        const categoryInfo = CATEGORIES.find((c) => c.id === course.category);

        return (
          <Link 
            key={course.id} 
            href={`/courses/${course.slug}`}
            onMouseEnter={() => handleMouseEnter(course.slug)}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 shadow-sm overflow-hidden group cursor-pointer">
              <div
                className="h-2"
                style={{ backgroundColor: course.color }}
              />
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: course.color + '20' }}
                  >
                    <Icon className="h-6 w-6" style={{ color: course.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {course.subtitle}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: categoryInfo?.color,
                          color: categoryInfo?.color,
                        }}
                      >
                        {categoryInfo?.displayName}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {course.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.estimatedHours}h
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{completedLessons}/{totalLessons} lessons</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
