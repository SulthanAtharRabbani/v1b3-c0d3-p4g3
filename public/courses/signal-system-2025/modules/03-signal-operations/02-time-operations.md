---
title: Time Operations
readingTime: 28
difficulty: intermediate
objectives:
  - Apply time shifting to advance or delay signals
  - Perform time scaling (compression and expansion)
  - Execute time reversal (signal reflection)
  - Combine multiple time operations in sequence
keyPoints:
  - Time shifting translates a signal along the time axis
  - Time scaling compresses or expands the signal duration
  - Time reversal reflects the signal about the vertical axis
  - Order of operations matters when combining transformations
---

# Time Operations

## Introduction

Time operations modify the time variable of a signal, changing when signal events occur without directly altering their amplitudes. These operations—shifting, scaling, and reversal—are fundamental to signal processing, system analysis, and understanding how systems respond to input signals.

## Time Shifting

### Definition

Time shifting moves a signal along the time axis:

$$y(t) = x(t - t_0)$$

where $t_0$ is the shift amount.

### Interpretation

| Condition | Effect | Description |
|-----------|--------|-------------|
| $t_0 > 0$ | Delay | Signal occurs later (shifts right) |
| $t_0 < 0$ | Advance | Signal occurs earlier (shifts left) |

### Graphical Understanding

For $y(t) = x(t - 2)$:
- The signal at $t = 2$ in $y(t)$ equals $x(0)$
- All features are delayed by 2 time units
- Graph shifts to the **right**

For $y(t) = x(t + 3)$:
- The signal at $t = -3$ in $y(t)$ equals $x(0)$
- All features are advanced by 3 time units
- Graph shifts to the **left**

### Examples

**Example 1: Unit Step Shift**
$$x(t) = u(t)$$
$$y(t) = u(t - 2)$$

The step occurs at $t = 2$ instead of $t = 0$.

**Example 2: Exponential Shift**
$$x(t) = e^{-t}u(t)$$
$$y(t) = x(t - 1) = e^{-(t-1)}u(t-1)$$

The exponential decay starts at $t = 1$.

**Example 3: Sinusoid Shift**
$$x(t) = \cos(\omega t)$$
$$y(t) = \cos(\omega(t - t_0)) = \cos(\omega t - \phi)$$

where $\phi = \omega t_0$ is the phase shift.

### Phase and Time Shift Relationship

For sinusoidal signals:
$$\text{Time shift } t_0 \Leftrightarrow \text{Phase shift } \phi = \omega t_0$$

$$\text{Phase shift } \phi \Leftrightarrow \text{Time shift } t_0 = \frac{\phi}{\omega}$$

## Time Scaling

### Definition

Time scaling changes the time variable by a multiplicative factor:

$$y(t) = x(at)$$

where $a$ is the scaling factor.

### Interpretation

| Condition | Effect | Description |
|-----------|--------|-------------|
| $a > 1$ | Compression | Signal duration decreases (speeds up) |
| $0 < a < 1$ | Expansion | Signal duration increases (slows down) |
| $a < 0$ | Scaling + Reversal | Combined effect |

### Graphical Understanding

For $y(t) = x(2t)$:
- Signal compressed by factor of 2
- Event at $t = 2$ in $x(t)$ appears at $t = 1$ in $y(t)$
- Duration halved

For $y(t) = x(t/3)$ or $y(t) = x(0.333t)$:
- Signal expanded by factor of 3
- Event at $t = 1$ in $x(t)$ appears at $t = 3$ in $y(t)$
- Duration tripled

### Mathematical Analysis

If $x(t)$ has duration $T$, then $y(t) = x(at)$ has duration $T/a$.

### Effect on Frequency

For a sinusoidal signal:
$$x(t) = \cos(\omega_0 t)$$
$$y(t) = \cos(\omega_0 \cdot at) = \cos((a\omega_0)t)$$

Time scaling by factor $a$ causes frequency scaling by the same factor.

### Examples

**Example 1: Compressed Pulse**
$$x(t) = \text{rect}(t) \quad \text{(unit width pulse centered at 0)}$$
$$y(t) = x(2t) = \text{rect}(2t)$$

