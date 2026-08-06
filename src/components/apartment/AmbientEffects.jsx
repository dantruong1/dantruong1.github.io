import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AmbientEffects({ isNightMode }) {
  // Dust particles floating in sunlight
  const dustParticles = [
    { x: '18%', y: '25%', size: 3, delay: 0 },
    { x: '22%', y: '45%', size: 2, delay: 1.2 },
    { x: '30%', y: '35%', size: 4, delay: 2.5 },
    { x: '35%', y: '60%', size: 2, delay: 0.8 },
    { x: '45%', y: '40%', size: 3, delay: 1.8 },
    { x: '50%', y: '70%', size: 2.5, delay: 3.1 },
    { x: '65%', y: '30%', size: 3, delay: 2.0 },
    { x: '72%', y: '50%', size: 2, delay: 0.5 },
  ];

  // Cozy evening stars / glow specks
  const nightSpecks = [
    { x: '15%', y: '20%', delay: 0.2 },
    { x: '35%', y: '15%', delay: 1.5 },
    { x: '58%', y: '22%', delay: 0.8 },
    { x: '78%', y: '18%', delay: 2.1 },
    { x: '25%', y: '65%', delay: 1.1 },
    { x: '70%', y: '75%', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-cozy-lg z-10">
      {/* Sunlight Beam across floor (Day) or Moonlight Beam (Night) */}
      <motion.div
        animate={{
          opacity: isNightMode ? [0.2, 0.35, 0.2] : [0.25, 0.35, 0.25],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className={`absolute top-0 left-1/4 w-3/5 h-full transform -rotate-12 origin-top-left ${
          isNightMode
            ? 'bg-gradient-to-b from-indigo-500/20 via-sky-400/10 to-transparent'
            : 'bg-gradient-to-b from-amber-warm/30 via-amber-light/20 to-transparent'
        }`}
        style={{ filter: 'blur(30px)' }}
      />

      {/* Floating Dust Particles (Day Mode) */}
      {!isNightMode &&
        dustParticles.map((pt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-10, -35, -60],
              x: [0, idx % 2 === 0 ? 12 : -12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6 + (idx % 3),
              delay: pt.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-amber-warm/60 dark:bg-amber-light/40"
            style={{
              left: pt.x,
              top: pt.y,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}

      {/* Cozy Evening Ambient Glows & Warm Lamp Spotlights (Night Mode) */}
      <AnimatePresence>
        {isNightMode && (
          <>
            {/* Soft Ambient Tint overlay (no text destruction) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-indigo-950/25 dark:bg-slate-950/35 rounded-cozy-lg"
            />

            {/* Office Warm Desk Lamp Pool of Light */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.6, 0.85, 0.6], scale: [1, 1.05, 1] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute top-[12%] left-[10%] w-[160px] h-[160px] rounded-full bg-amber-400/25 blur-2xl"
            />

            {/* Bedroom Cozy Nightstand Lamp Pool of Light */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.5, 0.75, 0.5], scale: [1, 1.04, 1] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: 'easeInOut' }}
              className="absolute top-[12%] left-[54%] w-[150px] h-[150px] rounded-full bg-amber-300/20 blur-2xl"
            />

            {/* Night Sky Twinkling Accents */}
            {nightSpecks.map((sp, idx) => (
              <motion.div
                key={idx}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5 + (idx % 2),
                  delay: sp.delay,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_6px_#fef08a]"
                style={{ left: sp.x, top: sp.y }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
