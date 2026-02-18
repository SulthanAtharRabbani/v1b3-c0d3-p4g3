'use client';

import { useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

export type CelebrationType = 'lesson' | 'module' | 'course' | 'quiz-perfect' | 'streak' | 'achievement';

interface CelebrationConfig {
  duration: number;
  particleCount: number;
  spread: number;
  colors: string[];
  shapes: ('square' | 'circle')[];
}

const CELEBRATION_CONFIGS: Record<CelebrationType, CelebrationConfig> = {
  lesson: {
    duration: 1000,
    particleCount: 30,
    spread: 50,
    colors: ['#10B981', '#34D399', '#6EE7B7'],
    shapes: ['circle'],
  },
  module: {
    duration: 2000,
    particleCount: 50,
    spread: 70,
    colors: ['#3B82F6', '#60A5FA', '#93C5FD'],
    shapes: ['square', 'circle'],
  },
  course: {
    duration: 4000,
    particleCount: 100,
    spread: 100,
    colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#10B981', '#3B82F6'],
    shapes: ['square', 'circle'],
  },
  'quiz-perfect': {
    duration: 2000,
    particleCount: 60,
    spread: 60,
    colors: ['#EC4899', '#F472B6', '#F9A8D4'],
    shapes: ['circle'],
  },
  streak: {
    duration: 1500,
    particleCount: 40,
    spread: 60,
    colors: ['#F97316', '#FB923C', '#FDBA74'],
    shapes: ['circle'],
  },
  achievement: {
    duration: 2500,
    particleCount: 80,
    spread: 80,
    colors: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#F59E0B'],
    shapes: ['square', 'circle'],
  },
};

export function useCelebration() {
  const hasCelebratedRef = useRef(false);

  const celebrate = useCallback((type: CelebrationType) => {
    const config = CELEBRATION_CONFIGS[type];
    
    // Different celebration patterns based on type
    switch (type) {
      case 'lesson':
        // Simple burst from center
        confetti({
          particleCount: config.particleCount,
          spread: config.spread,
          colors: config.colors,
          shapes: config.shapes,
          origin: { y: 0.7 },
        });
        break;

      case 'module':
        // Side bursts
        confetti({
          particleCount: config.particleCount,
          angle: 60,
          spread: config.spread,
          colors: config.colors,
          shapes: config.shapes,
          origin: { x: 0, y: 0.8 },
        });
        confetti({
          particleCount: config.particleCount,
          angle: 120,
          spread: config.spread,
          colors: config.colors,
          shapes: config.shapes,
          origin: { x: 1, y: 0.8 },
        });
        break;

      case 'course':
        // Big celebration with multiple bursts
        const duration = config.duration;
        const animationEnd = Date.now() + duration;
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
        
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            clearInterval(interval);
            return;
          }
          confetti({
            particleCount: config.particleCount / 5,
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 100),
            colors: config.colors,
            shapes: config.shapes,
            origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.3, 0.6) },
          });
        }, 200);
        break;

      case 'quiz-perfect':
        // Stars burst
        confetti({
          particleCount: config.particleCount,
          spread: config.spread,
          colors: config.colors,
          shapes: config.shapes,
          origin: { y: 0.5 },
          scalar: 1.2,
        });
        break;

      case 'streak':
        // Fire-like burst upward
        confetti({
          particleCount: config.particleCount,
          spread: config.spread,
          colors: config.colors,
          shapes: config.shapes,
          origin: { y: 0.9 },
          startVelocity: 50,
          gravity: 0.8,
        });
        break;

      case 'achievement':
        // Circular burst
        confetti({
          particleCount: config.particleCount,
          spread: 360,
          colors: config.colors,
          shapes: config.shapes,
          origin: { x: 0.5, y: 0.5 },
        });
        break;
    }
  }, []);

  return { celebrate };
}

// Celebration Modal Component
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Star, Flame, CheckCircle } from 'lucide-react';

interface CelebrationModalProps {
  type: CelebrationType;
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  achievement?: {
    id: string;
    title: string;
    tier: string;
  };
}

const ICONS = {
  lesson: CheckCircle,
  module: Award,
  course: Trophy,
  'quiz-perfect': Star,
  streak: Flame,
  achievement: Trophy,
};

const COLORS = {
  lesson: 'text-green-500',
  module: 'text-blue-500',
  course: 'text-yellow-500',
  'quiz-perfect': 'text-pink-500',
  streak: 'text-orange-500',
  achievement: 'text-purple-500',
};

export function CelebrationModal({
  type,
  title,
  description,
  open,
  onClose,
  achievement,
}: CelebrationModalProps) {
  const { celebrate } = useCelebration();

  useEffect(() => {
    if (open) {
      setTimeout(() => celebrate(type), 100);
    }
  }, [open, type, celebrate]);

  const Icon = ICONS[type];
  const colorClass = COLORS[type];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center max-w-sm">
        <div className="py-6">
          <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-4 ${colorClass}`}>
            <Icon className="h-10 w-10" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">{title}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-6">{description}</p>
          {achievement && (
            <div className="bg-muted rounded-lg p-4 mb-4">
              <p className="font-medium text-sm text-muted-foreground mb-2">Achievement Unlocked!</p>
              <p className="font-semibold">{achievement.title}</p>
              <p className="text-xs text-muted-foreground capitalize">{achievement.tier} Tier</p>
            </div>
          )}
          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
