import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowUpRight, PenLine } from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta-soft/60 px-3 py-1 rounded-full border border-terracotta/10">
          essays & op-eds
        </span>
        <h2 className="font-serif text-3xl font-bold text-espresso tracking-tight">Writings</h2>
        <div className="organic-divider flex-1" />
      </motion.div>

      {/* Subtitle */}
      <motion.p variants={fadeUp} className="text-[14px] text-espresso-muted font-sans leading-relaxed mb-7 max-w-lg">
        College op-eds for The Daily Californian, reflections on technology & economics, and personal essays on life after Berkeley.
      </motion.p>

      <div className="space-y-5">
        {content.writings.map((write, idx) => (
          <motion.div key={write.id} variants={fadeUp}>
            <Card className="p-6 md:p-7 bg-card border-espresso/8 hover:border-matcha/40 transition-all duration-300 group">
              <div className="flex items-start gap-4 md:gap-5">
                {/* Number circle */}
                <div className="number-circle bg-matcha-soft text-matcha-dark mt-0.5">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="terracotta">{write.tag}</Badge>
                      <span className="text-[11px] font-mono text-espresso-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {write.date}
                      </span>
                    </div>
                    {write.url && write.url !== '#' && (
                      <a
                        href={write.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-matcha group-hover:text-matcha-dark flex items-center gap-1 font-medium transition-colors hover-underline"
                      >
                        Read Publication
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <CardTitle className="text-lg md:text-xl mb-2 group-hover:text-matcha-dark transition-colors leading-snug">
                    {write.title}
                  </CardTitle>

                  <CardDescription className="text-[13px] text-espresso-muted leading-relaxed font-sans">
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
