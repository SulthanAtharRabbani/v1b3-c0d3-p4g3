---
title: Number Systems and Data Representation
readingTime: 20
difficulty: beginner
objectives:
  - Convert between decimal, binary, and hexadecimal systems
  - Understand binary arithmetic fundamentals
  - Represent data in different number bases
keyPoints:
  - Binary is the native language of computers
  - Hexadecimal provides compact representation
  - Each hex digit represents 4 binary bits
---

# Number Systems and Data Representation

Understanding number systems is critical for working with computers, as all data is ultimately represented in binary form.

## Why Number Systems Matter

Computers use binary (base-2) for all internal operations because:
- Electronic components have two stable states (on/off, high/low voltage)
- Binary circuits are simpler and more reliable
- Error detection and correction are more straightforward

## Decimal System (Base-10)

The decimal system we use daily has:
- 10 digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- Position values: powers of 10

Example: $1234_{10} = 1 \times 10^3 + 2 \times 10^2 + 3 \times 10^1 + 4 \times 10^0$

## Binary System (Base-2)

The binary system has:
- 2 digits: 0, 1
- Position values: powers of 2

### Binary to Decimal Conversion

Example: $1011_2 = 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0$
$= 8 + 0 + 2 + 1 = 11_{10}$

### Decimal to Binary Conversion

**Method: Repeated Division by 2**

Convert $25_{10}$ to binary:
| Division | Quotient | Remainder |
|----------|----------|-----------|
| 25 ÷ 2 | 12 | 1 (LSB) |
| 12 ÷ 2 | 6 | 0 |
| 6 ÷ 2 | 3 | 0 |
| 3 ÷ 2 | 1 | 1 |
| 1 ÷ 2 | 0 | 1 (MSB) |

Result: $25_{10} = 11001_2$ (read remainders from bottom to top)

## Hexadecimal System (Base-16)

Hexadecimal provides a compact way to represent binary data:
- 16 digits: 0-9 and A-F (representing 10-15)
- Each hex digit represents exactly 4 binary bits

### Hexadecimal Digits

| Decimal | Binary | Hex |
|---------|--------|-----|
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |

### Binary to Hexadecimal Conversion

**Method: Group bits in fours from right**

Convert $11010110_2$ to hex:
- Group: 1101 0110
- Convert: D 6
- Result: $11010110_2 = D6_{16}$

### Hexadecimal to Binary Conversion

Convert $2F_{16}$ to binary:
- 2 = 0010
- F = 1111
- Result: $2F_{16} = 00101111_2$

## Common Conversions Table

| Decimal | Binary | Hexadecimal |
|---------|--------|-------------|
| 0 | 0000 | 0 |
| 8 | 1000 | 8 |
| 10 | 1010 | A |
| 15 | 1111 | F |
| 16 | 10000 | 10 |
| 255 | 11111111 | FF |
| 256 | 100000000 | 100 |

## Binary Arithmetic

### Addition Rules

| A + B | Sum | Carry |
|-------|-----|-------|
| 0 + 0 | 0 | 0 |
| 0 + 1 | 1 | 0 |
| 1 + 0 | 1 | 0 |
| 1 + 1 | 0 | 1 |

Example: $1011 + 0110$
```
  1011 (11)
+ 0110 (6)
 ------
 10001 (17)
```

### Multiplication

Binary multiplication follows the same rules as decimal:
- $0 \times 0 = 0$
- $0 \times 1 = 0$
- $1 \times 0 = 0$
- $1 \times 1 = 1$

## Data Representation

### Bytes and Words

- **Bit**: Single binary digit (0 or 1)
- **Nibble**: 4 bits (one hex digit)
- **Byte**: 8 bits
- **Word**: Processor-dependent (typically 16, 32, or 64 bits)

### Prefixes

| Prefix | Symbol | Multiplier |
|--------|--------|------------|
| Kilo | K | $2^{10} = 1024$ |
| Mega | M | $2^{20} = 1,048,576$ |
| Giga | G | $2^{30} = 1,073,741,824$ |
| Tera | T | $2^{40} = 1,099,511,627,776$ |

## Summary

Number systems form the foundation of all data representation in computers:

1. **Binary** is the native representation in digital computers
2. **Hexadecimal** provides a convenient shorthand for binary
3. **Conversions** between systems are essential skills
4. **Understanding** these systems is crucial for working with computer architecture

These concepts will be applied throughout the course, especially in modules covering arithmetic operations and memory addressing.
