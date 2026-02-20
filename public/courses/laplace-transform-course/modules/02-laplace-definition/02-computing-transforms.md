---
title: Computing Laplace Transforms of Basic Signals
readingTime: 25
difficulty: intermediate
objectives:
  - Compute Laplace Transforms for common signals
  - Determine the Region of Convergence for each transform
  - Build intuition about the relationship between signal types and their ROCs
keyPoints:
  - Different signals have different regions of convergence
  - Causal signals have ROCs in the right half-plane
  - Anti-causal signals have ROCs in the left half-plane
---

# Computing Laplace Transforms of Basic Signals

In this lesson, we will compute the Laplace Transforms of several fundamental signals. Understanding these basic transforms is essential because more complex signals can be expressed as combinations of these basic forms.

## Transform of the Causal Exponential Signal

### Problem

Find the Laplace Transform of the causal exponential signal:

$$x(t) = e^{at}u(t)$$

where $a$ can be real or complex.

### Solution

Using the definition of the Laplace Transform:

$$X(s) = \int_{-\infty}^{\infty} e^{at}u(t) e^{-st} \, dt$$

Since $u(t) = 0$ for $t < 0$ and $u(t) = 1$ for $t > 0$:

$$X(s) = \int_{0}^{\infty} e^{at} e^{-st} \, dt = \int_{0}^{\infty} e^{(a-s)t} \, dt$$

Integrating:

$$X(s) = \frac{e^{(a-s)t}}{a-s}\bigg|_{0}^{\infty} = \frac{1}{s-a}\left[1 - \lim_{t\to\infty} e^{(a-s)t}\right]$$

For convergence, we need $e^{(a-s)t} \to 0$ as $t \to \infty$. Let $s = \sigma + j\omega$ and $a = a_r + ja_i$:

$$e^{(a-s)t} = e^{(a_r - \sigma + j(a_i - \omega))t}$$

This converges to zero when $\sigma > a_r$, or equivalently:

$$\text{Re}\{s\} > \text{Re}\{a\}$$

### Result

$$\mathcal{L}\{e^{at}u(t)\} = \frac{1}{s-a}, \quad \text{ROC: Re}\{s\} > \text{Re}\{a\}$$

### Special Cases

| Signal | Transform | ROC |
|--------|-----------|-----|
| $e^{-at}u(t)$ (decaying exponential) | $\frac{1}{s+a}$ | $\text{Re}\{s\} > -a$ |
| $e^{at}u(t)$ (growing exponential) | $\frac{1}{s-a}$ | $\text{Re}\{s\} > a$ |
| $u(t)$ (unit step) | $\frac{1}{s}$ | $\text{Re}\{s\} > 0$ |

## Transform of the Anti-Causal Exponential Signal

### Problem

Find the Laplace Transform of the anti-causal exponential signal:

$$x(t) = -e^{at}u(-t)$$

### Solution

Since $u(-t) = 1$ for $t < 0$ and $u(-t) = 0$ for $t > 0$:

$$X(s) = \int_{-\infty}^{0} -e^{at} e^{-st} \, dt = -\int_{-\infty}^{0} e^{(a-s)t} \, dt$$

Integrating:

$$X(s) = -\frac{e^{(a-s)t}}{a-s}\bigg|_{-\infty}^{0} = \frac{1}{s-a}\left[1 - \lim_{t\to-\infty} e^{(a-s)t}\right]$$

For convergence as $t \to -\infty$, we need $\text{Re}\{s\} < \text{Re}\{a\}$.

### Result

$$\mathcal{L}\{-e^{at}u(-t)\} = \frac{1}{s-a}, \quad \text{ROC: Re}\{s\} < \text{Re}\{a\}$$

### Critical Observation

Both $e^{at}u(t)$ and $-e^{at}u(-t)$ have the same algebraic transform expression $\frac{1}{s-a}$, but different ROCs! This demonstrates why specifying the ROC is essential for unique identification of the inverse transform.

## Transform of the Ramp Signal

### Problem

Find the Laplace Transform of the ramp signal:

$$x(t) = tu(t)$$

### Solution

Using the definition:

$$X(s) = \int_{0}^{\infty} t e^{-st} \, dt$$

Using integration by parts with $u = t$ and $dv = e^{-st}dt$:

$$X(s) = \left[-\frac{t}{s}e^{-st}\right]_{0}^{\infty} + \frac{1}{s}\int_{0}^{\infty} e^{-st} \, dt$$

