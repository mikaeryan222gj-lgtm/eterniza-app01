/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './AppContext';
import Navigation from './components/Navigation';
import Header from './components/Header';
import WelcomeScreen from './screens/WelcomeScreen';
import PhotoSelectionScreen from './screens/PhotoSelectionScreen';
import PreparationScreen from './screens/PreparationScreen';
import CreationScreen from './screens/CreationScreen';
import FinalizationScreen from './screens/FinalizationScreen';
import ReencontroTab from './tabs/ReencontroTab';
import ExtrasTab from './tabs/ExtrasTab';
import AjudaTab from './tabs/AjudaTab';
import { AnimatePresence, motion } from 'motion/react';

type Tab = 'inicio' | 'reencontro' | 'extras' | 'ajuda';

function AppContent() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('inicio');

  // Helper to determine which screen to show in the "Início" tab based on step
  const renderInicioScreen = () => {
    if (state.reencontroCompleted) return <FinalizationScreen />;
    
    switch (state.currentStep) {
      case 0: return <WelcomeScreen />;
      case 1: return <PhotoSelectionScreen />;
      case 2: return <PreparationScreen />;
      case 3: return <CreationScreen />;
      default: return <WelcomeScreen />;
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'inicio': return renderInicioScreen();
      case 'reencontro': return <ReencontroTab />;
      case 'extras': return <ExtrasTab onNavigateToInicio={() => setActiveTab('inicio')} />;
      case 'ajuda': return <AjudaTab />;
      default: return renderInicioScreen();
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-text-secondary selection:bg-brand-gold/20 relative overflow-x-hidden">
      <Header />
      <main className="max-w-md mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (activeTab === 'inicio' ? (state.reencontroCompleted ? 'final' : state.currentStep + (state.currentStep === 0 && !state.introSeen ? 'intro' : '') + (state.currentStep === 3 && !state.tutorialSeen ? 'tutorial' : '')) : '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-particles" />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-brand-gold blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] bg-brand-gold blur-[100px] rounded-full" 
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