Result: Pulse width reduced to $1/2$.

**Example 2: Expanded Exponential**
$$x(t) = e^{-t}u(t)$$
$$y(t) = x(t/2) = e^{-t/2}u(t/2) = e^{-t/2}u(t)$$

The decay rate is halved.

**Example 3: Audio Speed Change**

Playing audio at $2\times$ speed:
- All frequencies doubled
- Duration halved
- "Chipmunk effect"

## Time Reversal

### Definition

Time reversal (or reflection) reflects the signal about the vertical axis:

$$y(t) = x(-t)$$

### Interpretation

- Future becomes past, past becomes future
- Signal is "flipped" horizontally
- Right side becomes left side

### Graphical Understanding

For $x(t)$ defined on $[a, b]$:
- $y(t) = x(-t)$ is defined on $[-b, -a]$
- Value at $t = 5$ in $y(t)$ equals value at $t = -5$ in $x(t)$

### Examples

**Example 1: Reversed Step**
$$x(t) = u(t)$$
$$y(t) = u(-t)$$

Result: Step goes from 1 to 0 at $t = 0$ (reverse unit step).

**Example 2: Reversed Exponential**
$$x(t) = e^{-t}u(t) \quad \text{(causal decay)}$$
$$y(t) = e^{t}u(-t) \quad \text{(anticausal growth)}$$

**Example 3: Symmetric Signal**
For even signals, time reversal has no effect:
$$x(-t) = x(t)$$

## Combining Time Operations

### General Transformation

The general time transformation is:

$$y(t) = x(at + b)$$

where:
- $a$ controls scaling and reversal
- $b$ controls shifting

### Step-by-Step Method

To compute $y(t) = x(at + b)$:

1. **Rewrite as:** $y(t) = x(a(t + b/a))$
2. **Identify operations:**
   - Scale by factor $1/a$ (if $|a| \neq 1$)
   - Reverse if $a < 0$
   - Shift by $-b/a$

**Order of operations:**
1. Scale (and reverse if needed)
2. Shift

### Example Problem

**Problem:** Find $y(t) = x(2t - 3)$

**Solution:**

Method 1 - Factor the coefficient of $t$:
$$y(t) = x(2(t - 1.5))$$
Operations:
1. Scale by 1/2 (compress)
2. Shift right by 1.5

Method 2 - Step-by-step:
1. Start with $x(t)$
2. Shift right by 3: $w_1(t) = x(t - 3)$
3. Scale by 1/2: $y(t) = w_1(2t) = x(2t - 3)$

### Verification Method

To verify the transformation, identify key points:

| Point in $y(t)$ | Corresponds to $x(\cdot)$ |
|-----------------|---------------------------|
| $t = 0$ | $x(2 \cdot 0 - 3) = x(-3)$ |
| $t = 1.5$ | $x(2 \cdot 1.5 - 3) = x(0)$ |
| $t = 3$ | $x(2 \cdot 3 - 3) = x(3)$ |

## Time Operations for Discrete Signals

For discrete-time signals $x[n]$:

### Time Shifting
$$y[n] = x[n - n_0]$$

Positive $n_0$: delay (shift right)
Negative $n_0$: advance (shift left)

### Time Scaling (Decimation/Interpolation)

**Down-sampling (Decimation):**
$$y[n] = x[an] \quad \text{for } a \in \mathbb{Z}^+$$

Example: $y[n] = x[2n]$ keeps every other sample.

**Up-sampling (Interpolation):**
Inserting zeros between samples or interpolating values.

### Time Reversal
$$y[n] = x[-n]$$

## Summary

Time operations transform signals along the time axis:
- **Shifting** translates the signal in time (delay or advance)
- **Scaling** compresses or expands the signal duration
- **Reversal** reflects the signal about $t = 0$

When combining operations, the order matters. The general transformation $y(t) = x(at + b)$ can be decomposed into scale/reverse operations followed by a shift. These operations are fundamental to understanding system behavior, signal processing algorithms, and the relationship between time and frequency domains.
