'use client';

import { useEffect, useState } from 'react';
import { X, BookOpen, Target, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { courses, getFirstLesson } from '@/lib/courses';
import { useProgressStore } from '@/lib/storage/progress-store';
import Link from 'next/link';

interface WelcomeBackProps {
  className?: string;
}

export function WelcomeBack({ className }: WelcomeBackProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const { progress } = useProgressStore();

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('eduhub-visited');
    const savedName = progress.settings.userName || localStorage.getItem('eduhub-user-name');

    if (savedName) {
      // Using microtask to avoid synchronous setState warning
      queueMicrotask(() => setUserName(savedName));
    }

    // Show welcome back for returning users
    if (hasVisited) {
      // Small delay for animation
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      // Mark as visited
      localStorage.setItem('eduhub-visited', 'true');
    }
  }, [progress.settings.userName]);

  const dismissBanner = () => {
    setIsVisible(false);
    // Remember dismissal for this session
    sessionStorage.setItem('eduhub-welcome-dismissed', 'true');
  };

  useEffect(() => {
    // Check if dismissed this session
    const dismissed = sessionStorage.getItem('eduhub-welcome-dismissed');
    if (dismissed) {
      // Using microtask to avoid synchronous setState warning
      queueMicrotask(() => setIsVisible(false));
    }
  }, []);

  if (!isVisible) return null;

  // Find next lesson to continue
  const getNextLessonLink = () => {
    for (const courseItem of courses) {
      const courseProgress = progress.courses[courseItem.id];
      for (const courseModule of courseItem.modules) {
        for (const lesson of courseModule.lessons) {
          if (!courseProgress || !courseProgress.completedLessons.includes(lesson.id)) {
            return `/courses/${courseItem.slug}?lesson=${lesson.id}`;
          }
        }
      }
    }
    // All complete, go to first lesson of first course
    const firstCourse = courses[0];
    const firstLessonData = getFirstLesson(firstCourse);
    return firstLessonData ? `/courses/${firstCourse.slug}?lesson=${firstLessonData.lesson.id}` : '/courses';
  };

  const totalCompleted = Object.values(progress.courses).reduce(
    (acc, cp) => acc + cp.completedLessons.length,
    0
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10',
        'border-b dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5',
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-2xl" />
      </div>

      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {getGreeting()}{userName ? `, ${userName}` : ''}!
              </h3>
              <p className="text-sm text-muted-foreground">
                {totalCompleted > 0 ? (
                  <>
                    You've completed <span className="font-medium text-foreground">{totalCompleted} lessons</span>
                    {progress.currentStreak > 0 && (
                      <> • <span className="flex items-center gap-1 inline-flex"><Flame className="h-3 w-3 text-amber-500" />{progress.currentStreak} day streak</span></>
                    )}
                  </>
                ) : (
                  "Ready to start your learning journey?"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="gap-1.5">
              <Link href={getNextLessonLink()}>
                <BookOpen className="h-4 w-4" />
                Continue Learning
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={dismissBanner}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
