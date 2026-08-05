import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Sparkles, Heart, Coffee, UserCheck, Brain, Scale, Compass, GitBranch, Camera, ArrowRight, Quote } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const PILLAR_ICONS = {
  behavior: UserCheck,
  psychology: Brain,
  economics: Scale,
  incentives: Compass,
  'decision-making': GitBranch,
  technology: Sparkles,
};

const quickFacts = [
  { label: 'CURRENT ROLE', value: 'Xbox @ Microsoft (TPM 2)', icon: Briefcase, color: 'text-matcha dark:text-matcha-glow' },
  { label: 'PAST INTERNSHIPS', value: 'Zillow & Wish (Product / TPM)', icon: Briefcase, color: 'text-amber-warm dark:text-amber-warm/90' },
  { label: 'ALMA MATER', value: 'UC Berkeley \'24 (Econ + Minors)', icon: GraduationCap, color: 'text-matcha dark:text-matcha-glow' },
  { label: 'ROOTS & LOCATION', value: 'San Jose · San Francisco, CA', icon: MapPin, color: 'text-terracotta dark:text-terracotta-glow' },
  { label: 'CORE CURIOSITY', value: 'Human Behavior & Incentive Design', icon: Heart, color: 'text-terracotta dark:text-terracotta-glow' },
];

