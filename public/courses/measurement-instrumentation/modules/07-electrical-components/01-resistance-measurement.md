---
title: Resistance Measurement Methods
readingTime: 30
difficulty: intermediate
objectives:
  - Understand the principles and limitations of two-wire resistance measurement
  - Apply four-wire (Kelvin) measurement techniques for low resistance
  - Analyze Wheatstone bridge circuits for precision measurements
  - Evaluate measurement accuracy and select appropriate methods
keyPoints:
  - Two-wire measurements include lead resistance in the result
  - Four-wire measurement eliminates lead resistance errors
  - The Wheatstone bridge provides high accuracy through null detection
  - Kelvin connections are essential for low-resistance precision measurements
---

# Resistance Measurement Methods

## Introduction

Resistance measurement is one of the most common electrical measurements, with applications ranging from component verification to temperature sensing. The choice of measurement method significantly impacts accuracy, especially for very low or very high resistances.

## Two-Wire Resistance Measurement

### Basic Principle

The two-wire method applies a known current through the resistance and measures the resulting voltage:

$$R = \frac{V}{I}$$

This is the simplest method, implemented in virtually all digital multimeters.

### Limitations

The two-wire method includes the resistance of the test leads in the measurement:

$$R_{measured} = R_{unknown} + 2R_{lead}$$

For typical lead resistances of 0.01-0.1Ω, this creates significant errors for low-value resistances.

### Error Analysis

The relative error introduced by lead resistance is:

$$\epsilon = \frac{2R_{lead}}{R_{unknown}} \times 100\%$$

For a 1Ω resistor with 0.1Ω leads:
$$\epsilon = \frac{0.2}{1} \times 100\% = 20\%$$

### Applications

Despite its limitations, the two-wire method is suitable for:
- Resistances above 1 kΩ where lead resistance is negligible
- Quick measurements where high accuracy is not required
- Continuity testing

## Four-Wire (Kelvin) Measurement

### Principle

The four-wire method separates the current-carrying and voltage-sensing connections:

- **Force leads**: Carry the measurement current
- **Sense leads**: Measure the voltage across the unknown resistance

Since the voltage measurement draws negligible current, the sense lead resistance does not affect the result.

### Circuit Analysis

In the four-wire configuration:

$$V_{measured} = I \times R_{unknown}$$

The lead resistances have no effect because:
- Force lead voltage drop does not appear in the measurement
- Sense lead current is essentially zero (high input impedance voltmeter)

### Kelvin Connections

True Kelvin connections require:
- Four separate wires connected to the unknown resistance
- Force and sense connections made at the same physical point on the resistor
- Separate contact points for current and voltage (Kelvin clips)

### Advantages

The four-wire method provides:
- Elimination of lead resistance errors
- Measurement accuracy to micro-ohm levels
- Independence from lead length and gauge

## Wheatstone Bridge

### Bridge Configuration

The Wheatstone bridge is a null-detection method using four resistors in a diamond configuration:

```
      R1         R2
    ----/\/\/\----/\/\/\----
   |              |         |
   |              |         |
  V+          Detector      V-
   |              |         |
   |              |         |
    ----/\/\/\----/\/\/\----
      R3         Rx
```

### Balance Condition

The bridge is balanced when:

$$\frac{R_1}{R_2} = \frac{R_3}{R_x}$$

Therefore:

$$R_x = R_3 \times \frac{R_2}{R_1}$$

At balance, no current flows through the detector, and the measurement is independent of the supply voltage.

### Sensitivity Analysis

The bridge sensitivity determines the smallest detectable resistance change:

$$S = \frac{\Delta V_{detector}}{\Delta R_x / R_x}$$

For maximum sensitivity:
- All four arms should have equal resistance values
- The detector should have high sensitivity

### Unbalance Voltage

For small unbalances near balance:

$$V_{out} \approx V_s \times \frac{R_x - R_{eq}}{4 R_{eq}}$$

where $R_{eq}$ is the value of $R_x$ at balance.

## Measurement Current Considerations

### Self-Heating Effects

Current flowing through a resistance causes self-heating:

$$P = I^2 R$$

This changes the resistance value:

$$R(T) = R_0 [1 + \alpha(T - T_0)]$$

where $\alpha$ is the temperature coefficient.

### Optimal Current Selection

The measurement current should be selected to:
- Provide adequate signal-to-noise ratio
- Minimize self-heating
- Stay within the power rating of the device under test

For precision measurements:

$$I_{max} = \sqrt{\frac{P_{max}}{R}}$$

## High Resistance Measurement

### Challenges

High resistance measurements face different challenges:
- Insulation leakage currents
- Surface contamination effects
- Long settling times due to cable capacitance

### Guard Circuits

Guard circuits prevent leakage currents from affecting measurements by:
- Surrounding the measurement node with a guard at the same potential
- Diverting leakage currents away from the measurement circuit

### Techniques for High Resistance

For resistances above 1 MΩ:
- Use guarded measurements
- Clean insulation surfaces
- Allow adequate settling time
- Shield from external fields

## Practical Considerations

### Contact Resistance

Contact resistance at probe tips can introduce errors:
- Typical contact resistance: 1-100 mΩ
- Use clean, properly sized contacts
- Consider four-wire connections for critical measurements

### Thermoelectric EMFs

Dissimilar metal junctions create thermoelectric voltages:

$$V_{TE} = S \times \Delta T$$

where $S$ is the Seebeck coefficient and $\Delta T$ is the temperature difference.

### Mitigation Techniques

- Use current reversal to cancel thermal EMFs
- Allow thermal equilibrium before measurement
- Use similar materials for contacts

## Summary

Resistance measurement techniques range from simple two-wire methods to sophisticated bridge configurations. Two-wire measurements are adequate for high resistances where lead resistance is negligible. Four-wire (Kelvin) measurement is essential for accurate low-resistance measurements. The Wheatstone bridge provides high-precision null measurements with accuracy limited only by the reference resistors. Understanding these methods enables selection of appropriate techniques for any resistance measurement application.
