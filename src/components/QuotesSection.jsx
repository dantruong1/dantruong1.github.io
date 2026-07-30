import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Copy, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Alternating card tint patterns
const tints = [
  'bg-card',
  'bg-mocha-soft/30',
  'bg-matcha-soft/30',
  'bg-terracotta-soft/20',
  'bg-card-warm',
];

export function QuotesSection({ content }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (quote, id) => {
    navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta-soft/60 px-3 py-1 rounded-full border border-terracotta/10">
          wisdom
        </span>
        <h2 className="font-serif text-3xl font-bold text-espresso tracking-tight">Quote Collection</h2>
        <div className="organic-divider flex-1" />
      </motion.div>

      <motion.p variants={fadeUp} className="text-[14px] text-espresso-muted font-sans leading-relaxed mb-7 max-w-lg">
        Words, aphorisms, and ideas that have stuck with me over the years. Click any card to copy.
      </motion.p>

      {/* Masonry-like staggered grid */}
      <div className="columns-1 md:columns-2 gap-5 space-y-5">
        {content.quotes.map((q, idx) => (
          <motion.div key={q.id} variants={fadeUp} className="break-inside-avoid">
            <Card
              className={`p-6 ${tints[idx % tints.length]} border-espresso/8 flex flex-col relative group cursor-pointer hover:shadow-cozy-hover transition-all duration-300`}
              onClick={() => handleCopy(q, q.id)}
            >
              {q.favorite && <div className="washi-tape washi-tape-top-right" />}

              {/* Category + Copy button */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant={q.favorite ? 'terracotta' : 'default'}>
                  {q.category}
                </Badge>
                <span className="text-[11px] text-espresso-muted/50 font-mono flex items-center gap-1 group-hover:text-matcha transition-colors">
                  {copiedId === q.id ? (
                    <><Check className="w-3 h-3 text-matcha" /> Copied!</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copy</>
                  )}
                </span>
              </div>

              {/* Decorative quote mark */}
              <div className="mb-2">
                <span className="font-serif text-5xl text-matcha/15 leading-none select-none">"</span>
              </div>

              <p className="font-serif italic text-lg md:text-xl text-espresso leading-relaxed mb-5 -mt-4">
                {q.quote}
              </p>

              <div className="pt-3 border-t border-espresso/8 flex items-center justify-between">
                <span className="font-mono text-[11px] text-espresso-muted font-medium">
                  — {q.author}
                </span>
                {q.favorite && (
                  <span className="font-sans text-[11px] font-semibold text-terracotta/80 bg-terracotta-soft/50 px-2 py-0.5 rounded-full">
                    ★ favorite
                  </span>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
