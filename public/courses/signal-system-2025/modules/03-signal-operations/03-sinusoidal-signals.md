---
title: Sinusoidal Signals
readingTime: 25
difficulty: beginner
objectives:
  - Represent sinusoidal signals using amplitude, frequency, and phase
  - Convert between different sinusoidal representations
  - Analyze periodic properties of sinusoidal signals
  - Understand the relationship between time and frequency domains
keyPoints:
  - Sinusoidal signals are characterized by amplitude, frequency, and phase
  - Sine and cosine are related by a 90-degree phase shift
  - The period is inversely related to frequency
  - Complex exponential representation simplifies sinusoidal analysis
---

# Sinusoidal Signals

## Introduction

Sinusoidal signals are the most fundamental type of periodic signals and serve as building blocks for all other signals through Fourier analysis. Understanding sinusoidal signals is essential for frequency-domain analysis, filter design, and communication systems.

## Standard Form

### Definition

A continuous-time sinusoidal signal is expressed as:

$$x(t) = A\cos(\omega_0 t + \phi)$$

where:
- $A$ is the **amplitude** (peak value)
- $\omega_0$ is the **angular frequency** in radians/second
- $\phi$ is the **phase** in radians
- $t$ is time in seconds

### Alternative Representations

**Using frequency $f_0$ (Hz):**
$$x(t) = A\cos(2\pi f_0 t + \phi)$$

**Using period $T_0$:**
$$x(t) = A\cos\left(\frac{2\pi t}{T_0} + \phi\right)$$

### Key Relationships

| Quantity | Symbol | Relationship |
|----------|--------|--------------|
| Period | $T_0$ | $T_0 = 1/f_0 = 2\pi/\omega_0$ |
| Frequency | $f_0$ | $f_0 = 1/T_0 = \omega_0/2\pi$ |
| Angular frequency | $\omega_0$ | $\omega_0 = 2\pi f_0 = 2\pi/T_0$ |

## Sine and Cosine Relationship

### Phase Shift Relationship

$$\sin(\theta) = \cos\left(\theta - \frac{\pi}{2}\right)$$

$$\cos(\theta) = \sin\left(\theta + \frac{\pi}{2}\right)$$

### General Conversion

Any sinusoid can be written in either form:

$$A\sin(\omega t + \phi_s) = A\cos(\omega t + \phi_c)$$

where $\phi_c = \phi_s - \pi/2$

### Phase Difference

The phase difference between two sinusoids of the same frequency determines their relative alignment:

| Phase Difference | Description |
|-----------------|-------------|
| $\phi_2 - \phi_1 = 0$ | In phase |
| $\phi_2 - \phi_1 = \pi/2$ | Quadrature (90°) |
| $\phi_2 - \phi_1 = \pi$ | Out of phase (180°) |

## Periodicity

### Period

A sinusoid is periodic with fundamental period:

$$T_0 = \frac{2\pi}{\omega_0} = \frac{1}{f_0}$$

### Verification

For any sinusoid:
$$x(t + T_0) = A\cos(\omega_0(t + T_0) + \phi)$$
$$= A\cos(\omega_0 t + \omega_0 T_0 + \phi)$$
$$= A\cos(\omega_0 t + 2\pi + \phi)$$
$$= A\cos(\omega_0 t + \phi) = x(t)$$

### Period of Combined Sinusoids

For $x(t) = A_1\cos(\omega_1 t) + A_2\cos(\omega_2 t)$:

The signal is periodic if and only if $\omega_1/\omega_2$ is rational.

If $\omega_1/\omega_2 = m/n$ (in lowest terms), the fundamental period is:

$$T_0 = n \cdot \frac{2\pi}{\omega_1} = m \cdot \frac{2\pi}{\omega_2}$$

### Example

**Problem:** Find the period of $x(t) = \cos(3t) + \sin(5t)$

**Solution:**
- $\omega_1 = 3$, $\omega_2 = 5$
- $\omega_1/\omega_2 = 3/5$ (rational)
- $T_1 = 2\pi/3$, $T_2 = 2\pi/5$
- $T_0 = 3 \times T_1 = 5 \times T_2 = 2\pi$

