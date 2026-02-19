# EduHub - All-in-One Course Learning Platform

A comprehensive, self-paced learning platform designed for engineering students. EduHub provides an interactive environment for studying control systems, signal processing, and more with rich content including LaTeX formulas, quizzes, flashcards, and personal notes.

![EduHub](https://img.shields.io/badge/EduHub-Learning%20Platform-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Creating a New Course](#creating-a-new-course)
- [Course Content Guide](#course-content-guide)
- [Study Tools](#study-tools)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Data Storage](#data-storage)
- [Development](#development)

---

## Features

### 📚 Course Management
- **Modular Course Structure** - Organize content into modules and lessons
- **Rich Content Support** - Markdown with LaTeX/KaTeX for mathematical formulas
- **Reading Time Estimation** - Automatic calculation based on content length
- **Progress Tracking** - Track completed lessons and overall course progress

### 📝 Study Tools
- **Personal Notes** - Take notes on any lesson with auto-save
- **Bookmarks** - Bookmark important lessons for quick access
- **Flashcards** - Spaced repetition flashcard system
- **Quick Reference** - Searchable formula sheets and key concepts
- **Quizzes** - Multiple choice quizzes with explanations

### ⏱️ Productivity
- **Pomodoro Timer** - Built-in focus timer with work/break cycles
- **Focus Mode** - Distraction-free reading mode
- **Study Statistics** - Track daily, weekly, and monthly study time
- **Streak Counter** - Daily learning streak with milestones

### 🎯 User Experience
- **Dark/Light Theme** - System preference detection with manual toggle
- **Responsive Design** - Works on desktop and mobile
- **Keyboard Shortcuts** - Power user navigation
- **Progress Export/Import** - Backup and restore your progress

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd eduhub

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Hub landing page
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   └── courses/
│       └── [slug]/
│           └── page.tsx          # Course viewer page
│
├── components/
│   ├── course/                   # Course-related components
│   │   ├── LessonContent.tsx     # Lesson renderer
│   │   ├── NotesModal.tsx        # Personal notes editor
│   │   ├── QuizModal.tsx         # Quiz interface
│   │   ├── FlashcardsModal.tsx   # Flashcard viewer
│   │   └── ...
│   │
│   ├── hub/                      # Hub page widgets
│   │   ├── NotesWidget.tsx       # Notes overview
│   │   ├── CourseGrid.tsx        # Course catalog
│   │   └── ...
│   │
│   ├── shared/                   # Shared components
│   │   ├── SearchOverlay.tsx     # Global search
│   │   ├── PomodoroWidget.tsx    # Pomodoro timer
│   │   ├── MarkdownRenderer.tsx  # Markdown + LaTeX
│   │   └── ...
│   │
│   └── ui/                       # shadcn/ui components
│
├── lib/
│   ├── content/                  # Course content definitions
│   │   ├── control-systems/      # Control Systems course
│   │   │   ├── index.ts          # Course export
│   │   │   ├── modules.ts        # Module & lesson content
│   │   │   ├── flashcards.ts     # Flashcard definitions
│   │   │   └── reference.ts      # Quick reference items
│   │   │
│   │   └── signals-systems/      # Signals & Systems course
│   │       └── ...
│   │
│   ├── stores/                   # Zustand stores
│   │   └── study-tracking-store.ts
│   │
│   ├── courses/
│   │   └── index.ts              # Course registry & helpers
│   │
│   └── storage/
│       └── progress-store.ts     # User progress persistence
│
├── hooks/                        # Custom React hooks
│   ├── useCourse.ts
│   ├── useStats.ts
│   ├── useKeyboardShortcuts.ts
│   └── useStudyTracking.ts
│
└── types/
    └── index.ts                  # TypeScript type definitions
```

---

## Creating a New Course

### Step 1: Create Course Directory

Create a new folder in `src/lib/content/` with your course ID:

```bash
mkdir src/lib/content/my-course
```

### Step 2: Define Course Metadata

Create `src/lib/content/my-course/index.ts`:

```typescript
import type { Course } from '@/types';

export const course: Course = {
  id: 'my-course',                    // Unique identifier
  slug: 'my-course',                  // URL slug
  title: 'My Course Title',
  subtitle: 'A brief subtitle',
  description: 'Detailed course description...',
  category: 'electronics',            // See categories below
  icon: 'Cpu',                        // Lucide icon name
  color: '#10B981',                   // Theme color (hex)
  difficulty: 'intermediate',         // 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: 20,                 // Estimated completion time
  prerequisites: [
    'Basic mathematics',
    'Fundamentals of circuits',
  ],
  learningOutcomes: [
    'Understand core concepts',
    'Apply techniques to real problems',
  ],
  modules: [],                        // Defined in modules.ts
  quickReference: [],                 // Defined in reference.ts
  flashcards: [],                     // Defined in flashcards.ts
};

export { modules } from './modules';
export { quickReference } from './reference';
export { flashcards } from './flashcards';
```

### Step 3: Define Modules and Lessons

Create `src/lib/content/my-course/modules.ts`:

```typescript
import type { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'module-1-intro',
    title: 'Introduction',
    description: 'Getting started with the basics',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'What is This Course About?',
        content: `
# Introduction

Welcome to this course! In this lesson, we'll cover...

## Key Concepts

The fundamental equation is:

$$
E = mc^2
$$

### Subsection

- Point 1
- Point 2
- Point 3

## Examples

// Example will be rendered in a collapsible box

## Summary

You've learned the basics!
        `,
        objectives: [
          'Understand the course scope',
          'Learn basic terminology',
        ],
        keyPoints: [
          'Important concept 1',
          'Important concept 2',
        ],
        readingTime: 10,  // Minutes
        difficulty: 'beginner',
        examples: [
          {
            id: 'example-1',
            title: 'Basic Example',
            problem: 'Calculate X given Y...',
            solution: [
              {
                step: 1,
                description: 'Identify the given values',
                content: 'We have Y = 5...',
              },
              {
                step: 2,
                description: 'Apply the formula',
                content: '$$X = Y^2 = 25$$',
              },
            ],
          },
        ],
        exercises: [
          {
            id: 'ex-1',
            question: 'Practice problem...',
            hint: 'Try using the formula from the example',
            answer: '42',
            explanation: 'The answer is 42 because...',
          },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'What is the correct answer?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: 1,
        explanation: 'Option B is correct because...',
      },
    ],
  },
];
```

### Step 4: Add Quick Reference Items

Create `src/lib/content/my-course/reference.ts`:

```typescript
import type { ReferenceItem } from '@/types';

export const quickReference: ReferenceItem[] = [
  {
    id: 'ref-1',
    title: 'Ohm\'s Law',
    formula: 'V = IR',
    description: 'Voltage equals current times resistance',
    module: 'module-1-intro',  // Optional: link to module
  },
  {
    id: 'ref-2',
    title: 'Power Equation',
    formula: 'P = VI = I^2R = \\frac{V^2}{R}',
    description: 'Electrical power in various forms',
  },
];
```

### Step 5: Create Flashcards

Create `src/lib/content/my-course/flashcards.ts`:

```typescript
import type { Flashcard } from '@/types';

export const flashcards: Flashcard[] = [
  {
    id: 'card-1',
    front: 'What is the formula for voltage?',
    back: '$$V = IR$$\n\nVoltage equals current times resistance.',
    moduleId: 'module-1-intro',
  },
  {
    id: 'card-2',
    front: 'Define resistance',
    back: 'Resistance is the opposition to current flow, measured in Ohms (Ω).',
  },
];
```

### Step 6: Register the Course

Add your course to `src/lib/courses/index.ts`:

```typescript
import { course as myCourse } from '@/lib/content/my-course';

export const courses: Course[] = [
  controlSystemsCourse,
  signalsSystemsCourse,
  myCourse,  // Add your course here
];
```

---

## Course Content Guide

### Categories

Available course categories (defined in `src/types/index.ts`):

| ID | Display Name | Description |
|----|--------------|-------------|
| `control-systems` | Control Systems | Feedback control, stability, PID, root locus |
| `signals-systems` | Signals & Systems | Signal processing, transforms, filtering |
| `electronics` | Electronics | Circuit analysis, analog, digital electronics |
| `power-systems` | Power Systems | Power generation, distribution, machines |
| `mathematics` | Mathematics | Engineering math, transforms, linear algebra |
| `programming` | Programming | DSP, embedded systems, MATLAB, Python |
| `communications` | Communications | Wireless, modulation, information theory |

### Available Icons

Use any icon from [Lucide](https://lucide.dev/icons/). Common choices:

- `BookOpen` - General courses
- `Cpu` - Electronics, hardware
- `Waveform` - Signals, processing
- `Settings` - Control systems
- `Zap` - Power systems
- `Code` - Programming
- `Radio` - Communications
- `Calculator` - Mathematics

### Content Formatting

#### Markdown Support

The content field supports standard Markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet list item
- Another item

1. Numbered list
2. Second item

> Blockquote

`inline code`

```
code block
```

[Link text](url)
```

#### LaTeX/KaTeX Formulas

Use `$$...$$` for block formulas and `$...$` for inline:

```markdown
Block formula:

$$
\frac{d}{dt}x(t) = Ax(t) + Bu(t)
$$

Inline formula: The transfer function $G(s) = \frac{Y(s)}{U(s)}$ relates output to input.
```

#### Examples (Collapsible)

```typescript
examples: [
  {
    id: 'example-id',
    title: 'Example Title',
    problem: 'Problem statement with $x = 5$',
    solution: [
      {
        step: 1,
        description: 'First step description',
        content: 'Detailed solution with $$\\frac{dy}{dx}$$',
      },
      {
        step: 2,
        description: 'Second step',
        content: 'Final answer',
      },
    ],
  },
]
```

### Difficulty Levels

- `beginner` - No prerequisites, introductory content
- `intermediate` - Requires basic understanding
- `advanced` - Requires solid foundation

### Reading Time

Estimate reading time based on:
- ~200-250 words per minute for technical content
- Add extra time for complex formulas
- Consider example interactions

---

## Study Tools

### Personal Notes

Users can take notes on any lesson:
- Press `N` or click notes button
- Auto-save with 2-second debounce
- Access all notes from hub page
- Search, filter, and organize
- Export as Markdown

### Quizzes

Multiple choice quizzes with:
- Instant feedback
- Explanations for each answer
- Score tracking
- Best score saved

### Flashcards

Spaced repetition flashcards:
- Flip animation
- Track cards reviewed
- Module-specific sets

### Quick Reference

Searchable formula sheets:
- Organized by topic
- Search functionality
- LaTeX rendering

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Open global search |
| `?` | Show keyboard shortcuts help |
| `←` / `→` | Previous/Next lesson |
| `Q` | Open quick reference |
| `F` | Open flashcards |
| `N` | Open notes |
| `M` | Toggle lesson completion |
| `B` | Toggle bookmark |
| `Z` | Toggle focus mode |
| `Esc` | Close modal / Go back |

---

## Data Storage

EduHub uses browser localStorage for all user data:

| Key | Description |
|-----|-------------|
| `eduhub-progress` | User progress (completed lessons, quiz scores, notes, bookmarks, streaks) |
| `eduhub-study-tracking` | Detailed study time tracking |
| `eduhub-recently-viewed` | Recently viewed lessons |
| `eduhub-pomodoro-state` | Pomodoro timer state |
| `eduhub-music-state` | Music widget preferences |

### Export/Import

Users can export their progress as JSON and import it on another device via Settings.

---

## Development

### Available Scripts

```bash
# Development server
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Lint code
bun run lint

# Push database schema
bun run db:push
```

### Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State**: Zustand with persist middleware
- **Database**: Prisma ORM (SQLite)
- **Math Rendering**: KaTeX
- **Icons**: Lucide React
- **Search**: Fuse.js

### Adding New UI Components

```bash
# Add shadcn/ui component
bunx shadcn@latest add <component-name>
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run lint` to check code quality
5. Submit a pull request

---

## License

MIT License - Feel free to use for educational purposes.

---

Made with ❤️ for engineering students
