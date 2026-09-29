import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScreenWrapper({ children, id }: { children: ReactNode, id: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="pb-32 pt-8 px-8 max-w-md mx-auto w-full min-h-[calc(100vh-80px)] relative z-10"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
