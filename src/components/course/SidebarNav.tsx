'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Home, Bookmark, FileText, Layers, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useProgressStore } from '@/lib/storage/progress-store';
import type { Course, Module as ModuleType } from '@/types';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  course: Course;
  currentLessonId?: string;
  onLessonClick: (lessonId: string) => void;
  onQuizClick: (moduleId: string) => void;
}

export function SidebarNav({ course, currentLessonId, onLessonClick, onQuizClick }: SidebarNavProps) {
  const { isLessonComplete, isBookmarked } = useProgressStore();
  
  // Find module containing current lesson
  const currentModuleId = useMemo(() => {
    if (!currentLessonId) return null;
    for (const courseModule of course.modules) {
      if (courseModule.lessons.some((l) => l.id === currentLessonId)) {
        return courseModule.id;
      }
    }
    return null;
  }, [course.modules, currentLessonId]);

  // Initialize expanded modules with current module
  const [expandedModules, setExpandedModules] = useState<string[]>(() => {
    return currentModuleId ? [currentModuleId] : [];
  });

  // Expand module containing current lesson when it changes
  // This is a valid synchronization pattern - see React docs
  useEffect(() => {
    if (currentModuleId && !expandedModules.includes(currentModuleId)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedModules((prev) => [...prev, currentModuleId]);
    }
  }, [currentModuleId, expandedModules]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Get bookmarked lessons
  const bookmarks = useMemo(() => 
    course.modules
      .flatMap((m) => m.lessons)
      .filter((l) => isBookmarked(course.id, l.id)),
    [course.id, course.modules, isBookmarked]
  );

  // Calculate progress
  const progressPercent = useMemo(() => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const completedLessons = course.modules.reduce(
      (acc, m) => acc + m.lessons.filter((l) => isLessonComplete(course.id, l.id)).length,
      0
    );
    return Math.round((completedLessons / totalLessons) * 100);
  }, [course.id, course.modules, isLessonComplete]);

  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* Header */}
      <div className="p-4 border-b">
        <Link href="/">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Home className="h-4 w-4 mr-2" />
            Back to Hub
          </Button>
        </Link>
        <div className="mt-2">
          <h2 className="font-semibold text-lg truncate">{course.title}</h2>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Bookmarks section */}
          {bookmarks.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-muted-foreground">
                <Bookmark className="h-4 w-4" />
                Bookmarks
              </div>
              {bookmarks.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onLessonClick(lesson.id)}
                  className={cn(
                    'w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-left transition-colors',
                    currentLessonId === lesson.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="truncate">{lesson.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Modules */}
          <div className="space-y-1">
            {course.modules.map((courseModule) => {
              const isExpanded = expandedModules.includes(courseModule.id);
              const completedLessons = courseModule.lessons.filter((l) =>
                isLessonComplete(course.id, l.id)
              ).length;
              const totalLessons = courseModule.lessons.length;
              const isModuleComplete = completedLessons === totalLessons;

              return (
                <Collapsible
                  key={courseModule.id}
                  open={isExpanded}
                  onOpenChange={() => toggleModule(courseModule.id)}
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      )}
                      <Layers className="h-4 w-4 shrink-0" style={{ color: course.color }} />
                      <span className="flex-1 text-left font-medium text-sm truncate">
                        {courseModule.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {completedLessons}/{totalLessons}
                      </span>
                      {isModuleComplete && (
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-4 mt-1 space-y-1">
                      {courseModule.lessons.map((lesson) => {
                        const isComplete = isLessonComplete(course.id, lesson.id);
                        const isCurrent = currentLessonId === lesson.id;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onLessonClick(lesson.id)}
                            className={cn(
                              'w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left transition-colors',
                              isCurrent
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            )}
                          >
                            {isComplete ? (
                              <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                            ) : (
                              <Circle className="h-4 w-4 shrink-0" />
                            )}
                            <FileText className="h-4 w-4 shrink-0" />
                            <span className="truncate">{lesson.title}</span>
                          </button>
                        );
                      })}
                      {/* Quiz button */}
                      {courseModule.quizQuestions && courseModule.quizQuestions.length > 0 && (
                        <button
                          onClick={() => onQuizClick(courseModule.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left hover:bg-muted transition-colors text-purple-600 dark:text-purple-400"
                        >
                          <HelpCircle className="h-4 w-4 shrink-0" />
                          <span>Quiz ({courseModule.quizQuestions.length} questions)</span>
                        </button>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Progress */}
      <div className="p-4 border-t">
        <div className="text-sm text-muted-foreground mb-2">Course Progress</div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
