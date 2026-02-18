// Course Categories
export type CourseCategory =
  | 'control-systems'
  | 'signals-systems'
  | 'electronics'
  | 'power-systems'
  | 'mathematics'
  | 'programming'
  | 'communications';

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

// Course
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  icon: string; // Lucide icon name
  color: string; // Theme color (hex)
  difficulty: Difficulty;
  estimatedHours: number;
  prerequisites: string[];
  learningOutcomes: string[];
  modules: Module[];
  quickReference?: ReferenceItem[];
  flashcards?: Flashcard[];
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
  achievements: string[];
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  userName?: string;
  dailyGoal?: number; // minutes per day
}

// Achievement Badge
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement: string;
}

// Category metadata
export interface CategoryInfo {
  id: CourseCategory;
  displayName: string;
  color: string;
  lightColor: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'control-systems',
    displayName: 'Control Systems',
    color: '#3B82F6',
    lightColor: '#DBEAFE',
    description: 'Feedback control, stability, PID, root locus',
  },
  {
    id: 'signals-systems',
    displayName: 'Signals & Systems',
    color: '#8B5CF6',
    lightColor: '#EDE9FE',
    description: 'Signal processing, transforms, filtering',
  },
  {
    id: 'electronics',
    displayName: 'Electronics',
    color: '#10B981',
    lightColor: '#D1FAE5',
    description: 'Circuit analysis, analog, digital electronics',
  },
  {
    id: 'power-systems',
    displayName: 'Power Systems',
    color: '#F59E0B',
    lightColor: '#FEF3C7',
    description: 'Power generation, distribution, machines',
  },
  {
    id: 'mathematics',
    displayName: 'Mathematics',
    color: '#EC4899',
    lightColor: '#FCE7F3',
    description: 'Engineering math, transforms, linear algebra',
  },
  {
    id: 'programming',
    displayName: 'Programming',
    color: '#06B6D4',
    lightColor: '#CFFAFE',
    description: 'DSP, embedded systems, MATLAB, Python',
  },
  {
    id: 'communications',
    displayName: 'Communications',
    color: '#F97316',
    lightColor: '#FFEDD5',
    description: 'Wireless, modulation, information theory',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'Footprints',
    tier: 'bronze',
    requirement: 'Complete 1 lesson',
  },
  {
    id: 'module-master',
    title: 'Module Master',
    description: 'Complete a module',
    icon: 'Award',
    tier: 'bronze',
    requirement: 'Complete 1 module',
  },
  {
    id: 'course-graduate',
    title: 'Course Graduate',
    description: 'Complete a course',
    icon: 'GraduationCap',
    tier: 'silver',
    requirement: 'Complete 1 course',
  },
  {
    id: 'quiz-ace',
    title: 'Quiz Ace',
    description: 'Score 100% on any quiz',
    icon: 'Target',
    tier: 'bronze',
    requirement: 'Get perfect quiz score',
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: '7-day learning streak',
    icon: 'Flame',
    tier: 'silver',
    requirement: '7 consecutive days',
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: '30-day learning streak',
    icon: 'Trophy',
    tier: 'gold',
    requirement: '30 consecutive days',
  },
  {
    id: 'polyglot',
    title: 'Polyglot',
    description: 'Complete 3+ courses',
    icon: 'BookOpen',
    tier: 'gold',
    requirement: 'Complete 3 courses',
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: '100% on all quizzes in a course',
    icon: 'Star',
    tier: 'platinum',
    requirement: 'All perfect quiz scores',
  },
  {
    id: 'century',
    title: 'Century',
    description: 'Complete 100 lessons',
    icon: 'Crown',
    tier: 'platinum',
    requirement: 'Complete 100 lessons',
  },
];
