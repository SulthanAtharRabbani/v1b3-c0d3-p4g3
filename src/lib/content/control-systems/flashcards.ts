import type { Flashcard } from '@/types';

export const controlSystemsFlashcards: Flashcard[] = [
  // Introduction Module
  {
    id: 'fc-open-loop',
    front: 'What is an open-loop control system?',
    back: 'A system where the output has no effect on the control action. No feedback is used.',
    moduleId: 'cs-intro',
  },
  {
    id: 'fc-closed-loop',
    front: 'What is a closed-loop control system?',
    back: 'A system where the output is measured and compared with the input, allowing automatic correction of errors through feedback.',
    moduleId: 'cs-intro',
  },
  {
    id: 'fc-transfer-fn',
    front: 'Define the transfer function of a system.',
    back: 'The ratio of the Laplace transform of the output to the Laplace transform of the input, with zero initial conditions: G(s) = C(s)/R(s)',
    moduleId: 'cs-intro',
  },
  {
    id: 'fc-poles-zeros',
    front: 'What are poles and zeros of a transfer function?',
    back: 'Zeros are roots of the numerator (where G(s) = 0). Poles are roots of the denominator (where G(s) → ∞).',
    moduleId: 'cs-intro',
  },
  {
    id: 'fc-damping-ratio',
    front: 'What is the damping ratio ζ?',
    back: 'A dimensionless parameter that characterizes the decay of oscillations. ζ = 0: undamped, 0 < ζ < 1: underdamped, ζ = 1: critically damped, ζ > 1: overdamped.',
    moduleId: 'cs-intro',
  },
  // Stability Module
  {
    id: 'fc-bibo-stable',
    front: 'What is BIBO stability?',
    back: 'Bounded-Input, Bounded-Output stability. A system is BIBO stable if every bounded input produces a bounded output.',
    moduleId: 'cs-stability',
  },
  {
    id: 'fc-stability-poles',
    front: 'How do pole locations determine stability?',
    back: 'Poles in the left half-plane (Re < 0): stable. Poles on imaginary axis: marginally stable. Poles in right half-plane (Re > 0): unstable.',
    moduleId: 'cs-stability',
  },
  {
    id: 'fc-routh-criterion',
    front: 'What does the Routh-Hurwitz criterion determine?',
    back: 'The number of roots of the characteristic equation in the right half-plane, without actually computing the roots.',
    moduleId: 'cs-stability',
  },
  // PID Module
  {
    id: 'fc-p-control',
    front: 'What is the effect of proportional (P) control?',
    back: 'Provides immediate response proportional to error, reduces rise time, but cannot eliminate steady-state error. Higher gain may cause oscillation.',
    moduleId: 'cs-pid',
  },
  {
    id: 'fc-i-control',
    front: 'What is the effect of integral (I) control?',
    back: 'Eliminates steady-state error by increasing system type, but can slow down response and cause overshoot or integral windup.',
    moduleId: 'cs-pid',
  },
  {
    id: 'fc-d-control',
    front: 'What is the effect of derivative (D) control?',
    back: 'Anticipates future error, improves damping, reduces overshoot, but is sensitive to noise.',
    moduleId: 'cs-pid',
  },
  {
    id: 'fc-zn-method',
    front: 'What is the Ziegler-Nichols ultimate cycle method?',
    back: 'A tuning method where Kp is increased until sustained oscillation occurs. The ultimate gain Ku and period Tu are used to calculate PID parameters.',
    moduleId: 'cs-pid',
  },
  // Root Locus Module
  {
    id: 'fc-root-locus-start',
    front: 'Where does the root locus start and end?',
    back: 'Starts at open-loop poles (K = 0) and ends at open-loop zeros (K = ∞) or at infinity if there are more poles than zeros.',
    moduleId: 'cs-root-locus',
  },
  {
    id: 'fc-angle-condition',
    front: 'What is the angle condition for root locus?',
    back: '∠G₀(s) = ±180°(2k+1), for k = 0, 1, 2, ... A point is on the root locus if this condition is satisfied.',
    moduleId: 'cs-root-locus',
  },
];
