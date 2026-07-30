import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowUpRight, BookOpen } from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function WritingsSection({ content }) {
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
          <span className="section-kicker">essays & op-eds</span>
          <div className="organic-divider flex-1" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
              Writings & Substack
            </h2>
            <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed max-w-2xl">
              Published op-eds for The Daily Californian and long-form essays on economics, technology, and product building on Substack.
            </p>
          </div>

          <a
            href="https://substack.com/@dantruong12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-[#ff6719] hover:bg-[#e5590f] px-4 py-2 rounded-full transition-colors font-medium shadow-sm shrink-0 self-start sm:self-auto"
          >
            <span>Subscribe on Substack</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>

      <div className="space-y-6">
        {content.writings.map((write, idx) => (
          <motion.div key={write.id} variants={fadeUp}>
            <Card className="p-6 md:p-8 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border hover:border-matcha/40 transition-all duration-300 group shadow-cozy">
              <div className="flex items-start gap-4 md:gap-5">
                {/* Number circle */}
                <div className="number-circle bg-matcha-soft dark:bg-matcha-dark/40 text-matcha-dark dark:text-[#d2e3c4] mt-0.5 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="terracotta">{write.tag}</Badge>
                      <span className="text-[11px] font-mono text-espresso-muted dark:text-night-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-terracotta dark:text-terracotta-glow" />
                        {write.date}
                      </span>
                    </div>

                    {write.url && (
                      <a
                        href={write.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] font-mono text-matcha-dark dark:text-matcha-glow hover:text-matcha flex items-center gap-1 font-medium transition-colors hover-underline shrink-0"
                      >
                        <span>{write.id === 'substack-essays' ? 'Read on Substack' : 'Read Op-Ed'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <CardTitle className="text-xl md:text-2xl mb-2.5 group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors leading-snug font-serif">
                    {write.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-espresso-light dark:text-night-muted leading-relaxed font-sans">
                    {write.excerpt}
                  </CardDescription>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
