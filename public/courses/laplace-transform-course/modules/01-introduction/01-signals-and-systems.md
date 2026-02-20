---
title: Continuous-Time Signals and Systems
readingTime: 15
difficulty: beginner
objectives:
  - Define what constitutes a signal and a system
  - Distinguish between continuous-time and discrete-time signals
  - Understand the input-output relationship in systems
keyPoints:
  - A signal is a function that conveys information about a physical phenomenon
  - Systems process input signals to produce output signals
  - Continuous-time signals are defined for all values of time
---

# Continuous-Time Signals and Systems

## What is a Signal?

A **signal** is a function of one or more independent variables that conveys information about the behavior or nature of some phenomenon. In engineering applications, the most common independent variable is time, and signals typically represent physical quantities such as voltage, current, temperature, pressure, or displacement.

### Classification of Signals

Signals can be classified according to several characteristics:

**1. Continuous-time vs. Discrete-time**

A **continuous-time signal** is defined for all values of time. Mathematically, it is a function $x(t)$ where $t$ can take any real value. Examples include:
- Voltage waveforms in analog circuits
- Temperature variations over a day
- Sound pressure waves

A **discrete-time signal** is defined only at discrete instants of time. It is represented as $x[n]$ where $n$ is an integer. Examples include:
- Daily stock prices
- Sampled audio signals
- Digital sensor readings

**2. Causal vs. Non-causal**

A **causal signal** is zero for all negative time:
$$x(t) = 0 \quad \text{for } t < 0$$

An **anti-causal signal** is zero for all positive time:
$$x(t) = 0 \quad \text{for } t > 0$$

**3. Periodic vs. Aperiodic**

A **periodic signal** repeats itself at regular intervals:
$$x(t) = x(t + T) \quad \text{for all } t$$

where $T$ is called the **period** of the signal.

## What is a System?

A **system** is an entity that processes input signals to produce output signals. It can be viewed as a transformation or mapping from one set of signals (inputs) to another set of signals (outputs). The relationship between input and output is fundamental to system analysis.

### System Representation

We represent a system as:

$$y(t) = T\{x(t)\}$$

where:
- $x(t)$ is the input signal
- $y(t)$ is the output signal
- $T\{\cdot\}$ represents the transformation performed by the system

### Important System Properties

**1. Linearity**

A system is **linear** if it satisfies the principle of superposition:

$$T\{a_1 x_1(t) + a_2 x_2(t)\} = a_1 T\{x_1(t)\} + a_2 T\{x_2(t)\}$$

This property is crucial because it allows us to decompose complex signals into simpler components, analyze each component separately, and combine the results.

**2. Time Invariance**

A system is **time-invariant** if a time shift in the input causes an identical time shift in the output:

$$\text{If } y(t) = T\{x(t)\}, \text{ then } y(t - \tau) = T\{x(t - \tau)\}$$

**3. Causality**

A system is **causal** if the output at any time depends only on present and past inputs, not on future inputs. This is essential for real-time systems.

**4. Stability**

A system is **stable** (in the BIBO sense) if every bounded input produces a bounded output:

$$|x(t)| \leq M_1 \implies |y(t)| \leq M_2$$

## Linear Time-Invariant (LTI) Systems

Systems that are both linear and time-invariant are called **LTI systems**. These systems have special properties that make them amenable to powerful analysis techniques:

1. They can be completely characterized by their **impulse response** $h(t)$
2. The output can be computed using **convolution**:
   $$y(t) = \int_{-\infty}^{\infty} x(\tau) h(t - \tau) \, d\tau$$
3. They can be analyzed using transform methods (Fourier, Laplace)

## Why Study Signals and Systems?

Understanding signals and systems is essential for:

- **Communications**: Modulation, transmission, and reception of information
- **Control Systems**: Designing stable and responsive controllers
- **Signal Processing**: Filtering, compression, and enhancement
- **Biomedical Engineering**: Analysis of physiological signals
- **Power Systems**: Analysis of electrical networks

## Summary

This lesson introduced the fundamental concepts of signals and systems. We learned that signals are functions that convey information, while systems process these signals. The properties of linearity and time invariance are particularly important because they enable the use of powerful mathematical tools, including the Laplace Transform, which we will study in subsequent modules.

In the next lesson, we will explore how continuous-time systems are modeled using differential equations and why transform methods are needed to solve these equations efficiently.
