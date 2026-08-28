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
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-espresso/50 dark:bg-black/70 backdrop-blur-xs cursor-pointer"
        />

        {/* Mobile Bottom Sheet / Desktop Centered Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative z-10 w-full sm:max-w-md bg-card dark:bg-night-card border border-espresso/15 dark:border-night-border rounded-t-cozy-xl sm:rounded-cozy-lg p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto pb-8 sm:pb-6"
        >
          {/* Mobile Drag Indicator Bar */}
          <div className="sm:hidden w-10 h-1 bg-espresso/20 dark:bg-night-muted/30 rounded-full mx-auto mb-3" />
          <div className="hidden sm:block washi-tape washi-tape-top-right" />

          {/* Header Bar */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-espresso-muted dark:text-night-muted uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta dark:text-terracotta-glow" />
                {product.roomLabel}
              </span>
              <span className="text-espresso-muted/40 dark:text-night-muted/40">•</span>
              <span className="font-mono text-[11px] text-matcha-dark dark:text-matcha-glow font-medium flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {product.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-parchment-dark dark:bg-night-card-alt flex items-center justify-center text-espresso dark:text-night-text hover:scale-105 transition-all"
              aria-label="Close detail box"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Product Title & Brand */}
          <div className="mb-4">
            <span className="font-mono text-[11px] font-bold text-terracotta dark:text-terracotta-glow uppercase tracking-wider block mb-1">
              {product.brand}
            </span>
            <h3 className="font-serif text-2xl font-bold text-espresso dark:text-night-text tracking-tight leading-snug">
              {product.name}
            </h3>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.badges.map((badge, idx) => (
              <Badge
                key={idx}
                variant={badge.variant === 'terracotta' ? 'terracotta' : 'matcha'}
                className="text-[11px] py-0.5 px-2.5 flex items-center gap-1 font-medium shadow-xs"
              >
                <span>{badge.emoji}</span>
                <span>{badge.label}</span>
              </Badge>
            ))}
          </div>

          {/* Concise Recommendation Box */}
          <div className="bg-mocha-soft/60 dark:bg-night-card-alt border border-espresso/8 dark:border-night-border rounded-xl p-4 mb-5 relative overflow-hidden shadow-inner-warm">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-matcha-dark dark:text-matcha-glow mb-1.5 flex items-center gap-1 block">
              <Sparkles className="w-3 h-3 text-amber-warm" />
              Why I Recommend It
            </span>
            <p className="text-xs sm:text-sm font-sans text-espresso dark:text-night-text leading-relaxed italic">
              "{product.recommendation}"
            </p>
          </div>

          {/* Direct Product Link Action */}
          <div>
            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-matcha hover:bg-matcha-dark dark:bg-matcha-dark dark:hover:bg-matcha text-white font-mono text-xs py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium"
            >
              <span>View Official Product Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-[10px] font-mono text-espresso-muted/60 dark:text-night-muted/60 text-center block mt-2">
              Direct official website link
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
