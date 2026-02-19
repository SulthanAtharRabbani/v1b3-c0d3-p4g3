'use client';

import { useMemo } from 'react';
import { BookOpen, Layers, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCourses } from '@/lib/courses-context';
import { getTotalLessons } from '@/lib/courses';

export function CourseStructureCard() {
  const { courses } = useCourses();
  
  const stats = useMemo(() => {
    const totalModules = courses.reduce((acc, course) => acc + course.modules.length, 0);
    const totalLessons = courses.reduce((acc, course) => acc + getTotalLessons(course), 0);
    const totalHours = courses.reduce((acc, course) => acc + course.estimatedHours, 0);
    const totalCourses = courses.length;

    return { totalCourses, totalModules, totalLessons, totalHours };
  }, [courses]);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          Course Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{stats.totalCourses}</div>
              <div className="text-xs text-muted-foreground">Courses</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30">
            <FileText className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{stats.totalLessons}</div>
              <div className="text-xs text-muted-foreground">Lessons</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
            <Layers className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-xl font-bold text-green-700 dark:text-green-300">{stats.totalModules}</div>
              <div className="text-xs text-muted-foreground">Modules</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 dark:bg-orange-950/30">
            <Clock className="h-5 w-5 text-orange-500" />
            <div>
              <div className="text-xl font-bold text-orange-700 dark:text-orange-300">{stats.totalHours}h</div>
              <div className="text-xs text-muted-foreground">Est. Time</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
