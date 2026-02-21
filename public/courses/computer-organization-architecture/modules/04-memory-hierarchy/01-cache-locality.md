---
title: Cache Memory and Locality
readingTime: 30
difficulty: intermediate
objectives:
  - Explain temporal and spatial locality
  - Describe cache organization principles
  - Understand cache mapping techniques
  - Compare replacement algorithms
keyPoints:
  - Locality enables memory hierarchies to work
  - Cache bridges the CPU-memory speed gap
  - Mapping determines where blocks can be placed
---

# Cache Memory and Locality

## The Memory Hierarchy Problem

There is a fundamental gap between processor speed and memory speed:
- Processors can execute billions of operations per second
- Main memory access takes many processor cycles
- This gap creates a performance bottleneck

The solution is a **memory hierarchy**: multiple levels of memory with different speed/cost/size tradeoffs.

## Principle of Locality

The memory hierarchy works because programs exhibit **locality of reference**:

### Temporal Locality

**Definition**: Recently accessed items are likely to be accessed again soon.

**Examples**:
- Loop counters and index variables
- Frequently called functions
- Stack operations

### Spatial Locality

**Definition**: Items whose addresses are near one another tend to be referenced close together in time.

**Examples**:
- Sequential array access
- Sequential instruction execution
- Structure/record field access

## Memory Hierarchy Levels

| Level | Speed | Size | Cost/Bit | Example |
|-------|-------|------|----------|---------|
| Registers | Fastest | Smallest | Highest | CPU registers |
| L1 Cache | Very Fast | Small | High | 32-64 KB |
| L2 Cache | Fast | Medium | Medium | 256 KB - 1 MB |
| L3 Cache | Moderate | Larger | Lower | 4-64 MB |
| Main Memory | Slower | Large | Low | 4-128 GB |
| Secondary Storage | Slowest | Largest | Lowest | SSD/HDD |

## Cache Memory Fundamentals

### Basic Cache Operation

1. CPU requests data at address X
2. Cache checks if block containing X is present
3. **Cache Hit**: Data is in cache → return data quickly
4. **Cache Miss**: Data not in cache → fetch from lower level

### Hit Ratio

$$\text{Hit Ratio} = \frac{\text{Number of Hits}}{\text{Total Accesses}}$$

$$\text{Miss Ratio} = 1 - \text{Hit Ratio}$$

### Average Access Time

$$t_{avg} = h \times t_c + (1-h) \times t_m$$

Where:
- $h$ = hit ratio
- $t_c$ = cache access time
- $t_m$ = main memory access time

## Cache Mapping Techniques

### 1. Direct Mapping

Each block maps to exactly one cache line.

$$\text{Line number} = \text{Block number} \mod \text{Number of lines}$$

**Advantages**: Simple, fast, inexpensive
**Disadvantages**: Fixed location can cause conflicts

### 2. Fully Associative Mapping

A block can be placed in any cache line.

**Advantages**: Flexible, minimizes conflict misses
**Disadvantages**: Complex hardware, expensive comparison

### 3. Set Associative Mapping

A compromise: blocks map to a set of lines.

$$\text{Set number} = \text{Block number} \mod \text{Number of sets}$$

- 2-way set associative: 2 lines per set
- 4-way set associative: 4 lines per set
- 8-way set associative: 8 lines per set

**Advantages**: Balance between flexibility and complexity
**Disadvantages**: More complex than direct mapping

## Replacement Algorithms

When a cache miss occurs and the cache is full, a block must be replaced:

### Random Replacement
- Randomly select a block to replace
- Simple to implement
- Performance varies unpredictably

### FIFO (First-In-First-Out)
- Replace the oldest block
- Simple to implement
- May not match usage patterns

### LRU (Least Recently Used)
- Replace the block unused for the longest time
- Best matches locality principle
- More complex to implement

### LFU (Least Frequently Used)
- Replace the block used least often
- Good for long-term patterns
- May not handle recent changes well

## Write Policies

### Write-Through
- All writes go to both cache and main memory
- Simple, maintains consistency
- Higher memory traffic

### Write-Back
- Writes only go to cache initially
- Modified blocks written to memory on replacement
- Lower memory traffic
- Requires dirty bit to track modifications

## Summary

The memory hierarchy is fundamental to computer performance:

1. **Locality** makes memory hierarchies effective
2. **Cache** bridges the CPU-memory speed gap
3. **Mapping** determines placement flexibility
4. **Replacement** policies affect hit ratios
5. **Write policies** balance consistency and performance

Understanding these concepts is essential for system optimization and hardware design.
