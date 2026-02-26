'use client';

import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/lib/storage/progress-store';
import { useStudyTrackingStore } from '@/lib/stores/study-tracking-store';
import { checkAchievements } from '@/lib/achievement-checker';
import type { QuizQuestion, Module as ModuleType, Course } from '@/types';
import { cn } from '@/lib/utils';

interface QuizModalProps {
  course: Course;
  module: ModuleType;
  questions: QuizQuestion[];
  open: boolean;
  onClose: () => void;
}

export function QuizModal({ course, module, questions, open, onClose }: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const { updateQuizScore, getCourseProgress, unlockCourseAchievement } = useProgressStore();

  // Study tracking
  const startSession = useStudyTrackingStore(state => state.startSession);
  const endSession = useStudyTrackingStore(state => state.endSession);

  // Start tracking when quiz opens
  useEffect(() => {
    if (open) {
      startSession('quiz', {
        courseId: course.id,
        courseName: course.title,
      });
    }
  }, [open, course.id, course.title, startSession]);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion?.correctIndex;

  const handleOptionSelect = useCallback((index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  }, [showResult]);

  const handleCheckAnswer = useCallback(() => {
    if (selectedOption === null) return;

    setShowResult(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = selectedOption;
      return newAnswers;
    });
  }, [selectedOption, isCorrect, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      // Only restore answer if it exists in the answers array
      const nextAnswer = answers[currentIndex + 1];
      const hasNextAnswer = nextAnswer !== undefined;
      setSelectedOption(hasNextAnswer ? nextAnswer : null);
      setShowResult(hasNextAnswer);
    } else {
      // Quiz finished
      const finalScore = Math.round((correctCount / questions.length) * 100);
      updateQuizScore(course.id, module.id, finalScore);
      setFinished(true);

      // Check and unlock achievements after quiz completion
      setTimeout(() => {
        const courseProgress = getCourseProgress(course.id);
        const notesCount = Object.keys(courseProgress.notesV2 || {}).filter(
          lessonId => courseProgress.notesV2?.[lessonId]?.content?.trim()
        ).length;

        const results = checkAchievements(
          course,
          courseProgress.completedLessons,
          courseProgress.quizScores,
          notesCount,
          false,
          courseProgress.unlockedAchievements || []
        );

        // Unlock any newly earned achievements
        for (const result of results) {
          if (result.newlyUnlocked) {
            unlockCourseAchievement(course.id, result.achievementId);
          }
        }
      }, 100);
    }
  }, [currentIndex, questions.length, answers, correctCount, updateQuizScore, course.id, module.id, getCourseProgress, unlockCourseAchievement, course]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectCount(0);
    setAnswers([]);
    setFinished(false);
  }, []);

  const handleClose = useCallback(() => {
    // End tracking session with score if finished
    if (finished) {
      const finalScore = Math.round((correctCount / questions.length) * 100);
      endSession({ quizScore: finalScore });
    } else {
      endSession();
    }

    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectCount(0);
    setAnswers([]);
    setFinished(false);
    onClose();
  }, [finished, correctCount, questions.length, endSession, onClose]);

  if (!questions.length) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>{module.title} - Quiz</DialogTitle>
        </DialogHeader>

        {finished ? (
          <div className="text-center py-6 sm:py-8">
            <Trophy className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              You got {correctCount} out of {questions.length} correct
            </p>
            <div className="text-3xl sm:text-4xl font-bold mb-6" style={{
              color: correctCount === questions.length ? '#10B981' :
                     correctCount >= questions.length * 0.7 ? '#3B82F6' : '#EF4444'
            }}>
              {Math.round((correctCount / questions.length) * 100)}%
            </div>
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              <Button variant="outline" onClick={handleRetry}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry Quiz
              </Button>
              <Button onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="shrink-0">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>{correctCount} correct</span>
              </div>
              <Progress value={(currentIndex / questions.length) * 100} />
            </div>

            {/* Question - scrollable on small screens */}
            <div className="flex-1 overflow-y-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
              <Card className="mb-4">
                <CardContent className="pt-4 sm:pt-6">
                  <p className="text-base sm:text-lg font-medium mb-4">{currentQuestion.question}</p>
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrectOption = index === currentQuestion.correctIndex;

                      let bgClass = 'hover:bg-muted';
                      if (showResult) {
                        if (isCorrectOption) bgClass = 'bg-green-100 dark:bg-green-900/30 border-green-500';
                        else if (isSelected && !isCorrectOption) bgClass = 'bg-red-100 dark:bg-red-900/30 border-red-500';
                      } else if (isSelected) {
                        bgClass = 'bg-primary/10 border-primary';
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                          disabled={showResult}
                          className={cn(
                            'w-full p-3 sm:p-4 text-left rounded-lg border transition-colors flex items-center gap-3',
                            bgClass,
                            !showResult && 'cursor-pointer'
                          )}
                        >
                          <span className={cn(
                            'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border text-xs sm:text-sm font-medium shrink-0',
                            isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                          )}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm sm:text-base">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Explanation */}
              {showResult && (
                <div className={cn(
                  'p-3 sm:p-4 rounded-lg mb-4',
                  isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-amber-50 dark:bg-amber-900/20'
                )}>
                  <p className="font-medium mb-1 text-sm sm:text-base">
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 shrink-0">
              {!showResult ? (
                <Button disabled={selectedOption === null} onClick={handleCheckAnswer}>
                  Check Answer
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
