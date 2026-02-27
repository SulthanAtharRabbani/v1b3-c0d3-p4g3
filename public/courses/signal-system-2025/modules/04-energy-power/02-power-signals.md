---
title: Power Signals
readingTime: 28
difficulty: intermediate
objectives:
  - Define power for continuous-time and discrete-time signals
  - Calculate average power using appropriate formulas
  - Derive power formulas for periodic signals
  - Distinguish between instantaneous and average power
keyPoints:
  - Power measures average signal strength per unit time
  - Power signals have finite power and infinite energy
  - Periodic signals are typically power signals
  - Power calculation involves a limit as time interval approaches infinity
---

# Power Signals

## Introduction

While energy measures total signal strength, power measures the average rate of energy delivery. For signals that persist indefinitely (like periodic signals), energy becomes infinite, making power a more meaningful measure.

## Power Definition for Continuous-Time Signals

For a continuous-time signal $x(t)$, the **average power** is defined as:

$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt$$

This represents the time-averaged squared magnitude of the signal.

### Alternative Formulation

An equivalent definition uses one-sided integration:

$$P = \lim_{T \to \infty} \frac{1}{T} \int_{0}^{T} |x(t)|^2 \, dt$$

## Power Definition for Discrete-Time Signals

For a discrete-time signal $x[n]$, the average power is:

$$P = \lim_{N \to \infty} \frac{1}{2N+1} \sum_{n=-N}^{N} |x[n]|^2$$

## Power Signals

A signal is called a **power signal** if:

1. $0 < P < \infty$ (finite power)
2. $E = \infty$ (infinite energy)

Most periodic signals and many random signals fall into this category.

## Power of Periodic Signals

For periodic signals with period $T_0$, the power calculation simplifies significantly:

$$P = \frac{1}{T_0} \int_{0}^{T_0} |x(t)|^2 \, dt = \frac{1}{T_0} \int_{t_0}^{t_0+T_0} |x(t)|^2 \, dt$$

This formula states that the average power equals the energy in one period divided by the period length.

### Discrete Periodic Signals

For discrete periodic signals with period $N$:

$$P = \frac{1}{N} \sum_{n=0}^{N-1} |x[n]|^2$$

## Examples of Power Calculations

### Example 1: Sinusoidal Signal

For $x(t) = A\cos(\omega_0 t + \phi)$:

$$P = \frac{1}{T_0} \int_{0}^{T_0} A^2\cos^2(\omega_0 t + \phi) \, dt$$

Using the identity $\cos^2\theta = \frac{1}{2}(1 + \cos 2\theta)$:

$$P = \frac{A^2}{2}$$

### Example 2: Complex Exponential

For $x(t) = Ae^{j\omega_0 t}$:

$$P = \frac{1}{T_0} \int_{0}^{T_0} |A|^2 \, dt = |A|^2$$

### Example 3: Square Wave

For a square wave with amplitude $A$ and 50% duty cycle:

$$P = \frac{A^2 \cdot (T_0/2)}{T_0} = \frac{A^2}{2}$$

### Example 4: Unit Step Function

For $x(t) = u(t)$:

$$P = \lim_{T \to \infty} \frac{1}{T} \int_{0}^{T} 1 \, dt = 1$$

### Example 5: Discrete Sinusoid

For $x[n] = A\cos(\omega_0 n)$:

$$P = \frac{A^2}{2}$$

## RMS Value

The **root-mean-square (RMS)** value is related to power:

$$x_{rms} = \sqrt{P}$$

For a sinusoid $A\cos(\omega_0 t)$, the RMS value is $A/\sqrt{2}$, which equals approximately $0.707A$.

## Instantaneous vs Average Power

- **Instantaneous power:** $p(t) = |x(t)|^2$ (varies with time)
- **Average power:** $P$ (constant, time-averaged value)

For periodic signals, instantaneous power oscillates while average power remains constant.

## Power Spectral Density

For power signals, Parseval's relation becomes:

$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt = \frac{1}{2\pi}\int_{-\infty}^{\infty} S_x(\omega) \, d\omega$$

where $S_x(\omega)$ is the power spectral density.

## Summary

Power signals are characterized by finite average power and infinite total energy. Periodic signals are classic examples of power signals. The power calculation for periodic signals simplifies to finding the average energy per period, making analysis straightforward for common waveforms.
