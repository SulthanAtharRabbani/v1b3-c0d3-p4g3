---
title: Filtering Applications
readingTime: 25
difficulty: intermediate
objectives:
  - Apply filters in practical applications
  - Design anti-aliasing filters
  - Understand noise filtering
  - Apply filtering in biomedical signals
keyPoints:
  - Anti-aliasing filters prevent aliasing
  - Low-pass filters reduce noise
  - Band-pass filters isolate signals
  - Digital filters offer flexibility
---

# Filtering Applications

Filters are applied in countless real-world applications. This lesson covers several important practical uses.

## Anti-Aliasing Filters

### Purpose

Before sampling, signals must be bandlimited to prevent aliasing:

1. Signal bandwidth must satisfy: $W < f_s/2$
2. Anti-aliasing LPF removes frequencies above $f_s/2$
3. Must be analog filter (before ADC)

### Design Considerations

- Sharp cutoff near $f_s/2$
- Flat passband response
- Minimum phase distortion

## Noise Filtering

### Low-Pass Noise Reduction

Many noise sources have wide bandwidth:
- Thermal noise (white spectrum)
- Electromagnetic interference
- Quantization noise

Low-pass filtering reduces noise when signal bandwidth is limited.

### Band-Pass for Signal Extraction

When signal occupies specific frequency band:
- Remove out-of-band noise
- Improve signal-to-noise ratio (SNR)
- Example: Audio equalization

## Biomedical Applications

### ECG Signal Processing

- Remove 50/60 Hz power line interference (notch filter)
- Remove baseline wander (high-pass filter)
- Reduce muscle noise (low-pass filter)

### EEG Signal Processing

- Extract specific brain rhythms (alpha: 8-13 Hz, beta: 13-30 Hz)
- Remove eye blink artifacts
- Separate different frequency bands for analysis

## Summary

Filtering is essential in practical signal processing applications, from preventing aliasing to improving signal quality in biomedical systems.
