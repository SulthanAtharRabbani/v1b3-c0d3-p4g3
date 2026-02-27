---
title: Convolution and Multiplication Properties
readingTime: 28
difficulty: intermediate
objectives:
  - Apply convolution theorem in frequency domain
  - Understand multiplication property (duality)
  - Use properties for system analysis
  - Apply duality principle
keyPoints:
  - Convolution in time = Multiplication in frequency
  - Multiplication in time = Convolution in frequency
  - Essential for LTI system analysis
  - Duality reflects transform symmetry
---

# Convolution and Multiplication Properties

The convolution theorem and its dual are among the most important Fourier transform properties, forming the foundation for LTI system analysis and signal processing.

## Convolution Theorem

### Time Domain Convolution

If $\mathcal{F}\{x(t)\} = X(\omega)$ and $\mathcal{F}\{h(t)\} = H(\omega)$, then:

$$\mathcal{F}\{x(t) * h(t)\} = X(\omega) \cdot H(\omega)$$

### Proof Sketch

$$\mathcal{F}\{x(t) * h(t)\} = \int_{-\infty}^{\infty} \left[\int_{-\infty}^{\infty} x(\tau)h(t-\tau)d\tau\right]e^{-j\omega t}dt$$

Interchanging integrals and using the time-shifting property yields $X(\omega)H(\omega)$.

### Significance

This theorem is fundamental for LTI system analysis:
- **Time domain**: Output $y(t) = x(t) * h(t)$ (convolution)
- **Frequency domain**: Output $Y(\omega) = X(\omega) \cdot H(\omega)$ (multiplication)

## Multiplication Theorem (Dual)

### Frequency Domain Convolution

$$\mathcal{F}\{x_1(t) \cdot x_2(t)\} = \frac{1}{2\pi}X_1(\omega) * X_2(\omega)$$

### Applications

- Windowing effects in spectrum analysis
- Sampling theory
- Modulation analysis

## Duality Principle

If $x(t) \leftrightarrow X(\omega)$, then:

$$X(t) \leftrightarrow 2\pi x(-\omega)$$

This symmetry reflects the similar structure of forward and inverse transforms.

## Summary

The convolution theorem converts time-domain convolution to frequency-domain multiplication, simplifying LTI system analysis. The multiplication theorem describes spectral effects of time-domain multiplication.
