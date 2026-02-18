'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Save, Download, Clock, FileText, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/lib/storage/progress-store';
import type { Lesson, Course, Note } from '@/types';

interface NotesModalProps {
  course: Course;
  lesson: Lesson;
  open: boolean;
  onClose: () => void;
}

function NotesModalContent({ course, lesson, onClose }: { 
  course: Course; 
  lesson: Lesson;
  onClose: () => void;
}) {
  const { getNote, getNoteWithMeta, saveNote } = useProgressStore();
  
  // Initialize content from store
  const existingNote = getNote(course.id, lesson.id);
  const noteMeta = getNoteWithMeta(course.id, lesson.id);
  
  const [content, setContent] = useState(existingNote);
  const [saved, setSaved] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Note | null>(noteMeta);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  // Auto-save function
  const performSave = useCallback(() => {
    const currentExistingNote = getNote(course.id, lesson.id);
    if (content === currentExistingNote) {
      setSaved(true);
      return;
    }
    
    setIsSaving(true);
    
    setTimeout(() => {
      saveNote(course.id, lesson.id, content);
      setSaved(true);
      setIsSaving(false);
      const updatedMeta = getNoteWithMeta(course.id, lesson.id);
      setLastSaved(updatedMeta);
    }, 300);
  }, [course.id, lesson.id, content, saveNote, getNote, getNoteWithMeta]);

  // Handle content change with debounced auto-save
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    setSaved(false);
    
    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    // Auto-save after 2 seconds of no typing
    autoSaveTimerRef.current = setTimeout(() => {
      performSave();
    }, 2000);
  }, [performSave]);

  const handleSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
    performSave();
  }, [performSave]);

  const handleExport = useCallback(() => {
    const frontMatter = `---
title: ${lesson.title}
course: ${course.title}
lesson_id: ${lesson.id}
exported: ${new Date().toISOString()}
---

`;
    const blob = new Blob([frontMatter + content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${lesson.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [lesson.title, lesson.id, course.title, content]);

  const handleClose = useCallback(() => {
    // Save before closing if there are unsaved changes
    if (!saved) {
      const currentExistingNote = getNote(course.id, lesson.id);
      if (content !== currentExistingNote) {
        saveNote(course.id, lesson.id, content);
      }
    }
    onClose();
  }, [saved, content, course.id, lesson.id, saveNote, getNote, onClose]);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Notes: {lesson.title}
        </DialogTitle>
        <p className="text-sm text-muted-foreground">
          {course.title}
        </p>
      </DialogHeader>

      <div className="flex-1 flex flex-col min-h-0 space-y-4">
        <Textarea
          placeholder="Write your personal notes here...

• Key concepts to remember
• Questions to research
• Connections to other topics
• Formulas and derivations

Your notes are auto-saved and can be accessed from the hub."
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="flex-1 min-h-[300px] font-mono text-sm resize-none"
        />

        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            {/* Word/Char count */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {wordCount} words
              </Badge>
              <Badge variant="outline" className="text-xs">
                {charCount} chars
              </Badge>
            </div>
            
            {/* Save status */}
            {isSaving ? (
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </span>
            ) : saved ? (
              lastSaved && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Saved at {formatTime(lastSaved.updatedAt)}
                </span>
              )
            ) : (
              <span className="text-amber-600 dark:text-amber-400">
                Unsaved changes
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              disabled={saved}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hidden close button for Dialog */}
      <button 
        className="sr-only" 
        onClick={handleClose}
        aria-label="Close"
      />
    </DialogContent>
  );
}

export function NotesModal({ course, lesson, open, onClose }: NotesModalProps) {
  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }, [onClose]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Use key to reset component when lesson changes */}
      {open && (
        <NotesModalContent 
          key={`${course.id}-${lesson.id}`}
          course={course} 
          lesson={lesson}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}
