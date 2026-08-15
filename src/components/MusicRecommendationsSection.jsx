import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Headphones, Sparkles, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Album color gradients per index
const albumColors = [
  'from-espresso via-mocha to-terracotta-dark',
  'from-matcha-dark via-matcha to-matcha-light',
  'from-terracotta-dark via-terracotta to-amber-warm',
  'from-espresso via-espresso-light to-mocha',
  'from-matcha via-matcha-dark to-espresso',
];

export function MusicRecommendationsSection({ content }) {
  const musicList = content?.music || [];

  if (musicList.length === 0) return null;

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Standardized Header */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">
            <Headphones className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0" />
            heavy rotation
          </span>
          <div className="organic-divider flex-1" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
          Music & Chill Vibes
        </h3>
        <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full">
          Tracks and albums on heavy rotation — from golden-hour R&B to late-night focus sessions.
        </p>
      </motion.div>

      {/* Grid of tracks & albums */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {musicList.map((item, idx) => (
          <motion.div key={idx} variants={fadeUp}>
            <Card className="p-5 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border h-full flex flex-col justify-between group hover:border-matcha/40 dark:hover:border-matcha-glow transition-all duration-300 relative overflow-hidden shadow-cozy hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="terracotta">{item.badge}</Badge>
                  {item.rank && (
                    <span className="font-mono text-[11px] font-bold text-matcha-dark dark:text-matcha-glow">
                      {item.rank}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3.5 mb-3">
                  {/* Mini vinyl / album art */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      albumColors[idx % albumColors.length]
                    } flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm`}
                  >
                    <Disc className="w-6 h-6 text-white/70" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-base text-espresso dark:text-night-text leading-tight truncate group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[12px] font-sans text-espresso-muted dark:text-night-muted truncate">
                      {item.artist} · <span className="italic">{item.album}</span>
                    </p>
                  </div>
                </div>

                <Badge variant="default" className="text-[10px] mb-3">
                  {item.genre}
                </Badge>

                <p className="text-[13px] text-espresso-light dark:text-night-muted leading-relaxed font-sans">
                  {item.note}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-espresso/6 dark:border-night-border flex items-center justify-between text-[11px] font-mono text-espresso-muted/60 dark:text-night-muted/80">
                <span>Spotify · Apple Music</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-warm opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
