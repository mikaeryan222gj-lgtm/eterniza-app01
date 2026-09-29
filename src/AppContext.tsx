import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AppState = {
  currentStep: number;
  introSeen: boolean;
  selectedScenarioId: string | null;
  photosReady: boolean;
  photo1Checked: boolean;
  photo2Checked: boolean;
  instructionCopied: boolean;
  tutorialSeen: boolean;
  reencontroCompleted: boolean;
  reunionCompleted: boolean;
  purchasedReencontros: number;
};

type AppContextType = {
  state: AppState;
  setStep: (step: number) => void;
  updateState: (updates: Partial<AppState>) => void;
  resetProgress: () => void;
};

const initialState: AppState = {
  currentStep: 0,
  introSeen: false,
  selectedScenarioId: null,
  photosReady: false,
  photo1Checked: false,
  photo2Checked: false,
  instructionCopied: false,
  tutorialSeen: false,
  reencontroCompleted: false,
  reunionCompleted: false,
  purchasedReencontros: 1,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('eterniza_state');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('eterniza_state', JSON.stringify(state));
  }, [state]);

  const setStep = (step: number) => setState(prev => ({ ...prev, currentStep: step }));
  
  const updateState = (updates: Partial<AppState>) => setState(prev => ({ ...prev, ...updates }));

  const resetProgress = () => setState(initialState);

  return (
    <AppContext.Provider value={{ state, setStep, updateState, resetProgress }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
