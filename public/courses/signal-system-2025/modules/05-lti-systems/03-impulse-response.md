---
title: Impulse Response
readingTime: 30
difficulty: intermediate
objectives:
  - Understand the Dirac delta function and its properties
  - Define the unit impulse response h(t) of a system
  - Characterize LTI systems using impulse response
  - Relate impulse response to system properties
keyPoints:
  - Impulse response fully characterizes LTI systems
  - Dirac delta is an idealized impulse with unit area
  - Impulse response reveals system dynamics and stability
  - Convolution with impulse response gives system output
---

# Impulse Response

## Introduction

The impulse response is a fundamental concept in system theory. For Linear Time-Invariant (LTI) systems, the impulse response provides complete characterization—all system behaviors can be derived from this single function.

## The Dirac Delta Function

### Definition

The Dirac delta function $\delta(t)$ is defined by:

$$\int_{-\infty}^{\infty} \delta(t) \, dt = 1$$

and

$$\delta(t) = 0 \text{ for } t \neq 0$$

### Properties

**1. Sifting Property:**
$$\int_{-\infty}^{\infty} x(t)\delta(t - t_0) \, dt = x(t_0)$$

**2. Scaling Property:**
$$\delta(at) = \frac{1}{|a|}\delta(t)$$

**3. Sampling Property:**
$$x(t)\delta(t - t_0) = x(t_0)\delta(t - t_0)$$

**4. Relationship with Unit Step:**
$$\delta(t) = \frac{d}{dt}u(t)$$

### Discrete-Time Impulse

The discrete-time unit impulse (Kronecker delta) is defined as:

$$\delta[n] = \begin{cases} 1, & n = 0 \\ 0, & n \neq 0 \end{cases}$$

## Definition of Impulse Response

The **impulse response** $h(t)$ of a system is the output when the input is a Dirac delta function:

$$\delta(t) \to h(t)$$

For discrete-time systems:
$$\delta[n] \to h[n]$$

## Why Impulse Response Matters

### Complete System Characterization

For LTI systems, the impulse response $h(t)$ completely characterizes the system. Given any input $x(t)$, the output can be computed using convolution:

$$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau)h(t-\tau) \, d\tau$$

### Physical Interpretation

The impulse response reveals:
- **Transient behavior:** How the system responds to sudden changes
- **Stability:** Whether bounded inputs produce bounded outputs
- **Causality:** Whether the system responds only to past and present inputs
- **Memory:** How long past inputs affect current output

## Examples of Impulse Responses

### Example 1: RC Low-Pass Filter

$$h(t) = \frac{1}{RC}e^{-t/RC}u(t)$$

An exponentially decaying response starting at $t = 0$.

### Example 2: Ideal Differentiator

$$h(t) = \frac{d}{dt}\delta(t) = \delta'(t)$$

The derivative of the impulse function.

### Example 3: Ideal Integrator

$$h(t) = u(t)$$

The unit step function—output accumulates all past input.

### Example 4: Time Delay

$$h(t) = \delta(t - t_d)$$

A delayed impulse—output equals input delayed by $t_d$.

### Example 5: Moving Average (Discrete)

$$h[n] = \begin{cases} \frac{1}{N}, & 0 \leq n \leq N-1 \\ 0, & \text{otherwise} \end{cases}$$

A rectangular impulse response in discrete time.

## Properties Revealed by Impulse Response

### Causality

A system is **causal** if:
$$h(t) = 0 \text{ for } t < 0$$

The system cannot respond before the impulse is applied.

### Stability

An LTI system is **BIBO stable** if:
$$\int_{-\infty}^{\infty} |h(t)| \, dt < \infty$$

The impulse response must be absolutely integrable.

### Memory

A system has **memory** if $h(t) \neq 0$ for some $t \neq 0$.

A memoryless system has $h(t) = K\delta(t)$.

### FIR vs IIR (Discrete-Time)

- **FIR (Finite Impulse Response):** $h[n]$ has finite duration
- **IIR (Infinite Impulse Response):** $h[n]$ has infinite duration

## Impulse Response and Transfer Function

The impulse response and transfer function form a Fourier transform pair:

$$H(j\omega) = \mathcal{F}\{h(t)\} = \int_{-\infty}^{\infty} h(t)e^{-j\omega t} \, dt$$

$$h(t) = \mathcal{F}^{-1}\{H(j\omega)\} = \frac{1}{2\pi}\int_{-\infty}^{\infty} H(j\omega)e^{j\omega t} \, d\omega$$

The transfer function $H(j\omega)$ shows how the system responds to each frequency component.

## Measuring Impulse Response

### Direct Method

Apply an approximate impulse (very short, high amplitude pulse) and measure the output.

### Frequency Domain Method

1. Measure frequency response $H(j\omega)$ at multiple frequencies
2. Compute inverse Fourier transform to get $h(t)$

### System Identification

For unknown systems, use:
- Step response (derivative gives impulse response)
- White noise excitation
- Correlation methods

## Summary

The impulse response is a complete characterization of LTI systems. It captures all dynamic behavior and enables output computation through convolution. Understanding impulse response is essential for system analysis, design, and identification in areas ranging from communications to control systems.
