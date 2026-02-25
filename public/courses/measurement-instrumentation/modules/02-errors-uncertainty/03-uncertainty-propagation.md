---
title: Uncertainty Propagation
readingTime: 35
difficulty: intermediate
objectives:
  - Understand the law of propagation of uncertainty
  - Apply propagation formulas for common operations
  - Combine Type A and Type B uncertainties
  - Calculate expanded uncertainty with coverage factors
keyPoints:
  - Uncertainties propagate through calculations
  - Independent uncertainties combine in quadrature
  - Coverage factors provide confidence levels
  - Total uncertainty requires all sources
---

# Uncertainty Propagation

When a quantity is calculated from measured values, the uncertainties in those measurements propagate through the calculation to affect the uncertainty in the result. Understanding this propagation is essential for expressing the uncertainty in derived quantities.

## The Law of Propagation of Uncertainty

The general law of propagation of uncertainty relates the uncertainty in a result to the uncertainties in the input quantities.

### Single-Variable Functions

For a function $y = f(x)$, the uncertainty in $y$ is related to the uncertainty in $x$ by:

$$u_y = \left|\frac{df}{dx}\right| \cdot u_x$$

where $u_y$ is the uncertainty in $y$, $u_x$ is the uncertainty in $x$, and $df/dx$ is the derivative (sensitivity coefficient).

### Multi-Variable Functions

For a function $y = f(x_1, x_2, ..., x_n)$, the combined standard uncertainty is:

$$u_c(y) = \sqrt{\sum_{i=1}^{n}\left(\frac{\partial f}{\partial x_i}\right)^2 u^2(x_i)}$$

This formula assumes that the input quantities are independent (uncorrelated). The partial derivatives $\partial f / \partial x_i$ are called sensitivity coefficients.

## Propagation for Common Operations

### Addition and Subtraction

For $y = a + b$ or $y = a - b$:

$$u_y = \sqrt{u_a^2 + u_b^2}$$

The absolute uncertainties combine in quadrature (the square root of the sum of squares).

**Example**: A length is measured as $(25.3 \pm 0.2)$ cm and $(10.1 \pm 0.1)$ cm. The total length is:

$$L = 25.3 + 10.1 = 35.4 \text{ cm}$$
$$u_L = \sqrt{0.2^2 + 0.1^2} = 0.22 \text{ cm}$$

Result: $L = 35.4 \pm 0.2$ cm

### Multiplication and Division

For $y = a \cdot b$ or $y = a/b$:

$$\frac{u_y}{y} = \sqrt{\left(\frac{u_a}{a}\right)^2 + \left(\frac{u_b}{b}\right)^2}$$

The relative (fractional) uncertainties combine in quadrature.

**Example**: Power $P = VI$ where $V = 12.0 \pm 0.1$ V and $I = 2.50 \pm 0.05$ A.

$$P = 12.0 \times 2.50 = 30.0 \text{ W}$$

Relative uncertainties:
$$\frac{u_V}{V} = \frac{0.1}{12.0} = 0.83\%$$
$$\frac{u_I}{I} = \frac{0.05}{2.50} = 2.0\%$$

Combined relative uncertainty:
$$\frac{u_P}{P} = \sqrt{0.0083^2 + 0.020^2} = 2.2\%$$

$$u_P = 30.0 \times 0.022 = 0.66 \text{ W}$$

Result: $P = 30.0 \pm 0.7$ W

### Powers and Roots

For $y = x^n$:

$$\frac{u_y}{y} = |n| \cdot \frac{u_x}{x}$$

The relative uncertainty is multiplied by the absolute value of the exponent.

**Example**: The area of a square with side $s = 5.0 \pm 0.1$ cm.

$$A = s^2 = 25.0 \text{ cm}^2$$

$$\frac{u_A}{A} = 2 \times \frac{0.1}{5.0} = 4\%$$

$$u_A = 25.0 \times 0.04 = 1.0 \text{ cm}^2$$

Result: $A = 25.0 \pm 1.0$ cm²

### Combined Operations

For formulas combining multiple operations, apply the propagation rules step by step, or use the general formula with partial derivatives.

**Example**: Resistance $R = V/I$ where $V = 10.00 \pm 0.05$ V and $I = 0.500 \pm 0.005$ A.

