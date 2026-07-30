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
  // First featured project gets a hero card
  const featured = content.projects.filter(p => p.featured);
  const rest = content.projects.filter(p => !p.featured);

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta-soft/60 px-3 py-1 rounded-full border border-terracotta/10">
          portfolio
        </span>
        <h2 className="font-serif text-3xl font-bold text-espresso tracking-tight">Projects & Code</h2>
        <div className="organic-divider flex-1" />
      </motion.div>

      {/* Featured project — full-width hero card */}
      {featured.length > 0 && (
        <motion.div variants={fadeUp} className="mb-6">
          {featured.map((proj) => (
            <Card key={proj.id} className="p-7 md:p-9 bg-card border-espresso/8 relative overflow-hidden shadow-cozy group hover:border-matcha transition-all duration-300">
              <div className="washi-tape washi-tape-top-right" />

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Left info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Badge variant="terracotta">{proj.tag}</Badge>
                    <span className="text-[10px] font-mono text-terracotta flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  </div>

                  <CardTitle className="text-2xl mb-3 group-hover:text-matcha-dark transition-colors">
                    {proj.title}
                  </CardTitle>
                  <CardDescription className="text-[14px] text-espresso-light leading-relaxed mb-5 max-w-lg">
                    {proj.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono bg-matcha-soft text-matcha-dark px-2.5 py-1 rounded-full border border-matcha/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-mono text-matcha-dark hover:text-matcha font-medium transition-colors hover-underline"
                    >
                      View Source
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Right accent — decorative illustration */}
                <div className="hidden md:flex items-center justify-center w-32 h-32 bg-matcha-soft/40 rounded-cozy-lg shrink-0">
                  <img src="images/cozy/gameboy-vines.png" alt="" className="w-20 h-20 object-contain opacity-60" />
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Rest of projects — grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rest.map((proj, idx) => (
          <motion.div key={proj.id} variants={fadeUp}>
            <Card className="h-full flex flex-col justify-between p-6 bg-card border-espresso/8 hover:border-matcha/40 relative group transition-all duration-300">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default">{proj.tag}</Badge>
                </div>
                <CardTitle className="mb-2 text-lg group-hover:text-matcha-dark transition-colors">
                  {proj.title}
                </CardTitle>
                <CardDescription className="text-[13px] text-espresso-muted leading-relaxed mb-4">
                  {proj.description}
                </CardDescription>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono bg-parchment-dark text-espresso-muted px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-matcha hover:text-matcha-dark font-medium transition-colors"
                  >
                    View Project <ArrowUpRight className="w-3 h-3" />
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