export function AboutSection({ content }) {
  const [activePillarId, setActivePillarId] = useState(content.pillars?.[2]?.id || 'economics');

  const activePillar = content.pillars?.find((p) => p.id === activePillarId) || content.pillars?.[2];

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14 space-y-9"
    >
      {/* Standardized Header */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">
            <Heart className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0" />
            philosophy & background
          </span>
          <div className="organic-divider flex-1" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
          {content.about.title}
        </h2>
        <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full">
          {content.about.subtitle}
        </p>
      </motion.div>

      {/* Featured Quote Callout Banner */}
      <motion.div variants={fadeUp}>
        <Card className="p-6 md:p-7 bg-matcha-soft/40 dark:bg-matcha-dark/30 border-matcha/20 dark:border-matcha/30 relative overflow-hidden shadow-inner-warm">
          <Quote className="w-10 h-10 text-matcha/20 dark:text-matcha-glow/15 absolute top-3 right-4 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-matcha-dark/80 dark:text-matcha-glow mb-2 block">
              Core Philosophy
            </span>
            <p className="font-serif italic text-lg md:text-xl text-espresso dark:text-night-text leading-snug font-medium">
              "{content.about.philosophyCore || "To me, economics isn't just markets or finance. It's the bridge between mathematics, logic, science, and human psychology."}"
            </p>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
        {/* Main text & Interactive Bridge section */}
        <motion.div variants={fadeUp} className="md:col-span-8 flex flex-col gap-6">
          <Card className="p-7 md:p-9 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border relative overflow-hidden shadow-cozy">
            <div className="washi-tape washi-tape-top-left" />

            <h3 className="font-serif text-xl font-semibold text-espresso dark:text-night-text mb-5 flex items-center gap-2">
              <Scale className="w-5 h-5 text-matcha dark:text-matcha-glow shrink-0" />
              The Bridge Between Math, Science & Psychology
            </h3>

            <div className="space-y-4 text-espresso-light dark:text-night-muted text-[15px] leading-[1.85] font-sans">
              {content.about.paragraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Bridge Metaphor Visual Container */}
            <div className="mt-7 pt-6 border-t border-espresso/8 dark:border-night-border">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-espresso-muted dark:text-night-muted mb-3 block">
                The Economics Bridge:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs font-mono">
                <div className="bg-mocha-soft/30 dark:bg-night-card-alt p-3 rounded-lg border border-espresso/5 dark:border-night-border">
                  <span className="text-espresso dark:text-night-text font-semibold block mb-0.5">Math & Logic</span>
                  <span className="text-[10px] text-espresso-muted dark:text-night-muted">Formal models, data & proof</span>
                </div>
                <div className="bg-matcha-soft/60 dark:bg-matcha-dark/40 p-3 rounded-lg border border-matcha/30 dark:border-matcha/40">
                  <span className="text-matcha-dark dark:text-matcha-glow font-bold block mb-0.5">⇄ Economics ⇄</span>
                  <span className="text-[10px] text-matcha-dark/80 dark:text-matcha-glow/80">The Connective Bridge</span>
                </div>
                <div className="bg-terracotta-soft/40 dark:bg-terracotta/20 p-3 rounded-lg border border-terracotta/20 dark:border-terracotta/30">
                  <span className="text-terracotta dark:text-terracotta-glow font-semibold block mb-0.5">Human Psychology</span>
                  <span className="text-[10px] text-espresso-muted dark:text-night-muted">Behavior, incentives & choice</span>
                </div>
              </div>
            </div>

            {/* Cozy art footer note */}
            <div className="mt-6 pt-5 border-t border-espresso/8 dark:border-night-border flex items-center gap-3">
              <img
                src="images/cozy/relax-art.png"
                alt="Relaxing illustration"
                className="w-10 h-10 object-contain opacity-80 rounded-lg"
              />
              <span className="font-hand text-base text-espresso-muted dark:text-night-muted">
                always curious, always building for human delight ✦
              </span>
            </div>
          </Card>

          {/* Interactive Pillars Explorer Card */}
          <Card className="p-6 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border shadow-cozy">
            <h4 className="font-serif text-lg font-bold text-espresso dark:text-night-text mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-terracotta dark:text-terracotta-glow shrink-0" />
              Six Pillars of My Curiosity
            </h4>
            <p className="text-xs text-espresso-muted dark:text-night-muted mb-4 font-sans">
              Click any pillar to see how it shapes my perspective on product design:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {content.pillars?.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.id] || Sparkles;
                const isActive = pillar.id === activePillarId;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillarId(pillar.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-matcha-soft dark:bg-matcha-dark/50 border-matcha dark:border-matcha-glow shadow-xs'
                        : 'bg-card-alt/50 dark:bg-night-card-alt border-espresso/5 dark:border-night-border hover:border-matcha/30'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-matcha-dark dark:text-matcha-glow' : 'text-espresso-muted dark:text-night-muted'}`} />
                    <span className={`text-xs font-mono font-medium truncate ${isActive ? 'text-espresso font-semibold dark:text-night-text' : 'text-espresso-muted dark:text-night-muted'}`}>
                      {pillar.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activePillar && (
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="bg-mocha-soft/30 dark:bg-night-card-alt rounded-xl p-4 border border-espresso/8 dark:border-night-border"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="default" className="text-[10px] font-mono">
                      {activePillar.name}
                    </Badge>
                    <span className="text-xs font-hand text-espresso-muted dark:text-night-muted">
                      — {activePillar.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-espresso-light dark:text-night-muted font-sans leading-relaxed">
                    {activePillar.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Quick Facts sidebar */}
        <motion.div variants={fadeUp} className="md:col-span-4 flex flex-col gap-4">
          <Card className="p-5 bg-matcha-soft/50 dark:bg-matcha-dark/30 border-matcha/15 dark:border-matcha/30 shadow-inner-warm">
            <h4 className="font-serif text-lg font-bold text-matcha-dark dark:text-matcha-glow mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta dark:text-terracotta-glow" />
              Quick Facts
            </h4>
            <div className="space-y-4">
              {quickFacts.map((fact, idx) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.08 }}
                  >
                    <span className="font-mono text-[10px] text-espresso-muted/70 dark:text-night-muted/80 tracking-wider block mb-0.5 uppercase">
                      {fact.label}
                    </span>
                    <span className="font-medium text-[13px] text-espresso dark:text-night-text flex items-center gap-1.5 leading-snug">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${fact.color}`} />
                      {fact.value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          <Card className="p-5 bg-mocha-soft/40 dark:bg-night-card-alt border-mocha-light/30 dark:border-night-border flex items-center gap-3">
            <Coffee className="w-5 h-5 text-terracotta dark:text-terracotta-glow shrink-0" />
            <span className="font-hand text-base text-espresso-muted dark:text-night-muted">
              fueled by oat lattes & lofi beats ☕
            </span>
          </Card>
        </motion.div>
      </div>

      {/* ── Scrapbook Memories Wall ── */}
      <motion.div variants={fadeUp} className="pt-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-terracotta dark:text-terracotta-glow" />
            <h3 className="font-serif text-2xl font-bold text-espresso dark:text-night-text tracking-tight">
              Life & Memories Scrapbook
            </h3>
          </div>
          <span className="font-hand text-base text-espresso-muted dark:text-night-muted">
            San Francisco · Berkeley · San Jose · Yosemite ✦
          </span>
        </div>

        {/* 4 Photos displayed simultaneously in a 2x2 Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {content.scrapbook?.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`polaroid-frame p-4 rounded-xl group relative shadow-cozy hover:shadow-xl transition-all duration-300 ${photo.rotate}`}
            >
              <div className={`washi-tape ${photo.washiPos}`} />

              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-parchment-dark dark:bg-night-card-alt">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-60" />

                <span className="absolute bottom-2.5 left-2.5 bg-card/90 dark:bg-night-card/90 backdrop-blur-sm text-espresso dark:text-night-text text-[11px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-espresso/5">
                  <MapPin className="w-3 h-3 text-terracotta dark:text-terracotta-glow shrink-0" />
                  <span>{photo.location}</span>
                </span>
              </div>

              <div className="mt-3.5 px-1 flex items-start justify-between">
                <div>
                  <h4 className="font-hand text-xl font-bold text-espresso dark:text-night-text leading-tight">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-espresso-muted dark:text-night-muted font-sans mt-0.5">
                    {photo.caption}
                  </p>
                </div>
                <Badge variant="default" className="text-[11px] shrink-0 font-mono">
                  {photo.badge}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
