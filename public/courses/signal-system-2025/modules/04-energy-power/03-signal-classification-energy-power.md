---
title: Signal Classification by Energy and Power
readingTime: 25
difficulty: intermediate
objectives:
  - Classify signals based on energy and power characteristics
  - Identify whether a signal is an energy signal, power signal, or neither
  - Analyze periodic and aperiodic signals for classification
  - Apply classification criteria to practical examples
keyPoints:
  - Signals can be energy signals, power signals, both, or neither
  - Energy signals have finite energy and zero power
  - Power signals have finite power and infinite energy
  - Some signals are neither energy nor power signals
---

# Signal Classification by Energy and Power

## Introduction

Classifying signals based on their energy and power characteristics is fundamental in signal processing. This classification determines appropriate analysis techniques and helps predict system behavior.

## Classification Categories

Signals are classified into four categories based on their energy $E$ and power $P$:

| Category | Energy (E) | Power (P) | Examples |
|----------|------------|-----------|----------|
| Energy Signal | $0 < E < \infty$ | $P = 0$ | Pulses, decaying exponentials |
| Power Signal | $E = \infty$ | $0 < P < \infty$ | Periodic signals, step function |
| Both | $E = \infty$ | $P = 0$ | Not physically possible |
| Neither | $E = \infty$ | $P = \infty$ | $x(t) = t$, $x(t) = e^{at}$ ($a > 0$) |

## Energy Signals

### Characteristics

Energy signals satisfy:
- Finite total energy: $0 < E < \infty$
- Zero average power: $P = 0$

These signals must decay to zero as time approaches infinity.

### Common Examples

**1. Rectangular Pulse:**
$$x(t) = \begin{cases} A, & |t| \leq T \\ 0, & |t| > T \end{cases}$$
Energy: $E = 2A^2T$

**2. Triangular Pulse:**
$$x(t) = \begin{cases} A(1 - |t|/T), & |t| \leq T \\ 0, & |t| > T \end{cases}$$
Energy: $E = \frac{2A^2T}{3}$

**3. Decaying Exponential:**
$$x(t) = Ae^{-at}u(t), \quad a > 0$$
Energy: $E = \frac{A^2}{2a}$

**4. Gaussian Pulse:**
$$x(t) = Ae^{-at^2}$$
Energy: $E = A^2\sqrt{\frac{\pi}{2a}}$

## Power Signals

### Characteristics

Power signals satisfy:
- Finite average power: $0 < P < \infty$
- Infinite total energy: $E = \infty$

These signals typically persist indefinitely with bounded amplitude.

### Common Examples

**1. Sinusoids:**
$$x(t) = A\cos(\omega_0 t + \phi)$$
Power: $P = \frac{A^2}{2}$

**2. Complex Exponentials:**
$$x(t) = Ae^{j\omega_0 t}$$
Power: $P = A^2$

**3. Unit Step:**
$$x(t) = u(t)$$
Power: $P = \frac{1}{2}$

**4. Periodic Square Wave:**
$$x(t) = A \cdot \text{sgn}(\sin(\omega_0 t))$$
Power: $P = A^2$

## Signals That Are Neither

Some signals have neither finite energy nor finite power:

**1. Ramp Function:**
$$x(t) = tu(t)$$
Both $E = \infty$ and $P = \infty$

**2. Growing Exponential:**
$$x(t) = e^{at}u(t), \quad a > 0$$
Both $E = \infty$ and $P = \infty$

**3. Unbounded Signals:**
$$x(t) = \frac{1}{|t|}$$ near $t = 0$

## Classification Procedure

To classify a signal, follow these steps:

**Step 1:** Calculate the energy:
$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt$$

**Step 2:** If $E$ is finite, the signal is an energy signal.

**Step 3:** If $E = \infty$, calculate the power:
$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt$$

**Step 4:** If $P$ is finite, the signal is a power signal. Otherwise, it is neither.

## Practical Implications

### Energy Signal Applications

- Transient analysis
- Pulse communication systems
- Radar and sonar signals
- Finite-duration transmissions

### Power Signal Applications

- AC power systems
- Communication carriers
- Periodic waveform analysis
- Steady-state analysis

## Summary Table of Common Signals

| Signal | Energy | Power | Classification |
|--------|--------|-------|----------------|
| $\delta(t)$ | 1 | 0 | Energy |
| $u(t)$ | $\infty$ | 1/2 | Power |
| $e^{-at}u(t)$, $a>0$ | $1/(2a)$ | 0 | Energy |
| $e^{at}u(t)$, $a>0$ | $\infty$ | $\infty$ | Neither |
| $\cos(\omega_0 t)$ | $\infty$ | 1/2 | Power |
| $t \cdot u(t)$ | $\infty$ | $\infty$ | Neither |

## Summary

Signal classification by energy and power provides a framework for selecting appropriate analysis methods. Energy signals are typically transient and finite-duration, while power signals are typically periodic or persistent. Understanding this classification is essential for signal processing, communication systems, and control applications.
