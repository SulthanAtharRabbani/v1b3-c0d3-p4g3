---
title: Stability Concepts
readingTime: 18
difficulty: intermediate
objectives:
  - Define stability for control systems
  - Distinguish between different types of stability
  - Relate pole locations to stability
  - Understand the significance of stability in design
keyPoints:
  - A stable system returns to equilibrium after disturbances
  - BIBO stability requires all poles in the left half-plane
  - Marginal stability occurs with poles on the imaginary axis
  - Instability results from any pole in the right half-plane
---

# Stability Concepts

## Introduction

**Stability** is the most critical property of a control system. An unstable system cannot perform its intended function and may cause damage or danger. Understanding stability is essential before any controller design work begins.

## Definition of Stability

### Intuitive Understanding

A system is **stable** if it returns to its equilibrium state after being disturbed. Think of a ball in a bowl - if you push it, it eventually settles back at the bottom. This is stable behavior.

Conversely, a ball balanced on top of a hill is **unstable** - any small disturbance causes it to roll away, never returning to its original position.

### Mathematical Definitions

#### BIBO Stability (Bounded-Input Bounded-Output)

A system is **BIBO stable** if every bounded input produces a bounded output.

$$|u(t)| \leq M_1 < \infty \Rightarrow |y(t)| \leq M_2 < \infty$$

**For LTI systems:** BIBO stability is equivalent to all poles having negative real parts.

#### Asymptotic Stability

A system is **asymptotically stable** if, for zero input, the state returns to the equilibrium point as time approaches infinity.

$$\lim_{t \to \infty} \mathbf{x}(t) = \mathbf{0}$$

#### Marginal Stability

A system is **marginally stable** (or critically stable) if it is not asymptotically stable but the state remains bounded for bounded initial conditions.

### Stability Classification

| Type | Definition | Pole Location |
|------|------------|---------------|
| Asymptotically Stable | Returns to equilibrium | All poles in LHP |
| Marginally Stable | Bounded but doesn't return to equilibrium | Simple poles on jω-axis, rest in LHP |
| Unstable | Output grows without bound | Any pole in RHP, or repeated poles on jω-axis |

## Pole Locations and Stability

### The Complex s-Plane

The complex s-plane is divided by the imaginary axis:

```
            jω
             ↑
             |    ×  Unstable
        ×    |    (RHP)
     (LHP)   |
Stable  ×    |    ×
             |
    ---------+--------→ σ
             |  Origin
             |    ×  Unstable
        ×    |
     Stable  |
             |
```

### Left Half-Plane (LHP) Poles

Poles with negative real parts ($s = -\sigma + j\omega$ where $\sigma > 0$):

$$\text{Response: } e^{-\sigma t}\cos(\omega t + \phi)$$

- Exponential decay envelope
- Response approaches zero as $t \to \infty$
- **Stable behavior**

### Right Half-Plane (RHP) Poles

Poles with positive real parts ($s = +\sigma + j\omega$ where $\sigma > 0$):

$$\text{Response: } e^{+\sigma t}\cos(\omega t + \phi)$$

- Exponential growth envelope
- Response grows without bound
- **Unstable behavior**

### Poles on the Imaginary Axis

Poles on the jω-axis ($s = \pm j\omega$):

$$\text{Response: } \cos(\omega t + \phi)$$

- Sustained oscillation
- Neither grows nor decays
- **Marginally stable** (if simple poles)

### Repeated Poles on Imaginary Axis

Repeated poles at $s = \pm j\omega$ (multiplicity > 1):

$$\text{Response: } t^n e^{0t}\cos(\omega t) = t^n\cos(\omega t)$$

- Amplitude grows as $t^n$
- **Unstable behavior**

## Stability from Transfer Function

### For Closed-Loop Transfer Function

$$T(s) = \frac{N(s)}{D(s)}$$

The characteristic equation is:

$$D(s) = a_0 s^n + a_1 s^{n-1} + \cdots + a_n = 0$$

**Necessary condition for stability:** All coefficients must be positive (and non-zero).

$$a_0 > 0, a_1 > 0, \ldots, a_n > 0$$

This is necessary but not sufficient (except for first and second-order systems).

### Examples

**Example 1: Stable System**

$$T(s) = \frac{10}{s^2 + 3s + 2}$$

Characteristic equation: $s^2 + 3s + 2 = 0$

Poles: $s = -1, -2$ (both in LHP)

**Verdict: Stable**

**Example 2: Unstable System**

$$T(s) = \frac{5}{s^2 - 3s + 2}$$

Characteristic equation: $s^2 - 3s + 2 = 0$

Poles: $s = 1, 2$ (both in RHP)

Note: Coefficient of $s$ is negative!

**Verdict: Unstable**

**Example 3: Marginally Stable System**

$$T(s) = \frac{s + 1}{s(s^2 + 4)}$$

Characteristic equation: $s(s^2 + 4) = 0$

Poles: $s = 0, \pm j2$ (simple poles on imaginary axis)

**Verdict: Marginally Stable**

**Example 4: Unstable (Repeated Imaginary Poles)**

$$T(s) = \frac{1}{s^2(s + 1)}$$

Poles: $s = 0, 0, -1$ (double pole at origin)

**Verdict: Unstable**

## Stability from State-Space

### Eigenvalue Criterion

For the state-space system $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$, the system is stable if and only if all eigenvalues of $\mathbf{A}$ have negative real parts.

$$\text{Re}(\lambda_i) < 0 \text{ for all } i$$

The eigenvalues of $\mathbf{A}$ are the poles of the system.

### Lyapunov Stability

For a nonlinear system $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$, stability can be analyzed using **Lyapunov's methods**:

**Lyapunov's Direct Method:** If there exists a positive definite function $V(\mathbf{x})$ such that $\dot{V}(\mathbf{x})$ is negative definite, the system is asymptotically stable.

## Importance of Stability

### Why Stability is Critical

1. **Safety**: Unstable systems can cause physical damage
2. **Performance**: An unstable system cannot meet any performance requirements
3. **Design Foundation**: All design methods assume stability
4. **Robustness**: Systems must remain stable despite uncertainties

### Stability in Design

Stability is the first requirement in any control system design:

1. **Ensure stability** first
2. **Meet performance** specifications (overshoot, settling time)
3. **Ensure robustness** to uncertainties

## Summary

Stability is the most fundamental requirement for control systems. A system is stable if its natural response decays to zero, which occurs when all poles have negative real parts. Poles in the right half-plane indicate instability, while simple poles on the imaginary axis indicate marginal stability. For linear systems, stability can be determined from pole locations or by analyzing the characteristic equation.
