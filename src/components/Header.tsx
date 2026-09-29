import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md px-6 h-20 flex items-center justify-center border-b border-brand-border safe-pt">
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-10 w-auto flex items-center justify-center"
      >
        <img 
          src="https://i.imgur.com/Y71PZfP.png" 
          alt="Eterniza Logo" 
          className="h-full w-auto object-contain"
        />
      </motion.div>
    </header>
  );
}
