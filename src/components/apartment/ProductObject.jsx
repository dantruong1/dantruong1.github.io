import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApartmentHover } from './ApartmentContext';

export function ProductObject({
  product,
  onSelect,
  onTriggerEasterEgg,
  children,
  x,
  y,
  width = 80,
  height = 80,
  labelOffsetX = 0,
  labelOffsetY = 0,
  shortLabel,
}) {
  const { hoveredProductId, setHoveredProductId } = useApartmentHover();
  const [localHovered, setLocalHovered] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const isHovered =
    hoveredProductId !== undefined && hoveredProductId !== null
      ? hoveredProductId === product?.id
      : localHovered;

  const handleMouseEnter = () => {
    setLocalHovered(true);
    if (setHoveredProductId && product?.id) {
      setHoveredProductId(product.id);
    }
  };

  const handleMouseLeave = () => {
    setLocalHovered(false);
    if (setHoveredProductId && product?.id) {
      setHoveredProductId((prev) => (prev === product.id ? null : prev));
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (product?.easterEgg) {
      setEasterEggActive(true);
      setTimeout(() => setEasterEggActive(false), 2500);
      if (onTriggerEasterEgg) {
        onTriggerEasterEgg(product.easterEgg);
      }
    }
    if (product && onSelect) {
      onSelect(product);
    }
  };

  const badgeEmoji = product?.badges?.[0]?.emoji || '✦';
  const labelText = shortLabel || product?.name || '';

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer group select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Object Drop Shadow Disc */}
      <motion.ellipse
        cx={width / 2}
        cy={height - 4}
        rx={isHovered ? width / 2.1 : width / 2.5}
        ry={isHovered ? 10 : 7}
        className="fill-espresso/15 dark:fill-black/40 transition-all duration-300 pointer-events-none"
      />

      {/* Easter Egg Ripple Effects */}
      {easterEggActive && product?.easterEgg === 'citrus-ripple' && (
        <motion.circle
          cx={width / 2}
          cy={height / 2}
          initial={{ r: 10, opacity: 0.9 }}
          animate={{ r: 90, opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="fill-amber-warm/30 stroke-amber-warm stroke-2 pointer-events-none"
        />
      )}

      {easterEggActive && product?.easterEgg === 'pulse' && (
        <motion.circle
          cx={width / 2}
          cy={height / 2}
          initial={{ r: 15, opacity: 1 }}
          animate={{ r: 45, opacity: 0 }}
          transition={{ repeat: 2, duration: 0.6 }}
          className="fill-matcha/40 stroke-matcha stroke-2 pointer-events-none"
        />
      )}

      {/* Main Interactive Object SVG Graphic */}
      <motion.g
        animate={{
          y: isHovered ? -6 : 0,
          rotate: isHovered ? -2 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        style={{ transformOrigin: `${width / 2}px ${height / 2}px` }}
      >
        {children}
      </motion.g>

      {/* Permanent Visible & Clickable Item Badge Label */}
      <foreignObject
        x={width / 2 - 60 + labelOffsetX}
        y={height + 2 + labelOffsetY}
        width={120}
        height={32}
        className="overflow-visible"
      >
        <div className="flex justify-center">
          <div
            onClick={handleClick}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium flex items-center gap-1 shadow-xs border transition-all cursor-pointer ${
              isHovered
                ? 'bg-espresso text-white border-white/40 scale-105 shadow-md'
                : 'bg-card/95 dark:bg-night-card/95 text-espresso dark:text-night-text border-espresso/15 dark:border-night-border group-hover:border-matcha'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta dark:bg-terracotta-glow animate-pulse" />
            <span>{badgeEmoji}</span>
            <span className="truncate max-w-[85px]">{labelText}</span>
          </div>
        </div>
      </foreignObject>

      {/* Expanded Hover Tooltip on Mouseover */}
      <AnimatePresence>
        {isHovered && (
          <foreignObject
            x={-70}
            y={-45}
            width={width + 140}
            height={45}
            className="overflow-visible pointer-events-none z-40"
          >
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.16 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="bg-espresso/95 dark:bg-night-card/95 text-white dark:text-night-text text-[11px] font-mono px-3 py-1.5 rounded-full shadow-xl border border-white/20 whitespace-nowrap flex items-center gap-1.5">
                <span>{badgeEmoji}</span>
                <span className="font-bold">{product?.name}</span>
                <span className="text-[9px] opacity-75 text-matcha-light">Click to inspect →</span>
              </div>
              <div className="w-2 h-2 bg-espresso/95 dark:bg-night-card/95 rotate-45 -mt-1" />
            </motion.div>
          </foreignObject>
        )}
      </AnimatePresence>
    </g>
  );
}
