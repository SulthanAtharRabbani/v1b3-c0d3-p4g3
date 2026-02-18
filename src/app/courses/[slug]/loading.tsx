import { BookOpen, Loader2 } from 'lucide-react';

export default function CourseLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <BookOpen className="h-12 w-12 mx-auto text-primary animate-pulse" />
          <Loader2 className="h-5 w-5 absolute -bottom-1 -right-1 animate-spin text-primary" />
        </div>
        <div>
          <p className="font-medium">Loading course...</p>
          <p className="text-sm text-muted-foreground">Preparing your learning content</p>
        </div>
      </div>
    </div>
  );
}
