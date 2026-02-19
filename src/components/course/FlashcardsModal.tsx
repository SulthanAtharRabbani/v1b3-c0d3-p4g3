'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useStudyTrackingStore } from '@/lib/stores/study-tracking-store';
import type { Flashcard as FlashcardType, Course } from '@/types';
import { cn } from '@/lib/utils';

interface FlashcardsModalProps {
  course: Course;
  flashcards: FlashcardType[];
  open: boolean;
  onClose: () => void;
}

export function FlashcardsModal({ course, flashcards, open, onClose }: FlashcardsModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());

  // Study tracking
  const startSession = useStudyTrackingStore(state => state.startSession);
  const endSession = useStudyTrackingStore(state => state.endSession);

  // Start tracking when modal opens
  useEffect(() => {
    if (open) {
      startSession('flashcard', {
        courseId: course.id,
        courseName: course.title,
      });
    }
  }, [open, course.id, course.title, startSession]);

  const currentCard = flashcards[currentIndex];
  const progress = useMemo(() =>
    ((reviewed.size / flashcards.length) * 100).toFixed(0),
    [reviewed.size, flashcards.length]
  );

  const handleFlip = useCallback(() => setIsFlipped((prev) => !prev), []);

  const handleNext = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, flashcards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleMarkReviewed = useCallback(() => {
    setReviewed((prev) => new Set([...prev, currentIndex]));
    handleNext();
  }, [currentIndex, handleNext]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewed(new Set());
  }, []);

  const handleClose = useCallback(() => {
    // End tracking session with flashcards reviewed count
    endSession({ flashcardsReviewed: reviewed.size });

    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewed(new Set());
    onClose();
  }, [reviewed.size, endSession, onClose]);

  if (!flashcards.length) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center justify-between text-base sm:text-lg">
            <span>Flashcards</span>
            <span className="text-sm font-normal text-muted-foreground">
              {reviewed.size}/{flashcards.length} reviewed
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          {/* Progress */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground w-10 text-right">{progress}%</span>
          </div>

          {/* Card - responsive height */}
          <div
            className="relative h-48 sm:h-56 md:h-64 cursor-pointer shrink-0"
            onClick={handleFlip}
          >
            <div
              className={cn(
                'absolute inset-0 transition-transform duration-500',
                isFlipped && '[transform:rotateY(180deg)]'
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 sm:p-6 flex items-center justify-center text-white text-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div>
                  <p className="text-xs sm:text-sm mb-2 opacity-70">Question</p>
                  <p className="text-base sm:text-lg md:text-xl font-medium">{currentCard.front}</p>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 sm:p-6 flex items-center justify-center text-white text-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div>
                  <p className="text-xs sm:text-sm mb-2 opacity-70">Answer</p>
                  <p className="text-base sm:text-lg md:text-xl font-medium">{currentCard.back}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hint */}
          <p className="text-center text-xs sm:text-sm text-muted-foreground shrink-0">
            Click the card to flip • Card {currentIndex + 1} of {flashcards.length}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-2 shrink-0 pt-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" onClick={handleMarkReviewed}>
              <span className="hidden sm:inline">Mark Reviewed</span>
              <span className="sm:hidden">Done</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
