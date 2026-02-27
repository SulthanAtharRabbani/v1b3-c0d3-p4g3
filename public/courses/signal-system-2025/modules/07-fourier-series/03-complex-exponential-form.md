---
title: Complex Exponential Form
readingTime: 25
difficulty: intermediate
objectives:
  - Express Fourier series in complex exponential form
  - Calculate complex Fourier coefficients cₙ
  - Convert between trigonometric and complex forms
  - Understand the relationship between positive and negative frequencies
keyPoints:
  - Complex exponential form uses e^(jnω₀t) instead of sines and cosines
  - The complex coefficients cₙ combine aₙ and bₙ information
  - Positive and negative frequencies appear as complex conjugate pairs
  - The complex form is more compact and easier to manipulate
---

# Complex Exponential Form

## Introduction

While the trigonometric Fourier series uses sines and cosines, the complex exponential form provides a more elegant and mathematically convenient representation. This form uses complex exponentials as basis functions and leads naturally to the Fourier Transform for non-periodic signals.

## Complex Exponential Representation

### The Complex Fourier Series

A periodic signal can be expressed as:

$$x(t) = \sum_{n=-\infty}^{\infty} c_n e^{jn\omega_0 t}$$

where $c_n$ are the **complex Fourier coefficients**.

### Key Features

1. **Sum extends from $-\infty$ to $+\infty$**: Includes both positive and negative frequencies
2. **Single coefficient per frequency**: $c_n$ contains both magnitude and phase information
3. **Compact form**: One formula replaces multiple trigonometric terms

## Calculating Complex Coefficients

### Formula for cₙ

$$c_n = \frac{1}{T_0}\int_{T_0} x(t) e^{-jn\omega_0 t} \, dt$$

where the integration is over one complete period.

### Properties of cₙ

For real signals:

$$c_{-n} = c_n^*$$

where $c_n^*$ denotes the complex conjugate.

This means:
- If $c_n = |c_n|e^{j\phi_n}$, then $c_{-n} = |c_n|e^{-j\phi_n}$
- Positive and negative frequency coefficients are complex conjugates

## Relationship to Trigonometric Form

### Conversion Formulas

**From trigonometric to complex:**

$$c_0 = a_0$$

$$c_n = \frac{a_n - jb_n}{2}, \quad n > 0$$

$$c_n = \frac{a_{-n} + jb_{-n}}{2}, \quad n < 0$$

**From complex to trigonometric:**

$$a_0 = c_0$$

$$a_n = 2\text{Re}\{c_n\} = c_n + c_{-n}, \quad n > 0$$

$$b_n = -2\text{Im}\{c_n\} = j(c_n - c_{-n}), \quad n > 0$$

### Magnitude and Phase

$$|c_n| = \frac{1}{2}\sqrt{a_n^2 + b_n^2} = \frac{c_n}{2}$$

$$\angle c_n = -\phi_n = -\arctan\left(\frac{b_n}{a_n}\right)$$

## Derivation from Trigonometric Form

Starting with the trigonometric series:

$$x(t) = a_0 + \sum_{n=1}^{\infty}\left[a_n\cos(n\omega_0 t) + b_n\sin(n\omega_0 t)\right]$$

Using Euler's formula:
$$\cos(\theta) = \frac{e^{j\theta} + e^{-j\theta}}{2}$$
$$\sin(\theta) = \frac{e^{j\theta} - e^{-j\theta}}{2j}$$

Substituting:
$$x(t) = a_0 + \sum_{n=1}^{\infty}\left[a_n\frac{e^{jn\omega_0 t} + e^{-jn\omega_0 t}}{2} + b_n\frac{e^{jn\omega_0 t} - e^{-jn\omega_0 t}}{2j}\right]$$

Simplifying:
$$x(t) = a_0 + \sum_{n=1}^{\infty}\left[\frac{a_n - jb_n}{2}e^{jn\omega_0 t} + \frac{a_n + jb_n}{2}e^{-jn\omega_0 t}\right]$$

Defining $c_n = \frac{a_n - jb_n}{2}$ for $n > 0$:
$$x(t) = \sum_{n=-\infty}^{\infty} c_n e^{jn\omega_0 t}$$

## Worked Examples

### Example 1: Square Wave

