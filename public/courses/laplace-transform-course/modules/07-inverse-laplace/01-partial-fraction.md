---
title: Partial Fraction Expansion
readingTime: 25
difficulty: intermediate
objectives:
  - Perform partial fraction expansion for various pole types
  - Apply cover-up method for simple poles
  - Handle repeated poles correctly
  - Transform complex conjugate pole pairs
keyPoints:
  - Partial fractions decompose complex expressions into simple terms
  - Each simple pole contributes an exponential term
  - The ROC determines causal vs anti-causal interpretation
---

# Partial Fraction Expansion

## The Inverse Transform Problem

Given $X(s)$, we need to find $x(t)$. The inverse Laplace Transform is defined as:

$$x(t) = \mathcal{L}^{-1}\{X(s)\} = \frac{1}{2\pi j} \int_{\sigma-j\infty}^{\sigma+j\infty} X(s) e^{st} \, ds$$

However, this complex contour integral is rarely used directly. Instead, we use **partial fraction expansion** combined with transform tables.

## Partial Fraction Expansion: Overview

For a rational function $X(s) = \frac{N(s)}{D(s)}$ where $N(s)$ and $D(s)$ are polynomials:

1. **Ensure proper fraction**: Degree of numerator < degree of denominator
2. **Factor the denominator**: Find roots of $D(s)$
3. **Expand**: Express as sum of simpler terms
4. **Inverse transform**: Use tables for each term

## Case 1: Simple (Non-Repeated) Real Poles

For $D(s) = (s - p_1)(s - p_2)\cdots(s - p_n)$:

$$X(s) = \frac{N(s)}{(s-p_1)(s-p_2)\cdots(s-p_n)} = \frac{A_1}{s-p_1} + \frac{A_2}{s-p_2} + \cdots + \frac{A_n}{s-p_n}$$

### Cover-Up Method

To find coefficient $A_k$:

$$A_k = (s - p_k)X(s)\bigg|_{s=p_k}$$

### Example 1

Find $\mathcal{L}^{-1}\left\{\frac{3s + 5}{(s+1)(s+2)}\right\}$ with ROC: $\text{Re}\{s\} > -1$.

**Solution:**

$$\frac{3s + 5}{(s+1)(s+2)} = \frac{A}{s+1} + \frac{B}{s+2}$$

Using cover-up method:
- $A = (s+1)\frac{3s+5}{(s+1)(s+2)}\bigg|_{s=-1} = \frac{-3+5}{-1+2} = 2$
- $B = (s+2)\frac{3s+5}{(s+1)(s+2)}\bigg|_{s=-2} = \frac{-6+5}{-2+1} = 1$

$$X(s) = \frac{2}{s+1} + \frac{1}{s+2}$$

Since ROC is to the right of all poles, both terms are causal:

$$x(t) = 2e^{-t}u(t) + e^{-2t}u(t) = (2e^{-t} + e^{-2t})u(t)$$

## Case 2: Repeated Real Poles

For a pole $p$ repeated $r$ times, the expansion includes:

$$\frac{N(s)}{(s-p)^r \cdot Q(s)} = \frac{A_1}{s-p} + \frac{A_2}{(s-p)^2} + \cdots + \frac{A_r}{(s-p)^r} + \cdots$$

### Finding Coefficients for Repeated Poles

For a double pole at $s = p$:

$$A_2 = (s-p)^2 X(s)\bigg|_{s=p}$$
$$A_1 = \frac{d}{ds}[(s-p)^2 X(s)]\bigg|_{s=p}$$

### Example 2

Find $\mathcal{L}^{-1}\left\{\frac{s + 2}{(s+1)^2(s+3)}\right\}$ with ROC: $\text{Re}\{s\} > -1$.

**Solution:**

$$X(s) = \frac{A}{s+1} + \frac{B}{(s+1)^2} + \frac{C}{s+3}$$

