---
title: LaTeX Equations
readingTime: 8
difficulty: beginner
objectives:
  - Write inline and block equations
  - Use common LaTeX symbols
  - Format complex mathematical expressions
keyPoints:
  - Use $...$ for inline math
  - Use $$...$$ for block equations
  - KaTeX provides fast rendering
---

# LaTeX Equations

EduHub uses **KaTeX** for rendering mathematical equations. This allows you to write beautiful math expressions in your lessons.

## Inline Math

Wrap equations in single dollar signs for inline math:

```
The famous equation $E = mc^2$ changed physics forever.
```

Result: The famous equation $E = mc^2$ changed physics forever.

## Block Equations

Use double dollar signs for centered block equations:

```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

Result:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## Common Symbols

### Greek Letters

| LaTeX | Symbol |
|-------|--------|
| `\alpha` | $\alpha$ |
| `\beta` | $\beta$ |
| `\gamma` | $\gamma$ |
| `\omega` | $\omega$ |
| `\Omega` | $\Omega$ |

### Operators

| LaTeX | Symbol |
|-------|--------|
| `\sum` | $\sum$ |
| `\prod` | $\prod$ |
| `\int` | $\int$ |
| `\frac{a}{b}` | $\frac{a}{b}$ |
| `\sqrt{x}` | $\sqrt{x}$ |

### Relations

| LaTeX | Symbol |
|-------|--------|
| `\leq` | $\leq$ |
| `\geq` | $\geq$ |
| `\neq` | $\neq$ |
| `\approx` | $\approx$ |
| `\infty` | $\infty$ |

## Complex Equations

### Matrices

$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
$$

### Systems of Equations

$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$

### Limits and Derivatives

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\frac{d}{dx}\left(\int_a^x f(t)dt\right) = f(x)
$$

## Example: Quadratic Formula

The quadratic equation $ax^2 + bx + c = 0$ has solutions:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

Where:
- $a$, $b$, $c$ are coefficients
- The discriminant is $b^2 - 4ac$
- If discriminant $> 0$: two real solutions
- If discriminant $= 0$: one repeated solution
- If discriminant $< 0$: complex solutions

## Summary

LaTeX in EduHub allows you to express complex mathematical concepts clearly. Use the Quick Reference section to find common formulas!
