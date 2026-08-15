import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  Code2,
  PenTool,
  Calendar,
  Layers,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function CreationsSection({ content }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'apps' | 'writings'

  const projects = content?.projects || [];
  const writings = content?.writings || [];

  const showProjects = filter === 'all' || filter === 'apps';
  const showWritings = filter === 'all' || filter === 'writings';

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14 space-y-8"
    >
      {/* Standardized Section Header */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">
            <Layers className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0" />
            apps, tools & writings
          </span>
          <div className="organic-divider flex-1" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
              Things I've Created
            </h2>
            <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed max-w-2xl">
              Apps I've built, published op-eds & essays, and projects designed around human behavior, incentive structures, and technology.
            </p>
          </div>

          <a
            href="https://substack.com/@dantruong12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-[#ff6719] hover:bg-[#e5590f] px-4 py-2 rounded-full transition-all duration-200 font-medium shadow-xs shrink-0 self-start sm:self-auto hover:-translate-y-0.5"
          >
            <span>Subscribe on Substack</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-espresso/8 dark:border-night-border">
          {[
            { id: 'all', label: 'All Creations', count: projects.length + writings.length },
            { id: 'apps', label: 'Apps & Projects', count: projects.length },
            { id: 'writings', label: 'Essays & Writings', count: writings.length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                filter === item.id
                  ? 'bg-matcha dark:bg-matcha-dark text-white shadow-xs font-semibold'
                  : 'bg-card-alt dark:bg-night-card-alt text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text border border-espresso/5 dark:border-night-border'
              }`}
            >
              <span>{item.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filter === item.id
                  ? 'bg-white/20 text-white'
                  : 'bg-espresso/5 dark:bg-white/10 text-espresso-muted dark:text-night-muted'
              }`}>
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Stream */}
      <div className="space-y-10">
        {/* ── Apps & Projects Subsection ── */}
        <AnimatePresence mode="wait">
          {showProjects && (
            <motion.div
              key="projects-section"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {filter === 'all' && (
                <div className="flex items-center gap-2 pb-1">
                  <Code2 className="w-4 h-4 text-terracotta dark:text-terracotta-glow" />
                  <h3 className="font-serif text-xl font-bold text-espresso dark:text-night-text">
                    Apps & Software
                  </h3>
                  <span className="text-xs font-mono text-espresso-muted dark:text-night-muted">
                    ({projects.length})
                  </span>
                </div>
              )}

              <div className="space-y-5">
                {projects.map((proj) => (
                  <motion.div key={proj.id} variants={fadeUp}>
                    <Card className="p-7 md:p-8 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border relative overflow-hidden shadow-cozy group hover:border-matcha dark:hover:border-matcha-glow transition-all duration-300">
                      <div className="washi-tape washi-tape-top-right" />

                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Left info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                            <Badge variant="terracotta">{proj.tag}</Badge>
                            {proj.featured && (
                              <span className="text-[10px] font-mono text-terracotta dark:text-terracotta-glow flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-warm" /> Featured
                              </span>
                            )}
                          </div>

                          <CardTitle className="text-2xl mb-3 group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors font-serif">
                            {proj.title}
                          </CardTitle>

                          <CardDescription className="text-[14px] text-espresso-light dark:text-night-muted leading-relaxed mb-5 w-full font-sans">
                            {proj.description}
                          </CardDescription>

                          <div className="flex flex-wrap gap-2 mb-5">
                            {proj.tech?.map((t, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-mono bg-matcha-soft dark:bg-matcha-dark/40 text-matcha-dark dark:text-[#d2e3c4] px-2.5 py-1 rounded-full border border-matcha/10 dark:border-matcha/30"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {proj.url && (
                            <a
                              href={proj.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-matcha dark:bg-matcha-dark hover:bg-matcha-dark dark:hover:bg-matcha px-4 py-2 rounded-full transition-all duration-200 font-medium shadow-xs hover:-translate-y-0.5"
                            >
                              <span>Visit {proj.url.replace(/^https?:\/\//, '')}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Right accent — decorative illustration */}
                        <div className="hidden md:flex items-center justify-center w-28 h-28 bg-matcha-soft/40 dark:bg-matcha-dark/30 rounded-cozy-lg shrink-0">
                          <img
                            src="images/cozy/gameboy-vines.png"
                            alt=""
                            className="w-16 h-16 object-contain opacity-75"
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Essays & Writings Subsection ── */}
        <AnimatePresence mode="wait">
          {showWritings && (
            <motion.div
              key="writings-section"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5 pt-2"
            >
              {filter === 'all' && (
                <div className="flex items-center gap-2 pb-1">
                  <PenTool className="w-4 h-4 text-terracotta dark:text-terracotta-glow" />
                  <h3 className="font-serif text-xl font-bold text-espresso dark:text-night-text">
                    Essays & Writings
                  </h3>
                  <span className="text-xs font-mono text-espresso-muted dark:text-night-muted">
                    ({writings.length})
                  </span>
                </div>
              )}

              <div className="space-y-5">
                {writings.map((write, idx) => (
                  <motion.div key={write.id} variants={fadeUp}>
                    <Card className="p-6 md:p-8 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border hover:border-matcha/40 dark:hover:border-matcha-glow transition-all duration-300 group shadow-cozy hover:-translate-y-0.5">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
