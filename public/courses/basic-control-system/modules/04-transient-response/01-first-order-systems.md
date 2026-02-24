---
title: First-Order Systems
readingTime: 18
difficulty: intermediate
objectives:
  - Identify first-order system transfer functions
  - Calculate and interpret the time constant
  - Analyze step response of first-order systems
  - Determine rise time and settling time
keyPoints:
  - First-order systems have one energy storage element
  - The time constant τ determines response speed
  - Step response reaches 63.2% at t = τ
  - Settling time (2%) is approximately 4τ
---

# First-Order Systems

## Introduction

**First-order systems** are the simplest dynamic systems, containing only one energy storage element. Despite their simplicity, they are fundamental building blocks in control engineering and appear frequently in practical applications such as thermal systems, RC circuits, and level control systems.

## Transfer Function

### Standard Form

The standard transfer function for a first-order system is:

$$G(s) = \frac{K}{\tau s + 1}$$

Where:
- $K$ = DC gain (steady-state gain)
- $\tau$ = time constant (seconds)

### Alternative Forms

**General form:**
$$G(s) = \frac{b}{as + b} = \frac{b/a}{s + b/a} = \frac{K}{\tau s + 1}$$

**Pole location:**
The single pole is at $s = -1/\tau$

## Physical Examples

### Thermal System

A simple thermal system (heating a body):

$$C\frac{dT}{dt} = -\frac{T - T_a}{R} + Q$$

Where:
- $C$ = thermal capacitance
- $R$ = thermal resistance
- $T$ = temperature
- $T_a$ = ambient temperature
- $Q$ = heat input

Transfer function (temperature to heat input):
$$G(s) = \frac{T(s)}{Q(s)} = \frac{R}{RCs + 1} = \frac{R}{\tau s + 1}$$

Where $\tau = RC$

### RC Circuit

The classic RC low-pass filter:

$$V_{out} = V_{in} \frac{1/RC}{s + 1/RC} = V_{in} \frac{1}{\tau s + 1}$$

Where $\tau = RC$

## Step Response

### Derivation

For a unit step input $U(s) = 1/s$:

$$Y(s) = G(s)U(s) = \frac{K}{\tau s + 1} \cdot \frac{1}{s}$$

Using partial fraction expansion:

$$Y(s) = K\left(\frac{1}{s} - \frac{1}{s + 1/\tau}\right) = K\left(\frac{1}{s} - \frac{\tau}{\tau s + 1}\right)$$

Taking the inverse Laplace transform:

$$y(t) = K(1 - e^{-t/\tau}), \quad t \geq 0$$

### Response Characteristics

| Time | Response Value | % of Final |
|------|---------------|------------|
| $t = 0$ | $y(0) = K(1 - e^0) = 0$ | 0% |
| $t = \tau$ | $y(\tau) = K(1 - e^{-1}) = 0.632K$ | 63.2% |
| $t = 2\tau$ | $y(2\tau) = K(1 - e^{-2}) = 0.865K$ | 86.5% |
| $t = 3\tau$ | $y(3\tau) = K(1 - e^{-3}) = 0.950K$ | 95.0% |
| $t = 4\tau$ | $y(4\tau) = K(1 - e^{-4}) = 0.982K$ | 98.2% |
| $t = 5\tau$ | $y(5\tau) = K(1 - e^{-5}) = 0.993K$ | 99.3% |
| $t \to \infty$ | $y(\infty) = K$ | 100% |

### The Time Constant τ

The **time constant** τ is the most important parameter of a first-order system:

**Physical meaning:**
- Time to reach 63.2% of the final value
- Time for the exponential decay to reduce to $1/e \approx 37\%$ of initial rate
- Inversely proportional to pole distance from origin

**Smaller τ:**
- Faster response
- Pole farther left in s-plane
- Wider bandwidth

**Larger τ:**
- Slower response
- Pole closer to origin
- Narrower bandwidth

## Time Domain Specifications

### Rise Time ($t_r$)

The time to go from 10% to 90% of final value:

$$t_r = t_{90\%} - t_{10\%}$$

For first-order systems:
$$t_r \approx 2.2\tau$$

### Settling Time ($t_s$)

The time to reach and stay within a specified tolerance of the final value:

**For 2% criterion:**
$$t_s \approx 4\tau$$

**For 5% criterion:**
$$t_s \approx 3\tau$$

### Delay Time ($t_d$)

The time to reach 50% of final value:

$$t_d \approx 0.69\tau$$

## Ramp Response

For a ramp input $u(t) = t$:

$$U(s) = \frac{1}{s^2}$$

$$Y(s) = \frac{K}{\tau s + 1} \cdot \frac{1}{s^2} = K\left[\frac{\tau}{s} + \frac{1}{s^2} - \frac{\tau}{s + 1/\tau}\right]$$

$$y(t) = K(t - \tau + \tau e^{-t/\tau})$$

For large $t$:
$$y(t) \approx K(t - \tau)$$

The steady-state error for a ramp input is:
$$e_{ss} = K\tau$$

## Impulse Response

For a unit impulse input $u(t) = \delta(t)$:

$$Y(s) = \frac{K}{\tau s + 1}$$

$$y(t) = \frac{K}{\tau} e^{-t/\tau}, \quad t \geq 0$$

The impulse response is the derivative of the step response.

## Frequency Response

### Bode Plot Characteristics

**Magnitude:**
$$|G(j\omega)| = \frac{K}{\sqrt{1 + (\omega\tau)^2}}$$

In dB:
$$|G(j\omega)|_{dB} = 20\log K - 20\log\sqrt{1 + (\omega\tau)^2}$$

**Phase:**
$$\angle G(j\omega) = -\arctan(\omega\tau)$$

**Corner frequency:**
$$\omega_c = \frac{1}{\tau}$$

**Key features:**
- Low-frequency asymptote: 20 log K (horizontal)
- High-frequency asymptote: -20 dB/decade slope
- At corner frequency: magnitude is -3 dB from low-frequency value
- Phase goes from 0° to -90°

## Example Problem

**Problem:** A temperature sensor has a time constant of 5 seconds. Initially at 20°C, it is suddenly placed in a 100°C environment. Find:
1. The temperature after 10 seconds
2. Time to reach 95°C

**Solution:**

**Transfer function:**
$$G(s) = \frac{1}{5s + 1}$$

**Step response (K = 100 - 20 = 80°C, plus initial 20°C):**
$$T(t) = 20 + 80(1 - e^{-t/5})$$

**At t = 10 s:**
$$T(10) = 20 + 80(1 - e^{-2}) = 20 + 80(0.865) = 89.2°C$$

**Time to reach 95°C:**
$$95 = 20 + 80(1 - e^{-t/5})$$
$$75 = 80(1 - e^{-t/5})$$
$$0.9375 = 1 - e^{-t/5}$$
$$e^{-t/5} = 0.0625$$
$$t = -5\ln(0.0625) = 13.9 \text{ seconds}$$

## Summary

First-order systems are characterized by a single time constant τ. The step response follows an exponential approach to the final value, reaching 63.2% at t = τ. The settling time is approximately 4τ for 2% tolerance. Understanding first-order behavior is essential as many practical systems can be approximated as first-order, and first-order dynamics often dominate the response of higher-order systems.
