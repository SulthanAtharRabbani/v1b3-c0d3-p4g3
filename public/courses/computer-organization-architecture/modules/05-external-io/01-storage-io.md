---
title: Storage and I/O Mechanisms
readingTime: 25
difficulty: intermediate
objectives:
  - Describe magnetic disk organization
  - Compare RAID levels
  - Explain different I/O techniques
keyPoints:
  - Disk access time = seek + rotational + transfer
  - RAID provides redundancy and/or performance
  - DMA reduces CPU involvement in I/O
---

# Storage and I/O Mechanisms

## Magnetic Disk Organization

### Physical Structure

A magnetic disk consists of:
- **Platters**: Circular disks coated with magnetic material
- **Tracks**: Concentric circles on each platter surface
- **Sectors**: Subdivisions of tracks (typically 512 or 4096 bytes)
- **Cylinders**: Set of tracks at the same position on all platters
- **Read/Write Heads**: One per surface, mounted on an actuator arm

### Performance Parameters

#### Seek Time
Time to position the read/write head over the correct track.
- Average: 3-15 ms for modern drives
- Depends on how far the head must move

#### Rotational Latency
Time for the correct sector to rotate under the head.
- Average: Half a rotation
- 7200 RPM: ~4.17 ms average latency
- 15000 RPM: ~2 ms average latency

#### Transfer Time
Time to actually read/write the data.
- Depends on rotation speed and data density

#### Total Access Time

$$t_{access} = t_{seek} + t_{rotational} + t_{transfer}$$

## Solid-State Drives (SSD)

### Advantages over HDD
- No moving parts (more reliable)
- Faster access times (no seek or rotational delay)
- Lower power consumption
- Quiet operation

### Key Characteristics
- Based on NAND flash memory
- Read faster than write
- Limited write cycles (wear leveling required)
- Higher cost per GB than HDD

## RAID (Redundant Array of Independent Disks)

RAID combines multiple disks for improved performance, reliability, or both.

### RAID Levels

| Level | Description | Benefits | Drawbacks |
|-------|-------------|----------|-----------|
| RAID 0 | Striping | Performance | No redundancy |
| RAID 1 | Mirroring | Full redundancy | 50% storage efficiency |
| RAID 5 | Distributed parity | Balance of performance/redundancy | 1 disk overhead |
| RAID 6 | Dual parity | Higher fault tolerance | 2 disk overhead |
| RAID 10 | Striped mirrors | Performance + redundancy | 50% storage efficiency |

### RAID 0 - Striping
- Data split across all disks
- Excellent performance
- No redundancy - one disk failure loses all data

### RAID 1 - Mirroring
- All data duplicated on two disks
- Excellent read performance
- High cost (50% efficiency)

### RAID 5 - Distributed Parity
- Parity distributed across all disks
- Good read performance
- Can survive single disk failure

### RAID 10 - Striped Mirrors
- Combines RAID 0 and RAID 1
- Excellent performance and redundancy
- Higher cost but very reliable

## I/O Techniques

### 1. Programmed I/O

The CPU directly controls all I/O operations:
1. CPU checks device status
2. If ready, CPU transfers data
3. CPU waits for operation to complete

**Characteristics**:
- Simple to implement
- CPU busy-waits during I/O
- Inefficient for slow devices

### 2. Interrupt-Driven I/O

The device signals the CPU when ready:
1. CPU issues I/O command and continues other work
2. Device signals interrupt when ready
3. CPU handles data transfer

**Characteristics**:
- More efficient than programmed I/O
- CPU free during I/O wait
- Still requires CPU for data transfer

### 3. Direct Memory Access (DMA)

The DMA controller transfers data directly between device and memory:
1. CPU sets up DMA transfer (source, destination, count)
2. DMA controller performs transfer
3. DMA signals CPU when complete

**Characteristics**:
- Most efficient for large transfers
- CPU only involved at start and end
- Used for disk I/O, network I/O

### DMA Transfer Process

```
┌─────────┐     1. Initialize DMA       ┌─────────┐
│   CPU   │ ─────────────────────────►  │   DMA   │
└─────────┘                             │Controller│
                                          └────┬────┘
                                               │ 2. Transfer data
                                               ▼
┌─────────┐                             ┌──────────┐
│ Memory  │ ◄────────────────────────── │  Device  │
└─────────┘       3. Interrupt CPU      └──────────┘
```

## I/O Channels and Processors

For high-performance systems, dedicated I/O processors (channels) manage I/O operations:

### Functions
- Execute I/O programs (channel programs)
- Manage multiple I/O devices
- Handle device selection and data transfer
- Report status to CPU

### Types
- **Selector Channel**: High-speed devices (one at a time)
- **Multiplexor Channel**: Low-speed devices (interleaved)
- **Block Multiplexor Channel**: Combines both approaches

## Summary

External memory and I/O systems complete the computer architecture:

1. **Magnetic Disks**: Traditional bulk storage with mechanical latency
2. **SSDs**: Faster, more reliable, but higher cost
3. **RAID**: Combines disks for performance and/or redundancy
4. **I/O Techniques**: From simple programmed I/O to efficient DMA
5. **I/O Processors**: Offload I/O management from CPU

These systems bridge the gap between fast processors and slower external devices.
