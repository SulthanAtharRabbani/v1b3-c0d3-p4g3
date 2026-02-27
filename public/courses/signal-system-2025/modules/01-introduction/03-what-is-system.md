---
title: What is a System?
readingTime: 25
difficulty: beginner
objectives:
  - Define a system as an entity that processes signals
  - Understand input-output relationships
  - Identify system components and their functions
  - Recognize examples of systems in engineering
keyPoints:
  - A system transforms input signals to output signals
  - Systems have input-output relationships
  - Physical systems include filters, amplifiers, and processors
  - Mathematical models describe system behavior
---

# What is a System?

A system is an entity that processes one or more input signals to produce one or more output signals. Systems transform, modify, or extract information from signals according to specific rules or operations.

## Definition and Basic Concept

A system can be viewed as a "black box" that accepts input signals and produces output signals:

$$y(t) = T\{x(t)\}$$

where:
- $x(t)$ is the input signal
- $y(t)$ is the output signal
- $T\{\cdot\}$ represents the system transformation

### Block Diagram Representation

```
Input Signal → [ SYSTEM ] → Output Signal
    x(t)            T          y(t)
```

The system processes the input according to its internal characteristics and produces a corresponding output.

## Examples of Systems

### Electrical Systems

**RC Circuit**: A resistor-capacitor circuit acts as a low-pass filter:
$$\text{Input: } v_{in}(t) \quad \text{Output: } v_{out}(t)$$

**Amplifier**: Increases signal amplitude:
$$y(t) = A \cdot x(t)$$

where $A$ is the gain.

### Communication Systems

**Modulator**: Combines information signal with carrier:
$$s(t) = m(t)\cos(\omega_c t)$$

**Demodulator**: Extracts original information from modulated signal.

### Signal Processing Systems

**Filter**: Removes unwanted frequency components
- Low-pass filter: Passes low frequencies
- High-pass filter: Passes high frequencies
- Band-pass filter: Passes specific frequency range

**Speech Recognition System**:
$$\text{Input: Speech signal} \rightarrow \text{Output: Text/Commands}$$

### Control Systems

**Motor Controller**:
$$\text{Input: Control voltage} \rightarrow \text{Output: Motor speed/position}$$

**Temperature Control**:
$$\text{Input: Setpoint + Temperature} \rightarrow \text{Output: Heater control}$$

### Biological Systems

**Human Ear**: Converts acoustic pressure waves to neural signals
$$\text{Input: Sound pressure} \rightarrow \text{Output: Neural impulses}$$

## System Properties

### Linearity

A system is linear if it satisfies the superposition principle:

1. **Additivity**: $T\{x_1(t) + x_2(t)\} = T\{x_1(t)\} + T\{x_2(t)\}$
2. **Homogeneity**: $T\{ax(t)\} = aT\{x(t)\}$

Combined: $T\{ax_1(t) + bx_2(t)\} = aT\{x_1(t)\} + bT\{x_2(t)\}$

### Time-Invariance

A system is time-invariant if a time shift in input causes the same time shift in output:

$$\text{If } x(t) \rightarrow y(t), \text{ then } x(t - t_0) \rightarrow y(t - t_0)$$

### Causality

A system is causal if the output at any time depends only on present and past inputs:

$$y(t_0) \text{ depends only on } x(t) \text{ for } t \leq t_0$$

### Stability

A system is stable (BIBO stable) if every bounded input produces a bounded output:

$$|x(t)| \leq M_x < \infty \Rightarrow |y(t)| \leq M_y < \infty$$

## Types of Systems

### Analog Systems

Process continuous-time, continuous-amplitude signals using analog circuits:
- RC filters
- Operational amplifiers
- Analog multipliers

### Digital Systems

Process discrete-time, discrete-amplitude signals using digital hardware/software:
- Digital signal processors (DSPs)
- Microcontrollers
- FPGA-based systems

### Mixed-Signal Systems

Combine analog and digital processing:
- Analog-to-digital converters (ADC)
- Digital-to-analog converters (DAC)
- Software-defined radio

## System Interconnections

### Series (Cascade) Connection

Systems connected in series:
$$x(t) \rightarrow [T_1] \rightarrow [T_2] \rightarrow y(t)$$

Overall system: $T = T_2 \circ T_1$

### Parallel Connection

Systems connected in parallel:
$$y(t) = y_1(t) + y_2(t) = T_1\{x(t)\} + T_2\{x(t)\}$$

### Feedback Connection

Output is fed back to input:
$$y(t) = T_1\{x(t) + T_2\{y(t)\}\}$$

## System Analysis

### Time Domain Analysis

Study the system's response to specific inputs:
- Impulse response: $h(t) = T\{\delta(t)\}$
- Step response: $s(t) = T\{u(t)\}$
- Output: $y(t) = x(t) * h(t)$ (convolution)

### Frequency Domain Analysis

Study the system's response to sinusoidal inputs at different frequencies:
- Frequency response: $H(\omega)$
- Magnitude response: $|H(\omega)|$
- Phase response: $\angle H(\omega)$

## Summary

A system is an entity that transforms input signals into output signals. Systems can be classified by their properties (linearity, time-invariance, causality, stability) and by their implementation (analog, digital, mixed). Understanding system concepts is essential for designing signal processing applications, communication systems, and control systems.
