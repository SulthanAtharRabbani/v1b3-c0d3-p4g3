import type { ReferenceItem } from '@/types';

export const controlSystemsReference: ReferenceItem[] = [
  // Module 1: Introduction
  {
    id: 'ref-tf',
    title: 'Transfer Function',
    formula: 'G(s) = \\frac{C(s)}{R(s)}',
    description: 'Ratio of output transform to input transform',
    module: 'cs-intro',
  },
  {
    id: 'ref-feedback',
    title: 'Closed-Loop Transfer Function',
    formula: '\\frac{C(s)}{R(s)} = \\frac{G(s)}{1 + G(s)H(s)}',
    description: 'Transfer function for negative feedback system',
    module: 'cs-intro',
  },
  {
    id: 'ref-second-order',
    title: 'Standard Second-Order System',
    formula: 'G(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}',
    description: 'Standard form with natural frequency ωn and damping ratio ζ',
    module: 'cs-intro',
  },
  {
    id: 'ref-damped-freq',
    title: 'Damped Natural Frequency',
    formula: '\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}',
    description: 'Actual oscillation frequency for underdamped systems',
    module: 'cs-intro',
  },
  // Stability
  {
    id: 'ref-overshoot',
    title: 'Percent Overshoot',
    formula: '\\%OS = e^{-\\zeta\\pi/\\sqrt{1-\\zeta^2}} \\times 100',
    description: 'Maximum overshoot as percentage of final value',
    module: 'cs-stability',
  },
  {
    id: 'ref-settling',
    title: 'Settling Time (2%)',
    formula: 't_s = \\frac{4}{\\zeta\\omega_n}',
    description: 'Time to reach and stay within 2% of final value',
    module: 'cs-stability',
  },
  {
    id: 'ref-peak-time',
    title: 'Peak Time',
    formula: 't_p = \\frac{\\pi}{\\omega_d}',
    description: 'Time to reach first peak',
    module: 'cs-stability',
  },
  // PID
  {
    id: 'ref-pid',
    title: 'PID Controller',
    formula: 'G_c(s) = K_p + \\frac{K_i}{s} + K_d s',
    description: 'Parallel form of PID controller transfer function',
    module: 'cs-pid',
  },
  {
    id: 'ref-pid-standard',
    title: 'PID Standard Form',
    formula: 'G_c(s) = K_p\\left(1 + \\frac{1}{T_i s} + T_d s\\right)',
    description: 'Standard form with integral and derivative time constants',
    module: 'cs-pid',
  },
  // Root Locus
  {
    id: 'ref-angle-cond',
    title: 'Angle Condition',
    formula: '\\angle G_0(s) = \\pm 180°(2k+1)',
    description: 'Condition for a point to be on the root locus',
    module: 'cs-root-locus',
  },
  {
    id: 'ref-centroid',
    title: 'Asymptote Centroid',
    formula: '\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n - m}',
    description: 'Center point of asymptotes on real axis',
    module: 'cs-root-locus',
  },
];
