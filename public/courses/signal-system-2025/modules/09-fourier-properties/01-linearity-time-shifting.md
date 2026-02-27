---
title: Linearity and Time Shifting Properties
readingTime: 25
difficulty: intermediate
objectives:
  - Apply the linearity property of Fourier transform
  - Use time-shifting property for analysis
  - Understand phase effects of time shifts
  - Combine properties for signal analysis
keyPoints:
  - Linearity: F{ax₁(t) + bx₂(t)} = aX₁(ω) + bX₂(ω)
  - Time shift adds linear phase: F{x(t-t₀)} = X(ω)e^{-jωt₀}
  - Time shift doesn't affect magnitude spectrum
  - Properties can be combined for complex signals
---

# Linearity and Time Shifting Properties

The Fourier transform has several important properties that simplify analysis. This lesson covers linearity and time-shifting, two fundamental properties.

## Linearity Property

### Definition

The Fourier transform is a linear operator:

$$\mathcal{F}\{ax_1(t) + bx_2(t)\} = aX_1(\omega) + bX_2(\omega)$$

where $a$ and $b$ are constants.

### Proof

By definition of the Fourier transform:

$$\mathcal{F}\{ax_1(t) + bx_2(t)\} = \int_{-\infty}^{\infty} [ax_1(t) + bx_2(t)]e^{-j\omega t}dt$$

$$= a\int_{-\infty}^{\infty}x_1(t)e^{-j\omega t}dt + b\int_{-\infty}^{\infty}x_2(t)e^{-j\omega t}dt$$

$$= aX_1(\omega) + bX_2(\omega)$$

### Applications

**Signal Decomposition**: Complex signals can be decomposed into simpler components, transformed individually, then combined:

$$x(t) = x_1(t) + x_2(t) \Rightarrow X(\omega) = X_1(\omega) + X_2(\omega)$$

**Superposition**: Multiple inputs to a linear system can be analyzed separately.

## Time-Shifting Property

### Definition

If $\mathcal{F}\{x(t)\} = X(\omega)$, then:

$$\mathcal{F}\{x(t-t_0)\} = X(\omega)e^{-j\omega t_0}$$

### Proof

Let $\tau = t - t_0$, so $t = \tau + t_0$ and $dt = d\tau$:

$$\mathcal{F}\{x(t-t_0)\} = \int_{-\infty}^{\infty} x(t-t_0)e^{-j\omega t}dt$$

$$= \int_{-\infty}^{\infty} x(\tau)e^{-j\omega(\tau + t_0)}d\tau$$

$$= e^{-j\omega t_0}\int_{-\infty}^{\infty} x(\tau)e^{-j\omega\tau}d\tau$$

$$= X(\omega)e^{-j\omega t_0}$$

### Interpretation

**Magnitude**: Time shifting does not affect the magnitude spectrum:

$$|X(\omega)e^{-j\omega t_0}| = |X(\omega)| \cdot |e^{-j\omega t_0}| = |X(\omega)|$$

**Phase**: Time shifting adds a linear phase term:

$$\angle\{X(\omega)e^{-j\omega t_0}\} = \angle X(\omega) - \omega t_0$$

### Physical Meaning

A time delay shifts the phase proportionally to frequency. Higher frequencies experience more phase shift for the same time delay.

## Combined Applications

### Example: Delayed Sinusoid

Find the Fourier transform of $x(t) = A\cos(\omega_0(t - t_0))$.

Using Euler's formula:
$$\cos(\omega_0(t - t_0)) = \frac{1}{2}[e^{j\omega_0(t-t_0)} + e^{-j\omega_0(t-t_0)}]$$

Using the frequency-shifting property and time-shifting:

$$X(\omega) = A\pi[\delta(\omega - \omega_0)e^{-j\omega_0 t_0} + \delta(\omega + \omega_0)e^{j\omega_0 t_0}]$$

### Example: Causal Exponential

Find $\mathcal{F}\{e^{-at}u(t-t_0)\}$ where $a > 0$.

This can be written as:
$$x(t-t_0) = e^{-a(t-t_0)}u(t-t_0) \cdot e^{-at_0}$$

The shift gives:
$$X(\omega) = \frac{e^{-at_0}}{a + j\omega}e^{-j\omega t_0}$$

## Summary

The linearity property allows superposition of transforms, while the time-shifting property shows that delays introduce linear phase shifts without changing the magnitude spectrum. These properties are fundamental for analyzing signals with complex time-domain behavior.
