import React from 'react';
import { motion } from 'framer-motion';

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

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-cozy-lg z-10">
      {/* Sunlight Beam across floor (Day) or Moonlight (Night) */}
      <motion.div
        animate={{
          opacity: isNightMode ? [0.15, 0.25, 0.15] : [0.25, 0.35, 0.25],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className={`absolute top-0 left-1/4 w-3/5 h-full opacity-25 transform -rotate-12 origin-top-left ${
          isNightMode
            ? 'bg-gradient-to-b from-blue-400/20 via-indigo-500/10 to-transparent'
            : 'bg-gradient-to-b from-amber-warm/30 via-amber-light/20 to-transparent'
        }`}
        style={{ filter: 'blur(30px)' }}
      />

      {/* Floating Dust Particles */}
      {!isNightMode &&
        dustParticles.map((pt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-10, -35, -60],
              x: [0, (idx % 2 === 0 ? 12 : -12), 0],
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

      {/* Night mode dark sky overlay filter */}
      {isNightMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-slate-950/70 mix-blend-multiply rounded-cozy-lg"
        />
      )}
    </div>
  );
}
