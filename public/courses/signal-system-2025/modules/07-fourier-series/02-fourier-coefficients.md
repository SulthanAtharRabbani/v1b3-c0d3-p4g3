---
title: Fourier Coefficients
readingTime: 28
difficulty: intermediate
objectives:
  - Calculate the DC component a₀ from a periodic signal
  - Derive the cosine coefficients aₙ using integration
  - Compute the sine coefficients bₙ for various waveforms
  - Apply symmetry properties to simplify coefficient calculations
keyPoints:
  - The DC component a₀ is the average value of the signal over one period
  - Coefficients aₙ and bₙ are found by correlating the signal with cos and sin
  - Symmetry properties can eliminate the need to calculate certain coefficients
  - The integration is performed over one complete period of the signal
---

# Fourier Coefficients

## Introduction

The Fourier coefficients determine the amplitude of each harmonic component in the Fourier series representation. Calculating these coefficients is the essential skill for Fourier analysis, enabling us to find the spectral content of any periodic signal.

## Coefficient Formulas

### DC Component (a₀)

The DC component is the average value of the signal over one period:

$$a_0 = \frac{1}{T_0}\int_{T_0} x(t) \, dt$$

where the integral is over any complete period.

Common integration intervals:
- $[0, T_0]$
- $[-T_0/2, T_0/2]$
- Any interval of length $T_0$

### Cosine Coefficients (aₙ)

$$a_n = \frac{2}{T_0}\int_{T_0} x(t)\cos(n\omega_0 t) \, dt$$

where $\omega_0 = 2\pi/T_0$.

### Sine Coefficients (bₙ)

$$b_n = \frac{2}{T_0}\int_{T_0} x(t)\sin(n\omega_0 t) \, dt$$

## Understanding the Formulas

### Orthogonality Principle

The coefficient formulas derive from the **orthogonality** of sinusoids:

$$\int_{T_0} \cos(m\omega_0 t)\cos(n\omega_0 t) \, dt = \begin{cases}
T_0/2, & m = n \neq 0 \\
T_0, & m = n = 0 \\
0, & m \neq n
\end{cases}$$

$$\int_{T_0} \sin(m\omega_0 t)\sin(n\omega_0 t) \, dt = \begin{cases}
T_0/2, & m = n \neq 0 \\
0, & m = n = 0 \\
0, & m \neq n
\end{cases}$$

$$\int_{T_0} \cos(m\omega_0 t)\sin(n\omega_0 t) \, dt = 0 \quad \forall m, n$$

### Correlation Interpretation

The coefficient $a_n$ measures how much the signal "correlates" with $\cos(n\omega_0 t)$:
- Large $a_n$: Signal has strong cosine component at frequency $n\omega_0$
- Small $a_n$: Signal has weak cosine component at that frequency
- $a_n = 0$: Signal has no cosine component at that frequency

## Step-by-Step Calculation Method

### Step 1: Identify Period and Frequency

1. Determine period $T_0$
2. Calculate fundamental frequency: $f_0 = 1/T_0$
3. Calculate angular frequency: $\omega_0 = 2\pi f_0 = 2\pi/T_0$

### Step 2: Check for Symmetry

Determine if signal has:
- Even symmetry ($x(t) = x(-t)$)
- Odd symmetry ($x(t) = -x(-t)$)
- Half-wave symmetry ($x(t) = -x(t + T_0/2)$)

### Step 3: Calculate a₀

$$a_0 = \frac{1}{T_0}\int_{T_0} x(t) \, dt$$

### Step 4: Calculate aₙ and bₙ

Use symmetry to simplify if applicable.

## Worked Examples

### Example 1: Rectangular Pulse Train

**Signal definition:**

$$x(t) = \begin{cases}
A, & |t| < \tau/2 \\
0, & \tau/2 < |t| < T_0/2
\end{cases}$$

This is an **even function**, so $b_n = 0$ for all $n$.

**Calculate $a_0$:**

$$a_0 = \frac{1}{T_0}\int_{-\tau/2}^{\tau/2} A \, dt = \frac{A\tau}{T_0}$$

**Calculate $a_n$:**

$$a_n = \frac{2}{T_0}\int_{-\tau/2}^{\tau/2} A\cos(n\omega_0 t) \, dt$$

