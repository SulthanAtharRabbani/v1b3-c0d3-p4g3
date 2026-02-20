---
title: Differentiation and Integration Properties
readingTime: 25
difficulty: intermediate
objectives:
  - Apply the time-differentiation property
  - Use the s-domain differentiation property
  - Understand the integration property
  - Apply these properties to solve differential equations
keyPoints:
  - Time differentiation multiplies by s in the transform domain
  - These properties are essential for solving differential equations
  - Initial conditions are incorporated naturally
---

# Differentiation and Integration Properties

The differentiation and integration properties of the Laplace Transform are particularly powerful because they convert calculus operations in the time domain into algebraic operations in the s-domain. This is the key to solving differential equations efficiently.

## Time-Differentiation Property

### Statement (Unilateral Transform)

If:
$$x(t) \xrightarrow{\mathcal{L}} X(s)$$

Then:

$$\frac{dx(t)}{dt} \xrightarrow{\mathcal{L}} sX(s) - x(0^-)$$

For the second derivative:

$$\frac{d^2x(t)}{dt^2} \xrightarrow{\mathcal{L}} s^2X(s) - sx(0^-) - x'(0^-)$$

In general, for the $n$-th derivative:

$$\frac{d^n x(t)}{dt^n} \xrightarrow{\mathcal{L}} s^n X(s) - s^{n-1}x(0^-) - s^{n-2}x'(0^-) - \cdots - x^{(n-1)}(0^-)$$

### Proof (First Derivative)

Using integration by parts:

$$\mathcal{L}\left\{\frac{dx(t)}{dt}\right\} = \int_{0^-}^{\infty} \frac{dx(t)}{dt} e^{-st} \, dt$$

Let $u = e^{-st}$ and $dv = \frac{dx}{dt}dt$:

$$= x(t)e^{-st}\bigg|_{0^-}^{\infty} - \int_{0^-}^{\infty} x(t)(-s)e^{-st} \, dt$$

$$= [0 - x(0^-)] + s\int_{0^-}^{\infty} x(t)e^{-st} \, dt$$

$$= sX(s) - x(0^-)$$

### Example 1: Derivative of Cosine

Find $\mathcal{L}\{\frac{d}{dt}[\cos(\omega_0 t)u(t)]\}$ using the differentiation property.

**Solution:**

We know that:
$$\mathcal{L}\{\cos(\omega_0 t)u(t)\} = \frac{s}{s^2 + \omega_0^2}$$

And $x(0^-) = 0$.

Using the differentiation property:

$$\mathcal{L}\left\{\frac{d}{dt}[\cos(\omega_0 t)u(t)]\right\} = s \cdot \frac{s}{s^2 + \omega_0^2} - 0 = \frac{s^2}{s^2 + \omega_0^2}$$

## s-Domain Differentiation Property

### Statement

If:
$$x(t) \xrightarrow{\mathcal{L}} X(s)$$

Then:

$$-tx(t) \xrightarrow{\mathcal{L}} \frac{dX(s)}{ds}$$

Or equivalently:

$$tx(t) \xrightarrow{\mathcal{L}} -\frac{dX(s)}{ds}$$

### Example 2: Finding Ramp Transform

Find $\mathcal{L}\{tu(t)\}$ using the s-domain differentiation property.

**Solution:**

We know:
$$\mathcal{L}\{u(t)\} = \frac{1}{s}$$

Using s-domain differentiation:

$$\mathcal{L}\{tu(t)\} = -\frac{d}{ds}\left(\frac{1}{s}\right) = \frac{1}{s^2}$$

### Generalizing: Power of t

Applying the s-domain differentiation property repeatedly:

$$\mathcal{L}\{t^n u(t)\} = (-1)^n \frac{d^n}{ds^n}\left(\frac{1}{s}\right) = \frac{n!}{s^{n+1}}$$

## Integration Property

### Statement

If:
$$x(t) \xrightarrow{\mathcal{L}} X(s)$$

Then:

$$\int_{0}^{t} x(\tau) \, d\tau \xrightarrow{\mathcal{L}} \frac{X(s)}{s}$$

### Proof

Let $y(t) = \int_{0}^{t} x(\tau) \, d\tau$. Then $\frac{dy(t)}{dt} = x(t)$ and $y(0^-) = 0$.

Using the time-differentiation property:

$$\mathcal{L}\left\{\frac{dy(t)}{dt}\right\} = sY(s) - y(0^-)$$

$$X(s) = sY(s)$$

Therefore:

$$Y(s) = \frac{X(s)}{s}$$

### Example 3: Integral of Unit Step

Find $\mathcal{L}\{\int_{0}^{t} u(\tau) \, d\tau\}$.

**Solution:**

The integral of $u(t)$ is the ramp function $tu(t)$.

Using the integration property:

$$\mathcal{L}\left\{\int_{0}^{t} u(\tau) \, d\tau\right\} = \frac{1}{s} \cdot \frac{1}{s} = \frac{1}{s^2}$$

This confirms: $\mathcal{L}\{tu(t)\} = \frac{1}{s^2}$.

## Application: Solving Differential Equations

The differentiation property is essential for solving differential equations. Consider the first-order RC circuit equation:

$$R\frac{di(t)}{dt} + \frac{1}{C}i(t) = \frac{dv(t)}{dt}$$

### Taking the Laplace Transform

Applying the Laplace Transform to both sides:

$$R[sI(s) - i(0^-)] + \frac{1}{C}I(s) = sV(s) - v(0^-)$$

Rearranging:

$$\left(Rs + \frac{1}{C}\right)I(s) = sV(s) - v(0^-) + Ri(0^-)$$

### Solving for I(s)

$$I(s) = \frac{sV(s) - v(0^-) + Ri(0^-)}{Rs + \frac{1}{C}}$$

For zero initial conditions and constant input $v(t) = V_0 u(t)$:

$$I(s) = \frac{V_0}{R} \cdot \frac{1}{s + \frac{1}{RC}}$$

The inverse transform gives:

$$i(t) = \frac{V_0}{R}e^{-t/RC}u(t)$$

## Summary of Properties

| Property | Time Domain | s-Domain |
|----------|-------------|----------|
| Time Differentiation | $\frac{dx(t)}{dt}$ | $sX(s) - x(0^-)$ |
| 2nd Derivative | $\frac{d^2x(t)}{dt^2}$ | $s^2X(s) - sx(0^-) - x'(0^-)$ |
| s-Domain Differentiation | $tx(t)$ | $-\frac{dX(s)}{ds}$ |
| Integration | $\int_{0}^{t} x(\tau) \, d\tau$ | $\frac{X(s)}{s}$ |

## Summary

The differentiation and integration properties are among the most important properties of the Laplace Transform because they convert calculus operations into algebraic operations. This transformation is the key to solving differential equations efficiently, as we will see in detail in later modules. The automatic incorporation of initial conditions is a significant advantage over classical time-domain methods.
