import { Home, Heart, Sparkles, HelpCircle } from 'lucide-react';
import { useApp } from '../AppContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'inicio' | 'reencontro' | 'extras' | 'ajuda';

export default function Navigation({ activeTab, onTabChange }: { activeTab: Tab, onTabChange: (tab: Tab) => void }) {
  const tabs = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'reencontro', label: 'Meu Reencontro', icon: Heart },
    { id: 'extras', label: 'Extras', icon: Sparkles },
    { id: 'ajuda', label: 'Ajuda', icon: HelpCircle },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-brand-offwhite/95 backdrop-blur-xl border-t border-brand-border safe-pb shadow-[0_-4px_30px_rgba(80,60,30,0.05)]">
      <div className="max-w-md mx-auto grid grid-cols-4 h-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90"
            >
              <Icon 
                size={24} 
                className={cn(
                  "transition-all duration-300",
                  isActive ? "text-brand-gold fill-brand-gold/10 scale-105" : "text-brand-text-secondary/50"
                )} 
              />
              <span className={cn(
                "text-[11px] font-bold tracking-tight transition-colors duration-300",
                isActive ? "text-brand-text-primary scale-105" : "text-brand-text-secondary/50"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
