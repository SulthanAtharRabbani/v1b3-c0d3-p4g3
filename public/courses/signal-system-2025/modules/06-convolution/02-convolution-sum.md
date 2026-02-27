---
title: Convolution Sum
readingTime: 28
difficulty: intermediate
objectives:
  - Define the convolution sum for discrete-time systems
  - Apply the sliding tape method for convolution
  - Compute discrete convolution using tables
  - Solve practical discrete convolution problems
keyPoints:
  - Convolution sum: y[n] = Σx[k]h[n-k]
  - Sliding tape method is the discrete graphical approach
  - Table method organizes the computation
  - Discrete convolution is fundamental to digital signal processing
---

# Convolution Sum

## Introduction

For discrete-time LTI systems, the convolution operation is expressed as a summation rather than an integral. The convolution sum provides a systematic way to compute the output of digital systems and forms the foundation of digital signal processing.

## Definition of Discrete Convolution

The convolution of two discrete-time signals $x[n]$ and $h[n]$ is defined as:

$$y[n] = x[n] * h[n] = \sum_{k=-\infty}^{\infty} x[k]h[n-k]$$

where $k$ is the dummy variable of summation.

### Alternative Form

An equivalent form (due to commutativity):

$$y[n] = h[n] * x[n] = \sum_{k=-\infty}^{\infty} h[k]x[n-k]$$

## Physical Interpretation

Each output sample $y[n]$ is computed by:

1. Taking input samples $x[k]$ at various times
2. Weighting them by corresponding impulse response values $h[n-k]$
3. Summing all weighted contributions

## Sliding Tape Method

The sliding tape method is a visual technique for computing discrete convolution.

### Step-by-Step Procedure

**Step 1: Write out the signals**
- Write $x[k]$ values on a strip (tape) - this is the stationary tape
- Write $h[k]$ values on another strip - this is the sliding tape

**Step 2: Flip the sliding tape**
- Reverse the order of $h[k]$ to get $h[-k]$
- This corresponds to reflecting about the origin

**Step 3: Position for each n**
- Shift the flipped tape to position $n$
- Align $h[0]$ (after flip) with $x[n]$

**Step 4: Multiply and sum**
- Multiply overlapping pairs
- Sum all products to get $y[n]$

**Step 5: Repeat for all n**
- Continue sliding and computing

## Example: Basic Convolution

### Problem

Compute $y[n] = x[n] * h[n]$ where:
$$x[n] = \{1, 2, 3\} \quad \text{(for } n = 0, 1, 2\text{)}$$
$$h[n] = \{1, 1\} \quad \text{(for } n = 0, 1\text{)}$$

### Solution Using Sliding Tape

| Position $n$ | Overlapping Products | Sum |
|--------------|---------------------|-----|
| $n = 0$ | $1 \times 1 = 1$ | $y[0] = 1$ |
| $n = 1$ | $1 \times 1 + 2 \times 1 = 3$ | $y[1] = 3$ |
| $n = 2$ | $2 \times 1 + 3 \times 1 = 5$ | $y[2] = 5$ |
| $n = 3$ | $3 \times 1 = 3$ | $y[3] = 3$ |

Result: $y[n] = \{1, 3, 5, 3\}$ for $n = 0, 1, 2, 3$

## Table Method

The table method provides an organized approach:

### Setup

Create a table where:
- Rows are indexed by $k$ (input index)
- Columns are indexed by $n$ (output index)
- Each cell contains $x[k]h[n-k]$

### Example

For $x[n] = \{1, 2\}$ and $h[n] = \{1, 1, 1\}$:

| $k \backslash n$ | 0 | 1 | 2 | 3 |
|------------------|---|---|---|---|
| 0 | $1 \times 1$ | $1 \times 1$ | $1 \times 1$ | - |
| 1 | - | $2 \times 1$ | $2 \times 1$ | $2 \times 1$ |
| **Sum** | **1** | **3** | **3** | **2** |

Result: $y[n] = \{1, 3, 3, 2\}$

## Length of Convolution Result

If $x[n]$ has length $L_x$ and $h[n]$ has length $L_h$, then:

$$L_y = L_x + L_h - 1$$

The output extends from:
- Start: $n_{start,x} + n_{start,h}$
- End: $n_{end,x} + n_{end,h}$

## Special Cases

### Convolution with Unit Impulse

$$x[n] * \delta[n] = x[n]$$
$$x[n] * \delta[n - n_0] = x[n - n_0]$$

### Convolution with Unit Step

$$x[n] * u[n] = \sum_{k=-\infty}^{n} x[k]$$

This is the running sum (discrete integrator).

## Example: FIR Filter Output

### Problem

A moving average filter has impulse response:
$$h[n] = \frac{1}{4}\{1, 1, 1, 1\}$$

Compute the output for input:
$$x[n] = \{4, 8, 12, 8, 4\}$$

### Solution

$$y[n] = x[n] * h[n]$$

Computing each sample:
- $y[0] = 4 \times 0.25 = 1$
- $y[1] = (4 + 8) \times 0.25 = 3$
- $y[2] = (4 + 8 + 12) \times 0.25 = 6$
- $y[3] = (4 + 8 + 12 + 8) \times 0.25 = 8$
- $y[4] = (8 + 12 + 8 + 4) \times 0.25 = 8$
- $y[5] = (12 + 8 + 4) \times 0.25 = 6$
- $y[6] = (8 + 4) \times 0.25 = 3$
- $y[7] = 4 \times 0.25 = 1$

Result: $y[n] = \{1, 3, 6, 8, 8, 6, 3, 1\}$

## Circular Convolution

For periodic or finite-length signals treated as periodic, circular convolution applies:

$$y[n] = \sum_{k=0}^{N-1} x[k]h[(n-k) \mod N]$$

This is important in FFT-based convolution and digital communications.

## Summary

The convolution sum is the discrete-time counterpart of the convolution integral. The sliding tape method and table method provide systematic approaches for computation. Understanding discrete convolution is essential for digital signal processing, digital filter implementation, and computer-based signal analysis.
