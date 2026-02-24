---
title: Nyquist Stability Criterion
readingTime: 20
difficulty: intermediate
objectives:
  - Understand the Nyquist plot and its construction
  - Apply the Nyquist stability criterion
  - Relate open-loop and closed-loop stability
  - Use Nyquist plots for stability analysis
keyPoints:
  - Nyquist plot maps G(jω) for ω from -∞ to +∞
  - Z = N + P relates closed-loop poles to encirclements
  - N = number of clockwise encirclements of -1
  - P = number of open-loop RHP poles
---

# Nyquist Stability Criterion

## Introduction

The **Nyquist stability criterion** provides a powerful method for determining closed-loop stability from the open-loop frequency response. Unlike Routh's criterion, it works with time-delay systems and provides stability margins.

## The Nyquist Plot

### Definition

A **Nyquist plot** is a polar plot of $G(j\omega)H(j\omega)$ as ω varies from $-\infty$ to $+\infty$.

- **Real part:** Re[G(jω)] plotted on horizontal axis
- **Imaginary part:** Im[G(jω)] plotted on vertical axis

### Symmetry

Since $G(-j\omega) = G^*(j\omega)$ (complex conjugate):

- The plot for ω < 0 is the mirror image of the plot for ω > 0
- The plot is symmetric about the real axis

### Key Frequencies

**At ω = 0:**
- Low-frequency starting point
- For Type 0 system: finite point on positive real axis
- For Type 1+ system: approaches infinity along -90° direction

**At ω = ∞:**
- High-frequency ending point
- Typically approaches origin

## The Nyquist Criterion

### Principle of the Argument

A fundamental result from complex analysis:

If a contour encircles Z zeros and P poles of a function F(s), the mapping of that contour through F(s) encircles the origin N = Z - P times in the same direction.

### Application to Control Systems

For the closed-loop system with characteristic equation $1 + G(s)H(s) = 0$:

$$Z = N + P$$

Where:
- **Z** = Number of closed-loop poles in RHP (zeros of 1+GH)
- **N** = Number of clockwise encirclements of -1 by the Nyquist plot
- **P** = Number of open-loop poles in RHP

**For stability:** Z must equal 0.

### Stability Criterion

The closed-loop system is **stable** if and only if:

$$N = -P$$

That is, the number of counterclockwise encirclements of -1 equals the number of open-loop RHP poles.

## Procedure for Applying Nyquist Criterion

### Step 1: Determine P

Count the number of open-loop poles in the right half-plane (RHP).

### Step 2: Draw the Nyquist Plot

1. Plot $G(j\omega)H(j\omega)$ for ω = 0 to ∞
2. Mirror for negative frequencies
3. Complete any necessary detours around poles on jω-axis

### Step 3: Count Encirclements

Count the net clockwise encirclements of the point -1.

### Step 4: Apply the Criterion

Calculate Z = N + P
- If Z = 0: Stable
- If Z > 0: Unstable (Z unstable closed-loop poles)

## Example 1: Stable Open-Loop System

**Problem:** Apply Nyquist criterion for:

$$G(s)H(s) = \frac{K}{s(s+1)(s+2)}$$

**Solution:**

**Step 1: P = 0** (no open-loop RHP poles)

**Step 2: Nyquist path**

- The pole at s = 0 requires a small semicircular detour
- For ω: 0+ → ∞, plot the frequency response
- Mirror for negative frequencies
- Complete with small semicircle around origin

**Key points:**
- At ω = 0+: magnitude → ∞, phase = -90°
- As ω → ∞: magnitude → 0, phase → -270°

**Step 3: Encirclements**

The Nyquist plot passes through the left half of the complex plane. For small K, it doesn't encircle -1. For large K, it may encircle -1 clockwise.

Let's find when it passes through -1:

At the phase crossover frequency where $\angle G(j\omega) = -180°$:

$$-\frac{\pi}{2} - \arctan(\omega) - \arctan(\omega/2) = -\pi$$

$$\arctan(\omega) + \arctan(\omega/2) = \frac{\pi}{2}$$

This gives $\omega = \sqrt{2}$ rad/s.

At this frequency:
$$|G(j\sqrt{2})| = \frac{K}{\sqrt{2} \cdot \sqrt{3} \cdot \sqrt{6}} = \frac{K}{6}$$

**Critical gain:** When $|G| = 1$:
$$K_c = 6$$

**For K < 6:** No encirclements (N = 0), Z = 0 → Stable
**For K > 6:** Two clockwise encirclements (N = 2), Z = 2 → Unstable

## Example 2: Unstable Open-Loop System

**Problem:** Apply Nyquist criterion for:

$$G(s)H(s) = \frac{K}{(s-1)(s+2)}$$

**Solution:**

**Step 1: P = 1** (one pole at s = 1 in RHP)

**Step 2: For stability, need N = -1** (one counterclockwise encirclement)

**Step 3: Nyquist plot analysis**

- At ω = 0: G(0) = K/(-1)(2) = -K/2
- At ω = ∞: G(j∞) = 0 (origin)

The plot starts on negative real axis at -K/2.

For stability: The plot must encircle -1 counterclockwise.

This requires $-K/2 < -1$, i.e., $K > 2$.

**Stability range: K > 2**

This shows that a system with an unstable open-loop can become stable in closed-loop!

## Summary

The Nyquist criterion determines closed-loop stability from open-loop frequency response:

$$Z = N + P$$

Where:
- Z = unstable closed-loop poles (need Z = 0 for stability)
- N = clockwise encirclements of -1
- P = unstable open-loop poles

The method works for systems with time delays and provides stability margins for robust design.
