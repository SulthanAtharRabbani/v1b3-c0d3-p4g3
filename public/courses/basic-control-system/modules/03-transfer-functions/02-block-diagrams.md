---
title: Block Diagrams
readingTime: 18
difficulty: intermediate
objectives:
  - Understand block diagram representation of systems
  - Apply block diagram algebra for simplification
  - Reduce complex block diagrams to transfer functions
  - Identify common block diagram configurations
keyPoints:
  - Block diagrams show signal flow and system structure
  - Three basic operations: summing, branch, and cascade
  - Feedback loops can be reduced using closed-loop formula
  - Complex diagrams are reduced step by step
---

# Block Diagrams

## Introduction

**Block diagrams** provide a graphical representation of control systems, showing how signals flow between components. Unlike abstract mathematical equations, block diagrams give visual insight into system structure and make it easier to understand the relationships between components.

## Elements of Block Diagrams

### Basic Components

#### 1. Block (Transfer Function)

A block represents a mathematical operation on the input signal:

```
       +--------+
R(s) →| G(s)   |→ Y(s)
       +--------+
```

The output is: $Y(s) = G(s) \cdot R(s)$

#### 2. Summing Junction

A summing junction adds or subtracts signals:

```
        A(s) →+
              ⊕ → C(s) = A(s) + B(s)
        B(s) →+

        A(s) →+
              ⊕ → C(s) = A(s) - B(s)
        B(s) →-
```

#### 3. Branch Point

A branch point splits a signal to multiple destinations:

```
        A(s) →● → A(s)
              |
              → A(s)
```

The same signal goes to both branches.

## Block Diagram Algebra

### Series (Cascade) Connection

When blocks are connected in series:

```
       +--------+   +--------+
R(s) →| G₁(s)  |→→→| G₂(s)  |→ Y(s)
       +--------+   +--------+
```

Equivalent transfer function:

$$\frac{Y(s)}{R(s)} = G_1(s) \cdot G_2(s)$$

**General rule**: For $n$ blocks in series:
$$G_{eq} = G_1 \cdot G_2 \cdot \cdots \cdot G_n$$

### Parallel Connection

When blocks are connected in parallel:

```
              +--------+
           +→→| G₁(s)  |→+
           |  +--------+  |
       +---+              ⊕ → Y(s)
R(s) →|   |  +--------+  |+
       +---+→→| G₂(s)  |→+
           |  +--------+  |
           +--------------+
```

Equivalent transfer function:

$$\frac{Y(s)}{R(s)} = G_1(s) + G_2(s)$$

**General rule**: For $n$ blocks in parallel:
$$G_{eq} = G_1 + G_2 + \cdots + G_n$$

### Feedback Connection

The most important configuration in control systems:

**Negative Feedback:**

```
              +--------+
           +→→| G(s)   |→→→+→ Y(s)
           |  +--------+   |
       +---+               |
R(s) →⊕                   |
       -                  |
           +←←←←←←←←←←←←←←+
              +--------+
              | H(s)   |
              +--------+
```

Closed-loop transfer function:

$$\frac{Y(s)}{R(s)} = \frac{G(s)}{1 + G(s)H(s)}$$

**Positive Feedback:**

$$\frac{Y(s)}{R(s)} = \frac{G(s)}{1 - G(s)H(s)}$$

### Moving Summing Junctions

**Moving summing junction past a block (forward):**

Before:
```
R(s) →[⊕]→[G]→ Y(s)
```

After:
```
R(s) →[G]→[⊕]→ Y(s)
           ↑
         [1/G]
```

**Moving summing junction past a block (backward):**

Before:
```
R(s) →[G]→[⊕]→ Y(s)
```

After:
```
R(s) →[⊕]→[G]→ Y(s)
       ↑
      [G]
```

### Moving Branch Points

**Moving branch point past a block (forward):**

Before:
```
R(s) →[G]→●→ Y(s)
          |
          → B(s)
```

After:
```
R(s) →[G]→ Y(s)
        |
       [1/G]
        |
        → B(s)
```

## Block Diagram Reduction

### Step-by-Step Procedure

1. **Identify the input and output** variables
2. **Combine cascade blocks** by multiplication
3. **Combine parallel blocks** by addition
4. **Reduce feedback loops** using the feedback formula
5. **Move summing junctions or branch points** if necessary
6. **Repeat** until single block remains

### Example 1: Simple Feedback System

Reduce to find $Y(s)/R(s)$:

```
              +-----+
           +→→| G₁  |→→→+→→→+→→→ Y(s)
           |  +-----+   |    |
       +---+            |   [G₂]
R(s) →⊕                |    |
       -               +←←←←+
                       +-----+
                       | H   |
                       +-----+
```

**Step 1**: Find the forward path and feedback.

Forward path: $G_1 \cdot G_2$

Feedback: $H$

**Step 2**: Apply feedback formula:

$$\frac{Y(s)}{R(s)} = \frac{G_1 G_2}{1 + G_1 G_2 H}$$

### Example 2: Multiple Feedback Loops

```
                +-----+     +-----+
             +→→| G₂  |→→→→→| G₃  |→→→+→ Y(s)
             |  +-----+     +-----+   |
         +---+                        |
R(s) →→→⊕                             |
         +   +←←←←←←←←←←←←←←←←←←←←←←←+
         |   +-----+
         |   | H₁  |
         |   +-----+
         |        +←←←←←←+
         |        |      |
         |      +-----+  |
         +←←←←←←| H₂  |←+
                +-----+
```

**Step 1**: Reduce the inner feedback loop ($G_3, H_2$):

$$G_{eq1} = \frac{G_3}{1 + G_3 H_2}$$

**Step 2**: Combine $G_2$ and $G_{eq1}$ in cascade:

$$G_{forward} = G_2 \cdot \frac{G_3}{1 + G_3 H_2}$$

**Step 3**: Reduce outer feedback loop:

$$\frac{Y(s)}{R(s)} = \frac{G_2 G_3}{(1 + G_3 H_2)(1 + H_1 G_2 G_3/(1 + G_3 H_2))}$$

$$= \frac{G_2 G_3}{1 + G_3 H_2 + G_2 G_3 H_1}$$

### Example 3: Moving a Pickoff Point

```
        +-----+         +-----+
R(s) →→→| G₁  |→→→●→→→→→| G₂  |→→→ Y(s)
        +-----+    |    +-----+
                   |
                   +→→→→→→→→→→→→ Z(s)
```

To find $Y(s)/R(s)$, we can ignore the branch to $Z(s)$ since it doesn't affect the main path:

$$\frac{Y(s)}{R(s)} = G_1 G_2$$

## Common Block Diagram Configurations

### Unity Feedback System

When $H(s) = 1$:

$$\frac{Y(s)}{R(s)} = \frac{G(s)}{1 + G(s)}$$

### Open-Loop Transfer Function

The **open-loop transfer function** is $G(s)H(s)$ - the product around the loop when the loop is broken.

### Closed-Loop Transfer Function

The standard form for negative feedback:

$$T(s) = \frac{G(s)}{1 + G(s)H(s)}$$

## Summary

Block diagrams provide a visual representation of control system structure. The three basic operations are series (multiplication), parallel (addition), and feedback (closed-loop formula). Complex block diagrams are reduced step by step using block diagram algebra. The feedback formula $G/(1+GH)$ is the most important relationship in control system analysis.
