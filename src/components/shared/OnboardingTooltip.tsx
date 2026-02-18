'use client';

import { useEffect, useState } from 'react';
import { X, Sparkles, BookOpen, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingTooltipProps {
  className?: string;
}

export function OnboardingTooltip({ className }: OnboardingTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if first-time user and not dismissed
    const hasVisited = localStorage.getItem('eduhub-visited');
    const hasSeenOnboarding = localStorage.getItem('eduhub-onboarding-complete');

    if (hasVisited && !hasSeenOnboarding) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const steps = [
    {
      title: 'Welcome to EduHub! 👋',
      description: 'Your self-study platform for electrical engineering courses. Let\'s show you around!',
      icon: Sparkles,
    },
    {
      title: 'Learn at Your Pace',
      description: 'Browse courses, complete lessons, and track your progress. Each lesson has interactive content and quizzes.',
      icon: BookOpen,
    },
    {
      title: 'Use Keyboard Shortcuts',
      description: 'Press ? for help, / to search, arrow keys to navigate. Speed up your learning!',
      icon: Keyboard,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('eduhub-onboarding-complete', 'true');
  };

  if (!isVisible) return null;

  const StepIcon = steps[currentStep].icon;

  return (
    <div className={cn('fixed inset-0 z-[100] flex items-center justify-center', className)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleDismiss} />

      {/* Tooltip Card */}
      <div className="relative bg-card border rounded-2xl shadow-2xl p-6 max-w-md mx-4 animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
            <StepIcon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
          <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  index === currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                )}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={handleDismiss}>
              Skip Tour
            </Button>
            <Button onClick={handleNext}>
              {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
