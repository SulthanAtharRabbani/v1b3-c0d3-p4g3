---
title: Root Locus Concepts
readingTime: 18
difficulty: intermediate
objectives:
  - Define root locus and understand its purpose
  - Derive the angle and magnitude conditions
  - Understand the relationship between open-loop and closed-loop poles
  - Recognize how gain affects pole locations
keyPoints:
  - Root locus shows closed-loop pole movement as gain varies
  - Angle condition: ∠G(s)H(s) = ±180°(2k+1)
  - Magnitude condition: |KG(s)H(s)| = 1
  - Locus starts at open-loop poles (K=0) and ends at open-loop zeros (K=∞)
---

# Root Locus Concepts

## Introduction

The **root locus** is a graphical representation showing how the closed-loop poles of a feedback system move in the complex s-plane as a parameter (typically the gain K) varies from zero to infinity. This powerful method, developed by W.R. Evans in 1948, provides intuitive insight into system stability and performance.

## The Basic Problem

### Closed-Loop Transfer Function

Consider a unity feedback system with open-loop transfer function:

$$G(s) = \frac{KN(s)}{D(s)}$$

Where:
- $K$ = variable gain
- $N(s)$ = numerator polynomial (zeros)
- $D(s)$ = denominator polynomial (poles)

The closed-loop transfer function is:

$$T(s) = \frac{G(s)}{1 + G(s)} = \frac{KN(s)}{D(s) + KN(s)}$$

### Characteristic Equation

The closed-loop poles satisfy the characteristic equation:

$$1 + G(s) = 0$$

or equivalently:

$$D(s) + KN(s) = 0$$

**Key insight:** The roots of this equation depend on K. As K varies from 0 to ∞, the closed-loop poles trace paths in the s-plane called the **root locus**.

## Angle and Magnitude Conditions

### Derivation

From the characteristic equation:

$$1 + G(s)H(s) = 0$$

$$G(s)H(s) = -1$$

For a system with gain K:

$$KG(s)H(s) = -1$$

### Magnitude Condition

Taking the magnitude of both sides:

$$|KG(s)H(s)| = |-1| = 1$$

$$|K| \cdot |G(s)H(s)| = 1$$

$$K = \frac{1}{|G(s)H(s)|}$$

**This gives the gain K for any point s on the root locus.**

### Angle Condition

Taking the angle (phase) of both sides:

$$\angle KG(s)H(s) = \angle(-1) = \pm 180°, \pm 540°, \ldots$$

$$\angle G(s)H(s) = \pm 180°(2k + 1), \quad k = 0, 1, 2, \ldots$$

**This determines which points s are on the root locus.**

### Summary

| Condition | Formula | Purpose |
|-----------|---------|---------|
| Angle | $\angle G(s)H(s) = \pm 180°(2k+1)$ | Determines if point is on locus |
| Magnitude | $K = 1/|G(s)H(s)|$ | Determines gain at that point |

## Pole-Zero Geometry

### Vector Representation

For a transfer function in factored form:

$$G(s)H(s) = \frac{(s-z_1)(s-z_2)\cdots(s-z_m)}{(s-p_1)(s-p_2)\cdots(s-p_n)}$$

At any point $s$ in the complex plane:

- Each factor $(s - z_i)$ is a vector from zero $z_i$ to point $s$
- Each factor $(s - p_i)$ is a vector from pole $p_i$ to point $s$

### Angle Calculation

$$\angle G(s)H(s) = \sum_{i=1}^{m} \angle(s-z_i) - \sum_{i=1}^{n} \angle(s-p_i)$$

$$= \sum \text{angles from zeros} - \sum \text{angles from poles}$$

### Magnitude Calculation

$$|G(s)H(s)| = \frac{|s-z_1| \cdot |s-z_2| \cdots |s-z_m|}{|s-p_1| \cdot |s-p_2| \cdots |s-p_n|}$$

$$= \frac{\text{product of distances to zeros}}{\text{product of distances to poles}}$$

## Starting and Ending Points

### When K = 0

From the characteristic equation $D(s) + KN(s) = 0$:

When $K = 0$: $D(s) = 0$

**The root locus starts at the open-loop poles.**

### When K → ∞

Rearranging: $1 + K\frac{N(s)}{D(s)} = 0$

As $K \to \infty$: $N(s) = 0$

**The root locus ends at the open-loop zeros.**

### For m < n

When there are more poles than zeros, $(n-m)$ branches go to infinity along asymptotes.

## Example: Simple Second-Order System

### Problem

Sketch the root locus for:

$$G(s) = \frac{K}{s(s+2)}$$

### Solution

**Open-loop poles:** $s = 0, s = -2$

**Open-loop zeros:** None (m = 0, n = 2)

**Starting points:** s = 0 and s = -2 (at K = 0)

**Ending points:** Both branches go to infinity (no finite zeros)

**Angle condition:**

$$\angle G(s) = -\angle s - \angle(s+2) = -180°$$

$$\angle s + \angle(s+2) = 180°$$

**On the real axis:**

- For $s < -2$: Both angles = 180°, sum = 360° ≠ 180° → Not on locus
- For $-2 < s < 0$: Angle from 0 = 180°, angle from -2 = 0°, sum = 180° → **On locus**
- For $s > 0$: Both angles = 0°, sum = 0° ≠ 180° → Not on locus

**Breakaway point:** Between s = 0 and s = -2

Find where poles "break away" from real axis:

$$\frac{dK}{ds} = 0$$

From $K = -s(s+2) = -s^2 - 2s$:

$$\frac{dK}{ds} = -2s - 2 = 0$$

$$s = -1$$

**Root locus:**
- Two branches start at s = 0 and s = -2
- They meet at s = -1 (breakaway point)
- They depart vertically (asymptotes at ±90°)
- System is stable for all K > 0

## Significance of Root Locus

### Stability Analysis

- If any branch crosses into RHP → System becomes unstable
- The crossing point gives critical gain $K_c$

### Performance Analysis

- Pole locations determine transient response
- Near origin → Slow response
- Far left → Fast response
- Complex → Oscillatory behavior

### Design Tool

- Add poles/zeros to reshape the locus
- Choose K to achieve desired pole locations
- Design compensators to meet specifications

## Summary

The root locus shows how closed-loop poles move as gain K varies from 0 to ∞. The angle condition determines which points are on the locus, while the magnitude condition gives the corresponding gain. The locus starts at open-loop poles and ends at open-loop zeros (or infinity). This graphical method provides intuitive understanding of stability and performance as parameters change.
