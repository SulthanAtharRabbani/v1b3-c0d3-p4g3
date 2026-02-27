---
title: Linearity Property
readingTime: 28
difficulty: intermediate
objectives:
  - Define linearity using homogeneity and additivity properties
  - Test systems for linearity using the superposition principle
  - Distinguish between linear and nonlinear systems
  - Apply linearity concepts to system analysis
keyPoints:
  - Linearity consists of homogeneity and additivity properties
  - The superposition principle combines both properties
  - Linear systems allow decomposition-based analysis
  - Nonlinear systems cannot be analyzed using superposition
---

# Linearity Property

## Introduction

Linearity is one of the most important properties in system analysis. A linear system satisfies the superposition principle, which allows complex inputs to be decomposed into simpler components, analyzed separately, and then combined to find the complete response.

## Definition of Linearity

A system is **linear** if it satisfies two properties:

### 1. Homogeneity (Scaling Property)

If an input $x(t)$ produces output $y(t)$, then:

$$x(t) \to y(t) \implies ax(t) \to ay(t)$$

for any constant $a$ (real or complex).

This means scaling the input by a constant scales the output by the same constant.

### 2. Additivity (Superposition Property)

If inputs $x_1(t)$ and $x_2(t)$ produce outputs $y_1(t)$ and $y_2(t)$ respectively, then:

$$x_1(t) \to y_1(t), \quad x_2(t) \to y_2(t)$$

$$\implies x_1(t) + x_2(t) \to y_1(t) + y_2(t)$$

The response to the sum of inputs equals the sum of individual responses.

## Combined Superposition Principle

Both properties can be combined into a single statement:

$$ax_1(t) + bx_2(t) \to ay_1(t) + by_2(t)$$

For arbitrary constants $a$ and $b$, the response to a linear combination of inputs equals the same linear combination of individual responses.

## Testing for Linearity

### Procedure

**Step 1:** Apply input $x_1(t)$ and record output $y_1(t)$

**Step 2:** Apply input $x_2(t)$ and record output $y_2(t)$

**Step 3:** Apply combined input $x_1(t) + x_2(t)$ and record output $y(t)$

**Step 4:** Check if $y(t) = y_1(t) + y_2(t)$

**Step 5:** Also verify homogeneity: $ax(t) \to ay(t)$

### Alternative Method

Use the mathematical relationship:

$$\mathcal{H}[ax_1(t) + bx_2(t)] = a\mathcal{H}[x_1(t)] + b\mathcal{H}[x_2(t)]$$

where $\mathcal{H}$ represents the system operator.

## Examples of Linear Systems

### Example 1: Ideal Amplifier

$$y(t) = Kx(t)$$

Testing: $y_1 = Kx_1$, $y_2 = Kx_2$, $y = K(x_1 + x_2) = Kx_1 + Kx_2 = y_1 + y_2$ ✓

### Example 2: Differentiator

$$y(t) = \frac{dx(t)}{dt}$$

Linearity follows from the linearity of differentiation:

$$\frac{d}{dt}[ax_1 + bx_2] = a\frac{dx_1}{dt} + b\frac{dx_2}{dt}$$

### Example 3: Integrator

$$y(t) = \int_{-\infty}^{t} x(\tau) d\tau$$

Linearity follows from the linearity of integration.

### Example 4: Time Delay

$$y(t) = x(t - t_0)$$

A fixed time delay is linear: the delayed sum equals the sum of delays.

## Examples of Nonlinear Systems

### Example 1: Square Law Device

$$y(t) = x^2(t)$$

Testing: Let $x_1(t) \to x_1^2(t)$ and $x_2(t) \to x_2^2(t)$

For combined input: $y(t) = (x_1 + x_2)^2 = x_1^2 + 2x_1x_2 + x_2^2 \neq x_1^2 + x_2^2$ ✗

### Example 2: Rectifier

$$y(t) = |x(t)|$$

Testing homogeneity: $x(t) = 1 \to y(t) = 1$, but $-x(t) = -1 \to y(t) = 1 \neq -1$ ✗

### Example 3: Threshold Device

$$y(t) = \begin{cases} 1, & x(t) > 0 \\ 0, & x(t) \leq 0 \end{cases}$$

This system violates both homogeneity and additivity.

## Properties of Linear Systems

1. **Decomposition:** Any input can be decomposed into simpler components
2. **Frequency preservation:** Linear systems don't create new frequencies
3. **Zero-input zero-output:** If $x(t) = 0$, then $y(t) = 0$ (for zero initial conditions)
4. **Interchangeability:** Cascade of linear systems can be rearranged

## Why Linearity Matters

Linear systems enable:

- **Fourier analysis:** Decomposing signals into sinusoids
- **Transfer functions:** Characterizing systems in frequency domain
- **Convolution:** Computing output from input and impulse response
- **Superposition:** Breaking complex problems into simple ones

## Summary

Linearity, defined by homogeneity and additivity, is fundamental to system analysis. Linear systems allow the use of powerful analytical tools including Fourier analysis, Laplace transforms, and convolution. Nonlinear systems, while common in practice, often require different analytical approaches such as linearization around operating points.
