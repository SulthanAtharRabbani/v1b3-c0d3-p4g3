// Difficulty levels
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// Example (worked example with step-by-step solution)
export interface Example {
  id: string;
  title: string;
  problem: string;
  solution: ExampleStep[];
}

export interface ExampleStep {
  step: number;
  description: string;
  content: string; // LaTeX/Markdown content
}

// Exercise (practice problem)
export interface Exercise {
  id: string;
  question: string;
  hint?: string;
  answer: string;
  explanation?: string;
}

// Quiz Question
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Quick Reference Item
export interface ReferenceItem {
  id: string;
  title: string;
  formula: string; // LaTeX
  description: string;
  module?: string;
}

// Flashcard
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  moduleId?: string;
}

// Lesson
export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown with LaTeX
  objectives: string[];
  keyPoints: string[];
  readingTime: number; // in minutes
  examples?: Example[];
  exercises?: Exercise[];
  difficulty?: Difficulty;
}

// Module (collection of lessons)
export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quizQuestions?: QuizQuestion[];
}

// Course Achievement (defined per course)
export interface CourseAchievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  type: 'lesson' | 'module' | 'course' | 'quiz' | 'custom';
  requirement: string; // e.g., "complete-all", "quiz-perfect", "first-lesson"
}

// Course
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string; // Free-form category name
  icon: string; // Lucide icon name
  color: string; // Theme color (hex)
  difficulty: Difficulty;
  estimatedHours: number;
  prerequisites: string[];
  learningOutcomes: string[];
  modules: Module[];
  quickReference?: ReferenceItem[];
  flashcards?: Flashcard[];
  achievements?: CourseAchievement[]; // Course-specific achievements
}

// Note with metadata
export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// User Progress (stored in LocalStorage)
export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  quizScores: Record<string, number>; // moduleId -> best score
  bookmarks: string[];
  notes: Record<string, string>; // lessonId -> note content (legacy format)
  notesV2: Record<string, Note>; // lessonId -> Note object (new format with metadata)
  unlockedAchievements: string[]; // Achievement IDs unlocked for this course
  lastAccessedLesson?: string;
  lastAccessedAt?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface UserProgress {
  totalStudyTime: number; // in seconds
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // ISO date
  courses: Record<string, CourseProgress>;
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  userName?: string;
  dailyGoal?: number; // minutes per day
}

// Global streak achievements (not course-specific)
export interface StreakAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number; // days
}

export const STREAK_ACHIEVEMENTS: StreakAchievement[] = [
  { id: 'streak-3', title: 'Getting Started', description: '3-day learning streak', icon: 'Flame', requirement: 3 },
  { id: 'streak-7', title: 'Week Warrior', description: '7-day learning streak', icon: 'Flame', requirement: 7 },
  { id: 'streak-14', title: 'Two Weeks Strong', description: '14-day learning streak', icon: 'Flame', requirement: 14 },
  { id: 'streak-30', title: 'Month Master', description: '30-day learning streak', icon: 'Trophy', requirement: 30 },
  { id: 'streak-60', title: 'Dedicated Learner', description: '60-day learning streak', icon: 'Trophy', requirement: 60 },
  { id: 'streak-100', title: 'Centurion', description: '100-day learning streak', icon: 'Crown', requirement: 100 },
];

// Default course achievement templates (courses can use these or define custom)
export const DEFAULT_COURSE_ACHIEVEMENTS: CourseAchievement[] = [
  { id: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson', icon: 'Footprints', type: 'lesson', requirement: 'complete-first' },
  { id: 'module-complete', title: 'Module Master', description: 'Complete a module', icon: 'Award', type: 'module', requirement: 'complete-first' },
  { id: 'course-complete', title: 'Course Graduate', description: 'Complete the entire course', icon: 'GraduationCap', type: 'course', requirement: 'complete-all' },
  { id: 'quiz-perfect', title: 'Perfect Score', description: 'Get 100% on a quiz', icon: 'Target', type: 'quiz', requirement: 'score-100' },
  { id: 'all-quizzes-perfect', title: 'Quiz Master', description: 'Get 100% on all quizzes', icon: 'Star', type: 'quiz', requirement: 'all-perfect' },
];
