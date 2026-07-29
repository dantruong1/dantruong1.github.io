import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Quote, Sparkles, ArrowRight, Pen } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LofiPlayer } from './LofiPlayer';

export function HeroBento({ content, isPlaying, toggleLofi, onNavigate }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-14"
    >
      {/* ── Left Column: Polaroid Photo ── */}
      <motion.div variants={item} className="lg:col-span-5 flex flex-col justify-center">
        <div className="polaroid-frame rounded-cozy group cursor-pointer relative">
          <div className="washi-tape washi-tape-top-left" />
          <div className="washi-tape washi-tape-bottom" />

          <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-parchment-dark">
            <img
              src={content.hero.photo}
              alt="Golden Gate Bridge at sunset, San Francisco"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent" />

            <span className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm text-espresso text-[11px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-espresso/5">
              <MapPin className="w-3 h-3 text-terracotta" />
              {content.hero.location}
            </span>
          </div>

          {/* Handwritten caption below the photo */}
          <div className="mt-3 px-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-hand text-lg text-espresso-muted">
                Golden Gate Sunset · 2024
              </span>
              <Pen className="w-3 h-3 text-terracotta/50" />
            </div>
            <Badge variant="default" className="text-[10px]">
              Bay Area ☀
            </Badge>
          </div>
        </div>

        {/* Small cozy illustration below polaroid on desktop */}
        <motion.div
          variants={item}
          className="hidden lg:flex items-center justify-center mt-5"
        >
          <div className="bg-mocha-soft/60 rounded-cozy px-5 py-3 flex items-center gap-3 border border-mocha-light/50">
            <img
              src="images/cozy/gameboy-vines.png"
              alt="Cozy gameboy doodle"
              className="w-10 h-10 object-contain opacity-80"
            />
            <span className="font-hand text-base text-espresso-muted">
              lofi beats & warm coffee ☕
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right Column: Bio + Player + Quote ── */}
      <motion.div variants={item} className="lg:col-span-7 flex flex-col gap-7">
        {/* Main Bio Card */}
        <Card className="p-7 md:p-9 bg-card border-espresso/8 relative overflow-hidden flex-1 flex flex-col justify-between shadow-cozy">
          <div className="washi-tape washi-tape-top-right" />

          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="font-hand text-2xl text-terracotta font-semibold">
                {content.hero.greeting}
              </span>
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                <Sparkles className="w-4 h-4 text-amber-warm" />
              </motion.div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-espresso tracking-tight mb-3 leading-[1.1]">
              {content.hero.name}
            </h1>

            <p className="text-sm font-mono text-matcha-dark font-medium mb-1 tracking-wide">
              {content.hero.role}
            </p>
            <p className="text-xs text-espresso-muted font-sans mb-5">
              {content.hero.subrole}
            </p>

            <p className="text-[15px] text-espresso-light leading-[1.75] mb-6 font-sans max-w-xl">
              I'm a product builder fascinated by how{' '}
              <strong className="text-espresso font-semibold underline decoration-matcha/40 decoration-2 underline-offset-2">
                economics
              </strong>{' '}
              and{' '}
              <strong className="text-espresso font-semibold underline decoration-terracotta/40 decoration-2 underline-offset-2">
                technology
              </strong>{' '}
              intersect to shape human behavior. On the Xbox team at Microsoft, I turn complex system incentives and data insights into{' '}
              <em className="not-italic text-matcha-dark font-medium">delightful consumer experiences</em>.
            </p>
          </div>

          {/* Action pills */}
          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-espresso/8">
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-mono text-matcha-dark bg-matcha-soft hover:bg-matcha-light px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:shadow-sm"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onNavigate('writings')}
              className="text-xs font-mono text-espresso-muted hover:text-espresso bg-card-alt hover:bg-parchment-dark px-4 py-2 rounded-full transition-all duration-200"
            >
              Read Essays & Op-Eds
            </button>
            <a
              href="https://www.linkedin.com/in/dantruong1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-terracotta/80 hover:text-terracotta bg-terracotta-soft/50 hover:bg-terracotta-soft px-4 py-2 rounded-full transition-all duration-200"
            >
              LinkedIn ↗
            </a>
          </div>
        </Card>

        {/* Lofi Radio + Quote — two equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LofiPlayer isPlaying={isPlaying} toggleLofi={toggleLofi} />

          <Card className="p-5 bg-matcha-soft/50 border-matcha/15 flex flex-col justify-between relative overflow-hidden shadow-inner-warm">
            <Quote className="w-7 h-7 text-matcha/25 absolute top-3 right-3" />
            <div>
              <span className="font-hand text-sm text-matcha-dark/70 mb-2 block">favorite saying</span>
              <p className="font-serif italic text-[15px] text-matcha-dark leading-relaxed font-medium">
                "{content.hero.quote}"
              </p>
            </div>
            <span className="font-mono text-[10px] text-matcha-dark/60 text-right mt-3">
              {content.hero.quoteAttr}
            </span>
          </Card>
        </div>
      </motion.div>
    </motion.section>
  );
}
