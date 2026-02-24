---
title: Partial Fraction Expansion
readingTime: 20
difficulty: intermediate
objectives:
  - Understand the purpose of partial fraction expansion
  - Apply partial fractions to distinct real roots
  - Apply partial fractions to repeated real roots
  - Apply partial fractions to complex conjugate roots
  - Use partial fractions to find inverse Laplace transforms
keyPoints:
  - Partial fraction expansion breaks complex fractions into simpler terms
  - Three cases: distinct real roots, repeated real roots, complex roots
  - Each term corresponds to a known inverse transform
  - The residue method determines coefficients
---

# Partial Fraction Expansion

## Introduction

After applying the Laplace transform to a differential equation, we obtain an algebraic expression for the output $Y(s)$. To find the time-domain solution $y(t)$, we need to perform the inverse Laplace transform. **Partial fraction expansion** (PFE) is the standard technique for decomposing complex rational functions into simpler terms that can be inverted using known transform pairs.

## The Need for Partial Fractions

### The Problem

Consider a typical Laplace transform result:

$$Y(s) = \frac{s+3}{s^2 + 3s + 2}$$

This doesn't match any of the standard transform pairs in our table. We need to decompose it into simpler terms.

### The Solution

Using partial fraction expansion, we write:

$$\frac{s+3}{s^2 + 3s + 2} = \frac{s+3}{(s+1)(s+2)} = \frac{A}{s+1} + \frac{B}{s+2}$$

Each term on the right can be inverted using the exponential transform pair.

## General Form

For a rational function:

$$F(s) = \frac{N(s)}{D(s)} = \frac{b_0s^m + b_1s^{m-1} + \cdots + b_m}{a_0s^n + a_1s^{n-1} + \cdots + a_n}$$

Where:
- $N(s)$ = numerator polynomial of degree $m$
- $D(s)$ = denominator polynomial of degree $n$
- For proper fractions: $m < n$

If $m \geq n$, perform polynomial division first to obtain proper fraction plus polynomial.

## Case 1: Distinct Real Roots

### Form

When the denominator has distinct real roots (poles):

$$F(s) = \frac{N(s)}{(s+p_1)(s+p_2)\cdots(s+p_n)}$$

### Expansion

$$F(s) = \frac{A_1}{s+p_1} + \frac{A_2}{s+p_2} + \cdots + \frac{A_n}{s+p_n}$$

### Finding Coefficients (Residue Method)

For coefficient $A_i$:

$$A_i = \left.(s+p_i)F(s)\right|_{s=-p_i}$$

This is also called the **cover-up method** or **Heaviside's expansion theorem**.

### Example 1

Find the partial fraction expansion of:

$$F(s) = \frac{s+5}{(s+1)(s+3)}$$

**Expansion form:**
$$\frac{s+5}{(s+1)(s+3)} = \frac{A}{s+1} + \frac{B}{s+3}$$

**Find A:**
Cover up $(s+1)$ and evaluate at $s = -1$:
$$A = \left.\frac{s+5}{s+3}\right|_{s=-1} = \frac{-1+5}{-1+3} = \frac{4}{2} = 2$$

**Find B:**
Cover up $(s+3)$ and evaluate at $s = -3$:
$$B = \left.\frac{s+5}{s+1}\right|_{s=-3} = \frac{-3+5}{-3+1} = \frac{2}{-2} = -1$$

**Result:**
$$F(s) = \frac{2}{s+1} - \frac{1}{s+3}$$

**Inverse transform:**
$$f(t) = 2e^{-t} - e^{-3t}, \quad t \geq 0$$

### Example 2

Find the inverse Laplace transform of:

$$F(s) = \frac{3s+1}{s(s+1)(s+2)}$$

**Expansion:**
$$\frac{3s+1}{s(s+1)(s+2)} = \frac{A}{s} + \frac{B}{s+1} + \frac{C}{s+2}$$

**Find coefficients:**

$$A = \left.\frac{3s+1}{(s+1)(s+2)}\right|_{s=0} = \frac{1}{1 \times 2} = \frac{1}{2}$$

$$B = \left.\frac{3s+1}{s(s+2)}\right|_{s=-1} = \frac{-3+1}{-1 \times 1} = \frac{-2}{-1} = 2$$

$$C = \left.\frac{3s+1}{s(s+1)}\right|_{s=-2} = \frac{-6+1}{-2 \times -1} = \frac{-5}{2}$$

**Result:**
$$F(s) = \frac{1/2}{s} + \frac{2}{s+1} - \frac{5/2}{s+2}$$

**Inverse transform:**
$$f(t) = \frac{1}{2} + 2e^{-t} - \frac{5}{2}e^{-2t}, \quad t \geq 0$$

## Case 2: Repeated Real Roots

### Form

When the denominator has repeated roots:

$$F(s) = \frac{N(s)}{(s+p)^r \cdot Q(s)}$$

where the root $-p$ is repeated $r$ times.

### Expansion

