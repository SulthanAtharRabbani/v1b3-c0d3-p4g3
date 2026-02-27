---
title: "Common Fourier Transform Pairs"
readingTime: 28
difficulty: "intermediate"
objectives:
  - "Memorize and apply the most common Fourier transform pairs"
  - "Understand the relationship between time-domain signals and their frequency spectra"
  - "Use Fourier transform tables to solve signal processing problems"
  - "Derive Fourier transforms for basic signals from first principles"
keyPoints:
  - "The impulse function transforms to a constant (flat spectrum)"
  - "A rectangular pulse transforms to a sinc function and vice versa (duality)"
  - "Exponential signals transform to rational functions in frequency"
  - "The Gaussian function transforms to another Gaussian (unique property)"
---

## Introduction to Fourier Transform Pairs

A Fourier transform pair consists of a time-domain signal x(t) and its frequency-domain representation X(ω). Memorizing common transform pairs is essential for efficient signal analysis, as it allows us to quickly move between time and frequency domains without performing integration each time.

## Essential Fourier Transform Pairs

### 1. Impulse Function (Delta Function)

The impulse function δ(t) is the most fundamental signal in signal processing. Its Fourier transform is:

$$\delta(t) \xleftrightarrow{\mathcal{F}} 1$$

**Derivation**:

$$\mathcal{F}\{\delta(t)\} = \int_{-\infty}^{\infty} \delta(t) e^{-j\omega t} dt = e^{-j\omega \cdot 0} = 1$$

The impulse has a flat frequency spectrum, meaning it contains all frequencies with equal magnitude. This is why impulses are used to test system frequency responses.

**Duality**: Similarly:

$$1 \xleftrightarrow{\mathcal{F}} 2\pi\delta(\omega)$$

A constant signal (DC) contains only zero frequency.

### 2. Rectangular Pulse and Sinc Function

A rectangular pulse of width τ centered at t=0:

$$\text{rect}\left(\frac{t}{\tau}\right) = \begin{cases} 1 & |t| < \tau/2 \\ 0 & |t| > \tau/2 \end{cases}$$

has the Fourier transform:

$$\text{rect}\left(\frac{t}{\tau}\right) \xleftrightarrow{\mathcal{F}} \tau \cdot \text{sinc}\left(\frac{\omega\tau}{2\pi}\right) = \frac{\sin(\omega\tau/2)}{\omega/\tau}$$

**Key Observations**:
- The spectrum is a sinc function with zero crossings at $\omega = \pm \frac{2\pi n}{\tau}$
- Narrower pulses have wider spectra (inverse relationship)
- The main lobe width is inversely proportional to pulse width

### 3. Decaying Exponential

For a causal exponential with a > 0:

$$e^{-at}u(t), \quad a > 0 \xleftrightarrow{\mathcal{F}} \frac{1}{a + j\omega}$$

**Derivation**:

$$X(\omega) = \int_0^{\infty} e^{-at} e^{-j\omega t} dt = \int_0^{\infty} e^{-(a+j\omega)t} dt = \frac{1}{a + j\omega}$$

**Magnitude and Phase**:

$$|X(\omega)| = \frac{1}{\sqrt{a^2 + \omega^2}}$$

$$\angle X(\omega) = -\arctan\left(\frac{\omega}{a}\right)$$

### 4. Two-Sided Exponential

$$e^{-a|t|}, \quad a > 0 \xleftrightarrow{\mathcal{F}} \frac{2a}{a^2 + \omega^2}$$

This transform is purely real and even, reflecting the even symmetry of the time-domain signal.

### 5. Sinusoidal Signals

Sinusoids are not absolutely integrable but have Fourier transforms in the generalized sense:

$$\cos(\omega_0 t) \xleftrightarrow{\mathcal{F}} \pi[\delta(\omega - \omega_0) + \delta(\omega + \omega_0)]$$

$$\sin(\omega_0 t) \xleftrightarrow{\mathcal{F}} j\pi[\delta(\omega + \omega_0) - \delta(\omega - \omega_0)]$$

**Interpretation**: A sinusoid at frequency ω₀ contains exactly two frequency components: one at +ω₀ and one at -ω₀.

### 6. Complex Exponential

$$e^{j\omega_0 t} \xleftrightarrow{\mathcal{F}} 2\pi\delta(\omega - \omega_0)$$

A complex exponential has a single frequency component. This is why complex exponentials are eigenfunctions of LTI systems.

### 7. Gaussian Function

The Gaussian function has the unique property that its Fourier transform is also Gaussian:

$$e^{-at^2}, \quad a > 0 \xleftrightarrow{\mathcal{F}} \sqrt{\frac{\pi}{a}} e^{-\omega^2/(4a)}$$

**Significance**: The Gaussian function is the only function that is its own Fourier transform (up to scaling). It achieves the minimum time-bandwidth product, making it optimal in terms of time-frequency concentration.

### 8. Unit Step Function

The unit step function has the transform:

$$u(t) \xleftrightarrow{\mathcal{F}} \pi\delta(\omega) + \frac{1}{j\omega}$$

This consists of:
- An impulse at ω = 0 (representing the DC component)
- An odd imaginary component representing the step transition

### 9. Sign Function

$$\text{sgn}(t) = \begin{cases} 1 & t > 0 \\ -1 & t < 0 \end{cases} \xleftrightarrow{\mathcal{F}} \frac{2}{j\omega}$$

### 10. Triangular Pulse

$$\Lambda\left(\frac{t}{\tau}\right) = \begin{cases} 1 - \frac{|t|}{\tau} & |t| < \tau \\ 0 & |t| > \tau \end{cases} \xleftrightarrow{\mathcal{F}} \tau \cdot \text{sinc}^2\left(\frac{\omega\tau}{2\pi}\right)$$

The triangular pulse transforms to a sinc² function. Note that this is the convolution of two rectangular pulses, and the transform is the product of two sinc functions.

## Summary Table of Common Pairs

| Time Domain x(t) | Frequency Domain X(ω) |
|------------------|----------------------|
| δ(t) | 1 |
| 1 | 2πδ(ω) |
| rect(t/τ) | τ·sinc(ωτ/2π) |
| e^(-at)u(t), a>0 | 1/(a+jω) |
| e^(-a\|t\|), a>0 | 2a/(a²+ω²) |
| cos(ω₀t) | π[δ(ω-ω₀)+δ(ω+ω₀)] |
| sin(ω₀t) | jπ[δ(ω+ω₀)-δ(ω-ω₀)] |
| e^(jω₀t) | 2πδ(ω-ω₀) |
| e^(-at²), a>0 | √(π/a)·e^(-ω²/4a) |
| u(t) | πδ(ω) + 1/(jω) |

## Practical Applications

Understanding these transform pairs is crucial for:

1. **Filter Design**: Knowing how different signals appear in frequency domain helps design appropriate filters.

2. **Spectral Analysis**: Identifying the frequency content of signals for communication systems.

3. **System Response**: Computing system outputs using frequency-domain techniques.

4. **Signal Synthesis**: Creating signals with desired spectral characteristics.

In the next lesson, we will explore the inverse Fourier transform, which allows us to reconstruct time-domain signals from their frequency-domain representations.
