import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function ProjectsSection({ content }) {
  const featured = content.projects.filter(p => p.featured);
  const rest = content.projects.filter(p => !p.featured);

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
          <span className="section-kicker">portfolio</span>
          <div className="organic-divider flex-1" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
          Projects & Achievements
        </h2>
        <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full">
          Consumer products, global hackathon wins, case competitions, and product strategy initiatives across tech and social impact.
        </p>
      </motion.div>

      {/* Featured projects — full-width cards */}
      {featured.length > 0 && (
        <div className="space-y-6 mb-6">
          {featured.map((proj) => (
            <motion.div key={proj.id} variants={fadeUp}>
              <Card className="p-7 md:p-9 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border relative overflow-hidden shadow-cozy group hover:border-matcha transition-all duration-300">
                <div className="washi-tape washi-tape-top-right" />

                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-3">
                      <Badge variant="terracotta">{proj.tag}</Badge>
                      <span className="text-[10px] font-mono text-terracotta dark:text-[#f7ded4] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-warm" /> Featured
                      </span>
                    </div>

                    <CardTitle className="text-2xl mb-3 group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors">
                      {proj.title}
                    </CardTitle>
                    <CardDescription className="text-[14px] text-espresso-light dark:text-night-muted leading-relaxed mb-5 w-full">
                      {proj.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="text-[11px] font-mono bg-matcha-soft dark:bg-matcha-dark/40 text-matcha-dark dark:text-[#d2e3c4] px-2.5 py-1 rounded-full border border-matcha/10 dark:border-matcha/30">
                          {t}
                        </span>
                      ))}
                    </div>

                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-matcha dark:bg-matcha-dark hover:bg-matcha-dark px-4 py-2 rounded-full transition-colors font-medium shadow-sm"
                      >
                        <span>Visit MetabolicApp.com</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Right accent — decorative illustration */}
                  <div className="hidden md:flex items-center justify-center w-32 h-32 bg-matcha-soft/40 dark:bg-matcha-dark/30 rounded-cozy-lg shrink-0">
                    <img src="images/cozy/gameboy-vines.png" alt="" className="w-20 h-20 object-contain opacity-60" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Rest of projects — grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rest.map((proj) => (
          <motion.div key={proj.id} variants={fadeUp}>
            <Card className="h-full flex flex-col justify-between p-6 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border hover:border-matcha/40 relative group transition-all duration-300 shadow-cozy">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default">{proj.tag}</Badge>
                </div>
                <CardTitle className="mb-2 text-lg group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors font-serif">
                  {proj.title}
                </CardTitle>
                <CardDescription className="text-[13px] text-espresso-muted dark:text-night-muted leading-relaxed mb-4 font-sans">
                  {proj.description}
                </CardDescription>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono bg-parchment-dark dark:bg-night-card-alt text-espresso-muted dark:text-night-muted px-2 py-0.5 rounded-full border border-espresso/5 dark:border-night-border">
                      {t}
                    </span>
                  ))}
                </div>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-matcha dark:text-matcha-glow hover:text-matcha-dark font-medium transition-colors"
                  >
                    Open Link <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
