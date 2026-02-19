'use client';

import { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string[]; description: string }[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Navigation',
    shortcuts: [
      { keys: ['←'], description: 'Previous lesson' },
      { keys: ['→'], description: 'Next lesson' },
      { keys: ['ESC'], description: 'Go back to hub' },
    ],
  },
  {
    title: 'Study Tools',
    shortcuts: [
      { keys: ['Q'], description: 'Quick reference' },
      { keys: ['F'], description: 'Flashcards' },
      { keys: ['N'], description: 'Notes' },
      { keys: ['M'], description: 'Mark complete' },
      { keys: ['B'], description: 'Toggle bookmark' },
    ],
  },
  {
    title: 'General',
    shortcuts: [
      { keys: ['/'], description: 'Search' },
      { keys: ['?'], description: 'Show this help' },
      { keys: ['Z'], description: 'Toggle focus mode' },
    ],
  },
];

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        // Check if we're in an input field
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="text-sm">
            Speed up your learning with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:gap-6 py-2 sm:py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-y-auto max-h-[50vh]">
          {shortcutGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">
                {group.title}
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                {group.shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-xs sm:text-sm">{shortcut.description}</span>
                    <div className="flex gap-1 shrink-0">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted rounded text-[10px] sm:text-xs font-mono min-w-[1.5rem] sm:min-w-[2rem] text-center"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end shrink-0">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Inline hint component for showing shortcuts near actions
interface ShortcutHintProps {
  keys: string[];
  className?: string;
}

export function ShortcutHint({ keys, className }: ShortcutHintProps) {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {keys.map((key, index) => (
        <kbd
          key={index}
          className="px-1.5 py-0.5 bg-muted/50 rounded text-[10px] font-mono text-muted-foreground"
        >
          {key}
        </kbd>
      ))}
    </div>
  );
}