## Complex Exponential Representation

### Euler's Formula

$$e^{j\theta} = \cos(\theta) + j\sin(\theta)$$

### Inverse Relations

$$\cos(\theta) = \frac{e^{j\theta} + e^{-j\theta}}{2} = \text{Re}\{e^{j\theta}\}$$

$$\sin(\theta) = \frac{e^{j\theta} - e^{-j\theta}}{2j} = \text{Im}\{e^{j\theta}\}$$

### Complex Sinusoid

A complex exponential signal:

$$x(t) = Ae^{j(\omega_0 t + \phi)} = Ae^{j\phi}e^{j\omega_0 t}$$

This contains both cosine (real part) and sine (imaginary part) components.

### Advantages of Complex Representation

1. **Simplified arithmetic:** Multiplication adds phases
2. **Easy combination:** Addition of components
3. **Natural for Fourier analysis:** Foundation for spectral methods
4. **System analysis:** Eigenfunctions of LTI systems

## Phasor Representation

### Definition

A phasor is a complex number representing the amplitude and phase of a sinusoid:

$$\tilde{X} = Ae^{j\phi} = A\angle\phi$$

### Time Domain to Phasor

$$x(t) = A\cos(\omega t + \phi) \longrightarrow \tilde{X} = A\angle\phi$$

The frequency $\omega$ is implicit and must be specified separately.

### Phasor Operations

**Addition:**
Convert to rectangular form, add, convert back.

$$\tilde{X}_1 + \tilde{X}_2 = (X_1\cos\phi_1 + X_2\cos\phi_2) + j(X_1\sin\phi_1 + X_2\sin\phi_2)$$

**Multiplication:**
Multiply magnitudes, add angles.

$$\tilde{X}_1 \cdot \tilde{X}_2 = X_1X_2\angle(\phi_1 + \phi_2)$$

### Phasor Diagram

A phasor can be visualized as a rotating vector in the complex plane:
- Length = amplitude $A$
- Initial angle = phase $\phi$
- Angular velocity = frequency $\omega$

## Discrete-Time Sinusoids

### Definition

$$x[n] = A\cos(\Omega_0 n + \phi)$$

where $\Omega_0$ is the discrete angular frequency in radians/sample.

### Important Differences from CT

**1. Periodicity constraint:**
A discrete sinusoid is periodic only if:

$$\frac{\Omega_0}{2\pi} = \frac{k}{N} \quad \text{(rational number)}$$

where $N$ is the period (must be integer).

**2. Frequency range:**
Discrete frequencies are unique only in the range:

$$-\pi < \Omega_0 \leq \pi$$

or equivalently:
$$-\frac{f_s}{2} < f \leq \frac{f_s}{2}$$

**3. Aliasing:**
$$\cos(\Omega_0 n) = \cos((\Omega_0 + 2\pi k)n)$$

Frequencies differing by $2\pi$ are identical.

### Normalized Frequency

Normalizing by the sampling frequency:

$$\Omega = 2\pi \frac{f}{f_s}$$

or using normalized frequency:
$$F = \frac{f}{f_s} \quad \text{where } 0 \leq F < 1$$

## Sinusoidal Signal Properties

### Energy and Power

Sinusoids are **power signals** (not energy signals):

$$P = \frac{1}{T_0}\int_0^{T_0} |x(t)|^2 dt = \frac{A^2}{2}$$

RMS value: $X_{rms} = \frac{A}{\sqrt{2}}$

### Symmetry

**Even symmetry:** $x(t) = x(-t)$
- Pure cosine: $\phi = 0$

**Odd symmetry:** $x(t) = -x(-t)$
- Pure sine: $\phi = -\pi/2$ (when expressed as cosine)

## Summary

Sinusoidal signals are fundamental building blocks in signal processing, characterized by amplitude, frequency, and phase. They are periodic signals with well-defined energy and power properties. The complex exponential representation, based on Euler's formula, provides powerful tools for analysis and is the foundation for Fourier methods. Understanding sinusoids in both continuous and discrete time is essential for all frequency-domain analysis techniques.
