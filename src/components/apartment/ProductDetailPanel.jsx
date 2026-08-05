import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, MapPin, Tag } from 'lucide-react';
import { Badge } from '../ui/badge';

export function ProductDetailPanel({ product, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-espresso/40 dark:bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Panel */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="relative z-10 w-full max-w-md bg-card dark:bg-night-card border-l border-espresso/10 dark:border-night-border h-full overflow-y-auto p-6 md:p-8 flex flex-col justify-between shadow-2xl"
        >
          {/* Header & Close */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-espresso-muted dark:text-night-muted uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-terracotta dark:text-terracotta-glow" />
                  {product.roomLabel}
                </span>
                <span className="text-espresso-muted/40 dark:text-night-muted/40">•</span>
                <span className="font-mono text-xs text-matcha-dark dark:text-matcha-glow font-medium flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {product.category}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-parchment-dark dark:bg-night-card-alt flex items-center justify-center text-espresso dark:text-night-text hover:scale-105 transition-all"
                aria-label="Close detail panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Product Title & Brand */}
            <div className="mb-5">
              <span className="font-mono text-xs font-semibold text-terracotta dark:text-terracotta-glow uppercase tracking-wide block mb-1">
                {product.brand}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-espresso dark:text-night-text tracking-tight leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  variant={badge.variant === 'terracotta' ? 'terracotta' : 'matcha'}
                  className="text-xs py-1 px-3 flex items-center gap-1.5 font-medium shadow-xs"
                >
                  <span>{badge.emoji}</span>
                  <span>{badge.label}</span>
                </Badge>
              ))}
            </div>

            {/* Main Recommendation Card */}
            <div className="bg-mocha-soft/50 dark:bg-night-card-alt border border-espresso/8 dark:border-night-border rounded-cozy p-5 mb-6 relative overflow-hidden shadow-inner-warm">
              <div className="washi-tape washi-tape-top-left" />

              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-matcha-dark dark:text-matcha-glow mb-2 block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-warm" />
                Why I Recommend It
              </span>

              <p className="text-sm md:text-[15px] font-sans text-espresso dark:text-night-text leading-relaxed italic">
                "{product.recommendation}"
              </p>
            </div>

            {/* Who It's For */}
            {product.whoItsFor && (
              <div className="mb-6 space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-espresso-muted dark:text-night-muted font-semibold block">
                  Ideal For
                </span>
                <p className="text-xs sm:text-sm font-sans text-espresso-light dark:text-night-muted leading-relaxed">
                  {product.whoItsFor}
                </p>
              </div>
            )}
          </div>

          {/* Footer Purchase Action */}
          <div className="pt-6 mt-6 border-t border-espresso/10 dark:border-night-border">
            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-matcha hover:bg-matcha-dark dark:bg-matcha-dark dark:hover:bg-matcha text-white font-mono text-xs sm:text-sm py-3.5 px-5 rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>View Official Product Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[10px] font-mono text-espresso-muted/60 dark:text-night-muted/60 text-center block mt-2.5">
              Direct official link · Hand-selected recommendation
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
