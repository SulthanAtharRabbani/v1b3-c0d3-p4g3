---
title: Special Cases in Routh's Criterion
readingTime: 18
difficulty: intermediate
objectives:
  - Handle zero in the first column of Routh array
  - Handle entire row of zeros in Routh array
  - Apply the epsilon method for first column zeros
  - Use the auxiliary polynomial for row of zeros
keyPoints:
  - Zero in first column requires special treatment
  - Row of zeros indicates symmetrical roots
  - Epsilon method: replace zero with small value
  - Auxiliary polynomial reveals roots on imaginary axis
---

# Special Cases in Routh's Criterion

## Introduction

Two special cases can occur when constructing the Routh array that require additional treatment:

1. **Zero in the first column**: Makes it impossible to calculate the next row
2. **Entire row of zeros**: Indicates special root configurations

These cases are not uncommon and provide important information about system behavior.

## Case 1: Zero in the First Column

### Problem

When an element in the first column becomes zero (but not the entire row), we cannot divide by it to calculate the next row.

### Solution Methods

#### Method 1: Epsilon Method

Replace the zero with a small number $\epsilon$ and proceed:

1. Replace the zero with $\epsilon$ (where $\epsilon \to 0$)
2. Complete the Routh array
3. Examine the signs as $\epsilon \to 0^+$ and $\epsilon \to 0^-$
4. Count sign changes

### Example 1

**Characteristic equation:**
$$s^3 + 2s^2 + 2s + 4 = 0$$

**Routh array:**

| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^3$ | 1 | 2 |
| $s^2$ | 2 | 4 |
| $s^1$ | $\frac{2(2)-1(4)}{2} = 0$ | 0 |

We have a zero in the first column!

**Using epsilon method:**

Replace 0 with $\epsilon$:

| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^3$ | 1 | 2 |
| $s^2$ | 2 | 4 |
| $s^1$ | $\epsilon$ | 0 |
| $s^0$ | 4 | |

**Analyze signs:**

First column: 1, 2, $\epsilon$, 4

As $\epsilon \to 0^+$: 1, 2, +, 4 → **No sign changes** → Stable (but need to verify)

Actually, let's verify by finding roots: $s^3 + 2s^2 + 2s + 4 = 0$

Roots: $s = -2, \pm j\sqrt{2}$

The system has one real pole at -2 and two imaginary poles. This is **marginally stable**.

### Example 2

**Characteristic equation:**
$$s^3 - 3s^2 + 3s - 1 = 0$$

Note: There are negative coefficients, so the system is definitely unstable.

**Routh array:**

| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^3$ | 1 | 3 |
| $s^2$ | -3 | -1 |
| $s^1$ | $\frac{-9-(-1)}{-3} = \frac{-8}{-3} = \frac{8}{3}$ | 0 |
| $s^0$ | -1 | |

First column: 1, -3, 8/3, -1

Sign changes: 3 (unstable)

#### Method 2: Reverse Substitution

Replace $s$ with $1/z$ and multiply by $z^n$ to get a new polynomial. This can sometimes eliminate the zero in the first column.

## Case 2: Entire Row of Zeros

### Problem

When an entire row of the Routh array becomes zero, it indicates:
- Roots that are symmetric about the origin
- Pairs of real roots with equal magnitude opposite signs
- Complex conjugate pairs on the imaginary axis
- Or combinations of these

### Solution Method: Auxiliary Polynomial

1. **Form the auxiliary polynomial** using the coefficients from the row above
2. **Take the derivative** of the auxiliary polynomial
3. **Replace the zero row** with the coefficients of the derivative
4. **Continue** the Routh array

### Auxiliary Polynomial

If the $s^k$ row is all zeros, the auxiliary polynomial is formed from the $s^{k+1}$ row:

$$A(s) = a_0 s^{k+1} + a_2 s^{k-1} + a_4 s^{k-3} + \cdots$$

Only every other power of $s$ appears.

### Example 3

**Characteristic equation:**
$$s^4 + 5s^3 + 10s^2 + 20s + 24 = 0$$

**Routh array:**

| Row | Col 1 | Col 2 | Col 3 |
|-----|-------|-------|-------|
| $s^4$ | 1 | 10 | 24 |
| $s^3$ | 5 | 20 | 0 |
| $s^2$ | $\frac{5(10)-20}{5} = 6$ | 24 | |
| $s^1$ | $\frac{6(20)-5(24)}{6} = 0$ | 0 | ← Entire row is zero! |

**Form auxiliary polynomial from $s^2$ row:**
$$A(s) = 6s^2 + 24$$

**Take derivative:**
$$\frac{dA}{ds} = 12s$$

**Replace zero row with derivative coefficients:**

| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^1$ | 12 | 0 |
| $s^0$ | 24 | |

**Complete array:**

| Row | Col 1 | Col 2 | Col 3 |
|-----|-------|-------|-------|
| $s^4$ | 1 | 10 | 24 |
| $s^3$ | 5 | 20 | 0 |
| $s^2$ | 6 | 24 | |
| $s^1$ | 12 | 0 | |
| $s^0$ | 24 | | |

First column: 1, 5, 6, 12, 24 - all positive

**Verdict: Stable**

**Finding the imaginary roots:**
$$A(s) = 6s^2 + 24 = 0 \Rightarrow s^2 = -4 \Rightarrow s = \pm j2$$

The system has roots at $\pm j2$ plus other stable roots.

### Example 4: Unstable with Row of Zeros

**Characteristic equation:**
$$s^5 + 2s^4 + 5s^3 + 10s^2 + 4s + 8 = 0$$

**Routh array:**

| Row | Col 1 | Col 2 | Col 3 |
|-----|-------|-------|-------|
| $s^5$ | 1 | 5 | 4 |
| $s^4$ | 2 | 10 | 8 |
| $s^3$ | 0 | 0 | 0 | ← Row of zeros! |

**Auxiliary polynomial:**
$$A(s) = 2s^4 + 10s^2 + 8$$

**Derivative:**
$$\frac{dA}{ds} = 8s^3 + 20s$$

**Continue array:**

| Row | Col 1 | Col 2 | Col 3 |
|-----|-------|-------|-------|
| $s^3$ | 8 | 20 | 0 |
| $s^2$ | $\frac{8(10)-2(20)}{8} = 5$ | 8 | |
| $s^1$ | $\frac{5(20)-8(8)}{5} = \frac{36}{5}$ | 0 | |
| $s^0$ | 8 | | |

First column: 1, 2, 8, 5, 36/5, 8 - all positive

**But wait!** Let's check the auxiliary polynomial roots:

$$2s^4 + 10s^2 + 8 = 0$$
$$s^4 + 5s^2 + 4 = 0$$
$$(s^2 + 1)(s^2 + 4) = 0$$
$$s = \pm j, \pm j2$$

All four roots from the auxiliary polynomial are on the imaginary axis.

Since these are simple (not repeated) roots on the imaginary axis, the system is **marginally stable**.

## Significance of Row of Zeros

A row of zeros indicates that the characteristic equation has:

1. **Roots symmetric about the origin**
2. **Roots on the imaginary axis** (potentially)
3. The auxiliary polynomial gives these special roots

## Summary

Two special cases require additional treatment in Routh's criterion:

1. **Zero in first column**: Use the epsilon method - replace zero with small $\epsilon$ and analyze the limit
2. **Entire row of zeros**: Form auxiliary polynomial, take derivative, and continue

These cases often indicate systems with marginal stability or roots on the imaginary axis. Understanding them is important for complete stability analysis.
