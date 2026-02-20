---
title: Linearity and Time-Shifting Properties
readingTime: 20
difficulty: intermediate
objectives:
  - Apply the linearity property to find transforms of signal combinations
  - Use the time-shifting property for delayed signals
  - Understand how these properties affect the ROC
keyPoints:
  - Linearity allows decomposing complex signals into simpler components
  - Time-shifting multiplies the transform by an exponential factor
  - The ROC is affected by signal combination but not by time shifts
---

# Linearity and Time-Shifting Properties

## Linearity Property

The **linearity property** is one of the most fundamental and useful properties of the Laplace Transform.

### Statement

If:
$$x_1(t) \xrightarrow{\mathcal{L}} X_1(s), \quad \text{ROC: } R_1$$
$$x_2(t) \xrightarrow{\mathcal{L}} X_2(s), \quad \text{ROC: } R_2$$

Then for any constants $\alpha_1$ and $\alpha_2$:

$$\alpha_1 x_1(t) + \alpha_2 x_2(t) \xrightarrow{\mathcal{L}} \alpha_1 X_1(s) + \alpha_2 X_2(s)$$

**ROC:** At least $R_1 \cap R_2$ (the overlap of the individual ROCs)

### Proof

Using the definition of the Laplace Transform:

$$\mathcal{L}\{\alpha_1 x_1(t) + \alpha_2 x_2(t)\} = \int_{-\infty}^{\infty} [\alpha_1 x_1(t) + \alpha_2 x_2(t)] e^{-st} \, dt$$

Separating the integral:

$$= \alpha_1 \int_{-\infty}^{\infty} x_1(t) e^{-st} \, dt + \alpha_2 \int_{-\infty}^{\infty} x_2(t) e^{-st} \, dt$$

$$= \alpha_1 X_1(s) + \alpha_2 X_2(s)$$

### Example 1: Combining Exponentials

Find the Laplace Transform of:

$$x(t) = 3e^{-2t}u(t) + 2e^{-5t}u(t)$$

**Solution:**

Using the linearity property:

$$\mathcal{L}\{x(t)\} = 3\mathcal{L}\{e^{-2t}u(t)\} + 2\mathcal{L}\{e^{-5t}u(t)\}$$

$$= \frac{3}{s+2} + \frac{2}{s+5} = \frac{3(s+5) + 2(s+2)}{(s+2)(s+5)}$$

$$= \frac{5s + 19}{s^2 + 7s + 10}$$

**ROC:** $\text{Re}\{s\} > -2$ (intersection of $\text{Re}\{s\} > -2$ and $\text{Re}\{s\} > -5$)

### Example 2: Cosine from Complex Exponentials

Find the Laplace Transform of $\cos(\omega_0 t)u(t)$ using linearity.

**Solution:**

Using Euler's formula:

$$\cos(\omega_0 t) = \frac{e^{j\omega_0 t} + e^{-j\omega_0 t}}{2}$$

Therefore:

$$\mathcal{L}\{\cos(\omega_0 t)u(t)\} = \frac{1}{2}\left[\frac{1}{s-j\omega_0} + \frac{1}{s+j\omega_0}\right]$$

$$= \frac{1}{2}\left[\frac{(s+j\omega_0) + (s-j\omega_0)}{(s-j\omega_0)(s+j\omega_0)}\right]$$

$$= \frac{s}{s^2 + \omega_0^2}$$

## Time-Shifting Property

The **time-shifting property** describes what happens to a Laplace Transform when the time-domain signal is shifted.

### Statement

If:
$$x(t) \xrightarrow{\mathcal{L}} X(s), \quad \text{ROC: } R$$

Then:

$$x(t - t_0) \xrightarrow{\mathcal{L}} e^{-st_0} X(s)$$

**ROC:** Generally the same as $R$

### Proof

Using the definition:

$$\mathcal{L}\{x(t - t_0)\} = \int_{-\infty}^{\infty} x(t - t_0) e^{-st} \, dt$$

Let $\tau = t - t_0$, so $t = \tau + t_0$ and $dt = d\tau$:

$$= \int_{-\infty}^{\infty} x(\tau) e^{-s(\tau + t_0)} \, d\tau$$

$$= e^{-st_0} \int_{-\infty}^{\infty} x(\tau) e^{-s\tau} \, d\tau$$

$$= e^{-st_0} X(s)$$

### Example 3: Delayed Unit Step

Find the Laplace Transform of $u(t - 3)$.

**Solution:**

Using the time-shifting property with $t_0 = 3$:

$$\mathcal{L}\{u(t - 3)\} = e^{-3s} \cdot \frac{1}{s} = \frac{e^{-3s}}{s}$$

**ROC:** $\text{Re}\{s\} > 0$

### Example 4: Rectangular Pulse

Find the Laplace Transform of a rectangular pulse of width $T$:

$$x(t) = u(t) - u(t - T)$$

**Solution:**

Using linearity and time-shifting:

$$\mathcal{L}\{x(t)\} = \mathcal{L}\{u(t)\} - \mathcal{L}\{u(t - T)\}$$

$$= \frac{1}{s} - \frac{e^{-Ts}}{s} = \frac{1 - e^{-Ts}}{s}$$

**ROC:** The entire s-plane (except $\text{Re}\{s\} \to -\infty$)

Note that the ROC is larger than the intersection of individual ROCs because the pole at $s = 0$ cancels out.

### Example 5: Truncated Sine Wave

Find the Laplace Transform of:

$$x(t) = \sin(\pi t)[u(t) - u(t - 2)]$$

**Solution:**

This signal can be written as:

$$x(t) = \sin(\pi t)u(t) - \sin(\pi t)u(t - 2)$$

For the second term, we note that:

$$\sin(\pi t) = \sin(\pi(t-2) + 2\pi) = \sin(\pi(t-2))$$

Using time-shifting:

$$\mathcal{L}\{x(t)\} = \frac{\pi}{s^2 + \pi^2} - e^{-2s} \frac{\pi}{s^2 + \pi^2}$$

$$= \frac{\pi(1 - e^{-2s})}{s^2 + \pi^2}$$

## Combining Properties

Often, we need to combine multiple properties to find transforms.

### Example 6: Delayed and Scaled Exponential

Find $\mathcal{L}\{e^{-3(t-2)}u(t-2)\}$.

**Solution:**

Let $x(t) = e^{-3t}u(t)$. Then:

$$\mathcal{L}\{x(t)\} = \frac{1}{s+3}$$

Using the time-shifting property:

$$\mathcal{L}\{x(t-2)\} = \mathcal{L}\{e^{-3(t-2)}u(t-2)\} = e^{-2s} \cdot \frac{1}{s+3}$$

## Summary

The linearity and time-shifting properties are fundamental tools for computing Laplace Transforms:

| Property | Time Domain | s-Domain |
|----------|-------------|----------|
| Linearity | $\alpha_1 x_1(t) + \alpha_2 x_2(t)$ | $\alpha_1 X_1(s) + \alpha_2 X_2(s)$ |
| Time Shifting | $x(t - t_0)$ | $e^{-st_0}X(s)$ |

These properties allow us to decompose complex signals into simpler components, find their transforms individually, and combine the results. In the next lesson, we will explore differentiation and integration properties.
