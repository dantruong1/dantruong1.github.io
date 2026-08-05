import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Quote, Sparkles, ArrowRight, Camera, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LofiPlayer } from './LofiPlayer';

export function HeroBento({ content, isPlaying, toggleLofi, onNavigate }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-14"
    >
      {/* ── Left Column: 4-Photo Scrapbook Collage ── */}
      <motion.div variants={item} className="lg:col-span-5 flex flex-col justify-between">
        <div className="bg-card/40 dark:bg-night-card/40 border border-espresso/8 dark:border-night-border rounded-cozy p-4 relative shadow-cozy">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="font-hand text-xl text-espresso dark:text-night-text font-bold flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-terracotta dark:text-terracotta-glow" />
              Dan's Scrapbook ✦
            </span>
            <Badge variant="default" className="text-[10px] font-mono">
              4 Memories
            </Badge>
          </div>

          {/* 2x2 Grid showing all 4 photos simultaneously */}
          <div className="grid grid-cols-2 gap-3.5">
            {content.scrapbook?.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.04, zIndex: 20, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`polaroid-frame p-2.5 rounded-lg group cursor-pointer relative transition-shadow hover:shadow-lg ${photo.rotate}`}
              >
                <div className={`washi-tape ${photo.washiPos}`} />

                <div className="relative overflow-hidden rounded aspect-[4/3] bg-parchment-dark dark:bg-night-card-alt">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                  />
                  <span className="absolute bottom-1 left-1 bg-card/90 dark:bg-night-card/90 backdrop-blur-sm text-espresso dark:text-night-text text-[9px] font-mono px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-espresso/5 shadow-xs">
                    <MapPin className="w-2.5 h-2.5 text-terracotta dark:text-terracotta-glow shrink-0" />
                    <span className="truncate max-w-[90px]">{photo.badge}</span>
                  </span>
                </div>

                <div className="mt-2 px-0.5">
                  <p className="font-hand text-sm leading-tight text-espresso font-semibold dark:text-night-text truncate">
                    {photo.title}
                  </p>
                  <p className="text-[10px] text-espresso-muted dark:text-night-muted truncate font-sans">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Small cozy illustration below collage */}
        <motion.div
          variants={item}
          className="flex items-center justify-center mt-4"
        >
          <a
            href="https://open.spotify.com/playlist/1YDjqI9NAcpVAYl8vddTmh?si=qypJP3VnQge_a71wqos-6w"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mocha-soft/60 dark:bg-night-card-alt hover:bg-mocha-soft/90 dark:hover:bg-night-card rounded-cozy px-5 py-2.5 flex items-center gap-3 border border-mocha-light/50 dark:border-night-border w-full justify-center transition-all duration-200 hover:scale-[1.02] hover:shadow-sm cursor-pointer group"
          >
            <img
              src="images/cozy/gameboy-vines.png"
              alt="Cozy gameboy doodle"
              className="w-8 h-8 object-contain opacity-80 group-hover:scale-110 transition-transform duration-200"
            />
            <span className="font-hand text-base text-espresso-muted dark:text-night-muted group-hover:text-espresso dark:group-hover:text-night-text transition-colors">
              lofi beats & warm coffee ☕
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Right Column: Bio Card + Player + Quote ── */}
      <motion.div variants={item} className="lg:col-span-7 flex flex-col gap-7">
        {/* Main Bio Card */}
        <Card className="p-7 md:p-9 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border relative overflow-hidden flex-1 flex flex-col justify-between shadow-cozy">
          <div className="washi-tape washi-tape-top-right" />

          <div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-espresso dark:text-night-text tracking-tight mb-3 leading-[1.1]">
              {content.hero.name}
            </h1>

            <p className="text-sm font-mono text-matcha-dark dark:text-matcha-glow font-medium mb-1 tracking-wide">
              {content.hero.role}
            </p>
            <p className="text-xs text-espresso-muted dark:text-night-muted font-sans mb-6">
              {content.hero.subrole}
            </p>

            {/* Core Narrative Paragraphs with balanced spacing & hierarchy */}
            <div className="space-y-4 text-[15px] text-espresso-light dark:text-night-muted leading-[1.8] font-sans">
              <p>
                I am{' '}
                <strong className="text-espresso dark:text-night-text font-semibold underline decoration-terracotta/40 decoration-2 underline-offset-2">
                  endlessly fascinated by people
                </strong>{' '}
                : understanding why we make the decisions we do, how incentives shape human behavior, and how thoughtful products can improve everyday lives.
              </p>
              <p>
                As a Technical Product Manager on the Xbox team at Microsoft, I love chasing meaningful problems with great people, building helpful AI-powered tools, and bringing human-centered experiences to life.
              </p>
            </div>
          </div>

          {/* Action pills aligned clean at bottom */}
          <div className="flex flex-wrap gap-2.5 pt-6 mt-6 border-t border-espresso/8 dark:border-night-border">
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-mono text-matcha-dark dark:text-matcha-glow bg-matcha-soft dark:bg-matcha-dark/40 hover:bg-matcha-light px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:shadow-xs hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onNavigate('writings')}
              className="text-xs font-mono text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text bg-card-alt dark:bg-night-card-alt hover:bg-parchment-dark px-4 py-2 rounded-full transition-all duration-200 border border-espresso/5 dark:border-night-border hover:-translate-y-0.5"
            >
              Read Essays & Op-Eds
            </button>
            <a
              href="https://www.linkedin.com/in/dantruong1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-terracotta dark:text-terracotta-glow hover:text-terracotta bg-terracotta-soft/50 dark:bg-terracotta/30 hover:bg-terracotta-soft px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              LinkedIn ↗
            </a>
          </div>
        </Card>

        {/* Lofi Radio + Quote — two equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LofiPlayer isPlaying={isPlaying} toggleLofi={toggleLofi} />

          <Card className="p-5 bg-matcha-soft/50 dark:bg-matcha-dark/30 border-matcha/15 dark:border-matcha/30 flex flex-col justify-between relative overflow-hidden shadow-inner-warm">
            <Quote className="w-7 h-7 text-matcha/25 dark:text-matcha-glow/20 absolute top-3 right-3" />
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-matcha-dark/70 dark:text-matcha-glow/90 mb-2 block">favorite saying</span>
              <p className="font-serif italic text-[15px] text-matcha-dark dark:text-night-text leading-relaxed font-medium">
                "{content.hero.quote}"
              </p>
            </div>
            <span className="font-mono text-[10px] text-matcha-dark/60 dark:text-night-muted text-right mt-3">
              {content.hero.quoteAttr}
            </span>
          </Card>
        </div>
      </motion.div>
    </motion.section>
  );
}
