---
title: Computer Structure and Function
readingTime: 25
difficulty: beginner
objectives:
  - Describe the four basic functions of a computer
  - Identify the four main structural components
  - Understand the hierarchical nature of computer systems
keyPoints:
  - Computers perform only four basic functions
  - Structure determines how components are interconnected
  - Function determines how each component operates
---

# Computer Structure and Function

## The Hierarchical Nature of Computer Systems

A computer is a complex system containing millions of elementary electronic components. To clearly describe such a complex system, we recognize its **hierarchical nature**:

A hierarchical system is a set of interrelated subsystems, each of which may contain lower-level subsystems, until we reach some lowest level of elementary components.

### Key Concepts

- **Structure**: The way in which components are interrelated
- **Function**: The operation of each individual component as part of the structure

## Four Basic Functions

Despite their complexity, computers perform only **four basic functions**:

### 1. Data Processing

Data may take a wide variety of forms, and the range of processing requirements is broad. However, there are only a few fundamental methods or types of data processing. This function is primarily performed by the **Arithmetic Logic Unit (ALU)**.

### 2. Data Storage

The computer performs both short-term and long-term storage functions:

- **Short-term**: Data being worked on at any given moment (registers, cache)
- **Long-term**: Files stored for subsequent retrieval and update (main memory, disk)

### 3. Data Movement

The computer's operating environment consists of devices that serve as sources or destinations of data:

- **Input/Output (I/O)**: When data is received from or delivered to a directly connected device
- **Data Communications**: When data is moved over longer distances to/from remote devices

### 4. Control

Within the computer, a **control unit** manages the computer's resources and orchestrates the performance of its functional parts in response to instructions.

## Four Structural Components

A computer system consists of four main structural components:

### 1. Central Processing Unit (CPU)

Controls the operation of the computer and performs data processing functions. Often simply referred to as the **processor**. The CPU consists of:

- **Control Unit**: Controls CPU and computer operation
- **ALU**: Performs data processing
- **Registers**: Provides internal storage
- **CPU Interconnection**: Communication mechanism among components

### 2. Main Memory

Stores data and programs. This is volatile storage that loses its contents when power is removed.

### 3. Input/Output (I/O)

Moves data between the computer and its external environment. Includes:
- Input devices (keyboard, mouse, etc.)
- Output devices (display, printer, etc.)
- Storage devices (disk drives, SSDs, etc.)
- Network interfaces

### 4. System Interconnection

Provides communication among CPU, main memory, and I/O. The most common implementation is a **system bus** consisting of multiple conducting wires to which all other components attach.

## Top-Level View

```
┌─────────────────────────────────────────────────────────┐
│                    COMPUTER SYSTEM                       │
│  ┌─────────────┐  ┌──────────┐  ┌───────────────────┐   │
│  │             │  │          │  │                   │   │
│  │     CPU     │◄─►│  Memory  │◄─►│    I/O Units     │   │
│  │             │  │          │  │                   │   │
│  └─────────────┘  └──────────┘  └───────────────────┘   │
│         ▲               ▲                ▲               │
│         └───────────────┴────────────────┘               │
│                  System Interconnection                   │
└─────────────────────────────────────────────────────────┘
```

## CPU Internal Structure

The CPU is the most complex component. Its major structural components are:

### Control Unit (CU)
- Controls operation of the CPU
- Interprets instructions
- Generates control signals

### Arithmetic Logic Unit (ALU)
- Performs arithmetic operations (add, subtract, multiply, divide)
- Performs logical operations (AND, OR, NOT, XOR)
- Performs comparison operations

### Registers
- **Program Counter (PC)**: Address of next instruction
- **Instruction Register (IR)**: Currently executing instruction
- **Memory Address Register (MAR)**: Memory address for read/write
- **Memory Buffer Register (MBR)**: Data to/from memory
- **General Purpose Registers**: Temporary data storage
- **Status/Flag Registers**: Condition codes and processor state

## Summary

Understanding structure and function is essential for studying computer systems:

1. **Functions** are what the computer does (processing, storage, movement, control)
2. **Structure** is how the computer is organized (CPU, memory, I/O, interconnection)
3. **Hierarchy** allows us to manage complexity by focusing on one level at a time

This top-down view provides the framework for detailed study of each component in subsequent modules.
