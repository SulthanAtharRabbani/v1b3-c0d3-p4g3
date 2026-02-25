---
title: DC Ammeters and Digital Multimeters
readingTime: 30
difficulty: beginner
objectives:
  - Design ammeter circuits using shunt resistors
  - Calculate shunt resistance for any range
  - Understand ammeter burden voltage
  - Describe digital multimeter operation
keyPoints:
  - Ammeter uses PMMC with parallel shunt resistor
  - Shunt diverts most current around the movement
  - Burden voltage affects circuit operation
  - Digital multimeters use ADC technology
---

# DC Ammeters and Digital Multimeters

A DC ammeter measures the current flowing through a circuit. Since the PMMC movement can only handle small currents, measuring larger currents requires a shunt resistor to divert most of the current around the movement.

## Basic Ammeter Circuit

A DC ammeter consists of a PMMC movement in parallel with a low-value resistor called a shunt. The shunt carries most of the current, while a small proportional current flows through the movement.

### Circuit Configuration

```
         [Rsh]
    +----/\/\/\----+
    |              |
    +----[M]-------+
    |   PMMC       |
    +              +
   I_in          I_out
```

The shunt resistor $R_{sh}$ is connected in parallel with the PMMC movement (M).

### Shunt Resistance Calculation

For an ammeter with full-scale current $I_{fs}$ using a movement with full-scale current $I_m$ and resistance $R_m$:

Since the voltage across the parallel combination is the same for both paths:

$$I_m \cdot R_m = I_{sh} \cdot R_{sh}$$

where $I_{sh} = I_{fs} - I_m$

Solving for shunt resistance:

$$R_{sh} = \frac{I_m \cdot R_m}{I_{fs} - I_m}$$

**Example**: Design an ammeter for 5A full-scale using a 1 mA movement with 100 Ω resistance.

$$R_{sh} = \frac{0.001 \times 100}{5 - 0.001} = \frac{0.1}{4.999} = 0.020 \text{ Ω} = 20 \text{ mΩ}$$

## Ammeter Characteristics

### Burden Voltage

When an ammeter is inserted in a circuit, it adds resistance and creates a voltage drop called the burden voltage:

$$V_b = I \cdot R_{ammeter}$$

The burden voltage reduces the voltage available to the circuit and may affect circuit operation.

**Example**: An ammeter with 0.1 Ω total resistance measuring 2A:

Burden voltage = $2 \times 0.1 = 0.2$ V

In a 5V circuit, this represents a 4% reduction, which may be significant.

### Total Ammeter Resistance

The total resistance of the ammeter is the parallel combination:

$$R_{ammeter} = \frac{R_m \cdot R_{sh}}{R_m + R_{sh}}$$

For accurate measurements, the ammeter resistance should be much smaller than the circuit resistance.

## Multi-Range Ammeters

Practical ammeters offer multiple current ranges.

### Universal Shunt (Ayrton Shunt)

The universal shunt uses tapped resistors to provide multiple ranges without opening the circuit during switching:

```
    +----[R1]----[R2]----[R3]----+
    |        |        |          |
    +--[S1]--+--[S2]--+--[S3]--[M]--+
    |                               |
   I_in                           I_out
```

Advantages:
- Continuous protection of the movement
- Lower contact resistance issues
- No open-circuit risk during switching

### Individual Shunts

Each range uses a separate shunt resistor selected by a switch. This is simpler but requires break-before-make switching.

## Shunt Construction

Shunt resistors for high currents require special construction:

**Material**: Manganin (copper-manganese-nickel alloy) is commonly used because of its low temperature coefficient of resistance.

**Construction**: Large current-carrying conductors with thin manganin elements for the resistance.

**Heat dissipation**: Shunts may be mounted on heat sinks or designed for oil immersion.

**Four-terminal design**: Separate current and voltage terminals eliminate contact resistance errors.

## Digital Multimeters

Digital multimeters (DMMs) combine voltage, current, and resistance measurement in one instrument using electronic rather than electromechanical principles.

### Basic DMM Architecture

A DMM consists of:

1. **Input conditioning**: Range switching, attenuation, and protection circuits
2. **Analog-to-digital converter (ADC)**: Converts analog input to digital form
3. **Display controller**: Drives the digital display
4. **Microcontroller**: Manages operation, auto-ranging, and features

### Voltage Measurement

DMMs measure voltage using a high-impedance voltage divider followed by an ADC:

- Input impedance: Typically 10 MΩ or higher
- Resolution: Determined by ADC (typically 3½ to 6½ digits)
- Accuracy: 0.1% to 0.001% depending on quality

### Current Measurement

DMMs measure current using internal shunt resistors:

- Shunt voltage is measured by the ADC
- Multiple ranges use different shunt values
- Burden voltage is displayed or specified

### Resistance Measurement

DMMs measure resistance by passing a known current and measuring voltage:

$$R = \frac{V}{I_{test}}$$

- Different ranges use different test currents
- Two-wire vs. four-wire measurement options
- Open-circuit voltage is typically limited

### DMM Specifications

**Digits/Counts**: 3½-digit = 2000 counts, 4½-digit = 20000 counts
**Accuracy**: Expressed as ±(% reading + digits)
**Input impedance**: For voltage ranges
**Burden voltage**: For current ranges
**Speed**: Readings per second

## Comparison: Analog vs. Digital

| Characteristic | Analog (PMMC) | Digital (DMM) |
|---------------|---------------|---------------|
| Resolution | Limited by scale | High (many digits) |
| Accuracy | 1-3% typical | 0.1-0.5% typical |
| Input impedance | Varies with range | Constant (10 MΩ typical) |
| Reading ease | Requires interpolation | Direct numerical |
| Trend indication | Excellent (pointer position) | Poor (numbers change) |
| Cost | Moderate | Low to high |
| Battery needed | No (passive) | Yes |

## Summary

A DC ammeter uses a PMMC movement with a parallel shunt resistor. The shunt diverts most current around the movement while allowing a proportional current to cause deflection. The burden voltage created by the ammeter can affect circuit operation. Multi-range ammeters use various switching arrangements for different current ranges. Digital multimeters combine voltage, current, and resistance measurement using electronic technology, offering higher accuracy and more features than analog instruments.
