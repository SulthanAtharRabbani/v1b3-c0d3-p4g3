import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import type { Course, Module, Lesson, ReferenceItem, Flashcard, QuizQuestion, CourseAchievement } from '@/types';

// Parse YAML-like frontmatter from markdown
function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter: Record<string, unknown> = {};

  // Simple YAML parser for frontmatter
  const lines = frontmatterStr.split('\n');
  let currentKey = '';
  let currentArray: string[] | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    // Check if it's an array item
    if (line.startsWith('  - ') || line.startsWith('- ')) {
      const value = line.replace(/^(\s*- )/, '').trim();
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Check if it's a key: value pair
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: unknown = line.slice(colonIndex + 1).trim();

      // Check if next lines are array items
      if (value === '' || value === '[]') {
        currentKey = key;
        currentArray = [];
        frontmatter[key] = currentArray;
        continue;
      }

      // Parse value
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (/^\d+$/.test(value as string)) value = parseInt(value as string, 10);
      else if (/^\d+\.\d+$/.test(value as string)) value = parseFloat(value as string);
      else if ((value as string).startsWith('[') && (value as string).endsWith(']')) {
        // Inline array
        value = (value as string)
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      } else {
        // Remove quotes
        value = (value as string).replace(/^["']|["']$/g, '');
      }

      frontmatter[key] = value;
      currentKey = '';
      currentArray = null;
    }
  }

  return { frontmatter, body };
}

// Sort by numeric prefix (e.g., "01-intro" before "02-basics")
function sortByPrefix(items: { name: string; path: string }[]): { name: string; path: string }[] {
  return items.sort((a, b) => {
    const getPrefix = (name: string): number => {
      const match = name.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 999;
    };
    return getPrefix(a.name) - getPrefix(b.name);
  });
}

// Load lessons from a module directory
function loadLessons(modulePath: string): Lesson[] {
  const lessons: Lesson[] = [];

  try {
    const entries = readdirSync(modulePath);
    const lessonFiles = entries.filter((e) => e.endsWith('.md') && e !== 'module.md');
    const sortedFiles = sortByPrefix(
      lessonFiles.map((f) => ({ name: f, path: join(modulePath, f) }))
    );

    for (const { name, path } of sortedFiles) {
      try {
        const content = readFileSync(path, 'utf-8');
        const { frontmatter, body } = parseFrontmatter(content);

        lessons.push({
          id: frontmatter.id as string || name.replace('.md', ''),
          title: frontmatter.title as string || name.replace('.md', '').replace(/^\d+-/, ''),
          content: body,
          readingTime: (frontmatter.readingTime as number) || Math.ceil(body.split(/\s+/).length / 200),
          difficulty: (frontmatter.difficulty as Lesson['difficulty']) || 'beginner',
          objectives: (frontmatter.objectives as string[]) || [],
          keyPoints: (frontmatter.keyPoints as string[]) || [],
          examples: (frontmatter.examples as Lesson['examples']) || [],
        });
      } catch {
        // Skip invalid lesson files
      }
    }
  } catch {
    // Module directory doesn't exist or can't be read
  }

  return lessons;
}

