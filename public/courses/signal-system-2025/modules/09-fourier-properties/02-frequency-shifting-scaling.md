---
title: Frequency Shifting and Scaling Properties
readingTime: 28
difficulty: intermediate
objectives:
  - Apply frequency shifting property
  - Understand time scaling effects on spectrum
  - Analyze modulation using properties
  - Combine properties for signal analysis
keyPoints:
  - Frequency shift: x(t)e^{jω₀t} ↔ X(ω-ω₀)
  - Time scaling: x(at) ↔ (1/|a|)X(ω/a)
  - Modulation theorem is frequency shifting application
  - Time-frequency inverse relationship
---

# Frequency Shifting and Scaling Properties

This lesson covers two essential Fourier transform properties: frequency shifting (modulation) and time scaling, which have important applications in communications and signal processing.

## Frequency Shifting Property

### Definition

If $\mathcal{F}\{x(t)\} = X(\omega)$, then:

$$\mathcal{F}\{x(t)e^{j\omega_0 t}\} = X(\omega - \omega_0)$$

Multiplication by a complex exponential shifts the spectrum.

### Proof

$$\mathcal{F}\{x(t)e^{j\omega_0 t}\} = \int_{-\infty}^{\infty} x(t)e^{j\omega_0 t}e^{-j\omega t}dt$$

$$= \int_{-\infty}^{\infty} x(t)e^{-j(\omega - \omega_0)t}dt = X(\omega - \omega_0)$$

## Modulation Theorem

### Real Carrier

For modulation with real cosine carrier:

$$x(t)\cos(\omega_0 t) \leftrightarrow \frac{1}{2}[X(\omega - \omega_0) + X(\omega + \omega_0)]$$

### Applications

This is the basis for amplitude modulation (AM):
- Message spectrum $X(\omega)$ is shifted to carrier frequency $\pm\omega_0$
- Creates upper and lower sidebands
- Enables frequency-division multiplexing

## Time Scaling Property

### Definition

$$\mathcal{F}\{x(at)\} = \frac{1}{|a|}X\left(\frac{\omega}{a}\right)$$

### Interpretation

- **Compression** ($a > 1$): Signal shorter in time, wider spectrum
- **Expansion** ($0 < a < 1$): Signal longer in time, narrower spectrum

### Time-Bandwidth Product

There is an inverse relationship between time duration and bandwidth:

$$\Delta t \cdot \Delta f \geq \frac{1}{4\pi}$$

Shorter signals have broader bandwidth and vice versa.

## Summary

Frequency shifting enables modulation for communications. Time scaling shows the fundamental trade-off between time and frequency resolution. Both properties are essential for signal processing applications.
