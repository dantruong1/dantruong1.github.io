import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Headphones } from 'lucide-react';
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

export function MusicSection({ content }) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14"
    >
      {/* Standardized Header */}
      <motion.div variants={fadeUp} className="mb-7">
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">heavy rotation</span>
          <div className="organic-divider flex-1" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
          Music & Chill Vibes
        </h2>
        <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full flex items-center gap-2">
          <Headphones className="w-4 h-4 text-matcha dark:text-matcha-glow shrink-0" />
          Tracks and albums on heavy rotation — from golden-hour R&B to late-night lofi focus sessions.
        </p>
      </motion.div>

      {/* First item: hero card */}
      {content.music.length > 0 && (
        <motion.div variants={fadeUp} className="mb-6">
          <Card className="p-6 md:p-7 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border hover:border-terracotta-muted transition-all duration-300 group shadow-cozy overflow-hidden relative">
            <div className="flex items-start gap-5">
              {/* Album art placeholder */}
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-cozy bg-gradient-to-br ${albumColors[0]} flex items-center justify-center shadow-lg shrink-0 relative overflow-hidden`}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                >
                  <Disc className="w-10 h-10 text-white/60" />
                </motion.div>
                <div className="absolute inset-0 bg-white/5 rounded-cozy" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="terracotta">{content.music[0].badge}</Badge>
                  {content.music[0].rank && (
                    <span className="font-mono text-[11px] font-bold text-terracotta dark:text-terracotta-glow">
                      {content.music[0].rank}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-2xl text-espresso dark:text-night-text leading-tight mb-1 group-hover:text-terracotta dark:group-hover:text-terracotta-glow transition-colors">
                  {content.music[0].title}
                </h3>
                <p className="text-[13px] font-sans text-espresso-muted dark:text-night-muted mb-3">
                  {content.music[0].artist} · <span className="italic">{content.music[0].album}</span>
                </p>

                <Badge variant="default" className="text-[10px] mb-3">{content.music[0].genre}</Badge>

                <p className="text-[13px] text-espresso-light dark:text-night-muted leading-relaxed font-sans">
                  {content.music[0].note}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Rest of tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {content.music.slice(1).map((item, idx) => (
          <motion.div key={idx} variants={fadeUp}>
            <Card className="p-5 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border h-full flex flex-col justify-between group hover:border-terracotta-muted/40 transition-all duration-300 relative overflow-hidden shadow-cozy">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="terracotta">{item.badge}</Badge>
                  {item.rank && (
                    <span className="font-mono text-[11px] font-bold text-espresso-muted dark:text-night-muted">{item.rank}</span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  {/* Mini album art */}
                  <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${albumColors[(idx + 1) % albumColors.length]} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <Disc className="w-5 h-5 text-white/50" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-base text-espresso dark:text-night-text leading-tight truncate group-hover:text-terracotta dark:group-hover:text-terracotta-glow transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-sans text-espresso-muted dark:text-night-muted truncate">
                      {item.artist} · <span className="italic">{item.album}</span>
                    </p>
                  </div>
                </div>

                <Badge variant="default" className="text-[10px] mb-2.5">{item.genre}</Badge>

                <p className="text-[12px] text-espresso-muted dark:text-night-muted leading-relaxed font-sans">
                  {item.note}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-espresso/6 dark:border-night-border flex items-center justify-between text-[10px] font-mono text-espresso-muted/60 dark:text-night-muted/80">
                <span>Spotify · Apple Music</span>
                <Heart className="w-3 h-3 text-terracotta/50 dark:text-terracotta-glow/50 group-hover:text-terracotta dark:group-hover:text-terracotta-glow transition-colors" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
