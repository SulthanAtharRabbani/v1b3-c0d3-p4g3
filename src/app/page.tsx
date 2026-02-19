'use client';

import { useState } from 'react';
import { GraduationCap, Search, Keyboard, Settings, BookOpen, Flame, Compass, Library } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuickStatsBar } from '@/components/hub/QuickStatsBar';
import { ContinueLearning } from '@/components/hub/ContinueLearning';
import { StreakCounter } from '@/components/hub/StreakCounter';
import { AchievementsPreview } from '@/components/hub/AchievementsPreview';
import { DailyGoalProgress } from '@/components/hub/DailyGoalProgress';
import { BookmarksWidget } from '@/components/hub/BookmarksWidget';
import { NotesWidget } from '@/components/hub/NotesWidget';
import { CourseStructureCard } from '@/components/hub/CourseStructureCard';
import { CategoryFilter, CourseGrid } from '@/components/hub/CourseGrid';
import { RecentlyViewed } from '@/components/hub/RecentlyViewed';
import { StudyStats } from '@/components/course/StudyStats';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { SearchOverlay } from '@/components/shared/SearchOverlay';
import { KeyboardShortcutsHelp } from '@/components/shared/KeyboardShortcuts';
import { SettingsModal } from '@/components/shared/SettingsModal';
import { OnboardingTooltip } from '@/components/shared/OnboardingTooltip';
import { useStats } from '@/hooks/useStats';
import { useProgressStore } from '@/lib/storage/progress-store';
import { courses, getTotalLessons } from '@/lib/courses';
import type { CourseCategory } from '@/types';

export default function HubPage() {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const stats = useStats();
  const { progress } = useProgressStore();
  
  // Calculate total progress
  const totalLessons = courses.reduce((acc, course) => acc + getTotalLessons(course), 0);
  const completedCount = Object.values(progress.courses).reduce(
    (acc, cp) => acc + cp.completedLessons.length,
    0
  );
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const scrollToCatalog = () => {
    document.getElementById('course-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">EduHub</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Learn at your own pace</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Streak indicator */}
              {stats.currentStreak > 0 && (
                <div className="hidden sm:flex items-center gap-1 text-amber-500 mr-2">
                  <Flame className="h-4 w-4" />
                  <span className="text-sm font-medium">{stats.currentStreak}</span>
                </div>
              )}
              <Button variant="ghost" size="icon" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }))}>
                <Search className="h-5 w-5" />
              </Button>
              <SettingsModal />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Hero Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">Self-Study Platform</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {stats.totalCompletedLessons > 0
                  ? `Welcome back! Keep learning!`
                  : 'Start Your Learning Journey'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Master control systems, signal processing, and more with interactive lessons,
                quizzes, and study tools.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button 
                size="lg" 
                onClick={scrollToCatalog}
                className="gap-2"
              >
                <Library className="h-4 w-4" />
                Browse Courses
              </Button>
              {completedCount > 0 && (
                <Button variant="outline" size="lg" onClick={scrollToCatalog} className="gap-2">
                  <Compass className="h-4 w-4" />
                  Continue Learning
                </Button>
              )}
            </div>

            {/* Progress Overview */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">{completedCount} of {totalLessons} lessons completed</span>
                <span className="font-medium">{progressPercentage}%</span>
              </div>
              <div className="h-3 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="max-w-3xl mx-auto">
              <QuickStatsBar />
            </div>
          </div>
        </section>

        {/* Continue Learning & Widgets */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <ContinueLearning />
              <div className="grid gap-6 md:grid-cols-2">
                <NotesWidget />
                <RecentlyViewed />
              </div>
              <CourseStructureCard />
            </div>
            <div className="space-y-6">
              <StudyStats />
              <DailyGoalProgress />
              <StreakCounter />
              <AchievementsPreview />
              <BookmarksWidget />
            </div>
          </div>
        </section>

        {/* Course Catalog */}
        <section id="course-catalog" className="container mx-auto px-4 py-8 scroll-mt-20">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Course Catalog</h3>
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <CourseGrid category={selectedCategory} />
        </section>
        
        {/* Keyboard Shortcuts Help */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-muted/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">ESC</kbd>
                <span className="text-muted-foreground">Go back</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">→</kbd>
                <span className="text-muted-foreground">Prev/Next</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Q</kbd>
                <span className="text-muted-foreground">Quick reference</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">F</kbd>
                <span className="text-muted-foreground">Flashcards</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">N</kbd>
                <span className="text-muted-foreground">Notes</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">M</kbd>
                <span className="text-muted-foreground">Mark complete</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">/</kbd>
                <span className="text-muted-foreground">Search</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">?</kbd>
                <span className="text-muted-foreground">Help</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Keyboard className="h-4 w-4" />
                Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-1">?</kbd> for shortcuts
              </span>
              <span>•</span>
              <span>Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-1">/</kbd> to search</span>
            </div>
            <p className="text-sm text-muted-foreground">
              EduHub © 2025 • Made for students
            </p>
          </div>
        </div>
      </footer>

      {/* Global Components */}
      <SearchOverlay />
      <KeyboardShortcutsHelp />
      <OnboardingTooltip />
    </div>
  );
}
