import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function VirtualTeaCounter({ variant = 'card' }) {
  const [teaCount, setTeaCount] = useState(() => {
    const saved = localStorage.getItem('dan_tea_count');
    return saved ? parseInt(saved, 10) : 88;
  });

  const [particles, setParticles] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);

  const pourTea = (e) => {
    const newCount = teaCount + 1;
    setTeaCount(newCount);
    localStorage.setItem('dan_tea_count', newCount.toString());

    // Create floating particle
    const id = Date.now() + Math.random();
    const newParticle = {
      id,
      x: (Math.random() - 0.5) * 40,
    };

    setParticles((prev) => [...prev.slice(-8), newParticle]);
    setShowThankYou(true);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  if (variant === 'compact') {
    return (
      <div className="relative inline-block">
        <button
          onClick={pourTea}
          className="group flex items-center gap-2 bg-mocha-soft/60 dark:bg-night-card-alt hover:bg-mocha-soft dark:hover:bg-night-card text-espresso dark:text-night-text px-3 py-1.5 rounded-full border border-mocha-light/40 dark:border-night-border transition-all duration-200 hover:scale-105 shadow-xs cursor-pointer text-xs font-mono"
          title="Pour Dan a virtual cup of green tea!"
        >
          <span className="text-base group-hover:rotate-12 transition-transform duration-200">🍵</span>
          <span>Pour Tea ({teaCount})</span>
        </button>

        {/* Floating Steam Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -35, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute -top-3 left-1/2 pointer-events-none text-sm select-none"
            >
              ✨ 🍵
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={pourTea}
        className="p-5 bg-mocha-soft/50 dark:bg-night-card-alt border border-mocha-light/40 dark:border-night-border rounded-cozy flex items-center justify-between gap-4 cursor-pointer group shadow-cozy hover:border-matcha/50 transition-all duration-300 relative select-none"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-cozy bg-matcha-soft dark:bg-matcha-dark/40 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs border border-matcha/20">
            🍵
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm md:text-base font-bold text-espresso dark:text-night-text group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors">
                Pour Dan Virtual Green Tea
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-warm animate-pulse" />
            </div>
            <p className="text-xs text-espresso-muted dark:text-night-muted font-sans mt-0.5">
              {showThankYou ? 'Ah, warm & cozy! Thank you for the tea! 💚' : 'Fueled by daily matcha & green tea'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs font-bold text-matcha-dark dark:text-matcha-glow bg-matcha-soft dark:bg-matcha-dark/40 px-3 py-1.5 rounded-full border border-matcha/20 shadow-xs">
            {teaCount} cups 🫖
          </span>
        </div>

        {/* Floating Steam Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -45, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute top-2 left-8 pointer-events-none text-base select-none z-20"
            >
              💚 🍵
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
