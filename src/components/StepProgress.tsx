import { useApp } from '../AppContext';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StepProgress() {
  const { state } = useApp();
  
  const steps = [
    { id: 1, label: 'Fotos' },
    { id: 2, label: 'Cenário' },
    { id: 3, label: 'Criação' },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-xs mx-auto px-4 py-10">
      {steps.map((step, index) => {
        const isCompleted = state.currentStep > index;
        const isActive = state.currentStep === index;
        
        return (
          <div key={step.id} className="flex flex-col items-center gap-3 relative z-10">
            <motion.div 
              initial={false}
              animate={{
                backgroundColor: isCompleted ? "var(--color-brand-gold)" : isActive ? "var(--color-brand-gold-dark)" : "var(--color-brand-border)",
                color: isCompleted || isActive ? "var(--color-brand-offwhite)" : "var(--color-brand-text-secondary)",
                scale: isActive ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500",
                isActive && "ring-8 ring-brand-border"
              )}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={18} strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.span
                    key="number"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.id}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <span className={cn(
              "text-[11px] font-bold tracking-widest uppercase transition-colors duration-300",
              isActive ? "text-brand-text-primary" : "text-brand-text-secondary/50"
            )}>
              {step.label}
            </span>
            
            {/* Line between steps */}
            {index < steps.length - 1 && (
              <div className="absolute left-[calc(100%+12px)] top-5 w-[calc(100vw/3.5-32px)] max-w-[60px] h-[2px] bg-brand-border">
                <motion.div 
                  initial={false}
                  animate={{ width: isCompleted ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="h-full bg-brand-gold"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
