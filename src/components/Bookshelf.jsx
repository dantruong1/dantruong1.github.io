import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, X } from 'lucide-react';
import { Badge } from './ui/badge';

// Stylized physical book color palettes (spine & cover colors)
const BOOK_PALETTES = [
  { bg: 'bg-[#4d5940]', border: 'border-[#3a4430]', text: 'text-[#eef2ea]', accent: 'border-amber-warm/40' }, // Forest Matcha
  { bg: 'bg-[#b86f52]', border: 'border-[#9a5a40]', text: 'text-[#f4ded4]', accent: 'border-amber-light/50' }, // Terracotta
  { bg: 'bg-[#2e2722]', border: 'border-[#1e1916]', text: 'text-[#e8d5c0]', accent: 'border-matcha/40' },    // Espresso
  { bg: 'bg-[#d49b5c]', border: 'border-[#b58045]', text: 'text-[#2e2722]', accent: 'border-espresso/30' },  // Warm Amber
  { bg: 'bg-[#5c6b73]', border: 'border-[#424e54]', text: 'text-[#f7f3ec]', accent: 'border-terracotta/40' }, // Slate Blue
];

export function Bookshelf({ content }) {
  const [selectedBook, setSelectedBook] = useState(null);

  // Flatten all books across all categories into a single list
  const allBooks = useMemo(
    () =>
      content.recommendations.flatMap((cat) =>
        cat.items.map((item) => ({
          ...item,
          category: cat.category,
        }))
      ),
    [content.recommendations]
  );

  return (
    <div className="space-y-6">
      {/* Standardized Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">
            <BookOpen className="w-3.5 h-3.5" />
            The Bookshelf
          </span>
          <div className="organic-divider flex-1" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
          Dan's Bookshelf
        </h3>
        <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full">
          A curated digital bookshelf of books and essays that have fundamentally shaped how I think. Click or tap any volume to pull it off the shelf and open its reading link!
        </p>
      </div>

      {/* Single Unified Wooden Bookshelf */}
      <div className="relative pt-10 pb-4 px-6 sm:px-8 bg-card-warm dark:bg-night-card border border-espresso/10 dark:border-night-border rounded-cozy-lg shadow-cozy dark:shadow-dark-cozy">
        {/* Single Row of Book Spines */}
        <div className="flex items-end justify-start sm:justify-around gap-5 sm:gap-8 overflow-x-auto no-scrollbar min-h-[270px] pb-1 px-2">
          {allBooks.map((item, itemIdx) => {
            const palette = BOOK_PALETTES[itemIdx % BOOK_PALETTES.length];
            const heightClass = itemIdx % 2 === 0 ? 'h-[250px]' : 'h-[235px]';
            const isSelected = selectedBook?.title === item.title;

            return (
              <motion.div
                key={itemIdx}
                whileHover={{ y: -18, rotateZ: -2, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedBook({ ...item, palette })}
                className={`relative ${heightClass} w-[72px] sm:w-[84px] md:w-[92px] cursor-pointer shrink-0 rounded-t-md ${palette.bg} ${palette.border} border-t-2 border-r-2 border-l-2 shadow-md transition-all duration-300 group flex flex-col justify-between py-4 px-2.5 select-none`}
                style={{
                  boxShadow: isSelected
                    ? '0 16px 36px rgba(46,39,34,0.35)'
                    : '0 8px 18px rgba(46,39,34,0.14)',
                }}
              >
                {/* Top Page Edges */}
                <div className="absolute top-0 left-0 right-0 h-2.5 bg-amber-light/80 rounded-t-sm border-b border-espresso/20" />

                {/* Spine Decorative Gold Line */}
                <div className={`w-full h-1 border-t ${palette.accent} mt-3 opacity-60`} />

                {/* Vertical Spine Title */}
                <div className="flex-1 flex items-center justify-center my-1.5 overflow-hidden px-0.5 max-h-[175px]">
                  {(() => {
                    const spineText = item.spineTitle || item.title;
                    const len = spineText.length;
                    const fontClass =
                      len > 30
                        ? 'text-[8.5px] sm:text-[9.5px] tracking-normal'
                        : len > 22
                        ? 'text-[9.5px] sm:text-[10.5px] tracking-tight'
                        : 'text-[11px] sm:text-[12.5px] tracking-wider';

                    return (
                      <span
                        className={`font-serif font-bold ${palette.text} ${fontClass} uppercase text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis`}
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                          maxHeight: '170px',
                        }}
                      >
                        {spineText}
                      </span>
                    );
                  })()}
                </div>

                {/* Spine Author / Bottom Gold Line */}
                <div className={`w-full border-b ${palette.accent} mb-1.5 opacity-60`} />
                <span className={`text-[10px] sm:text-[11px] font-mono ${palette.text} text-center opacity-85 px-0.5 truncate font-medium`}>
                  {item.author ? item.author.split(' ').pop() : 'Essay'}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Physical Wooden Shelf Ledge Base */}
        <div className="h-5 bg-gradient-to-r from-[#6b5e52] via-[#8c8077] to-[#6b5e52] rounded-b-md shadow-md border-t-2 border-[#52473d] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>

      {/* Book Detail Modal / Drawer */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg bg-card dark:bg-night-card border border-espresso/10 dark:border-night-border p-6 sm:p-8 shadow-cozy-lg overflow-hidden rounded-cozy-lg"
            >
              <div className="washi-tape washi-tape-top-right" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text p-1 rounded-full hover:bg-parchment-dark dark:hover:bg-night-card-alt transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Book Front Cover Preview */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <a
                  href={selectedBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-32 h-44 ${selectedBook.palette.bg} ${selectedBook.palette.border} border-2 rounded-r-md rounded-l-sm shadow-xl shrink-0 p-4 flex flex-col justify-between relative overflow-hidden group/cover cursor-pointer hover:scale-105 transition-transform duration-300`}
                >
                  <div className="absolute left-1 top-0 bottom-0 w-1.5 bg-black/20" />
                  <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">
                    Volume
                  </span>
                  <div>
                    <h5 className={`font-serif text-sm font-bold ${selectedBook.palette.text} leading-tight mb-1 group-hover/cover:underline`}>
                      {selectedBook.title}
                    </h5>
                    {selectedBook.author && (
                      <span className={`text-[10px] font-mono ${selectedBook.palette.text} opacity-75 block`}>
                        {selectedBook.author}
                      </span>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/80 self-end" />
                </a>

                <div className="flex-1 min-w-0">
                  <Badge variant="terracotta" className="mb-2">
                    Canonical Reading
                  </Badge>
                  <h4 className="font-serif text-2xl font-bold text-espresso dark:text-night-text leading-snug mb-1">
                    {selectedBook.title}
                  </h4>
                  {selectedBook.author && (
                    <span className="font-mono text-xs text-espresso-muted dark:text-night-muted block mb-3">
                      by {selectedBook.author}
                    </span>
                  )}
                  <p className="text-xs sm:text-sm text-espresso-light dark:text-night-muted leading-relaxed font-sans mb-4">
                    {selectedBook.note}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-espresso/10 dark:border-night-border flex items-center justify-between gap-3">
                <a
                  href={selectedBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-matcha dark:bg-matcha-dark hover:bg-matcha-dark px-4 py-2 rounded-full transition-colors font-medium shadow-sm"
                >
                  <span>Read / Open Volume</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-xs font-mono text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text px-3 py-1.5 rounded-full transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
