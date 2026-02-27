---
title: Signal Classification
readingTime: 25
difficulty: beginner
objectives:
  - Distinguish between continuous-time and discrete-time signals
  - Differentiate analog and digital signals
  - Identify periodic and aperiodic signals
  - Classify signals as energy or power type
keyPoints:
  - Time domain: continuous vs discrete
  - Amplitude domain: analog vs digital
  - Periodicity: periodic signals repeat
  - Energy/power classification affects analysis methods
---

# Signal Classification

Signals can be classified according to various characteristics. Understanding these classifications helps in selecting appropriate analysis techniques and understanding how signals are processed in different systems.

## Continuous-Time vs. Discrete-Time Signals

### Continuous-Time Signals

A continuous-time signal is defined for all real values of time:

$$x(t), \quad t \in \mathbb{R}$$

The independent variable $t$ can take any value within a continuous interval. Examples include:
- Audio waveforms from microphones
- Temperature variations
- Voltage signals from analog circuits

**Graphical representation**: Plotted as a smooth curve with no breaks.

### Discrete-Time Signals

A discrete-time signal is defined only at discrete instants of time:

$$x[n], \quad n \in \mathbb{Z}$$

The signal values are only specified at integer values of $n$ (sample indices). Discrete-time signals often result from sampling continuous-time signals:

$$x[n] = x(nT_s)$$

where $T_s$ is the sampling period.

**Graphical representation**: Plotted as a stem plot (vertical lines with dots at the top).

## Analog vs. Digital Signals

### Analog Signals

An analog signal has a continuous amplitude that can take any value within a range:

$$x(t) \in [x_{min}, x_{max}]$$

The amplitude varies smoothly and has infinite precision in theory.

### Digital Signals

A digital signal has amplitudes restricted to a finite set of discrete values:

$$x[n] \in \{L_0, L_1, L_2, ..., L_{N-1}\}$$

where $N$ is typically a power of 2 (e.g., $N = 256$ for 8-bit quantization).

### Classification Matrix

| Time | Amplitude | Signal Type |
|------|-----------|-------------|
| Continuous | Continuous | Analog (CT) |
| Discrete | Continuous | Sampled (DT) |
| Continuous | Discrete | Quantized |
| Discrete | Discrete | Digital |

## Periodic vs. Aperiodic Signals

### Periodic Signals

A signal $x(t)$ is periodic if there exists a positive constant $T_0$ such that:

$$x(t) = x(t + T_0) \quad \text{for all } t$$

The smallest such $T_0$ is called the **fundamental period**.

**Examples:**
- Sinusoidal signal: $x(t) = A\sin(\omega_0 t + \phi)$ with period $T_0 = \frac{2\pi}{\omega_0}$
- Square wave with period $T_0$
- Sawtooth wave with period $T_0$

### Aperiodic (Non-periodic) Signals

A signal that does not satisfy the periodicity condition is aperiodic. Examples include:
- Exponential decay: $x(t) = e^{-at}u(t)$
- Single pulse signals
- Random noise signals
- Speech signals (generally)

### Periodicity in Discrete-Time

For discrete-time signals:

$$x[n] = x[n + N] \quad \text{for all } n$$

where $N$ is an integer representing the period (in samples).

## Even and Odd Signals

### Even Signals

A signal is even if:

$$x(t) = x(-t)$$

Even signals are symmetric about the vertical axis. Example: $x(t) = \cos(\omega t)$

### Odd Signals

A signal is odd if:

$$x(t) = -x(-t)$$

Odd signals are antisymmetric about the origin. Example: $x(t) = \sin(\omega t)$

### Decomposition

Any signal can be decomposed into even and odd parts:

$$x(t) = x_e(t) + x_o(t)$$

where:
$$x_e(t) = \frac{1}{2}[x(t) + x(-t)]$$
$$x_o(t) = \frac{1}{2}[x(t) - x(-t)]$$

## Deterministic vs. Random Signals

### Deterministic Signals

Deterministic signals can be completely described by a mathematical function. Given the function, the value at any time can be predicted exactly.

**Examples:** Sinusoids, exponential functions, step functions.

### Random Signals

Random (stochastic) signals cannot be predicted exactly and are described by statistical properties.

**Examples:** Thermal noise, quantization noise, speech signals (in some contexts).

## Energy vs. Power Signals

### Energy Signals

A signal is an energy signal if:

$$E = \int_{-\infty}^{\infty} |x(t)|^2 dt < \infty$$

Energy signals have finite total energy. Examples: pulses, decaying exponentials.

### Power Signals

A signal is a power signal if:

$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 dt < \infty$$

Power signals have finite average power but infinite energy. Examples: periodic signals, constant signals.

## Causal vs. Non-causal Signals

### Causal Signals

A signal is causal if:

$$x(t) = 0 \quad \text{for } t < 0$$

The signal has no values before $t = 0$.

### Anti-causal Signals

A signal is anti-causal if:

$$x(t) = 0 \quad \text{for } t > 0$$

### Non-causal Signals

Signals with values on both sides of $t = 0$ are non-causal.

## Summary

Signal classification is essential for selecting appropriate analysis methods. Key classifications include: continuous-time vs. discrete-time (time domain), analog vs. digital (amplitude domain), periodic vs. aperiodic (repetition), and energy vs. power (finite energy vs. finite power). Understanding these classifications helps in system design and signal processing.
