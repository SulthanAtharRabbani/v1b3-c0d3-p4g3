---
title: Sampling Theory
readingTime: 28
difficulty: intermediate
objectives:
  - Define sampling and explain its role in signal processing
  - State and apply the Nyquist-Shannon sampling theorem
  - Calculate the sampling period and sampling frequency
  - Determine the minimum sampling rate for band-limited signals
keyPoints:
  - Sampling converts continuous-time signals to discrete-time signals
  - The Nyquist rate is twice the highest frequency component in the signal
  - Sampling frequency must exceed the Nyquist rate for perfect reconstruction
  - Band-limited signals can be perfectly reconstructed from samples
---

# Sampling Theory

## Introduction

Sampling is the process of converting a continuous-time signal into a discrete-time signal by taking measurements at regular time intervals. This process is fundamental to digital signal processing, as it allows analog signals to be represented, stored, and processed by digital systems.

## The Sampling Process

### Definition

Sampling involves measuring the amplitude of a continuous-time signal $x(t)$ at regular intervals called the **sampling period** $T_s$:

$$x[n] = x(nT_s)$$

where:
- $x(t)$ is the continuous-time signal
- $x[n]$ is the discrete-time signal (samples)
- $T_s$ is the sampling period
- $n$ is an integer index

### Sampling Frequency

The **sampling frequency** (or sampling rate) is the inverse of the sampling period:

$$f_s = \frac{1}{T_s}$$

measured in Hertz (Hz) or samples per second.

The **angular sampling frequency** is:

$$\omega_s = 2\pi f_s = \frac{2\pi}{T_s}$$

## Mathematical Model of Sampling

### Ideal Sampling

Ideal sampling can be modeled as multiplication by an impulse train:

$$x_s(t) = x(t) \cdot p(t)$$

where the impulse train is:

$$p(t) = \sum_{n=-\infty}^{\infty} \delta(t - nT_s)$$

This gives:

$$x_s(t) = \sum_{n=-\infty}^{\infty} x(nT_s) \delta(t - nT_s)$$

### Frequency Domain Analysis

The Fourier transform of the sampled signal reveals important spectral properties:

$$X_s(j\omega) = \frac{1}{T_s} \sum_{k=-\infty}^{\infty} X(j(\omega - k\omega_s))$$

This shows that sampling creates **replicas** of the original spectrum, shifted by multiples of the sampling frequency.

## The Nyquist-Shannon Sampling Theorem

### Statement

A band-limited signal $x(t)$ with maximum frequency $f_{max}$ can be perfectly reconstructed from its samples if:

$$f_s > 2f_{max}$$

This minimum sampling rate is called the **Nyquist rate**:

$$f_{Nyquist} = 2f_{max}$$

### Critical Sampling

When sampling at exactly the Nyquist rate:

$$f_s = 2f_{max}$$

Perfect reconstruction is theoretically possible but practically challenging due to the need for ideal filters.

### Oversampling and Undersampling

| Condition | Description | Result |
|-----------|-------------|--------|
| $f_s > 2f_{max}$ | Oversampling | Easy reconstruction, no aliasing |
| $f_s = 2f_{max}$ | Critical sampling | Theoretical reconstruction possible |
| $f_s < 2f_{max}$ | Undersampling | Aliasing occurs, loss of information |

## Band-Limited Signals

### Definition

A signal is **band-limited** if its Fourier transform is zero outside a finite frequency range:

$$X(j\omega) = 0 \quad \text{for } |\omega| > \omega_{max}$$

### Examples of Band-Limited Signals

1. **Telephone quality speech:** $f_{max} \approx 3.4$ kHz
2. **Audio CD:** $f_{max} = 20$ kHz
3. **Baseband video:** $f_{max} \approx 4.2$ MHz

### Practical Considerations

Real-world signals are rarely perfectly band-limited. In practice:
- Anti-aliasing filters limit bandwidth before sampling
- Guard bands are included in sampling frequency selection

## Reconstruction from Samples

### Ideal Reconstruction

Using an ideal low-pass filter with cutoff $\omega_c = \omega_s/2$:

$$x(t) = \sum_{n=-\infty}^{\infty} x(nT_s) \cdot \text{sinc}\left(\frac{t - nT_s}{T_s}\right)$$

where $\text{sinc}(x) = \frac{\sin(\pi x)}{\pi x}$

This is the **Whittaker-Shannon interpolation formula**.

### Practical Reconstruction

Practical systems use:
- Zero-order hold (ZOH)
- Linear interpolation
- Digital-to-analog converters (DACs)

## Sampling Example Calculations

### Example 1: Audio Signal

**Problem:** A speech signal has bandwidth 4 kHz. What is the minimum sampling rate?

**Solution:**
$$f_{Nyquist} = 2 \times 4 \text{ kHz} = 8 \text{ kHz}$$

Standard telephone sampling: $f_s = 8$ kHz

### Example 2: Music Signal

**Problem:** High-fidelity audio has bandwidth 20 kHz. Find the sampling rate.

**Solution:**
$$f_{Nyquist} = 2 \times 20 \text{ kHz} = 40 \text{ kHz}$$

CD standard uses: $f_s = 44.1$ kHz (10% margin)

### Example 3: Video Signal

**Problem:** A video signal has $f_{max} = 4.2$ MHz. Calculate Nyquist rate.

**Solution:**
$$f_{Nyquist} = 2 \times 4.2 \text{ MHz} = 8.4 \text{ MHz}$$

## Sampling of Different Signal Types

### Baseband Signals

For signals with spectrum from DC to $f_{max}$:
$$f_s > 2f_{max}$$

### Bandpass Signals

For signals with spectrum in $[f_L, f_H]$ where $f_L > 0$:

The bandwidth is $B = f_H - f_L$.

Bandpass sampling theorem:
$$\frac{2f_H}{n} \leq f_s \leq \frac{2f_L}{n-1}$$

where $n = \lfloor f_H/B \rfloor$

This allows sampling at rates lower than $2f_H$.

## Summary

Sampling theory provides the mathematical foundation for converting continuous-time signals to discrete-time representations. The Nyquist-Shannon theorem establishes that a band-limited signal can be perfectly reconstructed from its samples if the sampling frequency exceeds twice the maximum frequency. Understanding these principles is essential for designing digital signal processing systems and avoiding the distortion caused by aliasing.
