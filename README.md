# EduHub - All-in-One Course Learning Platform

A comprehensive, self-paced learning platform designed for engineering students. EduHub provides an interactive environment for studying with rich content including LaTeX formulas, quizzes, flashcards, achievements, and personal notes.

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
- [Achievement System](#achievement-system)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Data Storage](#data-storage)
- [Development](#development)

---

## Features

### 📚 Course Management
- **File-Based Course System** - Create courses using markdown files, no code required
- **Modular Structure** - Organize content into modules and lessons
- **Rich Content Support** - Markdown with LaTeX/KaTeX for mathematical formulas
- **Reading Time Estimation** - Automatic calculation based on content length
- **Progress Tracking** - Track completed lessons and overall course progress

### 📝 Study Tools
- **Personal Notes** - Take notes on any lesson with auto-save
- **Centralized Notes View** - See all notes across all courses in one place
- **Bookmarks** - Bookmark important lessons for quick access
- **Flashcards** - Spaced repetition flashcard system
- **Quick Reference** - Searchable formula sheets and key concepts (per-course)
- **Quizzes** - Multiple choice quizzes with explanations

### 🏆 Achievements & Motivation
- **Course-Specific Achievements** - Each course defines its own achievements
- **Achievement Types** - Lesson, module, course, quiz, and custom achievements
- **Celebration Animations** - Confetti bursts for milestones
- **Streak Counter** - Daily learning streak with fire animation
- **Certificates** - Download certificates upon course completion

### ⏱️ Productivity
- **Pomodoro Timer** - Built-in focus timer with work/break cycles
- **Focus Mode** - Distraction-free reading mode
- **Study Statistics** - Track daily, weekly, and monthly study time
- **Print-Friendly View** - Optimized for printing lessons

### 🎯 User Experience
- **Dark/Light Theme** - System preference detection with manual toggle
- **Responsive Design** - Works on all devices with adaptive dialogs
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

Open the **Preview Panel** to view the application.

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Hub landing page
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   └── api/                      # API routes
│
├── components/
│   ├── course/                   # Course-related components
│   │   ├── LessonContent.tsx     # Lesson renderer
│   │   ├── NotesModal.tsx        # Personal notes editor
│   │   ├── QuizModal.tsx         # Quiz interface
│   │   ├── FlashcardsModal.tsx   # Flashcard viewer
│   │   ├── QuickReferenceModal.tsx # Formula reference
│   │   ├── CelebrationModal.tsx  # Achievement celebration
│   │   └── CertificateModal.tsx  # Course certificate
│   │
│   ├── hub/                      # Hub page widgets
│   │   ├── NotesWidget.tsx       # Notes overview
│   │   ├── AllNotesModal.tsx     # Centralized notes view
│   │   ├── AchievementsPreview.tsx # Achievement display
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

├── lib/
│   ├── courses/                  # Course loader & parser
│   │   └── index.ts              # File-based course loading
│   │
│   ├── storage/                  # Zustand stores
│   │   └── progress-store.ts     # User progress persistence
│   │
│   └── achievement-checker.ts    # Achievement requirement checker

├── hooks/                        # Custom React hooks
│   ├── useCourse.ts
│   ├── useStats.ts
│   ├── useKeyboardShortcuts.ts
│   └── useStudyTracking.ts
│
└── types/
    └── index.ts                  # TypeScript type definitions

public/
└── courses/                      # File-based courses
    └── example-course/           # Example course template
        ├── course.md             # Course metadata
        ├── achievements.json     # Course achievements
        ├── modules/              # Course modules
        ├── reference/            # Quick reference formulas
        └── flashcards/           # Flashcard decks
```

---

## Creating a New Course

Courses are file-based and require no coding. Just create a folder in `public/courses/`!

### Quick Start

```
public/courses/
└── my-course/                    # Folder name = course slug
    ├── course.md                 # Course metadata (required)
    └── modules/
        └── 01-intro/
            ├── module.md         # Module metadata
            └── 01-lesson.md      # Lesson content
```

### Full Structure

```
public/courses/
└── course-slug/
    ├── course.md                 # Required: Course metadata
    ├── achievements.json         # Optional: Course-specific achievements
    ├── modules/
    │   ├── 01-module-name/      # Number prefix = order
    │   │   ├── module.md        # Module metadata
    │   │   ├── 01-lesson.md     # Lessons as markdown
    │   │   ├── 02-lesson.md
    │   │   └── quiz.json        # Optional: Quiz questions
    │   └── 02-next-module/
    │       └── ...
    ├── reference/
    │   └── formulas.json        # Optional: Quick reference
    └── flashcards/
        └── deck.json            # Optional: Flashcards
```

### Step 1: Create Course Metadata

Create `public/courses/my-course/course.md`:

```markdown
---
id: my-course
title: My Course Title
subtitle: A brief description
icon: BookOpen
color: "#8B5CF6"
difficulty: beginner
category: Mathematics
estimatedHours: 10
prerequisites:
  - Basic algebra
learningOutcomes:
  - Learn something new
  - Apply techniques to problems
---

# Course Description

This appears in the course card on the hub page.
```

**Required Fields:** `title`

**Optional Fields:** `id`, `subtitle`, `icon`, `color`, `difficulty`, `category`, `estimatedHours`, `prerequisites`, `learningOutcomes`

### Step 2: Create Module

Create `public/courses/my-course/modules/01-intro/module.md`:

```markdown
---
title: Introduction
description: Getting started with the basics
---

# Module Introduction

Brief overview of what this module covers.
```

### Step 3: Create Lessons

Create `public/courses/my-course/modules/01-intro/01-welcome.md`:

```markdown
---
title: Welcome to the Course
readingTime: 10
difficulty: beginner
objectives:
  - Understand the course scope
  - Learn basic terminology
keyPoints:
  - Important concept 1
  - Important concept 2
---

# Welcome

This lesson covers the basics...

## Key Concepts

The fundamental equation is:

$$E = mc^2$$

### Subsection

- Point 1
- Point 2

## Summary

You've learned the basics!
```

### Step 4: Add Quiz (Optional)

Create `public/courses/my-course/modules/01-intro/quiz.json`:

```json
[
  {
    "id": "q1",
    "question": "What is the correct answer?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 1,
    "explanation": "Option B is correct because..."
  }
]
```

### Step 5: Add Achievements (Optional)

Create `public/courses/my-course/achievements.json`:

```json
[
  {
    "id": "first-steps",
    "title": "First Steps",
    "description": "Complete your first lesson",
    "icon": "Footprints",
    "type": "lesson",
    "requirement": "complete-first"
  },
  {
    "id": "quiz-master",
    "title": "Quiz Master",
    "description": "Get 100% on any quiz",
    "icon": "Target",
    "type": "quiz",
    "requirement": "score-100"
  }
]
```

### Step 6: Add Quick Reference (Optional)

Create `public/courses/my-course/reference/formulas.json`:

```json
[
  {
    "id": "ref-1",
    "title": "Ohm's Law",
    "formula": "V = IR",
    "description": "Voltage equals current times resistance"
  }
]
```

### Step 7: Add Flashcards (Optional)

Create `public/courses/my-course/flashcards/deck.json`:

```json
[
  {
    "id": "card-1",
    "front": "What is the formula for voltage?",
    "back": "$$V = IR$$\n\nVoltage equals current times resistance."
  }
]
```

---

## Course Content Guide

### Available Icons

Use any icon from [Lucide](https://lucide.dev/icons/). Common choices:

- `BookOpen` - General courses
- `Cpu` - Electronics, hardware
- `Waveform` - Signals, processing
- `Settings` - Control systems
- `Zap` - Power systems
- `Code` - Programming
- `GraduationCap` - Graduation/achievement
- `Footprints` - First steps
- `Target` - Goals/targets
- `Trophy` - Achievements

### Content Formatting

#### Markdown Support

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

### Difficulty Levels

- `beginner` - No prerequisites, introductory content
- `intermediate` - Requires basic understanding
- `advanced` - Requires solid foundation

### Ordering

Files and folders are automatically sorted by numeric prefix:
- `01-introduction` comes before `02-advanced`
- `01-welcome.md` comes before `02-basics.md`

---

## Study Tools

### Personal Notes

Users can take notes on any lesson:
- Press `N` or click notes button
- Auto-save with 2-second debounce
- Access all notes from hub page (centralized view)
- Search, filter, and organize across all courses
- Export as Markdown

### Quizzes

Multiple choice quizzes with:
- Instant feedback
- Explanations for each answer
- Score tracking
- Best score saved
- Confetti celebration for perfect scores

### Flashcards

Spaced repetition flashcards:
- Flip animation
- Track cards reviewed
- Module-specific sets

### Quick Reference

Searchable formula sheets:
- Organized per-course
- Search functionality
- LaTeX rendering

---

## Achievement System

Each course can define its own achievements in `achievements.json`.

### Achievement Types

| Type | Description |
|------|-------------|
| `lesson` | Lesson completion achievements |
| `module` | Module completion achievements |
| `course` | Course completion achievements |
| `quiz` | Quiz score achievements |
| `custom` | Custom achievements |

### Requirement Values

| Requirement | Description |
|-------------|-------------|
| `complete-first` | Complete first item (lesson/module) |
| `complete-50` | Complete 50% of items |
| `complete-all` | Complete all items |
| `score-100` | Score 100% on quiz |
| `review-all-flashcards` | Review all flashcards |
| `first-note` | Create first note |

### Achievement Example

```json
{
  "id": "course-complete",
  "title": "Course Graduate",
  "description": "Complete all lessons in this course",
  "icon": "GraduationCap",
  "type": "course",
  "requirement": "complete-all"
}
```

### How Achievements Work

1. Achievements are **per-course** - each course defines its own
2. Progress is tracked automatically via the progress store
3. When requirements are met, the achievement unlocks
4. A celebration animation plays when unlocked
5. All achievements (locked/unlocked) are visible in the hub for motivation

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
| `eduhub-progress` | User progress (completed lessons, quiz scores, notes, bookmarks, achievements, streaks) |
| `eduhub-study-tracking` | Detailed study time tracking |
| `eduhub-recently-viewed` | Recently viewed lessons |
| `eduhub-pomodoro-state` | Pomodoro timer state |

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
- **Celebrations**: canvas-confetti

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
