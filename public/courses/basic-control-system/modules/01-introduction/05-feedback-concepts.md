---
title: Feedback Control Concepts
readingTime: 18
difficulty: beginner
objectives:
  - Understand the fundamental concepts of feedback control
  - Identify the main components in a feedback control system
  - Explain the role of each component in the control loop
  - Recognize disturbances and their effects on control systems
keyPoints:
  - Feedback control compares output with reference to reduce error
  - Main components are plant, controller, sensor, and actuator
  - Disturbances can be internal or external to the system
  - Negative feedback reduces error; positive feedback amplifies it
---

# Feedback Control Concepts

## Introduction

Feedback is the cornerstone of modern control engineering. The concept of feedback - using information about the output to influence the input - enables systems to achieve objectives that would be impossible with open-loop control alone. In this lesson, we explore the fundamental concepts of feedback control in detail.

## The Concept of Feedback

### Definition

**Feedback** is the process of measuring the output of a system and using that measurement to influence the input, thereby affecting the system's behavior. When the measured output is used to reduce the difference between the output and the desired reference, we call this **negative feedback**.

### Why Feedback is Powerful

Feedback provides several powerful capabilities:

1. **Error Correction**: Automatically reduces the difference between desired and actual output
2. **Disturbance Rejection**: Compensates for unwanted external influences
3. **Sensitivity Reduction**: Makes system performance less dependent on component characteristics
4. **Stabilization**: Can make unstable systems stable
5. **Optimization**: Can be designed to optimize performance criteria

## Components of a Feedback Control System

### Complete Block Diagram

A general feedback control system contains the following components:

```
                    Disturbance
                         |
                         v
+----------+     +-----------+     +--------+     +----------+
|Reference |     |           |     |        |     |          |
| Input    |--+->[Controller]|---->|Actuator|--->|[ Plant   |---+
+----------+  |  |           |     |        |     |          |   |
              |  +-----------+     +--------+     +----------+   |
              |                                                   |
              |            +----------+                          |
              |            |          |                          |
              +----------->[  Sum    ]<-------------------------+
                           | Junction |     +--------+
                           +----------+     |        |
                                            | Sensor |
                              ^             |        |
                              |             +--------+
                              |
                          Feedback Signal
```

### 1. Plant (Process)

The **plant** (also called the **process**) is the physical system to be controlled. It is the object or process that performs a particular function. Examples include:

- Engine (in speed control)
- Room air (in temperature control)
- Robot arm (in position control)
- Chemical reactor (in process control)

**Characteristics:**
- Has inputs (manipulated variables) and outputs (controlled variables)
- Behavior described by physical laws (differential equations)
- May have internal dynamics and delays
- Subject to disturbances

### 2. Controller

The **controller** is the "brain" of the control system. It processes the error signal and determines the appropriate control action.

**Functions:**
- Receives error signal (reference minus feedback)
- Computes control action based on control law
- Sends command to actuator

**Types of Control Laws:**
- **On-Off (Bang-Bang)**: Simple switching control
- **Proportional (P)**: Control proportional to error
- **Proportional-Integral (PI)**: Adds integral action
- **Proportional-Derivative (PD)**: Adds derivative action
- **Proportional-Integral-Derivative (PID)**: Combined action
- **State Feedback**: Uses all state variables
- **Optimal Control**: Minimizes cost function

### 3. Actuator

The **actuator** is the component that converts the control signal into action on the plant. It provides the physical means to affect the system.

**Types of Actuators:**
- **Electric motors**: Convert electrical signal to rotation
- **Hydraulic cylinders**: Convert fluid pressure to linear motion
- **Pneumatic actuators**: Use compressed air for motion
- **Heaters**: Convert electrical energy to heat
- **Valves**: Control flow of fluids
- **Solenoids**: Electromechanical devices

**Characteristics:**
- Power amplification (low power control signal → high power action)
- Response time and bandwidth limitations
- Saturation limits (maximum force, speed, etc.)
- May introduce nonlinearities

### 4. Sensor (Measuring Element)

The **sensor** measures the controlled variable and provides feedback. The accuracy of the entire control system is limited by sensor accuracy.

**Requirements for Good Sensors:**
- **Accuracy**: Measurement close to true value
- **Precision**: Repeatability of measurements
- **Resolution**: Smallest detectable change
- **Response time**: Speed of measurement
- **Reliability**: Consistent operation over time
- **Range**: Span of measurable values

