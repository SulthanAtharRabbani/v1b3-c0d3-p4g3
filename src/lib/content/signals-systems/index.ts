import type { Course } from '@/types';
import { signalsSystemsModules } from './modules';
import { signalsSystemsReference } from './reference';
import { signalsSystemsFlashcards } from './flashcards';

export const signalsSystemsCourse: Course = {
  id: 'signals-systems',
  slug: 'signals-systems',
  title: 'Signals and Systems',
  subtitle: 'Master signal processing, transforms, and system analysis',
  description: 'A comprehensive course covering continuous and discrete-time signals, Fourier analysis, Laplace transforms, Z-transforms, and their applications in engineering.',
  category: 'signals-systems',
  icon: 'Activity',
  color: '#8B5CF6',
  difficulty: 'intermediate',
  estimatedHours: 20,
  prerequisites: [
    'Calculus',
    'Differential Equations',
    'Complex Analysis',
    'Linear Algebra',
  ],
  learningOutcomes: [
    'Classify signals and systems based on their properties',
    'Apply Fourier series and Fourier transform for frequency analysis',
    'Use Laplace transform for continuous-time system analysis',
    'Apply Z-transform for discrete-time system analysis',
    'Understand sampling theorem and signal reconstruction',
  ],
  modules: signalsSystemsModules,
  quickReference: signalsSystemsReference,
  flashcards: signalsSystemsFlashcards,
};
