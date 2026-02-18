'use client';

import { useState, useMemo } from 'react';
import { StickyNote, FileText, Clock, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProgressStore } from '@/lib/storage/progress-store';
import { courses } from '@/lib/courses';
import { AllNotesModal } from './AllNotesModal';

export function NotesWidget() {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const { getAllNotes } = useProgressStore();
  
  const allNotes = useMemo(() => getAllNotes(), [getAllNotes]);
  const recentNotes = allNotes.slice(0, 3);
  const totalNotes = allNotes.length;
  
  // Helper to get course and lesson info
  const getCourseInfo = (courseId: string) => {
    return courses.find(c => c.id === courseId);
  };
  
  const getLessonTitle = (courseId: string, lessonId: string) => {
    const course = getCourseInfo(courseId);
    if (!course) return lessonId;
    
    for (const courseModule of course.modules) {
      const lesson = courseModule.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson.title;
    }
    return lessonId;
  };
  
  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (totalNotes === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <StickyNote className="h-4 w-4" />
            My Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No notes yet</p>
            <p className="text-xs mt-1">Take notes while studying to see them here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <StickyNote className="h-4 w-4" />
              My Notes
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {totalNotes}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="max-h-64">
            <div className="space-y-2">
              {recentNotes.map(({ courseId, lessonId, note }) => {
                const course = getCourseInfo(courseId);
                const lessonTitle = getLessonTitle(courseId, lessonId);
                
                return (
                  <button
                    key={note.id}
                    onClick={() => setShowAllNotes(true)}
                    className="w-full text-left p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">
                          {lessonTitle}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {course?.title || courseId}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {note.content.substring(0, 80)}
                          {note.content.length > 80 && '...'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(note.updatedAt)}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
          
          {totalNotes > 3 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => setShowAllNotes(true)}
            >
              View all {totalNotes} notes
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </CardContent>
      </Card>
      
      <AllNotesModal 
        open={showAllNotes} 
        onClose={() => setShowAllNotes(false)} 
      />
    </>
  );
}
