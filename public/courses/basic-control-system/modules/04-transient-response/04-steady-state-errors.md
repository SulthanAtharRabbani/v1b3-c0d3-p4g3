---
title: Steady-State Errors
readingTime: 20
difficulty: intermediate
objectives:
  - Define steady-state error and its significance
  - Calculate steady-state error for standard inputs
  - Understand static error constants (Kp, Kv, Ka)
  - Relate system type to steady-state error characteristics
keyPoints:
  - Steady-state error measures final tracking accuracy
  - Error constants depend on the open-loop transfer function
  - System type = number of integrators in open loop
  - Higher type number = better tracking capability
---

# Steady-State Errors

## Introduction

While transient response describes how a system moves toward its final value, **steady-state error** describes how close the final value is to the desired reference. Steady-state error is a critical performance specification that measures the accuracy of a control system in tracking reference inputs.

## Definition

### Steady-State Error

The **steady-state error** is the difference between the reference input and the actual output as time approaches infinity:

$$e_{ss} = \lim_{t \to \infty} e(t) = \lim_{t \to \infty}[r(t) - y(t)]$$

### Error Signal

For a standard feedback system:

```
         +--------+     +--------+
R(s) +→→→| G(s)   |→→→→→| Plant  |→→→ Y(s)
     -    +--------+     +--------+
     ↑                        |
     |                        |
     +←←←←←←←←←←←←←←←←←←←←←←←+
              H(s)
```

The error signal is:
$$E(s) = R(s) - H(s)Y(s)$$

For unity feedback ($H(s) = 1$):
$$E(s) = R(s) - Y(s)$$

## Final Value Theorem

The steady-state error is calculated using the **Final Value Theorem**:

$$e_{ss} = \lim_{t \to \infty} e(t) = \lim_{s \to 0} sE(s)$$

**Conditions:**
- $sE(s)$ must have no poles in the right half-plane
- $sE(s)$ must have no poles on the imaginary axis except possibly at the origin

## Error Signal for Unity Feedback

For a unity feedback system with open-loop transfer function $G(s)$:

$$E(s) = R(s) - Y(s) = R(s) - G(s)E(s)$$

$$E(s) = \frac{R(s)}{1 + G(s)}$$

Therefore:
$$e_{ss} = \lim_{s \to 0} \frac{sR(s)}{1 + G(s)}$$

## Standard Test Inputs

### 1. Step Input (Position)

$$r(t) = Au(t), \quad R(s) = \frac{A}{s}$$

$$e_{ss} = \lim_{s \to 0} \frac{A}{1 + G(s)} = \frac{A}{1 + K_p}$$

Where $K_p$ is the **position error constant**:
$$K_p = \lim_{s \to 0} G(s)$$

### 2. Ramp Input (Velocity)

$$r(t) = Atu(t), \quad R(s) = \frac{A}{s^2}$$

$$e_{ss} = \lim_{s \to 0} \frac{A}{s[1 + G(s)]} = \frac{A}{K_v}$$

Where $K_v$ is the **velocity error constant**:
$$K_v = \lim_{s \to 0} sG(s)$$

### 3. Parabolic Input (Acceleration)

$$r(t) = \frac{At^2}{2}u(t), \quad R(s) = \frac{A}{s^3}$$

$$e_{ss} = \lim_{s \to 0} \frac{A}{s^2[1 + G(s)]} = \frac{A}{K_a}$$

Where $K_a$ is the **acceleration error constant**:
$$K_a = \lim_{s \to 0} s^2G(s)$$

## System Type

### Definition

The **system type** (or **type number**) is the number of pure integrators ($1/s$ terms) in the open-loop transfer function $G(s)$.

$$G(s) = \frac{K(s+z_1)(s+z_2)\cdots}{s^N(s+p_1)(s+p_2)\cdots}$$

Where $N$ is the system type.

### Steady-State Errors by System Type