The first term is zero for $\text{Re}\{s\} > 0$ (using L'Hôpital's rule for the upper limit):

$$X(s) = 0 + \frac{1}{s} \cdot \frac{1}{s} = \frac{1}{s^2}$$

### Result

$$\mathcal{L}\{tu(t)\} = \frac{1}{s^2}, \quad \text{ROC: Re}\{s\} > 0$$

## Transform of Sinusoidal Signals

### Using Euler's Formula

Recall that:

$$\cos(\omega_0 t) = \frac{e^{j\omega_0 t} + e^{-j\omega_0 t}}{2}$$

$$\sin(\omega_0 t) = \frac{e^{j\omega_0 t} - e^{-j\omega_0 t}}{2j}$$

### Cosine Signal

$$\mathcal{L}\{\cos(\omega_0 t)u(t)\} = \mathcal{L}\left\{\frac{e^{j\omega_0 t} + e^{-j\omega_0 t}}{2}u(t)\right\}$$

Using the linearity property:

$$= \frac{1}{2}\left[\frac{1}{s-j\omega_0} + \frac{1}{s+j\omega_0}\right] = \frac{s}{s^2 + \omega_0^2}$$

### Sine Signal

$$\mathcal{L}\{\sin(\omega_0 t)u(t)\} = \frac{\omega_0}{s^2 + \omega_0^2}$$

### Results

| Signal | Transform | ROC |
|--------|-----------|-----|
| $\cos(\omega_0 t)u(t)$ | $\frac{s}{s^2 + \omega_0^2}$ | $\text{Re}\{s\} > 0$ |
| $\sin(\omega_0 t)u(t)$ | $\frac{\omega_0}{s^2 + \omega_0^2}$ | $\text{Re}\{s\} > 0$ |

## Transform of Exponentially Damped Sinusoids

For signals of the form $e^{-at}\cos(\omega_0 t)u(t)$:

$$\mathcal{L}\{e^{-at}\cos(\omega_0 t)u(t)\} = \frac{s+a}{(s+a)^2 + \omega_0^2}$$

$$\mathcal{L}\{e^{-at}\sin(\omega_0 t)u(t)\} = \frac{\omega_0}{(s+a)^2 + \omega_0^2}$$

## Summary Table: Common Transform Pairs

| Time Function $x(t)$ | Laplace Transform $X(s)$ | ROC |
|---------------------|--------------------------|-----|
| $\delta(t)$ | $1$ | All $s$ |
| $u(t)$ | $\frac{1}{s}$ | $\text{Re}\{s\} > 0$ |
| $tu(t)$ | $\frac{1}{s^2}$ | $\text{Re}\{s\} > 0$ |
| $t^n u(t)$ | $\frac{n!}{s^{n+1}}$ | $\text{Re}\{s\} > 0$ |
| $e^{at}u(t)$ | $\frac{1}{s-a}$ | $\text{Re}\{s\} > \text{Re}\{a\}$ |
| $-e^{at}u(-t)$ | $\frac{1}{s-a}$ | $\text{Re}\{s\} < \text{Re}\{a\}$ |
| $\cos(\omega_0 t)u(t)$ | $\frac{s}{s^2+\omega_0^2}$ | $\text{Re}\{s\} > 0$ |
| $\sin(\omega_0 t)u(t)$ | $\frac{\omega_0}{s^2+\omega_0^2}$ | $\text{Re}\{s\} > 0$ |
| $e^{-at}\cos(\omega_0 t)u(t)$ | $\frac{s+a}{(s+a)^2+\omega_0^2}$ | $\text{Re}\{s\} > -a$ |
| $e^{-at}\sin(\omega_0 t)u(t)$ | $\frac{\omega_0}{(s+a)^2+\omega_0^2}$ | $\text{Re}\{s\} > -a$ |

## Summary

This lesson demonstrated how to compute Laplace Transforms of fundamental signals. Key observations include:

1. The **same algebraic expression** can correspond to different time functions with different ROCs
2. **Causal signals** have ROCs to the right of a vertical line in the s-plane
3. **Anti-causal signals** have ROCs to the left of a vertical line
4. The **ROC must always be specified** along with the transform expression

In the next module, we will explore the properties of the Laplace Transform that allow us to compute transforms of more complex signals without direct integration.
