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
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Speed up your learning with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {shortcutGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                {group.title}
              </h4>
              <div className="space-y-2">
                {group.shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="px-2 py-1 bg-muted rounded text-xs font-mono min-w-[2rem] text-center"
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

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
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
