---
title: Transform Pair Reference Table
readingTime: 20
difficulty: beginner
objectives:
  - Memorize essential transform pairs
  - Understand patterns in transform relationships
  - Apply transform pairs to practical problems
keyPoints:
  - Basic signals have well-defined transforms
  - Transform pairs reveal signal characteristics
  - ROC must always be specified
---

# Transform Pair Reference Table

## Basic Transform Pairs

### Impulse and Step Functions

| Time Function $x(t)$ | Laplace Transform $X(s)$ | ROC |
|---------------------|--------------------------|-----|
| $\delta(t)$ | $1$ | All $s$ |
| $\delta(t - t_0)$ | $e^{-st_0}$ | All $s$ |
| $u(t)$ | $\frac{1}{s}$ | $\text{Re}\{s\} > 0$ |
| $u(t - t_0)$ | $\frac{e^{-st_0}}{s}$ | $\text{Re}\{s\} > 0$ |

### Power Functions

| Time Function $x(t)$ | Laplace Transform $X(s)$ | ROC |
|---------------------|--------------------------|-----|
| $tu(t)$ | $\frac{1}{s^2}$ | $\text{Re}\{s\} > 0$ |
| $t^2 u(t)$ | $\frac{2}{s^3}$ | $\text{Re}\{s\} > 0$ |
| $t^n u(t)$ | $\frac{n!}{s^{n+1}}$ | $\text{Re}\{s\} > 0$ |

### Exponential Functions

| Time Function $x(t)$ | Laplace Transform $X(s)$ | ROC |
|---------------------|--------------------------|-----|
| $e^{at}u(t)$ | $\frac{1}{s-a}$ | $\text{Re}\{s\} > \text{Re}\{a\}$ |
| $e^{-at}u(t)$ | $\frac{1}{s+a}$ | $\text{Re}\{s\} > -a$ |
| $-e^{at}u(-t)$ | $\frac{1}{s-a}$ | $\text{Re}\{s\} < \text{Re}\{a\}$ |
| $te^{at}u(t)$ | $\frac{1}{(s-a)^2}$ | $\text{Re}\{s\} > \text{Re}\{a\}$ |
| $t^n e^{at}u(t)$ | $\frac{n!}{(s-a)^{n+1}}$ | $\text{Re}\{s\} > \text{Re}\{a\}$ |

### Sinusoidal Functions

| Time Function $x(t)$ | Laplace Transform $X(s)$ | ROC |
|---------------------|--------------------------|-----|
| $\cos(\omega_0 t)u(t)$ | $\frac{s}{s^2+\omega_0^2}$ | $\text{Re}\{s\} > 0$ |
| $\sin(\omega_0 t)u(t)$ | $\frac{\omega_0}{s^2+\omega_0^2}$ | $\text{Re}\{s\} > 0$ |
| $e^{-at}\cos(\omega_0 t)u(t)$ | $\frac{s+a}{(s+a)^2+\omega_0^2}$ | $\text{Re}\{s\} > -a$ |
| $e^{-at}\sin(\omega_0 t)u(t)$ | $\frac{\omega_0}{(s+a)^2+\omega_0^2}$ | $\text{Re}\{s\} > -a$ |
| $t\cos(\omega_0 t)u(t)$ | $\frac{s^2-\omega_0^2}{(s^2+\omega_0^2)^2}$ | $\text{Re}\{s\} > 0$ |
| $t\sin(\omega_0 t)u(t)$ | $\frac{2\omega_0 s}{(s^2+\omega_0^2)^2}$ | $\text{Re}\{s\} > 0$ |

## Hyperbolic Functions

| Time Function $x(t)$ | Laplace Transform $X(s)$ | ROC |
|---------------------|--------------------------|-----|
| $\cosh(at)u(t)$ | $\frac{s}{s^2-a^2}$ | $\text{Re}\{s\} > \|a\|$ |
| $\sinh(at)u(t)$ | $\frac{a}{s^2-a^2}$ | $\text{Re}\{s\} > \|a\|$ |

## Special Functions

| Time Function $x(t)$ | Laplace Transform $X(s)$ | ROC |
|---------------------|--------------------------|-----|
| $e^{-a|t|}$ | $\frac{2a}{a^2-s^2}$ | $-a < \text{Re}\{s\} < a$ |
| $\Pi(t/\tau) = u(t) - u(t-\tau)$ | $\frac{1-e^{-s\tau}}{s}$ | All $s$ (except $\sigma \to -\infty$) |

## Using Transform Pairs Effectively

### Strategy for Finding Transforms

1. **Identify the basic form**: Match the signal to known transform pairs
2. **Apply properties**: Use linearity, shifting, differentiation properties
3. **Determine the ROC**: Consider signal causality and pole locations

### Example 1: Complex Exponential

Find $\mathcal{L}\{e^{-2t}\sin(3t)u(t)\}$.

**Solution:**

This matches the form $e^{-at}\sin(\omega_0 t)u(t)$ with $a = 2$ and $\omega_0 = 3$.

Using the table:

$$X(s) = \frac{3}{(s+2)^2 + 9} = \frac{3}{s^2 + 4s + 13}$$

**ROC:** $\text{Re}\{s\} > -2$

### Example 2: Linear Combination

Find $\mathcal{L}\{(3 + 2t + t^2)u(t)\}$.

**Solution:**

Using linearity:

$$X(s) = 3 \cdot \frac{1}{s} + 2 \cdot \frac{1}{s^2} + \frac{2}{s^3}$$

$$= \frac{3s^2 + 2s + 2}{s^3}$$

**ROC:** $\text{Re}\{s\} > 0$

### Example 3: Shifted Signal

Find $\mathcal{L}\{e^{-3(t-1)}u(t-1)\}$.

**Solution:**

This is a shifted version of $e^{-3t}u(t)$.

$$\mathcal{L}\{e^{-3t}u(t)\} = \frac{1}{s+3}$$

Applying time shifting with $t_0 = 1$:

$$X(s) = e^{-s} \cdot \frac{1}{s+3} = \frac{e^{-s}}{s+3}$$

**ROC:** $\text{Re}\{s\} > -3$

## Summary

This lesson presented comprehensive tables of Laplace Transform pairs. These pairs are fundamental tools for efficient problem solving. Key patterns to remember:

1. **Power terms**: $t^n \to \frac{n!}{s^{n+1}}$
2. **Exponentials**: $e^{at} \to \frac{1}{s-a}$ (with appropriate ROC)
3. **Sinusoids**: Produce quadratic denominators with specific numerator patterns
4. **Damping**: Multiplying by $e^{-at}$ shifts $s$ to $(s+a)$

Regular practice with these transform pairs will build proficiency and intuition for Laplace Transform analysis.
