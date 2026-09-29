import { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import ScreenWrapper from '../components/ScreenWrapper';
import StepProgress from '../components/StepProgress';
import { Check, Copy, ExternalLink, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const scenarioPrompts: Record<string, string> = {
  clouds: "Instrução: Crie um vídeo de reencontro emocionante em um ambiente sereno entre as nuvens, com iluminação angelical e cores suaves.",
  jesus: "Instrução: Crie um vídeo de reencontro simbólico e acolhedor ao lado de Jesus, com uma atmosfera de paz profunda e luz divina.",
  stairs: "Instrução: Crie um vídeo de reencontro em uma escadaria majestosa cercada por nuvens e luz dourada, simbolizando uma recepção celestial."
};

const googleFlowUrl = "https://flow.google.com/"; // URL_DO_GOOGLE_FLOW placeholder

export default function CreationScreen() {
  const { state, updateState, setStep } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const prompt = scenarioPrompts[state.selectedScenarioId || 'clouds'];
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    updateState({ instructionCopied: true });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenFlow = () => {
    localStorage.setItem('flowOpened', 'true');
    localStorage.setItem('flowOpenedAt', new Date().toISOString());
    window.open(googleFlowUrl, "_blank");
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const flowOpened = localStorage.getItem('flowOpened');
        if (flowOpened === 'true') {
          localStorage.removeItem('flowOpened');
          updateState({ reencontroCompleted: true });
        }
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [updateState]);

  if (!state.tutorialSeen) {
    return (
      <ScreenWrapper id="tutorial">
        <div className="flex flex-col">
          <button 
            onClick={() => setStep(2)}
            className="w-12 h-12 -ml-3 mb-4 flex items-center justify-center text-brand-text-secondary/50 active:text-brand-text-primary transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <h2 className="text-3xl font-medium mb-8 text-balance leading-tight text-brand-text-primary">
            GUIA RÁPIDO — COMO CRIAR SEU REENCONTRO ❤️
          </h2>

          <div className="space-y-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-5"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-offwhite flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">1</div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-brand-text-primary leading-none">Separe 2 fotos</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">
                  Escolha duas fotos das pessoas que você deseja colocar no reencontro. 
                </p>
                <p className="text-brand-text-secondary text-sm font-medium leading-relaxed opacity-80">
                  Dê preferência para fotos em que os rostos estejam bem visíveis e com boa qualidade.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-5"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-offwhite flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">2</div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-brand-text-primary leading-none">Escolha o cenário</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">
                  Dentro da Área Eterniza, escolha o cenário que você mais gostou:
                </p>
                <div className="bg-brand-cream border border-brand-border rounded-2xl p-4 mt-2 space-y-2 text-sm font-semibold">
                  <p className="flex items-center gap-2">☁️ Reencontro nas Nuvens</p>
                  <p className="flex items-center gap-2">❤️ Reencontro com Jesus</p>
                  <p className="flex items-center gap-2">✨ Escadaria nas Nuvens</p>
                </div>
                <p className="text-brand-text-secondary text-base leading-relaxed mt-2">
                  Depois, copie a instrução preparada para aquele cenário.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-5"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-offwhite flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">3</div>
              <div className="space-y-4 w-full">
                <h3 className="text-xl font-bold text-brand-text-primary leading-none">Abra o Google Flow</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">
                  Clique no botão abaixo para acessar o Google Flow.
                </p>
                <button 
                  onClick={handleOpenFlow}
                  className="gold-button w-full h-16 text-base gold-shimmer font-bold"
                >
                  CRIAR MEU REENCONTRO ❤️
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-5"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-offwhite flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">4</div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-brand-text-primary leading-none">Adicione suas 2 fotos</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">
                  Dentro do Google Flow, envie as duas fotos que você separou. 
                </p>
                <p className="text-brand-text-secondary text-sm font-medium leading-relaxed opacity-80">
                  Aguarde o carregamento das imagens antes de continuar.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-5"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-offwhite flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">5</div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-brand-text-primary leading-none">Cole a instrução</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">
                  Volte para a Área Eterniza, copie a instrução do cenário escolhido e cole no campo indicado no Google Flow. 
                </p>
                <p className="text-brand-text-secondary text-sm font-medium leading-relaxed opacity-80">
                  Depois, envie para gerar o vídeo.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-5"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-offwhite flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">6</div>
              <div className="space-y-3 w-full">
                <h3 className="text-xl font-bold text-brand-text-primary leading-none">Aguarde o resultado</h3>
                <p className="text-brand-text-secondary text-base leading-relaxed">
                  O processamento pode levar alguns instantes. Quando o vídeo estiver pronto, confira o resultado e salve no seu celular. ❤️
                </p>
                <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-2xl p-5 mt-2">
                  <p className="text-sm italic text-brand-gold-dark font-semibold leading-relaxed">
                    Dica: Se o primeiro resultado não ficar exatamente como você imaginou, você pode tentar novamente usando as mesmas fotos e instrução.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-brand-offwhite border-2 border-brand-border rounded-[2.5rem] p-10 mb-12 text-center shadow-md"
          >
            <h4 className="text-lg font-bold text-brand-text-primary mb-3 uppercase tracking-wider">
              ❤️ SEU REENCONTRO ESTÁ A POUCOS PASSOS
            </h4>
            <p className="text-brand-text-secondary text-base font-medium mb-8">
              2 fotos → 1 instrução → 1 reencontro
            </p>
            <button 
              onClick={handleOpenFlow}
              className="gold-button w-full h-20 text-xl gold-shimmer font-bold"
            >
              CRIAR MEU REENCONTRO ❤️
            </button>
          </motion.div>

          <button 
            onClick={() => updateState({ tutorialSeen: true })}
            className="secondary-button w-full h-20 text-lg mb-12 font-bold"
          >
            ENTENDI O PASSO A PASSO
          </button>
        </div>
      </ScreenWrapper>
    );
  }

  const checklist = [
    { text: "Tenho minhas duas fotos", completed: state.photo1Checked && state.photo2Checked },
    { text: "Escolhi meu cenário", completed: !!state.selectedScenarioId },
    { text: "Instrução copiada", completed: state.instructionCopied },
  ];

  return (
    <ScreenWrapper id="creation-final">
      <div className="flex flex-col">
        <button 
          onClick={() => updateState({ tutorialSeen: false })}
          className="w-12 h-12 -ml-3 mb-4 flex items-center justify-center text-brand-text-secondary/50 active:text-brand-text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <h2 className="text-3xl font-medium mb-3 text-balance leading-tight text-brand-text-primary">Preparamos tudo para você ❤️</h2>
        <p className="text-brand-text-secondary text-lg mb-10 leading-relaxed">
          Agora você só precisa seguir alguns passos simples.
        </p>

        <div className="premium-card p-8 mb-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-black text-brand-text-secondary/50 uppercase tracking-[0.2em] block mb-1">Seu cenário selecionado:</span>
              <h3 className="text-xl font-bold text-brand-text-primary">{scenarios.find(s => s.id === state.selectedScenarioId)?.title || "Cenário"}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
              <Check size={24} strokeWidth={3} />
            </div>
          </div>

          <div className="bg-brand-cream border border-brand-border rounded-2xl p-6 mb-8">
            <h4 className="text-[11px] font-black text-brand-gold uppercase tracking-[0.2em] mb-4">Sua instrução</h4>
            <p className="text-sm text-brand-text-primary italic mb-6 leading-relaxed">
              "{scenarioPrompts[state.selectedScenarioId || 'clouds']}"
            </p>
            <p className="text-[11px] text-brand-text-secondary/50 font-medium leading-relaxed mb-8">
              Ela diz à ferramenta como criar o seu reencontro.
            </p>
            
            <button
              onClick={handleCopy}
              className={cn(
                "w-full h-16 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 border-2 text-lg font-bold active:scale-95",
                copied 
                  ? "bg-brand-gold text-brand-offwhite border-brand-gold shadow-lg shadow-brand-gold/20" 
                  : "bg-brand-offwhite text-brand-text-primary border-brand-border hover:border-brand-gold shadow-sm"
              )}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <Check size={24} strokeWidth={3} />
                    <span>INSTRUÇÃO COPIADA ✓</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <Copy size={22} className="text-brand-gold" />
                    <span>COPIAR MINHA INSTRUÇÃO</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence>
            {copied && (
              <>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-center"
                >
                  <p className="text-lg font-bold text-brand-gold">Perfeito! Agora vamos criar.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 20, x: "-50%" }}
                  className="fixed bottom-24 left-1/2 bg-brand-text-primary text-brand-offwhite px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 whitespace-nowrap border border-brand-border/20"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center">
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <span className="text-base font-bold">Instrução copiada!</span>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-brand-border/30 border border-brand-border rounded-[2.5rem] p-8 mb-12">
          <h4 className="text-[11px] font-black text-brand-text-primary uppercase tracking-[0.2em] mb-6">Antes de continuar:</h4>
          <ul className="space-y-5">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-center gap-5">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-brand-offwhite shrink-0 shadow-sm",
                  item.completed ? "bg-brand-gold" : "bg-brand-offwhite border-2 border-brand-border"
                )}>
                  {item.completed && <Check size={16} strokeWidth={4} />}
                </div>
                <span className={cn(
                  "text-lg font-bold",
                  item.completed ? "text-brand-text-primary" : "text-brand-text-secondary/50"
                )}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          disabled={!state.instructionCopied}
          onClick={handleOpenFlow}
          className={cn(
            "gold-button w-full h-20 text-xl gold-shimmer mb-6",
            !state.instructionCopied && "opacity-50 grayscale cursor-not-allowed"
          )}
        >
          {state.instructionCopied && localStorage.getItem('flowOpenedAt') ? "TENTAR NOVAMENTE NO GOOGLE FLOW" : "CRIAR MEU REENCONTRO ❤️"}
          <ExternalLink size={20} strokeWidth={3} />
        </button>
        
        <p className="text-center text-sm text-brand-text-secondary/50 font-bold leading-relaxed px-10">
          Suas fotos e sua instrução já estão prontas? Então é só seguir o tutorial.
        </p>
      </div>
    </ScreenWrapper>
  );
}

const scenarios = [
  { id: 'clouds', title: 'Reencontro nas Nuvens' },
  { id: 'jesus', title: 'Reencontro com Jesus' },
  { id: 'stairs', title: 'Escadaria nas Nuvens' }
];
