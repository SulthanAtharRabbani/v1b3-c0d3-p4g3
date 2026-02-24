---
title: Differential Equations in Control Systems
readingTime: 18
difficulty: intermediate
objectives:
  - Understand the role of differential equations in modeling dynamic systems
  - Derive differential equations from physical laws
  - Classify differential equations by order and linearity
  - Understand initial conditions and their importance
keyPoints:
  - Differential equations describe how systems change over time
  - The order equals the highest derivative present
  - Linear time-invariant (LTI) systems are the focus of classical control
  - Initial conditions affect the complete solution
---

# Differential Equations in Control Systems

## Introduction

Dynamic systems are characterized by quantities that change over time. The mathematical language for describing such changes is **differential equations**. In control engineering, differential equations form the foundation for modeling physical systems and predicting their behavior.

## Why Differential Equations?

### The Nature of Dynamic Systems

Consider a simple example: a mass on a spring. If you displace the mass and release it, it oscillates. The position $x(t)$ changes continuously over time. What determines this motion?

**Newton's Second Law** tells us:

$$m\ddot{x} = \sum F$$

The forces on the mass include:
- Spring force: $F_s = -kx$ (Hooke's law)
- Damping force: $F_d = -b\dot{x}$ (viscous damping)

This gives the equation:

$$m\ddot{x} + b\dot{x} + kx = 0$$

This is a **second-order ordinary differential equation** that completely describes the motion of the mass-spring-damper system.

### The Modeling Process

The general process for deriving differential equations:

1. **Identify variables**: What quantities describe the system state?
2. **Apply physical laws**: Use appropriate laws (Newton, Kirchhoff, etc.)
3. **Write equations**: Express relationships between variables
4. **Simplify**: Make reasonable assumptions to simplify

## Classification of Differential Equations

### By Order

The **order** of a differential equation is the highest derivative that appears.

**First-order:**
$$\tau\frac{dy}{dt} + y = Ku(t)$$

**Second-order:**
$$\frac{d^2y}{dt^2} + 2\zeta\omega_n\frac{dy}{dt} + \omega_n^2 y = \omega_n^2 u(t)$$

**nth-order:**
$$a_0\frac{d^ny}{dt^n} + a_1\frac{d^{n-1}y}{dt^{n-1}} + \cdots + a_n y = b_0\frac{d^mu}{dt^m} + \cdots + b_m u(t)$$

The order of the differential equation equals the number of energy storage elements in the system.

### By Linearity

**Linear Differential Equations:**
- Variables and derivatives appear only to first power
- No products of dependent variable with its derivatives
- Coefficients depend only on independent variable (time)

**Nonlinear Differential Equations:**
- Contain products, powers, or other nonlinear functions

**Example - Linear:**
$$\frac{d^2y}{dt^2} + 3\frac{dy}{dt} + 2y = u(t)$$

**Example - Nonlinear:**
$$\frac{d^2y}{dt^2} + y\frac{dy}{dt} + y^2 = \sin(y)$$

### By Coefficient Type

**Time-invariant (constant coefficients):**
$$a\ddot{y} + b\dot{y} + cy = u(t)$$

Coefficients $a$, $b$, $c$ are constants.

**Time-varying:**
$$a(t)\ddot{y} + b(t)\dot{y} + c(t)y = u(t)$$

Coefficients change with time.

**Focus of this course:** Linear Time-Invariant (LTI) systems

## Deriving Differential Equations from Physical Laws

### Mechanical Systems

Use **Newton's Second Law**:
$$\sum F = ma$$

or in rotational systems:
$$\sum T = J\alpha$$

**Example: Mass-Spring-Damper System**

Variables:
- $x$ = displacement from equilibrium
- $m$ = mass
- $k$ = spring constant
- $b$ = damping coefficient

Free body diagram analysis:
$$m\ddot{x} = -kx - b\dot{x} + F(t)$$

Rearranging:
$$m\ddot{x} + b\dot{x} + kx = F(t)$$

This is a **second-order linear ordinary differential equation** with constant coefficients.

### Electrical Systems

Use **Kirchhoff's Laws**:
- **KVL**: Sum of voltages around a closed loop = 0
- **KCL**: Sum of currents at a node = 0

**Example: RLC Circuit**

For a series RLC circuit with voltage source $v_s(t)$:

$$v_s = v_R + v_L + v_C$$

Using component relationships:
- $v_R = iR$ (Ohm's law)
- $v_L = L\frac{di}{dt}$ (inductor)
- $v_C = \frac{1}{C}\int i \, dt$ (capacitor)

Applying KVL:
$$v_s = iR + L\frac{di}{dt} + \frac{1}{C}\int i \, dt$$

Differentiating with respect to time:
$$L\frac{d^2i}{dt^2} + R\frac{di}{dt} + \frac{1}{C}i = \frac{dv_s}{dt}$$

This is also a **second-order linear ODE**.

## The Standard Form

For analysis purposes, we often write linear differential equations in **standard form**:

$$a_0\frac{d^ny}{dt^n} + a_1\frac{d^{n-1}y}{dt^{n-1}} + \cdots + a_{n-1}\frac{dy}{dt} + a_n y = b_0\frac{d^mu}{dt^m} + \cdots + b_m u$$

Where:
- $y(t)$ = output (response)
- $u(t)$ = input (forcing function)
- $a_i, b_j$ = constant coefficients
- $n$ = order of the system (typically $n \geq m$)

## Solutions of Differential Equations

### Homogeneous and Particular Solutions

The complete solution of a linear differential equation consists of two parts:

$$y(t) = y_h(t) + y_p(t)$$

**Homogeneous Solution ($y_h$):**
- Solution when input = 0
- Also called the **complementary solution** or **natural response**
- Determined by characteristic equation
- Contains arbitrary constants determined by initial conditions

**Particular Solution ($y_p$):**
- Any solution satisfying the complete equation
- Also called the **forced response**
- Depends on the form of the input
- No arbitrary constants

### Characteristic Equation

For the homogeneous equation:
$$a_0\frac{d^ny}{dt^n} + a_1\frac{d^{n-1}y}{dt^{n-1}} + \cdots + a_n y = 0$$

We assume solution form $y = e^{st}$ and substitute:

$$a_0 s^n e^{st} + a_1 s^{n-1} e^{st} + \cdots + a_n e^{st} = 0$$

This gives the **characteristic equation**:

$$a_0 s^n + a_1 s^{n-1} + \cdots + a_n = 0$$

The roots $s_1, s_2, \ldots, s_n$ determine the natural response:

$$y_h(t) = c_1 e^{s_1 t} + c_2 e^{s_2 t} + \cdots + c_n e^{s_n t}$$

### Initial Conditions

**Initial conditions** specify the state of the system at $t = 0$:

For an nth-order system, we need $n$ initial conditions:
- $y(0)$ = initial output
- $\dot{y}(0)$ = initial rate of change
- $\ddot{y}(0)$ = initial acceleration
- etc.

These conditions determine the constants $c_1, c_2, \ldots, c_n$ in the homogeneous solution.

## Example: First-Order System

Consider the first-order equation:
$$\tau\frac{dy}{dt} + y = Ku(t)$$

where $u(t)$ is a unit step input.

**Characteristic equation:**
$$\tau s + 1 = 0$$
$$s = -\frac{1}{\tau}$$

**Homogeneous solution:**
$$y_h(t) = c_1 e^{-t/\tau}$$

**Particular solution (step input):**
$$y_p = K$$

**Complete solution:**
$$y(t) = c_1 e^{-t/\tau} + K$$

**Apply initial condition** $y(0) = 0$:
$$0 = c_1 + K \Rightarrow c_1 = -K$$

**Final solution:**
$$y(t) = K(1 - e^{-t/\tau})$$

This is the classic **first-order step response**.

## Summary

Differential equations are the mathematical foundation for modeling dynamic systems in control engineering. The order of the equation corresponds to the number of energy storage elements, and the coefficients reflect physical parameters. Linear time-invariant (LTI) differential equations are the focus of classical control theory. The complete solution consists of homogeneous (natural) and particular (forced) components, with initial conditions determining the arbitrary constants.
