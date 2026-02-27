---
title: Frequency Response
readingTime: 25
difficulty: intermediate
objectives:
  - Define frequency response of LTI systems
  - Calculate magnitude and phase response
  - Understand transfer function concept
  - Analyze system behavior in frequency domain
keyPoints:
  - Frequency response H(ω) = Y(ω)/X(ω)
  - Magnitude response shows gain vs frequency
  - Phase response shows phase shift vs frequency
  - Bode plots visualize frequency response
---

# Frequency Response

The frequency response characterizes how an LTI system responds to different frequency components of input signals.

## Definition

The frequency response $H(\omega)$ of an LTI system is defined as:

$$H(\omega) = \frac{Y(\omega)}{X(\omega)}$$

where:
- $Y(\omega)$ = Fourier transform of output
- $X(\omega)$ = Fourier transform of input

Alternatively, the frequency response equals the Fourier transform of the impulse response:

$$H(\omega) = \mathcal{F}\{h(t)\}$$

## Magnitude and Phase Response

### Magnitude Response

$$|H(\omega)| = \sqrt{\text{Re}^2\{H(\omega)\} + \text{Im}^2\{H(\omega)\}}$$

The magnitude response shows how the system amplifies or attenuates each frequency component.

### Phase Response

$$\angle H(\omega) = \arctan\left(\frac{\text{Im}\{H(\omega)\}}{\text{Re}\{H(\omega)\}}\right)$$

The phase response shows the phase shift introduced at each frequency.

## Frequency Domain Analysis

For an LTI system with input $x(t)$ and output $y(t)$:

$$Y(\omega) = H(\omega) \cdot X(\omega)$$

This relationship simplifies system analysis:
1. Transform input to frequency domain
2. Multiply by frequency response
3. Inverse transform to get output

## Bode Plots

Bode plots display the frequency response on logarithmic scales:
- **Magnitude plot**: $20\log_{10}|H(\omega)|$ vs. $\log\omega$ (in dB)
- **Phase plot**: $\angle H(\omega)$ vs. $\log\omega$ (in degrees)

## Example: RC Low-Pass Filter

For an RC circuit with time constant $\tau = RC$:

$$H(\omega) = \frac{1}{1 + j\omega RC} = \frac{1}{1 + j\omega\tau}$$

Magnitude:
$$|H(\omega)| = \frac{1}{\sqrt{1 + (\omega RC)^2}}$$

Phase:
$$\angle H(\omega) = -\arctan(\omega RC)$$

Cutoff frequency: $\omega_c = 1/RC$

## Summary

The frequency response provides a complete characterization of LTI system behavior in the frequency domain. It simplifies analysis by converting convolution to multiplication.
