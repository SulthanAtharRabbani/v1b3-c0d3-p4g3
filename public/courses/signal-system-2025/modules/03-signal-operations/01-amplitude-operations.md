---
title: Amplitude Operations
readingTime: 25
difficulty: beginner
objectives:
  - Define and apply amplitude offset (DC bias) to signals
  - Perform amplitude scaling (gain) operations
  - Add and subtract multiple signals
  - Multiply signals and understand the concept of modulation
keyPoints:
  - Amplitude offset adds a constant value to all signal amplitudes
  - Gain operation multiplies signal amplitude by a constant factor
  - Signal addition combines signals point-by-point
  - Signal multiplication is used in modulation and windowing
---

# Amplitude Operations

## Introduction

Amplitude operations modify the magnitude values of signals without changing the time variable. These fundamental operations include adding constants, scaling, adding signals together, and multiplying signals. Understanding amplitude operations is essential for signal conditioning, modulation, and signal processing applications.

## Amplitude Offset (DC Bias)

### Definition

Adding a constant value to a signal shifts all amplitude values by that constant:

$$y(t) = x(t) + C$$

where $C$ is the DC offset or bias.

### Effects of Offset

| Original Signal | After Offset | Effect |
|-----------------|--------------|--------|
| Centered at 0 | Centered at $C$ | Vertical shift |
| Symmetric about 0 | Shifted symmetry | Changes DC component |

### Example

For signal $x(t) = 2\sin(t)$:
- Original range: $[-2, 2]$
- After offset +3: $y(t) = 2\sin(t) + 3$
- New range: $[1, 5]$

### DC Component

The DC (Direct Current) component is the average value of a signal:

$$\bar{x} = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} x(t) \, dt$$

For periodic signals:
$$\bar{x} = \frac{1}{T_0} \int_{0}^{T_0} x(t) \, dt$$

### Applications of Offset

1. **Biased signals:** Ensuring signals stay positive for single-supply circuits
2. **Level shifting:** Adapting signal ranges between systems
3. **DC removal:** Subtracting the mean value to center a signal

## Amplitude Scaling (Gain)

### Definition

Multiplying a signal by a constant factor:

$$y(t) = A \cdot x(t)$$

where $A$ is the gain (or attenuation if $|A| < 1$).

### Effects of Scaling

| Gain Value | Effect |
|------------|--------|
| $A > 1$ | Amplification |
| $0 < A < 1$ | Attenuation |
| $A = -1$ | Inversion (phase reversal) |
| $A < 0$ | Inversion + scaling |

### Example

For signal $x(t) = \sin(t)$ with gain $A = 3$:
$$y(t) = 3\sin(t)$$

The peak amplitude changes from 1 to 3.

### Gain in Decibels

Gain is often expressed in decibels:

$$G_{dB} = 20\log_{10}\left(\frac{y}{x}\right) = 20\log_{10}|A|$$

**Common values:**

| Linear Gain | Gain (dB) |
|-------------|-----------|
| 10 | 20 dB |
| 2 | ~6 dB |
| 1 | 0 dB |
| 0.5 | -6 dB |
| 0.1 | -20 dB |

### Combined Offset and Gain

Combining both operations:

$$y(t) = A \cdot x(t) + C$$

This is the general form of an affine transformation in amplitude.

## Signal Addition

### Definition

Adding two signals point-by-point:

$$y(t) = x_1(t) + x_2(t)$$

### Properties

For continuous-time signals, addition is:
- **Commutative:** $x_1(t) + x_2(t) = x_2(t) + x_1(t)$
- **Associative:** $(x_1(t) + x_2(t)) + x_3(t) = x_1(t) + (x_2(t) + x_3(t))$

### Superposition of Sinusoids

Adding sinusoids with the same frequency:

$$A_1\cos(\omega t + \phi_1) + A_2\cos(\omega t + \phi_2) = A\cos(\omega t + \phi)$$

