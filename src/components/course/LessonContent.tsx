'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight, Lightbulb, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/shared/Badge';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';
import { useProgressStore } from '@/lib/storage/progress-store';
import { checkAchievements } from '@/lib/achievement-checker';
import { useShortcut } from '@/hooks/useKeyboardShortcuts';
import { useCelebration, CelebrationModal } from '@/components/shared/Celebration';
import type { Lesson, Module, Course } from '@/types';
import { cn } from '@/lib/utils';

// Example Box
function ExampleBox({ title, problem, solution }: { title: string; problem: string; solution?: { step: number; description: string; content: string }[] }) {
  const [expanded, setExpanded] = useState(false);

  // Guard against missing solution
  if (!solution || !Array.isArray(solution)) {
    return null;
  }

  return (
    <Card className="mb-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            Example: {title}
          </CardTitle>
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-2">
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <p className="font-medium mb-2">Problem:</p>
            <MarkdownRenderer content={problem} />
          </div>
          <div className="space-y-4">
            <p className="font-medium">Solution:</p>
            {solution.map((step) => (
              <div key={step.step} className="pl-4 border-l-2 border-blue-200">
                <p className="font-medium text-sm text-blue-600">Step {step.step}: {step.description}</p>
                <MarkdownRenderer content={step.content} />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Key Points Box
function KeyPointsBox({ points }: { points: string[] }) {
  return (
    <Card className="mb-6 border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20">
      <CardContent className="pt-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Info className="h-5 w-5 text-green-600" />
          Key Takeaways
        </h4>
        <ul className="space-y-1">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface LessonContentProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  onNavigate: (lessonId: string) => void;
  nextLesson?: { id: string; title: string } | null;
  prevLesson?: { id: string; title: string } | null;
}

export function LessonContent({
  course,
  module,
  lesson,
  onNavigate,
  nextLesson,
  prevLesson,
}: LessonContentProps) {
  const {
    markLessonComplete,
    unmarkLessonComplete,
    isLessonComplete,
    isBookmarked,
    toggleBookmark,
    updateLastAccessed,
    updateStreak,
    getCompletedLessonsCount,
    getCourseProgress,
    unlockCourseAchievement,
    progress
  } = useProgressStore();

  const completed = isLessonComplete(course.id, lesson.id);
  const bookmarked = isBookmarked(course.id, lesson.id);
  const contentRef = useRef<HTMLDivElement>(null);
  const { celebrate } = useCelebration();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<'lesson' | 'module' | 'course'>('lesson');

  // Mark as accessed and update streak when viewing
  useEffect(() => {
    updateLastAccessed(course.id, lesson.id);
    updateStreak();
  }, [course.id, lesson.id, updateLastAccessed, updateStreak]);

  // Check and unlock achievements for the course
  const checkAndUnlockAchievements = useCallback(() => {
    const courseProgress = getCourseProgress(course.id);
    const notesCount = Object.keys(courseProgress.notesV2 || {}).filter(
      lessonId => courseProgress.notesV2?.[lessonId]?.content?.trim()
    ).length;

    const results = checkAchievements(
      course,
      courseProgress.completedLessons,
      courseProgress.quizScores,
      notesCount,
      false, // flashcardsReviewed - handled separately
      courseProgress.unlockedAchievements || []
    );

    // Unlock any newly earned achievements
    for (const result of results) {
      if (result.newlyUnlocked) {
        unlockCourseAchievement(course.id, result.achievementId);
      }
    }
  }, [course, getCourseProgress, unlockCourseAchievement]);

  // Toggle completion
  const handleToggleComplete = () => {
    if (completed) {
      unmarkLessonComplete(course.id, lesson.id);
    } else {
      markLessonComplete(course.id, lesson.id);

      // Check what was just completed and trigger celebration
      const completedCount = getCompletedLessonsCount(course.id);

      // Check if module is complete
      const moduleLessonIds = module.lessons.map(l => l.id);
      const allModuleLessonsComplete = moduleLessonIds.every(id =>
        id === lesson.id || isLessonComplete(course.id, id)
      );

      // Check if course is complete
      const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      const courseComplete = completedCount === totalLessons;

      // Check and unlock achievements
      setTimeout(() => {
        checkAndUnlockAchievements();
      }, 100);

      if (courseComplete) {
        setCelebrationType('course');
        setShowCelebration(true);
      } else if (allModuleLessonsComplete) {
        setCelebrationType('module');
        setShowCelebration(true);
      } else {
        celebrate('lesson');
      }
    }
  };

  // Keyboard shortcuts
  useShortcut('M', handleToggleComplete, 'Toggle complete');
  useShortcut('B', () => toggleBookmark(course.id, lesson.id), 'Toggle bookmark');
  useShortcut('ArrowLeft', () => prevLesson && onNavigate(prevLesson.id), 'Previous lesson');
  useShortcut('ArrowRight', () => nextLesson && onNavigate(nextLesson.id), 'Next lesson');

  return (
    <div ref={contentRef} className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Badge variant="outline" style={{ borderColor: course.color, color: course.color }}>
            {module.title}
          </Badge>
          <span>•</span>
          <span>{lesson.readingTime} min read</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant={completed ? 'default' : 'outline'}
            size="sm"
            onClick={handleToggleComplete}
            className={cn(completed && 'bg-green-600 hover:bg-green-700')}
          >
            {completed ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </>
            ) : (
              <>
                <Circle className="h-4 w-4 mr-2" />
                Mark Complete
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleBookmark(course.id, lesson.id)}
          >
            {bookmarked ? (
              <>
                <BookmarkCheck className="h-4 w-4 mr-2" />
                Bookmarked
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Objectives */}
      {lesson.objectives.length > 0 && (
        <Card className="mb-6 bg-muted/50">
          <CardContent className="pt-4">
            <h4 className="font-semibold mb-2">Learning Objectives</h4>
            <ul className="space-y-1">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-medium">{i + 1}.</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <MarkdownRenderer content={lesson.content} />
      </div>

      {/* Examples */}
      {lesson.examples && Array.isArray(lesson.examples) && lesson.examples.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Worked Examples</h2>
          {lesson.examples.map((example) => (
            <ExampleBox
              key={example.id}
              title={example.title}
              problem={example.problem}
              solution={example.solution}
            />
          ))}
        </div>
      )}

      {/* Key Points */}
      {lesson.keyPoints.length > 0 && <KeyPointsBox points={lesson.keyPoints} />}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          disabled={!prevLesson}
          onClick={() => prevLesson && onNavigate(prevLesson.id)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          disabled={!nextLesson}
          onClick={() => nextLesson && onNavigate(nextLesson.id)}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        type={celebrationType}
        title={celebrationType === 'course' ? '🎉 Course Complete!' : celebrationType === 'module' ? '🏆 Module Complete!' : '✅ Lesson Complete!'}
        description={
          celebrationType === 'course'
            ? `Congratulations! You've completed ${course.title}!`
            : celebrationType === 'module'
            ? `Great work! You've finished the ${module.title} module.`
            : 'Keep up the great work!'
        }
        open={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
