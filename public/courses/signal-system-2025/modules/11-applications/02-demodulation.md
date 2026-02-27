---
title: Demodulation
readingTime: 25
difficulty: intermediate
objectives:
  - Understand demodulation principles
  - Compare envelope and synchronous detection
  - Analyze demodulation in frequency domain
  - Understand carrier recovery
keyPoints:
  - Demodulation extracts message from modulated signal
  - Envelope detection for AM with carrier
  - Synchronous detection for DSB-SC
  - Carrier recovery is critical for coherent detection
---

# Demodulation

Demodulation is the process of recovering the original message signal from the modulated carrier at the receiver.

## Types of Demodulation

### Envelope Detection

Used for standard AM with carrier:

$$s(t) = [A_c + m(t)]\cos(\omega_c t)$$

The envelope of the modulated signal follows $A_c + m(t)$:

1. Rectify the signal (remove negative half)
2. Low-pass filter to remove carrier ripple
3. Remove DC component

**Advantages**: Simple, low cost
**Disadvantages**: Only works for $\mu \leq 1$, wastes power on carrier

### Synchronous Detection

Used for DSB-SC and SSB:

1. Multiply received signal by local carrier: $s(t) \cdot \cos(\omega_c t)$
2. Low-pass filter the result

Mathematically:
$$s(t)\cos(\omega_c t) = m(t)\cos^2(\omega_c t) = \frac{m(t)}{2}[1 + \cos(2\omega_c t)]$$

After LPF: $\frac{m(t)}{2}$ (original message recovered)

## Summary

Demodulation recovers the message from modulated signals. The choice of demodulation method depends on the modulation type and system requirements.