where:
$$A = \sqrt{A_1^2 + A_2^2 + 2A_1A_2\cos(\phi_1 - \phi_2)}$$

$$\phi = \arctan\left(\frac{A_1\sin\phi_1 + A_2\sin\phi_2}{A_1\cos\phi_1 + A_2\cos\phi_2}\right)$$

### Example: Adding Sinusoids

$$x(t) = 3\cos(\omega t) + 4\sin(\omega t)$$

Since $\sin(\omega t) = \cos(\omega t - \pi/2)$:

$$A = \sqrt{3^2 + 4^2} = 5$$

$$\phi = \arctan\left(\frac{-4}{3}\right) \approx -53.1°$$

$$x(t) = 5\cos(\omega t - 53.1°)$$

### Applications of Addition

1. **Mixing:** Combining audio signals
2. **Superposition:** Response of linear systems to multiple inputs
3. **Fourier synthesis:** Reconstructing signals from frequency components

## Signal Subtraction

### Definition

$$y(t) = x_1(t) - x_2(t)$$

This is equivalent to adding the inverted second signal:

$$y(t) = x_1(t) + (-1) \cdot x_2(t)$$

### Applications

1. **Difference signals:** Error detection, noise cancellation
2. **Differential amplification:** Removing common-mode signals
3. **Derivative approximation:** $x(t) - x(t-\Delta t)$

## Signal Multiplication

### Definition

Multiplying two signals point-by-point:

$$y(t) = x_1(t) \cdot x_2(t)$$

### Properties

Multiplication is:
- **Commutative:** $x_1(t) \cdot x_2(t) = x_2(t) \cdot x_1(t)$
- **Associative:** $(x_1(t) \cdot x_2(t)) \cdot x_3(t) = x_1(t) \cdot (x_2(t) \cdot x_3(t))$
- **Distributive over addition:** $x_1(t) \cdot (x_2(t) + x_3(t)) = x_1(t) \cdot x_2(t) + x_1(t) \cdot x_3(t)$

### Modulation

Multiplying a signal by a sinusoid (carrier):

$$y(t) = x(t) \cdot \cos(\omega_c t)$$

This shifts the spectrum of $x(t)$ to frequencies centered at $\omega_c$.

### Example: Amplitude Modulation

For a message signal $m(t)$ and carrier $c(t) = \cos(\omega_c t)$:

$$s(t) = m(t) \cos(\omega_c t)$$

The modulated signal $s(t)$ has spectral components at $\omega_c \pm \omega_m$.

### Windowing

Multiplying a signal by a window function:

$$y(t) = x(t) \cdot w(t)$$

Common windows:
- Rectangular window
- Hamming window
- Hanning window

### Product of Sinusoids

$$\cos(A)\cos(B) = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$$

$$\sin(A)\sin(B) = \frac{1}{2}[\cos(A-B) - \cos(A+B)]$$

$$\sin(A)\cos(B) = \frac{1}{2}[\sin(A+B) + \sin(A-B)]$$

## Amplitude Operations Summary

| Operation | Formula | Effect |
|-----------|---------|--------|
| Offset | $y(t) = x(t) + C$ | Vertical shift |
| Scaling | $y(t) = A \cdot x(t)$ | Amplification/attenuation |
| Addition | $y(t) = x_1(t) + x_2(t)$ | Signal combination |
| Subtraction | $y(t) = x_1(t) - x_2(t)$ | Difference signal |
| Multiplication | $y(t) = x_1(t) \cdot x_2(t)$ | Modulation/windowing |

## Summary

Amplitude operations are fundamental tools for signal manipulation. Offset and scaling operations modify individual signal values, while addition and multiplication combine multiple signals. These operations form the basis for signal conditioning, modulation schemes, and various signal processing techniques. Understanding how these operations affect signals in both time and frequency domains is essential for designing and analyzing signal processing systems.
