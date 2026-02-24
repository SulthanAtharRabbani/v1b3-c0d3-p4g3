---
title: State-Space Representation
readingTime: 20
difficulty: intermediate
objectives:
  - Understand state-space representation of dynamic systems
  - Define state variables and state equations
  - Convert between transfer function and state-space forms
  - Recognize the matrices A, B, C, D and their roles
keyPoints:
  - State-space uses first-order differential equations
  - The state vector contains all information about system state
  - State equations: ẋ = Ax + Bu; Output: y = Cx + Du
  - State-space can handle MIMO systems naturally
---

# State-Space Representation

## Introduction

While transfer functions are powerful for single-input, single-output (SISO) systems, **state-space representation** provides a unified framework for analyzing multi-input, multi-output (MIMO) systems, time-varying systems, and nonlinear systems. This representation forms the foundation of **modern control theory**.

## Concept of State

### Definition

The **state** of a dynamic system is the smallest set of variables (called **state variables**) such that knowledge of these variables at $t = t_0$, together with knowledge of the input for $t \geq t_0$, completely determines the behavior of the system for $t \geq t_0$.

### State Variables

**State variables** are the minimum set of variables needed to completely describe the system's internal state. For an nth-order system, we need n state variables.

**Example: Mass-Spring-Damper**

The second-order equation:
$$m\ddot{x} + b\dot{x} + kx = F(t)$$

Can be represented using two state variables:
- $x_1 = x$ (position)
- $x_2 = \dot{x}$ (velocity)

### State Vector

The **state vector** $\mathbf{x}$ is a column vector containing all state variables:

$$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}$$

## State-Space Equations

### Standard Form

For a linear time-invariant system:

$$\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$$

$$\mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$$

Where:
- $\mathbf{x}$ = n×1 state vector
- $\mathbf{u}$ = m×1 input vector
- $\mathbf{y}$ = p×1 output vector
- $\mathbf{A}$ = n×n system (state) matrix
- $\mathbf{B}$ = n×m input matrix
- $\mathbf{C}$ = p×n output matrix
- $\mathbf{D}$ = p×m feedforward (direct transmission) matrix

### Meaning of Each Term

| Term | Description |
|------|-------------|
| $\mathbf{Ax}$ | How states influence each other (internal dynamics) |
| $\mathbf{Bu}$ | How inputs affect the states |
| $\mathbf{Cx}$ | How states contribute to output |
| $\mathbf{Du}$ | Direct transmission from input to output |

## Deriving State-Space Models

### From Differential Equations

**Example: Second-Order System**

Given:
$$\ddot{y} + 3\dot{y} + 2y = u$$

**Step 1**: Choose state variables:
$$x_1 = y$$
$$x_2 = \dot{y}$$

**Step 2**: Express derivatives in terms of state variables:
$$\dot{x}_1 = x_2$$
$$\dot{x}_2 = \ddot{y} = -3\dot{y} - 2y + u = -3x_2 - 2x_1 + u$$

**Step 3**: Write in matrix form:

$$\begin{bmatrix} \dot{x}_1 \\ \dot{x}_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} u$$

$$y = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + [0]u$$

Therefore:
$$\mathbf{A} = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix}, \quad \mathbf{B} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$
$$\mathbf{C} = \begin{bmatrix} 1 & 0 \end{bmatrix}, \quad \mathbf{D} = 0$$

### General nth-Order System

For the differential equation:
$$y^{(n)} + a_1 y^{(n-1)} + \cdots + a_n y = b_0 u^{(n)} + \cdots + b_n u$$

**Phase variable form (controllable canonical form):**

$$\mathbf{A} = \begin{bmatrix} 0 & 1 & 0 & \cdots & 0 \\ 0 & 0 & 1 & \cdots & 0 \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & 0 & \cdots & 1 \\ -a_n & -a_{n-1} & -a_{n-2} & \cdots & -a_1 \end{bmatrix}$$

$$\mathbf{B} = \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 0 \\ 1 \end{bmatrix}$$

$$\mathbf{C} = \begin{bmatrix} b_n - a_n b_0 & b_{n-1} - a_{n-1}b_0 & \cdots & b_1 - a_1 b_0 \end{bmatrix}$$

$$\mathbf{D} = b_0$$

## Transfer Function from State-Space

### Derivation

Taking Laplace transform of state equations (zero initial conditions):

$$s\mathbf{X}(s) = \mathbf{A}\mathbf{X}(s) + \mathbf{B}\mathbf{U}(s)$$

$$(s\mathbf{I} - \mathbf{A})\mathbf{X}(s) = \mathbf{B}\mathbf{U}(s)$$

