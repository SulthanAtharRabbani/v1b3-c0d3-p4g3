---
title: Impedance Measurement
readingTime: 32
difficulty: intermediate
objectives:
  - Understand complex impedance and its components
  - Explain the operating principles of LCR meters
  - Interpret Q factor measurements and their significance
  - Apply dissipation factor concepts to component characterization
keyPoints:
  - Impedance is a complex quantity with resistive and reactive components
  - LCR meters measure impedance by applying AC signals and analyzing response
  - Q factor indicates the quality of reactive components
  - Dissipation factor represents energy loss in capacitors and inductors
---

# Impedance Measurement

## Introduction

Impedance extends the concept of resistance to AC circuits, encompassing both magnitude and phase relationships. Modern impedance measurement instruments, primarily LCR meters, enable characterization of inductors, capacitors, and complex impedances across a wide frequency range.

## Complex Impedance Fundamentals

### Impedance Definition

Impedance is a complex quantity representing the opposition to AC current flow:

$$Z = R + jX = |Z| \angle \phi$$

where:
- $R$ is the resistance (real part)
- $X$ is the reactance (imaginary part)
- $|Z|$ is the magnitude
- $\phi$ is the phase angle

### Impedance Magnitude and Phase

The relationships between components:

$$|Z| = \sqrt{R^2 + X^2}$$

$$\phi = \arctan\left(\frac{X}{R}\right)$$

### Component Impedances

For ideal components:
- **Resistor**: $Z_R = R$
- **Inductor**: $Z_L = j\omega L = j2\pi fL$
- **Capacitor**: $Z_C = \frac{1}{j\omega C} = \frac{-j}{2\pi fC}$

### Admittance

Admittance is the reciprocal of impedance:

$$Y = \frac{1}{Z} = G + jB$$

where $G$ is conductance and $B$ is susceptance.

## LCR Meter Operating Principles

### Basic Measurement Method

LCR meters measure impedance by applying a known AC voltage and measuring the resulting current, or vice versa:

$$Z = \frac{V}{I} = \frac{|V|}{|I|} \angle(\phi_V - \phi_I)$$

### Auto-Balancing Bridge

The most common LCR meter architecture uses an auto-balancing bridge:

1. Apply AC excitation to the device under test (DUT)
2. Measure the current through the DUT
3. Null the current using a feedback amplifier
4. Calculate impedance from voltage and current measurements

The bridge equation:

$$Z_x = R_{ref} \times \frac{V_{DUT}}{V_{ref}}$$

### Measurement Parameters

LCR meters typically provide:
- **L (Inductance)**: Measured in Henries
- **C (Capacitance)**: Measured in Farads
- **R (Resistance)**: Measured in Ohms
- **Q (Quality Factor)**: Dimensionless
- **D (Dissipation Factor)**: Dimensionless

### Equivalent Circuit Models

LCR meters use two equivalent circuit models:

**Series Model**:
$$Z = R_s + jX_s$$

**Parallel Model**:
$$Y = G_p + jB_p$$

The choice depends on the component and application:
- Series model for inductors at low frequencies
- Parallel model for capacitors at low frequencies

## Q Factor

### Definition

The Q factor (Quality Factor) represents the ratio of stored energy to dissipated energy per cycle:

$$Q = 2\pi \times \frac{E_{stored}}{E_{dissipated}}$$

### For Inductors

For an inductor with series resistance:

$$Q_L = \frac{\omega L}{R_s} = \frac{X_L}{R_s}$$

A higher Q indicates lower losses and better performance in resonant circuits.

### For Capacitors

For a capacitor with parallel resistance:

$$Q_C = \omega C R_p = \frac{R_p}{X_C}$$

### Relationship to Bandwidth

For a resonant circuit:

$$Q = \frac{f_0}{BW}$$

where $f_0$ is the resonant frequency and $BW$ is the bandwidth at -3 dB points.

### Q Factor Measurement

LCR meters calculate Q from the measured impedance:

$$Q = \frac{|X|}{R} = \tan(\phi)$$

where $\phi$ is the phase angle of the impedance.

## Dissipation Factor

### Definition

The dissipation factor (D or tan δ) is the reciprocal of Q:

$$D = \frac{1}{Q} = \tan\delta = \frac{R}{|X|}$$

### Physical Meaning

The dissipation factor represents:
- Energy loss in the component
- Deviation from ideal behavior
- Quality of dielectric materials (for capacitors)

### For Capacitors

In capacitors, the dissipation factor relates to dielectric losses:

$$D = \omega C R_s = \frac{1}{\omega C R_p}$$

Typical values:
- Ceramic capacitors: 0.001 - 0.05
- Electrolytic capacitors: 0.1 - 0.3
- Film capacitors: 0.0001 - 0.01

### For Inductors

In inductors, dissipation factor represents winding resistance losses:

$$D = \frac{R_s}{\omega L}$$

## Measurement Frequency Considerations

### Frequency Dependence

Component parameters vary with frequency:

**Inductors**:
- Core losses increase with frequency
- Self-capacitance causes parallel resonance
- Skin effect increases AC resistance

**Capacitors**:
- Dielectric absorption effects
- ESR varies with frequency
- Parasitic inductance causes series resonance

### Test Frequency Selection

LCR meters offer multiple test frequencies:
- 100 Hz, 120 Hz: Power frequency components
- 1 kHz: Standard component testing
- 10 kHz, 100 kHz: High-frequency applications
- 1 MHz: RF components

The measurement frequency should match the application frequency.

## Measurement Accuracy Factors

### Source Impedance Effects

The source impedance of the LCR meter affects measurements:

$$Z_{measured} = Z_{DUT} + Z_{lead}$$

### Cable Effects

Test cable capacitance and inductance introduce errors:
- Use short cables for high frequencies
- Use calibrated fixtures
- Apply open/short/load compensation

### Open/Short Compensation

Compensation removes fixture effects:

$$Z_{corrected} = \frac{Z_{measured} - Z_{short}}{1 - j\omega C_{open}(Z_{measured} - Z_{short})}$$

## Summary

Impedance measurement using LCR meters provides comprehensive characterization of reactive components. Understanding complex impedance, Q factor, and dissipation factor enables proper interpretation of measurement results. The choice of equivalent circuit model, test frequency, and compensation techniques significantly impacts measurement accuracy. These concepts are fundamental to component selection, quality control, and circuit design in applications ranging from power electronics to RF systems.
