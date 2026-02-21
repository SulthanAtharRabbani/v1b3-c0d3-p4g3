---
title: Instruction Cycle and Interrupts
readingTime: 25
difficulty: intermediate
objectives:
  - Describe the basic instruction cycle phases
  - Understand interrupt types and handling
  - Explain instruction cycle with interrupts
keyPoints:
  - Instruction cycle: Fetch, Decode, Execute
  - Interrupts allow response to external events
  - Multiple interrupt handling strategies exist
---

# Instruction Cycle and Interrupts

## The Basic Instruction Cycle

The instruction cycle (also called the fetch-decode-execute cycle) is the basic operational process of a computer. It is the process by which a computer retrieves a program instruction from memory, determines what actions the instruction requires, and carries out those actions.

### Three Phases

#### 1. Fetch

The processor fetches the instruction from memory:
1. The **Program Counter (PC)** contains the address of the next instruction
2. The address is placed in the **Memory Address Register (MAR)**
3. A read signal is sent to memory
4. The instruction is loaded into the **Memory Buffer Register (MBR)**
5. The instruction is transferred to the **Instruction Register (IR)**
6. The PC is incremented to point to the next instruction

#### 2. Decode

The control unit decodes the instruction:
1. The opcode is extracted from the instruction
2. The control unit determines what operation to perform
3. Operand addresses are calculated if needed
4. Control signals are generated for the execute phase

#### 3. Execute

The instruction is executed:
1. The ALU performs arithmetic or logical operations
2. Data is transferred between registers
3. Memory read/write operations occur
4. I/O operations may be initiated
5. The PC may be modified for branch instructions

## Instruction Cycle State Diagram

```
       ┌─────────┐
       │  FETCH  │
       └────┬────┘
            │
            ▼
       ┌─────────┐
       │ DECODE  │
       └────┬────┘
            │
            ▼
       ┌─────────┐
       │ EXECUTE │
       └────┬────┘
            │
            └──────────► (Return to FETCH)
```

## Interrupts

An **interrupt** is a signal to the processor that an event needs immediate attention. Interrupts allow the processor to respond to external events without continuously polling devices.

### Types of Interrupts

| Type | Source | Examples |
|------|--------|----------|
| Program | Internal to CPU | Arithmetic overflow, division by zero, invalid opcode |
| Timer | Internal timer | Time slice expired, watchdog timer |
| I/O | I/O controller | I/O completion, I/O error, device ready |
| Hardware Failure | Hardware | Memory parity error, power failure |

### Interrupt Processing

When an interrupt occurs:

1. **Suspend**: The processor suspends execution of the current program
2. **Save State**: The processor saves the PC and processor status
3. **Jump**: The processor jumps to an interrupt handler routine
4. **Execute Handler**: The interrupt handler processes the interrupt
5. **Restore**: The processor restores the saved state
6. **Resume**: The processor resumes the interrupted program

### Interrupt Cycle

With interrupts, the instruction cycle becomes:

```
       ┌─────────┐
       │  FETCH  │
       └────┬────┘
            │
            ▼
       ┌─────────┐
       │ DECODE  │
       └────┬────┘
            │
            ▼
       ┌─────────┐
       │ EXECUTE │
       └────┬────┘
            │
            ▼
       ┌───────────┐     No
       │ INTERRUPT │──────────► (Return to FETCH)
       │  CHECK    │
       └─────┬─────┘
             │ Yes
             ▼
       ┌─────────────┐
       │  INTERRUPT  │
       │  HANDLER    │
       └──────┬──────┘
              │
              └──────────► (Return to FETCH)
```

### Multiple Interrupts

When multiple interrupts can occur, two approaches are used:

#### 1. Disabled Interrupts (Sequential)
- While handling one interrupt, other interrupts are disabled
- Simple but may cause delayed response to critical events

#### 2. Nested Interrupts (Priority)
- Higher priority interrupts can interrupt lower priority handlers
- Requires interrupt priority system
- Provides better responsiveness for critical events

### Interrupt Vector Table

The interrupt vector table contains addresses of interrupt handlers:
- Each interrupt type has a unique vector number
- The vector number is used to index into the table
- The table entry contains the address of the handler routine

## Summary

The instruction cycle is the fundamental operation of a computer:

1. **Fetch**: Get instruction from memory
2. **Decode**: Determine what the instruction does
3. **Execute**: Perform the operation
4. **Interrupt Check**: Handle pending interrupts

Interrupts provide a mechanism for:
- Responding to external events efficiently
- Handling errors and exceptions
- Implementing multitasking operating systems

Understanding the instruction cycle and interrupts is essential for understanding how processors and operating systems work together.
