'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  StickyNote, Search, Clock, Trash2, ExternalLink, 
  FileText, Calendar, SortAsc, Filter
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useProgressStore } from '@/lib/storage/progress-store';
import { courses } from '@/lib/courses';
import type { Note } from '@/types';

interface AllNotesModalProps {
  open: boolean;
  onClose: () => void;
}

interface NoteWithMeta {
  courseId: string;
  lessonId: string;
  note: Note;
  courseTitle: string;
  lessonTitle: string;
  courseSlug: string;
}

export function AllNotesModal({ open, onClose }: AllNotesModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'course'>('recent');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    courseId: string;
    lessonId: string;
    lessonTitle: string;
  } | null>(null);

  // Subscribe to courses state directly to detect changes
  const coursesProgress = useProgressStore(state => state.progress.courses);
  const getAllNotes = useProgressStore(state => state.getAllNotes);
  const deleteNote = useProgressStore(state => state.deleteNote);

  // Get all notes with enriched metadata - re-compute when coursesProgress changes
  const allNotesWithMeta = useMemo((): NoteWithMeta[] => {
    const allNotes = getAllNotes();
    
    return allNotes.map(({ courseId, lessonId, note }) => {
      const course = courses.find(c => c.id === courseId);
      let lessonTitle = lessonId;
      
      if (course) {
        for (const courseModule of course.modules) {
          const lesson = courseModule.lessons.find(l => l.id === lessonId);
          if (lesson) {
            lessonTitle = lesson.title;
            break;
          }
        }
      }
      
      return {
        courseId,
        lessonId,
        note,
        courseTitle: course?.title || courseId,
        lessonTitle,
        courseSlug: course?.slug || courseId,
      };
    });
  }, [coursesProgress, getAllNotes]); // Re-compute when coursesProgress changes

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let result = [...allNotesWithMeta];
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        ({ note, courseTitle, lessonTitle }) =>
          note.content.toLowerCase().includes(query) ||
          courseTitle.toLowerCase().includes(query) ||
          lessonTitle.toLowerCase().includes(query)
      );
    }
    
    // Filter by course
    if (filterCourse !== 'all') {
      result = result.filter(({ courseId }) => courseId === filterCourse);
    }
    
    // Sort
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => 
          new Date(b.note.updatedAt).getTime() - new Date(a.note.updatedAt).getTime()
        );
        break;
      case 'oldest':
        result.sort((a, b) => 
          new Date(a.note.updatedAt).getTime() - new Date(b.note.updatedAt).getTime()
        );
        break;
      case 'course':
        result.sort((a, b) => a.courseTitle.localeCompare(b.courseTitle));
        break;
    }
    
    return result;
  }, [allNotesWithMeta, searchQuery, sortBy, filterCourse]);

  // Get unique courses for filter
  const uniqueCourses = useMemo(() => {
    const courseMap = new Map<string, { id: string; title: string }>();
    allNotesWithMeta.forEach(({ courseId, courseTitle }) => {
      if (!courseMap.has(courseId)) {
        courseMap.set(courseId, { id: courseId, title: courseTitle });
      }
    });
    return Array.from(courseMap.values());
  }, [allNotesWithMeta]);

  const handleNavigateToLesson = useCallback((courseSlug: string, lessonId: string) => {
    onClose();
    router.push(`/courses/${courseSlug}?lesson=${lessonId}`);
  }, [onClose, router]);

  const handleDeleteNote = useCallback(() => {
    if (deleteDialog) {
      deleteNote(deleteDialog.courseId, deleteDialog.lessonId);
      setDeleteDialog(null);
    }
  }, [deleteDialog, deleteNote]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <StickyNote className="h-5 w-5" />
              All Notes
              <Badge variant="secondary" className="ml-2">
                {filteredNotes.length}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 shrink-0">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                  <SelectTrigger className="w-[130px]">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="course">By Course</SelectItem>
                  </SelectContent>
                </Select>
                
                {uniqueCourses.length > 1 && (
                  <Select value={filterCourse} onValueChange={setFilterCourse}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {uniqueCourses.map(({ id, title }) => (
                        <SelectItem key={id} value={id}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <ScrollArea className="h-full">
                {filteredNotes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p className="font-medium">No notes found</p>
                    <p className="text-sm mt-1">
                      {searchQuery ? 'Try a different search term' : 'Start taking notes while studying'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 pr-4 pb-4">
                    {filteredNotes.map(({ 
                      courseId, 
                      lessonId, 
                      note, 
                      courseTitle, 
                      lessonTitle,
                      courseSlug 
                    }) => (
                      <div
                        key={note.id}
                        className="border rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium truncate">{lessonTitle}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {courseTitle}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleNavigateToLesson(courseSlug, lessonId)}
                              title="Go to lesson"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => setDeleteDialog({
                                open: true,
                                courseId,
                                lessonId,
                                lessonTitle,
                              })}
                              title="Delete note"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm whitespace-pre-wrap line-clamp-3 mb-3">
                          {note.content}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(note.updatedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(note.updatedAt)}
                          </span>
                          <Badge variant="outline" className="text-[10px]">
                            {note.content.length} chars
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={deleteDialog?.open} 
        onOpenChange={(open) => !open && setDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the note for "{deleteDialog?.lessonTitle}"? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNote}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
