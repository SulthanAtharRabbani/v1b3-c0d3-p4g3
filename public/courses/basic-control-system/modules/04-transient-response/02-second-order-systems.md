---
title: Second-Order Systems
readingTime: 22
difficulty: intermediate
objectives:
  - Understand second-order system transfer function and parameters
  - Relate damping ratio and natural frequency to response characteristics
  - Calculate transient response specifications
  - Distinguish between underdamped, critically damped, and overdamped responses
keyPoints:
  - Second-order systems have two poles determined by ζ and ωn
  - Damping ratio ζ determines oscillatory behavior
  - Natural frequency ωn determines response speed
  - Standard form: G(s) = ωn²/(s² + 2ζωns + ωn²)
---

# Second-Order Systems

## Introduction

**Second-order systems** are crucial in control engineering because they exhibit a rich variety of behaviors that form the basis for understanding more complex systems. Most practical systems can be approximated as second-order, and control system specifications are often expressed in terms of second-order parameters.

## Standard Transfer Function

### Canonical Form

The standard second-order transfer function is:

$$G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

Where:
- $\omega_n$ = **undamped natural frequency** (rad/s)
- $\zeta$ = **damping ratio** (dimensionless)

### Alternative Forms

**General form with DC gain:**
$$G(s) = \frac{K\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

**In terms of poles:**
$$G(s) = \frac{\omega_n^2}{(s - p_1)(s - p_2)}$$

### Characteristic Equation

$$s^2 + 2\zeta\omega_n s + \omega_n^2 = 0$$

**Roots (poles):**
$$s_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$$

## Damping Ratio and Response Types

### Classification by Damping Ratio

| Damping Ratio | System Type | Poles | Response |
|--------------|-------------|-------|----------|
| $\zeta = 0$ | Undamped | $s = \pm j\omega_n$ | Sustained oscillation |
| $0 < \zeta < 1$ | Underdamped | Complex conjugate pair | Oscillatory decay |
| $\zeta = 1$ | Critically damped | Repeated real: $s = -\omega_n$ | Fastest non-oscillatory |
| $\zeta > 1$ | Overdamped | Two distinct real poles | Slow, non-oscillatory |

### Underdamped Response ($0 < \zeta < 1$)

The poles are complex:
$$s_{1,2} = -\zeta\omega_n \pm j\omega_d$$

Where $\omega_d$ is the **damped natural frequency**:
$$\omega_d = \omega_n\sqrt{1 - \zeta^2}$$

**Step response:**
$$y(t) = 1 - \frac{e^{-\zeta\omega_n t}}{\sqrt{1-\zeta^2}}\sin(\omega_d t + \phi)$$

Where:
$$\phi = \arccos(\zeta) = \tan^{-1}\left(\frac{\sqrt{1-\zeta^2}}{\zeta}\right)$$

### Critically Damped Response ($\zeta = 1$)

Repeated real poles at $s = -\omega_n$.

**Step response:**
$$y(t) = 1 - e^{-\omega_n t}(1 + \omega_n t)$$

This is the fastest non-oscillatory response.

### Overdamped Response ($\zeta > 1$)

Two distinct real poles:
$$s_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$$

Let:
$$p_1 = -\omega_n(\zeta - \sqrt{\zeta^2 - 1})$$
$$p_2 = -\omega_n(\zeta + \sqrt{\zeta^2 - 1})$$

**Step response:**
$$y(t) = 1 + \frac{1}{p_2 - p_1}(p_1 e^{p_2 t} - p_2 e^{p_1 t})$$

## Time Domain Specifications

For **underdamped** second-order systems, the following specifications are commonly used:

### Rise Time ($t_r$)

Time to rise from 10% to 90% (or sometimes 0% to 100% for underdamped):

Approximate formula:
$$t_r \approx \frac{\pi - \phi}{\omega_d} = \frac{\pi - \arccos(\zeta)}{\omega_n\sqrt{1-\zeta^2}}$$

For $0.3 < \zeta < 0.8$, a simpler approximation:
$$t_r \approx \frac{1.8}{\omega_n}$$

### Peak Time ($t_p$)

Time to reach the first (maximum) peak:

$$t_p = \frac{\pi}{\omega_d} = \frac{\pi}{\omega_n\sqrt{1-\zeta^2}}$$

### Maximum Overshoot ($M_p$)

The maximum peak value relative to the final value:

$$M_p = e^{-\zeta\pi/\sqrt{1-\zeta^2}}$$

As a percentage:
$$\%M_p = 100 \times e^{-\zeta\pi/\sqrt{1-\zeta^2}}$$

**Relationship between ζ and overshoot:**

| ζ | % Overshoot |
|---|-------------|
| 0.3 | 37.2% |
| 0.4 | 25.4% |
| 0.5 | 16.3% |
| 0.6 | 9.5% |
| 0.707 | 4.3% |
| 0.8 | 1.5% |
| 1.0 | 0% |

### Settling Time ($t_s$)

Time to reach and stay within ±2% (or ±5%) of final value:

**2% criterion:**
$$t_s \approx \frac{4}{\zeta\omega_n}$$

**5% criterion:**
$$t_s \approx \frac{3}{\zeta\omega_n}$$

### Delay Time ($t_d$)

Time to reach 50% of final value:

$$t_d \approx \frac{1 + 0.7\zeta}{\omega_n}$$

## S-Plane Interpretation

### Pole Locations

The poles of an underdamped second-order system can be expressed in polar coordinates:

$$s = -\zeta\omega_n + j\omega_n\sqrt{1-\zeta^2} = \omega_n e^{j(\pi - \theta)}$$

Where $\theta = \arccos(\zeta)$

**Constant ζ lines:**
- Lines of constant damping ratio are radial lines from origin
- Angle from negative real axis = $\theta = \arccos(\zeta)$

**Constant ωn circles:**
- Circles centered at origin
- Radius = $\omega_n$

### Design Implications

- **Faster response**: Poles farther left (larger $\zeta\omega_n$)
- **Less overshoot**: Poles closer to real axis (larger ζ)
- **More oscillation**: Poles closer to imaginary axis (smaller ζ)

## Example Problem

**Problem:** A second-order system has $\omega_n = 10$ rad/s and $\zeta = 0.6$. Find:
1. Damped natural frequency
2. Peak time
3. Percent overshoot
4. Settling time (2%)
5. Rise time

**Solution:**

**1. Damped natural frequency:**
$$\omega_d = \omega_n\sqrt{1-\zeta^2} = 10\sqrt{1-0.36} = 10\sqrt{0.64} = 8 \text{ rad/s}$$

**2. Peak time:**
$$t_p = \frac{\pi}{\omega_d} = \frac{\pi}{8} = 0.393 \text{ s}$$

**3. Percent overshoot:**
$$\%M_p = 100 \times e^{-0.6\pi/\sqrt{1-0.36}} = 100 \times e^{-0.6\pi/0.8} = 100 \times e^{-2.356} = 9.5\%$$

**4. Settling time (2%):**
$$t_s = \frac{4}{\zeta\omega_n} = \frac{4}{6} = 0.667 \text{ s}$$

**5. Rise time:**
$$t_r \approx \frac{1.8}{\omega_n} = \frac{1.8}{10} = 0.18 \text{ s}$$

Or more accurately:
$$t_r \approx \frac{\pi - \arccos(0.6)}{8} = \frac{\pi - 0.927}{8} = 0.276 \text{ s}$$

## Effect of Zeros

A zero in the transfer function modifies the response:

$$G(s) = \frac{\omega_n^2(1 + s/z)}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

**Zero in left half-plane (LHP):**
- Increases overshoot
- Decreases rise time
- Faster initial response

**Zero in right half-plane (RHP):**
- Causes inverse response (initially goes opposite direction)
- Can be destabilizing
- Called "non-minimum phase" system

## Summary

Second-order systems are characterized by natural frequency ωn and damping ratio ζ. The damping ratio determines the nature of the response: underdamped (oscillatory), critically damped (fastest non-oscillatory), or overdamped (slow). Transient specifications (overshoot, settling time, rise time) can be directly related to ζ and ωn. Understanding these relationships is fundamental to control system design.
