import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ExternalLink, Gift, Tag, Check, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { WISHLIST_ITEMS, WISHLIST_CATEGORIES } from '../data/wishlist';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function WishlistCard({ item }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col justify-between overflow-hidden bg-card dark:bg-night-card border-espresso/10 dark:border-night-border hover:border-matcha/60 dark:hover:border-matcha-glow/50 transition-all duration-300 shadow-cozy group">
        <div>
          {/* Product Image Frame */}
          <div className="relative w-full h-52 sm:h-56 bg-gradient-to-b from-parchment-light to-parchment-dark/40 dark:from-night-card-alt dark:to-night-card/80 border-b border-espresso/8 dark:border-night-border flex items-center justify-center p-6 overflow-hidden">
            {/* Top Badge & Priority */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <Badge
                variant={item.badge?.variant === 'terracotta' ? 'terracotta' : 'default'}
                className="text-[10px] font-mono py-0.5 px-2.5 shadow-xs backdrop-blur-xs bg-card/90 dark:bg-night-card/90"
              >
                {item.badge?.emoji} {item.badge?.label}
              </Badge>

              {item.isTopPriority && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-warm/20 text-espresso dark:text-amber-light border border-amber-warm/30 shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-amber-warm" />
                  Top Pick
                </span>
              )}
            </div>

            {/* Product Image with Fallback */}
            {!imageError ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-espresso-muted dark:text-night-muted">
                <ShoppingBag className="w-12 h-12 stroke-[1.5] mb-2 opacity-50 text-matcha-dark dark:text-matcha-glow" />
                <span className="text-xs font-mono">{item.brand}</span>
              </div>
            )}

            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-parchment-dark/30 dark:bg-night-card-alt/50 animate-pulse">
                <ShoppingBag className="w-8 h-8 text-espresso-muted/40 dark:text-night-muted/40" />
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="p-5">
            {/* Brand & Category */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono text-[11px] font-bold text-terracotta dark:text-terracotta-glow uppercase tracking-wider">
                {item.brand}
              </span>
              <span className="text-[11px] font-mono text-espresso-muted dark:text-night-muted">
                {item.categoryLabel}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="font-serif text-lg sm:text-xl font-bold text-espresso dark:text-night-text group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors leading-snug mb-2">
              {item.name}
            </h3>

            {/* Note / Variant Highlight */}
            {item.note && (
              <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-parchment-dark/60 dark:bg-night-card-alt border border-espresso/6 dark:border-night-border flex items-start gap-1.5">
                <Tag className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0 mt-0.5" />
                <span className="text-xs font-mono font-medium text-espresso dark:text-night-text leading-tight">
                  {item.note}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-xs font-sans text-espresso-light dark:text-night-muted leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Footer Link Action */}
        <div className="p-5 pt-0">
          <a
            href={item.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-10 px-4 rounded-xl bg-parchment-dark/80 dark:bg-night-card-alt text-espresso dark:text-night-text hover:bg-matcha dark:hover:bg-matcha-dark hover:text-white dark:hover:text-white border border-espresso/10 dark:border-night-border flex items-center justify-between text-xs font-mono font-semibold transition-all duration-200 group/btn shadow-xs"
          >
            <span className="flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow group-hover/btn:text-white transition-colors" />
              View Item
            </span>
            <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </Card>
    </motion.div>
  );
}

export function WishlistSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return WISHLIST_ITEMS;
    return WISHLIST_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto mb-14"
    >
      {/* Header Banner */}
      <motion.div variants={fadeUp} className="mb-7">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2 flex items-center gap-2.5">
            My Wishlist
            <Heart className="w-6 h-6 text-terracotta fill-terracotta/20 dark:text-terracotta-glow" />
          </h2>

          {/* Section Kicker */}
          <div className="flex items-center gap-3 mb-3">
            <span className="section-kicker">
              <Gift className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0" />
              things i'm eyeing & loving
            </span>
            <div className="organic-divider flex-1" />
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full max-w-none">
            A directory of items, gear, clothing, and everyday upgrades on my wishlist. Click any card to inspect or jump directly to the item.
          </p>
        </div>
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {WISHLIST_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? WISHLIST_ITEMS.length
                : WISHLIST_ITEMS.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-matcha text-white dark:bg-matcha-dark font-semibold shadow-xs'
                    : 'bg-card/80 dark:bg-night-card/80 text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text border border-espresso/8 dark:border-night-border'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Directory Cards Grid */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State if needed */}
      {filteredItems.length === 0 && (
        <motion.div
          variants={fadeUp}
          className="text-center py-16 bg-card/50 dark:bg-night-card/50 rounded-cozy border border-espresso/8 dark:border-night-border"
        >
          <Gift className="w-10 h-10 text-espresso-muted dark:text-night-muted mx-auto mb-3 opacity-60" />
          <h4 className="font-serif text-lg font-bold text-espresso dark:text-night-text mb-1">
            No items found in this category
          </h4>
          <p className="text-xs font-mono text-espresso-muted dark:text-night-muted">
            Try selecting "All Items" to view the full directory.
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
