---
title: DC Voltmeters
readingTime: 30
difficulty: beginner
objectives:
  - Design voltmeter circuits using multiplier resistors
  - Calculate multiplier resistance for any range
  - Understand voltmeter sensitivity and loading effects
  - Design multi-range voltmeters
keyPoints:
  - Voltmeter uses PMMC with series multiplier resistor
  - Sensitivity determines loading effect
  - Multi-range voltmeters switch different multipliers
  - Loading errors must be considered
---

# DC Voltmeters

A DC voltmeter measures the potential difference between two points in a circuit. Since the PMMC movement is inherently a current-measuring device, voltage measurement requires adding series resistance to convert voltage to a proportional current.

## Basic Voltmeter Circuit

A DC voltmeter consists of a PMMC movement in series with a resistor called a multiplier. The multiplier limits the current through the movement to the full-scale value when the full voltage is applied.

### Circuit Configuration

```
+V o----[Rm]----[Rs]----o -V
        |        |
       (M)      Rs = Multiplier
      PMMC
```

The PMMC movement (M) has internal resistance $R_m$. The series multiplier resistor $R_s$ is selected so that full-scale deflection occurs at the desired voltage.

### Multiplier Resistance Calculation

For a voltmeter with full-scale voltage $V_{fs}$ and a movement requiring full-scale current $I_{fsd}$:

$$V_{fs} = I_{fsd}(R_m + R_s)$$

Solving for the multiplier resistance:

$$R_s = \frac{V_{fs}}{I_{fsd}} - R_m$$

**Example**: Design a voltmeter for 10V full-scale using a 50 μA movement with 2000 Ω internal resistance.

$$R_s = \frac{10 \text{ V}}{50 \text{ μA}} - 2000 \text{ Ω}$$
$$R_s = 200,000 - 2000 = 198,000 \text{ Ω} = 198 \text{ kΩ}$$

## Voltmeter Sensitivity

Voltmeter sensitivity is a key specification that determines how much the voltmeter loads the circuit being measured.

### Definition

Voltmeter sensitivity is expressed in ohms per volt (Ω/V):

$$S = \frac{1}{I_{fsd}}$$

This represents the total resistance per volt of full-scale range.

### Significance

Higher sensitivity means:
- Higher total voltmeter resistance
- Less current drawn from the circuit
- Less loading effect
- More accurate voltage measurements in high-impedance circuits

**Example**: A 50 μA movement has sensitivity of $1/50 \times 10^{-6} = 20,000$ Ω/V

On the 10V range, total resistance = $20,000 \times 10 = 200,000$ Ω

### Typical Sensitivity Values

| Movement Type | Full-Scale Current | Sensitivity |
|--------------|-------------------|-------------|
| High sensitivity | 10 μA | 100,000 Ω/V |
| Standard | 50 μA | 20,000 Ω/V |
| Economy | 1 mA | 1,000 Ω/V |

## Loading Effect

When a voltmeter is connected across a component, it draws current and changes the voltage being measured. This loading effect introduces an error.

### Loading Error Analysis

Consider measuring the voltage across resistor $R_2$ in a voltage divider:

$$V_{true} = V_s \frac{R_2}{R_1 + R_2}$$

With the voltmeter (resistance $R_v$) connected:

$$V_{measured} = V_s \frac{R_2 || R_v}{R_1 + R_2 || R_v}$$

where $R_2 || R_v = \frac{R_2 R_v}{R_2 + R_v}$

The loading error is:

$$\text{Error} = \frac{V_{measured} - V_{true}}{V_{true}} \times 100\%$$

**Example**: A 10V source has two 100 kΩ resistors in series. Measure voltage across one resistor with a 20,000 Ω/V voltmeter on the 10V range.

True voltage = 5V

Voltmeter resistance = $20,000 \times 10 = 200$ kΩ

$R_2 || R_v = \frac{100 \times 200}{100 + 200} = 66.7$ kΩ

$V_{measured} = 10 \times \frac{66.7}{100 + 66.7} = 4.0$ V

Loading error = $\frac{4.0 - 5.0}{5.0} \times 100\% = -20\%$

This example shows why high-sensitivity voltmeters are essential for high-impedance circuits.

## Multi-Range Voltmeters

Practical voltmeters offer multiple ranges. Several switching arrangements are used.

### Individual Multiplier Method

Each range has a separate multiplier resistor. A switch selects which multiplier is in series with the movement.

```
+V o----[S1]----[R1]----+
      |                 |
      +----[S2]----[R2]-+
      |                 |
      +----[S3]----[R3]-+----[M]----o -V
```

Advantages: Simple design, one component per range.

Disadvantages: Break-before-make switches can leave the movement unprotected during switching.

### Progressive Multiplier Method

Multiplier resistors are connected in series, with the switch tapping off at different points.

```
+V o----[S1]----[R1]----[R2]----[R3]----[M]----o -V
                  |       |
                  S2      S3
```

Advantages: Lower total resistance values, make-before-break switching possible.

Disadvantages: All resistors in circuit, total error accumulates.

## Extending Voltmeter Range

### Using External Multipliers

For voltages beyond the instrument's maximum range, external multipliers can be used:

$$R_{ext} = \frac{V_{new} - V_{max}}{I_{fsd}}$$

where $V_{max}$ is the original full-scale voltage and $V_{new}$ is the desired range.

### Voltage Multipliers

High-voltage measurements require specially designed multipliers with:
- High voltage ratings
- Proper insulation
- Safety interlocks

## Summary

A DC voltmeter uses a PMMC movement with a series multiplier resistor. The multiplier resistance is calculated from the desired full-scale voltage and the movement characteristics. Voltmeter sensitivity, expressed in ohms per volt, determines the loading effect on the circuit being measured. High-sensitivity voltmeters are essential for accurate measurements in high-impedance circuits. Multi-range voltmeters use switching arrangements to select different multiplier resistors.
