import { NextResponse } from 'next/server';
import { scanCourses } from '@/lib/course-parser';

// GET /api/courses - List all courses from public/courses/ folder
export async function GET() {
  try {
    const courses = scanCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error scanning courses:', error);
    return NextResponse.json({ courses: [], error: 'Failed to scan courses' }, { status: 500 });
  }
}
