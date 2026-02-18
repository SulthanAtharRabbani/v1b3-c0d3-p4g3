'use client';

import { Clock, BookOpen, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LessonMetaProps {
  content: string;
  moduleName?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  className?: string;
}

export function LessonMeta({ content, moduleName, difficulty, className }: LessonMetaProps) {
  // Calculate estimated reading time (average 200 words per minute)
  const calculateReadingTime = (text: string): number => {
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return Math.max(1, minutes);
  };

  // Calculate word count
  const calculateWordCount = (text: string): number => {
    return text.trim().split(/\s+/).length;
  };

  const readingTime = calculateReadingTime(content);
  const wordCount = calculateWordCount(content);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return '';
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-3 text-sm text-muted-foreground', className)}>
      {/* Reading Time */}
      <div className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        <span>{readingTime} min read</span>
      </div>

      {/* Word Count */}
      <div className="flex items-center gap-1.5">
        <FileText className="h-4 w-4" />
        <span>{wordCount.toLocaleString()} words</span>
      </div>

      {/* Module Name */}
      {moduleName && (
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-4 w-4" />
          <span>{moduleName}</span>
        </div>
      )}

      {/* Difficulty */}
      {difficulty && (
        <Badge variant="secondary" className={cn('text-xs', getDifficultyColor(difficulty))}>
          {difficulty}
        </Badge>
      )}
    </div>
  );
}
