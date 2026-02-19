# Courses Folder

Create courses using markdown files. Drop a folder here and EduHub loads it automatically.

## Quick Start

```
public/courses/
└── my-course/                    # Folder name = course slug
    ├── course.md                 # Course metadata (required)
    └── modules/
        └── 01-intro/
            ├── module.md         # Module metadata
            └── 01-lesson.md      # Lesson content
```

## File Structure

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

## course.md (Required)

```markdown
---
id: my-course
title: My Course Title
subtitle: Brief description
icon: BookOpen
color: "#8B5CF6"
difficulty: beginner
category: Mathematics
estimatedHours: 10
prerequisites:
  - Basic algebra
learningOutcomes:
  - Learn something new
---

# Course Description

This appears in the course card...
```

**Required:** `title`

**Optional:** `id`, `subtitle`, `icon`, `color`, `difficulty`, `category`, `estimatedHours`, `prerequisites`, `learningOutcomes`

**Note:** `category` is now free-form text (e.g., "Mathematics", "Programming", "Engineering")

## achievements.json (Optional)

Define course-specific achievements:

```json
[
  {
    "id": "first-lesson",
    "title": "First Steps",
    "description": "Complete your first lesson",
    "icon": "Footprints",
    "type": "lesson",
    "requirement": "complete-first"
  },
  {
    "id": "course-complete",
    "title": "Graduate",
    "description": "Complete the entire course",
    "icon": "GraduationCap",
    "type": "course",
    "requirement": "complete-all"
  },
  {
    "id": "quiz-perfect",
    "title": "Perfect Score",
    "description": "Get 100% on any quiz",
    "icon": "Target",
    "type": "quiz",
    "requirement": "score-100"
  }
]
```

**Achievement Types:**
- `lesson` - Lesson completion achievements
- `module` - Module completion achievements
- `course` - Course completion achievements
- `quiz` - Quiz score achievements
- `custom` - Custom achievements

**Requirement Values:**
- `complete-first` - Complete first item
- `complete-all` - Complete all items
- `score-100` - Score 100%

## Lessons (Markdown)

```markdown
---
title: Lesson Title
readingTime: 10
difficulty: beginner
objectives:
  - Objective 1
  - Objective 2
keyPoints:
  - Key point 1
  - Key point 2
---

# Lesson Title

Content with **markdown** and $math$!

$$E = mc^2$$
```

## quiz.json

```json
[
  {
    "id": "quiz-1",
    "question": "Question text?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "Why this is correct..."
  }
]
```

## formulas.json (Quick Reference)

```json
[
  {
    "id": "ref-1",
    "title": "Formula Name",
    "formula": "E = mc^2",
    "description": "What it means"
  }
]
```

## deck.json (Flashcards)

```json
[
  {
    "id": "flash-1",
    "front": "Question?",
    "back": "Answer"
  }
]
```

## Icons

Lucide icon names (PascalCase): `BookOpen`, `Settings`, `Cpu`, `Zap`, `Code`, `GraduationCap`, `FlaskConical`, `Calculator`, `Circuit`, `Footprints`, `Award`, `Target`, `Star`, `Trophy`, `Flame`

## Ordering

Files and folders are automatically sorted by numeric prefix:
- `01-introduction` comes before `02-advanced`
- `01-welcome.md` comes before `02-basics.md`
- Files without prefix are sorted alphabetically

## Example

See the `example-course` folder for a complete demonstration with all features.
