import type { Module } from '@/types';

export const signalsSystemsModules: Module[] = [
  {
    id: 'ss-intro',
    title: 'Signal and System Fundamentals',
    description: 'Basic concepts of signals, systems, and their properties',
    lessons: [
      {
        id: 'ss-intro-1',
        title: 'Classification of Signals',
        content: `
# Classification of Signals

## What is a Signal?

A **signal** is a function of one or more independent variables that conveys information. In engineering, signals typically represent physical quantities that vary over time or space.

## Signal Classification

### 1. Continuous vs. Discrete Time

**Continuous-Time Signal**: Defined for all values of time.
$$x(t), \\quad t \\in \\mathbb{R}$$

**Discrete-Time Signal**: Defined only at discrete time instants.
$$x[n] = x(nT_s), \\quad n \\in \\mathbb{Z}$$

### 2. Analog vs. Digital

**Analog Signal**: Continuous in both time and amplitude.

**Digital Signal**: Discrete in both time and amplitude (quantized).

### 3. Periodic vs. Aperiodic

**Periodic Signal**: Satisfies the condition
$$x(t) = x(t + T), \\quad \\forall t$$

where $T$ is the fundamental period.

**Fundamental Period**: Smallest positive $T$ for which the periodicity condition holds.

**Fundamental Frequency**: $f_0 = \\frac{1}{T}$ Hz or $\\omega_0 = \\frac{2\\pi}{T}$ rad/s

### 4. Even vs. Odd Signals

**Even Signal**: $x(t) = x(-t)$ (symmetric about origin)

**Odd Signal**: $x(t) = -x(-t)$ (antisymmetric about origin)

**Any signal can be decomposed**:
$$x(t) = x_e(t) + x_o(t)$$

Where:
$$x_e(t) = \\frac{x(t) + x(-t)}{2}, \\quad x_o(t) = \\frac{x(t) - x(-t)}{2}$$

### 5. Energy vs. Power Signals

**Energy Signal**: Finite energy, zero average power
$$E = \\int_{-\\infty}^{\\infty} |x(t)|^2 dt < \\infty$$

**Power Signal**: Finite average power
$$P = \\lim_{T \\to \\infty} \\frac{1}{2T} \\int_{-T}^{T} |x(t)|^2 dt < \\infty$$

| Signal Type | Energy | Power |
|-------------|--------|-------|
| Energy | Finite | Zero |
| Power | Infinite | Finite |
| Neither | Infinite | Infinite |

### 6. Deterministic vs. Random

**Deterministic Signal**: Completely specified by a mathematical function.

**Random Signal**: Cannot be predicted exactly; described statistically.

## Elementary Signals

### 1. Unit Step Function
$$u(t) = \\begin{cases} 1, & t \\geq 0 \\\\ 0, & t < 0 \\end{cases}$$

### 2. Unit Impulse (Delta Function)
$$\\delta(t) = 0, \\quad t \\neq 0$$
$$\\int_{-\\infty}^{\\infty} \\delta(t) dt = 1$$

**Sampling Property**:
$$\\int_{-\\infty}^{\\infty} x(t)\\delta(t-t_0) dt = x(t_0)$$

### 3. Ramp Function
$$r(t) = t \\cdot u(t)$$

### 4. Exponential Signal
$$x(t) = Ae^{st}$$

- If $s$ is real and negative: decaying exponential
- If $s$ is real and positive: growing exponential
- If $s$ is complex: damped sinusoid

### 5. Sinusoidal Signal
$$x(t) = A\\cos(\\omega_0 t + \\phi)$$

## Systems and Their Properties

A **system** processes input signals to produce output signals.

### System Properties

| Property | Definition | Test |
|----------|------------|------|
| **Linearity** | Superposition holds | $T\\{ax_1 + bx_2\\} = aT\\{x_1\\} + bT\\{x_2\\}$ |
| **Time-Invariance** | Shift invariance | $x(t) \\to y(t) \\Rightarrow x(t-t_0) \\to y(t-t_0)$ |
| **Causality** | Output depends on present/past only | $y(t)$ depends only on $x(\\tau)$, $\\tau \\leq t$ |
| **Stability (BIBO)** | Bounded input → bounded output | $\\|x(t)\\| < \\infty \\Rightarrow \\|y(t)\\| < \\infty$ |
| **Memory** | Output depends on past/future | Memoryless: $y(t)$ depends only on $x(t)$ |

## LTI Systems

**Linear Time-Invariant (LTI) systems** are fundamental in signal processing.

**Key Property**: Output is convolution of input with impulse response:
$$y(t) = x(t) * h(t) = \\int_{-\\infty}^{\\infty} x(\\tau)h(t-\\tau) d\\tau$$
`,
        objectives: [
          'Classify signals based on various properties',
          'Distinguish between continuous and discrete-time signals',
          'Understand elementary signals and their properties',
          'Identify system properties (linearity, time-invariance, causality)',
        ],
        keyPoints: [
          'Signals can be classified by time domain, amplitude, periodicity, and symmetry',
          'Energy signals have finite energy; power signals have finite average power',
          'The unit impulse is fundamental for system analysis',
          'LTI systems are characterized by impulse response and convolution',
        ],
        readingTime: 16,
      },
      {
        id: 'ss-intro-2',
        title: 'Fourier Series and Signal Decomposition',
        content: `
# Fourier Series and Signal Decomposition

## Introduction

The **Fourier Series** represents a periodic signal as a sum of sinusoids at harmonic frequencies. This is fundamental to frequency-domain analysis.

## Trigonometric Fourier Series

For a periodic signal $x(t)$ with period $T$:

$$x(t) = a_0 + \\sum_{n=1}^{\\infty} \\left[a_n\\cos(n\\omega_0 t) + b_n\\sin(n\\omega_0 t)\\right]$$

Where $\\omega_0 = \\frac{2\\pi}{T}$ is the fundamental frequency.

### Coefficients

**DC Component**:
$$a_0 = \\frac{1}{T} \\int_0^T x(t) dt$$

**Cosine Coefficients**:
$$a_n = \\frac{2}{T} \\int_0^T x(t)\\cos(n\\omega_0 t) dt$$

**Sine Coefficients**:
$$b_n = \\frac{2}{T} \\int_0^T x(t)\\sin(n\\omega_0 t) dt$$

## Exponential (Complex) Fourier Series

A more compact form using complex exponentials:

$$x(t) = \\sum_{n=-\\infty}^{\\infty} c_n e^{jn\\omega_0 t}$$

### Complex Coefficients

$$c_n = \\frac{1}{T} \\int_0^T x(t) e^{-jn\\omega_0 t} dt$$

### Relationship Between Forms

$$c_n = \\frac{a_n - jb_n}{2}, \\quad c_{-n} = c_n^*$$
$$c_0 = a_0$$

## Properties of Fourier Series

| Property | Time Domain | Frequency Domain |
|----------|-------------|------------------|
| Linearity | $ax(t) + by(t)$ | $aC_n + bD_n$ |
| Time Shift | $x(t-t_0)$ | $c_n e^{-jn\\omega_0 t_0}$ |
| Time Reversal | $x(-t)$ | $c_{-n}$ |
| Conjugation | $x^*(t)$ | $c_{-n}^*$ |
| Differentiation | $\\frac{dx}{dt}$ | $jn\\omega_0 c_n$ |
| Integration | $\\int_{-\\infty}^t x(\\tau)d\\tau$ | $\\frac{c_n}{jn\\omega_0}$ |

## Symmetry Properties

| Signal Type | Coefficient Relationship |
|-------------|--------------------------|
| Real signal | $c_{-n} = c_n^*$ |
| Real and even | $c_n$ real, $b_n = 0$ |
| Real and odd | $c_n$ imaginary, $a_n = 0$ |
| Half-wave symmetry | $c_n = 0$ for even $n$ |

## Example: Square Wave

A square wave with amplitude $A$ and period $T$:

$$x(t) = \\begin{cases} A, & 0 < t < T/2 \\\\ -A, & T/2 < t < T \\end{cases}$$

**Fourier Series** (odd harmonics only):
$$x(t) = \\frac{4A}{\\pi} \\sum_{n=1,3,5,\\ldots}^{\\infty} \\frac{1}{n}\\sin(n\\omega_0 t)$$

## Parseval's Theorem

The average power equals the sum of harmonic powers:

$$\\frac{1}{T} \\int_0^T |x(t)|^2 dt = \\sum_{n=-\\infty}^{\\infty} |c_n|^2$$

## Gibbs Phenomenon

When approximating a discontinuous function with a finite number of terms:
- Overshoot of ~9% at discontinuities
- Overshoot does not diminish as more terms are added
- Width of overshoot decreases with more terms

## Applications

1. **Spectral Analysis**: Identifying frequency components
2. **Filter Design**: Removing specific frequencies
3. **Signal Compression**: Representing signals efficiently
4. **Audio Processing**: Equalization, synthesis
`,
        objectives: [
          'Derive Fourier series representations of periodic signals',
          'Calculate Fourier coefficients for various waveforms',
          'Understand the relationship between time and frequency domains',
          'Apply Fourier series properties for signal analysis',
        ],
        keyPoints: [
          'Fourier series decomposes periodic signals into harmonics',
          'Complex exponential form is more compact and easier to manipulate',
          'Symmetry properties simplify coefficient calculation',
          'Parseval\'s theorem relates time and frequency domain power',
        ],
        readingTime: 15,
      },
    ],
    quizQuestions: [
      {
        id: 'ss-intro-q1',
        question: 'What is the fundamental period of a signal x(t) = cos(2πt) + sin(4πt)?',
        options: ['0.5 seconds', '1 second', '2 seconds', '4 seconds'],
        correctIndex: 1,
        explanation: 'cos(2πt) has period T1 = 1s, sin(4πt) has period T2 = 0.5s. The fundamental period is the LCM, which is 1 second.',
      },
      {
        id: 'ss-intro-q2',
        question: 'For an energy signal, what is the average power?',
        options: ['Infinite', 'Finite non-zero', 'Zero', 'Undefined'],
        correctIndex: 2,
        explanation: 'Energy signals have finite total energy distributed over infinite time, resulting in zero average power.',
      },
    ],
  },
  {
    id: 'ss-fourier',
    title: 'Fourier Transform',
    description: 'Continuous-time Fourier transform and frequency analysis',
    lessons: [
      {
        id: 'ss-fourier-1',
        title: 'The Fourier Transform',
        content: `
# The Fourier Transform

## Introduction

The **Fourier Transform** extends Fourier series to aperiodic signals, providing a continuous frequency spectrum.

## Definition

### Forward Transform
$$X(\\omega) = \\mathcal{F}\\{x(t)\\} = \\int_{-\\infty}^{\\infty} x(t) e^{-j\\omega t} dt$$

### Inverse Transform
$$x(t) = \\mathcal{F}^{-1}\\{X(\\omega)\\} = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} X(\\omega) e^{j\\omega t} d\\omega$$

## Existence Conditions (Dirichlet)

1. $\\int_{-\\infty}^{\\infty} |x(t)| dt < \\infty$ (absolutely integrable)
2. Finite number of discontinuities
3. Finite number of maxima/minima

## Common Fourier Transforms

| Signal | Transform |
|--------|-----------|
| $\\delta(t)$ | $1$ |
| $1$ | $2\\pi\\delta(\\omega)$ |
| $u(t)$ | $\\pi\\delta(\\omega) + \\frac{1}{j\\omega}$ |
| $e^{-at}u(t), a>0$ | $\\frac{1}{a+j\\omega}$ |
| $e^{-a|t|}, a>0$ | $\\frac{2a}{a^2+\\omega^2}$ |
| $\\cos(\\omega_0 t)$ | $\\pi[\\delta(\\omega-\\omega_0) + \\delta(\\omega+\\omega_0)]$ |
| $\\sin(\\omega_0 t)$ | $j\\pi[\\delta(\\omega+\\omega_0) - \\delta(\\omega-\\omega_0)]$ |
| $\\text{rect}(t/\\tau)$ | $\\tau \\text{sinc}(\\omega\\tau/2)$ |
| $e^{-at^2}$ | $\\sqrt{\\frac{\\pi}{a}}e^{-\\omega^2/4a}$ |

## Properties

| Property | Time Domain | Frequency Domain |
|----------|-------------|------------------|
| Linearity | $ax(t) + by(t)$ | $aX(\\omega) + bY(\\omega)$ |
| Time Shift | $x(t-t_0)$ | $X(\\omega)e^{-j\\omega t_0}$ |
| Frequency Shift | $x(t)e^{j\\omega_0 t}$ | $X(\\omega-\\omega_0)$ |
| Time Scaling | $x(at)$ | $\\frac{1}{|a|}X(\\omega/a)$ |
| Time Reversal | $x(-t)$ | $X(-\\omega)$ |
| Conjugation | $x^*(t)$ | $X^*(-\\omega)$ |
| Differentiation | $\\frac{dx}{dt}$ | $j\\omega X(\\omega)$ |
| Integration | $\\int_{-\\infty}^t x(\\tau)d\\tau$ | $\\frac{X(\\omega)}{j\\omega} + \\pi X(0)\\delta(\\omega)$ |
| Convolution | $x(t)*h(t)$ | $X(\\omega)H(\\omega)$ |
| Multiplication | $x(t)h(t)$ | $\\frac{1}{2\\pi}X(\\omega)*H(\\omega)$ |

## Convolution Theorem

**Time Domain Convolution ↔ Frequency Domain Multiplication**

$$x(t)*h(t) \\leftrightarrow X(\\omega)H(\\omega)$$

This is fundamental to LTI system analysis:
$$Y(\\omega) = X(\\omega)H(\\omega)$$

## Parseval's Theorem

$$\\int_{-\\infty}^{\\infty} |x(t)|^2 dt = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} |X(\\omega)|^2 d\\omega$$

The energy in time domain equals energy in frequency domain.

## Energy Spectral Density

$$S_{xx}(\\omega) = |X(\\omega)|^2$$

Represents energy distribution across frequencies.

## Duality

If $x(t) \\leftrightarrow X(\\omega)$, then:

$$X(t) \\leftrightarrow 2\\pi x(-\\omega)$$

## Example: Low-Pass Filter

Ideal low-pass filter with cutoff $\\omega_c$:

$$H(\\omega) = \\begin{cases} 1, & |\\omega| < \\omega_c \\\\ 0, & |\\omega| > \\omega_c \\end{cases}$$

**Impulse Response**:
$$h(t) = \\frac{\\sin(\\omega_c t)}{\\pi t} = \\frac{\\omega_c}{\\pi}\\text{sinc}(\\omega_c t/\\pi)$$

Note: This is non-causal and cannot be realized exactly.
`,
        objectives: [
          'Apply the Fourier transform to analyze signals in frequency domain',
          'Use Fourier transform properties for signal manipulation',
          'Understand the convolution theorem and its applications',
          'Calculate energy spectral density',
        ],
        keyPoints: [
          'Fourier transform converts between time and frequency domains',
          'Convolution in time equals multiplication in frequency',
          'Parseval\'s theorem preserves energy across domains',
          'Ideal filters have non-causal impulse responses',
        ],
        readingTime: 18,
      },
    ],
  },
  {
    id: 'ss-laplace',
    title: 'Laplace Transform',
    description: 'Laplace transform for system analysis',
    lessons: [
      {
        id: 'ss-laplace-1',
        title: 'The Laplace Transform',
        content: `
# The Laplace Transform

## Introduction

The **Laplace Transform** generalizes the Fourier transform and is particularly useful for:
- Analyzing system stability
- Solving differential equations
- Handling unstable systems

## Definition

### Bilateral Laplace Transform
$$X(s) = \\mathcal{L}\\{x(t)\\} = \\int_{-\\infty}^{\\infty} x(t) e^{-st} dt$$

### Unilateral Laplace Transform
$$X(s) = \\int_{0^-}^{\\infty} x(t) e^{-st} dt$$

Where $s = \\sigma + j\\omega$ is a complex variable.

## Region of Convergence (ROC)

The ROC is the set of $s$ values for which the transform converges.

**Key Points:**
- ROC is a strip or half-plane in the s-plane
- For right-sided signals: ROC is right of rightmost pole
- For left-sided signals: ROC is left of leftmost pole
- Stable systems: ROC includes the imaginary axis

## Common Laplace Transforms

| Signal | Transform | ROC |
|--------|-----------|-----|
| $\\delta(t)$ | $1$ | All $s$ |
| $u(t)$ | $\\frac{1}{s}$ | Re(s) > 0 |
| $t^n u(t)$ | $\\frac{n!}{s^{n+1}}$ | Re(s) > 0 |
| $e^{-at}u(t)$ | $\\frac{1}{s+a}$ | Re(s) > -a |
| $te^{-at}u(t)$ | $\\frac{1}{(s+a)^2}$ | Re(s) > -a |
| $\\cos(\\omega_0 t)u(t)$ | $\\frac{s}{s^2+\\omega_0^2}$ | Re(s) > 0 |
| $\\sin(\\omega_0 t)u(t)$ | $\\frac{\\omega_0}{s^2+\\omega_0^2}$ | Re(s) > 0 |

## Properties

| Property | Time Domain | s-Domain |
|----------|-------------|----------|
| Linearity | $ax(t) + by(t)$ | $aX(s) + bY(s)$ |
| Time Shift | $x(t-t_0)u(t-t_0)$ | $e^{-st_0}X(s)$ |
| Frequency Shift | $e^{s_0 t}x(t)$ | $X(s-s_0)$ |
| Scaling | $x(at)$ | $\\frac{1}{|a|}X(s/a)$ |
| Differentiation | $\\frac{dx}{dt}$ | $sX(s) - x(0^-)$ |
| Integration | $\\int_0^t x(\\tau)d\\tau$ | $\\frac{X(s)}{s}$ |
| Convolution | $x(t)*h(t)$ | $X(s)H(s)$ |
| Initial Value | $x(0^+)$ | $\\lim_{s\\to\\infty} sX(s)$ |
| Final Value | $x(\\infty)$ | $\\lim_{s\\to 0} sX(s)$ |

## Inverse Laplace Transform

Using partial fraction expansion:

$$X(s) = \\frac{N(s)}{D(s)} = \\sum_i \\frac{A_i}{(s-p_i)^{n_i}}$$

Then invert each term individually.

### Example

$$X(s) = \\frac{s+3}{s^2+3s+2} = \\frac{s+3}{(s+1)(s+2)}$$

Partial fractions:
$$X(s) = \\frac{A}{s+1} + \\frac{B}{s+2}$$

Finding coefficients:
$$A = \\left.\\frac{s+3}{s+2}\\right|_{s=-1} = 2$$
$$B = \\left.\\frac{s+3}{s+1}\\right|_{s=-2} = -1$$

Inverse transform:
$$x(t) = (2e^{-t} - e^{-2t})u(t)$$

## Solving Differential Equations

Given: $\\frac{d^2y}{dt^2} + 3\\frac{dy}{dt} + 2y = x(t)$

Taking Laplace transform:
$$s^2Y(s) - sy(0) - y'(0) + 3[sY(s) - y(0)] + 2Y(s) = X(s)$$

Solve for $Y(s)$ and take inverse transform.

## Transfer Function

For an LTI system:
$$H(s) = \\frac{Y(s)}{X(s)} = \\frac{\\text{Output transform}}{\\text{Input transform}}$$

**Poles and Zeros** determine system behavior and stability.
`,
        objectives: [
          'Apply the Laplace transform to signals and systems',
          'Determine region of convergence for Laplace transforms',
          'Use Laplace transform properties for analysis',
          'Solve differential equations using Laplace transforms',
        ],
        keyPoints: [
          'Laplace transform generalizes Fourier transform',
          'ROC determines convergence region',
          'Partial fraction expansion simplifies inverse transform',
          'Transfer function characterizes LTI systems',
        ],
        readingTime: 17,
      },
    ],
  },
];
