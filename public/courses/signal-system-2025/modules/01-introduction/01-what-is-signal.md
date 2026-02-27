---
title: What is a Signal?
readingTime: 25
difficulty: beginner
objectives:
  - Define a signal as a function of independent variables
  - Understand mathematical representation of signals
  - Identify different types of signals in engineering
  - Distinguish between dependent and independent variables
keyPoints:
  - A signal is a function that carries information
  - Time is typically the independent variable
  - Signal amplitude is the dependent variable
  - Examples include audio, images, video, and sensor data
---

# What is a Signal?

A signal is fundamentally a function of one or more independent variables that carries information. The most common independent variable is time, but signals can also depend on spatial coordinates, temperature, or other physical quantities.

## Mathematical Definition

Formally, a signal is a mapping from an independent variable to a dependent variable:

$$x(t) \text{ or } x[n]$$

where the independent variable (often time) maps to a signal value (amplitude, intensity, or other physical quantity).

### Key Terminology

- **Independent variable**: The input to the function (typically time $t$ or sample index $n$)
- **Dependent variable**: The output value (amplitude, intensity, etc.)
- **Domain**: The set of all possible values of the independent variable
- **Range**: The set of all possible output values

## Examples of Signals

### Audio and Speech Signals

Audio signals represent sound pressure variations over time. A speech signal $x(t)$ shows how air pressure varies as someone speaks:

$$x(t) = \text{sound pressure at time } t$$

The human voice typically contains frequencies from about 300 Hz to 3400 Hz, while high-fidelity audio extends from 20 Hz to 20,000 Hz.

### Image Signals

Images are two-dimensional signals where intensity depends on spatial coordinates:

$$I(x, y) = \text{intensity at pixel location } (x, y)$$

For color images, we have three channels: red (R), green (G), and blue (B), each being a 2D signal:
$$I_R(x, y), I_G(x, y), I_B(x, y)$$

### Video Signals

Video combines spatial and temporal dimensions, creating a 3D signal:

$$V(x, y, t)$$

where $x$ and $y$ represent spatial position and $t$ represents time. Each frame is a 2D image, and the sequence of frames forms the video.

### Biomedical Signals

**ECG (Electrocardiogram)**: Measures electrical activity of the heart. The signal shows characteristic patterns (P wave, QRS complex, T wave) that indicate heart function.

**EEG (Electroencephalogram)**: Records electrical activity of the brain using electrodes placed on the scalp. Different frequency bands (alpha, beta, delta, theta) correspond to different brain states.

### Financial Signals

Stock prices, exchange rates, and other financial data can be viewed as discrete-time signals:

$$x[n] = \text{stock price on day } n$$

## Physical Representation of Signals

Signals can be represented physically in various ways:

### Analog Representation

In analog form, a signal's amplitude can take any value within a continuous range. Examples include:
- Voltage from a microphone
- Current from a sensor
- Pressure variations in sound waves

### Digital Representation

Digital signals have amplitudes that can only take discrete values from a finite set. This representation is essential for computer processing and digital communication systems.

## Mathematical Functions as Signals

Many signals can be described by mathematical functions:

### Sinusoidal Signal

$$x(t) = A\sin(\omega_0 t + \phi)$$

where:
- $A$ = amplitude
- $\omega_0$ = angular frequency (rad/s)
- $\phi$ = phase (radians)

### Exponential Signal

$$x(t) = Ae^{\alpha t}$$

where:
- $A$ = initial amplitude
- $\alpha$ = growth ($\alpha > 0$) or decay ($\alpha < 0$) rate

### Piecewise Signals

Complex signals can be constructed by combining simpler signals over different time intervals:

$$x(t) = \begin{cases} e^{-t}, & t \geq 0 \\ 0, & t < 0 \end{cases}$$

## Signal Generation and Acquisition

### Natural Signals

Many signals occur naturally:
- Speech and music
- Ambient sound
- Biological signals (heart rate, brain waves)
- Environmental signals (temperature, pressure)

### Generated Signals

Some signals are intentionally created:
- Radio transmission carriers
- Radar pulses
- Test signals for system characterization

### Acquired Signals

Signals are acquired using sensors and transducers:
- Microphones convert sound to electrical signals
- Cameras convert light to electrical signals
- Thermocouples convert temperature to voltage

## Summary

A signal is a function that maps independent variables (typically time) to dependent variables (amplitude). Signals carry information and appear in countless applications including audio, video, biomedical monitoring, and communications. Understanding signal representation is the foundation for all signal processing and system analysis.