$$\mathbf{X}(s) = (s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B}\mathbf{U}(s)$$

Substituting into output equation:

$$\mathbf{Y}(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B}\mathbf{U}(s) + \mathbf{D}\mathbf{U}(s)$$

### Transfer Function Matrix

$$\mathbf{G}(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} + \mathbf{D}$$

For SISO systems, this gives a scalar transfer function.

### Example

Given:
$$\mathbf{A} = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix}, \quad \mathbf{B} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \quad \mathbf{C} = \begin{bmatrix} 1 & 0 \end{bmatrix}, \quad \mathbf{D} = 0$$

**Step 1**: Find $(s\mathbf{I} - \mathbf{A})$:

$$s\mathbf{I} - \mathbf{A} = \begin{bmatrix} s & -1 \\ 2 & s+3 \end{bmatrix}$$

**Step 2**: Find inverse:

$$(s\mathbf{I} - \mathbf{A})^{-1} = \frac{1}{s(s+3)+2} \begin{bmatrix} s+3 & 1 \\ -2 & s \end{bmatrix} = \frac{1}{s^2+3s+2} \begin{bmatrix} s+3 & 1 \\ -2 & s \end{bmatrix}$$

**Step 3**: Calculate transfer function:

$$G(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} = \begin{bmatrix} 1 & 0 \end{bmatrix} \frac{1}{s^2+3s+2} \begin{bmatrix} s+3 & 1 \\ -2 & s \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

$$= \frac{1}{s^2+3s+2} \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 1 \\ s \end{bmatrix} = \frac{1}{s^2+3s+2}$$

## Canonical Forms

### Controllable Canonical Form (CCF)

Also called phase variable form. Useful for pole placement design.

$$\mathbf{A} = \begin{bmatrix} 0 & 1 & 0 & \cdots \\ 0 & 0 & 1 & \cdots \\ \vdots & & & \\ -a_n & -a_{n-1} & \cdots & -a_1 \end{bmatrix}, \quad \mathbf{B} = \begin{bmatrix} 0 \\ \vdots \\ 0 \\ 1 \end{bmatrix}$$

### Observable Canonical Form (OCF)

Useful for observer design.

$$\mathbf{A} = \begin{bmatrix} 0 & 0 & \cdots & -a_n \\ 1 & 0 & \cdots & -a_{n-1} \\ 0 & 1 & \cdots & \vdots \\ \vdots & & & -a_1 \end{bmatrix}, \quad \mathbf{C} = \begin{bmatrix} 0 & \cdots & 0 & 1 \end{bmatrix}$$

### Diagonal (Modal) Form

When A is diagonal, the system is decoupled:

$$\mathbf{A} = \begin{bmatrix} \lambda_1 & 0 & \cdots \\ 0 & \lambda_2 & \cdots \\ \vdots & & \ddots \end{bmatrix}$$

Each state evolves independently with eigenvalue $\lambda_i$.

## Controllability and Observability

### Controllability

A system is **controllable** if it's possible to transfer the system from any initial state to any desired final state in finite time.

**Controllability test:**

The system is controllable if and only if the controllability matrix has full rank:

$$\mathcal{C} = \begin{bmatrix} \mathbf{B} & \mathbf{AB} & \mathbf{A}^2\mathbf{B} & \cdots & \mathbf{A}^{n-1}\mathbf{B} \end{bmatrix}$$

$\text{rank}(\mathcal{C}) = n$ for controllability.

### Observability

A system is **observable** if the initial state can be determined from the output measurements over time.

**Observability test:**

The system is observable if and only if the observability matrix has full rank:

$$\mathcal{O} = \begin{bmatrix} \mathbf{C} \\ \mathbf{CA} \\ \mathbf{CA}^2 \\ \vdots \\ \mathbf{CA}^{n-1} \end{bmatrix}$$

$\text{rank}(\mathcal{O}) = n$ for observability.

## Advantages of State-Space

1. **MIMO systems**: Natural extension to multiple inputs and outputs
2. **Computer implementation**: Matrix equations are easily programmed
3. **Time-varying systems**: Can handle time-varying A, B, C, D
4. **Nonlinear systems**: Can be extended to nonlinear systems
5. **Optimal control**: Foundation for optimal control theory
6. **Digital control**: Easy discretization for digital implementation

## Summary

State-space representation uses first-order differential equations to describe system dynamics. The state vector contains all information about the system's internal condition. The four matrices A, B, C, D completely define the system. State-space methods can handle MIMO systems naturally and form the basis for modern control theory, including controllability, observability, and optimal control.
