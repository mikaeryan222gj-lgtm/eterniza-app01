import { useApp } from '../AppContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { Check, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ReencontroTab() {
  const { state, setStep } = useApp();

  const steps = [
    { id: 1, title: 'Escolher fotos', status: state.photo1Checked && state.photo2Checked ? 'completo' : 'pendente', target: 1 },
    { id: 2, title: 'Escolher cenário', status: !!state.selectedScenarioId ? 'completo' : 'pendente', target: 2 },
    { id: 3, title: 'Criar reencontro', status: state.reencontroCompleted ? 'completo' : 'pendente', target: 3 },
  ];

  return (
    <ScreenWrapper id="tab-reencontro">
      <h2 className="text-3xl font-medium mb-8 leading-tight text-brand-text-primary">Seu progresso</h2>
      
      <div className="bg-brand-offwhite rounded-[3rem] p-10 shadow-sm border border-brand-border mb-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="font-bold text-2xl mb-1 text-brand-text-primary">Reencontro Principal</h3>
            <span className={cn(
              "text-[11px] font-black uppercase tracking-[0.2em]",
              state.reencontroCompleted ? "text-brand-gold" : "text-brand-text-secondary/50"
            )}>
              Status: {state.reencontroCompleted ? 'LIBERADO ✓' : 'EM ANDAMENTO'}
            </span>
          </div>
          <div className="w-16 h-16 rounded-[1.5rem] bg-brand-cream flex items-center justify-center border border-brand-border shadow-sm">
            <Heart size={32} className={cn(state.reencontroCompleted ? "text-brand-gold fill-brand-gold" : "text-brand-border")} strokeWidth={2.5} />
          </div>
        </div>

        <div className="space-y-10">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setStep(step.target)}
              className="w-full flex items-center group active:scale-[0.98] transition-transform"
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-brand-offwhite shrink-0 mr-6 shadow-sm transition-all duration-500",
                step.status === 'completo' ? "bg-brand-gold" : "bg-brand-border"
              )}>
                {step.status === 'completo' ? <Check size={18} strokeWidth={4} /> : <span className="text-sm font-black">{step.id}</span>}
              </div>
              
              <div className="flex-1 text-left">
                <p className={cn(
                  "text-lg font-bold transition-colors",
                  step.status === 'completo' ? "text-brand-text-primary" : "text-brand-text-secondary/50 group-hover:text-brand-text-secondary"
                )}>
                  {step.title}
                </p>
              </div>
              
              <ArrowRight size={20} className={cn(
                "transition-all",
                step.status === 'completo' ? "text-brand-gold" : "text-brand-border group-hover:text-brand-gold"
              )} strokeWidth={3} />
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-8 rounded-[2rem] bg-brand-gold/5 border border-brand-gold/10 text-center italic"
      >
        <p className="text-base text-brand-text-secondary leading-relaxed">
          "A memória é o único paraíso do qual não podemos ser expulsos."
        </p>
      </motion.div>
    </ScreenWrapper>
  );
}
