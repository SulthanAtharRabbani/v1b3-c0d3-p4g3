---
title: Definition of the Laplace Transform
readingTime: 20
difficulty: intermediate
objectives:
  - Define the bilateral and unilateral Laplace Transform
  - Understand the role of the complex variable s
  - Distinguish between the transform and its region of convergence
keyPoints:
  - The Laplace Transform maps time-domain functions to the complex frequency domain
  - It generalizes the Fourier Transform
  - The transform only converges for certain values of s (ROC)
---

# Definition of the Laplace Transform

## The Bilateral Laplace Transform

The **bilateral Laplace Transform** of a continuous-time signal $x(t)$ is defined as:

$$X(s) = \mathcal{L}\{x(t)\} = \int_{-\infty}^{\infty} x(t) e^{-st} \, dt$$

where $s = \sigma + j\omega$ is a complex variable.

This definition transforms a time-domain signal $x(t)$ into a complex frequency-domain function $X(s)$. The transformation can be represented symbolically as:

$$x(t) \xrightarrow{\mathcal{L}} X(s)$$

## The Unilateral Laplace Transform

In many practical applications, we work with **causal signals** (signals that are zero for $t < 0$). For such signals, the **unilateral Laplace Transform** is often used:

$$X(s) = \mathcal{L}\{x(t)\} = \int_{0^-}^{\infty} x(t) e^{-st} \, dt$$

The lower limit $0^-$ (zero minus) indicates that the integral includes any impulse or discontinuity at $t = 0$.

### When to Use Each Form

| Bilateral Transform | Unilateral Transform |
|---------------------|----------------------|
| General signals | Causal signals |
| System analysis | Solving differential equations with initial conditions |
| Both causal and anti-causal signals | Signals starting at t = 0 |

## Understanding the Complex Variable s

The complex variable $s$ can be written in Cartesian form as:

$$s = \sigma + j\omega$$

where:
- $\sigma = \text{Re}\{s\}$ is the real part
- $\omega = \text{Im}\{s\}$ is the imaginary part

The exponential term $e^{-st}$ can be expanded as:

$$e^{-st} = e^{-(\sigma + j\omega)t} = e^{-\sigma t} \cdot e^{-j\omega t}$$

This reveals two important components:
1. $e^{-\sigma t}$: An exponential weighting factor
2. $e^{-j\omega t}$: A complex sinusoidal oscillation

## Relationship to the Fourier Transform

The Laplace Transform is closely related to the **Fourier Transform**. If we set $\sigma = 0$, then $s = j\omega$, and the Laplace Transform becomes:

$$X(j\omega) = \int_{-\infty}^{\infty} x(t) e^{-j\omega t} \, dt$$

This is exactly the definition of the Fourier Transform!

### Key Insight

The Laplace Transform evaluated on the $j\omega$ axis (where $\sigma = 0$) equals the Fourier Transform. More generally:

$$X(s)\bigg|_{s=\sigma_1+j\omega} = \mathcal{F}\{x(t)e^{-\sigma_1 t}\}$$

The Laplace Transform of $x(t)$ at $s = \sigma_1 + j\omega$ equals the Fourier Transform of $x(t)e^{-\sigma_1 t}$.

## Visualizing the s-Plane

Since $s$ is a complex variable, we can represent it on the **s-plane**:

- **Horizontal axis**: Real part ($\sigma$ axis)
- **Vertical axis**: Imaginary part ($j\omega$ axis)

Points in the s-plane represent different values of $s$. The $j\omega$ axis divides the plane into:
- **Left half-plane** (LHP): $\sigma < 0$
- **Right half-plane** (RHP): $\sigma > 0$

## Region of Convergence (ROC)

The Laplace Transform does not necessarily converge for all values of $s$. The **Region of Convergence (ROC)** is the set of values of $s$ for which the integral converges (produces a finite result).

### Convergence Condition

For the integral $\int_{-\infty}^{\infty} x(t) e^{-st} \, dt$ to converge, we need:

$$\int_{-\infty}^{\infty} |x(t) e^{-\sigma t}| \, dt < \infty$$

This means $x(t)e^{-\sigma t}$ must be **absolutely integrable**.

### Why ROC Matters

The ROC is crucial because:
1. The same algebraic expression $X(s)$ can correspond to different time functions
2. The ROC uniquely identifies which time function is the correct inverse
3. System properties (stability, causality) are determined by the ROC

## Example: Unit Impulse

Find the Laplace Transform of the unit impulse $\delta(t)$.

**Solution:**

$$X(s) = \int_{-\infty}^{\infty} \delta(t) e^{-st} \, dt$$

Using the sifting property of the impulse function:

$$X(s) = e^{-st}\bigg|_{t=0} = 1$$

**Result:** $\mathcal{L}\{\delta(t)\} = 1$ for all $s$ (ROC: entire s-plane)

## Example: Unit Step

Find the Laplace Transform of the unit step $u(t)$.

**Solution:**

$$X(s) = \int_{0}^{\infty} e^{-st} \, dt = -\frac{1}{s} e^{-st}\bigg|_{0}^{\infty}$$

For convergence at $t \to \infty$, we need $\sigma = \text{Re}\{s\} > 0$, so that $e^{-\sigma t} \to 0$.

$$X(s) = \frac{1}{s}, \quad \text{ROC: Re}\{s\} > 0$$

## Summary

The Laplace Transform is a generalization of the Fourier Transform that maps time-domain signals to the complex frequency domain. The key concepts introduced are:

1. **Definition**: $X(s) = \int_{-\infty}^{\infty} x(t) e^{-st} \, dt$
2. **Complex variable**: $s = \sigma + j\omega$
3. **Relationship to Fourier**: Setting $\sigma = 0$ gives the Fourier Transform
4. **ROC**: Essential for unique inverse transformation

In the next lesson, we will compute Laplace Transforms of more signals and explore the concept of Region of Convergence in greater detail.
