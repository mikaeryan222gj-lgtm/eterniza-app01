import ScreenWrapper from '../components/ScreenWrapper';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const faqs = [
  {
    q: "Quais fotos devo escolher?",
    a: "Escolha fotos onde os rostos estejam nítidos, bem iluminados e de frente. Evite fotos com acessórios que cubram o rosto (óculos escuros, chapéus grandes) ou fotos muito distantes."
  },
  {
    q: "Meu resultado ficou estranho. O que faço?",
    a: "Isso pode acontecer se a foto original tiver baixa qualidade. Tente refazer o processo usando uma foto mais nítida ou mude o cenário de preparação."
  },
  {
    q: "Posso criar com fotos antigas?",
    a: "Sim! Fotos antigas funcionam muito bem, desde que o rosto esteja reconhecível. Se a foto estiver muito danificada, recomendamos usar um aplicativo de restauração antes."
  },
  {
    q: "Posso criar outro reencontro?",
    a: "Com certeza. Você pode adquirir novos créditos de reencontro na aba 'Extras' para criar lembranças com outras pessoas especiais."
  },
  {
    q: "Como salvo meu vídeo?",
    a: "Após a geração na ferramenta externa, você verá um botão de download (geralmente uma seta para baixo ou ícone de compartilhar). Salve no seu rolo de câmera para guardar para sempre."
  }
];

function AccordionItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-brand-border">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-7 flex items-center justify-between text-left active:bg-brand-cream px-2 rounded-2xl transition-all duration-300 active:scale-[0.98]"
      >
        <span className={cn(
          "text-lg font-bold pr-6 leading-tight transition-colors duration-300",
          isOpen ? "text-brand-gold" : "text-brand-text-primary"
        )}>{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown 
            size={22} 
            className="text-brand-gold"
            strokeWidth={3}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-lg text-brand-text-secondary pb-8 pt-2 px-2 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AjudaTab() {
  return (
    <ScreenWrapper id="tab-ajuda">
      <h2 className="text-3xl font-medium mb-10 leading-tight text-brand-text-primary">Estamos aqui para ajudar.</h2>
      
      <div className="mb-16 space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>

      <div className="bg-brand-offwhite border border-brand-border rounded-[3rem] p-10 shadow-sm text-center">
        <h3 className="text-2xl font-medium mb-3 text-brand-text-primary">Ainda precisa de ajuda?</h3>
        <p className="text-lg text-brand-text-secondary mb-10 leading-relaxed">Nossa equipe de suporte está pronta para te atender.</p>
        
        <button className="gold-button w-full h-16 text-base font-bold uppercase tracking-widest">
          <MessageSquare size={24} />
          FALAR COM O SUPORTE
        </button>
      </div>
    </ScreenWrapper>
  );
}
