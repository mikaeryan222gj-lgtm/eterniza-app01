import { useApp } from '../AppContext';
import ScreenWrapper from '../components/ScreenWrapper';
import StepProgress from '../components/StepProgress';
import { Check, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const scenarios = [
  {
    id: 'clouds',
    title: 'Reencontro nas Nuvens',
    description: 'Um reencontro emocionante em um ambiente claro e sereno entre as nuvens.',
    image: 'https://i.imgur.com/QyfEgqu.jpg'
  },
  {
    id: 'jesus',
    title: 'Reencontro com Jesus',
    description: 'Um momento simbólico e acolhedor ao lado de Jesus.',
    image: 'https://i.imgur.com/3tzwHM4.jpg'
  },
  {
    id: 'stairs',
    title: 'Escadaria nas Nuvens',
    description: 'Um reencontro especial em uma escadaria cercada por nuvens e luz.',
    image: 'https://i.imgur.com/zSBZHB4.jpg'
  }
];

export default function PreparationScreen() {
  const { state, setStep, updateState } = useApp();

  return (
    <ScreenWrapper id="preparation">
      <div className="flex flex-col">
        <button 
          onClick={() => setStep(1)}
          className="w-12 h-12 -ml-3 mb-4 flex items-center justify-center text-brand-text-secondary/50 active:text-brand-text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <h2 className="text-3xl font-medium mb-3 text-balance leading-tight text-brand-text-primary">Como você imagina esse reencontro? ❤️</h2>
        <p className="text-brand-text-secondary text-lg mb-10 leading-relaxed">
          Escolha abaixo o estilo que mais representa esse momento para você.
        </p>

        <div className="space-y-6 mb-12">
          {scenarios.map((scenario) => {
            const isSelected = state.selectedScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => updateState({ selectedScenarioId: scenario.id })}
                className={cn(
                  "w-full flex flex-col p-4 rounded-[2.5rem] border-2 transition-all duration-300 relative overflow-hidden text-left active:scale-[0.98]",
                  isSelected 
                    ? "bg-brand-gold/5 border-brand-gold shadow-[0_8px_30px_rgba(205,166,83,0.15)] ring-4 ring-brand-gold/10" 
                    : "bg-brand-offwhite border-brand-border hover:border-brand-gold/30"
                )}
              >
                <div className="w-full aspect-[16/8] rounded-[1.8rem] overflow-hidden mb-5 shadow-sm bg-brand-border/50">
                  <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      scale: isSelected ? 1.05 : 1
                    }}
                    transition={{ 
                      opacity: { duration: 0.8 },
                      scale: { duration: 0.5, ease: "easeOut" }
                    }}
                    src={scenario.image} 
                    alt={scenario.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="px-3 pb-2">
                  <h3 className="text-xl font-bold text-brand-text-primary mb-1 flex items-center justify-between">
                    {scenario.title}
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2, ease: "backOut" }}
                        className="w-7 h-7 bg-brand-gold rounded-full flex items-center justify-center text-brand-offwhite shadow-sm"
                      >
                        <Check size={16} strokeWidth={4} />
                      </motion.div>
                    )}
                  </h3>
                  <p className="text-base text-brand-text-secondary leading-relaxed">{scenario.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <StepProgress />

        <button
          disabled={!state.selectedScenarioId}
          onClick={() => setStep(3)}
          className={cn(
            "gold-button w-full mt-10 transition-all duration-500",
            state.selectedScenarioId 
              ? "opacity-100 gold-shimmer" 
              : "opacity-50 grayscale cursor-not-allowed"
          )}
        >
          CONTINUAR COM ESTE CENÁRIO
        </button>
      </div>
    </ScreenWrapper>
  );
}
