'use client';

import { useState, useCallback, useRef } from 'react';
import { Search, X, BookOpen, FolderOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSearch } from '@/hooks/useCourse';
import { useShortcut } from '@/hooks/useKeyboardShortcuts';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Course, Module, Lesson } from '@/types';

interface SearchItem {
  type: 'course' | 'module' | 'lesson';
  course: Course;
  module?: Module;
  lesson?: Lesson;
  title: string;
}

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { search } = useSearch();
  const router = useRouter();

  const handleSelect = useCallback((item: SearchItem) => {
    if (item.type === 'course') {
      router.push(`/courses/${item.course.slug}`);
    } else if (item.type === 'lesson' && item.lesson && item.module) {
      router.push(`/courses/${item.course.slug}?lesson=${item.lesson.id}`);
    } else if (item.type === 'module' && item.module) {
      router.push(`/courses/${item.course.slug}?module=${item.module.id}`);
    }
    setOpen(false);
    setQuery('');
  }, [router]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  // Only open with "/", close with Escape (handled by Dialog)
  useShortcut('/', () => {
    if (!open) {
      setOpen(true);
    }
  }, 'Open search');

  const results = search(query);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search courses and lessons</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, modules, lessons..."
            className="border-0 focus-visible:ring-0 text-lg"
            autoFocus
          />
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 && query.length > 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
          {results.map((result, index) => (
            <button
              key={`${result.item.type}-${result.item.course.id}-${result.item.lesson?.id || result.item.module?.id}`}
              onClick={() => handleSelect(result.item)}
              className={cn(
                'w-full px-4 py-3 flex items-start gap-3 hover:bg-muted transition-colors text-left',
                index !== results.length - 1 && 'border-b'
              )}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: result.item.course.color + '20' }}
              >
                {result.item.type === 'course' && <BookOpen className="h-4 w-4" style={{ color: result.item.course.color }} />}
                {result.item.type === 'module' && <FolderOpen className="h-4 w-4" style={{ color: result.item.course.color }} />}
                {result.item.type === 'lesson' && <FileText className="h-4 w-4" style={{ color: result.item.course.color }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{result.item.title}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {result.item.course.title}
                  {result.item.module && ` • ${result.item.module.title}`}
                </div>
              </div>
            </button>
          ))}
        </div>
        {query.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground border-t">
            Start typing to search...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
