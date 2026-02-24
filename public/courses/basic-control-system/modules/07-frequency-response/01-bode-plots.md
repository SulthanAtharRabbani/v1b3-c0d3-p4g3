---
title: Bode Plots
readingTime: 20
difficulty: intermediate
objectives:
  - Understand frequency response and Bode plots
  - Construct Bode plots for basic transfer functions
  - Interpret Bode plots for system analysis
  - Determine system characteristics from Bode plots
keyPoints:
  - Bode plots show magnitude (dB) and phase vs frequency (log scale)
  - Magnitude: 20 log|G(jω)|; Phase: ∠G(jω)
  - Straight-line approximations simplify construction
  - Corner frequencies indicate pole/zero locations
---

# Bode Plots

## Introduction

A **Bode plot** consists of two graphs showing how a system responds to sinusoidal inputs of different frequencies:
1. **Magnitude plot**: $|G(j\omega)|$ in decibels vs. frequency
2. **Phase plot**: $\angle G(j\omega)$ in degrees vs. frequency

Both use logarithmic frequency scales, making it easy to combine multiple components.

## Frequency Response

### Definition

When a linear system $G(s)$ is excited by a sinusoidal input $u(t) = A\sin(\omega t)$, the steady-state output is also sinusoidal:

$$y(t) = |G(j\omega)|A\sin(\omega t + \angle G(j\omega))$$

Where:
- $|G(j\omega)|$ = magnitude ratio (amplitude scaling)
- $\angle G(j\omega)$ = phase shift (time shift)

### Decibel Scale

Magnitude is expressed in decibels (dB):

$$|G(j\omega)|_{dB} = 20\log_{10}|G(j\omega)|$$

**Common values:**
- 0 dB = magnitude of 1 (unity gain)
- 20 dB = magnitude of 10
- -20 dB = magnitude of 0.1
- 6 dB ≈ magnitude of 2
- -6 dB ≈ magnitude of 0.5

## Basic Elements

### 1. Constant Gain K

$$G(s) = K$$

**Magnitude:** $20\log K$ (constant, horizontal line)
**Phase:** 0° (for K > 0)

### 2. Integrator (Pole at Origin)

$$G(s) = \frac{1}{s}$$

**Magnitude:** $|G(j\omega)| = \frac{1}{\omega}$

$$20\log\frac{1}{\omega} = -20\log\omega$$

**Slope:** -20 dB/decade
**Phase:** -90° (constant)

### 3. Differentiator (Zero at Origin)

$$G(s) = s$$

**Magnitude:** $|G(j\omega)| = \omega$

$$20\log\omega$$

**Slope:** +20 dB/decade
**Phase:** +90° (constant)

### 4. First-Order Pole

$$G(s) = \frac{1}{\tau s + 1} = \frac{1}{s/\omega_c + 1}$$

Where $\omega_c = 1/\tau$ is the **corner frequency**.

**Magnitude:**
- Low frequency ($\omega \ll \omega_c$): 0 dB (flat)
- High frequency ($\omega \gg \omega_c$): -20 dB/decade slope
- At $\omega = \omega_c$: -3 dB

**Phase:**
- Low frequency: 0°
- At $\omega_c$: -45°
- High frequency: -90°

### 5. First-Order Zero

$$G(s) = \tau s + 1$$

**Magnitude:**
- Low frequency: 0 dB
- High frequency: +20 dB/decade
- At $\omega_c$: +3 dB

**Phase:**
- Low frequency: 0°
- At $\omega_c$: +45°
- High frequency: +90°

### 6. Second-Order System

$$G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

**Magnitude:**
- Low frequency: 0 dB
- High frequency: -40 dB/decade
- Peak at resonance: $M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}}$ for $\zeta < 0.707$

**Phase:**
- Low frequency: 0°
- At $\omega_n$: -90°
- High frequency: -180°

## Construction Procedure

### Step-by-Step Method

1. **Convert to Bode form:** Factor into elements of the form $(\tau s + 1)$, $1/s$, $K$, etc.

2. **Identify corner frequencies:** Frequencies where individual terms change slope.

3. **Start at low frequency:**
   - Determine initial slope from number of integrators
   - Set initial magnitude from K

4. **Add corner frequency contributions:**
   - At each corner, add ±20 dB/decade to slope
   - Sketch straight-line approximation

5. **Construct phase plot:**
   - Each pole contributes 0° → -90° transition
   - Each zero contributes 0° → +90° transition

## Example

**Problem:** Sketch the Bode plot for:

$$G(s) = \frac{10(s+1)}{s(s+10)}$$

**Solution:**

**Step 1: Identify elements**
- Gain: K = 10
- Integrator: 1/s
- Zero: (s+1), corner at ω = 1 rad/s
- Pole: 1/(s+10), corner at ω = 10 rad/s

**Step 2: Low-frequency asymptote**
- Due to integrator: slope = -20 dB/decade
- At ω = 1: magnitude = 20 log(10) = 20 dB
- Passes through 20 dB at ω = 1

**Step 3: Corner frequencies**
- At ω = 1: zero adds +20 dB/decade → slope becomes 0 dB/decade
- At ω = 10: pole adds -20 dB/decade → slope becomes -20 dB/decade

**Step 4: Phase**
- Integrator: -90°
- Zero at ω = 1: 0° to +90° transition centered at ω = 1
- Pole at ω = 10: 0° to -90° transition centered at ω = 10
- Total: -90° + (phase from zero) + (phase from pole)

**Magnitude approximation:**
- ω < 1: -20 dB/decade through (ω=1, 20 dB)
- 1 < ω < 10: 0 dB/decade (horizontal)
- ω > 10: -20 dB/decade

**Phase approximation:**
- ω < 0.1: ≈ -90°
- ω = 1: -90° + 45° = -45°
- ω = 10: -90° + 90° - 45° = -45°
- ω > 100: -90° + 90° - 90° = -90°

## Summary

Bode plots provide a graphical representation of frequency response using:
- **Magnitude plot**: 20 log|G(jω)| vs log(ω)
- **Phase plot**: ∠G(jω) vs log(ω)

Straight-line approximations simplify construction. The slope changes at corner frequencies corresponding to poles and zeros. Bode plots are essential for stability analysis and compensator design.
