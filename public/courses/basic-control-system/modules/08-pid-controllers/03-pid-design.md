---
title: PID Controller Design
readingTime: 18
difficulty: intermediate
objectives:
  - Design PID controllers for specific applications
  - Handle practical issues like windup and noise
  - Implement PID in digital form
  - Understand variations and modifications
keyPoints:
  - Design starts with specifications, not formulas
  - Anti-windup prevents integrator saturation problems
  - Derivative filtering reduces noise sensitivity
  - Digital PID uses discrete approximations
---

# PID Controller Design

## Introduction

While tuning methods provide initial parameters, **PID design** involves a more comprehensive approach considering performance specifications, practical constraints, and implementation details. This lesson covers design considerations and practical implementation issues.

## Design Specifications

### Time Domain Specifications

- **Rise time ($t_r$):** Time to reach 90% of setpoint
- **Settling time ($t_s$):** Time to settle within tolerance
- **Overshoot ($M_p$):** Maximum peak as percentage
- **Steady-state error ($e_{ss}$):** Final tracking error

### Frequency Domain Specifications

- **Gain margin (GM):** Typically > 6 dB
- **Phase margin (PM):** Typically 45-60°
- **Bandwidth:** Related to speed of response

### Design Trade-offs

| Want | Trade-off |
|------|-----------|
| Faster response | More overshoot, less stability margin |
| Zero steady-state error | Requires integral action, may overshoot |
| Less overshoot | Slower response |

## Design by Specification

### Specifying Overshoot and Settling Time

Given requirements for overshoot and settling time:

1. **Determine damping ratio** from overshoot:
   $$\zeta \approx \frac{-\ln(M_p/100)}{\sqrt{\pi^2 + \ln^2(M_p/100)}}$$

2. **Determine natural frequency** from settling time:
   $$\omega_n \approx \frac{4}{\zeta t_s}$$

3. **Place closed-loop poles** at $s = -\zeta\omega_n \pm j\omega_n\sqrt{1-\zeta^2}$

4. **Design PID** to achieve these pole locations

### Example: Design for Overshoot < 10%, Settling Time < 2s

**Step 1:** Damping ratio for 10% overshoot:
$$\zeta \approx 0.59$$

**Step 2:** Natural frequency:
$$\omega_n \approx \frac{4}{0.59 \times 2} = 3.39 \text{ rad/s}$$

**Step 3:** Desired poles at approximately:
$$s = -2 \pm j2.75$$

**Step 4:** Design PID to place closed-loop poles near this location.

## Practical Implementation Issues

### Integrator Windup

**Problem:** When the actuator saturates, the integrator continues to accumulate error, causing:
- Large overshoot
- Slow recovery
- Potential instability

**Solutions:**

1. **Back-calculation:**
   When saturated, subtract a portion of the excess from the integral term.

2. **Clamping:**
   Limit the integral term when control signal saturates.

3. **Conditional integration:**
   Stop integrating when saturated.

### Derivative Kick

**Problem:** A step change in setpoint causes a large impulse from the derivative term.

**Solution:** Apply derivative to measured output instead of error:
$$u_D = -K_d \frac{dy}{dt}$$

### Noise Amplification

**Problem:** Derivative term amplifies high-frequency noise.

**Solution:** Use filtered derivative:
$$G_D(s) = \frac{K_d s}{1 + \tau_f s}$$

Typically $\tau_f = T_d/10$ or smaller.

## Digital PID Implementation

### Discrete Form

For sampling period $T_s$, the PID can be implemented as:

**Position form:**
$$u(k) = K_p e(k) + K_i T_s \sum_{i=0}^{k} e(i) + \frac{K_d}{T_s}[e(k) - e(k-1)]$$

**Velocity form:**
$$\Delta u(k) = u(k) - u(k-1) = K_p[e(k) - e(k-1)] + K_i T_s e(k) + \frac{K_d}{T_s}[e(k) - 2e(k-1) + e(k-2)]$$

**Advantages of velocity form:**
- No windup problem (only increments calculated)
- Bumpless transfer between modes
- Easy to implement output limits

### Sampling Rate Selection

**Rule of thumb:** Sampling period $T_s$ should satisfy:
$$T_s \leq \frac{0.1}{f_c}$$

Where $f_c$ is the closed-loop bandwidth.

Typical sampling rates:
- Flow control: 0.1-1 s
- Temperature control: 1-10 s
- Motion control: 0.001-0.01 s

## PID Variations

### Setpoint Weighting

Modify the controller to reduce overshoot:
$$u = K_p[\beta r - y] + K_i \int e \, dt + K_d[-\dot{y}]$$

Where $\beta$ (typically 0.3-0.5) reduces setpoint weighting for proportional term.

### Two-Degree-of-Freedom PID

Separate controllers for:
- Setpoint tracking
- Disturbance rejection

Allows independent optimization of both objectives.

### Feedforward + PID

Combine feedforward control (for known disturbances) with PID feedback:
$$u = u_{ff} + u_{PID}$$

Improves response to measured disturbances.

## Summary

PID controller design involves:

1. **Define specifications:** Overshoot, settling time, steady-state error
2. **Translate to parameters:** Use tuning methods as starting point
3. **Address practical issues:**
   - Anti-windup for saturation
   - Derivative filtering for noise
   - Derivative on measurement for kick avoidance
4. **Implement in appropriate form:** Position or velocity form for digital control

The design process is iterative, starting with tuning rules and refining based on simulation and actual performance. Practical implementations require handling saturation, noise, and discretization effects.
