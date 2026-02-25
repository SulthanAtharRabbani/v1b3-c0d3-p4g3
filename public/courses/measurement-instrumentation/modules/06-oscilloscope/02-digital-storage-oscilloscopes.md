---
title: Digital Storage Oscilloscopes
readingTime: 32
difficulty: intermediate
objectives:
  - Understand the architecture and operation of digital storage oscilloscopes
  - Explain sampling theory and its impact on measurement accuracy
  - Apply bandwidth and rise time relationships for proper instrument selection
  - Evaluate memory depth and its effect on waveform capture capabilities
keyPoints:
  - DSOs sample and digitize analog signals for storage and analysis
  - The Nyquist criterion requires sampling at least 2× the highest frequency component
  - Bandwidth and rise time are related by the factor 0.35/trise relationship
  - Memory depth determines the duration of signal that can be captured at high resolution
---

# Digital Storage Oscilloscopes

## Introduction

Digital Storage Oscilloscopes (DSOs) have largely replaced analog oscilloscopes in modern measurement applications. DSOs convert analog signals into digital data, enabling storage, analysis, and advanced measurement capabilities that were impossible with traditional CRT-based instruments.

## DSO Architecture

A DSO consists of several key functional blocks:

### Signal Conditioning
The input signal first passes through analog conditioning circuits:
- Attenuator/Amplifier for range selection
- Anti-aliasing filter to prevent sampling errors
- Input coupling selection (AC/DC/GND)

### Analog-to-Digital Converter (ADC)
The ADC is the heart of the DSO, converting the continuous analog signal into discrete digital samples. The sampling process is characterized by:

$$f_s = \frac{1}{\Delta t}$$

where $f_s$ is the sampling frequency and $\Delta t$ is the sampling interval.

### Memory and Processing
Digitized samples are stored in memory and processed for display and analysis. The total memory capacity determines how much waveform data can be captured:

$$Capture\ Time = \frac{Memory\ Depth}{Sample\ Rate}$$

## Sampling Theory

### Nyquist-Shannon Theorem

The fundamental requirement for accurate signal reconstruction states that the sampling frequency must be at least twice the highest frequency component in the signal:

$$f_s \geq 2 \cdot f_{max}$$

When this condition is violated, aliasing occurs, where high-frequency components appear as lower frequencies in the sampled data.

### Aliasing

Aliasing creates false frequency components in the sampled signal. The aliased frequency is given by:

$$f_{alias} = |f_{signal} - n \cdot f_s|$$

where $n$ is an integer that produces a result within the Nyquist range (0 to $f_s/2$).

### Real-Time vs. Equivalent-Time Sampling

**Real-Time Sampling**: Each acquisition captures the entire waveform in a single sweep. The sample rate requirement is:

$$f_{sample} \geq 5 \times f_{bandwidth}$$

for accurate waveform reproduction (rule of thumb for good fidelity).

**Equivalent-Time Sampling**: Used for repetitive signals, building up the waveform over multiple acquisitions:
- **Sequential sampling**: Samples are taken at progressively later times on each repetition
- **Random sampling**: Samples are taken randomly and reconstructed based on timing

## Bandwidth and Rise Time

### Bandwidth Definition

Bandwidth is the frequency at which the displayed amplitude falls to 70.7% (-3 dB) of the actual signal amplitude:

$$BW = f_{-3dB}$$

### Rise Time Relationship

The relationship between bandwidth and rise time for a first-order system is:

$$BW = \frac{0.35}{t_r}$$

where $t_r$ is the rise time (10% to 90% of final value). This relationship is crucial for accurate measurement of digital signals.

### Required Oscilloscope Bandwidth

To measure a signal with rise time $t_{r,signal}$, the oscilloscope should have:

$$BW_{scope} \geq \frac{0.5}{t_{r,signal}}$$

Alternatively, for accurate rise time measurement (within 3% error):

$$t_{r,measured} = \sqrt{t_{r,signal}^2 + t_{r,scope}^2}$$

The measurement error when the oscilloscope rise time equals the signal rise time is approximately 41%. For errors less than 10%:

$$t_{r,scope} \leq \frac{t_{r,signal}}{3}$$

## Memory Depth Considerations

Memory depth is a critical specification that determines how much signal can be captured at a given sample rate:

$$Memory\ Depth = Sample\ Rate \times Time\ Window$$

### Trade-offs

Higher memory depth allows:
- Longer capture times at high sample rates
- More detailed zooming into captured waveforms
- Better timing resolution for complex signals

However, higher memory depth also means:
- Slower waveform update rates
- More data to process and store

### Memory Depth Selection

For capturing a signal with frequency $f$ and desired resolution:

$$Required\ Memory = f_s \times T_{capture}$$

where $T_{capture}$ is the desired time window.

## Vertical Resolution

The vertical resolution is determined by the ADC bit depth:

$$Resolution = \frac{Full\ Scale}{2^n}$$

where $n$ is the number of bits. For an 8-bit ADC with 1V full scale:

$$Resolution = \frac{1V}{256} = 3.9\ mV$$

### Effective Number of Bits (ENOB)

Real-world noise and distortion reduce the effective resolution:

$$ENOB = \frac{SINAD - 1.76}{6.02}$$

where SINAD (Signal-to-Noise and Distortion ratio) is measured in dB.

## Advanced DSO Features

### Peak Detection
Captures narrow pulses that might be missed between samples:

$$Pulse\ Width_{min} < \frac{1}{f_s}$$

### Averaging
Reduces random noise by averaging multiple acquisitions:

$$Noise\ Reduction = \frac{1}{\sqrt{N}}$$

where $N$ is the number of averages.

### Waveform Math
Mathematical operations on captured waveforms:
- Addition, subtraction, multiplication
- FFT analysis for frequency domain display
- Integration and differentiation

## Summary

Digital Storage Oscilloscopes provide powerful capabilities for signal capture and analysis. Understanding sampling theory, bandwidth-rise time relationships, and memory depth considerations is essential for selecting the right instrument and making accurate measurements. The Nyquist criterion guides sample rate selection, while the 0.35/rise time relationship helps determine bandwidth requirements for transient signal measurement.
