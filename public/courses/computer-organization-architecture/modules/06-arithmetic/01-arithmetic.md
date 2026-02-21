---
title: Integer and Floating-Point Representation
readingTime: 25
difficulty: intermediate
objectives:
  - Understand integer representation methods
  - Perform binary arithmetic
  - Understand IEEE 754 floating-point format
keyPoints:
  - Two's complement is the standard for signed integers
  - IEEE 754 defines floating-point format
  - Precision issues exist in floating-point
---

# Integer and Floating-Point Representation

## Integer Representation

### Unsigned Integers

Straight binary representation where all bits represent magnitude:

$$\text{Value} = \sum_{i=0}^{n-1} b_i \times 2^i$$

**Range**: $0$ to $2^n - 1$ for n bits

### Signed Integer Representations

#### 1. Sign-Magnitude
- MSB represents sign (0 = positive, 1 = negative)
- Remaining bits represent magnitude
- Two representations of zero (+0 and -0)

#### 2. Two's Complement (Most Common)

**Positive numbers**: Same as unsigned binary

**Negative numbers**: Complement all bits and add 1

**Range**: $-2^{n-1}$ to $2^{n-1} - 1$ for n bits

### Two's Complement Examples (8-bit)

| Decimal | Binary | Decimal | Binary |
|---------|--------|---------|--------|
| 127 | 01111111 | -1 | 11111111 |
| 64 | 01000000 | -2 | 11111110 |
| 1 | 00000001 | -127 | 10000001 |
| 0 | 00000000 | -128 | 10000000 |

### Advantages of Two's Complement

1. Single representation of zero
2. Subtraction implemented as addition
3. Arithmetic circuits are simpler
4. Most negative number is $-2^{n-1}$

## Binary Arithmetic

### Addition

Rules for single-bit addition:

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

Example: 5 + 3
```
  00000101 (5)
+ 00000011 (3)
----------
  00001000 (8)
```

### Subtraction

Using two's complement: A - B = A + (-B)

To negate B: complement all bits, then add 1

Example: 5 - 3
```
  00000101 (5)
+ 11111101 (-3 in two's complement)
----------
  00000010 (2)
```

### Multiplication

Binary multiplication is simpler than decimal:
- Multiply by 0: result is 0
- Multiply by 1: result is multiplicand
- Shift and add partial products

### Division

Binary division uses repeated subtraction:
- Shift divisor left
- Subtract if result is positive
- Set quotient bit accordingly
- Repeat for each bit position

## Floating-Point Representation

### IEEE 754 Standard

The IEEE 754 standard defines floating-point formats:

$$\text{Value} = (-1)^S \times M \times 2^{E-\text{bias}}$$

Where:
- S = Sign bit (0 = positive, 1 = negative)
- M = Mantissa (significand)
- E = Biased exponent

### Single Precision (32-bit)

| Component | Bits | Position |
|-----------|------|----------|
| Sign | 1 bit | 31 |
| Exponent | 8 bits | 30-23 |
| Mantissa | 23 bits | 22-0 |

**Bias**: 127

**Range**: $\approx 10^{-38}$ to $10^{38}$

### Double Precision (64-bit)

| Component | Bits | Position |
|-----------|------|----------|
| Sign | 1 bit | 63 |
| Exponent | 11 bits | 62-52 |
| Mantissa | 52 bits | 51-0 |

**Bias**: 1023

**Range**: $\approx 10^{-308}$ to $10^{308}$

### Normalized Form

The mantissa is normalized with an implicit leading 1:

$$M = 1.fraction$$

This provides an extra bit of precision without storing it.

### Example: Representing 5.75

1. Convert to binary: $5.75 = 101.11_2$
2. Normalize: $1.0111 \times 2^2$
3. Sign bit: 0 (positive)
4. Exponent: $2 + 127 = 129 = 10000001_2$
5. Mantissa: $011100...0$

Result: `0 10000001 01110000000000000000000`

## Floating-Point Special Values

| Value | Sign | Exponent | Mantissa |
|-------|------|----------|----------|
| +Zero | 0 | All 0s | All 0s |
| -Zero | 1 | All 0s | All 0s |
| +Infinity | 0 | All 1s | All 0s |
| -Infinity | 1 | All 1s | All 0s |
| NaN | X | All 1s | Non-zero |

## Floating-Point Precision Issues

### Round-Off Error

Not all decimal values have exact binary representations:
- $0.1$ has no exact binary representation
- Accumulated errors in repeated calculations

### Comparison Issues

Never compare floating-point numbers for equality:
```c
// Bad
if (a == b) { ... }

// Good
if (abs(a - b) < epsilon) { ... }
```

### Overflow and Underflow

- **Overflow**: Number too large to represent → Infinity
- **Underflow**: Number too small to represent → Zero or subnormal

## Summary

Computer arithmetic is fundamental to processor design:

1. **Integers**: Two's complement is the standard for signed integers
2. **Floating-Point**: IEEE 754 defines standard formats
3. **Precision**: Limitations exist in both integer and floating-point
4. **Hardware**: ALU implements these operations efficiently

Understanding arithmetic representation helps in writing correct and efficient programs.
