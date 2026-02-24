---
title: Introduction to PID Controllers
readingTime: 20
difficulty: intermediate
objectives:
  - Understand the structure of PID controllers
  - Explain the effect of each control action
  - Write the transfer function and time-domain equations
  - Recognize applications of PID control
keyPoints:
  - PID = Proportional + Integral + Derivative actions
  - P reduces error; I eliminates steady-state error; D improves damping
  - Transfer function: Gc(s) = Kp + Ki/s + Kd·s
  - Most widely used controller in industry
---

# Introduction to PID Controllers

## Introduction

The **PID (Proportional-Integral-Derivative) controller** is the workhorse of industrial control. Its simplicity, effectiveness, and intuitive tuning make it the default choice for most control applications. Understanding PID control is essential for any control engineer.

## The Three Control Actions

### Proportional Control (P)

The proportional term produces an output proportional to the error:

$$u_P(t) = K_p e(t)$$

**Transfer function:**
$$G_P(s) = K_p$$

**Characteristics:**
- Direct response to current error
- Larger $K_p$ → Faster response, smaller steady-state error
- Too large $K_p$ → Oscillations, instability
- Cannot eliminate steady-state error entirely

**Effect of increasing Kp:**
- Reduces rise time
- Reduces (but does not eliminate) steady-state error
- Increases overshoot
- May cause instability

### Integral Control (I)

The integral term produces an output proportional to the integral of error:

$$u_I(t) = K_i \int_0^t e(\tau) d\tau$$

**Transfer function:**
$$G_I(s) = \frac{K_i}{s}$$

**Characteristics:**
- Responds to accumulation of past errors
- Eliminates steady-state error
- Adds a pole at origin (increases system type)
- Can cause overshoot and slow settling
- May cause integrator windup

**Effect of increasing Ki:**
- Eliminates steady-state error
- Reduces rise time
- Increases overshoot
- Increases settling time
- May cause instability

### Derivative Control (D)

The derivative term produces an output proportional to the rate of change of error:

$$u_D(t) = K_d \frac{de(t)}{dt}$$

**Transfer function:**
$$G_D(s) = K_d s$$

**Characteristics:**
- Responds to rate of change of error
- Anticipates future error
- Provides damping effect
- Sensitive to noise
- Cannot be used alone (no response to constant error)

**Effect of increasing Kd:**
- Reduces overshoot
- Improves damping
- Reduces settling time
- Has minor effect on rise time
- Amplifies noise

## PID Controller Forms

### Parallel (Ideal) Form

$$u(t) = K_p e(t) + K_i \int e(t) dt + K_d \frac{de(t)}{dt}$$

**Transfer function:**
$$G_c(s) = K_p + \frac{K_i}{s} + K_d s$$

This is the mathematical ideal form, where each gain independently affects its term.

### Standard (Industrial) Form

$$u(t) = K_p \left[ e(t) + \frac{1}{T_i} \int e(t) dt + T_d \frac{de(t)}{dt} \right]$$

**Transfer function:**
$$G_c(s) = K_p \left( 1 + \frac{1}{T_i s} + T_d s \right)$$

Where:
- $K_p$ = proportional gain
- $T_i$ = integral time (reset time)
- $T_d$ = derivative time (rate time)

**Relationship between forms:**
- $K_i = K_p / T_i$
- $K_d = K_p \cdot T_d$

### Series (Interactive) Form

$$G_c(s) = K_p \left( 1 + \frac{1}{T_i s} \right) \left( 1 + T_d s \right)$$

This form is used in some analog controllers and has interacting P, I, and D terms.

## Comparison of Control Actions

| Action | Responds To | Effect | Limitation |
|--------|-------------|--------|------------|
| P | Current error | Fast response | Cannot eliminate SS error |
| I | Past errors | Eliminates SS error | Slow, may overshoot |
| D | Future error trend | Improves damping | Sensitive to noise |

## Common Controller Types

### P Controller

$$G_c(s) = K_p$$

**Application:** Systems where steady-state error is acceptable or where the process has integral action naturally.

**Example:** Level control in a tank where exact level is not critical.

### PI Controller

$$G_c(s) = K_p + \frac{K_i}{s}$$

**Application:** Most common industrial controller. Eliminates steady-state error without excessive derivative sensitivity.

**Example:** Flow control, temperature control.

### PD Controller

$$G_c(s) = K_p + K_d s$$

**Application:** Systems requiring fast response with improved damping, where steady-state error is not critical.

**Example:** Position control with high precision requirements.

### PID Controller

$$G_c(s) = K_p + \frac{K_i}{s} + K_d s$$

**Application:** Systems requiring fast response, zero steady-state error, and good damping. The most versatile controller.

**Example:** Motor speed control, temperature control with tight specifications.

## Practical Considerations

### Derivative on Measurement

In practice, the derivative is often applied to the measured output rather than the error:

$$u_D(t) = -K_d \frac{dy(t)}{dt}$$

This avoids "derivative kick" when the setpoint changes suddenly.

### Derivative Filtering

The pure derivative is rarely implemented. Instead, a filtered derivative is used:

$$G_D(s) = \frac{K_d s}{1 + \tau_f s}$$

Where $\tau_f$ is the filter time constant, typically $T_d/10$ or smaller.

### Anti-Windup

When the control signal saturates, the integrator can "wind up," causing large overshoots. Anti-windup schemes limit or reset the integral term during saturation.

## Summary

The PID controller combines three control actions:
- **Proportional:** Responds to current error, provides main control action
- **Integral:** Responds to error history, eliminates steady-state error
- **Derivative:** Responds to error rate, provides damping

The controller can be implemented in parallel, standard, or series forms. Practical implementations include derivative filtering and anti-windup mechanisms. PID controllers are used in over 95% of industrial control loops due to their effectiveness and ease of tuning.
