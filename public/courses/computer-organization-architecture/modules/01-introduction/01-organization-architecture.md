---
title: Organization vs Architecture
readingTime: 20
difficulty: beginner
objectives:
  - Define computer architecture and its scope
  - Define computer organization and its scope
  - Distinguish between architectural and organizational attributes
keyPoints:
  - Architecture refers to attributes visible to the programmer
  - Organization refers to operational units transparent to the programmer
  - The same architecture can have different implementations
---

# Organization vs Architecture

## Defining Computer Architecture

**Computer Architecture** refers to those attributes of a system that are visible to a programmer, or put another way, those attributes that have a direct impact on the logical execution of a program. This includes:

### Architectural Attributes

| Attribute | Description |
|-----------|-------------|
| Instruction Set | The complete set of instructions the processor can execute |
| Data Types | Number of bits used to represent various data types |
| Addressing Modes | Methods for addressing memory locations |
| Memory Access | Techniques for accessing program and data memory |
| I/O Mechanisms | How the processor handles input/output operations |

## Defining Computer Organization

**Computer Organization** refers to the operational units and their interconnections that realize the architectural specifications. These are hardware details transparent to the programmer. This includes:

### Organizational Attributes

| Attribute | Description |
|-----------|-------------|
| Control Signals | The electrical signals that coordinate operations |
| Interfaces | Connections between the computer and peripherals |
| Memory Technology | The specific technology used for memory implementation |
| Cache Organization | How cache memory is structured and managed |
| Clock Speed | The frequency at which the processor operates |

## Key Distinction

Consider the example of a multiply instruction:

- **Architectural Decision**: Should the computer have a multiply instruction at all?
- **Organizational Decision**: Should that instruction be implemented by a special multiply unit or by repeated use of an add unit?

The organizational decision may be based on:
- Anticipated frequency of use of the multiply instruction
- Relative speed of the two approaches
- Cost and physical size of a special multiply unit

## Computer Families

The distinction between architecture and organization has been historically important. Many computer manufacturers offer a **family of computer models**, all with the same architecture but with differences in organization. 

### Benefits

1. **Price/Performance Options**: Different models in the family have different price and performance characteristics
2. **Upgrade Path**: Customers can upgrade to more expensive, faster models without abandoning existing software
3. **Technology Evolution**: Newer models with improved technology can replace older models while maintaining software compatibility

### Example: IBM System/370

The IBM System/370 architecture:
- First introduced in 1970
- Included a number of models with different organizations
- Spanned many years with evolving technology
- Protected customers' software investment across generations

## Modern Considerations

In contemporary systems, the interplay between organization and architecture has become more complex:

### Reduced Instruction Set Computers (RISC)

RISC represents an intriguing example where:
- Organizational and architectural design decisions interact more closely
- Less emphasis on generation-to-generation compatibility
- Greater optimization possible through this interaction

## Summary

Understanding the distinction between organization and architecture is fundamental to studying computer systems:

- **Architecture** = What the programmer sees (the interface)
- **Organization** = How it's implemented (the internals)

Both aspects are essential for a complete understanding of computer systems, and this course examines both perspectives throughout all modules.
