'use client';

import { useEffect, useCallback, useState } from 'react';

interface KeyboardShortcut {
  key: string;
  action: () => void;
  description: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

const shortcuts: KeyboardShortcut[] = [];

export function useKeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Show help
      if (e.key === '?') {
        setShowHelp((prev) => !prev);
        return;
      }

      // Find matching shortcut
      const matchingShortcut = shortcuts.find((s) => {
        const keyMatch = s.key.toLowerCase() === e.key.toLowerCase();
        const ctrlMatch = s.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
        const shiftMatch = s.shift ? e.shiftKey : !e.shiftKey;
        const altMatch = s.alt ? e.altKey : !e.altKey;
        
        return keyMatch && ctrlMatch && shiftMatch && altMatch;
      });

      if (matchingShortcut) {
        e.preventDefault();
        matchingShortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const registerShortcut = useCallback((shortcut: KeyboardShortcut) => {
    const existingIndex = shortcuts.findIndex(
      (s) => s.key === shortcut.key && s.ctrl === shortcut.ctrl && s.shift === shortcut.shift && s.alt === shortcut.alt
    );
    if (existingIndex >= 0) {
      shortcuts[existingIndex] = shortcut;
    } else {
      shortcuts.push(shortcut);
    }
  }, []);

  const unregisterShortcut = useCallback((key: string) => {
    const index = shortcuts.findIndex((s) => s.key === key);
    if (index >= 0) {
      shortcuts.splice(index, 1);
    }
  }, []);

  return { registerShortcut, unregisterShortcut, showHelp, setShowHelp };
}

export function useShortcut(
  key: string,
  action: () => void,
  description: string,
  modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean }
) {
  const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts();

  useEffect(() => {
    registerShortcut({
      key,
      action,
      description,
      ...modifiers,
    });

    return () => unregisterShortcut(key);
  }, [key, action, description, modifiers, registerShortcut, unregisterShortcut]);
}
