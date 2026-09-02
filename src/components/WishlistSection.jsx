import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ExternalLink, Gift, Tag, ArrowUpRight, ShoppingBag, ArrowUpDown, DollarSign } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { WISHLIST_ITEMS } from '../data/wishlist';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low → High' },
  { id: 'price-desc', label: 'Price: High → Low' },
  { id: 'alpha-asc', label: 'Name: A → Z' },
  { id: 'alpha-desc', label: 'Name: Z → A' },
];

function WishlistCard({ item }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
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
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10 gap-2">
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
                referrerPolicy="no-referrer"
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
            {/* Brand & Price Header */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono text-[11px] font-bold text-terracotta dark:text-terracotta-glow uppercase tracking-wider">
                {item.brand}
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-espresso dark:text-night-text bg-parchment-dark/80 dark:bg-night-card-alt px-2.5 py-0.5 rounded-md border border-espresso/8 dark:border-night-border">
                {item.priceDisplay}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="font-serif text-lg sm:text-xl font-bold text-espresso dark:text-night-text group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors leading-snug mb-2 line-clamp-1">
              {item.name}
            </h3>

            {/* Note / Variant Highlight */}
            {item.note && (
              <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-parchment-dark/60 dark:bg-night-card-alt border border-espresso/6 dark:border-night-border flex items-start gap-1.5">
                <Tag className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0 mt-0.5" />
                <span className="text-xs font-mono font-medium text-espresso dark:text-night-text leading-tight truncate">
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
  const [sortBy, setSortBy] = useState('featured');

  const sortedItems = useMemo(() => {
    const items = [...WISHLIST_ITEMS];
    switch (sortBy) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'alpha-asc':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'alpha-desc':
        return items.sort((a, b) => b.name.localeCompare(a.name));
      case 'featured':
      default:
        return items;
    }
  }, [sortBy]);

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

          {/* Horizontally Extended Blurb */}
          <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full max-w-none">
            A directory of items, gear, clothing, and everyday upgrades on my wishlist. Click any card to inspect or jump directly to the item.
          </p>
        </div>
      </motion.div>

      {/* Toolbar: Item Counter & Sorting Controls */}
      <motion.div variants={fadeUp} className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-espresso/8 dark:border-night-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-espresso-muted dark:text-night-muted">
          <span>{sortedItems.length} items in directory</span>
        </div>

        {/* Sorting Dropdown & Quick Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-1 sm:pb-0">
          <span className="text-[11px] font-mono text-espresso-muted dark:text-night-muted uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <ArrowUpDown className="w-3 h-3 text-terracotta dark:text-terracotta-glow" />
            Sort by:
          </span>

          {SORT_OPTIONS.map((opt) => {
            const isSelected = sortBy === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-matcha text-white dark:bg-matcha-dark font-semibold shadow-xs'
                    : 'bg-card/80 dark:bg-night-card/80 text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text hover:bg-parchment-dark/60 dark:hover:bg-night-card-alt border border-espresso/8 dark:border-night-border'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Directory Cards Grid */}
      <motion.div
        layout
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {sortedItems.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
