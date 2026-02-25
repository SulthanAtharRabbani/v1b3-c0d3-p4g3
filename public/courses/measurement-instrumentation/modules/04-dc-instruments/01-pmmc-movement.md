---
title: PMMC Meter Movement
readingTime: 30
difficulty: beginner
objectives:
  - Explain the operating principle of PMMC movements
  - Calculate deflection torque and controlling torque
  - Understand the characteristics of PMMC meters
  - Identify advantages and limitations
keyPoints:
  - PMMC uses a coil in a permanent magnetic field
  - Deflection is proportional to current
  - High sensitivity but DC only
  - Core magnet design improves performance
---

# PMMC Meter Movement

The Permanent Magnet Moving Coil (PMMC) movement, also known as the D'Arsonval movement, is the foundation of analog DC measurement instruments. Understanding its operation is essential for working with analog meters and appreciating the design of digital instruments.

## Operating Principle

The PMMC movement operates on the principle that a current-carrying conductor in a magnetic field experiences a force. The movement consists of a coil of fine wire suspended in the field of a permanent magnet.

### Construction

**Permanent magnet**: Provides a uniform, strong magnetic field. Modern instruments use Alnico or ceramic magnets for high flux density and stability.

**Moving coil**: A lightweight coil of fine copper wire wound on an aluminum former. The coil is mounted on pivots or taut bands so it can rotate freely.

**Core**: A soft iron core inside the coil concentrates the magnetic field and provides a uniform radial field for linear scale.

**Control springs**: Two spiral springs provide the controlling torque and carry current to and from the coil. They are designed to have equal torque in opposite directions.

**Pointer**: A lightweight pointer attached to the coil moves across a calibrated scale to indicate the measured value.

**Damping**: Eddy currents induced in the aluminum former provide electromagnetic damping, bringing the pointer to rest quickly without oscillation.

### Torque Equations

When current flows through the coil, the interaction with the magnetic field produces a **deflecting torque**:

$$T_d = G \cdot I$$

where:
- $T_d$ = deflecting torque (N⋅m)
- $G$ = coil constant (N⋅m/A) = $B \cdot N \cdot A$
- $B$ = magnetic flux density (T)
- $N$ = number of turns on coil
- $A$ = effective coil area (m²)
- $I$ = current through coil (A)

The **controlling torque** from the springs opposes the deflection:

$$T_c = K_s \cdot \theta$$

where:
- $T_c$ = controlling torque (N⋅m)
- $K_s$ = spring constant (N⋅m/rad)
- $\theta$ = angular deflection (rad)

At equilibrium, $T_d = T_c$:

$$G \cdot I = K_s \cdot \theta$$

Therefore, the deflection is:

$$\theta = \frac{G}{K_s} \cdot I$$

This linear relationship between deflection and current is the key characteristic of the PMMC movement.

## Characteristics

### Scale Characteristics

Because the deflection is proportional to current, PMMC instruments have a **linear scale**. Equal increments of current produce equal increments of pointer deflection, making the scale easy to read and interpolate.

### Sensitivity

The sensitivity of a PMMC movement is expressed as the current required for full-scale deflection (FSD):

$$S = \frac{1}{I_{fsd}} \text{ (ohms/volt)}$$

Typical sensitivities range from 50 μA (20,000 Ω/V) to 1 mA (1000 Ω/V). Higher sensitivity movements require less current for full-scale deflection but are more delicate and expensive.

### Accuracy

PMMC movements typically achieve accuracy of 1-3% of full scale. The accuracy is limited by:
- Magnetic field uniformity
- Spring linearity
- Pivot friction
- Scale graduation precision

### Frequency Response

PMMC movements respond only to the average (DC) value of current. For AC measurements, rectifiers must be added to convert AC to DC. The inductance of the coil limits AC frequency response even with rectifiers.

## Advantages and Limitations

### Advantages

**Linear scale**: Equal divisions represent equal current increments, making reading easy and accurate.

**High sensitivity**: Modern movements can achieve full-scale deflection with as little as 10 μA.

**Good accuracy**: 1-3% of full scale is typical, better than many other analog instruments.

**Low power consumption**: The low current requirement minimizes loading on the circuit being measured.

**Good damping**: Eddy current damping provides smooth, quick settling.

### Limitations

**DC only**: Without rectifiers, PMMC movements cannot measure AC.

**Cost**: Quality PMMC movements are expensive due to precise construction requirements.

**Fragility**: The moving coil and pivots are delicate and can be damaged by shock or overload.

**Temperature sensitivity**: Both the coil resistance and magnetic field strength vary with temperature.

## Protection

PMMC movements must be protected from overload:

**Overload damage**: Excessive current can overheat the coil, damage the pivots, or bend the pointer.

**Protection methods**:
- Series resistors to limit current
- Parallel shunt diodes to bypass overloads
- Fuses or circuit breakers
- Current-limiting electronic protection

## Taut Band Suspension

Modern high-quality PMMC instruments often use taut band suspension instead of pivots:

**Construction**: The coil is suspended between two taut metal ribbons under tension.

**Advantages**:
- No pivot friction, improving sensitivity
- More resistant to shock and vibration
- Longer life and better reliability

**Applications**: High-precision laboratory instruments and portable instruments subject to vibration.

## Summary

The PMMC movement operates on the interaction between current in a coil and a permanent magnetic field. The linear relationship between current and deflection produces a uniform scale. Key characteristics include high sensitivity, good accuracy, and DC-only operation. Understanding PMMC fundamentals is essential for working with analog DC instruments and appreciating the design considerations in digital instruments.
