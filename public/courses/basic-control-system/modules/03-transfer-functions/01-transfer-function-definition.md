---
title: Transfer Function Definition
readingTime: 18
difficulty: intermediate
objectives:
  - Define transfer function and understand its properties
  - Derive transfer functions from differential equations
  - Identify poles, zeros, and the characteristic equation
  - Understand the significance of pole and zero locations
keyPoints:
  - Transfer function is the ratio of output to input in s-domain
  - Poles determine system stability and natural response
  - Zeros affect transient response shape
  - The characteristic equation determines system dynamics
---

# Transfer Function Definition

## Introduction

The **transfer function** is the cornerstone of classical control theory. It provides a complete description of the input-output behavior of linear time-invariant (LTI) systems in a compact, algebraic form. Understanding transfer functions is essential for analyzing and designing control systems.

## Definition

The **transfer function** of a linear time-invariant system is defined as the ratio of the Laplace transform of the output to the Laplace transform of the input, with all initial conditions assumed to be zero.

$$G(s) = \frac{Y(s)}{U(s)} \bigg|_{IC = 0}$$

Where:
- $G(s)$ = transfer function
- $Y(s)$ = Laplace transform of the output
- $U(s)$ = Laplace transform of the input

## Deriving Transfer Functions

### From Differential Equations

Given a linear differential equation:

$$a_0\frac{d^n y}{dt^n} + a_1\frac{d^{n-1}y}{dt^{n-1}} + \cdots + a_n y = b_0\frac{d^m u}{dt^m} + \cdots + b_m u$$

Taking the Laplace transform with zero initial conditions:

$$a_0 s^n Y(s) + a_1 s^{n-1} Y(s) + \cdots + a_n Y(s) = b_0 s^m U(s) + \cdots + b_m U(s)$$

Factor out $Y(s)$ and $U(s)$:

$$Y(s)(a_0 s^n + a_1 s^{n-1} + \cdots + a_n) = U(s)(b_0 s^m + \cdots + b_m)$$

Therefore, the transfer function is:

$$G(s) = \frac{Y(s)}{U(s)} = \frac{b_0 s^m + b_1 s^{m-1} + \cdots + b_m}{a_0 s^n + a_1 s^{n-1} + \cdots + a_n}$$

### Example: Mass-Spring-Damper System

The differential equation:

$$m\ddot{x} + b\dot{x} + kx = F(t)$$

Taking Laplace transform (zero ICs):

$$ms^2 X(s) + bs X(s) + kX(s) = F(s)$$

Transfer function:

$$G(s) = \frac{X(s)}{F(s)} = \frac{1}{ms^2 + bs + k}$$

Or in standard form:

$$G(s) = \frac{1/m}{s^2 + (b/m)s + k/m} = \frac{1/m}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

## Standard Forms

### General Form

$$G(s) = \frac{N(s)}{D(s)} = \frac{b_0 s^m + b_1 s^{m-1} + \cdots + b_m}{a_0 s^n + a_1 s^{n-1} + \cdots + a_n}$$

### Factored Form

$$G(s) = K \frac{(s-z_1)(s-z_2)\cdots(s-z_m)}{(s-p_1)(s-p_2)\cdots(s-p_n)}$$

Where:
- $K$ = gain factor
- $z_i$ = zeros (roots of numerator)
- $p_i$ = poles (roots of denominator)

### Time Constant Form

For first-order systems:

$$G(s) = \frac{K}{\tau s + 1}$$

Where $\tau$ is the time constant.

### Standard Second-Order Form

$$G(s) = \frac{K\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

Where:
- $\omega_n$ = natural frequency
- $\zeta$ = damping ratio

## Poles and Zeros

### Definitions

**Poles** are the values of $s$ that make the transfer function infinite (roots of denominator):

$$D(s) = 0$$

**Zeros** are the values of $s$ that make the transfer function zero (roots of numerator):

$$N(s) = 0$$

### Characteristic Equation

The **characteristic equation** is obtained by setting the denominator of the closed-loop transfer function to zero:

$$D(s) = a_0 s^n + a_1 s^{n-1} + \cdots + a_n = 0$$

The roots of the characteristic equation are the **poles** of the system.

### Physical Significance of Poles

Poles determine the **natural response** of the system:

| Pole Location | Response Form | Behavior |
|---------------|---------------|----------|
| Real, negative: $s = -\sigma$ | $Ae^{-\sigma t}$ | Decaying exponential |
| Real, positive: $s = +\sigma$ | $Ae^{+\sigma t}$ | Growing exponential (unstable) |
| Complex pair: $s = -\sigma \pm j\omega$ | $Ae^{-\sigma t}\sin(\omega t + \phi)$ | Damped oscillation |
| Imaginary: $s = \pm j\omega$ | $A\sin(\omega t + \phi)$ | Sustained oscillation |
| At origin: $s = 0$ | $A$ | Constant (integrator) |

### Significance of Pole Locations in s-Plane

The location of poles in the complex s-plane determines system behavior:

- **Left Half-Plane (LHP)**: Poles with negative real parts → Stable
- **Right Half-Plane (RHP)**: Poles with positive real parts → Unstable
- **Imaginary Axis**: Poles on jω-axis → Marginally stable (oscillatory)

### Effect of Zeros

Zeros do not affect stability directly, but they influence:

1. **Transient response shape**: Zeros can cause overshoot or undershoot
2. **Speed of response**: Zeros near the origin can speed up response
3. **Inverse response**: RHP zeros cause initial response in opposite direction

### Pole-Zero Plot

A **pole-zero plot** shows the locations of poles (×) and zeros (○) in the complex s-plane:

```
            jω
             ↑
        ×    |    ×      (poles: ×)
             |
    ---------+--------→ σ
             |         (zeros: ○)
        ○    |    ×
             |
```

## Properties of Transfer Functions

### 1. System Property

The transfer function is a property of the system itself, independent of the input or output magnitude.

### 2. No Physical Structure Information

The transfer function describes input-output behavior but does not reveal the internal physical structure.

### 3. Non-Uniqueness

Different physical systems can have identical transfer functions.

### 4. Complete Dynamic Description

For LTI systems, the transfer function contains all information needed to predict the response to any input.

## Proper, Strictly Proper, and Improper Systems

### Definitions

**Proper transfer function**: $m \leq n$ (degree of numerator ≤ degree of denominator)

**Strictly proper**: $m < n$ (numerator degree < denominator degree)

**Improper transfer function**: $m > n$ (numerator degree > denominator degree)

### Physical Realizability

- **Proper systems** are physically realizable
- **Strictly proper systems** have output that approaches zero as frequency approaches infinity
- **Improper systems** are not physically realizable (would amplify noise infinitely at high frequencies)

## DC Gain

The **DC gain** (steady-state gain) is the transfer function evaluated at $s = 0$:

$$K_{DC} = G(0) = \lim_{s \to 0} G(s)$$

This represents the ratio of steady-state output to constant input.

## Impulse Response

The **impulse response** $g(t)$ is the inverse Laplace transform of the transfer function:

$$g(t) = \mathcal{L}^{-1}\{G(s)\}$$

The impulse response contains the same information as the transfer function, expressed in the time domain.

## Summary

The transfer function is the fundamental representation of LTI systems in classical control. It is defined as the ratio of output to input Laplace transforms with zero initial conditions. Poles (roots of denominator) determine system stability and natural response modes. Zeros (roots of numerator) affect transient response shape. The transfer function provides a complete description of input-output behavior for analysis and design.
