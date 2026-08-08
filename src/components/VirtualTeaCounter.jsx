import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Card } from './ui/card';

export function VirtualTeaCounter({ variant = 'card' }) {
  const [teaCount, setTeaCount] = useState(() => {
    const saved = localStorage.getItem('dan_tea_count');
    return saved ? parseInt(saved, 10) : 107;
  });

  const [particles, setParticles] = useState([]);
  const [justPoured, setJustPoured] = useState(false);

  const pourTea = (e) => {
    e.stopPropagation();
    const newCount = teaCount + 1;
    setTeaCount(newCount);
    localStorage.setItem('dan_tea_count', newCount.toString());

    // Create a floating particle
    const id = Date.now() + Math.random();
    const newParticle = {
      id,
      x: (Math.random() - 0.5) * 50,
      emoji: Math.random() > 0.5 ? '🍵' : '💚',
    };

    setParticles((prev) => [...prev.slice(-6), newParticle]);
    setJustPoured(true);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1100);

    setTimeout(() => {
      setJustPoured(false);
    }, 2000);
  };

  // Compact Variant (Navbar / Pill)
  if (variant === 'compact') {
    return (
      <div className="relative inline-block select-none">
        <button
          onClick={pourTea}
          className="group flex items-center gap-2 bg-mocha-soft/70 dark:bg-night-card-alt hover:bg-mocha-soft dark:hover:bg-night-card text-espresso dark:text-night-text px-3.5 py-1.5 rounded-full border border-mocha-light/40 dark:border-night-border transition-all duration-200 hover:scale-105 shadow-xs cursor-pointer text-xs font-mono"
          title="Pour Dan a virtual cup of green tea!"
        >
          <span className="text-sm group-hover:rotate-12 transition-transform">🍵</span>
          <span className="font-medium whitespace-nowrap">Pour Tea ({teaCount})</span>
        </button>

        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -32, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute -top-3 left-1/2 pointer-events-none text-xs select-none"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // Full Designer Card Variant (Sidebars & About section)
  return (
    <Card className="p-5 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border relative overflow-hidden shadow-cozy hover:border-matcha/40 transition-all duration-300 select-none">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-matcha-soft/30 dark:bg-matcha-dark/20 rounded-full blur-xl pointer-events-none" />

      {/* Top Header Row: Icon + Count Pill */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-matcha-soft dark:bg-matcha-dark/40 flex items-center justify-center text-lg border border-matcha/20 shadow-xs">
            🍵
          </div>
          <span className="font-mono text-[11px] font-bold text-matcha-dark dark:text-matcha-glow uppercase tracking-wider">
            Green Tea Counter
          </span>
        </div>

        <span className="font-mono text-xs font-semibold text-espresso dark:text-night-text bg-parchment-dark dark:bg-night-card-alt px-2.5 py-1 rounded-full border border-espresso/8 dark:border-night-border whitespace-nowrap shrink-0 shadow-xs">
          {teaCount} cups 🫖
        </span>
      </div>

      {/* Main Copy */}
      <div className="mb-4">
        <h4 className="font-serif text-base font-bold text-espresso dark:text-night-text leading-snug">
          Pour Dan a Virtual Tea
        </h4>
        <p className="text-xs text-espresso-muted dark:text-night-muted font-sans leading-relaxed mt-1">
          {justPoured
            ? 'Ah, warm & cozy! Thank you for the tea! 💚'
            : 'Fueled daily by matcha, green tea & lofi beats.'}
        </p>
      </div>

      {/* Interactive Action Button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={pourTea}
          className="w-full py-2.5 px-4 rounded-full bg-matcha text-white dark:bg-matcha-dark dark:text-night-text hover:bg-matcha-dark dark:hover:bg-matcha flex items-center justify-center gap-2 text-xs font-mono font-semibold shadow-xs transition-all duration-200 cursor-pointer border border-matcha/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-warm animate-pulse" />
          <span>{justPoured ? 'Tea Poured! (+1) 🍵' : 'Pour a Cup 🍵'}</span>
        </motion.button>

        {/* Floating Steam Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -45, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute -top-4 left-1/2 pointer-events-none text-base select-none z-30"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
