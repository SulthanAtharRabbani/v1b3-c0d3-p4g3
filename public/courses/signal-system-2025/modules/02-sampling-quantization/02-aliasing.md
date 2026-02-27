---
title: Aliasing
readingTime: 25
difficulty: intermediate
objectives:
  - Define aliasing and explain how it occurs
  - Analyze the frequency folding phenomenon in undersampling
  - Identify methods to prevent aliasing
  - Calculate alias frequencies for given sampling rates
keyPoints:
  - Aliasing occurs when sampling frequency is less than the Nyquist rate
  - High frequencies appear as lower frequencies (fold into baseband)
  - Aliasing causes irreversible distortion of the signal
  - Anti-aliasing filters prevent aliasing by limiting signal bandwidth
---

# Aliasing

## Introduction

Aliasing is one of the most important concepts in digital signal processing. It refers to the phenomenon where high-frequency components of a signal are misinterpreted as lower frequencies when the sampling rate is insufficient. Understanding aliasing is crucial for proper system design and signal analysis.

## What is Aliasing?

### Definition

**Aliasing** is the distortion that occurs when a signal is sampled at a rate lower than the Nyquist rate. In this case, different frequency components become indistinguishable from each other—they become "aliases" of one another.

### Mathematical Explanation

When we sample a signal at frequency $f_s$, frequencies above $f_s/2$ (the Nyquist frequency) are "folded" back into the range $[0, f_s/2]$:

$$f_{alias} = |f - kf_s|$$

where $k$ is chosen such that $f_{alias}$ falls within $[0, f_s/2]$.

## The Folding Diagram

### Nyquist Frequency

The **Nyquist frequency** is defined as:

$$f_N = \frac{f_s}{2}$$

This is the highest frequency that can be correctly represented at sampling rate $f_s$.

### Frequency Folding

Consider a signal with frequency $f$ sampled at rate $f_s$:

| Original Frequency | Apparent (Aliased) Frequency |
|-------------------|------------------------------|
| $0 < f < f_N$ | $f$ (no aliasing) |
| $f_N < f < f_s$ | $f_s - f$ (folds back) |
| $f_s < f < 3f_N$ | $f - f_s$ (second fold) |
| $3f_N < f < 2f_s$ | $2f_s - f$ (continues folding) |

### General Aliasing Formula

The apparent frequency after aliasing:

$$f_{apparent} = \left| f - \text{round}\left(\frac{f}{f_s}\right) \cdot f_s \right|$$

For the first folding zone:

$$f_{alias} = \begin{cases}
f, & 0 \leq f \leq f_N \\
f_s - f, & f_N < f \leq f_s
\end{cases}$$

## Visual Understanding of Aliasing

### Time Domain Perspective

When sampling a high-frequency sinusoid at too low a rate:

Consider $x(t) = \cos(2\pi f t)$ with $f > f_N$

The samples appear as if they came from a lower frequency:
$$x[n] = \cos(2\pi f nT_s) = \cos(2\pi f_{alias} nT_s)$$

### Example: 90 Hz Signal Sampled at 100 Hz

Given:
- Signal frequency: $f = 90$ Hz
- Sampling frequency: $f_s = 100$ Hz
- Nyquist frequency: $f_N = 50$ Hz

The aliased frequency:
$$f_{alias} = 100 - 90 = 10 \text{ Hz}$$

The 90 Hz signal appears as a 10 Hz signal!

## Spectrum of Sampled Signals

### Without Aliasing

When $f_s > 2f_{max}$:
- Original spectrum is preserved
- Replicas don't overlap
- Perfect reconstruction possible

### With Aliasing

When $f_s < 2f_{max}$:
- Spectral replicas overlap
- High-frequency components fold into baseband
- Information is permanently corrupted

## Preventing Aliasing

### Anti-Aliasing Filters

An **anti-aliasing filter** is a low-pass filter applied before sampling:

**Characteristics:**
- Passband: $[0, f_{pass}]$ where $f_{pass} < f_N$
- Transition band: $[f_{pass}, f_N]$
- Stopband: $[f_N, \infty)$ with sufficient attenuation

**Design considerations:**
- Sharper cutoff requires higher-order filters
- Practical filters have transition bands
- Choose $f_s > 2f_{pass}$ to allow transition bandwidth

### Oversampling

Sampling at a rate significantly higher than the Nyquist rate:
- Provides guard band between replicas
- Relaxes anti-aliasing filter requirements
- Improves signal-to-noise ratio

### Example: Audio Anti-Aliasing

For CD-quality audio ($f_s = 44.1$ kHz):

| Frequency Range | Specification |
|-----------------|---------------|
| 0 - 20 kHz | Passband (audio) |
| 20 - 22.05 kHz | Transition band |
| 22.05+ kHz | Stopband |

## Aliasing Calculations

### Example 1: Find the Aliased Frequency

**Problem:** A 35 kHz sinusoid is sampled at 40 kHz. What frequency will be observed?

**Solution:**
- $f_N = 40/2 = 20$ kHz
- $f = 35$ kHz $> f_N$
- $f_{alias} = |40 - 35| = 5$ kHz

A 35 kHz signal appears as 5 kHz!

### Example 2: Determine Maximum Aliased Frequency

**Problem:** What frequency range folds to 8 kHz when sampled at 24 kHz?

**Solution:**
First fold: $f_{alias} = f_s - f$
$$f = f_s - f_{alias} = 24 - 8 = 16 \text{ kHz}$$

Also: $f_{alias} = f$ for $f < f_N$
So $f = 8$ kHz (no aliasing)

Frequencies 8 kHz and 16 kHz both appear as 8 kHz.

## Applications and Uses of Aliasing

### Stroboscopic Effect

When observing rotating machinery with a strobe light:
- Appears stationary when flash rate equals rotation rate
- Slow rotation appears when flash rate slightly different

### Sampling Oscilloscopes

Used for measuring high-frequency signals:
- Deliberately undersample to convert high frequencies to low
- Requires periodic or repetitive signals

### Bandpass Sampling

Intentionally uses aliasing to sample bandpass signals at lower rates:
- Must carefully choose $f_s$ to avoid destructive overlap
- Used in software-defined radio

## Summary

Aliasing is the phenomenon where frequencies above the Nyquist frequency fold back into the baseband, causing distortion. It occurs when the sampling rate is insufficient relative to the signal bandwidth. Once aliasing occurs, the original signal cannot be recovered—making prevention through proper sampling rates and anti-aliasing filters essential. Understanding aliasing is critical for designing robust digital signal processing systems.
