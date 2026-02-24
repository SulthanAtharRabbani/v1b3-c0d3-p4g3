---
title: Laplace Transform
readingTime: 20
difficulty: intermediate
objectives:
  - Define the Laplace transform and understand its purpose
  - Apply Laplace transforms to common functions
  - Use Laplace transform properties and theorems
  - Understand the advantages of Laplace domain analysis
keyPoints:
  - Laplace transform converts differential equations to algebraic equations
  - The transform is defined as L{f(t)} = ∫₀^∞ f(t)e^(-st)dt
  - Key properties include linearity, differentiation, and integration
  - Initial conditions are automatically handled in the transform
---

# Laplace Transform

## Introduction

The **Laplace transform** is one of the most powerful mathematical tools in control engineering. It converts differential equations in the time domain into algebraic equations in the complex frequency domain (s-domain), making them much easier to solve. This transform is named after the French mathematician Pierre-Simon Laplace.

## Why Laplace Transform?

### The Challenge of Differential Equations

Solving differential equations directly can be challenging, especially for:
- Higher-order equations
- Equations with complex inputs
- Systems with multiple inputs and outputs
- Finding particular solutions for various input types

### The Laplace Advantage

The Laplace transform offers several key advantages:

1. **Algebraic manipulation**: Differential equations become algebraic equations
2. **Automatic initial conditions**: ICs are incorporated in the transform
3. **Systematic procedure**: Standard method for all linear ODEs
4. **Transfer functions**: Natural framework for control systems
5. **Frequency domain insight**: Reveals system characteristics

## Definition of the Laplace Transform

### The Transform

The **Laplace transform** of a function $f(t)$ is defined as:

$$\mathcal{L}\{f(t)\} = F(s) = \int_0^\infty f(t)e^{-st} dt$$

Where:
- $f(t)$ = time-domain function (defined for $t \geq 0$)
- $F(s)$ = Laplace transform (function of complex variable $s$)
- $s = \sigma + j\omega$ = complex frequency variable

### The Inverse Transform

The **inverse Laplace transform** recovers $f(t)$ from $F(s)$:

$$f(t) = \mathcal{L}^{-1}\{F(s)\} = \frac{1}{2\pi j} \int_{\sigma-j\infty}^{\sigma+j\infty} F(s)e^{st} ds$$

In practice, we use tables and partial fraction expansion rather than evaluating this integral.

### Existence of Laplace Transform

The Laplace transform exists if:
1. $f(t)$ is piecewise continuous for $t \geq 0$
2. $|f(t)| \leq Me^{\alpha t}$ for some constants $M$ and $\alpha$
3. The integral converges for $s > \alpha$

## Common Laplace Transform Pairs

### Basic Functions

| Time Function $f(t)$ | Laplace Transform $F(s)$ |
|----------------------|--------------------------|
| Unit impulse $\delta(t)$ | 1 |
| Unit step $u(t)$ | $\frac{1}{s}$ |
| Unit ramp $t$ | $\frac{1}{s^2}$ |
| $t^n$ | $\frac{n!}{s^{n+1}}$ |
| $e^{-at}$ | $\frac{1}{s+a}$ |
| $te^{-at}$ | $\frac{1}{(s+a)^2}$ |
| $\sin(\omega t)$ | $\frac{\omega}{s^2+\omega^2}$ |
| $\cos(\omega t)$ | $\frac{s}{s^2+\omega^2}$ |
| $e^{-at}\sin(\omega t)$ | $\frac{\omega}{(s+a)^2+\omega^2}$ |
| $e^{-at}\cos(\omega t)$ | $\frac{s+a}{(s+a)^2+\omega^2}$ |

### Derivation Examples

**Example 1: Unit Step Function**

$$\mathcal{L}\{u(t)\} = \int_0^\infty 1 \cdot e^{-st} dt = \left[-\frac{1}{s}e^{-st}\right]_0^\infty = 0 - \left(-\frac{1}{s}\right) = \frac{1}{s}$$

**Example 2: Exponential Function**

$$\mathcal{L}\{e^{-at}\} = \int_0^\infty e^{-at}e^{-st} dt = \int_0^\infty e^{-(s+a)t} dt$$

$$= \left[-\frac{1}{s+a}e^{-(s+a)t}\right]_0^\infty = 0 - \left(-\frac{1}{s+a}\right) = \frac{1}{s+a}$$

**Example 3: Sine Function**

Using Euler's identity: $\sin(\omega t) = \frac{e^{j\omega t} - e^{-j\omega t}}{2j}$

