'use client';

import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/lib/storage/progress-store';
import { useStudyTrackingStore } from '@/lib/stores/study-tracking-store';
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
  const { updateQuizScore } = useProgressStore();
  
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
      setSelectedOption(answers[currentIndex + 1] ?? null);
      setShowResult(answers[currentIndex + 1] !== null);
    } else {
      // Quiz finished
      const finalScore = Math.round((correctCount / questions.length) * 100);
      updateQuizScore(course.id, module.id, finalScore);
      setFinished(true);
    }
  }, [currentIndex, questions.length, answers, correctCount, updateQuizScore, course.id, module.id]);

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{module.title} - Quiz</DialogTitle>
        </DialogHeader>

        {finished ? (
          <div className="text-center py-8">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-muted-foreground mb-4">
              You got {correctCount} out of {questions.length} correct
            </p>
            <div className="text-4xl font-bold mb-6" style={{
              color: correctCount === questions.length ? '#10B981' : 
                     correctCount >= questions.length * 0.7 ? '#3B82F6' : '#EF4444'
            }}>
              {Math.round((correctCount / questions.length) * 100)}%
            </div>
            <div className="flex justify-center gap-4">
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
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>{correctCount} correct</span>
              </div>
              <Progress value={(currentIndex / questions.length) * 100} />
            </div>

            {/* Question */}
            <Card className="mb-4">
              <CardContent className="pt-6">
                <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
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
                          'w-full p-4 text-left rounded-lg border transition-colors flex items-center gap-3',
                          bgClass,
                          !showResult && 'cursor-pointer'
                        )}
                      >
                        <span className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center border text-sm font-medium shrink-0',
                          isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                        )}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Explanation */}
            {showResult && (
              <div className={cn(
                'p-4 rounded-lg mb-4',
                isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-amber-50 dark:bg-amber-900/20'
              )}>
                <p className="font-medium mb-1">
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
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