Finding coefficients:
- $B = (s+1)^2 X(s)\bigg|_{s=-1} = \frac{-1+2}{-1+3} = \frac{1}{2}$
- $C = (s+3)X(s)\bigg|_{s=-3} = \frac{-3+2}{(-3+1)^2} = \frac{-1}{4}$

For $A$, multiply by $(s+1)^2$ and differentiate:

$$A = \frac{d}{ds}\left[\frac{s+2}{s+3}\right]_{s=-1} = \frac{(s+3)(1) - (s+2)(1)}{(s+3)^2}\bigg|_{s=-1} = \frac{1}{4}$$

$$X(s) = \frac{1/4}{s+1} + \frac{1/2}{(s+1)^2} - \frac{1/4}{s+3}$$

$$x(t) = \left(\frac{1}{4}e^{-t} + \frac{1}{2}te^{-t} - \frac{1}{4}e^{-3t}\right)u(t)$$

## Case 3: Complex Conjugate Poles

For complex poles $s = -a \pm j\omega_0$, use one of two approaches:

### Method A: Complete the Square

$$X(s) = \frac{As + B}{(s+a)^2 + \omega_0^2}$$

Then identify with known transforms:
- $\mathcal{L}\{e^{-at}\cos(\omega_0 t)u(t)\} = \frac{s+a}{(s+a)^2 + \omega_0^2}$
- $\mathcal{L}\{e^{-at}\sin(\omega_0 t)u(t)\} = \frac{\omega_0}{(s+a)^2 + \omega_0^2}$

### Method B: Partial Fractions with Complex Poles

$$\frac{N(s)}{(s+a-j\omega_0)(s+a+j\omega_0)} = \frac{C}{s+a-j\omega_0} + \frac{C^*}{s+a+j\omega_0}$$

The coefficients are complex conjugates.

### Example 3

Find $\mathcal{L}^{-1}\left\{\frac{s+1}{s^2 + 2s + 5}\right\}$.

**Solution:**

Complete the square: $s^2 + 2s + 5 = (s+1)^2 + 4$

$$X(s) = \frac{s+1}{(s+1)^2 + 4}$$

This matches the cosine form with $a = 1$ and $\omega_0 = 2$:

$$x(t) = e^{-t}\cos(2t)u(t)$$

## Improper Rational Functions

If the numerator degree $\geq$ denominator degree, first perform polynomial division:

$$X(s) = Q(s) + \frac{R(s)}{D(s)}$$

where $Q(s)$ is the quotient (polynomial) and $R(s)$ is the remainder.

### Example 4

Find $\mathcal{L}^{-1}\left\{\frac{s^3 + 2s^2 + 3}{s^2 + 1}\right\}$.

**Solution:**

Polynomial division:
$$\frac{s^3 + 2s^2 + 3}{s^2 + 1} = s + 2 + \frac{1-s}{s^2+1}$$

$$X(s) = s + 2 + \frac{1}{s^2+1} - \frac{s}{s^2+1}$$

Using known transforms:
- $\mathcal{L}^{-1}\{1\} = \delta(t)$
- $\mathcal{L}^{-1}\{s\} = \delta'(t)$

$$x(t) = \delta'(t) + 2\delta(t) + \sin(t)u(t) - \cos(t)u(t)$$

## Summary

Partial fraction expansion is the key technique for inverse Laplace transformation:

| Pole Type | Expansion Form | Time Domain Term |
|-----------|----------------|------------------|
| Simple real pole | $\frac{A}{s-p}$ | $Ae^{pt}u(t)$ |
| Repeated pole (order r) | $\frac{A_1}{s-p} + \frac{A_2}{(s-p)^2} + \cdots$ | $e^{pt}[A_1 + A_2 t + \cdots]u(t)$ |
| Complex pair | $\frac{As+B}{(s+a)^2+\omega_0^2}$ | $e^{-at}[A\cos(\omega_0 t) + \frac{B-aA}{\omega_0}\sin(\omega_0 t)]u(t)$ |

Remember that the **ROC determines** whether each term is causal ($u(t)$) or anti-causal ($u(-t)$).
