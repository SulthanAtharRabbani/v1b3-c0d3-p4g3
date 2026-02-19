'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { Clock, FolderOpen, BookOpen, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/shared/Badge';
import { useCourses } from '@/lib/courses-context';
import { getTotalLessons } from '@/lib/courses';
import { useProgressStore } from '@/lib/storage/progress-store';
import { cn } from '@/lib/utils';

// Get icon component from string name
function getIcon(iconName: string): React.ComponentType<{ className?: string; style?: React.CSSProperties }> {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>;
  return icons[iconName] || LucideIcons.BookOpen;
}

// Generate a consistent color from a category name
function getCategoryColor(category: string): string {
  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899',
    '#06B6D4', '#F97316', '#84CC16', '#6366F1', '#14B8A6'
  ];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function CategoryFilter({
  selected,
  onSelect,
  categories,
}: {
  selected: string;
  onSelect: (category: string) => void;
  categories: string[];
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
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(category)}
          className={cn(selected === category && 'text-white')}
          style={{
            backgroundColor: selected === category ? getCategoryColor(category) : undefined,
            borderColor: selected === category ? getCategoryColor(category) : undefined,
          }}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

export function CourseGrid({ category }: { category: string }) {
  const { getCompletedLessonsCount } = useProgressStore();
  const { courses } = useCourses();
  const router = useRouter();

  // Extract unique categories from all courses
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(courses.map(c => c.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (category === 'all') return courses;
    return courses.filter((c) => c.category === category);
  }, [category, courses]);

  // Prefetch on hover
  const handleMouseEnter = (slug: string) => {
    router.prefetch(`/courses/${slug}`);
  };

  // Empty state - no courses available
  if (filteredCourses.length === 0 && courses.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">No Courses Yet</CardTitle>
          <CardDescription>
            Create courses using markdown files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground text-center mb-4 font-mono bg-muted p-3 rounded-lg">
            <div>public/courses/</div>
            <div className="pl-4">└── my-course/</div>
            <div className="pl-8">├── course.md</div>
            <div className="pl-8">└── modules/</div>
            <div className="pl-12">└── 01-intro/</div>
            <div className="pl-16">└── 01-lesson.md</div>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Create a course folder</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Add a folder with a <code className="px-1 py-0.5 bg-background rounded text-xs">course.md</code> file containing frontmatter metadata
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Add modules & lessons</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Create lesson files as markdown with frontmatter for title, objectives, and content
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">Optional extras</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Add <code className="px-1 py-0.5 bg-background rounded text-xs">quiz.json</code>, <code className="px-1 py-0.5 bg-background rounded text-xs">formulas.json</code>, and <code className="px-1 py-0.5 bg-background rounded text-xs">deck.json</code> for quizzes, references, and flashcards
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full gap-2">
              <a href="/courses/README.md" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Full Documentation
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full gap-2">
              <a href="/courses/example-course/course.md" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                View Example Course
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filtered empty but courses exist in other categories
  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No courses found in this category</p>
        <p className="text-sm text-muted-foreground mt-1">Try selecting a different category or &quot;All Courses&quot;</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.map((course) => {
        const Icon = getIcon(course.icon);
        const totalLessons = getTotalLessons(course);
        const completedLessons = getCompletedLessonsCount(course.id);
        const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        const categoryColor = getCategoryColor(course.category);

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
                      {course.category && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: categoryColor,
                            color: categoryColor,
                          }}
                        >
                          {course.category}
                        </Badge>
                      )}
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
