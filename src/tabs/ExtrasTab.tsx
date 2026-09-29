import ScreenWrapper from '../components/ScreenWrapper';
import { Sparkles, Lock, Heart } from 'lucide-react';
import { useApp } from '../AppContext';

export default function ExtrasTab({ onNavigateToInicio }: { onNavigateToInicio: () => void }) {
  const { state } = useApp();

  return (
    <ScreenWrapper id="tab-extras">
      <h2 className="text-3xl font-medium mb-3 text-balance leading-tight text-brand-text-primary">Continue eternizando momentos ❤️</h2>
      <p className="text-brand-text-secondary text-lg mb-10 leading-relaxed">Explore outras formas de manter viva a memória de quem você ama.</p>

      <div className="space-y-6">
        {/* Item 1 - Already Owned */}
        <div className="bg-brand-offwhite p-8 rounded-[2.5rem] border border-brand-border relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-brand-cream flex items-center justify-center text-brand-gold border border-brand-border shadow-sm">
              <Heart size={32} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-brand-text-primary">Reencontro Principal</h3>
              <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.2em]">LIBERADO ✓</span>
            </div>
          </div>
          <button 
            onClick={onNavigateToInicio}
            className="secondary-button w-full h-14 text-sm uppercase tracking-widest"
          >
            Acessar
          </button>
        </div>

        {/* Item 2 - Upsell 1 */}
        <div className="bg-brand-offwhite p-8 rounded-[2.5rem] border border-brand-border relative overflow-hidden group opacity-90 shadow-sm hover:opacity-100 transition-all">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-brand-cream flex items-center justify-center text-brand-text-secondary/50 border border-brand-border">
              <Lock size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-brand-text-primary">Segundo Reencontro</h3>
              <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.2em]">Disponível por R$9,90</span>
            </div>
          </div>
          <button className="gold-button w-full h-14 text-sm uppercase tracking-widest">
            Desbloquear
          </button>
        </div>

        {/* Item 3 - Upsell 3 */}
        <div className="bg-brand-offwhite p-8 rounded-[2.5rem] border-4 border-brand-gold relative overflow-hidden group shadow-xl shadow-brand-gold/5">
          <div className="absolute top-0 right-0 bg-brand-gold text-brand-offwhite text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-[1.2rem] tracking-[0.1em]">
            RECOMENDADO
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-brand-cream flex items-center justify-center text-brand-gold border border-brand-gold/20">
              <Sparkles size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-brand-text-primary">Pacote +3 Reencontros</h3>
              <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.2em]">Disponível por R$16,90</span>
            </div>
          </div>
          <button className="gold-button w-full h-14 text-sm uppercase tracking-widest gold-shimmer">
            Desbloquear
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
