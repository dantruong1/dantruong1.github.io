import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Copy, Check, Search, Sparkles, Dices, RefreshCw, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const sectionStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const headerFadeUp = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants = {
  hidden: { y: 14, opacity: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

// Alternating card tint patterns for cozy aesthetic
const tints = [
  'bg-card dark:bg-night-card',
  'bg-mocha-soft/30 dark:bg-night-card-alt',
  'bg-matcha-soft/30 dark:bg-matcha-dark/25',
  'bg-terracotta-soft/20 dark:bg-terracotta/20',
  'bg-card-warm dark:bg-night-card',
];

const CATEGORIES = [
  'All',
  'Favorites ★',
  'Action & Courage',
  'Mindset & Gratitude',
  'Self-Mastery',
  'Perspective & Kindness',
  'Wisdom & Wonder',
];

export function QuotesSection({ content }) {
  const [copiedId, setCopiedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wisdomQuote, setWisdomQuote] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCopy = (quote, id) => {
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpinWisdom = () => {
    setIsSpinning(true);
    const quotes = content?.quotes || [];
    if (quotes.length === 0) return;
    
    // Pick a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    setTimeout(() => {
      setWisdomQuote(randomQuote);
      setIsSpinning(false);
    }, 250);
  };

  const filteredQuotes = useMemo(() => {
    return content.quotes.filter((q) => {
      // Category match
      let matchesCategory = true;
      if (activeCategory === 'Favorites ★') {
        matchesCategory = Boolean(q.favorite);
      } else if (activeCategory !== 'All') {
        matchesCategory = q.category === activeCategory;
      }

      // Search query match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          q.quote.toLowerCase().includes(query) ||
          q.author.toLowerCase().includes(query) ||
          q.category.toLowerCase().includes(query);
      }

      return matchesCategory && matchesSearch;
    });
  }, [content.quotes, activeCategory, searchQuery]);

  return (
    <motion.section
      variants={sectionStagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14"
    >
      {/* Standardized Section Header */}
      <motion.div variants={headerFadeUp} className="mb-7">
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">wisdom & reflections</span>
          <div className="organic-divider flex-1" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-terracotta dark:text-terracotta-glow" />
            Quote Collection
          </h2>

          <button
            onClick={handleSpinWisdom}
            className="inline-flex items-center gap-2 text-xs font-mono text-white bg-terracotta dark:bg-terracotta-glow dark:text-espresso hover:bg-terracotta/90 px-4 py-2 rounded-full transition-all duration-200 font-semibold shadow-xs hover:scale-105 shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Spin for Daily Wisdom 🎲</span>
          </button>
        </div>

        <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full">
          Curated thoughts, aphorisms, and stoic wisdom on action, mindset, self-mastery, perspective, and life's irregularities. Click any card to copy.
        </p>
      </motion.div>

      {/* Daily Wisdom Spotlight Modal Card */}
      <AnimatePresence>
        {wisdomQuote && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card className="p-6 md:p-8 bg-card-warm dark:bg-night-card border-2 border-terracotta/40 dark:border-terracotta-glow/40 relative overflow-hidden shadow-cozy-lg">
              <div className="washi-tape washi-tape-top-right" />
              
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="terracotta" className="text-xs font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-warm animate-pulse" />
                    Daily Wisdom Spotlight
                  </Badge>
                  <Badge variant="default" className="text-xs font-mono">
                    {wisdomQuote.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSpinWisdom}
                    className="text-xs font-mono text-terracotta dark:text-terracotta-glow hover:underline flex items-center gap-1 px-2.5 py-1 rounded-full bg-terracotta-soft/50 dark:bg-terracotta/20 border border-terracotta/20"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSpinning ? 'animate-spin' : ''}`} />
                    <span>Spin Again</span>
                  </button>
                  <button
                    onClick={() => setWisdomQuote(null)}
                    className="text-espresso-muted dark:text-night-muted hover:text-espresso p-1 rounded-full hover:bg-parchment-dark"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="my-2">
                <span className="font-serif text-6xl text-terracotta/20 dark:text-terracotta-glow/20 leading-none select-none">"</span>
              </div>

              <p className="font-serif italic text-xl md:text-2xl text-espresso dark:text-night-text leading-relaxed mb-6 -mt-6 font-medium">
                {wisdomQuote.quote}
              </p>

              <div className="pt-4 border-t border-espresso/10 dark:border-night-border flex items-center justify-between">
                <span className="font-mono text-xs text-espresso-muted dark:text-night-muted font-medium">
                  by <strong>{wisdomQuote.author}</strong>
                </span>

                <button
                  onClick={() => handleCopy(wisdomQuote, 'wisdom')}
                  className="text-xs font-mono text-matcha-dark dark:text-matcha-glow hover:underline flex items-center gap-1 font-semibold"
                >
                  {copiedId === 'wisdom' ? (
                    <><Check className="w-3.5 h-3.5 text-matcha" /> Copied!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy Quote</>
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Bar & Search Input */}
      <motion.div variants={headerFadeUp} className="mb-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-espresso-muted/60 dark:text-night-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quotes by text, author, or keyword..."
            className="w-full bg-card dark:bg-night-card border border-espresso/10 dark:border-night-border rounded-full pl-10 pr-4 py-2.5 text-xs font-mono text-espresso dark:text-night-text focus:outline-none focus:ring-2 focus:ring-matcha/50 transition-all placeholder:text-espresso-muted/50 dark:placeholder:text-night-muted/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-espresso-muted hover:text-espresso dark:text-night-muted dark:hover:text-night-text"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 border ${
                  isActive
                    ? 'bg-matcha text-white dark:bg-matcha-glow dark:text-espresso font-semibold border-matcha shadow-xs'
                    : 'bg-card/70 dark:bg-night-card border-espresso/8 dark:border-night-border text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Stats counter */}
        <div className="flex items-center justify-between px-1 text-xs font-mono text-espresso-muted/70 dark:text-night-muted/80">
          <span>
            Showing <strong className="text-espresso dark:text-night-text font-semibold">{filteredQuotes.length}</strong> of {content.quotes.length} quotes
          </span>
          {activeCategory !== 'All' && (
            <span className="text-[11px] text-terracotta dark:text-terracotta-glow">
              Filtered by: {activeCategory}
            </span>
          )}
        </div>
      </motion.div>

      {/* Masonry-like staggered grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="columns-1 md:columns-2 gap-5 space-y-5"
        >
          {filteredQuotes.map((q, idx) => (
            <motion.div key={q.id} variants={cardVariants} className="break-inside-avoid">
              <Card
                className={`p-6 ${tints[idx % tints.length]} border-espresso/8 dark:border-night-border flex flex-col relative group cursor-pointer hover:shadow-cozy-hover transition-all duration-300`}
                onClick={() => handleCopy(q, q.id)}
              >
                {q.favorite && <div className="washi-tape washi-tape-top-right" />}

                {/* Category + Copy button */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge variant={q.favorite ? 'terracotta' : 'default'}>
                    {q.category}
                  </Badge>
                  <span className="text-[11px] text-espresso-muted/60 dark:text-night-muted font-mono flex items-center gap-1 group-hover:text-matcha dark:group-hover:text-matcha-glow transition-colors">
                    {copiedId === q.id ? (
                      <><Check className="w-3 h-3 text-matcha dark:text-matcha-glow" /> Copied!</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy</>
                    )}
                  </span>
                </div>

                {/* Decorative quote mark */}
                <div className="mb-2">
                  <span className="font-serif text-5xl text-matcha/20 dark:text-matcha-glow/20 leading-none select-none">"</span>
                </div>

                <p className="font-serif italic text-base md:text-lg text-espresso dark:text-night-text leading-relaxed mb-5 -mt-4 font-medium">
                  {q.quote}
                </p>

                <div className="pt-3 border-t border-espresso/8 dark:border-night-border flex items-center justify-between">
                  <span className="font-mono text-[11px] text-espresso-muted dark:text-night-muted font-medium">
                    by {q.author}
                  </span>
                  {q.favorite && (
                    <span className="font-sans text-[10px] font-semibold text-terracotta dark:text-terracotta-glow bg-terracotta-soft/50 dark:bg-terracotta/30 px-2 py-0.5 rounded-full">
                      ★ favorite
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12 bg-card/40 dark:bg-night-card/40 rounded-cozy border border-dashed border-espresso/15 dark:border-night-border">
          <p className="font-serif text-lg text-espresso dark:text-night-text mb-1">No quotes found</p>
          <p className="text-xs font-mono text-espresso-muted dark:text-night-muted">
            Try clearing your search query or selecting another category filter.
          </p>
        </div>
      )}
    </motion.section>
  );
}
