import { useState } from 'react';
import { useApp } from '../AppContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { Heart, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FinalizationScreen() {
  const { state, updateState, resetProgress } = useApp();

  if (!state.reunionCompleted) {
    return (
      <ScreenWrapper id="confirmation">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-brand-border rounded-full flex items-center justify-center text-brand-gold mb-10 shadow-sm"
          >
            <Heart size={48} fill="currentColor" className="opacity-20 scale-110" />
          </motion.div>
          
          <h2 className="text-4xl font-medium mb-4 leading-tight text-brand-text-primary">Bem-vindo de volta ❤️</h2>
          <p className="text-brand-text-secondary text-xl mb-12">Conseguiu criar seu reencontro? Conta pra gente se deu tudo certo.</p>
          
          <div className="w-full space-y-5">
            <button
              onClick={() => updateState({ reunionCompleted: true })}
              className="gold-button w-full h-20 text-xl gold-shimmer"
            >
              SIM, DEU CERTO ❤️
            </button>
            
            <button
              onClick={() => updateState({ reencontroCompleted: false, tutorialSeen: false })}
              className="secondary-button w-full h-20 text-xl"
            >
              <HelpCircle size={24} />
              AINDA PRECISO DE AJUDA
            </button>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper id="success">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="w-28 h-28 bg-brand-gold rounded-full flex items-center justify-center text-brand-offwhite mb-12 shadow-2xl shadow-brand-gold/30"
        >
          <CheckCircle2 size={56} strokeWidth={3} />
        </motion.div>

        <h2 className="text-4xl font-medium mb-6 leading-tight text-brand-text-primary">Seu reencontro está pronto ❤️</h2>
        
        <p className="text-brand-text-secondary text-xl mb-16 px-4 leading-relaxed text-balance">
          Agora você pode guardar essa lembrança e compartilhar com quem é especial para você.
        </p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => {}} // This will naturally show the Extras in the Tab system or if the user navigates
          className="gold-button w-full h-20 text-xl mb-12"
        >
          CONTINUAR
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-brand-offwhite border-2 border-brand-border rounded-[3rem] p-10 mb-12 shadow-sm"
        >
          <h3 className="text-2xl font-medium mb-6 text-brand-text-primary text-balance">Existe mais alguém que você gostaria de reencontrar? ❤️</h3>
          <p className="text-base text-brand-text-secondary mb-10 leading-relaxed">
            Agora que você já sabe como funciona, você pode criar novas lembranças com outras pessoas especiais.
          </p>

          <div className="space-y-6">
            <div className="bg-brand-cream p-8 rounded-[2rem] border border-brand-border text-left relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-xl text-brand-text-primary">+1 Novo Reencontro</h4>
                <span className="text-lg font-black text-brand-gold">R$9,90</span>
              </div>
              <p className="text-base text-brand-text-secondary mb-8">Crie mais um reencontro especial.</p>
              <button className="gold-button w-full h-14 text-base uppercase tracking-widest">
                DESBLOQUEAR +1
              </button>
            </div>
            
            <div className="bg-brand-offwhite p-8 rounded-[2rem] border-4 border-brand-gold text-left relative overflow-hidden group shadow-lg shadow-brand-gold/5">
              <div className="absolute top-0 right-0 bg-brand-gold text-brand-offwhite text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-[1rem] tracking-widest">
                MAIS POPULAR
              </div>
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-xl text-brand-text-primary">+3 Novos Reencontros</h4>
                <div className="text-right">
                  <div className="text-lg font-black text-brand-gold">R$16,90</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-8">
                <p className="text-base text-brand-text-secondary">Para outras pessoas ou família.</p>
                <span className="text-xs font-black text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-lg">R$5,63 cada</span>
              </div>
              <button className="gold-button w-full h-14 text-base uppercase tracking-widest gold-shimmer">
                DESBLOQUEAR +3
              </button>
            </div>
          </div>
        </motion.div>

        <button 
          onClick={resetProgress}
          className="text-base text-brand-text-secondary/50 font-bold underline underline-offset-8 decoration-brand-border active:text-brand-text-primary transition-colors"
        >
          Recomeçar do início
        </button>
      </div>
    </ScreenWrapper>
  );
}
