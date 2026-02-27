---
title: Quantization
readingTime: 27
difficulty: intermediate
objectives:
  - Define quantization and explain its purpose in signal processing
  - Calculate quantization levels and step sizes
  - Understand the difference between uniform and non-uniform quantization
  - Analyze quantization noise and signal-to-quantization-noise ratio
keyPoints:
  - Quantization maps continuous amplitude values to discrete levels
  - Uniform quantization uses equal step sizes throughout the range
  - Quantization introduces noise that cannot be removed
  - More quantization bits result in higher signal quality
---

# Quantization

## Introduction

While sampling converts a continuous-time signal to discrete-time, **quantization** converts continuous amplitude values to discrete amplitude levels. Together with sampling, quantization completes the analog-to-digital conversion process, enabling signals to be processed, stored, and transmitted by digital systems.

## What is Quantization?

### Definition

**Quantization** is the process of mapping a continuous range of input values to a finite set of output values. Each input amplitude is assigned to the nearest quantization level.

### Mathematical Representation

For an input signal $x$ with range $[x_{min}, x_{max}]$ divided into $L$ levels:

$$Q(x) = L_k \quad \text{where } L_k \text{ is the closest quantization level to } x$$

## Uniform Quantization

### Quantization Step Size

For uniform quantization with $L$ levels spanning range $R$:

$$\Delta = \frac{R}{L} = \frac{x_{max} - x_{min}}{L}$$

where $\Delta$ is the **quantization step size** (also called quantum or LSB).

### Quantization Levels

The quantization levels can be defined as:

**Mid-tread quantizer (includes zero):**
$$L_k = k\Delta, \quad k = -\frac{L-1}{2}, \ldots, 0, \ldots, \frac{L-1}{2}$$

**Mid-rise quantizer (zero is a threshold):**
$$L_k = \left(k + \frac{1}{2}\right)\Delta, \quad k = -\frac{L}{2}, \ldots, -1, 0, \ldots, \frac{L}{2}-1$$

### Number of Bits

The number of bits $N$ required to represent $L$ levels:

$$L = 2^N \quad \text{or} \quad N = \log_2 L$$

## Quantization Error

### Definition

Quantization error (or quantization noise) is the difference between the actual signal value and the quantized value:

$$e = x - Q(x)$$

### Error Range

For uniform quantization:
$$-\frac{\Delta}{2} \leq e \leq \frac{\Delta}{2}$$

The maximum error is $\Delta/2$.

### Error as Noise

Quantization error is modeled as additive noise:
$$x_q = x + e$$

where $e$ is approximated as uniformly distributed random noise.

## Quantization Noise Analysis

### Mean and Variance

For uniform quantization error:
- **Mean:** $E[e] = 0$ (assuming symmetric quantizer)
- **Variance:** $\sigma_e^2 = \frac{\Delta^2}{12}$

### Signal-to-Quantization-Noise Ratio (SQNR)

For a sinusoidal signal with amplitude $A$:

$$\text{SQNR} = \frac{P_{signal}}{P_{noise}} = \frac{A^2/2}{\Delta^2/12}$$

With $L = 2^N$ levels and full-scale range $2A$:
$$\Delta = \frac{2A}{L} = \frac{2A}{2^N}$$

Therefore:
$$\text{SQNR} = \frac{A^2/2}{(2A/2^N)^2/12} = \frac{3}{2} \cdot 2^{2N}$$

### SQNR in Decibels

$$\text{SQNR}_{dB} = 10\log_{10}\left(\frac{3}{2} \cdot 2^{2N}\right)$$

$$\text{SQNR}_{dB} \approx 6.02N + 1.76 \text{ dB}$$

**Rule of thumb:** Each additional bit adds approximately 6 dB to the SQNR.

### Example SQNR Values

| Bits (N) | SQNR (dB) | Application |
|----------|-----------|-------------|
| 8 | ~50 | Telephone speech |
| 12 | ~74 | Professional audio |
| 16 | ~98 | CD audio |
| 24 | ~146 | Studio recording |

## Pulse Code Modulation (PCM)

### Definition

**Pulse Code Modulation (PCM)** is the standard method for digitally representing sampled analog signals. It combines:
1. Sampling
2. Quantization
3. Binary encoding

### PCM Process

1. **Sample** the analog signal at rate $f_s$
2. **Quantize** each sample to $L = 2^N$ levels
3. **Encode** each quantized sample as $N$-bit binary code

### PCM Data Rate

The bit rate of PCM:

$$R = N \cdot f_s \quad \text{bits/second}$$

### Example: CD Audio

- Sampling rate: $f_s = 44.1$ kHz
- Bits per sample: $N = 16$
- Channels: 2 (stereo)

Bit rate:
$$R = 16 \times 44,100 \times 2 = 1,411,200 \text{ bps} \approx 1.4 \text{ Mbps}$$

## Non-Uniform Quantization

### Motivation

Uniform quantization is inefficient for signals with wide dynamic range:
- Small signals have poor SQNR
- Large signals may not need all levels

### Companding

**Companding** (COMpressing + exPANDING) uses non-uniform quantization:

**Transmit path:**
$$y = \text{compress}(x)$$

**Receive path:**
$$x = \text{expand}(y)$$

### μ-Law Companding (North America)

$$y = \text{sgn}(x) \frac{\ln(1 + \mu|x|)}{\ln(1 + \mu)}$$

where $\mu = 255$ (standard value)

### A-Law Companding (Europe)

$$y = \begin{cases}
\text{sgn}(x) \frac{A|x|}{1 + \ln(A)}, & |x| < \frac{1}{A} \\
\text{sgn}(x) \frac{1 + \ln(A|x|)}{1 + \ln(A)}, & \frac{1}{A} \leq |x| \leq 1
\end{cases}$$

where $A = 87.6$ (standard value)

### Benefits of Companding

- Improved SQNR for small signals
- Better dynamic range utilization
- Standard in telephony (8-bit achieves ~12-bit effective quality)

## Quantization Examples

### Example 1: 4-bit Quantization

**Problem:** Quantize the signal $x(t) = 5\sin(2\pi t)$ using 4-bit uniform quantization.

**Solution:**
- Range: $[-5, 5]$, so $R = 10$
- Levels: $L = 2^4 = 16$
- Step size: $\Delta = 10/16 = 0.625$
- Levels: $-4.6875, -4.0625, \ldots, 4.0625, 4.6875$

### Example 2: Calculating SQNR

**Problem:** Calculate SQNR for 12-bit quantization.

**Solution:**
$$\text{SQNR}_{dB} = 6.02 \times 12 + 1.76 = 72.24 + 1.76 = 74 \text{ dB}$$

## Summary

Quantization is the process of mapping continuous amplitude values to discrete levels, completing the analog-to-digital conversion process. Uniform quantization divides the amplitude range into equal steps, while non-uniform quantization (companding) provides better performance for signals with wide dynamic range. The quantization process introduces noise that limits the achievable signal quality, with each additional bit improving the SQNR by approximately 6 dB.
