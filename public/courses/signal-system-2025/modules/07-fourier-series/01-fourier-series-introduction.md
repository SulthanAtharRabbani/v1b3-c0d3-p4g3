---
title: Fourier Series Introduction
readingTime: 28
difficulty: intermediate
objectives:
  - Understand the fundamental concept of Fourier series
  - Write the trigonometric form of the Fourier series
  - Explain how periodic signals can be decomposed into harmonics
  - Identify the DC component and harmonic components
keyPoints:
  - Fourier series represents periodic signals as sums of sinusoids
  - The trigonometric form uses cosine and sine terms at harmonic frequencies
  - The DC component represents the average value of the signal
  - Harmonics are integer multiples of the fundamental frequency
---

# Fourier Series Introduction

## Introduction

The Fourier Series is one of the most important discoveries in mathematics and engineering. It states that any periodic signal can be decomposed into a sum of sinusoidal signals at frequencies that are integer multiples of the fundamental frequency. This powerful concept enables frequency-domain analysis of signals and forms the foundation for modern signal processing.

## Historical Background

Joseph Fourier (1768-1830) discovered that periodic functions could be expressed as sums of sines and cosines while studying heat conduction. This insight revolutionized mathematical analysis and led to countless applications in physics, engineering, and mathematics.

## The Fundamental Concept

### Key Idea

Any periodic signal $x(t)$ with period $T_0$ can be expressed as:

$$x(t) = a_0 + \sum_{n=1}^{\infty} \left[a_n\cos(n\omega_0 t) + b_n\sin(n\omega_0 t)\right]$$

where $\omega_0 = 2\pi/T_0$ is the fundamental angular frequency.

### Interpretation

This means that **any periodic waveform** can be built by adding:
1. A constant (DC) component $a_0$
2. Cosine waves at frequencies $\omega_0, 2\omega_0, 3\omega_0, \ldots$
3. Sine waves at frequencies $\omega_0, 2\omega_0, 3\omega_0, \ldots$

## Trigonometric Form of Fourier Series

### Standard Form

The **trigonometric Fourier series** is:

$$x(t) = a_0 + \sum_{n=1}^{\infty} a_n\cos(n\omega_0 t) + \sum_{n=1}^{\infty} b_n\sin(n\omega_0 t)$$

### Component Definitions

| Component | Symbol | Description |
|-----------|--------|-------------|
| DC component | $a_0$ | Average value of signal |
| Cosine coefficients | $a_n$ | Amplitude of cosine harmonics |
| Sine coefficients | $b_n$ | Amplitude of sine harmonics |
| Fundamental frequency | $\omega_0$ | $\omega_0 = 2\pi/T_0$ |
| Harmonic frequencies | $n\omega_0$ | Integer multiples of fundamental |

### Alternative Amplitude-Phase Form

The series can also be written as:

$$x(t) = c_0 + \sum_{n=1}^{\infty} c_n\cos(n\omega_0 t + \phi_n)$$

where:
- $c_0 = a_0$ (DC component)
- $c_n = \sqrt{a_n^2 + b_n^2}$ (amplitude of n-th harmonic)
- $\phi_n = -\arctan(b_n/a_n)$ (phase of n-th harmonic)

## Harmonic Analysis

### Fundamental and Harmonics

For a periodic signal with fundamental frequency $f_0 = 1/T_0$:

| Term | Frequency | Name |
|------|-----------|------|
| $n=0$ | 0 | DC (Direct Current) |
| $n=1$ | $f_0$ | Fundamental |
| $n=2$ | $2f_0$ | 2nd harmonic |
| $n=3$ | $3f_0$ | 3rd harmonic |
| $n=k$ | $kf_0$ | k-th harmonic |

### Spectral Representation

The Fourier series provides a **discrete spectrum**:
- Each harmonic has a specific amplitude $c_n$
- Each harmonic has a specific phase $\phi_n$
- The spectrum exists only at discrete frequencies $nf_0$

## Conditions for Fourier Series (Dirichlet Conditions)

For the Fourier series to converge to $x(t)$, the signal must satisfy:

1. **Absolute integrability:**
$$\int_{T_0} |x(t)| dt < \infty$$

2. **Finite extrema:** The signal has a finite number of maxima and minima in one period.

3. **Finite discontinuities:** The signal has a finite number of discontinuities in one period.

These conditions are satisfied by most practical signals.

## Convergence at Discontinuities

At points of discontinuity, the Fourier series converges to:

$$\text{FS value} = \frac{x(t^-) + x(t^+)}{2}$$

the average of the left and right limits.

### Gibbs Phenomenon

Near discontinuities, the Fourier series exhibits **overshoot** of approximately 9% of the jump size. This overshoot does not disappear as more terms are added—it simply becomes narrower.

## Example: Square Wave

Consider a square wave with period $T_0$:

$$x(t) = \begin{cases}
A, & 0 < t < T_0/2 \\
-A, & T_0/2 < t < T_0
\end{cases}$$

### Fourier Series Coefficients

The square wave is an **odd function**, so all $a_n = 0$.

The coefficients are:
$$b_n = \begin{cases}
\frac{4A}{n\pi}, & n \text{ odd} \\
0, & n \text{ even}
\end{cases}$$

### Resulting Series

$$x(t) = \frac{4A}{\pi}\left[\sin(\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) + \frac{1}{5}\sin(5\omega_0 t) + \ldots\right]$$

### Key Observations

1. **Only odd harmonics** are present (square wave has half-wave symmetry)
2. **Amplitude decreases** as $1/n$ for harmonics
3. **All harmonics are sine terms** (signal is odd)

## Example: Sawtooth Wave

For a sawtooth wave:
$$x(t) = \frac{A}{T_0}t, \quad -T_0/2 < t < T_0/2$$

### Fourier Series

$$x(t) = \frac{2A}{\pi}\left[\sin(\omega_0 t) - \frac{1}{2}\sin(2\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) - \ldots\right]$$

## Signal Symmetry and Fourier Coefficients

### Even Symmetry

If $x(t) = x(-t)$ (even function):
- All $b_n = 0$
- Only cosine terms exist
- $a_n = \frac{4}{T_0}\int_0^{T_0/2} x(t)\cos(n\omega_0 t) dt$

### Odd Symmetry

If $x(t) = -x(-t)$ (odd function):
- All $a_n = 0$ (including $a_0 = 0$)
- Only sine terms exist
- $b_n = \frac{4}{T_0}\int_0^{T_0/2} x(t)\sin(n\omega_0 t) dt$

### Half-Wave Symmetry

If $x(t) = -x(t + T_0/2)$:
- All even harmonics are zero ($a_n = b_n = 0$ for even $n$)
- Only odd harmonics exist

## Applications of Fourier Series

1. **Signal analysis:** Determining frequency content
2. **Harmonic distortion:** Measuring signal quality
3. **Filter design:** Identifying unwanted frequency components
4. **Audio synthesis:** Creating musical tones
5. **Power systems:** Analyzing harmonics in power quality

## Summary

The Fourier Series provides a fundamental way to represent periodic signals as sums of sinusoids. The trigonometric form uses cosine and sine terms at harmonic frequencies, with coefficients that weight each component's contribution. Understanding Fourier series is essential for frequency-domain analysis, enabling engineers to analyze and design systems based on their spectral characteristics. The decomposition of signals into harmonics reveals the underlying frequency structure that defines the signal's shape and properties.