**Signal:**
$$x(t) = \begin{cases}
1, & 0 < t < T_0/2 \\
-1, & T_0/2 < t < T_0
\end{cases}$$

**Calculate $c_n$:**

$$c_n = \frac{1}{T_0}\int_0^{T_0} x(t)e^{-jn\omega_0 t} dt$$

$$= \frac{1}{T_0}\left[\int_0^{T_0/2} e^{-jn\omega_0 t} dt - \int_{T_0/2}^{T_0} e^{-jn\omega_0 t} dt\right]$$

$$= \frac{1}{T_0}\left[\frac{e^{-jn\omega_0 t}}{-jn\omega_0}\right]_0^{T_0/2} - \frac{1}{T_0}\left[\frac{e^{-jn\omega_0 t}}{-jn\omega_0}\right]_{T_0/2}^{T_0}$$

$$= \frac{1}{jn\pi}(e^{-jn\pi} - 1) - \frac{1}{jn\pi}(e^{-jn2\pi} - e^{-jn\pi})$$

Since $e^{-jn2\pi} = 1$:

$$c_n = \frac{1}{jn\pi}(2e^{-jn\pi} - 2) = \frac{2}{jn\pi}(e^{-jn\pi} - 1)$$

For odd $n$: $e^{-jn\pi} = -1$, so $c_n = \frac{-4}{jn\pi} = \frac{4j}{n\pi}$

For even $n$: $e^{-jn\pi} = 1$, so $c_n = 0$

**Result:**
$$x(t) = \sum_{k=-\infty}^{\infty} \frac{2j}{(2k+1)\pi} e^{j(2k+1)\omega_0 t}$$

### Example 2: Cosine Signal

**Signal:** $x(t) = A\cos(\omega_0 t)$

**Using Euler's formula directly:**
$$x(t) = \frac{A}{2}e^{j\omega_0 t} + \frac{A}{2}e^{-j\omega_0 t}$$

**Coefficients:**
- $c_1 = A/2$
- $c_{-1} = A/2$
- $c_n = 0$ for $n \neq \pm 1$

### Example 3: Sine Signal

**Signal:** $x(t) = A\sin(\omega_0 t)$

**Using Euler's formula:**
$$x(t) = \frac{A}{2j}e^{j\omega_0 t} - \frac{A}{2j}e^{-j\omega_0 t}$$

**Coefficients:**
- $c_1 = -jA/2$
- $c_{-1} = jA/2$
- $c_n = 0$ for $n \neq \pm 1$

## Spectrum Interpretation

### Two-Sided Spectrum

The complex Fourier series gives a **two-sided spectrum**:

| Frequency | Coefficient | Interpretation |
|-----------|-------------|----------------|
| $-\omega_0$ | $c_{-1}$ | Negative frequency component |
| 0 | $c_0$ | DC component |
| $\omega_0$ | $c_1$ | Fundamental component |
| $2\omega_0$ | $c_2$ | Second harmonic |
| $n\omega_0$ | $c_n$ | n-th harmonic |

### Magnitude and Phase Spectra

**Magnitude spectrum:** Plot of $|c_n|$ vs. $n\omega_0$

**Phase spectrum:** Plot of $\angle c_n$ vs. $n\omega_0$

For real signals:
- Magnitude spectrum is even: $|c_{-n}| = |c_n|$
- Phase spectrum is odd: $\angle c_{-n} = -\angle c_n$

## Parseval's Theorem

For the complex Fourier series:

$$\frac{1}{T_0}\int_{T_0} |x(t)|^2 dt = \sum_{n=-\infty}^{\infty} |c_n|^2$$

This relates signal power to the sum of squared coefficient magnitudes.

## Advantages of Complex Form

1. **Mathematical elegance:** Single formula for coefficients
2. **Easier manipulation:** Algebraic operations are simpler
3. **Natural extension:** Leads to Fourier Transform
4. **System analysis:** LTI system response is easier to compute
5. **Spectral interpretation:** Clear magnitude and phase representation

## Summary

The complex exponential form of the Fourier series provides a compact and mathematically elegant representation of periodic signals. The coefficients $c_n$ contain both magnitude and phase information at each harmonic frequency. For real signals, the coefficients at positive and negative frequencies form complex conjugate pairs. This representation naturally extends to the Fourier Transform for non-periodic signals and is the standard form used in modern signal processing.
