---
title: Types of Noise
readingTime: 30
difficulty: intermediate
objectives:
  - Understand the physical origins and characteristics of thermal noise
  - Explain shot noise and its relationship to current flow
  - Describe flicker noise and its 1/f spectral characteristic
  - Calculate noise contributions from multiple sources
keyPoints:
  - Thermal noise arises from thermal agitation of charge carriers
  - Shot noise results from the discrete nature of charge flow
  - Flicker noise follows a 1/f power spectral density
  - Total noise is the sum of individual noise contributions
---

# Types of Noise

## Introduction

Noise is an unwanted random disturbance that corrupts measurement signals. Understanding the different types of noise, their origins, and characteristics is essential for designing low-noise measurement systems and interpreting measurement results accurately.

## Thermal (Johnson-Nyquist) Noise

### Physical Origin

Thermal noise, also called Johnson-Nyquist noise, arises from the random thermal motion of charge carriers (electrons) in conductors. This agitation creates random voltage fluctuations across any resistance.

### Noise Voltage

The RMS thermal noise voltage across a resistor is:

$$V_n = \sqrt{4kTRB}$$

where:
- $k$ = Boltzmann's constant ($1.38 \times 10^{-23}$ J/K)
- $T$ = Absolute temperature (Kelvin)
- $R$ = Resistance (Ohms)
- $B$ = Bandwidth (Hz)

### Noise Current

The equivalent noise current is:

$$I_n = \sqrt{\frac{4kTB}{R}}$$

### Power Spectral Density

Thermal noise has a flat (white) spectral density:

$$S_v(f) = 4kTR \quad [V^2/Hz]$$

This means thermal noise power is constant per unit bandwidth, independent of frequency.

### Practical Examples

At room temperature (T = 300K), a 1 kΩ resistor produces:
$$V_n = \sqrt{4 \times 1.38 \times 10^{-23} \times 300 \times 1000 \times B}$$
$$V_n \approx 4 \text{ nV}/\sqrt{\text{Hz}}$$

### Temperature Dependence

Cooling reduces thermal noise:
- Liquid nitrogen (77K): 50% noise reduction
- Liquid helium (4.2K): 88% noise reduction

## Shot Noise

### Physical Origin

Shot noise arises from the discrete nature of electric charge. When current flows, individual charge carriers (electrons) arrive at random times, creating current fluctuations around the mean value.

### Noise Current

The RMS shot noise current is:

$$I_n = \sqrt{2qI_{DC}B}$$

where:
- $q$ = electron charge ($1.6 \times 10^{-19}$ C)
- $I_{DC}$ = DC current (Amperes)
- $B$ = Bandwidth (Hz)

### Power Spectral Density

Shot noise has a white spectral density:

$$S_i(f) = 2qI_{DC} \quad [A^2/Hz]$$

### Applications

Shot noise is significant in:
- Semiconductor junctions (diodes, transistors)
- Photodetectors
- Vacuum tubes

### Example

A diode with 1 mA forward current produces shot noise:
$$I_n = \sqrt{2 \times 1.6 \times 10^{-19} \times 10^{-3} \times B}$$
$$I_n \approx 18 \text{ pA}/\sqrt{\text{Hz}}$$

### Comparison with Thermal Noise

Shot noise differs from thermal noise:
- Thermal noise depends on temperature and resistance
- Shot noise depends on DC current
- Shot noise can be reduced by reducing current
- Thermal noise can be reduced by cooling or reducing resistance

## Flicker (1/f) Noise

### Physical Origin

Flicker noise, also called 1/f noise or pink noise, has multiple origins including:
- Surface effects in semiconductors
- Defects and impurities in materials
- Contact irregularities

### Power Spectral Density

Flicker noise follows the characteristic:

$$S_v(f) = \frac{K}{f^\alpha}$$

where $\alpha$ typically ranges from 0.8 to 1.2 (usually close to 1).

### Corner Frequency

The flicker noise corner frequency is where flicker noise equals thermal noise:

$$f_c = \frac{K}{4kTR}$$

Below the corner frequency, flicker noise dominates; above it, thermal noise dominates.

### Characteristics

- Power spectral density increases at lower frequencies
- Common in semiconductor devices
- More significant in low-frequency measurements
- Less predictable than thermal or shot noise

### Low-Frequency Impact

For DC and low-frequency measurements, flicker noise is often the dominant noise source. The total noise voltage in a bandwidth from $f_1$ to $f_2$:

$$V_n^2 = K \ln\left(\frac{f_2}{f_1}\right)$$

## Other Noise Types

### Burst (Popcorn) Noise

Burst noise appears as random sudden shifts in DC level:
- Caused by defects in semiconductor junctions
- Has characteristic "popcorn" sound in audio
- Reduced through improved manufacturing

### Contact Noise

Generated at imperfect electrical contacts:
- Similar to flicker noise in spectral characteristics
- Can be reduced by using clean, tight connections

### Environmental Noise

External interference from:
- Power line (50/60 Hz and harmonics)
- Radio frequency interference (RFI)
- Electromagnetic interference (EMI)

## Noise Calculations

### Adding Noise Sources

Uncorrelated noise sources add in quadrature:

$$V_{n,total} = \sqrt{V_{n1}^2 + V_{n2}^2 + V_{n3}^2 + ...}$$

### Noise Figure

The noise figure quantifies added noise:

$$NF = 10 \log_{10}\left(\frac{SNR_{in}}{SNR_{out}}\right)$$

### Equivalent Input Noise

For amplifiers, the equivalent input noise is:

$$V_{n,in} = \frac{V_{n,out}}{G}$$

where $G$ is the gain.

### Total Noise Example

For a system with thermal noise $V_{th} = 10 \mu V$ and amplifier noise $V_{amp} = 5 \mu V$:

$$V_{total} = \sqrt{10^2 + 5^2} = 11.2 \mu V$$

Notice that the dominant noise source determines the total; reducing the smaller source has limited effect.

## Summary

Understanding the types of noise in measurement systems is fundamental to achieving accurate measurements. Thermal noise, inherent in all resistive elements, sets a fundamental limit on achievable signal-to-noise ratio. Shot noise becomes significant in current-carrying devices like semiconductor junctions. Flicker noise dominates at low frequencies and can be the limiting factor in DC measurements. By understanding these noise sources, engineers can design systems that minimize their impact and optimize measurement performance.
