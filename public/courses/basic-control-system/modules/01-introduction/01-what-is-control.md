---
title: What is Control?
readingTime: 15
difficulty: beginner
objectives:
  - Define control in the context of engineering systems
  - Explain the purpose and goals of control systems
  - Identify the three essential components of control
  - Understand the role of control in modern technology
keyPoints:
  - Control is the process of forcing a system to behave in a desired way
  - Control involves sensing, computing, and actuating
  - Control systems maintain desired results by manipulating variables
  - Control is often called "the hidden technology"
---

# What is Control?

## Introduction

Control is one of the most fundamental and pervasive concepts in engineering, yet it often goes unnoticed in our daily lives. When you drive your car and maintain a constant speed, when your home maintains a comfortable temperature, when an aircraft maintains its course through turbulence - all of these involve control systems at work.

**Control** is the process of forcing a system to behave in a desired way in order to achieve certain objectives or goals. In more technical terms, control is the process of making a system variable adhere to a particular value, called the **reference value** or **setpoint**.

## The Three Essential Components

Every control system, regardless of its complexity, involves three fundamental operations:

### 1. Sensing (Measurement)

The first step in control is to measure or sense the current state of the system. This involves using sensors or measurement devices to determine the actual value of the controlled variable. For example:

- A thermometer measures temperature in a room
- A speedometer measures vehicle velocity
- A gyroscope measures aircraft orientation
- A flow meter measures liquid flow rate

The quality of control is fundamentally limited by the quality of measurement. Accurate, reliable sensors are essential for effective control.

### 2. Computing (Decision Making)

The second step involves comparing the measured value with the desired reference value and determining what action should be taken. This is the "brain" of the control system. The computation may be:

- **Simple**: A thermostat comparing temperature to setpoint
- **Complex**: A flight computer calculating control surface deflections
- **Adaptive**: A system that learns and adjusts its strategy over time

The controller uses an algorithm or control law to transform the error signal into a control signal.

### 3. Actuating (Action)

The third step is to apply the corrective action determined by the controller. Actuators are devices that convert the control signal into physical action:

- Motors that rotate shafts
- Valves that regulate flow
- Heaters that add thermal energy
- Brakes that dissipate kinetic energy

The actuator must have sufficient power and speed to affect the system as required.

## The Control Loop

These three components work together in what is called a **control loop**. The basic structure is:

```
                    +--------+     +--------+     +--------+
Reference  +-->[ + ]-->|Controller|-->|Actuator|-->| Plant  |---+--> Output
           |    -      +--------+     +--------+     +--------+   |
           |                                                      |
           +------------------------------------------------------+
                              Sensor (Feedback)
```

This diagram shows the fundamental architecture of a feedback control system. The output is measured by a sensor, compared with the reference input, and the difference (error) drives the controller to take corrective action.

## Goals of Control Systems

Control systems are designed to achieve several key objectives:

### Stability

The system should maintain its operating point and not diverge or oscillate uncontrollably. A stable system returns to equilibrium after disturbances.

### Performance

The system should respond rapidly to changes in reference input. This includes:
- **Fast response**: Quick approach to the desired state
- **Small overshoot**: Minimal exceeding of the target value
- **Short settling time**: Quick stabilization at the final value

### Robustness

The system should tolerate perturbations in dynamics and maintain performance despite:
- Parameter variations (e.g., component aging, temperature effects)
- External disturbances (e.g., wind gusts, load changes)
- Modeling uncertainties (differences between model and reality)

## Control as "Hidden Technology"

Control engineering is often described as **"the hidden technology that you meet every day."** This is because:

1. **Invisibility**: When control works properly, it goes unnoticed. We only notice when it fails.

2. **Ubiquity**: Control systems are embedded in nearly every modern device:
   - Automobiles: engine control, anti-lock brakes, cruise control
   - Aircraft: autopilot, fly-by-wire systems
   - Manufacturing: process control, robotics
   - Consumer electronics: disk drives, power supplies
   - Infrastructure: power grids, traffic systems

3. **Enabling Role**: Control makes possible many technologies that would otherwise be impractical or unsafe.

## Examples of Controlled vs. Uncontrolled Systems

Consider the difference between a Boeing 777 aircraft and a tornado:

| Characteristic | Boeing 777 | Tornado |
|----------------|------------|---------|
| Dynamics | Highly nonlinear, complex | Highly nonlinear, complex |
| Load capacity | Can transport loads long distances | Can transport objects |
| Control | **Controlled** - predictable, safe | **Uncontrolled** - chaotic, destructive |

Both systems have complex, nonlinear dynamics. The critical difference is that the aircraft is **controlled** - it has systems that sense its state, compute appropriate actions, and actuate control surfaces to achieve desired behavior.

## Control in Natural Systems

Control is not unique to engineered systems. Nature provides remarkable examples of control systems:

### Biological Control Systems

- **Pancreas**: Regulates blood sugar through insulin and glucagon
- **Adrenal glands**: Release adrenaline to increase heart rate and oxygen intake during stress
- **Eyes**: Track moving objects through sophisticated servo mechanisms
- **Hand-eye coordination**: Enables picking up objects and placing them precisely

These natural control systems often inspire and inform the design of engineering control systems.

## Summary

Control is the fundamental process of making systems behave in desired ways. It involves three essential operations: sensing (measuring the current state), computing (determining appropriate action), and actuating (applying the action). Control systems aim to achieve stability, performance, and robustness in achieving their objectives.

Understanding control concepts is essential for designing systems that work reliably in the real world, where disturbances and uncertainties are ever-present. In the following lessons, we will explore the history of control, examine specific examples, and develop the mathematical tools needed to analyze and design control systems.
