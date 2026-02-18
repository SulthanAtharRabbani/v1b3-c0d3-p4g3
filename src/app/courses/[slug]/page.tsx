'use client';

// Course viewer page - renders lessons, quizzes, and study tools
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Menu, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useCourse } from '@/hooks/useCourse';
import { getNextLesson, getPreviousLesson, getFirstLesson } from '@/lib/courses';
import { useProgressStore } from '@/lib/storage/progress-store';
import { useShortcut } from '@/hooks/useKeyboardShortcuts';
import { useStudyTracking, useVisibilityTracking } from '@/hooks/useStudyTracking';
import { SidebarNav } from '@/components/course/SidebarNav';
import { LessonContent } from '@/components/course/LessonContent';
import { QuizModal } from '@/components/course/QuizModal';
import { FlashcardsModal } from '@/components/course/FlashcardsModal';
import { QuickReferenceModal } from '@/components/course/QuickReferenceModal';
import { NotesModal } from '@/components/course/NotesModal';
import { FloatingActionBar } from '@/components/course/FloatingActionBar';
import { ReadingProgress } from '@/components/course/ReadingProgress';
import { ScrollToTop } from '@/components/course/ScrollToTop';
import { FocusModeToggle, FocusModeOverlay, useFocusMode } from '@/components/course/FocusMode';
import { LessonMeta } from '@/components/course/LessonMeta';
import { TableOfContents } from '@/components/course/TableOfContents';
import { CompletionToast, useCompletionToast } from '@/components/course/CompletionToast';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';
import { saveRecentlyViewed } from '@/components/hub/RecentlyViewed';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { SearchOverlay } from '@/components/shared/SearchOverlay';
import { KeyboardShortcutsHelp } from '@/components/shared/KeyboardShortcuts';
import { getTotalLessons } from '@/lib/courses';

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  const [slug, setSlug] = useState<string>('');
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lesson') ?? undefined;
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(lessonId);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizModuleId, setQuizModuleId] = useState<string | undefined>();
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showQuickRef, setShowQuickRef] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessonContent, setLessonContent] = useState<string>('');
  const initializedRef = useRef(false);

  const { course } = useCourse(slug);
  const { getCompletedLessonsCount, updateLastAccessed, getCourseProgress, markLessonComplete, progress } = useProgressStore();
  const { isFocusMode, toggleFocusMode, exitFocusMode } = useFocusMode();
  const { toastState, showCompletionToast, hideCompletionToast } = useCompletionToast();

  // Get slug from params
  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  // Initialize lesson when course loads
  useEffect(() => {
    if (course && !initializedRef.current && !activeLessonId) {
      initializedRef.current = true;
      const courseProgress = getCourseProgress(course.id);
      const lastLessonId = courseProgress.lastAccessedLesson;
      if (lastLessonId) {
        // Using microtask to avoid synchronous setState warning
        queueMicrotask(() => {
          setActiveLessonId(lastLessonId);
          updateLastAccessed(course.id, lastLessonId);
        });
      } else {
        const first = getFirstLesson(course);
        if (first) {
          queueMicrotask(() => {
            setActiveLessonId(first.lesson.id);
            updateLastAccessed(course.id, first.lesson.id);
          });
        }
      }
    }
  }, [course, activeLessonId, getCourseProgress, updateLastAccessed]);

  // Keyboard shortcuts
  useShortcut('Q', () => setShowQuickRef(true), 'Quick Reference');
  useShortcut('F', () => setShowFlashcards(true), 'Flashcards');
  useShortcut('N', () => setShowNotes(true), 'Notes');
  useShortcut('Z', toggleFocusMode, 'Focus Mode');

  // Find current lesson and module
  const findCurrentLesson = () => {
    if (!course || !activeLessonId) return { currentLesson: null, currentModule: null };
    for (const courseModule of course.modules) {
      const lesson = courseModule.lessons.find((l) => l.id === activeLessonId);
      if (lesson) {
        return { currentLesson: lesson, currentModule: courseModule };
      }
    }
    return { currentLesson: null, currentModule: null };
  };
  const { currentLesson, currentModule } = findCurrentLesson();
  
  // Study tracking - track lesson viewing (must be after currentLesson is defined)
  useStudyTracking({
    type: 'lesson',
    courseId: course?.id,
    courseName: course?.title,
    lessonId: currentLesson?.id,
    lessonTitle: currentLesson?.title,
    enabled: !!course && !!currentLesson && !isFocusMode,
  });
  
  // Study tracking for focus mode
  useStudyTracking({
    type: 'focus',
    courseId: course?.id,
    courseName: course?.title,
    lessonId: currentLesson?.id,
    lessonTitle: currentLesson?.title,
    enabled: isFocusMode,
  });
  
  // Visibility tracking (pause when tab is hidden)
  useVisibilityTracking();

  // Save to recently viewed when lesson changes
  useEffect(() => {
    if (course && currentLesson) {
      saveRecentlyViewed(course.id, currentLesson.id);
    }
  }, [course, currentLesson]);

  // Get lesson content for meta and TOC
  useEffect(() => {
    if (currentLesson?.content) {
      // Using microtask to avoid synchronous setState warning
      queueMicrotask(() => setLessonContent(currentLesson.content));
    }
  }, [currentLesson]);

  // Get next and previous lessons
  const findNavigation = () => {
    if (!course || !activeLessonId) return { nextLesson: null, prevLesson: null };
    const next = getNextLesson(course, activeLessonId);
    const prev = getPreviousLesson(course, activeLessonId);
    return {
      nextLesson: next ? { id: next.lesson.id, title: next.lesson.title } : null,
      prevLesson: prev ? { id: prev.lesson.id, title: prev.lesson.title } : null,
    };
  };
  const { nextLesson, prevLesson } = findNavigation();

  const totalLessons = course ? getTotalLessons(course) : 0;
  const completedLessons = course ? getCompletedLessonsCount(course.id) : 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Quiz module
  const quizModule = quizModuleId && course ? course.modules.find((m) => m.id === quizModuleId) : undefined;
  const quizQuestions = quizModule?.quizQuestions || [];

  const handleLessonClick = useCallback((id: string) => {
    setActiveLessonId(id);
    if (course) {
      updateLastAccessed(course.id, id);
    }
    setSidebarOpen(false);
  }, [course, updateLastAccessed]);

  const handleQuizClick = useCallback((moduleId: string) => {
    setQuizModuleId(moduleId);
    setShowQuiz(true);
  }, []);

  const handleMarkComplete = useCallback(() => {
    if (course && currentLesson) {
      markLessonComplete(course.id, currentLesson.id);
      showCompletionToast(
        currentLesson.title,
        progress.currentStreak + 1,
        completedLessons + 1 === totalLessons
      );
    }
  }, [course, currentLesson, markLessonComplete, showCompletionToast, progress.currentStreak, completedLessons, totalLessons]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  const focusModeContent = currentLesson && currentModule ? (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">{currentLesson.title}</h1>
      <MarkdownRenderer content={currentLesson.content} />
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r bg-card shrink-0">
        <SidebarNav
          course={course}
          currentLessonId={activeLessonId}
          onLessonClick={handleLessonClick}
          onQuizClick={handleQuizClick}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center gap-4 px-4 h-14">
            {/* Mobile menu */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SidebarNav
                  course={course}
                  currentLessonId={activeLessonId}
                  onLessonClick={handleLessonClick}
                  onQuizClick={handleQuizClick}
                />
              </SheetContent>
            </Sheet>

            {/* Course title */}
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="font-semibold truncate">{course.title}</h1>

            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2 ml-auto">
              <Progress value={progressPercent} className="w-24 h-2" />
              <span className="text-sm text-muted-foreground">{progressPercent}%</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <FocusModeToggle isActive={isFocusMode} onToggle={toggleFocusMode} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Lesson Content */}
        <main className="flex-1 overflow-y-auto">
          {currentLesson && currentModule ? (
            <div className="p-4 md:p-8">
              {/* Lesson Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
                <LessonMeta
                  content={lessonContent}
                  moduleName={currentModule.title}
                  difficulty={currentLesson.difficulty}
                />
                <TableOfContents content={lessonContent} />
              </div>

              <LessonContent
                course={course}
                module={currentModule!}
                lesson={currentLesson!}
                onNavigate={handleLessonClick}
                nextLesson={nextLesson}
                prevLesson={prevLesson}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">Select a lesson to begin</h2>
                <p className="text-muted-foreground">
                  Use the sidebar to navigate through the course content.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Floating Action Bar */}
      {currentLesson && (
        <FloatingActionBar
          onQuickReference={() => setShowQuickRef(true)}
          onFlashcards={() => setShowFlashcards(true)}
          onNotes={() => setShowNotes(true)}
          hasQuiz={!!currentModule?.quizQuestions?.length}
          onQuiz={() => currentModule && handleQuizClick(currentModule.id)}
          hasQuickReference={!!course.quickReference?.length}
          hasFlashcards={!!course.flashcards?.length}
        />
      )}

      {/* Focus Mode Overlay */}
      <FocusModeOverlay isActive={isFocusMode} onExit={exitFocusMode}>
        {focusModeContent}
      </FocusModeOverlay>

      {/* Completion Toast */}
      <CompletionToast
        show={toastState.show}
        onClose={hideCompletionToast}
        lessonTitle={toastState.lessonTitle}
        streak={toastState.streak}
        isCourseComplete={toastState.isCourseComplete}
      />

      {/* Modals */}
      {quizModule && (
        <QuizModal
          course={course}
          module={quizModule}
          questions={quizQuestions}
          open={showQuiz}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {course.flashcards && (
        <FlashcardsModal
          course={course}
          flashcards={course.flashcards}
          open={showFlashcards}
          onClose={() => setShowFlashcards(false)}
        />
      )}

      {course.quickReference && (
        <QuickReferenceModal
          course={course}
          references={course.quickReference}
          open={showQuickRef}
          onClose={() => setShowQuickRef(false)}
        />
      )}

      {currentLesson && (
        <NotesModal
          course={course}
          lesson={currentLesson}
          open={showNotes}
          onClose={() => setShowNotes(false)}
        />
      )}

      {/* Global components */}
      <SearchOverlay />
      <KeyboardShortcutsHelp />
    </div>
  );
}