// Load quiz questions from a module directory
function loadQuizQuestions(modulePath: string): QuizQuestion[] {
  const quizPath = join(modulePath, 'quiz.json');

  try {
    if (existsSync(quizPath)) {
      const content = readFileSync(quizPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // Quiz file doesn't exist or is invalid
  }

  return [];
}

// Load modules from a course directory
function loadModules(coursePath: string): Module[] {
  const modules: Module[] = [];
  const modulesPath = join(coursePath, 'modules');

  try {
    const entries = readdirSync(modulesPath);
    const moduleDirs = entries.filter((e) => {
      const stat = statSync(join(modulesPath, e));
      return stat.isDirectory();
    });

    const sortedDirs = sortByPrefix(
      moduleDirs.map((d) => ({ name: d, path: join(modulesPath, d) }))
    );

    for (const { name, path } of sortedDirs) {
      // Load module metadata
      const moduleMdPath = join(path, 'module.md');
      let moduleMeta: Record<string, unknown> = {};

      if (existsSync(moduleMdPath)) {
        const content = readFileSync(moduleMdPath, 'utf-8');
        const { frontmatter } = parseFrontmatter(content);
        moduleMeta = frontmatter;
      }

      const lessons = loadLessons(path);
      const quizQuestions = loadQuizQuestions(path);

      if (lessons.length > 0) {
        modules.push({
          id: moduleMeta.id as string || name.replace(/^\d+-/, ''),
          title: moduleMeta.title as string || name.replace(/^\d+-/, '').replace(/-/g, ' '),
          description: (moduleMeta.description as string) || '',
          lessons,
          quizQuestions: quizQuestions.length > 0 ? quizQuestions : undefined,
        });
      }
    }
  } catch {
    // Modules directory doesn't exist
  }

  return modules;
}

// Load quick reference from a course directory
function loadQuickReference(coursePath: string): ReferenceItem[] {
  const refPath = join(coursePath, 'reference', 'formulas.json');

  try {
    if (existsSync(refPath)) {
      const content = readFileSync(refPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // Reference file doesn't exist
  }

  return [];
}

// Load flashcards from a course directory
function loadFlashcards(coursePath: string): Flashcard[] {
  const flashPath = join(coursePath, 'flashcards', 'deck.json');

  try {
    if (existsSync(flashPath)) {
      const content = readFileSync(flashPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // Flashcard file doesn't exist
  }

  return [];
}

// Load achievements from a course directory
function loadAchievements(coursePath: string): CourseAchievement[] {
  const achievementsPath = join(coursePath, 'achievements.json');

  try {
    if (existsSync(achievementsPath)) {
      const content = readFileSync(achievementsPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // Achievements file doesn't exist
  }

  return [];
}

// Load a course from a directory (new markdown-based format)
function loadCourseFromDirectory(coursePath: string): Course | null {
  try {
    // Load course.md for metadata
    const courseMdPath = join(coursePath, 'course.md');
    let courseMeta: Record<string, unknown> = {};
    let description = '';

    if (existsSync(courseMdPath)) {
      const content = readFileSync(courseMdPath, 'utf-8');
      const { frontmatter, body } = parseFrontmatter(content);
      courseMeta = frontmatter;
      // Use first paragraph of body as description if not in frontmatter
      description = body.split('\n\n')[0].replace(/^#\s*.*\n/, '').trim();
    }

    // Load modules
    const modules = loadModules(coursePath);

    if (modules.length === 0) {
      return null;
    }

    // Extract folder name as slug
    const slug = coursePath.split('/').pop() || '';

    return {
      id: courseMeta.id as string || slug,
      slug: courseMeta.slug as string || slug,
      title: courseMeta.title as string || slug,
      subtitle: (courseMeta.subtitle as string) || '',
      description: (courseMeta.description as string) || description,
      category: (courseMeta.category as string) || 'General',
      icon: (courseMeta.icon as string) || 'BookOpen',
      color: (courseMeta.color as string) || '#6366f1',
      difficulty: (courseMeta.difficulty as Course['difficulty']) || 'beginner',
      estimatedHours: (courseMeta.estimatedHours as number) || 10,
      prerequisites: (courseMeta.prerequisites as string[]) || [],
      learningOutcomes: (courseMeta.learningOutcomes as string[]) || [],
      modules,
      quickReference: loadQuickReference(coursePath),
      flashcards: loadFlashcards(coursePath),
      achievements: loadAchievements(coursePath),
    };
  } catch (error) {
    console.error('Error loading course from directory:', error);
    return null;
  }
}

// Load a course from a JSON file (legacy format)
function loadCourseFromJson(filePath: string): Course | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const courseData = JSON.parse(content);

    if (!courseData.id || !courseData.title) {
      return null;
    }

    return {
      ...courseData,
      color: courseData.color || '#6366f1',
      modules: courseData.modules || [],
      quickReference: courseData.quickReference || [],
      flashcards: courseData.flashcards || [],
    };
  } catch {
    return null;
  }
}

// Scan for courses in the public/courses folder
export function scanCourses(): Course[] {
  const courses: Course[] = [];
  const coursesDir = join(process.cwd(), 'public', 'courses');

  try {
    const entries = readdirSync(coursesDir);

    for (const entry of entries) {
      const entryPath = join(coursesDir, entry);
      const stat = statSync(entryPath);

      if (stat.isDirectory()) {
        // Check for course.md (new format) or course.json (folder-based JSON)
        const courseMdPath = join(entryPath, 'course.md');
        const courseJsonPath = join(entryPath, 'course.json');

        if (existsSync(courseMdPath)) {
          // New markdown-based format
          const course = loadCourseFromDirectory(entryPath);
          if (course) courses.push(course);
        } else if (existsSync(courseJsonPath)) {
          // Legacy JSON format in folder
          const course = loadCourseFromJson(courseJsonPath);
          if (course) courses.push(course);
        }
      } else if (entry.endsWith('.json')) {
        // Legacy JSON file
        const course = loadCourseFromJson(entryPath);
        if (course) courses.push(course);
      }
    }
  } catch (error) {
    console.error('Error scanning courses:', error);
  }

  return courses;
}
