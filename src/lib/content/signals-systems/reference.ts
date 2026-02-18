import type { ReferenceItem } from '@/types';

export const signalsSystemsReference: ReferenceItem[] = [
  // Signals Fundamentals
  {
    id: 'ss-ref-unit-step',
    title: 'Unit Step Function',
    formula: 'u(t) = \\begin{cases} 1, & t \\geq 0 \\\\ 0, & t < 0 \\end{cases}',
    description: 'Step function that turns on at t=0',
    module: 'ss-intro',
  },
  {
    id: 'ss-ref-delta',
    title: 'Unit Impulse (Delta)',
    formula: '\\int_{-\\infty}^{\\infty} \\delta(t) dt = 1',
    description: 'Impulse function with unit area concentrated at t=0',
    module: 'ss-intro',
  },
  {
    id: 'ss-ref-convolution',
    title: 'Convolution Integral',
    formula: 'y(t) = x(t) * h(t) = \\int_{-\\infty}^{\\infty} x(\\tau)h(t-\\tau) d\\tau',
    description: 'Output of LTI system given input x(t) and impulse response h(t)',
    module: 'ss-intro',
  },
  // Fourier
  {
    id: 'ss-ref-fourier',
    title: 'Fourier Transform Pair',
    formula: 'X(\\omega) = \\int_{-\\infty}^{\\infty} x(t) e^{-j\\omega t} dt',
    description: 'Forward transform from time to frequency domain',
    module: 'ss-fourier',
  },
  {
    id: 'ss-ref-fourier-inv',
    title: 'Inverse Fourier Transform',
    formula: 'x(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} X(\\omega) e^{j\\omega t} d\\omega',
    description: 'Inverse transform from frequency to time domain',
    module: 'ss-fourier',
  },
  {
    id: 'ss-ref-parseval',
    title: 'Parseval\'s Theorem',
    formula: '\\int |x(t)|^2 dt = \\frac{1}{2\\pi} \\int |X(\\omega)|^2 d\\omega',
    description: 'Energy is preserved between time and frequency domains',
    module: 'ss-fourier',
  },
  // Laplace
  {
    id: 'ss-ref-laplace',
    title: 'Laplace Transform',
    formula: 'X(s) = \\int_{0^-}^{\\infty} x(t) e^{-st} dt',
    description: 'Unilateral Laplace transform',
    module: 'ss-laplace',
  },
  {
    id: 'ss-ref-laplace-diff',
    title: 'Differentiation Property',
    formula: '\\mathcal{L}\\{\\frac{dx}{dt}\\} = sX(s) - x(0^-)',
    description: 'Laplace transform of derivative includes initial condition',
    module: 'ss-laplace',
  },
];
