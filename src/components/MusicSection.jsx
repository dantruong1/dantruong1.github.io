import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Heart, Headphones } from 'lucide-react';
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
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <span className="font-hand text-xl text-terracotta">heavy rotation</span>
        <h2 className="font-serif text-3xl font-bold text-espresso tracking-tight">Music & Chill Vibes</h2>
        <div className="organic-divider flex-1" />
      </motion.div>

      <motion.p variants={fadeUp} className="text-[14px] text-espresso-muted font-sans leading-relaxed mb-7 max-w-lg flex items-center gap-2">
        <Headphones className="w-4 h-4 text-matcha" />
        Tracks and albums on heavy rotation — from golden-hour R&B to late-night lofi focus sessions.
      </motion.p>

      {/* First item: hero card */}
      {content.music.length > 0 && (
        <motion.div variants={fadeUp} className="mb-6">
          <Card className="p-6 md:p-7 bg-card border-espresso/8 hover:border-terracotta-muted transition-all duration-300 group shadow-cozy overflow-hidden relative">
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
                    <span className="font-mono text-[11px] font-bold text-terracotta">
                      {content.music[0].rank}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-2xl text-espresso leading-tight mb-1 group-hover:text-terracotta transition-colors">
                  {content.music[0].title}
                </h3>
                <p className="text-[13px] font-sans text-espresso-muted mb-3">
                  {content.music[0].artist} · <span className="italic">{content.music[0].album}</span>
                </p>

                <Badge variant="default" className="text-[10px] mb-3">{content.music[0].genre}</Badge>

                <p className="text-[13px] text-espresso-light leading-relaxed font-sans">
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
            <Card className="p-5 bg-card border-espresso/8 h-full flex flex-col justify-between group hover:border-terracotta-muted/40 transition-all duration-300 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="terracotta">{item.badge}</Badge>
                  {item.rank && (
                    <span className="font-mono text-[11px] font-bold text-espresso-muted">{item.rank}</span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  {/* Mini album art */}
                  <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${albumColors[(idx + 1) % albumColors.length]} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <Disc className="w-5 h-5 text-white/50" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-base text-espresso leading-tight truncate group-hover:text-terracotta transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-sans text-espresso-muted truncate">
                      {item.artist} · <span className="italic">{item.album}</span>
                    </p>
                  </div>
                </div>

                <Badge variant="default" className="text-[10px] mb-2.5">{item.genre}</Badge>

                <p className="text-[12px] text-espresso-muted leading-relaxed font-sans">
                  {item.note}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-espresso/6 flex items-center justify-between text-[10px] font-mono text-espresso-muted/60">
                <span>Spotify · Apple Music</span>
                <Heart className="w-3 h-3 text-terracotta/50 group-hover:text-terracotta transition-colors" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