$$= \frac{2A}{T_0}\left[\frac{\sin(n\omega_0 t)}{n\omega_0}\right]_{-\tau/2}^{\tau/2}$$

$$= \frac{2A}{T_0}\frac{2\sin(n\omega_0\tau/2)}{n\omega_0}$$

$$= \frac{2A\tau}{T_0}\frac{\sin(n\omega_0\tau/2)}{n\omega_0\tau/2}$$

$$= \frac{2A\tau}{T_0}\text{sinc}\left(\frac{n\omega_0\tau}{2\pi}\right)$$

**Result:**
$$x(t) = \frac{A\tau}{T_0} + \sum_{n=1}^{\infty}\frac{2A\tau}{T_0}\text{sinc}\left(\frac{n\tau}{T_0}\right)\cos(n\omega_0 t)$$

### Example 2: Triangle Wave

**Signal definition:**

$$x(t) = \begin{cases}
\frac{2A}{T_0}t, & 0 \leq t < T_0/2 \\
2A - \frac{2A}{T_0}t, & T_0/2 \leq t < T_0
\end{cases}$$

This is an **even function** with **half-wave symmetry**.

**Therefore:**
- $b_n = 0$ for all $n$
- $a_n = 0$ for even $n$

**Calculate $a_0$:**

By symmetry, $a_0 = A/2$ (average value).

**Calculate $a_n$ (odd n only):**

$$a_n = \frac{8}{T_0}\int_0^{T_0/2} \frac{2A}{T_0}t\cos(n\omega_0 t) \, dt$$

Using integration by parts:

$$a_n = \begin{cases}
\frac{8A}{n^2\pi^2}, & n \text{ odd} \\
0, & n \text{ even}
\end{cases}$$

**Fourier series:**
$$x(t) = \frac{A}{2} + \frac{8A}{\pi^2}\left[\cos(\omega_0 t) + \frac{1}{9}\cos(3\omega_0 t) + \frac{1}{25}\cos(5\omega_0 t) + \ldots\right]$$

### Example 3: Full-Wave Rectified Sine

**Signal:**
$$x(t) = |A\sin(\omega_0 t)|$$

Period: $T_0 = \pi/\omega_0$ (half the original sine period)

**Calculate coefficients:**

$$a_0 = \frac{2A}{\pi}$$

$$a_n = \begin{cases}
\frac{4A}{\pi}\frac{1}{1-n^2}, & n \text{ even} \\
0, & n \text{ odd (n > 0)}
\end{cases}$$

**Fourier series:**
$$x(t) = \frac{2A}{\pi} - \frac{4A}{3\pi}\cos(2\omega_0 t) - \frac{4A}{15\pi}\cos(4\omega_0 t) - \ldots$$

## Symmetry Summary Table

| Symmetry Type | Condition | Result |
|--------------|-----------|--------|
| Even | $x(t) = x(-t)$ | $b_n = 0$ |
| Odd | $x(t) = -x(-t)$ | $a_n = 0$ (all n) |
| Half-wave | $x(t) = -x(t + T_0/2)$ | $a_n = b_n = 0$ (even n) |
| Quarter-wave | Even + Half-wave | $b_n = 0$, even $a_n = 0$ |

## Practical Calculation Tips

1. **Always check symmetry first** - It can eliminate half the calculations.

2. **Choose integration limits wisely** - Use $[0, T_0]$ or $[-T_0/2, T_0/2]$ based on signal definition.

3. **Use standard integrals:**
   $$\int x\cos(ax) dx = \frac{x\sin(ax)}{a} + \frac{\cos(ax)}{a^2}$$
   $$\int x\sin(ax) dx = -\frac{x\cos(ax)}{a} + \frac{\sin(ax)}{a^2}$$

4. **Verify results:** The series should converge to the original signal.

## Summary

Calculating Fourier coefficients involves integrating the product of the signal with cosine and sine basis functions. The DC component $a_0$ represents the signal average, while $a_n$ and $b_n$ represent the amplitude of cosine and sine components at each harmonic frequency. Symmetry properties can significantly simplify calculations by eliminating coefficients that must be zero. Mastering these calculations is essential for spectral analysis of periodic signals.
