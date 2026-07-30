import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Bookmark, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Category accent colors
const categoryAccents = [
  { bg: 'bg-matcha-soft/50', border: 'border-matcha/15', icon: 'text-matcha', heading: 'text-matcha-dark' },
  { bg: 'bg-terracotta-soft/40', border: 'border-terracotta-muted/20', icon: 'text-terracotta', heading: 'text-terracotta-dark' },
  { bg: 'bg-amber-light/40', border: 'border-amber-warm/20', icon: 'text-amber-warm', heading: 'text-espresso' },
];

export function RecommendationsSection({ content }) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta-soft/60 px-3 py-1 rounded-full border border-terracotta/10">
          curated reads
        </span>
        <h2 className="font-serif text-3xl font-bold text-espresso tracking-tight">Recommendations</h2>
        <div className="organic-divider flex-1" />
      </motion.div>

      <motion.p variants={fadeUp} className="text-[14px] text-espresso-muted font-sans leading-relaxed mb-7 max-w-lg">
        Books, essays, and ideas that have shaped how I think about product, economics, and design.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.recommendations.map((cat, idx) => {
          const accent = categoryAccents[idx % categoryAccents.length];
          return (
            <motion.div key={idx} variants={fadeUp}>
              <Card className={`p-6 ${accent.bg} ${accent.border} border h-full flex flex-col group`}>
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-espresso/8">
                  <Bookmark className={`w-4 h-4 ${accent.icon}`} />
                  <h3 className={`font-serif text-lg font-bold tracking-tight ${accent.heading}`}>
                    {cat.category}
                  </h3>
                </div>

                {/* Items */}
                <div className="space-y-5 font-sans flex-1">
                  {cat.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      className="group/item"
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="number-circle bg-card text-espresso-muted border border-espresso/10 text-[10px] mt-0.5">
                          {String(itemIdx + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[13px] text-espresso leading-snug mb-0.5 group-hover/item:text-matcha-dark transition-colors">
                            {item.title}
                          </h4>
                          {item.author && (
                            <span className="font-mono text-[10px] text-espresso-muted block mb-1">
                              by {item.author}
                            </span>
                          )}
                          <p className="text-[12px] text-espresso-muted leading-relaxed">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
