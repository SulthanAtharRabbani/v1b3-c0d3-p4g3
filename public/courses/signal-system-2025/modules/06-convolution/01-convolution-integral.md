---
title: Convolution Integral
readingTime: 30
difficulty: advanced
objectives:
  - Define the convolution integral for continuous-time systems
  - Apply the graphical method to compute convolution
  - Execute the step-by-step convolution procedure
  - Solve practical convolution problems
keyPoints:
  - Convolution integral: y(t) = ∫x(τ)h(t-τ)dτ
  - Graphical method involves flipping, shifting, and integrating
  - The limits of integration depend on signal overlap
  - Convolution gives the output of LTI systems
---

# Convolution Integral

## Introduction

The convolution integral is the fundamental operation for determining the output of a continuous-time Linear Time-Invariant (LTI) system. Given the impulse response $h(t)$ and an input $x(t)$, convolution computes the exact output $y(t)$.

## Definition of Convolution

The convolution of two signals $x(t)$ and $h(t)$ is defined as:

$$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau)h(t - \tau) \, d\tau$$

where $*$ denotes the convolution operator.

### Alternative Form

An equivalent form is:

$$y(t) = h(t) * x(t) = \int_{-\infty}^{\infty} h(\tau)x(t - \tau) \, d\tau$$

## Physical Interpretation

Convolution can be understood as:

1. **Superposition of responses:** Each input value $x(\tau)$ produces a scaled and shifted impulse response $x(\tau)h(t-\tau)$
2. **Weighted averaging:** The output is a weighted average of the input, with weights determined by $h(t)$
3. **Memory effect:** Past inputs influence current output according to $h(t)$

## Graphical Method

The graphical method provides a visual approach to computing convolution.

### Step-by-Step Procedure

**Step 1: Choose signals**
- Signal to keep stationary: $x(\tau)$
- Signal to flip and shift: $h(\tau)$

**Step 2: Flip the second signal**
- Replace $\tau$ with $-\tau$ to get $h(-\tau)$
- This is the reflection about the vertical axis

**Step 3: Shift by time $t$**
- Replace $-\tau$ with $t-\tau$ to get $h(t-\tau)$
- For $t > 0$: shift to the right
- For $t < 0$: shift to the left

**Step 4: Multiply and integrate**
- Multiply $x(\tau)$ and $h(t-\tau)$
- Integrate over all $\tau$ where both signals are non-zero
- The result is $y(t)$ for that specific $t$

**Step 5: Repeat for all $t$**
- Continue shifting and integrating for all time values

## Example: Rectangular Pulse with Exponential

### Problem Setup

Let:
$$x(t) = u(t) - u(t - T) \quad \text{(rectangular pulse)}$$
$$h(t) = e^{-at}u(t), \quad a > 0 \quad \text{(causal exponential)}$$

### Solution

**Case 1: $t < 0$**
- No overlap between $x(\tau)$ and $h(t-\tau)$
- $y(t) = 0$

**Case 2: $0 \leq t < T$**
- Partial overlap, integration from 0 to t
- $y(t) = \int_{0}^{t} 1 \cdot e^{-a(t-\tau)} \, d\tau$
- $y(t) = e^{-at}\int_{0}^{t} e^{a\tau} \, d\tau = e^{-at} \cdot \frac{e^{at}-1}{a} = \frac{1-e^{-at}}{a}$

**Case 3: $t \geq T$**
- Full overlap, integration from 0 to T
- $y(t) = \int_{0}^{T} e^{-a(t-\tau)} \, d\tau$
- $y(t) = \frac{e^{-a(t-T)} - e^{-at}}{a} = \frac{e^{-at}(e^{aT} - 1)}{a}$

## Example: Two Rectangular Pulses

### Problem Setup

Let:
$$x(t) = u(t) - u(t - 1)$$
$$h(t) = u(t) - u(t - 1)$$

### Solution

The result is a triangular pulse:

$$y(t) = \begin{cases} t, & 0 \leq t < 1 \\ 2 - t, & 1 \leq t < 2 \\ 0, & \text{otherwise} \end{cases}$$

## Determining Integration Limits

For signals with finite support, the integration limits depend on:

1. **Start of $x(\tau)$:** Let this be $\tau_1$
2. **End of $x(\tau)$:** Let this be $\tau_2$
3. **Start of $h(t-\tau)$:** Solve $t - \tau = \text{start of } h$
4. **End of $h(t-\tau)$:** Solve $t - \tau = \text{end of } h$

Integration limits are the intersection of these ranges.

## Convolution with Impulse

Important special cases:

**With shifted impulse:**
$$x(t) * \delta(t - t_0) = x(t - t_0)$$

**With scaled impulse:**
$$x(t) * A\delta(t) = Ax(t)$$

## Common Convolution Pairs

| $x(t)$ | $h(t)$ | $y(t) = x(t) * h(t)$ |
|--------|--------|---------------------|
| $u(t)$ | $u(t)$ | $t \cdot u(t)$ |
| $e^{-at}u(t)$ | $e^{-bt}u(t)$ | $\frac{e^{-at}-e^{-bt}}{b-a}u(t)$ |
| $e^{-at}u(t)$ | $u(t)$ | $\frac{1-e^{-at}}{a}u(t)$ |
| $t \cdot u(t)$ | $e^{-at}u(t)$ | $\frac{at - 1 + e^{-at}}{a^2}u(t)$ |

## Summary

The convolution integral computes the output of continuous-time LTI systems. The graphical method—flip, shift, multiply, integrate—provides both computational and intuitive understanding. Key skills include determining integration limits and handling different time intervals for piecewise-defined signals.