| System Type | Step Input | Ramp Input | Parabolic Input |
|-------------|------------|------------|-----------------|
| Type 0 | $\frac{A}{1+K_p}$ (finite) | $\infty$ | $\infty$ |
| Type 1 | 0 | $\frac{A}{K_v}$ (finite) | $\infty$ |
| Type 2 | 0 | 0 | $\frac{A}{K_a}$ (finite) |
| Type 3+ | 0 | 0 | 0 |

### Type 0 System

$$G(s) = \frac{K}{(s+p_1)(s+p_2)\cdots}$$

- $K_p = K/(p_1 p_2 \cdots)$ = finite
- $K_v = 0$
- $K_a = 0$

**Characteristics:**
- Finite steady-state error for step input
- Infinite error for ramp and parabolic inputs
- Cannot track changing references

### Type 1 System

$$G(s) = \frac{K}{s(s+p_1)(s+p_2)\cdots}$$

- $K_p = \infty$
- $K_v = K/(p_1 p_2 \cdots)$ = finite
- $K_a = 0$

**Characteristics:**
- Zero steady-state error for step input
- Finite error for ramp input
- Infinite error for parabolic input
- Called "servo system" or "velocity-following system"

### Type 2 System

$$G(s) = \frac{K}{s^2(s+p_1)(s+p_2)\cdots}$$

- $K_p = \infty$
- $K_v = \infty$
- $K_a = K/(p_1 p_2 \cdots)$ = finite

**Characteristics:**
- Zero error for step and ramp inputs
- Finite error for parabolic input
- Can track accelerating references

## Error Constants Calculation

### Example 1: Type 0 System

$$G(s) = \frac{10}{(s+1)(s+2)}$$

**Position error constant:**
$$K_p = \lim_{s \to 0} G(s) = \frac{10}{(1)(2)} = 5$$

**Steady-state error for unit step:**
$$e_{ss} = \frac{1}{1+K_p} = \frac{1}{6} = 0.167$$

### Example 2: Type 1 System

$$G(s) = \frac{100}{s(s+5)}$$

**Position error constant:**
$$K_p = \lim_{s \to 0} G(s) = \infty$$

**Velocity error constant:**
$$K_v = \lim_{s \to 0} sG(s) = \frac{100}{5} = 20$$

**Steady-state errors:**
- Unit step: $e_{ss} = 0$
- Unit ramp: $e_{ss} = \frac{1}{K_v} = 0.05$

### Example 3: Type 2 System

$$G(s) = \frac{50}{s^2(s+10)}$$

**Error constants:**
$$K_p = \lim_{s \to 0} G(s) = \infty$$
$$K_v = \lim_{s \to 0} sG(s) = \infty$$
$$K_a = \lim_{s \to 0} s^2G(s) = \frac{50}{10} = 5$$

**Steady-state errors:**
- Unit step: $e_{ss} = 0$
- Unit ramp: $e_{ss} = 0$
- Unit parabola: $e_{ss} = \frac{1}{K_a} = 0.2$

## Non-Unity Feedback Systems

For systems with $H(s) \neq 1$:

$$E(s) = R(s) - H(s)Y(s) = R(s) - H(s)G(s)E(s)$$

$$E(s) = \frac{R(s)}{1 + G(s)H(s)}$$

The error constants are calculated using the **open-loop transfer function** $G(s)H(s)$:

$$K_p = \lim_{s \to 0} G(s)H(s)$$
$$K_v = \lim_{s \to 0} sG(s)H(s)$$
$$K_a = \lim_{s \to 0} s^2G(s)H(s)$$

## Disturbance Rejection

Steady-state error due to disturbances:

For a disturbance $D(s)$ entering at the plant input:

$$E(s) = \frac{-G_p(s)D(s)}{1 + G_c(s)G_p(s)}$$

Where $G_c(s)$ is the controller and $G_p(s)$ is the plant.

**Key insight:** An integrator in the forward path eliminates steady-state error due to constant disturbances.

## Summary

Steady-state error measures how accurately a control system tracks reference inputs in the long term. The system type (number of integrators) determines what inputs can be tracked with zero error. Static error constants (Kp, Kv, Ka) quantify tracking accuracy for step, ramp, and parabolic inputs. Increasing system type improves tracking but may affect stability.
