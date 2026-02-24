---
title: Open-loop vs Closed-loop Control Systems
readingTime: 20
difficulty: beginner
objectives:
  - Define open-loop and closed-loop control systems
  - Compare the characteristics of each type
  - Analyze advantages and disadvantages of each approach
  - Determine when to use open-loop vs closed-loop control
keyPoints:
  - Open-loop systems have no feedback; closed-loop systems use feedback
  - Closed-loop systems reject disturbances but can become unstable
  - Open-loop systems are simpler but cannot correct for errors
  - Choice depends on accuracy requirements, cost, and stability considerations
---

# Open-loop vs Closed-loop Control Systems

## Introduction

One of the most fundamental distinctions in control engineering is between **open-loop** and **closed-loop** control systems. This distinction determines how the system responds to disturbances and errors, and has profound implications for system design, cost, and performance.

## Open-Loop Control Systems

### Definition

An **open-loop control system** is one in which the output has no effect on the control action. In other words, the output is neither measured nor fed back for comparison with the input. The controller operates without knowledge of the actual system output.

### Block Diagram

```
                 +--------+     +--------+
Reference -----> |Controller|---->| Plant  |-----> Output
 Input           +--------+     +--------+
```

Note that there is no path from the output back to the input - the loop is "open."

### Characteristics

1. **No feedback**: Controller has no information about actual output
2. **Fixed relationship**: Each input corresponds to a fixed operating condition
3. **Accuracy depends on calibration**: System must be precisely calibrated
4. **Cannot reject disturbances**: Any disturbance affects output directly

### Examples

#### Washing Machine
A washing machine operates on a time basis:
- Soak cycle runs for predetermined time
- Wash cycle runs for predetermined time
- Rinse cycles run for predetermined times
- Spin cycle runs for predetermined time

The machine does not measure the cleanliness of the clothes. If the clothes are heavily soiled, they may not be clean at the end. If they are lightly soiled, time and energy may be wasted.

#### Traffic Light Controller
A traffic light operating on a fixed timer:
- Green light for fixed duration
- Yellow light for fixed duration
- Red light for fixed duration

The controller does not sense actual traffic conditions. If traffic is light, the system is inefficient. If traffic is heavy, congestion occurs.

#### Toasters
A toaster operates on a time or heat basis:
- Timer determines toasting duration
- Heating elements apply heat
- No measurement of actual toast color/temperature

The user must adjust settings based on experience. Results vary with bread type, thickness, and initial temperature.

### Advantages of Open-Loop Systems

| Advantage | Explanation |
|-----------|-------------|
| **Simplicity** | No sensors, no feedback path, simpler design |
| **Lower cost** | Fewer components mean lower manufacturing cost |
| **No stability problem** | Cannot become unstable (no feedback loop) |
| **Convenient for certain applications** | Ideal when output is hard to measure |

### Disadvantages of Open-Loop Systems

| Disadvantage | Explanation |
|--------------|-------------|
| **Cannot reject disturbances** | Any disturbance directly affects output |
| **Accuracy depends on calibration** | Must be recalibrated as components drift |
| **No compensation for component variations** | Each unit may behave differently |
| **No correction for errors** | Once started, cannot correct course |

## Closed-Loop (Feedback) Control Systems

### Definition

A **closed-loop control system** (also called a feedback control system) is one in which the output is measured and compared with the reference input. The difference (error) is used to drive the system toward the desired output.

### Block Diagram

```
               +--------+     +--------+     +--------+
Reference +-->[  Sum   ]-->|Controller|---->| Plant  |-----> Output
Input     |     -      |   +--------+     +--------+     |
          |            |                                 |
          |            v                                 |
          |         +------+                             |
          |         |Error |                             |
          |         +------+                             |
          |                                              |
          +----------------------------------------------+
                              Sensor (Feedback)
```

The key element is the feedback path that allows the controller to compare actual output with desired output.

### Key Components

1. **Reference input**: Desired value of the output
2. **Summing junction**: Compares reference with feedback, produces error signal
3. **Controller**: Processes error signal to produce control action
4. **Plant (Process)**: System being controlled
5. **Sensor**: Measures output for feedback
6. **Feedback path**: Returns measured output to input

### How Feedback Works

The principle of feedback control:

1. **Measure** the output using sensors
2. **Compare** the measured output with the reference input
3. **Compute** the error (error = reference - feedback)
4. **Actuate** based on the error to reduce it
5. **Repeat** continuously

This cycle repeats continuously, driving the error toward zero.

### Examples

