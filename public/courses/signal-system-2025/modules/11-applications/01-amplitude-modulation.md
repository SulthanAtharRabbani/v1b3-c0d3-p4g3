---
title: Amplitude Modulation
readingTime: 25
difficulty: intermediate
objectives:
  - Understand AM modulation principles
  - Analyze AM in frequency domain
  - Calculate modulation index
  - Understand bandwidth requirements
keyPoints:
  - AM: s(t) = m(t)cos(ωct)
  - Spectrum shifts to carrier frequency
  - Modulation index determines efficiency
  - Bandwidth = 2 × message bandwidth
---

# Amplitude Modulation

Amplitude modulation (AM) is a fundamental communication technique where the amplitude of a high-frequency carrier is varied in proportion to the message signal.

## Principle of AM

### Time Domain

In amplitude modulation, the message signal $m(t)$ modulates the amplitude of a carrier signal:

$$s(t) = [A_c + m(t)]\cos(\omega_c t)$$

where:
- $A_c$ = carrier amplitude
- $m(t)$ = message (modulating) signal
- $\omega_c$ = carrier frequency

### Modulation Index

The modulation index $\mu$ measures the extent of modulation:

$$\mu = \frac{\max|m(t)|}{A_c}$$

For proper demodulation: $0 \leq \mu \leq 1$

### Frequency Domain

Using the modulation theorem:

$$s(t) \leftrightarrow S(\omega) = A_c\pi[\delta(\omega-\omega_c) + \delta(\omega+\omega_c)] + \frac{1}{2}[M(\omega-\omega_c) + M(\omega+\omega_c)]$$

The spectrum consists of:
- Carrier components at $\pm\omega_c$
- Two sidebands: upper (USB) and lower (LSB)

## Bandwidth

AM requires bandwidth:

$$B_{AM} = 2W$$

where $W$ is the message bandwidth.

## Power Efficiency

Total power in AM signal:
$$P_T = P_c(1 + \frac{\mu^2}{2})$$

Power in sidebands (information):
$$P_{SB} = P_c \cdot \frac{\mu^2}{2}$$

Efficiency:
$$\eta = \frac{\mu^2}{2 + \mu^2}$$

## Summary

AM is a simple but inefficient modulation method. The carrier contains no information but consumes significant power. Modern systems use more efficient variants like DSB-SC or SSB.
