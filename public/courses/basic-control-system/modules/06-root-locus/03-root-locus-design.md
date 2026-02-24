---
title: Root Locus Design
readingTime: 18
difficulty: intermediate
objectives:
  - Use root locus for controller design
  - Design lead compensators using root locus
  - Design lag compensators using root locus
  - Understand the effect of adding poles and zeros
keyPoints:
  - Adding zeros attracts the root locus toward them
  - Adding poles repels the root locus away from them
  - Lead compensators improve transient response
  - Lag compensators improve steady-state error
---

# Root Locus Design

## Introduction

The root locus method is not just for analysis—it's a powerful design tool. By adding compensators (poles and zeros), we can reshape the root locus to achieve desired closed-loop pole locations and thus desired system performance.

## Effect of Adding Poles and Zeros

### Adding a Zero

Adding a zero to the open-loop transfer function:
- **Attracts** the root locus toward the zero
- Can pull the locus into the left half-plane
- Generally improves stability
- Can increase system bandwidth

**Example:** Adding a zero to a system with poles at 0 and -2 pulls the locus toward the zero, potentially improving stability.

### Adding a Pole

Adding a pole to the open-loop transfer function:
- **Repels** the root locus away from the pole
- Can push branches into the right half-plane
- Tends to destabilize the system
- Reduces system bandwidth

**Example:** Adding a pole close to the origin pushes the locus toward the RHP, potentially causing instability.

### Design Implications

| Action | Effect on Locus | Effect on System |
|--------|-----------------|------------------|
| Add zero | Attracts toward zero | Faster, more stable |
| Add pole | Repels from pole | Slower, less stable |

## Lead Compensation

### Purpose

Lead compensators improve transient response by:
- Increasing damping ratio
- Reducing settling time
- Increasing bandwidth
- Improving stability margins

### Transfer Function

$$G_c(s) = K_c \frac{s + z_c}{s + p_c}$$

Where:
- $z_c < p_c$ (zero is closer to origin than pole)
- The compensator provides phase lead

### Design Procedure

1. **Specify desired closed-loop poles** based on transient requirements
   - From damping ratio ζ and natural frequency ωn
   - Desired poles: $s_d = -ζω_n ± jω_n\sqrt{1-ζ^2}$

2. **Determine the angle contribution needed**
   - Calculate angle deficiency: $\phi = 180° - \angle G(s_d)$

3. **Place compensator zero and pole**
   - The compensator must contribute angle φ
   - $\angle(s_d + z_c) - \angle(s_d + p_c) = \phi$

4. **Determine gain Kc**
   - Use magnitude condition at desired pole

### Example: Lead Compensator Design

**Problem:** Design a compensator for:
$$G(s) = \frac{1}{s(s+2)}$$

To achieve: ζ = 0.5, ωn = 4 rad/s

**Solution:**

**Step 1: Desired poles**

$$s_d = -ζω_n ± jω_n\sqrt{1-ζ^2} = -2 ± j3.46$$

**Step 2: Angle deficiency**

$$\angle G(s_d) = -\angle s_d - \angle(s_d + 2)$$

$$= -\angle(-2+j3.46) - \angle(j3.46)$$

$$= -120° - 90° = -210°$$

Required angle: $180° - (-210°) = 30°$ short

The compensator must contribute +30°.

**Step 3: Place zero and pole**

Use graphical or analytical methods:

Place zero at $z_c = -2$ (at the pole of G(s))
Calculate pole location for 30° contribution:

$$\angle(s_d + z_c) - \angle(s_d + p_c) = 30°$$

$$\angle(-2+j3.46+2) - \angle(-2+j3.46+p_c) = 30°$$

$$90° - \angle(-2+p_c+j3.46) = 30°$$

$$\angle(-2+p_c+j3.46) = 60°$$

$$\tan 60° = \frac{3.46}{-2+p_c}$$

$$p_c = 2 + \frac{3.46}{\tan 60°} = 2 + 2 = 4$$

**Step 4: Compensator**

$$G_c(s) = K_c \frac{s + 2}{s + 4}$$

## Lag Compensation

### Purpose

Lag compensators improve steady-state error by:
- Increasing low-frequency gain
- Improving error constants (Kp, Kv, Ka)
- Not significantly affecting transient response

### Transfer Function

$$G_c(s) = K_c \frac{s + z_c}{s + p_c}$$

Where:
- $p_c < z_c$ (pole is closer to origin than zero)
- The ratio $z_c/p_c$ is the gain increase

### Design Procedure

1. **Determine the required gain increase**
   - From steady-state error requirements
   - Let $α = z_c/p_c$ = gain increase factor

2. **Place zero and pole close to origin**
   - Choose $z_c$ small (near origin)
   - Set $p_c = z_c/α$
   - Ensure minimal impact on dominant poles

3. **Verify transient response**
   - Check that dominant poles are not significantly affected

### Example: Lag Compensator Design

**Problem:** Design a compensator for:
$$G(s) = \frac{K}{s(s+2)}$$

To achieve: Kv ≥ 10 (while maintaining stability)

**Solution:**

**Step 1: Required gain**

$$K_v = \lim_{s \to 0} sG(s) = \frac{K}{2}$$

For $K_v = 10$: $K = 20$

But from Routh, stability requires K < 6 (for this example).

**Step 2: Lag compensator**

Need gain increase factor of at least 20/6 ≈ 3.33

Let $α = 4$ (gain increase)

Place zero at $z_c = -0.1$
Pole at $p_c = -0.1/4 = -0.025$

$$G_c(s) = \frac{s + 0.1}{s + 0.025}$$

**Step 3: Complete compensator**

$$G_c(s)G(s) = \frac{6(s + 0.1)}{s(s+2)(s + 0.025)}$$

New $K_v = \frac{6 × 0.1}{2 × 0.025} = \frac{0.6}{0.05} = 12 ≥ 10$ ✓

## Lead-Lag Compensation

### Purpose

Combines benefits of both compensators:
- Lead: Improves transient response
- Lag: Improves steady-state error

### Transfer Function

$$G_c(s) = K_c \frac{(s + z_1)(s + z_2)}{(s + p_1)(s + p_2)}$$

Where:
- Lead: $z_1 < p_1$ (provides phase lead)
- Lag: $p_2 < z_2$ (provides gain increase)

### Design Procedure

1. Design lead compensator for transient response
2. Design lag compensator for steady-state error
3. Combine and verify overall performance

## Summary

Root locus design uses the following principles:

- **Adding zeros** attracts the locus → improves stability and speed
- **Adding poles** repels the locus → can destabilize

**Lead compensators** (zero before pole):
- Improve transient response
- Add phase lead
- Increase bandwidth

**Lag compensators** (pole before zero):
- Improve steady-state error
- Add low-frequency gain
- Minimal effect on transient

The root locus provides visual insight into how compensators reshape the closed-loop pole locations, making it an intuitive design tool.