$$F(s) = \frac{A_1}{s+p} + \frac{A_2}{(s+p)^2} + \cdots + \frac{A_r}{(s+p)^r} + \text{other terms}$$

### Finding Coefficients

For the repeated root terms, use:

$$A_r = \left.(s+p)^r F(s)\right|_{s=-p}$$

$$A_{r-1} = \left.\frac{d}{ds}[(s+p)^r F(s)]\right|_{s=-p}$$

$$A_{r-2} = \left.\frac{1}{2!}\frac{d^2}{ds^2}[(s+p)^r F(s)]\right|_{s=-p}$$

In general:
$$A_k = \left.\frac{1}{(r-k)!}\frac{d^{r-k}}{ds^{r-k}}[(s+p)^r F(s)]\right|_{s=-p}$$

### Example 3

Find the inverse Laplace transform of:

$$F(s) = \frac{s+2}{s(s+1)^2}$$

**Expansion:**
$$\frac{s+2}{s(s+1)^2} = \frac{A}{s} + \frac{B}{s+1} + \frac{C}{(s+1)^2}$$

**Find A:**
$$A = \left.\frac{s+2}{(s+1)^2}\right|_{s=0} = \frac{2}{1} = 2$$

**Find C:**
$$C = \left.(s+1)^2 \cdot \frac{s+2}{s(s+1)^2}\right|_{s=-1} = \left.\frac{s+2}{s}\right|_{s=-1} = \frac{1}{-1} = -1$$

**Find B using derivative method:**

Let $G(s) = (s+1)^2 F(s) = \frac{s+2}{s}$

Then: $B = \left.\frac{dG}{ds}\right|_{s=-1}$

$$\frac{dG}{ds} = \frac{s(1) - (s+2)(1)}{s^2} = \frac{-2}{s^2}$$

$$B = \left.\frac{-2}{s^2}\right|_{s=-1} = -2$$

**Result:**
$$F(s) = \frac{2}{s} - \frac{2}{s+1} - \frac{1}{(s+1)^2}$$

**Inverse transform:**
$$f(t) = 2 - 2e^{-t} - te^{-t}, \quad t \geq 0$$

## Case 3: Complex Conjugate Roots

### Form

When the denominator has complex conjugate roots:

$$D(s) = (s + a + jb)(s + a - jb) = (s+a)^2 + b^2$$

### Method 1: Expand into Two Terms

$$F(s) = \frac{As + B}{(s+a)^2 + b^2} + \text{other terms}$$

Complete the square and match to damped sinusoid forms.

### Method 2: Leave as Quadratic

Keep the quadratic factor intact and use the damped sinusoid transform pairs directly.

### Example 4

Find the inverse Laplace transform of:

$$F(s) = \frac{s+1}{s^2 + 2s + 5}$$

**Complete the square in denominator:**
$$s^2 + 2s + 5 = (s+1)^2 + 4 = (s+1)^2 + 2^2$$

**Rewrite numerator:**
$$s + 1 = (s + 1)$$

**So:**
$$F(s) = \frac{s+1}{(s+1)^2 + 2^2}$$

**Inverse transform:**
This matches the form $\frac{s+a}{(s+a)^2+\omega^2}$ which gives $e^{-at}\cos(\omega t)$

$$f(t) = e^{-t}\cos(2t), \quad t \geq 0$$

### Example 5

Find the inverse Laplace transform of:

$$F(s) = \frac{2}{s^2 + 2s + 5}$$

**Complete the square:**
$$\frac{2}{(s+1)^2 + 4} = \frac{2}{(s+1)^2 + 2^2} = \frac{1}{1} \cdot \frac{2}{(s+1)^2 + 2^2}$$

**Inverse transform:**
This matches $\frac{\omega}{(s+a)^2+\omega^2}$ which gives $e^{-at}\sin(\omega t)$

$$f(t) = e^{-t}\sin(2t), \quad t \geq 0$$

## Mixed Cases

Many practical problems involve a combination of all three cases.

### Example 6

Find the inverse transform of:

$$F(s) = \frac{s^2 + 2s + 3}{s(s+1)^2(s^2 + 4)}$$

**Expansion:**
$$F(s) = \frac{A}{s} + \frac{B}{s+1} + \frac{C}{(s+1)^2} + \frac{Ds+E}{s^2+4}$$

The coefficients are found by:
1. Finding $A$ by cover-up method at $s = 0$
2. Finding $C$ by cover-up method at $s = -1$
3. Finding $B$, $D$, $E$ by equating coefficients or substitution

This example demonstrates how all three cases can appear in a single problem.

## Summary

Partial fraction expansion is an essential technique for finding inverse Laplace transforms. The method depends on the type of roots in the denominator:

- **Distinct real roots**: Use the residue (cover-up) method
- **Repeated real roots**: Use derivatives to find coefficients
- **Complex conjugate roots**: Complete the square and use damped sinusoid forms

Mastering partial fraction expansion is essential for solving differential equations using Laplace transforms and for working with transfer functions in control systems.
