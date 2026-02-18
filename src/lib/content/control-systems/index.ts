import type { Course } from '@/types';
import { controlSystemsModules } from './modules';
import { controlSystemsReference } from './reference';
import { controlSystemsFlashcards } from './flashcards';

export const controlSystemsCourse: Course = {
  id: 'control-systems',
  slug: 'control-systems',
  title: 'Control Systems Engineering',
  subtitle: 'Master feedback control, stability analysis, and system design',
  description: 'A comprehensive course covering the fundamentals of control systems engineering, from basic concepts to advanced design techniques. Learn about transfer functions, stability analysis, PID controllers, and state-space methods.',
  category: 'control-systems',
  icon: 'Settings',
  color: '#3B82F6',
  difficulty: 'intermediate',
  estimatedHours: 24,
  prerequisites: [
    'Linear Algebra',
    'Differential Equations',
    'Complex Analysis',
    'Basic Circuit Theory',
  ],
  learningOutcomes: [
    'Understand the principles of feedback control systems',
    'Analyze system stability using various techniques',
    'Design PID controllers for practical applications',
    'Apply root locus and frequency response methods',
    'Implement state-space representation and analysis',
  ],
  modules: controlSystemsModules,
  quickReference: controlSystemsReference,
  flashcards: controlSystemsFlashcards,
};
