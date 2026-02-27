---
title: Fourier Transform Definition
readingTime: 28
difficulty: intermediate
objectives:
  - Derive Fourier transform from Fourier series
  - Apply the Fourier transform formula
  - Understand continuous spectra
  - Interpret magnitude and phase spectra
keyPoints:
  - Fourier transform extends Fourier series to non-periodic signals
  - X(ω) represents frequency content of x(t)
  - Spectrum becomes continuous for aperiodic signals
  - Magnitude and phase provide complete frequency description
---

# Fourier Transform Definition

The Fourier transform extends Fourier series analysis to non-periodic (aperiodic) signals, providing a powerful tool for frequency-domain analysis.

## From Fourier Series to Fourier Transform

### Limiting Process

Consider a periodic signal with period $T_0$. As $T_0 \to \infty$, the signal becomes aperiodic. The Fourier series becomes the Fourier transform through this limiting process:

1. The fundamental frequency $\omega_0 = 2\pi/T_0$ approaches zero
2. The harmonic frequencies $n\omega_0$ become a continuous variable $\omega$
3. The sum becomes an integral

### Mathematical Development

Starting from the complex Fourier series:

$$x(t) = \sum_{n=-\infty}^{\infty} c_n e^{jn\omega_0 t}$$

where:
$$c_n = \frac{1}{T_0}\int_{-T_0/2}^{T_0/2} x(t)e^{-jn\omega_0 t}dt$$

As $T_0 \to \infty$, the coefficients $c_n$ become infinitesimally small, but $T_0 c_n$ approaches a finite limit that defines the Fourier transform.

## Definition of the Fourier Transform

### Forward Transform

The Fourier transform of a signal $x(t)$ is defined as:

$$X(\omega) = \mathcal{F}\{x(t)\} = \int_{-\infty}^{\infty} x(t)e^{-j\omega t}dt$$

where:
- $X(\omega)$ = frequency domain representation
- $\omega$ = angular frequency (rad/s)
- $j = \sqrt{-1}$

### Alternative Forms

Using frequency $f$ in Hz instead of angular frequency:

$$X(f) = \int_{-\infty}^{\infty} x(t)e^{-j2\pi ft}dt$$

### Conditions for Existence

The Fourier transform exists if:

$$\int_{-\infty}^{\infty} |x(t)|dt < \infty \quad \text{(Dirichlet condition)}$$

Signals with finite energy always have Fourier transforms. Some signals with infinite energy (like periodic signals) also have transforms using distributions.

## Inverse Fourier Transform

To recover the time-domain signal:

$$x(t) = \mathcal{F}^{-1}\{X(\omega)\} = \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega)e^{j\omega t}d\omega$$

Using frequency $f$:

$$x(t) = \int_{-\infty}^{\infty} X(f)e^{j2\pi ft}df$$

## Spectrum Interpretation

### Magnitude Spectrum

$$|X(\omega)| = \sqrt{\text{Re}^2\{X(\omega)\} + \text{Im}^2\{X(\omega)\}}$$

The magnitude spectrum shows the amplitude of frequency components.

### Phase Spectrum

$$\angle X(\omega) = \arctan\left(\frac{\text{Im}\{X(\omega)\}}{\text{Re}\{X(\omega)\}}\right)$$

The phase spectrum shows the phase shift of frequency components.

### Even and Odd Properties

For real signals $x(t)$:
- $|X(\omega)|$ is even: $|X(-\omega)| = |X(\omega)|$
- $\angle X(\omega)$ is odd: $\angle X(-\omega) = -\angle X(\omega)$
- $X(-\omega) = X^*(\omega)$ (conjugate symmetry)

## Continuous vs. Discrete Spectrum

### Periodic Signals (Fourier Series)

- **Discrete spectrum**: Energy concentrated at harmonic frequencies
- **Line spectrum**: Lines at $n\omega_0$ with amplitudes $|c_n|$

### Aperiodic Signals (Fourier Transform)

- **Continuous spectrum**: Energy distributed continuously over all frequencies
- **Spectral density**: $|X(\omega)|^2$ represents energy spectral density

## Example: Rectangular Pulse

Consider a rectangular pulse:

$$x(t) = \begin{cases} 1, & |t| < \tau/2 \\ 0, & \text{otherwise} \end{cases}$$

The Fourier transform is:

$$X(\omega) = \int_{-\tau/2}^{\tau/2} e^{-j\omega t}dt = \frac{e^{-j\omega\tau/2} - e^{j\omega\tau/2}}{-j\omega} = \tau \frac{\sin(\omega\tau/2)}{\omega\tau/2} = \tau \text{sinc}\left(\frac{\omega\tau}{2\pi}\right)$$

This is the sinc function, fundamental in signal processing.

## Summary

The Fourier transform extends spectral analysis to aperiodic signals. It decomposes a time-domain signal into a continuous spectrum of frequency components. The transform pair provides a bidirectional mapping between time and frequency domains, enabling powerful analysis techniques for signal processing and system design.
