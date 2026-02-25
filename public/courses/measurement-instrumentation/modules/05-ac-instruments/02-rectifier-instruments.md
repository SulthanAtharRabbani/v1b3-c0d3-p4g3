---
title: Rectifier Instruments
readingTime: 25
difficulty: intermediate
objectives:
  - Explain half-wave and full-wave rectifier meter operation
  - Calculate sensitivity for rectifier instruments
  - Understand frequency limitations
  - Apply correction factors for non-sinusoidal waveforms
keyPoints:
  - Rectifiers convert AC to DC for PMMC measurement
  - Full-wave rectifiers are more sensitive
  - Frequency response limited by diode capacitance
  - Scaling assumes sine wave input
---

# Rectifier Instruments

Rectifier-type AC instruments convert AC to DC using semiconductor diodes, then measure the rectified signal with a PMMC movement. They are the most common type of analog AC meter.

## Operating Principle

The PMMC movement responds only to DC. To measure AC, we must first convert the AC signal to DC using rectifiers.

### Basic Configuration

A rectifier AC instrument consists of:
1. **Rectifier circuit**: Converts AC to DC
2. **PMMC movement**: Indicates the rectified (DC) value
3. **Multiplier resistor**: Sets the range (for voltmeters)

The movement responds to the average value of the rectified waveform, but the scale is calibrated to display RMS values assuming a sine wave input.

## Half-Wave Rectifier

### Circuit Configuration

```
AC input o----[>|----[M]----+
              D1           |
                          Rsh
AC input o-----------------+
```

The diode conducts only during positive half-cycles. The PMMC movement sees current only half the time.

### Output Characteristics

For a sinusoidal input with peak voltage $V_p$:

- Average output voltage = $V_p/\pi = 0.318 V_p$
- Displayed (RMS scaled) = $0.318 V_p \times 1.11 = 0.353 V_p$

The sensitivity is approximately half that of DC measurement due to half-wave operation.

### Limitations

- **Lower sensitivity**: Only half the waveform is used
- **Diode forward voltage**: Silicon diodes have ~0.6V drop, causing errors at low voltages
- **Reverse leakage**: Diode reverse current reduces accuracy

## Full-Wave Rectifier

### Bridge Rectifier Circuit

```
          D1
    +---->|----+
    |          |
AC o+          +----[M]----+
    |          |           |
    +----|<----+          Rsh
          D2
    (D3 and D4 complete bridge on negative cycle)
```

During both positive and negative half-cycles, current flows through the movement in the same direction.

### Output Characteristics

For a sinusoidal input:

- Average output voltage = $2V_p/\pi = 0.637 V_p$
- Displayed (RMS scaled) = $0.637 V_p \times 1.11 = 0.707 V_p$

The full-wave rectifier provides:
- Twice the output of half-wave
- Better sensitivity
- Smoother output (less ripple)

### Sensitivity

The sensitivity of a rectifier voltmeter is lower than its DC sensitivity due to:

**Rectifier loss**: Diode forward voltage drop
**Waveform factor**: Average to RMS conversion

Typical AC sensitivity = 0.45 to 0.9 × DC sensitivity

## Frequency Response

Rectifier instruments have limited frequency response due to:

### Diode Junction Capacitance

Diodes have junction capacitance that bypasses the rectifier at high frequencies:
- Silicon diodes: Useful up to ~10 kHz
- Germanium diodes: Useful up to ~100 kHz
- Hot-carrier (Schottky) diodes: Useful to ~1 MHz

### Circuit Inductance

The inductance of the meter movement and wiring creates a low-pass filter effect.

### Typical Specifications

| Instrument Type | Frequency Range |
|----------------|-----------------|
| General purpose | 20 Hz - 10 kHz |
| Audio frequency | 20 Hz - 100 kHz |
| RF probe | 100 kHz - 1 GHz |

## Scale Calibration

Rectifier instruments are calibrated to read RMS values for sine waves:

$$V_{display} = 1.11 \times V_{avg}$$

This calibration is correct only for pure sine waves.

### Errors with Non-Sinusoidal Waveforms

For other waveforms, the reading will be wrong:

**Square wave**: Reads 11% high
**Triangle wave**: Reads 5.5% high
**Clipped sine wave**: Reads high by variable amount

**Correction**:
$$V_{true} = V_{display} \times \frac{\text{Actual Form Factor}}{1.11}$$

## Diode Characteristics and Errors

### Forward Voltage Drop

Silicon diodes have approximately 0.6-0.7V forward voltage drop:
- Causes nonlinearity at low voltages
- Scale is compressed at low end
- Error can be 5-10% at low readings

### Temperature Sensitivity

Diode forward voltage decreases about 2 mV/°C:
- Affects low-voltage accuracy
- Can cause drift with temperature

### Reverse Recovery Time

At high frequencies, diodes cannot turn off instantly:
- Causes measurement errors at high frequencies
- Limits maximum usable frequency

## Practical Considerations

### Input Protection

Rectifier instruments need protection from:
- **Overload**: Excessive current can damage diodes
- **DC component**: Some instruments cannot tolerate DC on AC range
- **Peak transients**: Voltage spikes can damage rectifiers

### Loading Effects

Like DC voltmeters, AC voltmeters have loading effects:
- Input impedance typically lower than DC range
- Frequency-dependent impedance due to capacitance
- Can affect resonant circuits significantly

### Range Selection

- Choose range for reading in upper 2/3 of scale
- Low readings have larger errors
- Consider waveform distortion when selecting instrument

## Summary

Rectifier AC instruments use diodes to convert AC to DC for measurement by PMMC movements. Full-wave rectifiers provide better sensitivity than half-wave types. These instruments are calibrated for sine waves and give incorrect readings for other waveforms. Frequency response is limited by diode characteristics. Understanding these limitations is essential for accurate AC measurements.
