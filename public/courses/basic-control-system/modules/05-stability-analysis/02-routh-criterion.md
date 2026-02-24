---
title: Routh-Hurwitz Stability Criterion
readingTime: 20
difficulty: intermediate
objectives:
  - Understand the Routh-Hurwitz stability criterion
  - Construct the Routh array
  - Determine stability from the Routh array
  - Find the number of unstable poles
keyPoints:
  - Routh criterion determines stability without finding poles
  - All elements in first column must be positive for stability
  - Number of sign changes equals number of RHP poles
  - The method works on the characteristic equation
---

# Routh-Hurwitz Stability Criterion

## Introduction

While we can determine stability by finding all poles of a system, this becomes impractical for high-order systems. The **Routh-Hurwitz stability criterion** provides a method to determine stability directly from the coefficients of the characteristic equation, without actually finding the roots.

## The Routh-Hurwitz Criterion

### Statement

A system is stable if and only if all the elements in the first column of the Routh array are positive.

The number of sign changes in the first column equals the number of poles with positive real parts (right half-plane poles).

### Advantages

1. **No root calculation**: Works directly with coefficients
2. **High-order systems**: Practical for systems of any order
3. **Parameter ranges**: Can find stability conditions for parameters
4. **Number of unstable poles**: Reveals degree of instability

## Constructing the Routh Array

### Characteristic Equation

Given the characteristic equation:

$$a_0 s^n + a_1 s^{n-1} + a_2 s^{n-2} + \cdots + a_{n-1} s + a_n = 0$$

Where $a_0 > 0$.

### Array Construction

**Step 1:** Arrange coefficients in first two rows:

| Row | $s^n$ | $s^{n-2}$ | $s^{n-4}$ | ... |
|-----|-------|-----------|-----------|-----|
| $s^n$ | $a_0$ | $a_2$ | $a_4$ | ... |
| $s^{n-1}$ | $a_1$ | $a_3$ | $a_5$ | ... |

**Step 2:** Calculate remaining rows using:

$$b_1 = \frac{a_1 a_2 - a_0 a_3}{a_1}, \quad b_2 = \frac{a_1 a_4 - a_0 a_5}{a_1}, \ldots$$

$$c_1 = \frac{b_1 a_3 - a_1 b_2}{b_1}, \quad c_2 = \frac{b_1 a_5 - a_1 b_3}{b_1}, \ldots$$

Continue until the $s^0$ row is reached.

### General Formula

For element in row $i$, column $j$:

$$\text{element}_{i,j} = \frac{-(\text{element}_{i-1,1})(\text{element}_{i-2,j+1}) + (\text{element}_{i-1,j+1})(\text{element}_{i-2,1})}{\text{element}_{i-1,1}}$$

## Example: Third-Order System

### Problem

Determine stability for the system with characteristic equation:

$$s^3 + 3s^2 + 3s + K = 0$$

### Solution

**Construct the Routh array:**

| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^3$ | 1 | 3 |
| $s^2$ | 3 | K |
| $s^1$ | $\frac{3(3)-1(K)}{3} = \frac{9-K}{3}$ | 0 |
| $s^0$ | K | |

**For stability:**

1. First element of $s^1$ row: $\frac{9-K}{3} > 0 \Rightarrow K < 9$
2. First element of $s^0$ row: $K > 0$

**Stability range:** $0 < K < 9$

## Example: Fourth-Order System

### Problem

Characteristic equation:

$$s^4 + 2s^3 + 3s^2 + 4s + 5 = 0$$

### Solution

**Routh array:**

| Row | Col 1 | Col 2 | Col 3 |
|-----|-------|-------|-------|
| $s^4$ | 1 | 3 | 5 |
| $s^3$ | 2 | 4 | 0 |
| $s^2$ | $\frac{2(3)-1(4)}{2} = 1$ | $\frac{2(5)-0}{2} = 5$ | |
| $s^1$ | $\frac{1(4)-2(5)}{1} = -6$ | 0 | |
| $s^0$ | 5 | | |

**First column:** 1, 2, 1, -6, 5

**Sign changes:**
- 1 → 2 (no change)
- 2 → 1 (no change)
- 1 → -6 (change 1)
- -6 → 5 (change 2)

**Two sign changes = Two RHP poles**

**Verdict: Unstable** (2 unstable poles)

## Example: Finding Gain for Stability

### Problem

For the system with open-loop transfer function:

$$G(s) = \frac{K}{s(s+1)(s+2)}$$

Find the range of K for closed-loop stability.

### Solution

**Closed-loop characteristic equation:**

$$1 + G(s) = 0$$
$$s(s+1)(s+2) + K = 0$$
$$s^3 + 3s^2 + 2s + K = 0$$

**Routh array:**

| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^3$ | 1 | 2 |
| $s^2$ | 3 | K |
| $s^1$ | $\frac{6-K}{3}$ | 0 |
| $s^0$ | K | |

**For stability:**
1. $\frac{6-K}{3} > 0 \Rightarrow K < 6$
2. $K > 0$

**Stability range: $0 < K < 6$**

The critical gain is $K_c = 6$.

## Necessary Conditions

Before constructing the Routh array, check these necessary conditions:

### All Coefficients Must Be Positive

For a stable system, all coefficients of the characteristic equation must be positive.

$$a_0, a_1, a_2, \ldots, a_n > 0$$

If any coefficient is zero or negative, the system is either unstable or marginally stable.

### All Coefficients Must Exist

No coefficient can be missing (zero) in a stable system. This indicates a root at the origin or symmetric roots about the origin.

## Finding Critical Values

The **critical value** of a parameter is where the system transitions from stable to unstable.

### Method

1. Express the characteristic equation with the parameter
2. Construct the Routh array
3. Find conditions that make elements positive
4. The critical value is where stability boundaries are crossed

### Physical Interpretation

At the critical gain $K_c$:
- The system is marginally stable
- Poles lie on the imaginary axis
- Sustained oscillations occur
- The system oscillates at the natural frequency

## Summary

The Routh-Hurwitz criterion provides a systematic method to determine stability from the characteristic equation coefficients. By constructing the Routh array and examining the first column, we can determine:
1. Whether the system is stable
2. How many poles are in the right half-plane
3. The range of parameter values for stability

This method is essential for control system design, allowing engineers to find stability boundaries without solving for poles explicitly.
