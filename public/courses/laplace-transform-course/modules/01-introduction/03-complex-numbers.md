---
title: Review of Complex Numbers
readingTime: 15
difficulty: beginner
objectives:
  - Represent complex numbers in rectangular and polar forms
  - Perform arithmetic operations with complex numbers
  - Understand Euler's formula and its applications
  - Convert between different representations of complex numbers
keyPoints:
  - Complex numbers have both real and imaginary parts
  - Euler's formula connects exponential and trigonometric functions
  - Complex numbers are essential for frequency-domain analysis
---

# Review of Complex Numbers

Complex numbers are fundamental to understanding the Laplace Transform and signal analysis. This lesson reviews the essential concepts and operations that will be used throughout the course.

## Definition of Complex Numbers

A **complex number** $z$ is expressed as:

$$z = a + jb$$

where:
- $a$ is the **real part**, denoted as $\text{Re}\{z\}$
- $b$ is the **imaginary part**, denoted as $\text{Im}\{z\}$
- $j = \sqrt{-1}$ is the imaginary unit

The notation $j$ (rather than $i$) is standard in electrical engineering to avoid confusion with current.

## Graphical Representation

Complex numbers can be represented graphically on the **complex plane** (also called the Argand plane):

- The **horizontal axis** represents the real part
- The **vertical axis** represents the imaginary part

A complex number $z = a + jb$ corresponds to the point $(a, b)$ in this plane.

## Rectangular and Polar Forms

### Rectangular Form

The **rectangular form** (also called Cartesian form) is:

$$z = a + jb$$

### Polar Form

The **polar form** expresses a complex number in terms of its magnitude and angle:

$$z = r \angle \theta = r(\cos\theta + j\sin\theta)$$

where:
- $r = |z| = \sqrt{a^2 + b^2}$ is the **magnitude** (or modulus)
- $\theta = \arg(z) = \arctan\left(\frac{b}{a}\right)$ is the **argument** (or phase angle)

### Conversion Between Forms

**Rectangular to Polar:**
$$r = \sqrt{a^2 + b^2}$$
$$\theta = \arctan\left(\frac{b}{a}\right)$$

**Polar to Rectangular:**
$$a = r\cos\theta$$
$$b = r\sin\theta$$

## Euler's Formula

**Euler's formula** provides a fundamental connection between exponential and trigonometric functions:

$$e^{j\theta} = \cos\theta + j\sin\theta$$

This leads to the **exponential form** of complex numbers:

$$z = re^{j\theta}$$

### Important Consequences

From Euler's formula, we can derive:

**1. The exponential of zero angle:**
$$e^{j0} = 1$$

**2. Complex conjugates:**
$$e^{-j\theta} = \cos\theta - j\sin\theta = (e^{j\theta})^*$$

**3. Trigonometric functions:**
$$\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$$
$$\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$$

**4. Unit circle:**
$$|e^{j\theta}| = 1 \quad \text{for all real } \theta$$

## Arithmetic Operations

### Addition and Subtraction

For $z_1 = a_1 + jb_1$ and $z_2 = a_2 + jb_2$:

$$z_1 + z_2 = (a_1 + a_2) + j(b_1 + b_2)$$
$$z_1 - z_2 = (a_1 - a_2) + j(b_1 - b_2)$$

Addition and subtraction are most easily performed in **rectangular form**.

### Multiplication

**Rectangular form:**
$$z_1 \cdot z_2 = (a_1 + jb_1)(a_2 + jb_2) = (a_1a_2 - b_1b_2) + j(a_1b_2 + a_2b_1)$$

**Polar form:**
$$z_1 \cdot z_2 = r_1 e^{j\theta_1} \cdot r_2 e^{j\theta_2} = r_1 r_2 e^{j(\theta_1 + \theta_2)}$$

Multiplication is often simpler in **polar form**: multiply magnitudes, add angles.

### Division

**Rectangular form:**
$$\frac{z_1}{z_2} = \frac{a_1 + jb_1}{a_2 + jb_2} = \frac{(a_1 + jb_1)(a_2 - jb_2)}{(a_2 + jb_2)(a_2 - jb_2)} = \frac{(a_1a_2 + b_1b_2) + j(a_2b_1 - a_1b_2)}{a_2^2 + b_2^2}$$

**Polar form:**
$$\frac{z_1}{z_2} = \frac{r_1 e^{j\theta_1}}{r_2 e^{j\theta_2}} = \frac{r_1}{r_2} e^{j(\theta_1 - \theta_2)}$$

Division is simpler in **polar form**: divide magnitudes, subtract angles.

### Powers and Roots

For $z = re^{j\theta}$:

$$z^n = r^n e^{jn\theta}$$

The $n$-th roots of a complex number are:
$$z^{1/n} = r^{1/n} e^{j(\theta + 2\pi k)/n}, \quad k = 0, 1, 2, \ldots, n-1$$

## Complex Conjugate

The **complex conjugate** of $z = a + jb$ is:

$$z^* = a - jb$$

Properties:
- $z \cdot z^* = |z|^2 = a^2 + b^2$
- $(z_1 + z_2)^* = z_1^* + z_2^*$
- $(z_1 \cdot z_2)^* = z_1^* \cdot z_2^*$
- $\text{Re}\{z\} = \frac{z + z^*}{2}$
- $\text{Im}\{z\} = \frac{z - z^*}{2j}$

## The Complex Variable $s$

In Laplace Transform analysis, we work with the complex variable:

$$s = \sigma + j\omega$$

where:
- $\sigma$ (sigma) is the real part, related to exponential growth or decay
- $\omega$ (omega) is the imaginary part, related to oscillation frequency

### The s-Plane

The **s-plane** (complex frequency plane) is the complex plane used in Laplace Transform analysis:

- The horizontal axis ($\sigma$ axis) represents exponential behavior
- The vertical axis ($j\omega$ axis) represents oscillatory behavior
- The **jω axis** corresponds to the Fourier Transform (when $\sigma = 0$)

### Regions of Interest

- **Left half-plane** ($\sigma < 0$): Decaying exponentials, stable systems
- **Right half-plane** ($\sigma > 0$): Growing exponentials, unstable systems
- **jω axis** ($\sigma = 0$): Pure oscillations, marginally stable systems

## Summary

Complex numbers provide the mathematical foundation for transform methods. The key concepts covered include:

1. Complex numbers have real and imaginary parts and can be expressed in rectangular, polar, or exponential form
2. Euler's formula ($e^{j\theta} = \cos\theta + j\sin\theta$) connects exponential and trigonometric functions
3. The complex variable $s = \sigma + j\omega$ is central to Laplace Transform analysis
4. Understanding the s-plane is essential for system stability analysis

With this foundation, we are now ready to study the Laplace Transform in detail in the next module.