$$R = \frac{10.00}{0.500} = 20.00 \text{ Ω}$$

$$\frac{u_R}{R} = \sqrt{\left(\frac{0.05}{10.00}\right)^2 + \left(\frac{0.005}{0.500}\right)^2} = \sqrt{0.005^2 + 0.01^2} = 1.12\%$$

$$u_R = 20.00 \times 0.0112 = 0.22 \text{ Ω}$$

Result: $R = 20.00 \pm 0.22$ Ω

## Type A and Type B Uncertainties

The Guide to the Expression of Uncertainty in Measurement (GUM) classifies uncertainty components by how they are evaluated.

### Type A Uncertainty

Type A uncertainties are evaluated by statistical analysis of repeated measurements:

$$u_A = s/\sqrt{n}$$

Type A evaluation applies when you have a series of repeated measurements and can calculate the standard deviation and standard error.

### Type B Uncertainty

Type B uncertainties are evaluated by other means, including:
- Calibration certificate specifications
- Manufacturer's specifications
- Reference data uncertainties
- Previous measurement data
- General knowledge of instrument behavior

For example, if a calibration certificate states that a standard resistor has value $100.00 \pm 0.01$ Ω with 95% confidence, the standard uncertainty is:

$$u_B = \frac{0.01}{2} = 0.005 \text{ Ω}$$

(The factor of 2 converts from 95% confidence to standard uncertainty, assuming a normal distribution.)

### Combining Type A and Type B

Type A and Type B uncertainties are combined in quadrature:

$$u_c = \sqrt{u_A^2 + u_B^2}$$

Both types contribute equally to the combined uncertainty—what matters is the magnitude of the uncertainty, not how it was evaluated.

## Expanded Uncertainty

The combined standard uncertainty represents approximately one standard deviation. For practical applications, an expanded uncertainty is often reported that defines an interval with higher confidence.

### Coverage Factor

The expanded uncertainty is calculated by multiplying the combined standard uncertainty by a coverage factor $k$:

$$U = k \cdot u_c$$

Common coverage factors:
- $k = 1$: 68% confidence (one standard deviation)
- $k = 2$: 95% confidence (approximately)
- $k = 3$: 99.7% confidence (approximately)

For exact confidence levels, especially with few degrees of freedom, the t-distribution provides appropriate coverage factors.

### Reporting Expanded Uncertainty

A complete uncertainty statement includes:

**Example**: The resistance was measured as $R = 1000.15 \pm 0.35$ Ω. The reported uncertainty is an expanded uncertainty with coverage factor $k = 2$, corresponding to approximately 95% confidence.

## Uncertainty Budget

An uncertainty budget documents all uncertainty components and their contributions to the combined uncertainty.

| Source | Value | Standard Uncertainty | Sensitivity Coefficient | Contribution |
|--------|-------|---------------------|------------------------|--------------|
| Voltage measurement | 10.00 V | 0.05 V | 0.1 Ω/V | 0.005 Ω |
| Current measurement | 0.500 A | 0.005 A | 40 Ω/A | 0.20 Ω |
| Lead resistance | 0.01 Ω | 0.001 Ω | 1 | 0.001 Ω |
| Combined | | | | 0.20 Ω |

The uncertainty budget helps identify the largest contributors to total uncertainty, guiding efforts to improve measurement quality.

## Practical Guidelines

1. **Identify all significant uncertainty sources** - Consider the measurement principle, instrument, environment, and operator.

2. **Evaluate each component** - Use Type A methods when possible, Type B when necessary.

3. **Express all uncertainties as standard uncertainties** - Convert specifications to standard deviations.

4. **Combine using propagation formulas** - Apply appropriate formulas for the mathematical relationship.

5. **Report expanded uncertainty** - Use $k = 2$ for approximately 95% confidence unless otherwise required.

## Summary

Uncertainty propagation relates the uncertainty in a calculated result to the uncertainties in input quantities. For independent quantities, uncertainties combine in quadrature according to the law of propagation of uncertainty. Type A uncertainties are evaluated statistically; Type B uncertainties are evaluated by other means. The combined uncertainty is multiplied by a coverage factor to give the expanded uncertainty at a specified confidence level.
