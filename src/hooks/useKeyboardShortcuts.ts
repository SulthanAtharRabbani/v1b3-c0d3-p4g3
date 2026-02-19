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

// Global map for shortcuts
const shortcutsMap = new Map<string, KeyboardShortcut>();

// Single global event listener
let isListenerAttached = false;
let showHelpGlobal = false;
const showHelpListeners = new Set<(show: boolean) => void>();

function attachGlobalListener() {
  if (isListenerAttached) return;
  isListenerAttached = true;

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    // Ignore if typing in input
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    // Show help
    if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      showHelpGlobal = !showHelpGlobal;
      showHelpListeners.forEach(listener => listener(showHelpGlobal));
      return;
    }

    // Build key identifier
    const modifiers: string[] = [];
    if (e.ctrlKey || e.metaKey) modifiers.push('ctrl');
    if (e.shiftKey) modifiers.push('shift');
    if (e.altKey) modifiers.push('alt');
    modifiers.push(e.key.toLowerCase());
    const keyId = modifiers.join('+');

    // Find matching shortcut
    const shortcut = shortcutsMap.get(keyId);
    if (shortcut) {
      e.preventDefault();
      e.stopPropagation();
      shortcut.action();
    }
  }, true); // Use capture phase for better reliability
}

export function useKeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(showHelpGlobal);

  useEffect(() => {
    attachGlobalListener();
    
    // Subscribe to help state changes
    showHelpListeners.add(setShowHelp);
    
    return () => {
      showHelpListeners.delete(setShowHelp);
    };
  }, []);

  const registerShortcut = useCallback((shortcut: KeyboardShortcut) => {
    const modifiers: string[] = [];
    if (shortcut.ctrl) modifiers.push('ctrl');
    if (shortcut.shift) modifiers.push('shift');
    if (shortcut.alt) modifiers.push('alt');
    modifiers.push(shortcut.key.toLowerCase());
    const keyId = modifiers.join('+');

    shortcutsMap.set(keyId, shortcut);
  }, []);

  const unregisterShortcut = useCallback((key: string, modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean }) => {
    const modParts: string[] = [];
    if (modifiers?.ctrl) modParts.push('ctrl');
    if (modifiers?.shift) modParts.push('shift');
    if (modifiers?.alt) modParts.push('alt');
    modParts.push(key.toLowerCase());
    const keyId = modParts.join('+');

    shortcutsMap.delete(keyId);
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

    return () => unregisterShortcut(key, modifiers);
  }, [key, action, description, modifiers, registerShortcut, unregisterShortcut]);
}
