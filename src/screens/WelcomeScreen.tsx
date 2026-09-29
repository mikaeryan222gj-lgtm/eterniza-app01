import { useApp } from '../AppContext';
import ScreenWrapper from '../components/ScreenWrapper';
import StepProgress from '../components/StepProgress';
import { ArrowRight, Sparkles, Image as ImageIcon, Video } from 'lucide-react';
import { motion } from 'motion/react';

export default function WelcomeScreen() {
  const { state, updateState, setStep } = useApp();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (!state.introSeen) {
    return (
      <ScreenWrapper id="intro">
        <div className="flex flex-col">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-medium mb-6 text-balance"
          >
            Como funciona?
          </motion.h2>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 mb-12"
          >
            <motion.div variants={item} className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-border shadow-sm flex items-center justify-center shrink-0 text-brand-gold">
                <ImageIcon size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-brand-text-primary">1. PREPARE</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">Escolha duas fotos especiais para o reencontro.</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-border shadow-sm flex items-center justify-center shrink-0 text-brand-gold">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-brand-text-primary">2. PERSONALIZE</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">Escolha como deseja representar esse momento.</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-border shadow-sm flex items-center justify-center shrink-0 text-brand-gold">
                <Video size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-brand-text-primary">3. CRIE</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">Siga nosso passo a passo para transformar as fotos em vídeo.</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
            className="bg-brand-offwhite/50 border border-brand-border rounded-3xl p-6 mb-12"
          >
            <p className="text-lg text-center text-brand-text-primary font-medium">
              “Não se preocupe. Vamos acompanhar você em cada etapa.”
            </p>
          </motion.div>

          <motion.button
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.6 }}
            onClick={() => updateState({ introSeen: true })}
            className="gold-button w-full"
          >
            COMEÇAR
            <ArrowRight size={22} />
          </motion.button>
        </div>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper id="welcome">
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-12 shadow-md border border-brand-border"
        >
          <img 
            src="https://i.imgur.com/sPkIl0G.jpg" 
            alt="Memórias Eterniza" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-medium mb-6 text-balance leading-tight text-brand-text-primary"
        >
          Seu reencontro começa aqui. ❤️
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-brand-text-secondary text-lg mb-10 px-4 leading-relaxed"
        >
          Preparamos tudo para ajudar você a transformar suas fotos em uma lembrança especial.
        </motion.p>

        <StepProgress />

        <div className="w-full mt-12 space-y-5">
          <motion.button
            initial={false}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(1)}
            className="gold-button w-full gold-shimmer shadow-[0_8px_30px_rgba(205,166,83,0.15)]"
          >
            COMEÇAR MEU REENCONTRO
            <ArrowRight size={22} />
          </motion.button>
          
          <p className="text-[11px] text-brand-text-secondary/50 font-black uppercase tracking-[0.2em]">
            Leva apenas alguns minutos
          </p>
        </div>
      </div>
    </ScreenWrapper>
  );
}
