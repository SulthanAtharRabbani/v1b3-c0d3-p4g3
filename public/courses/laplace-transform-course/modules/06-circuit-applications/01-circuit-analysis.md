---
title: s-Domain Circuit Analysis
readingTime: 25
difficulty: intermediate
objectives:
  - Transform circuit elements to s-domain impedances
  - Apply circuit analysis techniques in the s-domain
  - Solve for transient and steady-state responses
keyPoints:
  - Resistors, capacitors, and inductors have s-domain representations
  - Kirchhoff's laws apply in the s-domain
  - Initial conditions are incorporated through equivalent sources
---

# s-Domain Circuit Analysis

## Transforming Circuit Elements

The key to s-domain circuit analysis is representing each element by its s-domain equivalent, which includes impedance and initial condition sources.

### Resistor

**Time domain:** $v_R(t) = Ri(t)$

**s-domain:** $V_R(s) = RI(s)$

The impedance of a resistor is simply $Z_R = R$ (constant, not dependent on $s$).

### Capacitor

**Time domain:** $i_C(t) = C\frac{dv_C(t)}{dt}$

**s-domain (using differentiation property):**

$$I_C(s) = C[sV_C(s) - v_C(0^-)]$$

Rearranging:

$$V_C(s) = \frac{I_C(s)}{sC} + \frac{v_C(0^-)}{s}$$

The capacitor can be represented as:
- **Impedance:** $Z_C = \frac{1}{sC}$
- **Initial condition source:** $\frac{v_C(0^-)}{s}$ in series

### Inductor

**Time domain:** $v_L(t) = L\frac{di_L(t)}{dt}$

**s-domain:**

$$V_L(s) = L[sI_L(s) - i_L(0^-)] = sLI_L(s) - Li_L(0^-)$$

Rearranging:

$$I_L(s) = \frac{V_L(s)}{sL} + \frac{i_L(0^-)}{s}$$

The inductor can be represented as:
- **Impedance:** $Z_L = sL$
- **Initial condition source:** $Li_L(0^-)$ in series

## Summary Table: s-Domain Elements

| Element | Impedance | Series Initial Source |
|---------|-----------|----------------------|
| Resistor | $R$ | None |
| Capacitor | $\frac{1}{sC}$ | $\frac{v_C(0^-)}{s}$ |
| Inductor | $sL$ | $Li_L(0^-)$ |

## Example: RC Circuit Analysis

Consider an RC circuit with a step input $v_s(t) = V_0 u(t)$ and initial capacitor voltage $v_C(0^-) = V_1$.

### Step 1: Draw s-Domain Circuit

- Source: $V_s(s) = \frac{V_0}{s}$
- Resistor: $R$
- Capacitor: $\frac{1}{sC}$ with series source $\frac{V_1}{s}$

### Step 2: Apply KVL

$$\frac{V_0}{s} = RI(s) + \frac{I(s)}{sC} + \frac{V_1}{s}$$

### Step 3: Solve for Current

$$I(s)\left(R + \frac{1}{sC}\right) = \frac{V_0 - V_1}{s}$$

$$I(s) = \frac{V_0 - V_1}{s\left(R + \frac{1}{sC}\right)} = \frac{V_0 - V_1}{R} \cdot \frac{1}{s + \frac{1}{RC}}$$

### Step 4: Inverse Transform

$$i(t) = \frac{V_0 - V_1}{R} e^{-t/RC} u(t)$$

### Step 5: Find Capacitor Voltage

$$V_C(s) = \frac{I(s)}{sC} + \frac{V_1}{s}$$

$$= \frac{V_0 - V_1}{RC} \cdot \frac{1}{s(s + \frac{1}{RC})} + \frac{V_1}{s}$$

Using partial fractions and inverse transform:

$$v_C(t) = V_0 + (V_1 - V_0)e^{-t/RC}$$

## Example: RLC Circuit

Consider a series RLC circuit with zero initial conditions and voltage source $v_s(t)$.

### Impedances

- Resistor: $R$
- Inductor: $sL$
- Capacitor: $\frac{1}{sC}$

### Total Impedance

$$Z_{total}(s) = R + sL + \frac{1}{sC} = \frac{LCs^2 + RCs + 1}{sC}$$

### Current

$$I(s) = \frac{V_s(s)}{Z_{total}(s)} = \frac{sC \cdot V_s(s)}{LCs^2 + RCs + 1}$$

### Characteristic Equation

The denominator $LCs^2 + RCs + 1 = 0$ determines the natural response:
- **Overdamped:** Two distinct real poles
- **Critically damped:** One repeated real pole
- **Underdamped:** Complex conjugate poles

## System Function (Transfer Function)

For a linear circuit with input $X(s)$ and output $Y(s)$:

$$H(s) = \frac{Y(s)}{X(s)}$$

### Example: RC Low-Pass Filter

For an RC circuit with output across the capacitor:

$$H(s) = \frac{V_C(s)}{V_s(s)} = \frac{\frac{1}{sC}}{R + \frac{1}{sC}} = \frac{1}{RCs + 1} = \frac{1/RC}{s + 1/RC}$$

This is a first-order low-pass filter with cutoff frequency $\omega_c = \frac{1}{RC}$.

## Step Response Analysis

For a system with transfer function $H(s)$, the step response is:

$$Y(s) = H(s) \cdot \frac{1}{s}$$

The time-domain step response is obtained by inverse transform.

### Example: RC Step Response

$$Y(s) = \frac{1/RC}{s + 1/RC} \cdot \frac{1}{s}$$

Using partial fractions:

$$Y(s) = \frac{1}{s} - \frac{1}{s + 1/RC}$$

$$y(t) = (1 - e^{-t/RC})u(t)$$

## Summary

s-domain circuit analysis provides a systematic approach to solving circuits with energy storage elements:

1. **Transform elements** to s-domain impedances with initial condition sources
2. **Apply circuit laws** (KVL, KVL) in the s-domain
3. **Solve algebraic equations** for desired quantities
4. **Inverse transform** to obtain time-domain responses

The transfer function $H(s)$ characterizes the circuit's input-output behavior and reveals stability, frequency response, and transient characteristics.