#### Speed Control System (Watt's Governor)

**Components:**
- Reference: Desired engine speed (set by governor position)
- Sensor: Flyball mechanism measures actual speed
- Controller: Linkage mechanism
- Actuator: Steam valve
- Plant: Steam engine

**Operation:**
- If speed exceeds setpoint → balls rise → valve closes → speed decreases
- If speed drops below setpoint → balls fall → valve opens → speed increases
- System automatically compensates for load changes

#### Room Temperature Control

**Components:**
- Reference: Desired temperature (thermostat setting)
- Sensor: Thermometer in thermostat
- Controller: Bimetallic strip or electronic circuit
- Actuator: Furnace/air conditioner
- Plant: Room air

**Operation:**
- Temperature drops below setpoint → furnace turns on
- Temperature rises above setpoint → furnace turns off
- System maintains temperature despite external heat/cooling loads

#### Automobile Cruise Control

**Components:**
- Reference: Desired speed (driver setting)
- Sensor: Speedometer (vehicle speed sensor)
- Controller: Electronic control unit
- Actuator: Throttle actuator
- Plant: Vehicle drivetrain

**Operation:**
- Speed drops (going uphill) → throttle opens → speed increases
- Speed rises (going downhill) → throttle closes → speed decreases
- System maintains speed despite road grade variations

### Advantages of Closed-Loop Systems

| Advantage | Explanation |
|-----------|-------------|
| **Disturbance rejection** | Automatically compensates for disturbances |
| **Reduced sensitivity** | Less affected by parameter variations |
| **Accurate control** | Maintains output close to reference |
| **Self-correcting** | Continuously adjusts to reduce error |
| **Works with imperfect models** | Doesn't require exact system knowledge |

### Disadvantages of Closed-Loop Systems

| Disadvantage | Explanation |
|--------------|-------------|
| **Complexity** | Requires sensors, feedback path, more components |
| **Higher cost** | Additional components increase cost |
| **Stability concerns** | Can become unstable if improperly designed |
| **Feedback sensor required** | Output must be measurable |
| **Time delay issues** | Feedback delay can cause oscillations |

## Comparison Summary

| Characteristic | Open-Loop | Closed-Loop |
|---------------|-----------|-------------|
| Feedback | None | Present |
| Accuracy | Limited by calibration | High (self-correcting) |
| Disturbance rejection | None | Excellent |
| Stability | Always stable | Can be unstable |
| Cost | Lower | Higher |
| Complexity | Simple | Complex |
| Sensitivity to parameters | High | Low |
| Maintenance | Recalibration needed | Self-adjusting |

## When to Use Each Type

### Use Open-Loop When:
- The relationship between input and output is well-known
- There are no significant disturbances
- Output is difficult or expensive to measure
- High accuracy is not required
- Cost constraints are significant
- Stability must be guaranteed

### Use Closed-Loop When:
- Disturbances are present and significant
- High accuracy is required
- Output can be measured economically
- System parameters may vary
- Self-correction is needed
- The cost of sensors is justified

## Combined Approach

Many practical systems use a combination of open-loop and closed-loop control:

### Feedforward + Feedback Control

**Feedforward control** (open-loop) compensates for known or measured disturbances before they affect the output. **Feedback control** (closed-loop) handles unmeasured disturbances and model uncertainties.

```
                      +--------+
Measured Disturbance->|Feed-   |--+
                      |forward |  |
                      +--------+  v
               +--------+     +--------+     +--------+
Reference +-->[  Sum   ]-->|Feedback|---->| Plant  |-----> Output
Input     |     -      |   |Controller    +--------+     |
          |            |   +--------+                    |
          |            |                                 |
          |            v                                 |
          |         +------+                             |
          |         |Error |                             |
          |         +------+                             |
          |                                              |
          +----------------------------------------------+
                              Sensor (Feedback)
```

**Example: HVAC System with Outdoor Temperature Feedforward**
- Feedforward: Adjust heating/cooling based on outdoor temperature
- Feedback: Maintain indoor temperature at setpoint
- Combined approach provides faster response and better efficiency

## Summary

The choice between open-loop and closed-loop control is fundamental to control system design. Open-loop systems are simple and inexpensive but cannot correct for errors or reject disturbances. Closed-loop systems use feedback to achieve accuracy and disturbance rejection but require sensors and careful design to ensure stability.

In practice, most sophisticated control systems use closed-loop control, often enhanced with feedforward elements. The additional cost and complexity are usually justified by the improved performance and robustness that feedback provides.
