'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, X, Sparkles, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompletionToastProps {
  show: boolean;
  onClose: () => void;
  lessonTitle?: string;
  streak?: number;
  isCourseComplete?: boolean;
}

export function CompletionToast({
  show,
  onClose,
  lessonTitle,
  streak,
  isCourseComplete = false,
}: CompletionToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (show) {
      // Trigger animation - using microtask to avoid synchronous setState warning
      setTimeout(() => setIsVisible(true), 10);
      queueMicrotask(() => setShowConfetti(true));

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Using microtask to avoid synchronous setState warning
      queueMicrotask(() => setIsVisible(false));
    }
  }, [show, onClose]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  if (!show) return null;

  return (
    <>
      {/* Confetti effect */}
      {showConfetti && <Confetti />}

      {/* Toast */}
      <div
        className={cn(
          'fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]',
          'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
          'rounded-xl shadow-2xl px-6 py-4',
          'flex items-center gap-4',
          'transition-all duration-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            {isCourseComplete ? (
              <PartyPopper className="h-8 w-8" />
            ) : (
              <CheckCircle2 className="h-8 w-8" />
            )}
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <p className="font-semibold">
              {isCourseComplete ? '🎉 Course Complete!' : 'Lesson Completed!'}
            </p>
            {lessonTitle && (
              <p className="text-sm text-white/80">{lessonTitle}</p>
            )}
            {streak && streak > 0 && (
              <p className="text-xs text-white/70 mt-1">
                🔥 {streak} day streak!
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}

// Simple confetti component
function Confetti() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    color: string;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const colors = ['#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 1,
    }));
    // Using microtask to avoid synchronous setState warning
    queueMicrotask(() => setParticles(newParticles));

    // Clean up confetti after animation
    const timer = setTimeout(() => setParticles([]), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: '-10px',
            backgroundColor: particle.color,
            animation: `confetti-fall ${particle.duration}s ease-out ${particle.delay}s forwards`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Hook for managing completion toast
export function useCompletionToast() {
  const [toastState, setToastState] = useState<{
    show: boolean;
    lessonTitle?: string;
    streak?: number;
    isCourseComplete?: boolean;
  }>({ show: false });

  const showCompletionToast = useCallback(
    (lessonTitle?: string, streak?: number, isCourseComplete?: boolean) => {
      setToastState({ show: true, lessonTitle, streak, isCourseComplete });
    },
    []
  );

  const hideCompletionToast = useCallback(() => {
    setToastState((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    toastState,
    showCompletionToast,
    hideCompletionToast,
  };
}
