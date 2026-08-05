import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductObject({
  product,
  onSelect,
  onTriggerEasterEgg,
  children,
  x,
  y,
  width = 80,
  height = 80,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (product.easterEgg) {
      setEasterEggActive(true);
      setTimeout(() => setEasterEggActive(false), 2500);
      if (onTriggerEasterEgg) {
        onTriggerEasterEgg(product.easterEgg);
      }
    }
    onSelect(product);
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Product Highlight / Hover Shadow Disc */}
      <motion.ellipse
        cx={width / 2}
        cy={height - 4}
        rx={isHovered ? width / 2.2 : width / 2.6}
        ry={isHovered ? 10 : 7}
        className="fill-espresso/15 dark:fill-black/40 transition-all duration-300 pointer-events-none"
      />

      {/* Special Easter Egg Visual Effects */}
      {easterEggActive && product.easterEgg === 'citrus-ripple' && (
        <motion.circle
          cx={width / 2}
          cy={height / 2}
          initial={{ r: 10, opacity: 0.9 }}
          animate={{ r: 90, opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="fill-amber-warm/30 stroke-amber-warm stroke-2 pointer-events-none"
        />
      )}

      {easterEggActive && product.easterEgg === 'pulse' && (
        <motion.circle
          cx={width / 2}
          cy={height / 2}
          initial={{ r: 15, opacity: 1 }}
          animate={{ r: 45, opacity: 0 }}
          transition={{ repeat: 2, duration: 0.6 }}
          className="fill-matcha/40 stroke-matcha stroke-2 pointer-events-none"
        />
      )}

      {/* Main Object Body with Framer Motion Lift & Hover */}
      <motion.g
        animate={{
          y: isHovered ? -6 : 0,
          rotate: isHovered ? -2 : 0,
          scale: isHovered ? 1.06 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        style={{ transformOrigin: `${width / 2}px ${height / 2}px` }}
      >
        {children}
      </motion.g>

      {/* Screen Glow / Special Hover Overlay */}
      {isHovered && product.iconName === 'laptop' && (
        <rect
          x={width * 0.2}
          y={height * 0.15}
          width={width * 0.6}
          height={height * 0.35}
          rx={3}
          className="fill-blue-400/30 animate-pulse pointer-events-none"
        />
      )}

      {/* Floating Product Name Badge Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <foreignObject
            x={-60}
            y={-40}
            width={width + 120}
            height={45}
            className="overflow-visible pointer-events-none z-30"
          >
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="bg-espresso/90 dark:bg-night-card/95 text-white dark:text-night-text text-[11px] font-mono px-3 py-1.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-1.5">
                <span>{product.badges?.[0]?.emoji || '✦'}</span>
                <span className="font-semibold">{product.name}</span>
              </div>
              <div className="w-2 h-2 bg-espresso/90 dark:bg-night-card/95 rotate-45 -mt-1" />
            </motion.div>
          </foreignObject>
        )}
      </AnimatePresence>
    </g>
  );
}
