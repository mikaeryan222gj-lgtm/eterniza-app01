import { useApp } from '../AppContext';
import ScreenWrapper from '../components/ScreenWrapper';
import StepProgress from '../components/StepProgress';
import { Check, X, ArrowLeft, Image as ImageIcon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function PhotoSelectionScreen() {
  const { state, setStep, updateState } = useApp();

  const recommendations = [
    { text: "Rosto claramente visível", type: 'check' },
    { text: "Iluminação boa", type: 'check' },
    { text: "Imagem relativamente nítida", type: 'check' },
    { text: "Sem objetos no rosto", type: 'check' },
    { text: "Olhando para frente ou lado", type: 'check' },
  ];

  const avoids = [
    { text: "Rosto cortado", type: 'x' },
    { text: "Pessoa muito distante", type: 'x' },
    { text: "Imagem muito escura", type: 'x' },
    { text: "Rosto escondido", type: 'x' },
    { text: "Muito desfocada", type: 'x' },
  ];

  const allChecked = state.photo1Checked && state.photo2Checked;

  return (
    <ScreenWrapper id="photo-selection">
      <div className="flex flex-col">
        <button 
          onClick={() => setStep(0)}
          className="w-12 h-12 -ml-3 mb-4 flex items-center justify-center text-brand-text-secondary/50 active:text-brand-text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <h2 className="text-3xl font-medium mb-3 text-balance leading-tight text-brand-text-primary">Prepare suas 2 fotos</h2>
        <p className="text-brand-text-secondary text-lg mb-10 leading-relaxed">
          Para conseguir um resultado mais natural, a escolha das fotos faz toda diferença.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-brand-offwhite border border-brand-border p-8 rounded-[2rem] shadow-sm">
            <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-5">✓ BOA FOTO</span>
            <ul className="space-y-4">
              {recommendations.map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-base font-medium text-brand-text-primary">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-brand-gold" strokeWidth={3} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-brand-border/30 border border-brand-border p-8 rounded-[2rem] opacity-90">
            <span className="text-[11px] font-black text-brand-text-secondary/50 uppercase tracking-[0.2em] block mb-5">X EVITE</span>
            <ul className="space-y-4">
              {avoids.map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-base font-medium text-brand-text-secondary">
                  <div className="w-6 h-6 rounded-full bg-brand-text-secondary/10 flex items-center justify-center shrink-0">
                    <X size={14} className="text-brand-text-secondary/50" strokeWidth={3} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <button 
            onClick={() => updateState({ photo1Checked: !state.photo1Checked })}
            className={cn(
              "w-full flex items-center p-6 rounded-3xl border-2 transition-all duration-300 active:scale-[0.98]",
              state.photo1Checked ? "bg-brand-offwhite border-brand-gold shadow-md shadow-brand-gold/10" : "bg-brand-offwhite/50 border-brand-border"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center mr-5 transition-all duration-500",
              state.photo1Checked ? "bg-brand-gold border-brand-gold text-brand-offwhite" : "border-brand-border"
            )}>
              <AnimatePresence>
                {state.photo1Checked && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={20} strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="text-left">
              <h4 className={cn(
                "font-bold text-lg transition-colors duration-300",
                state.photo1Checked ? "text-brand-text-primary" : "text-brand-text-secondary"
              )}>FOTO 1</h4>
              <p className="text-sm text-brand-text-secondary">Uma foto sua.</p>
            </div>
          </button>

          <button 
            onClick={() => updateState({ photo2Checked: !state.photo2Checked })}
            className={cn(
              "w-full flex items-center p-6 rounded-3xl border-2 transition-all duration-300 active:scale-[0.98]",
              state.photo2Checked ? "bg-brand-offwhite border-brand-gold shadow-md shadow-brand-gold/10" : "bg-brand-offwhite/50 border-brand-border"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center mr-5 transition-all duration-500",
              state.photo2Checked ? "bg-brand-gold border-brand-gold text-brand-offwhite" : "border-brand-border"
            )}>
              <AnimatePresence>
                {state.photo2Checked && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={20} strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="text-left">
              <h4 className={cn(
                "font-bold text-lg transition-colors duration-300",
                state.photo2Checked ? "text-brand-text-primary" : "text-brand-text-secondary"
              )}>FOTO 2</h4>
              <p className="text-sm text-brand-text-secondary">Uma foto da pessoa especial.</p>
            </div>
          </button>
        </div>

        <StepProgress />

        <button
          disabled={!allChecked}
          onClick={() => {
            updateState({ photosReady: true });
            setStep(2);
          }}
          className={cn(
            "gold-button w-full mt-10 transition-all duration-500",
            allChecked ? "opacity-100 gold-shimmer" : "opacity-50 grayscale cursor-not-allowed"
          )}
        >
          MINHAS FOTOS ESTÃO PRONTAS ❤️
        </button>
      </div>
    </ScreenWrapper>
  );
}
