---
title: Markdown Basics
readingTime: 10
difficulty: beginner
objectives:
  - Write formatted text using markdown
  - Create headings, lists, and links
  - Add code blocks with syntax highlighting
keyPoints:
  - Markdown is a lightweight markup language
  - Use # for headings, * for emphasis
  - Code blocks use triple backticks
---

# Markdown Basics

Markdown is a simple way to format text that converts to HTML. It's perfect for writing course content!

## Headings

Use `#` symbols to create headings:

```markdown
# Heading 1
## Heading 2
### Heading 3
```

## Text Formatting

| Syntax | Result |
|--------|--------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `` `code` `` | `code` |

## Lists

### Unordered Lists
- Item one
- Item two
  - Nested item
- Item three

### Ordered Lists
1. First step
2. Second step
3. Third step

## Code Blocks

Use triple backticks with a language identifier:

```python
def hello_world():
    print("Hello, EduHub!")
    return True
```

```javascript
const greeting = (name) => {
  return `Welcome, ${name}!`;
};
```

## Links and Images

- [Link text](https://example.com)
- ![Alt text](/path/to/image.png)

## Blockquotes

> "Education is the most powerful weapon which you can use to change the world."
> — Nelson Mandela

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ | Full support |
| LaTeX | ✅ | KaTeX rendering |
| Code | ✅ | Syntax highlighting |

## Summary

Markdown makes it easy to write formatted content without HTML knowledge. Combine it with LaTeX for powerful educational content!