**Types of Sensors:**
- **Temperature**: Thermocouples, RTDs, thermistors
- **Position**: Encoders, potentiometers, LVDTs
- **Speed**: Tachometers, optical encoders
- **Pressure**: Strain gauges, piezoelectric sensors
- **Flow**: Orifice plates, venturi tubes, magnetic flowmeters
- **Force/Load**: Load cells, strain gauges

### 5. Summing Junction (Comparator)

The **summing junction** (or **comparator**) performs the comparison between the reference input and the feedback signal.

**Function:**
$$e(t) = r(t) - b(t)$$

Where:
- $e(t)$ = error signal
- $r(t)$ = reference input
- $b(t)$ = feedback signal

**In block diagrams:**
- + signs indicate signals are added
- - signs indicate signals are subtracted

## Understanding Disturbances

### Definition

A **disturbance** is a signal that tends to adversely affect the value of the output of a system. Disturbances are unwanted inputs that cause the output to deviate from the desired value.

### Types of Disturbances

#### External Disturbances
Disturbances generated outside the system:
- **Environmental**: Wind gusts, temperature changes, waves
- **Load changes**: Changes in the load being driven
- **Supply variations**: Changes in power supply, fuel quality
- **Human interaction**: Operator actions, interference

#### Internal Disturbances
Disturbances generated within the system:
- **Parameter variations**: Component aging, temperature drift
- **Friction changes**: Wear, lubrication changes
- **Nonlinearities**: Hysteresis, backlash
- **Noise**: Electrical noise, mechanical vibrations

### Disturbance Rejection

One of the primary purposes of feedback control is to reject disturbances. When a disturbance occurs:

1. The disturbance affects the plant output
2. The sensor detects the change in output
3. The error signal increases
4. The controller responds to reduce the error
5. The actuator applies corrective action
6. The output returns toward the desired value

### Effect of Feedback on Disturbances

**Without feedback:**
$$Y = G \cdot R + G_d \cdot D$$

Output depends on both reference input R and disturbance D.

**With feedback:**
$$Y = \frac{G}{1+GH} \cdot R + \frac{G_d}{1+GH} \cdot D$$

The effect of the disturbance is reduced by factor $(1+GH)$ in the denominator.

## Positive vs Negative Feedback

### Negative Feedback

**Negative feedback** occurs when the feedback signal is subtracted from the reference input. This is the standard configuration for control systems.

**Characteristics:**
- Reduces error
- Stabilizes system (when properly designed)
- Reduces sensitivity to parameter variations
- Rejects disturbances

### Positive Feedback

**Positive feedback** occurs when the feedback signal is added to the reference input. This is generally undesirable for control but has some applications.

**Characteristics:**
- Amplifies error
- Can lead to instability
- Increases system response speed
- Used in oscillators and some amplifiers

**Warning:** Positive feedback generally leads to unstable behavior and is avoided in control systems.

## The Control Loop

### The Continuous Control Cycle

In a feedback control system, the control cycle operates continuously:

```
MEASURE → COMPARE → COMPUTE → ACTUATE → (back to MEASURE)
```

This cycle repeats at a rate determined by:
- **Analog systems**: Continuously
- **Digital systems**: Sampling rate (typically 10-1000 Hz)

### Error Signal

The **error signal** is the driving force of the control system:

$$e(t) = r(t) - b(t)$$

- Positive error: Output is below setpoint; need to increase output
- Negative error: Output is above setpoint; need to decrease output
- Zero error: Output matches setpoint; no corrective action needed

The controller's job is to manipulate the plant such that the error is driven toward zero.

## Transfer Function Perspective

### Closed-Loop Transfer Function

For a system with forward path transfer function $G(s)$ and feedback transfer function $H(s)$:

$$\frac{C(s)}{R(s)} = \frac{G(s)}{1 + G(s)H(s)}$$

This equation shows how feedback modifies the system behavior:
- The denominator $(1 + GH)$ represents the effect of feedback
- The poles of the closed-loop system are the roots of $1 + GH = 0$

### Characteristic Equation

The **characteristic equation** determines system stability:

$$1 + G(s)H(s) = 0$$

The roots of this equation are the **closed-loop poles**, which determine:
- System stability
- Response speed and damping
- Natural frequencies of oscillation

## Summary

Feedback control is a powerful concept that enables precise control of dynamic systems. The main components - plant, controller, actuator, and sensor - work together in a closed loop to reduce error and reject disturbances. Negative feedback provides the self-correcting behavior essential for accurate control.

Understanding these fundamental concepts provides the foundation for the mathematical analysis and design methods we will develop throughout this course. In subsequent modules, we will learn how to model these components mathematically and design controllers that achieve desired performance.
