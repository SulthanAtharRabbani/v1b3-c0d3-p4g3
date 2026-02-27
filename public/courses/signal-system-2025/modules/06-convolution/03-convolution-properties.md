---
title: Convolution Properties
readingTime: 25
difficulty: intermediate
objectives:
  - Apply the commutative property of convolution
  - Use the associative property for system cascades
  - Apply the distributive property for parallel systems
  - Understand convolution with impulse and special signals
keyPoints:
  - Convolution is commutative: x*h = h*x
  - Convolution is associative: (x*h1)*h2 = x*(h1*h2)
  - Convolution is distributive: x*(h1+h2) = x*h1 + x*h2
  - Convolution with impulse returns the original signal
---

# Convolution Properties

## Introduction

Convolution possesses several important algebraic properties that simplify system analysis and enable efficient computation. Understanding these properties is essential for analyzing complex systems and designing signal processing algorithms.

## Commutative Property

### Statement

$$x(t) * h(t) = h(t) * x(t)$$

For discrete-time:
$$x[n] * h[n] = h[n] * x[n]$$

### Proof (Continuous-Time)

$$x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau)h(t-\tau) \, d\tau$$

Let $\lambda = t - \tau$, then $d\lambda = -d\tau$:

$$= \int_{\infty}^{-\infty} x(t-\lambda)h(\lambda)(-d\lambda) = \int_{-\infty}^{\infty} h(\lambda)x(t-\lambda) \, d\lambda = h(t) * x(t)$$

### Significance

- Either signal can serve as the input or impulse response
- Computational flexibility in choosing which signal to flip

## Associative Property

### Statement

$$[x(t) * h_1(t)] * h_2(t) = x(t) * [h_1(t) * h_2(t)]$$

For discrete-time:
$$[x[n] * h_1[n]] * h_2[n] = x[n] * [h_1[n] * h_2[n]]$$

### Significance for System Cascades

When two LTI systems with impulse responses $h_1(t)$ and $h_2(t)$ are connected in cascade:

$$h_{cascade}(t) = h_1(t) * h_2(t)$$

The overall impulse response equals the convolution of individual impulse responses.

### Example

Two RC filters in cascade:
- $h_1(t) = e^{-t}u(t)$
- $h_2(t) = e^{-2t}u(t)$

Overall impulse response:
$$h(t) = h_1(t) * h_2(t) = (e^{-t} - e^{-2t})u(t)$$

## Distributive Property

### Statement

$$x(t) * [h_1(t) + h_2(t)] = x(t) * h_1(t) + x(t) * h_2(t)$$

For discrete-time:
$$x[n] * [h_1[n] + h_2[n]] = x[n] * h_1[n] + x[n] * h_2[n]$$

### Significance for Parallel Systems

When two LTI systems are connected in parallel:

$$h_{parallel}(t) = h_1(t) + h_2(t)$$

The overall impulse response equals the sum of individual impulse responses.

### Example

Parallel combination of a differentiator and integrator:
- $h_1(t) = \delta'(t)$ (differentiator)
- $h_2(t) = u(t)$ (integrator)

Overall impulse response:
$$h(t) = \delta'(t) + u(t)$$

## Convolution with Impulse

### Identity Property

$$x(t) * \delta(t) = x(t)$$

$$x[n] * \delta[n] = x[n]$$

### Proof

$$x(t) * \delta(t) = \int_{-\infty}^{\infty} x(\tau)\delta(t-\tau) \, d\tau = x(t)$$

(using the sifting property)

### Shift Property

$$x(t) * \delta(t - t_0) = x(t - t_0)$$

$$x[n] * \delta[n - n_0] = x[n - n_0]$$

### Scaling Property

$$x(t) * A\delta(t) = Ax(t)$$

## Convolution with Unit Step

### Continuous-Time

$$x(t) * u(t) = \int_{-\infty}^{t} x(\tau) \, d\tau$$

This is the running integral of $x(t)$.

### Discrete-Time

$$x[n] * u[n] = \sum_{k=-\infty}^{n} x[k]$$

This is the running sum (accumulator).

## Derivative and Convolution

### Differentiation Property

$$\frac{d}{dt}[x(t) * h(t)] = \frac{dx(t)}{dt} * h(t) = x(t) * \frac{dh(t)}{dt}$$

### Integration Property

$$\int_{-\infty}^{t}[x(\tau) * h(\tau)] \, d\tau = \left[\int_{-\infty}^{t} x(\tau) \, d\tau\right] * h(t)$$

## System Interpretation

### Cascade Connection

```
x(t) → [h₁(t)] → [h₂(t)] → y(t)
```
is equivalent to:
```
x(t) → [h₁(t) * h₂(t)] → y(t)
```

### Parallel Connection

```
        ┌→ [h₁(t)] →┐
x(t) →─┤            ├─(+ )→ y(t)
        └→ [h₂(t)] →┘
```
is equivalent to:
```
x(t) → [h₁(t) + h₂(t)] → y(t)
```

## Summary Table

| Property | Continuous-Time | Discrete-Time |
|----------|-----------------|---------------|
| Commutative | $x*h = h*x$ | $x[n]*h[n] = h[n]*x[n]$ |
| Associative | $(x*h_1)*h_2 = x*(h_1*h_2)$ | $(x[n]*h_1[n])*h_2[n] = x[n]*(h_1[n]*h_2[n])$ |
| Distributive | $x*(h_1+h_2) = x*h_1 + x*h_2$ | $x[n]*(h_1[n]+h_2[n]) = x[n]*h_1[n] + x[n]*h_2[n]$ |
| Identity | $x*\delta = x$ | $x[n]*\delta[n] = x[n]$ |
| Shift | $x*\delta(t-t_0) = x(t-t_0)$ | $x[n]*\delta[n-n_0] = x[n-n_0]$ |

## Applications

### 1. System Simplification

Use properties to combine cascaded or parallel systems into a single equivalent system.

### 2. Computational Efficiency

Choose the shorter signal to flip when computing convolution numerically.

### 3. Filter Design

Cascading simple filters to achieve complex frequency responses.

### 4. Inverse Systems

Find $h^{-1}(t)$ such that $h(t) * h^{-1}(t) = \delta(t)$.

## Summary

The commutative, associative, and distributive properties of convolution provide powerful tools for system analysis. These properties enable the decomposition of complex systems into simpler components, the combination of simple systems into complex ones, and the development of efficient computational algorithms for signal processing applications.
