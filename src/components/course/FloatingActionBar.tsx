'use client';

import { BookMarked, FileText, StickyNote, HelpCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionBarProps {
  onQuickReference: () => void;
  onFlashcards: () => void;
  onNotes: () => void;
  hasQuiz?: boolean;
  onQuiz?: () => void;
  hasQuickReference?: boolean;
  hasFlashcards?: boolean;
}

export function FloatingActionBar({
  onQuickReference,
  onFlashcards,
  onNotes,
  hasQuiz = false,
  onQuiz,
  hasQuickReference = true,
  hasFlashcards = true,
}: FloatingActionBarProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
      {hasQuiz && onQuiz && (
        <Button
          size="sm"
          variant="secondary"
          className="shadow-lg"
          onClick={onQuiz}
          title="Take Quiz (Quiz)"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Quiz
        </Button>
      )}
      {hasQuickReference && (
        <Button
          size="sm"
          variant="secondary"
          className="shadow-lg"
          onClick={onQuickReference}
          title="Quick Reference (Q)"
        >
          <BookMarked className="h-4 w-4 mr-2" />
          Reference
        </Button>
      )}
      {hasFlashcards && (
        <Button
          size="sm"
          variant="secondary"
          className="shadow-lg"
          onClick={onFlashcards}
          title="Flashcards (F)"
        >
          <Layers className="h-4 w-4 mr-2" />
          Flashcards
        </Button>
      )}
      <Button
        size="sm"
        variant="secondary"
        className="shadow-lg"
        onClick={onNotes}
        title="Notes (N)"
      >
        <StickyNote className="h-4 w-4 mr-2" />
        Notes
      </Button>
    </div>
  );
}
