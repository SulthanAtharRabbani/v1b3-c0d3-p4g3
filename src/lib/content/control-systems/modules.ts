import type { Module } from '@/types';

export const controlSystemsModules: Module[] = [
  {
    id: 'cs-intro',
    title: 'Introduction to Control Systems',
    description: 'Fundamental concepts and historical development of control systems',
    lessons: [
      {
        id: 'cs-intro-1',
        title: 'What is a Control System?',
        content: `
# What is a Control System?

A **control system** is an interconnection of components designed to achieve a desired response through manipulation of inputs. Control systems are ubiquitous in modern engineering, from simple household thermostats to complex industrial processes.

## Basic Components

Every control system consists of:

1. **Input** - The excitation or command applied to the system
2. **Process/Plant** - The system being controlled
3. **Output** - The actual response of the system
4. **Sensor** - Measures the output
5. **Controller** - Compares reference with output and adjusts

## Types of Control Systems

### Open-Loop Systems
In an open-loop system, the output has no effect on the control action:

$$\\text{Input} \\rightarrow \\text{Controller} \\rightarrow \\text{Plant} \\rightarrow \\text{Output}$$

**Advantages:**
- Simple and economical
- Easy to maintain
- Stable (no feedback instability)

**Disadvantages:**
- Cannot compensate for disturbances
- Accuracy depends on calibration
- Sensitive to parameter variations

### Closed-Loop Systems
In a closed-loop (feedback) system, the output is measured and compared with the input:

$$\\text{Input} \\rightarrow \\text{Comparator} \\rightarrow \\text{Controller} \\rightarrow \\text{Plant} \\rightarrow \\text{Output}$$
$$\\uparrow \\hspace{3cm} \\downarrow$$
$$\\text{Feedback from Sensor}$$

**Advantages:**
- Automatic correction of errors
- Reduced sensitivity to parameter variations
- Disturbance rejection
- Improved accuracy

**Disadvantages:**
- More complex
- Potential for instability
- Higher cost

## Key Definitions

| Term | Definition |
|------|------------|
| **Reference** | Desired value of the output |
| **Error** | Difference between reference and output |
| **Actuating Signal** | Signal that drives the controller |
| **Disturbance** | Unwanted signal affecting the output |

## Historical Development

Control systems have evolved significantly:

- **1788**: James Watt's flyball governor for steam engines
- **1868**: James Clerk Maxwell's analysis of governors
- **1932**: Nyquist stability criterion
- **1948**: Root locus method by W.R. Evans
- **1960s**: State-space methods and optimal control
- **Present**: Digital control, adaptive systems, AI integration

## Applications

Control systems are essential in:

- **Aerospace**: Flight control, autopilot, guidance
- **Automotive**: Cruise control, ABS, engine management
- **Process Industry**: Chemical reactors, distillation
- **Robotics**: Motion control, manipulation
- **Power Systems**: Voltage regulation, load frequency
- **Biomedical**: Drug delivery, prosthetics
`,
        objectives: [
          'Define what a control system is and its basic components',
          'Distinguish between open-loop and closed-loop systems',
          'Understand the advantages and disadvantages of each type',
          'Recognize real-world applications of control systems',
        ],
        keyPoints: [
          'Control systems manipulate inputs to achieve desired outputs',
          'Open-loop systems have no feedback; closed-loop systems use feedback',
          'Feedback enables error correction but can cause instability',
          'Modern control systems integrate digital technology and AI',
        ],
        readingTime: 12,
      },
      {
        id: 'cs-intro-2',
        title: 'Transfer Functions and Block Diagrams',
        content: `
# Transfer Functions and Block Diagrams

## The Transfer Function

The **transfer function** is the fundamental mathematical representation of linear time-invariant (LTI) systems. It is defined as the ratio of the Laplace transform of the output to the Laplace transform of the input, with zero initial conditions.

$$G(s) = \\frac{C(s)}{R(s)} = \\frac{\\mathcal{L}[c(t)]}{\\mathcal{L}[r(t)]}$$

Where:
- $C(s)$ is the output transform
- $R(s)$ is the input transform
- $s$ is the complex frequency variable

## Properties of Transfer Functions

1. **Rational Function**: $G(s)$ is a ratio of polynomials in $s$

$$G(s) = \\frac{b_m s^m + b_{m-1}s^{m-1} + \\cdots + b_1 s + b_0}{a_n s^n + a_{n-1}s^{n-1} + \\cdots + a_1 s + a_0}$$

2. **Poles and Zeros**:
   - **Zeros**: Roots of numerator (where $G(s) = 0$)
   - **Poles**: Roots of denominator (where $G(s) \\rightarrow \\infty$)

3. **System Order**: Equal to the degree of the denominator polynomial

4. **Stability**: Determined by pole locations in the $s$-plane

## Block Diagram Algebra

Block diagrams provide a graphical representation of system interconnections.

### Basic Operations

**Series (Cascade) Connection:**
$$\\frac{C(s)}{R(s)} = G_1(s) \\cdot G_2(s)$$

**Parallel Connection:**
$$\\frac{C(s)}{R(s)} = G_1(s) + G_2(s)$$

**Negative Feedback Connection:**
$$\\frac{C(s)}{R(s)} = \\frac{G(s)}{1 + G(s)H(s)}$$

### Block Diagram Reduction Rules

| Rule | Description |
|------|-------------|
| Combine series blocks | $G_1 \\cdot G_2$ |
| Combine parallel blocks | $G_1 + G_2$ |
| Move summing junction left | Add $G$ in parallel |
| Move takeoff point right | Add $G$ in parallel |
| Closed-loop reduction | $\\frac{G}{1+GH}$ |

## Standard Form of Second-Order Systems

A standard second-order system has the transfer function:

$$G(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}$$

Where:
- $\\omega_n$ = natural frequency (rad/s)
- $\\zeta$ = damping ratio (dimensionless)

### Response Characteristics

| Damping Ratio | Response Type |
|---------------|---------------|
| $\\zeta = 0$ | Undamped (oscillatory) |
| $0 < \\zeta < 1$ | Underdamped |
| $\\zeta = 1$ | Critically damped |
| $\\zeta > 1$ | Overdamped |

## Example: DC Motor Transfer Function

For an armature-controlled DC motor:

$$\\frac{\\Theta(s)}{V_a(s)} = \\frac{K_m}{s[(L_a s + R_a)(J s + b) + K_m K_b]}$$

Simplified (neglecting armature inductance):

$$\\frac{\\Theta(s)}{V_a(s)} = \\frac{K}{s(\\tau s + 1)}$$

Where $K = \\frac{K_m}{R_a b + K_m K_b}$ and $\\tau = \\frac{J R_a}{R_a b + K_m K_b}$
`,
        objectives: [
          'Define and derive transfer functions for LTI systems',
          'Identify poles and zeros from a transfer function',
          'Apply block diagram algebra for system reduction',
          'Understand second-order system characteristics',
        ],
        keyPoints: [
          'Transfer functions relate input and output in the Laplace domain',
          'Poles determine system stability and response characteristics',
          'Block diagrams visualize system interconnections',
          'Second-order systems are characterized by natural frequency and damping ratio',
        ],
        readingTime: 15,
      },
      {
        id: 'cs-intro-3',
        title: 'System Response and Time Domain Analysis',
        content: `
# System Response and Time Domain Analysis

## Introduction

Understanding how systems respond to various inputs is fundamental to control system design. We analyze both **transient response** (initial behavior) and **steady-state response** (long-term behavior).

## Standard Test Signals

### 1. Unit Step Input
$$r(t) = u(t), \\quad R(s) = \\frac{1}{s}$$

Used to analyze:
- Rise time
- Settling time
- Overshoot
- Steady-state error

### 2. Unit Ramp Input
$$r(t) = t \\cdot u(t), \\quad R(s) = \\frac{1}{s^2}$$

Used to analyze:
- Velocity error
- Tracking performance

### 3. Unit Impulse Input
$$r(t) = \\delta(t), \\quad R(s) = 1$$

Used to analyze:
- System dynamics
- Impulse response

## First-Order System Response

Transfer function: $G(s) = \\frac{K}{\\tau s + 1}$

### Step Response

$$c(t) = K(1 - e^{-t/\\tau})$$

**Key characteristics:**
- Time constant $\\tau$: output reaches 63.2% of final value
- Settling time: approximately $4\\tau$ (98% of final value)
- No overshoot

## Second-Order System Response

Transfer function: $G(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}$

### Step Response for Underdamped Case ($0 < \\zeta < 1$)

$$c(t) = 1 - \\frac{e^{-\\zeta\\omega_n t}}{\\sqrt{1-\\zeta^2}} \\sin(\\omega_d t + \\phi)$$

Where:
- $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$ (damped natural frequency)
- $\\phi = \\cos^{-1}(\\zeta)$

### Time Domain Specifications

| Specification | Formula |
|---------------|---------|
| **Peak Time** ($t_p$) | $\\frac{\\pi}{\\omega_d}$ |
| **Percent Overshoot** (%OS) | $e^{-\\zeta\\pi/\\sqrt{1-\\zeta^2}} \\times 100$ |
| **Settling Time** ($t_s$) | $\\frac{4}{\\zeta\\omega_n}$ (2% criterion) |
| **Rise Time** ($t_r$) | $\\frac{\\pi - \\phi}{\\omega_d}$ |

## Steady-State Error Analysis

For a unity feedback system with open-loop transfer function $G(s)$:

### System Types

The **system type** is the number of pure integrators in $G(s)$:

$$G(s) = \\frac{K(s+z_1)(s+z_2)\\cdots}{s^N(s+p_1)(s+p_2)\\cdots}$$

### Steady-State Errors

| Input Type | Type 0 | Type 1 | Type 2 |
|------------|--------|--------|--------|
| Step | $\\frac{1}{1+K_p}$ | 0 | 0 |
| Ramp | $\\infty$ | $\\frac{1}{K_v}$ | 0 |
| Parabola | $\\infty$ | $\\infty$ | $\\frac{1}{K_a}$ |

Where:
- $K_p = \\lim_{s \\to 0} G(s)$ (position constant)
- $K_v = \\lim_{s \\to 0} sG(s)$ (velocity constant)
- $K_a = \\lim_{s \\to 0} s^2 G(s)$ (acceleration constant)

## Example: Calculating Transient Response

Given a second-order system with $\\omega_n = 4$ rad/s and $\\zeta = 0.5$:

1. **Damped frequency**: $\\omega_d = 4\\sqrt{1-0.25} = 3.46$ rad/s
2. **Peak time**: $t_p = \\frac{\\pi}{3.46} = 0.91$ s
3. **Overshoot**: %OS = $e^{-0.5\\pi/0.866} \\times 100 = 16.3\\%$
4. **Settling time**: $t_s = \\frac{4}{0.5 \\times 4} = 2$ s
`,
        objectives: [
          'Analyze time domain response of first and second-order systems',
          'Calculate transient response specifications',
          'Determine steady-state errors for different input types',
          'Understand the relationship between poles and response characteristics',
        ],
        keyPoints: [
          'First-order systems are characterized by time constant τ',
          'Second-order systems are characterized by ωn and ζ',
          'Overshoot and settling time depend on damping ratio',
          'System type determines steady-state error characteristics',
        ],
        readingTime: 18,
      },
    ],
    quizQuestions: [
      {
        id: 'cs-intro-q1',
        question: 'Which type of control system can automatically correct for disturbances?',
        options: ['Open-loop system', 'Closed-loop system', 'Feedforward system', 'Manual system'],
        correctIndex: 1,
        explanation: 'Closed-loop (feedback) systems measure the output and compare it with the reference, allowing automatic correction of errors due to disturbances.',
      },
      {
        id: 'cs-intro-q2',
        question: 'For a second-order system with damping ratio ζ = 0.707, what type of response does it exhibit?',
        options: ['Undamped', 'Underdamped', 'Critically damped', 'Overdamped'],
        correctIndex: 1,
        explanation: 'When 0 < ζ < 1, the system is underdamped. A damping ratio of 0.707 is often called "optimal damping" as it provides a good balance between response speed and overshoot.',
      },
      {
        id: 'cs-intro-q3',
        question: 'What is the steady-state error for a Type 1 system subjected to a unit step input?',
        options: ['Infinite', '1/(1+Kp)', 'Zero', '1/Kv'],
        correctIndex: 2,
        explanation: 'A Type 1 system has one integrator, which means Kp = ∞. Therefore, the steady-state error for a step input is 1/(1+∞) = 0.',
      },
    ],
  },
  {
    id: 'cs-stability',
    title: 'Stability Analysis',
    description: 'Methods for analyzing system stability including Routh-Hurwitz criterion',
    lessons: [
      {
        id: 'cs-stability-1',
        title: 'Concept of Stability',
        content: `
# Concept of Stability

## Definition of Stability

A system is **stable** if its response to a bounded input is bounded. This is known as **BIBO stability** (Bounded-Input, Bounded-Output).

### Mathematical Definition

For a linear time-invariant system with impulse response $g(t)$:

$$\\int_0^{\\infty} |g(t)| dt < \\infty$$

The system is BIBO stable if and only if this integral converges.

## Stability in the s-Plane

The stability of an LTI system is determined by the locations of its poles:

| Pole Location | Stability | Response |
|---------------|-----------|----------|
| Left half-plane (Re < 0) | Stable | Decaying exponential |
| Imaginary axis (Re = 0) | Marginally stable | Sustained oscillation |
| Right half-plane (Re > 0) | Unstable | Growing exponential |

## Types of Stability

### 1. Asymptotic Stability
A system is asymptotically stable if:
- All poles have negative real parts
- Free response decays to zero as $t \\rightarrow \\infty$

### 2. Marginal Stability
A system is marginally stable if:
- No poles in the right half-plane
- Simple poles on the imaginary axis
- Free response remains bounded but does not decay

### 3. Instability
A system is unstable if:
- At least one pole in the right half-plane
- Or multiple poles on the imaginary axis
- Free response grows without bound

## Relative Stability

Beyond absolute stability, we often care about **relative stability** - how close the system is to instability.

### Measures of Relative Stability

1. **Gain Margin (GM)**: Factor by which gain can be increased before instability
2. **Phase Margin (PM)**: Additional phase lag before instability
3. **Damping Ratio (ζ)**: For second-order systems, relates to pole locations

## Relationship Between Poles and Response

For a pole at $s = \\sigma + j\\omega$:

- **Real part** ($\\sigma$): Determines decay/growth rate
- **Imaginary part** ($\\omega$): Determines oscillation frequency

$$\\text{Time constant} = \\frac{1}{|\\sigma|}$$

### Complex Conjugate Poles

For poles at $s = -\\zeta\\omega_n \\pm j\\omega_d$:

$$\\text{Response} = Ae^{-\\zeta\\omega_n t}\\sin(\\omega_d t + \\phi)$$

## Example: Determining Stability

Consider the system:

$$G(s) = \\frac{10}{s^3 + 6s^2 + 11s + 6}$$

Finding poles (roots of denominator):
$$s^3 + 6s^2 + 11s + 6 = (s+1)(s+2)(s+3)$$

Poles: $s = -1, -2, -3$

Since all poles are in the left half-plane, the system is **stable**.

## Stability Margins Visualization

In the complex plane, the imaginary axis is the **stability boundary**:
- **Left half-plane (Re < 0)**: Stable region
- **Right half-plane (Re > 0)**: Unstable region
- **Imaginary axis (Re = 0)**: Stability boundary
`,
        objectives: [
          'Define BIBO stability and its mathematical basis',
          'Determine stability from pole locations',
          'Distinguish between asymptotic, marginal, and unstable systems',
          'Understand relative stability concepts',
        ],
        keyPoints: [
          'BIBO stability requires bounded output for bounded input',
          'Stable systems have all poles in the left half-plane',
          'The imaginary axis is the stability boundary',
          'Relative stability measures how close a system is to instability',
        ],
        readingTime: 14,
      },
      {
        id: 'cs-stability-2',
        title: 'Routh-Hurwitz Stability Criterion',
        content: `
# Routh-Hurwitz Stability Criterion

## Introduction

The **Routh-Hurwitz criterion** provides a method to determine system stability without computing pole locations. It answers the question: "How many roots of the characteristic equation are in the right half-plane?"

## Characteristic Equation

For a system with open-loop transfer function $G(s)H(s)$ in a negative feedback configuration:

$$\\text{Characteristic Equation: } 1 + G(s)H(s) = 0$$

Or in polynomial form:

$$a_n s^n + a_{n-1}s^{n-1} + \\cdots + a_1 s + a_0 = 0$$

## Necessary Conditions for Stability

Before applying Routh-Hurwitz:

1. All coefficients must be positive: $a_i > 0$ for all $i$
2. No missing powers of $s$

If either condition fails, the system is unstable or marginally stable.

## Routh Array Construction

Given the characteristic equation:
$$a_n s^n + a_{n-1}s^{n-1} + a_{n-2}s^{n-2} + \\cdots + a_1 s + a_0 = 0$$

### Step 1: Create the First Two Rows

$$\\begin{array}{c|cccc}
s^n & a_n & a_{n-2} & a_{n-4} & \\cdots \\\\
s^{n-1} & a_{n-1} & a_{n-3} & a_{n-5} & \\cdots
\\end{array}$$

### Step 2: Compute Remaining Rows

For each subsequent row, compute elements using:

$$b_i = \\frac{a_{n-1} \\cdot a_{n-2i} - a_n \\cdot a_{n-2i-1}}{a_{n-1}}$$

$$c_i = \\frac{b_1 \\cdot a_{n-2i-1} - a_{n-1} \\cdot b_{i+1}}{b_1}$$

Continue until the row for $s^0$.

### Complete Routh Array Example

For $s^4 + 2s^3 + 3s^2 + 4s + 5 = 0$:

$$\\begin{array}{c|ccc}
s^4 & 1 & 3 & 5 \\\\
s^3 & 2 & 4 & 0 \\\\
s^2 & 1 & 5 & 0 \\\\
s^1 & -6 & 0 & 0 \\\\
s^0 & 5 & 0 & 0
\\end{array}$$

## Stability Determination

**Routh-Hurwitz Criterion:**

The number of sign changes in the first column equals the number of roots in the right half-plane.

### Example Analysis

In the array above:
- $s^4$: 1 (positive)
- $s^3$: 2 (positive)
- $s^2$: 1 (positive)
- $s^1$: -6 (negative) ← **Sign change!**
- $s^0$: 5 (positive) ← **Sign change!**

**Two sign changes** → Two RHP roots → **Unstable**

## Special Cases

### Case 1: Zero in First Column

When a zero appears in the first column but not the entire row:

**Solution**: Replace zero with a small $\\epsilon$ and continue.

### Case 2: Entire Row of Zeros

When an entire row is zero:

**Solution**: 
1. Form auxiliary polynomial from the row above
2. Differentiate with respect to $s$
3. Use coefficients to replace the zero row
4. Continue the analysis

### Example: Row of Zeros

For $s^5 + 2s^4 + 3s^3 + 6s^2 + 2s + 4 = 0$:

$$\\begin{array}{c|ccc}
s^5 & 1 & 3 & 2 \\\\
s^4 & 2 & 6 & 4 \\\\
s^3 & 0 & 0 & 0
\\end{array}$$

Auxiliary polynomial from $s^4$ row: $2s^4 + 6s^2 + 4$

Derivative: $8s^3 + 12s$

Replace $s^3$ row with: $8, 12, 0$

Continue analysis...

## Application: Determining Gain Margins

For a system with variable gain $K$:

$$D(s) = s^3 + 3s^2 + 2s + K$$

Routh array:

$$\\begin{array}{c|cc}
s^3 & 1 & 2 \\\\
s^2 & 3 & K \\\\
s^1 & \\frac{6-K}{3} & 0 \\\\
s^0 & K & 0
\\end{array}$$

For stability:
- $\\frac{6-K}{3} > 0 \\Rightarrow K < 6$
- $K > 0$

**Stable range**: $0 < K < 6$
`,
        objectives: [
          'Apply the Routh-Hurwitz criterion to determine stability',
          'Handle special cases (zero first column, entire zero row)',
          'Determine gain margins using Routh-Hurwitz',
          'Understand the necessary conditions for stability',
        ],
        keyPoints: [
          'Routh-Hurwitz determines number of RHP poles without computing them',
          'Sign changes in first column = number of unstable poles',
          'All coefficients must be positive for stability (necessary condition)',
          'Special cases require auxiliary polynomial method',
        ],
        readingTime: 16,
      },
    ],
    quizQuestions: [
      {
        id: 'cs-stability-q1',
        question: 'A system has poles at s = -2, s = -1 ± j3. Is this system stable?',
        options: ['Yes, asymptotically stable', 'No, unstable', 'Marginally stable', 'Cannot determine'],
        correctIndex: 0,
        explanation: 'All poles have negative real parts (-2, -1, -1), so the system is asymptotically stable. All poles are in the left half-plane.',
      },
      {
        id: 'cs-stability-q2',
        question: 'In a Routh array, if there are two sign changes in the first column, how many poles are in the right half-plane?',
        options: ['0', '1', '2', 'Cannot determine'],
        correctIndex: 2,
        explanation: 'The number of sign changes in the first column of a Routh array equals the number of roots in the right half-plane.',
      },
    ],
  },
  {
    id: 'cs-pid',
    title: 'PID Controller Design',
    description: 'Proportional-Integral-Derivative controller design and tuning methods',
    lessons: [
      {
        id: 'cs-pid-1',
        title: 'PID Controller Fundamentals',
        content: `
# PID Controller Fundamentals

## Introduction

The **PID controller** (Proportional-Integral-Derivative) is the most widely used controller in industry. It combines three control actions to achieve desired performance.

## Controller Components

### Proportional (P) Control

$$u(t) = K_p e(t)$$

**Effect:**
- Immediate response to error
- Reduces rise time
- Increases overshoot
- Cannot eliminate steady-state error

### Integral (I) Control

$$u(t) = K_i \\int_0^t e(\\tau) d\\tau$$

**Effect:**
- Eliminates steady-state error
- Increases system type by 1
- Can cause integral windup
- Slows down response

### Derivative (D) Control

$$u(t) = K_d \\frac{de(t)}{dt}$$

**Effect:**
- Anticipates future error
- Reduces overshoot
- Improves damping
- Sensitive to noise

## Combined PID Controller

### Standard Form (Ideal)

$$u(t) = K_p \\left[ e(t) + \\frac{1}{T_i} \\int_0^t e(\\tau) d\\tau + T_d \\frac{de(t)}{dt} \\right]$$

### Parallel Form

$$u(t) = K_p e(t) + K_i \\int_0^t e(\\tau) d\\tau + K_d \\frac{de(t)}{dt}$$

### Transfer Function

$$G_c(s) = K_p + \\frac{K_i}{s} + K_d s = K_p \\left(1 + \\frac{1}{T_i s} + T_d s\\right)$$

## Effect of Each Term

| Term | Effect | Trade-off |
|------|--------|-----------|
| **P** | Reduces error proportionally | Can cause oscillation |
| **I** | Eliminates steady-state error | Slows response |
| **D** | Anticipates error | Amplifies noise |

## Response Comparison

### P Controller
$$G_c(s) = K_p$$

- Fast initial response
- Steady-state error remains
- Higher $K_p$ → smaller error but more oscillation

### PI Controller
$$G_c(s) = K_p + \\frac{K_i}{s}$$

- Zero steady-state error
- Slower response
- May cause overshoot

### PD Controller
$$G_c(s) = K_p + K_d s$$

- Improved damping
- Reduced overshoot
- Still has steady-state error

### PID Controller
$$G_c(s) = K_p + \\frac{K_i}{s} + K_d s$$

- Zero steady-state error
- Good transient response
- Reduced overshoot

## Example: First-Order System with PID

Consider: $G_p(s) = \\frac{1}{s+1}$

With P controller $K_p$:
$$\\frac{C(s)}{R(s)} = \\frac{K_p}{s+1+K_p}$$

Steady-state error for step input:
$$e_{ss} = \\frac{1}{1+K_p}$$

With PI controller:
$$G_c(s) = K_p + \\frac{K_i}{s}$$

$$\\frac{C(s)}{R(s)} = \\frac{K_p s + K_i}{s^2 + (1+K_p)s + K_i}$$

Steady-state error: $e_{ss} = 0$ (Type 1 system)

## Integral Windup

**Problem**: When actuator saturates, integral term keeps accumulating.

**Solutions**:
1. **Clamping**: Limit integral term
2. **Back-calculation**: Adjust integral when saturated
3. **Conditional integration**: Only integrate when error is small

## Implementation Considerations

### Discrete Implementation

Using backward difference:
$$u_k = K_p e_k + K_i T_s \\sum_{i=0}^{k} e_i + K_d \\frac{e_k - e_{k-1}}{T_s}$$

### Noise Filtering

For derivative term:
$$G_d(s) = \\frac{K_d s}{\\tau_f s + 1}$$

Where $\\tau_f$ is the filter time constant.
`,
        objectives: [
          'Understand the role of P, I, and D terms in a controller',
          'Analyze the effects of each term on system response',
          'Compare P, PI, PD, and PID controllers',
          'Understand practical issues like integral windup',
        ],
        keyPoints: [
          'P term provides immediate proportional response',
          'I term eliminates steady-state error by increasing system type',
          'D term anticipates error and improves damping',
          'PID combines benefits of all three but requires tuning',
        ],
        readingTime: 15,
      },
      {
        id: 'cs-pid-2',
        title: 'PID Tuning Methods',
        content: `
# PID Tuning Methods

## Introduction

Tuning a PID controller means finding optimal values for $K_p$, $K_i$, and $K_d$ to achieve desired performance. Several methods exist, each with advantages and limitations.

## Ziegler-Nichols Methods

### Method 1: Step Response (Open-Loop)

**Procedure:**
1. Apply step input to open-loop system
2. Draw tangent at inflection point
3. Measure delay time $L$ and time constant $T$

**Tuning Rules:**

| Controller | $K_p$ | $T_i$ | $T_d$ |
|------------|-------|-------|-------|
| P | $T/(L \\cdot K)$ | - | - |
| PI | $0.9 T/(L \\cdot K)$ | $L/0.3$ | - |
| PID | $1.2 T/(L \\cdot K)$ | $2L$ | $0.5L$ |

Where $K$ is the steady-state gain.

### Method 2: Ultimate Cycle (Closed-Loop)

**Procedure:**
1. Set $K_i = K_d = 0$
2. Increase $K_p$ until sustained oscillation
3. Record ultimate gain $K_u$ and ultimate period $T_u$

**Tuning Rules:**

| Controller | $K_p$ | $T_i$ | $T_d$ |
|------------|-------|-------|-------|
| P | $0.5 K_u$ | - | - |
| PI | $0.45 K_u$ | $T_u/1.2$ | - |
| PID | $0.6 K_u$ | $T_u/2$ | $T_u/8$ |

## Cohen-Coon Method

For first-order with delay systems:

$$G(s) = \\frac{K e^{-Ls}}{Ts + 1}$$

**PID Tuning:**
- $K_p = \\frac{T}{K L} \\left(\\frac{4}{3} + \\frac{L}{4T}\\right)$
- $T_i = L \\frac{32 + 6L/T}{13 + 8L/T}$
- $T_d = \\frac{4L}{11 + 2L/T}$

## Auto-Tuning Methods

### Relay Feedback Method

1. Replace controller with relay (on/off)
2. Measure limit cycle amplitude and period
3. Estimate ultimate gain and period:
   - $K_u = \\frac{4d}{\\pi a}$ (d=relay amplitude, a=oscillation amplitude)
4. Apply Ziegler-Nichols rules

### Optimization-Based Tuning

Minimize performance index:

**ITAE (Integral Time Absolute Error):**
$$J = \\int_0^{\\infty} t|e(t)| dt$$

## Tyreus-Luyben Tuning

Conservative tuning for robustness:

| Controller | $K_p$ | $T_i$ | $T_d$ |
|------------|-------|-------|-------|
| PI | $K_u/3.2$ | $2.2 T_u$ | - |
| PID | $K_u/3.2$ | $2.2 T_u$ | $T_u/6.3$ |

## Comparison of Methods

| Method | Pros | Cons |
|--------|------|------|
| Z-N Step | Simple, no instability | Aggressive tuning |
| Z-N Ultimate | No process model needed | Pushes to stability edge |
| Cohen-Coon | Better for high L/T | Complex formulas |
| ITAE Optimal | Optimal performance | Requires computation |
| Tyreus-Luyben | Robust | Slower response |

## Practical Tuning Guidelines

1. **Start with P-only**: Increase $K_p$ until oscillation begins
2. **Add I term**: Start with small $K_i$, adjust for steady-state error
3. **Add D term**: Small $K_d$ to reduce overshoot
4. **Fine-tune**: Adjust for specific performance requirements

## Digital Implementation Considerations

### Sampling Period Selection

Rule of thumb: $T_s < T_u/10$

### Discretization Effects

- Introduces additional phase lag
- Effective derivative gain reduced
- May require detuning

## Example: Tuning a Temperature Controller

Given a process with $K=2$, $L=10$s, $T=50$s:

Using Ziegler-Nichols step response:

**PID Parameters:**
- $K_p = 1.2 T/(L \\cdot K) = 1.2 \\times 50/(10 \\times 2) = 3$
- $T_i = 2L = 20$s → $K_i = K_p/T_i = 0.15$
- $T_d = 0.5L = 5$s → $K_d = K_p \\times T_d = 15$

**Verify performance through simulation!**
`,
        objectives: [
          'Apply Ziegler-Nichols tuning methods',
          'Understand Cohen-Coon and other tuning approaches',
          'Compare different tuning methods',
          'Implement practical tuning procedures',
        ],
        keyPoints: [
          'Ziegler-Nichols methods are simple but can be aggressive',
          'Ultimate cycle method finds stability boundary',
          'Tyreus-Luyben provides more conservative tuning',
          'Digital implementation requires careful sampling selection',
        ],
        readingTime: 14,
      },
    ],
  },
  {
    id: 'cs-root-locus',
    title: 'Root Locus Analysis',
    description: 'Root locus method for analyzing system behavior with varying parameters',
    lessons: [
      {
        id: 'cs-root-locus-1',
        title: 'Root Locus Fundamentals',
        content: `
# Root Locus Fundamentals

## Introduction

The **root locus** is a graphical method that shows how the closed-loop poles move in the s-plane as a parameter (usually gain $K$) varies from 0 to ∞.

## Definition

For a unity feedback system with open-loop transfer function:

$$G(s) = \\frac{K(s+z_1)(s+z_2)\\cdots}{(s+p_1)(s+p_2)\\cdots}$$

The characteristic equation is:

$$1 + K G_0(s) = 0$$

Where $G_0(s)$ is $G(s)$ with $K = 1$.

## Angle and Magnitude Conditions

### Magnitude Condition
$$|K G_0(s)| = 1 \\Rightarrow K = \\frac{1}{|G_0(s)|}$$

### Angle Condition
$$\\angle G_0(s) = \\pm 180°(2k+1), \\quad k = 0, 1, 2, \\ldots$$

## Root Locus Rules

### Rule 1: Branches
Number of branches = number of poles of $G(s)$

### Rule 2: Start and End Points
- **Start**: At open-loop poles ($K = 0$)
- **End**: At open-loop zeros ($K = \\infty$) or at infinity

### Rule 3: Symmetry
Root locus is symmetric about the real axis.

### Rule 4: Real Axis Segments
A point on the real axis is on the root locus if the number of poles and zeros to its right is odd.

### Rule 5: Asymptotes

Number of asymptotes = $n - m$ (poles - zeros)

**Centroid:**
$$\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n - m}$$

**Angles:**
$$\\phi_k = \\frac{(2k+1)\\pi}{n-m}, \\quad k = 0, 1, \\ldots, n-m-1$$

### Rule 6: Breakaway/Breakin Points

Points where branches leave/enter the real axis.

Solve: $\\frac{dK}{ds} = 0$ or $\\frac{d}{ds}G_0(s) = 0$

### Rule 7: Imaginary Axis Crossings

Use Routh-Hurwitz or substitute $s = j\\omega$ in characteristic equation.

### Rule 8: Departure/Arrival Angles

**Departure angle from pole $p_i$:**
$$\\phi_{dep} = 180° - \\sum \\angle(p_i - p_j) + \\sum \\angle(p_i - z_k)$$

**Arrival angle at zero $z_i$:**
$$\\phi_{arr} = 180° + \\sum \\angle(z_i - p_j) - \\sum \\angle(z_i - z_k)$$

## Example: Second-Order System

Consider: $G(s) = \\frac{K}{s(s+2)}$

**Poles**: $s = 0, -2$ | **Zeros**: None

**Steps:**
1. Two branches starting at $s = 0$ and $s = -2$
2. Real axis locus: $[-2, 0]$ (odd poles to right)
3. One asymptote: $n - m = 2$
4. Centroid: $\\sigma_a = \\frac{0-2}{2} = -1$
5. Asymptote angles: $\\pm 90°$
6. Breakaway point: $s = -1$

**Root Locus**: Two branches start at 0 and -2, meet at -1 (breakaway), then go vertically.

## Design Using Root Locus

### Adding a Zero
- Pulls root locus toward the zero
- Can stabilize an unstable system
- Improves transient response

### Adding a Pole
- Pushes root locus toward the right
- May destabilize system
- Adds integral action for error elimination

## MATLAB Commands

\`\`\`matlab
% Define system
num = [1];
den = [1 2 0];
sys = tf(num, den);

% Plot root locus
rlocus(sys)

% Find gain for specific damping
[z,p,k] = rlocfind(sys)
\`\`\`
`,
        objectives: [
          'Understand the concept and construction of root locus',
          'Apply the rules for sketching root locus',
          'Determine stability margins from root locus',
          'Use root locus for controller design',
        ],
        keyPoints: [
          'Root locus shows closed-loop pole movement with varying gain',
          'Locus starts at poles and ends at zeros or infinity',
          'Angle condition: sum of angles = ±180°(2k+1)',
          'Design involves placing poles/zeros to shape the locus',
        ],
        readingTime: 18,
      },
    ],
  },
];
