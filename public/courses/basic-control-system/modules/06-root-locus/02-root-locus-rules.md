---
title: Root Locus Construction Rules
readingTime: 22
difficulty: intermediate
objectives:
  - Learn the rules for sketching root locus
  - Calculate asymptote angles and centroid
  - Find breakaway and break-in points
  - Determine departure and arrival angles
keyPoints:
  - 11 rules guide root locus construction
  - Locus exists on real axis to the left of odd-numbered poles/zeros
  - Asymptote angles = ±180°(2k+1)/(n-m)
  - Centroid = (Σpoles - Σzeros)/(n-m)
---

# Root Locus Construction Rules

## Introduction

While computers can plot root loci precisely, understanding the construction rules enables quick sketching and provides insight into system behavior. These eleven rules allow you to sketch accurate root loci by hand.

## The Eleven Rules

### Rule 1: Number of Branches

The root locus has **n branches**, where n is the number of open-loop poles.

$$\text{Number of branches} = n$$

Each branch represents the path of one closed-loop pole as K varies.

### Rule 2: Symmetry

The root locus is **symmetric about the real axis**.

Since complex poles occur in conjugate pairs for real systems, the locus must be symmetric about the real axis.

### Rule 3: Starting and Ending Points

- **Starts**: At open-loop poles (K = 0)
- **Ends**: At open-loop zeros (K = ∞)

If n > m, (n-m) branches go to infinity along asymptotes.

### Rule 4: Real Axis Segments

The root locus exists on the real axis **to the left of an odd number of poles and zeros**.

**Procedure:**
1. Mark all poles (×) and zeros (○) on the real axis
2. For any test point on the real axis, count poles and zeros to the right
3. If count is odd, that segment is on the root locus

**Example:**

```
Real axis: ----×----×-----○-----×----
                |     |           |
           ON   | OFF |     ON    |
```

### Rule 5: Asymptotes

As K → ∞, (n-m) branches approach asymptotes.

**Asymptote angles:**

$$\phi_A = \frac{\pm 180°(2k + 1)}{n - m}, \quad k = 0, 1, 2, \ldots$$

**For n - m = 1:** φ = ±180°
**For n - m = 2:** φ = ±90°
**For n - m = 3:** φ = ±60°, ±180°
**For n - m = 4:** φ = ±45°, ±135°

### Rule 6: Centroid

All asymptotes intersect at a common point on the real axis called the **centroid**:

$$\sigma_A = \frac{\sum \text{poles} - \sum \text{zeros}}{n - m}$$

$$\sigma_A = \frac{\sum_{i=1}^{n} p_i - \sum_{i=1}^{m} z_i}{n - m}$$

### Rule 7: Breakaway and Break-in Points

**Breakaway points:** Where two branches leave the real axis
**Break-in points:** Where two branches arrive at the real axis

These occur where the gain K is at a maximum or minimum on the real axis.

**Method 1: Differentiation**

From $K = -\frac{D(s)}{N(s)}$:

$$\frac{dK}{ds} = 0$$

Solve for s, then verify the point is on the root locus.

**Method 2: Characteristic Equation**

$$D(s) + KN(s) = 0$$

Differentiate with respect to s and set dK/ds = 0.

### Rule 8: Departure Angles

The **departure angle** is the angle at which a branch leaves a complex pole.

$$\phi_{dep} = 180° - \sum_{other\ poles} \angle(pole) + \sum_{zeros} \angle(zero)$$

**Procedure:**
1. Consider a test point very close to the complex pole
2. Calculate angles from all other poles to this point
3. Calculate angles from all zeros to this point
4. Apply the angle condition

### Rule 9: Arrival Angles

The **arrival angle** is the angle at which a branch arrives at a complex zero.

$$\phi_{arr} = 180° - \sum_{zeros} \angle(zero) + \sum_{poles} \angle(pole)$$

### Rule 10: Imaginary Axis Crossings

Find where the root locus crosses the imaginary axis.

**Methods:**
1. Routh-Hurwitz criterion (find K for marginal stability)
2. Substitute s = jω into characteristic equation
3. Separate real and imaginary parts
4. Solve for ω and K

### Rule 11: Gain at Any Point

At any point s on the root locus, the gain K is:

$$K = \frac{\prod_{i=1}^{n} |s - p_i|}{\prod_{i=1}^{m} |s - z_i|} = \frac{\text{product of distances to poles}}{\text{product of distances to zeros}}$$

## Example: Third-Order System

### Problem

Sketch the root locus for:

$$G(s)H(s) = \frac{K}{s(s+1)(s+2)}$$

### Solution

**Step 1: Identify poles and zeros**

Poles: s = 0, -1, -2 (n = 3)
Zeros: none (m = 0)

**Step 2: Real axis segments**

- s < -2: 3 poles to the right (odd) → On locus
- -2 < s < -1: 2 poles to the right (even) → Not on locus
- -1 < s < 0: 1 pole to the right (odd) → On locus
- s > 0: 0 poles to the right (even) → Not on locus

**Step 3: Asymptotes**

Number: n - m = 3

Angles:
$$\phi_A = \frac{±180°(2k+1)}{3} = ±60°, ±180°$$

Centroid:
$$\sigma_A = \frac{0 + (-1) + (-2) - 0}{3} = \frac{-3}{3} = -1$$

**Step 4: Breakaway points**

$$K = -s(s+1)(s+2) = -(s^3 + 3s^2 + 2s)$$

$$\frac{dK}{ds} = -(3s^2 + 6s + 2) = 0$$

$$s^2 + 2s + \frac{2}{3} = 0$$

$$s = \frac{-2 ± \sqrt{4 - 8/3}}{2} = \frac{-2 ± \sqrt{4/3}}{2} = -1 ± \frac{1}{\sqrt{3}}$$

$$s = -0.423, -1.577$$

Only s = -0.423 is on the real-axis segment of the locus.

**Step 5: Imaginary axis crossing**

Characteristic equation: $s^3 + 3s^2 + 2s + K = 0$

Routh array:
| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^3$ | 1 | 2 |
| $s^2$ | 3 | K |
| $s^1$ | $\frac{6-K}{3}$ | 0 |
| $s^0$ | K | |

At crossing: $\frac{6-K}{3} = 0 \Rightarrow K = 6$

Substituting back: $s^3 + 3s^2 + 2s + 6 = 0$

$(s^2 + 2)(s + 3) = 0$ does not check.

Let's use $s = jω$:

$-jω^3 - 3ω^2 + 2jω + K = 0$

Real: $-3ω^2 + K = 0$
Imaginary: $-ω^3 + 2ω = 0 \Rightarrow ω = 0, ±√2$

At $ω = √2$: $K = 3(2) = 6$

**Summary:**
- Three branches starting at 0, -1, -2
- One branch on real axis from -2 goes left to -∞
- Two branches meet at s ≈ -0.42 (breakaway)
- These branches cross imaginary axis at s = ±j√2 when K = 6
- System stable for 0 < K < 6

## Summary

The eleven rules provide a systematic method for sketching root loci:
1. Number of branches equals number of poles
2. Symmetric about real axis
3. Starts at poles, ends at zeros (or infinity)
4. Real axis: left of odd count
5. Asymptote angles: ±180°(2k+1)/(n-m)
6. Centroid: (Σpoles - Σzeros)/(n-m)
7. Breakaway: dK/ds = 0
8-9. Departure/arrival angles from angle condition
10. Imaginary crossing: Routh or s = jω
11. K = product of pole distances / product of zero distances
