---
title: Energy Signals
readingTime: 25
difficulty: intermediate
objectives:
  - Define energy for continuous-time and discrete-time signals
  - Calculate energy using integration and summation methods
  - Identify signals with finite energy
  - Apply energy concepts to practical signal examples
keyPoints:
  - Energy measures total signal strength over all time
  - Energy signals have finite energy and zero average power
  - The energy formula involves integration of squared magnitude
  - Common examples include pulses and decaying exponentials
---

# Energy Signals

## Introduction

The concept of signal energy provides a measure of the total "strength" or "size" of a signal over its entire duration. Unlike instantaneous amplitude, energy captures the cumulative effect of a signal, making it invaluable for comparing signals and analyzing system performance.

## Energy Definition for Continuous-Time Signals

For a continuous-time signal $x(t)$, the energy is defined as:

$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt$$

This integral represents the area under the curve of $|x(t)|^2$. The absolute value ensures that complex-valued signals are handled correctly, as energy must always be a non-negative real number.

### Physical Interpretation

If $x(t)$ represents a voltage across a 1-ohm resistor, then $|x(t)|^2$ is the instantaneous power dissipated, and the integral gives the total energy delivered to the resistor over all time.

## Energy Definition for Discrete-Time Signals

For a discrete-time signal $x[n]$, the energy is defined as:

$$E = \sum_{n=-\infty}^{\infty} |x[n]|^2$$

This summation adds up the squared magnitudes of all signal samples.

## Conditions for Finite Energy

A signal is called an **energy signal** if:

1. $0 < E < \infty$ (finite energy)
2. $P = 0$ (zero average power)

The second condition naturally follows from the first for signals that decay to zero.

## Examples of Energy Calculations

### Example 1: Rectangular Pulse

Consider a rectangular pulse:

$$x(t) = \begin{cases} A, & 0 \leq t \leq T \\ 0, & \text{otherwise} \end{cases}$$

The energy is:

$$E = \int_0^T A^2 \, dt = A^2 T$$

### Example 2: Decaying Exponential

For $x(t) = e^{-at}u(t)$ where $a > 0$:

$$E = \int_0^{\infty} e^{-2at} \, dt = \frac{1}{2a}$$

### Example 3: Gaussian Pulse

For $x(t) = e^{-at^2}$ where $a > 0$:

$$E = \int_{-\infty}^{\infty} e^{-2at^2} \, dt = \sqrt{\frac{\pi}{2a}}$$

### Example 4: Discrete Unit Pulse

For $x[n] = \delta[n]$:

$$E = \sum_{n=-\infty}^{\infty} |\delta[n]|^2 = 1$$

## Properties of Energy Signals

1. **Non-negativity:** $E \geq 0$ always
2. **Scaling:** If $y(t) = ax(t)$, then $E_y = |a|^2 E_x$
3. **Time shift invariant:** Energy doesn't change with time shift
4. **Energy signals decay:** Must approach zero as $|t| \to \infty$

## Energy Spectral Density

The distribution of energy across frequency is given by Parseval's theorem:

$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt = \frac{1}{2\pi}\int_{-\infty}^{\infty} |X(j\omega)|^2 \, d\omega$$

where $X(j\omega)$ is the Fourier transform of $x(t)$. The quantity $|X(j\omega)|^2$ is called the energy spectral density.

## Summary

Energy signals are characterized by finite total energy and zero average power. They typically include transient signals, pulses, and decaying waveforms. The energy calculation involves integrating the squared magnitude over all time, providing a fundamental measure for signal comparison and analysis.
