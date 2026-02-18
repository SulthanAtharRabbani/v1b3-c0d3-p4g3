'use client';

import { useEffect, useState, useCallback } from 'react';
import { Eye, EyeOff, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FocusModeProps {
  isActive: boolean;
  onToggle: () => void;
}

export function FocusModeToggle({ isActive, onToggle }: FocusModeProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={onToggle}
      title={isActive ? 'Exit Focus Mode (Z or ESC)' : 'Enter Focus Mode (Z)'}
      className={cn("gap-1", isActive && "bg-primary hover:bg-primary/90")}
    >
      {isActive ? (
        <>
          <EyeOff className="h-4 w-4" />
          <span className="hidden sm:inline">Exit Focus</span>
        </>
      ) : (
        <>
          <Maximize2 className="h-4 w-4" />
          <span className="hidden sm:inline">Focus</span>
        </>
      )}
    </Button>
  );
}

interface FocusModeOverlayProps {
  isActive: boolean;
  onExit: () => void;
  children: React.ReactNode;
}

export function FocusModeOverlay({ isActive, onExit, children }: FocusModeOverlayProps) {
  // Handle escape key and Z key
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        e.stopPropagation();
        onExit();
      }
    };

    // Use capture phase to ensure we catch the event first
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isActive, onExit]);

  // Prevent body scroll when active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  if (!isActive || !children) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background">
      {/* Exit button */}
      <div className="fixed top-4 right-4 z-10 flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onExit}
          className="gap-1 shadow-lg"
        >
          <EyeOff className="h-4 w-4" />
          Exit Focus Mode
        </Button>
      </div>

      {/* Focus mode hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground bg-muted/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border">
        Press <kbd className="px-1.5 py-0.5 bg-background rounded text-xs mx-1 border font-mono">ESC</kbd> or <kbd className="px-1.5 py-0.5 bg-background rounded text-xs mx-1 border font-mono">Z</kbd> to exit focus mode
      </div>

      {/* Content */}
      <div className="h-full overflow-y-auto pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// Hook for managing focus mode state
export function useFocusMode() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode((prev) => !prev);
  }, []);

  const enterFocusMode = useCallback(() => {
    setIsFocusMode(true);
  }, []);

  const exitFocusMode = useCallback(() => {
    setIsFocusMode(false);
  }, []);

  return {
    isFocusMode,
    toggleFocusMode,
    enterFocusMode,
    exitFocusMode,
  };
}
