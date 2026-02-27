---
title: Time-Invariance Property
readingTime: 25
difficulty: intermediate
objectives:
  - Define time-invariance and its mathematical representation
  - Test systems for time-invariance
  - Distinguish between time-invariant and time-varying systems
  - Understand the implications of time-invariance for system analysis
keyPoints:
  - Time-invariant systems have time-independent behavior
  - A delayed input produces a delayed output
  - Time-varying systems have parameters that change with time
  - LTI systems must satisfy both linearity and time-invariance
---

# Time-Invariance Property

## Introduction

Time-invariance is a property that indicates a system's behavior does not change over time. If we apply an input today and get a certain output, applying the same input tomorrow will produce the same output shape, just shifted in time.

## Definition of Time-Invariance

A system is **time-invariant** if:

$$x(t) \to y(t) \implies x(t - t_0) \to y(t - t_0)$$

for any time shift $t_0$.

In other words, delaying the input by $t_0$ results in an output that is the original output delayed by the same amount $t_0$.

## Mathematical Representation

If the input-output relationship is:

$$y(t) = \mathcal{H}[x(t)]$$

Then for a time-invariant system:

$$\mathcal{H}[x(t - t_0)] = y(t - t_0)$$

The system operator $\mathcal{H}$ does not explicitly depend on time.

## Testing for Time-Invariance

### Procedure

**Step 1:** Apply input $x(t)$ and find output $y(t)$

**Step 2:** Delay the input by $t_0$ to get $x(t - t_0)$

**Step 3:** Apply $x(t - t_0)$ to the system and find the new output $y'(t)$

**Step 4:** Delay the original output by $t_0$ to get $y(t - t_0)$

**Step 5:** Compare: Is $y'(t) = y(t - t_0)$?

If yes for all $t_0$, the system is time-invariant.

## Examples of Time-Invariant Systems

### Example 1: RC Circuit (Fixed R and C)

$$y(t) = RC\frac{dx(t)}{dt} + x(t)$$

With constant $R$ and $C$, if $x(t) \to y(t)$, then $x(t-t_0) \to y(t-t_0)$.

### Example 2: Ideal Amplifier

$$y(t) = Kx(t)$$

Time-invariant since the gain $K$ doesn't depend on time.

### Example 3: Time Delay

$$y(t) = x(t - t_d)$$

If input is delayed: $x(t) \to x(t-t_0)$

Output becomes: $y'(t) = x(t-t_0-t_d) = y(t-t_0)$ ✓

### Example 4: Averager

$$y(t) = \frac{1}{T}\int_{t-T}^{t} x(\tau) d\tau$$

The integration window moves with time, but the window size $T$ is fixed.

## Examples of Time-Varying Systems

### Example 1: Amplitude Modulation

$$y(t) = x(t) \cdot \cos(\omega_c t)$$

Testing: Original output is $y(t) = x(t)\cos(\omega_c t)$

With delayed input $x(t-t_0)$: $y'(t) = x(t-t_0)\cos(\omega_c t)$

But $y(t-t_0) = x(t-t_0)\cos(\omega_c(t-t_0)) \neq y'(t)$ ✗

### Example 2: Time-Varying Gain

$$y(t) = g(t)x(t)$$

where $g(t)$ is a function of time.

Testing: $y(t-t_0) = g(t-t_0)x(t-t_0)$

But with delayed input: $y'(t) = g(t)x(t-t_0) \neq y(t-t_0)$ ✗

### Example 3: Varying Resistance

$$y(t) = R(t) \cdot x(t)$$

If resistance changes with time, the system is time-varying.

### Example 4: Speech Signal Processing

Systems that adapt their parameters over time (like adaptive filters) are inherently time-varying.

## Physical Interpretation

### Time-Invariant Systems

- System parameters are constant
- The system doesn't "age" or "drift"
- Same input always produces same output pattern
- Examples: Passive circuits with fixed components

### Time-Varying Systems

- System parameters change with time
- Output depends on when input is applied
- Common in adaptive and learning systems
- Examples: Systems with aging components, adaptive filters

## Significance in System Analysis

Time-invariance enables:

1. **Impulse response characterization:** A single $h(t)$ describes the system completely
2. **Convolution:** Output can be computed using convolution integral
3. **Transfer function:** Frequency domain analysis becomes straightforward
4. **Fourier analysis:** Frequency response is well-defined

## Combined LTI Property

For a system to be **LTI (Linear Time-Invariant)**, it must satisfy:

1. **Linearity:** Superposition principle holds
2. **Time-invariance:** Time-shifted inputs produce time-shifted outputs

Both properties are independent—a system can be linear but time-varying, or nonlinear but time-invariant.

## Summary Table

| Property | Time-Invariant | Time-Varying |
|----------|---------------|--------------|
| Input-Output | $x(t-t_0) \to y(t-t_0)$ | $x(t-t_0) \not\to y(t-t_0)$ |
| Parameters | Constant | Function of time |
| Impulse Response | Single $h(t)$ | $h(t, \tau)$ (two-parameter) |
| Examples | RC circuit, amplifier | Modulator, adaptive filter |

## Summary

Time-invariance ensures that a system's behavior is consistent over time, enabling the use of powerful analytical tools like convolution and Fourier analysis. Combined with linearity, time-invariance defines LTI systems, which form the basis of classical signal processing theory.
