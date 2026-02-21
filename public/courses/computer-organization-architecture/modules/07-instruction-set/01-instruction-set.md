---
title: Instruction Characteristics and Addressing Modes
readingTime: 25
difficulty: intermediate
objectives:
  - Describe machine instruction elements
  - Explain different addressing modes
  - Understand instruction format design
keyPoints:
  - ISA is the programmer-visible interface
  - Addressing modes determine operand access
  - Instruction format affects code density
---

# Instruction Characteristics and Addressing Modes

## Machine Instruction Characteristics

### Instruction Elements

Every machine instruction must specify:

#### 1. Operation Code (Opcode)
- Specifies the operation to perform
- Examples: ADD, SUB, LOAD, STORE, JUMP
- Size determines maximum number of operations

#### 2. Source Operands
Where to get data for the operation:
- **Immediate**: Value in the instruction itself
- **Register**: CPU register
- **Memory**: Main memory location
- **I/O**: I/O port

#### 3. Result Operand
Where to store the result:
- Usually same locations as source operands
- May be implicit (accumulator-based machines)

#### 4. Next Instruction Reference
Where to fetch the next instruction:
- Usually implicit (PC + instruction length)
- Explicit for branch/jump instructions

## Types of Operations

### Data Transfer
- Move data between registers, memory, I/O
- LOAD, STORE, MOVE, PUSH, POP

### Arithmetic
- ADD, SUB, MUL, DIV
- May set condition codes (flags)

### Logical
- AND, OR, NOT, XOR
- Bit manipulation operations

### Control Transfer
- Unconditional: JUMP, CALL, RETURN
- Conditional: JZ, JNZ, JG, JL

### I/O
- Input from devices
- Output to devices

## Addressing Modes

Addressing modes determine how operands are specified:

### 1. Immediate Addressing
Operand is part of the instruction:
```
ADD R1, #5    ; R1 ← R1 + 5
```
- **Fast**: No memory access needed
- **Limited**: Operand size limited by instruction size

### 2. Direct (Absolute) Addressing
Address is part of the instruction:
```
LOAD R1, 1000    ; R1 ← Memory[1000]
```
- **Simple**: Single memory reference
- **Limited**: Address space limited by instruction size

### 3. Indirect Addressing
Address field points to a memory location containing the operand address:
```
LOAD R1, (1000)    ; R1 ← Memory[Memory[1000]]
```
- **Flexible**: Can address large memory space
- **Slower**: Multiple memory accesses

### 4. Register Addressing
Operand is in a register:
```
ADD R1, R2    ; R1 ← R1 + R2
```
- **Fast**: No memory access
- **Limited**: Number of registers is limited

### 5. Register Indirect Addressing
Register contains the memory address:
```
LOAD R1, (R2)    ; R1 ← Memory[R2]
```
- **Flexible**: Can address all memory
- **Efficient**: Good for arrays and pointers

### 6. Displacement (Based) Addressing
Address = Register + Displacement:
```
LOAD R1, 100(R2)    ; R1 ← Memory[R2 + 100]
```
- **Useful**: For accessing structure fields
- **Common**: In most modern processors

### 7. Stack Addressing
Operand is on top of stack:
```
PUSH R1    ; Memory[SP] ← R1; SP ← SP - 1
POP R1     ; SP ← SP + 1; R1 ← Memory[SP]
```
- **Implicit**: Address is the stack pointer
- **Efficient**: For expression evaluation

## Instruction Formats

### Design Factors

1. **Instruction Length**: Fixed vs. variable
2. **Address Count**: 0, 1, 2, or 3 addresses
3. **Opcode Size**: Number of operations
4. **Address Size**: Memory addressable

### Three-Address Format
```
ADD R1, R2, R3    ; R1 ← R2 + R3
```
- Most flexible
- Requires more bits per instruction

### Two-Address Format
```
ADD R1, R2    ; R1 ← R1 + R2
```
- One operand is both source and destination
- Common in CISC processors

### One-Address (Accumulator) Format
```
ADD mem    ; ACC ← ACC + Memory[mem]
```
- Shorter instructions
- Accumulator is implicit

### Zero-Address (Stack) Format
```
ADD    ; TOS ← TOS + Next
```
- Implicit operand addressing
- Used in stack machines

## x86 vs ARM

### x86 Characteristics (CISC)
- Variable length instructions (1-15 bytes)
- Many addressing modes
- Memory-to-memory operations
- Complex instructions (string operations, etc.)

### ARM Characteristics (RISC)
- Fixed length instructions (usually 32-bit)
- Load/Store architecture
- Many general-purpose registers
- Simple, regular instruction formats

## Summary

The ISA defines how software interacts with hardware:

1. **Opcode**: Specifies the operation
2. **Operands**: Specified via addressing modes
3. **Addressing Modes**: Trade-off between flexibility and efficiency
4. **Instruction Format**: Affects code density and complexity

Understanding ISA helps in:
- Writing efficient assembly code
- Understanding compiler output
- Designing computer systems
