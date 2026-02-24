---
title: Gain and Phase Margins
readingTime: 18
difficulty: intermediate
objectives:
  - Define gain margin and phase margin
  - Calculate margins from Bode and Nyquist plots
  - Interpret margins as stability robustness measures
  - Use margins for control system design
keyPoints:
  - Gain margin: how much gain can increase before instability
  - Phase margin: additional phase lag before instability
  - Typical specifications: GM > 6 dB, PM > 30-45°
  - Margins indicate robustness to parameter variations
---

# Gain and Phase Margins

## Introduction

**Gain margin** and **phase margin** quantify how close a system is to instability. These margins are essential specifications for control system design, indicating robustness to parameter variations and model uncertainties.

## Definitions

### Gain Margin (GM)

**Definition:** The gain margin is the factor by which the open-loop gain can be increased before the system becomes unstable.

$$GM = \frac{1}{|G(j\omega_{180})|}$$

Where $\omega_{180}$ is the **phase crossover frequency** where $\angle G(j\omega) = -180°$.

**In dB:**
$$GM_{dB} = 20\log_{10}(GM) = -20\log_{10}|G(j\omega_{180})|$$

### Phase Margin (PM)

**Definition:** The phase margin is the additional phase lag that would make the system unstable.

$$PM = 180° + \angle G(j\omega_c)$$

Where $\omega_c$ is the **gain crossover frequency** where $|G(j\omega)| = 1$ (or 0 dB).

## Graphical Determination

### From Bode Plots

**Gain Margin:**
1. Find frequency $\omega_{180}$ where phase crosses -180°
2. Read magnitude at this frequency: $|G(j\omega_{180})|_{dB}$
3. $GM_{dB} = -|G(j\omega_{180})|_{dB}$

**Phase Margin:**
1. Find frequency $\omega_c$ where magnitude crosses 0 dB
2. Read phase at this frequency: $\angle G(j\omega_c)$
3. $PM = 180° + \angle G(j\omega_c)$

### From Nyquist Plot

**Gain Margin:**
- Find where the plot crosses the negative real axis
- Let this crossing be at point $-a$ (where $a > 0$)
- $GM = 1/a$

**Phase Margin:**
- Draw a unit circle centered at origin
- Find where the Nyquist plot intersects this circle
- The angle from negative real axis to this intersection point is PM

## Interpretation

### Stability Assessment

| Condition | Stability |
|-----------|-----------|
| GM > 1 (GM_dB > 0) and PM > 0 | Stable |
| GM = 1 (GM_dB = 0) or PM = 0 | Marginally stable |
| GM < 1 (GM_dB < 0) or PM < 0 | Unstable |

### Robustness

**Gain margin** indicates tolerance to:
- Gain variations
- Parameter changes that affect overall gain

**Phase margin** indicates tolerance to:
- Time delays
- Phase shifts from unmodeled dynamics

### Typical Specifications

| Margin | Minimum | Recommended |
|--------|---------|-------------|
| Gain Margin | 6 dB (factor of 2) | 8-12 dB |
| Phase Margin | 30° | 45-60° |

## Relationship to Transient Response

### Phase Margin and Damping

For a second-order system, phase margin relates to damping ratio:

$$\zeta \approx \frac{PM}{100°}$$

This approximation is good for PM between 0° and 70°.

**Phase Margin Specifications:**

| PM | Approximate ζ | Overshoot |
|----|---------------|-----------|
| 30° | 0.30 | ~37% |
| 45° | 0.45 | ~20% |
| 60° | 0.60 | ~10% |
| 72° | 0.707 | ~5% |

### Bandwidth

The gain crossover frequency $\omega_c$ is approximately equal to the closed-loop bandwidth for many systems.

Higher $\omega_c$ → Faster response → Larger bandwidth

## Example

**Problem:** Find gain and phase margins for:

$$G(s) = \frac{10}{s(s+1)(s+5)}$$

**Solution:**

**Step 1: Find phase crossover frequency**

$$\angle G(j\omega) = -90° - \arctan(\omega) - \arctan(\omega/5) = -180°$$

$$\arctan(\omega) + \arctan(\omega/5) = 90°$$

Using the identity $\arctan(a) + \arctan(b) = \arctan\left(\frac{a+b}{1-ab}\right)$:

$$\frac{\omega + \omega/5}{1 - \omega^2/5} = \tan(90°) = \infty$$

This occurs when denominator = 0:
$$1 - \frac{\omega^2}{5} = 0$$
$$\omega_{180} = \sqrt{5} = 2.236 \text{ rad/s}$$

**Step 2: Calculate GM**

$$|G(j\sqrt{5})| = \frac{10}{\sqrt{5} \cdot \sqrt{6} \cdot \sqrt{10}} = \frac{10}{\sqrt{300}} = \frac{10}{17.32} = 0.577$$

$$GM = \frac{1}{0.577} = 1.73$$
$$GM_{dB} = 20\log(1.73) = 4.77 \text{ dB}$$

**Step 3: Find gain crossover frequency**

$$|G(j\omega_c)| = 1$$
$$\frac{10}{\omega_c \sqrt{\omega_c^2+1}\sqrt{\omega_c^2+25}} = 1$$

By trial or numerical solution: $\omega_c \approx 1.25$ rad/s

**Step 4: Calculate PM**

$$\angle G(j1.25) = -90° - \arctan(1.25) - \arctan(0.25)$$
$$= -90° - 51.3° - 14° = -155.3°$$

$$PM = 180° - 155.3° = 24.7°$$

**Summary:**
- GM = 4.77 dB (marginally acceptable)
- PM = 24.7° (below typical specification)

This system needs compensation to improve margins.

## Design Using Margins

### Improving Gain Margin

- Reduce gain (sacrifice steady-state performance)
- Add phase lead compensation

### Improving Phase Margin

- Add phase lead near crossover frequency
- Reduce gain to lower crossover frequency
- Add lead compensator

## Summary

Gain and phase margins quantify stability robustness:

- **Gain Margin:** Factor by which gain can increase before instability
- **Phase Margin:** Additional phase lag before instability

Typical specifications: GM > 6 dB, PM > 45°

These margins relate to transient response characteristics and indicate how much uncertainty the system can tolerate while remaining stable. They are essential specifications for robust control system design.