$$\mathcal{L}\{\sin(\omega t)\} = \frac{1}{2j}\left[\frac{1}{s-j\omega} - \frac{1}{s+j\omega}\right]$$

$$= \frac{1}{2j}\left[\frac{s+j\omega - s + j\omega}{s^2+\omega^2}\right] = \frac{\omega}{s^2+\omega^2}$$

## Properties of Laplace Transform

### 1. Linearity

$$\mathcal{L}\{af(t) + bg(t)\} = aF(s) + bG(s)$$

This property allows us to transform complex functions by breaking them into simpler components.

### 2. Differentiation Theorem

This is perhaps the most important property for solving differential equations.

**First derivative:**
$$\mathcal{L}\left\{\frac{df}{dt}\right\} = sF(s) - f(0)$$

**Second derivative:**
$$\mathcal{L}\left\{\frac{d^2f}{dt^2}\right\} = s^2F(s) - sf(0) - f'(0)$$

**nth derivative:**
$$\mathcal{L}\left\{\frac{d^nf}{dt^n}\right\} = s^nF(s) - s^{n-1}f(0) - s^{n-2}f'(0) - \cdots - f^{(n-1)}(0)$$

### 3. Integration Theorem

$$\mathcal{L}\left\{\int_0^t f(\tau)d\tau\right\} = \frac{F(s)}{s}$$

### 4. Time Shifting (Real Translation)

If $\mathcal{L}\{f(t)\} = F(s)$, then:

$$\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$$

where $u(t-a)$ is the unit step delayed by $a$.

### 5. Frequency Shifting (Complex Translation)

$$\mathcal{L}\{e^{-at}f(t)\} = F(s+a)$$

### 6. Initial Value Theorem

$$f(0^+) = \lim_{s\to\infty} sF(s)$$

This allows finding the initial value without computing the inverse transform.

### 7. Final Value Theorem

$$\lim_{t\to\infty} f(t) = \lim_{s\to 0} sF(s)$$

**Important condition:** All poles of $sF(s)$ must have negative real parts (system must be stable).

### 8. Convolution Theorem

$$\mathcal{L}\{f(t) * g(t)\} = F(s) \cdot G(s)$$

where convolution in time equals multiplication in frequency.

## Solving Differential Equations with Laplace Transform

### Procedure

1. **Transform** the differential equation term by term
2. **Substitute** initial conditions
3. **Solve** for the output variable $Y(s)$
4. **Decompose** using partial fractions
5. **Invert** to find $y(t)$

### Example: First-Order System

Solve the differential equation:
$$\frac{dy}{dt} + 2y = 4u(t), \quad y(0) = 1$$

**Step 1: Apply Laplace transform**

$$\mathcal{L}\left\{\frac{dy}{dt}\right\} + 2\mathcal{L}\{y\} = 4\mathcal{L}\{u(t)\}$$

$$sY(s) - y(0) + 2Y(s) = \frac{4}{s}$$

**Step 2: Substitute initial condition**

$$sY(s) - 1 + 2Y(s) = \frac{4}{s}$$

**Step 3: Solve for Y(s)**

$$(s+2)Y(s) = \frac{4}{s} + 1 = \frac{4+s}{s}$$

$$Y(s) = \frac{s+4}{s(s+2)}$$

**Step 4: Partial fraction expansion**

$$\frac{s+4}{s(s+2)} = \frac{A}{s} + \frac{B}{s+2}$$

$$A = \left.\frac{s+4}{s+2}\right|_{s=0} = \frac{4}{2} = 2$$

$$B = \left.\frac{s+4}{s}\right|_{s=-2} = \frac{2}{-2} = -1$$

$$Y(s) = \frac{2}{s} - \frac{1}{s+2}$$

**Step 5: Inverse transform**

$$y(t) = 2 - e^{-2t}, \quad t \geq 0$$

## The Complex Variable s

The variable $s$ in Laplace transforms is complex:

$$s = \sigma + j\omega$$

where:
- $\sigma$ = real part (related to decay/growth rate)
- $\omega$ = imaginary part (related to oscillation frequency)
- $j = \sqrt{-1}$

The complex s-plane (s-domain) provides a powerful framework for analyzing system behavior, which we will explore in later modules.

## Summary

The Laplace transform converts differential equations to algebraic equations, making them much easier to solve. Key properties include linearity and the differentiation theorem, which allows us to transform derivatives. The transform automatically handles initial conditions. Common transform pairs should be memorized for efficient problem-solving. This mathematical tool forms the foundation for transfer function analysis in control systems.
