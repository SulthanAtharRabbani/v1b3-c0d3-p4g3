---
title: Processor Organization and Pipelining
readingTime: 30
difficulty: advanced
objectives:
  - Describe processor organization
  - Understand instruction pipelining
  - Identify pipeline hazards
  - Explain hazard resolution techniques
keyPoints:
  - Pipelining increases throughput
  - Hazards reduce pipeline efficiency
  - Forwarding and stalling resolve hazards
---

# Processor Organization and Pipelining

## Processor Organization

### Major Components

#### Control Unit
- Fetches instructions from memory
- Decodes instructions
- Generates control signals
- Manages instruction sequencing

#### Arithmetic Logic Unit (ALU)
- Performs arithmetic operations
- Performs logical operations
- Generates condition codes

#### Registers
Fast, small storage within the CPU:

| Register Type | Purpose |
|---------------|---------|
| Program Counter (PC) | Address of next instruction |
| Instruction Register (IR) | Current instruction |
| Memory Address Register (MAR) | Address for memory access |
| Memory Buffer Register (MBR) | Data for memory access |
| General Purpose | Temporary data storage |
| Status/Flags | Condition codes (Z, N, C, V) |

## Instruction Pipelining

### Concept

Pipelining overlaps the execution of multiple instructions by breaking the instruction cycle into stages, similar to an assembly line.

### Benefits

- **Increased Throughput**: More instructions completed per unit time
- **Better Hardware Utilization**: Different parts of CPU active simultaneously
- **Performance Improvement**: Theoretical speedup equal to number of stages

### Basic Pipeline Stages

| Stage | Operation |
|-------|-----------|
| IF | Instruction Fetch |
| ID | Instruction Decode |
| EX | Execute |
| MEM | Memory Access |
| WB | Write Back |

### Pipeline Timing

Without pipelining (3-stage, 5 instructions):
```
I1: IF-ID-EX
I2: --------IF-ID-EX
I3: --------------IF-ID-EX
I4: --------------------IF-ID-EX
I5: --------------------------IF-ID-EX
Total: 15 cycles
```

With pipelining:
```
     Cycle: 1   2   3   4   5   6   7
I1:       IF  ID  EX
I2:           IF  ID  EX
I3:               IF  ID  EX
I4:                   IF  ID  EX
I5:                       IF  ID  EX
Total: 7 cycles
```

## Pipeline Hazards

Hazards are situations that prevent the next instruction from executing in its designated clock cycle.

### 1. Structural Hazards

**Cause**: Hardware cannot support the combination of instructions in the pipeline.

**Example**: Instruction fetch and data memory access in same cycle.

**Solution**: Separate instruction and data caches (Harvard architecture).

### 2. Data Hazards

**Cause**: An instruction depends on the result of a previous instruction that hasn't completed.

**Types**:
- **RAW (Read After Write)**: Most common, true dependency
- **WAR (Write After Read)**: Antidependency
- **WAW (Write After Write)**: Output dependency

**Example**:
```
ADD R1, R2, R3    ; R1 ← R2 + R3
SUB R4, R1, R5    ; R4 ← R1 - R5 (needs R1 from ADD)
```

**Solutions**:
- **Stalling (Bubbles)**: Pause pipeline until data ready
- **Forwarding (Bypassing)**: Route data directly between stages

### 3. Control Hazards

**Cause**: The pipeline doesn't know the next instruction address due to branch instructions.

**Example**:
```
BEQ label    ; Branch if equal
ADD R1, R2   ; May or may not execute
...
label: SUB R3, R4
```

**Solutions**:
- **Stall**: Wait until branch decision is made
- **Branch Prediction**: Guess branch outcome
- **Delayed Branch**: Execute useful instruction during stall
- **Branch Target Buffer**: Cache branch targets

## Pipeline Performance

### Speedup

$$\text{Speedup} = \frac{\text{Time without pipeline}}{\text{Time with pipeline}}$$

Ideal speedup ≈ number of pipeline stages

### Efficiency

$$\text{Efficiency} = \frac{\text{Actual speedup}}{\text{Ideal speedup}}$$

Reduced by hazards and pipeline bubbles.

### Pipeline Depth Trade-offs

**Deeper Pipelines**:
- Higher potential clock frequency
- More stages = more hazards
- More complex forwarding logic

**Shallower Pipelines**:
- Simpler design
- Fewer hazards
- Lower clock frequency

## Superscalar Processors

Superscalar processors can execute multiple instructions simultaneously:

### Features
- Multiple execution units
- Instruction-level parallelism
- Out-of-order execution
- Dynamic scheduling

### Benefits
- Higher throughput
- Better performance on sequential code
- More efficient use of pipeline

## Summary

Processor organization and pipelining are key to performance:

1. **Registers**: Fast storage for instructions and data
2. **Pipelining**: Overlaps instruction execution
3. **Hazards**: Limit pipeline efficiency
4. **Solutions**: Forwarding, prediction, stalling
5. **Superscalar**: Multiple instructions per cycle

Understanding these concepts is essential for both hardware design and software optimization.
