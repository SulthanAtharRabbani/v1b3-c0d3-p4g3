import type { Flashcard } from '@/types';

export const signalsSystemsFlashcards: Flashcard[] = [
  {
    id: 'ss-fc-periodic',
    front: 'What is a periodic signal?',
    back: 'A signal x(t) that satisfies x(t) = x(t + T) for all t, where T is the fundamental period (smallest positive value for which this holds).',
    moduleId: 'ss-intro',
  },
  {
    id: 'ss-fc-even-odd',
    front: 'How do you decompose a signal into even and odd parts?',
    back: 'x(t) = xₑ(t) + xₒ(t), where xₑ(t) = [x(t) + x(-t)]/2 (even part) and xₒ(t) = [x(t) - x(-t)]/2 (odd part).',
    moduleId: 'ss-intro',
  },
  {
    id: 'ss-fc-energy-power',
    front: 'What is the difference between energy and power signals?',
    back: 'Energy signals have finite total energy (E < ∞, P = 0). Power signals have finite average power (P < ∞, E = ∞). A signal cannot be both.',
    moduleId: 'ss-intro',
  },
  {
    id: 'ss-fc-lti',
    front: 'What characterizes an LTI system?',
    back: 'An LTI system is both Linear (satisfies superposition) and Time-Invariant (shift in input causes equal shift in output). It is fully characterized by its impulse response h(t).',
    moduleId: 'ss-intro',
  },
  {
    id: 'ss-fc-fourier-series',
    front: 'What is the Fourier series representation?',
    back: 'A periodic signal x(t) with period T can be expressed as: x(t) = Σcₙe^(jnω₀t), where ω₀ = 2π/T and cₙ are the complex Fourier coefficients.',
    moduleId: 'ss-intro',
  },
  {
    id: 'ss-fc-convolution-theorem',
    front: 'State the convolution theorem for Fourier transforms.',
    back: 'Convolution in time domain equals multiplication in frequency domain: x(t)*h(t) ↔ X(ω)H(ω). This is fundamental for LTI system analysis.',
    moduleId: 'ss-fourier',
  },
  {
    id: 'ss-fc-laplace-roc',
    front: 'What is the Region of Convergence (ROC) in Laplace transform?',
    back: 'The ROC is the set of complex s values for which the Laplace integral converges. For stable systems, the ROC must include the imaginary axis (Re(s) = 0).',
    moduleId: 'ss-laplace',
  },
];
