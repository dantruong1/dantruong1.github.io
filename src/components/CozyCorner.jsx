import React from 'react';
import { CardScene } from './PixelScenes';
import { PixelGarden } from './PixelGarden';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Lightbulb, Quote, User, Package, ArrowRight, Heart } from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';

const COZY_CARDS = [
  {
    id: 'about',
    title: 'About',
    desc: 'UC Berkeley background, economics, and Xbox @ MSFT.',
    icon: User,
    accent: 'bg-mocha-soft text-mocha',
    border: 'hover:border-mocha-light',
    handNote: 'bio & background ◯',
  },
  {
    id: 'products',
    title: 'Favorite Products',
    desc: 'Take an interactive tour through my apartment and see the products I use every day.',
    icon: Package,
    accent: 'bg-terracotta-soft text-terracotta',
    border: 'hover:border-terracotta-muted',
    handNote: 'apartment tour 🏠',
  },
  {
    id: 'wishlist',
    title: 'My Wishlist',
    desc: 'A directory of items, gear, clothing, and everyday upgrades on my wishlist.',
    icon: Heart,
    accent: 'bg-amber-light text-amber-warm',
    border: 'hover:border-amber-warm/40',
    handNote: 'wishlist items ✦',
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    desc: 'Interactive map of my favorite SF spots + curated list of books & videos.',
    icon: Lightbulb,
    accent: 'bg-amber-light text-amber-warm',
    border: 'hover:border-amber-warm/40',
    handNote: 'sf spots & reads 📍',
  },
  {
    id: 'creations',
    title: "Things I've Created",
    desc: "Apps I've built, published op-eds & essays, and creative software builds.",
    icon: Layers,
    accent: 'bg-matcha-soft text-matcha-dark',
    border: 'hover:border-matcha',
    handNote: 'apps & writings ✦',
  },
  {
    id: 'quotes',
    title: 'Quotes',
    desc: 'Sayings and wisdom that guide my thinking and work.',
    icon: Quote,
    accent: 'bg-matcha-soft text-matcha-dark',
    border: 'hover:border-matcha',
    handNote: 'favorite words 〃',
  },
];

export function CozyCorner({ onNavigate }) {
  const reducedMotion = useReducedMotion();

  return (
    <section id="cozy-corner" className="mb-14 scroll-mt-24">
      <PixelGarden />
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta-soft/60 px-3 py-1 rounded-full border border-terracotta/10 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
          explore
        </span>
        <h2 className="font-serif text-2xl font-bold text-espresso dark:text-night-text tracking-tight">
          The Cozy Corner
        </h2>
        <div className="organic-divider flex-1" />
      </div>

      {/* Grid: 2-column on mobile for compact vertical footprint, 2-col on tablet, 3-col on desktop */}
      <div className="cozy-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {COZY_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.a
              href={`#/${card.id}`}
              key={card.id}
              initial={reducedMotion ? false : { y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              onClick={(event) => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); onNavigate(card.id); } }}
              className={`cozy-link cozy-link--${card.id} cursor-pointer`}
            >
              <Card className={`p-3.5 sm:p-6 h-full flex flex-col justify-between group ${card.border} relative transition-all duration-300 shadow-cozy`}>
                {/* Hand note — shown on sm+ screens */}
                <span className="hidden sm:block font-hand text-[13px] text-espresso-muted/60 absolute top-4 right-5 group-hover:text-terracotta transition-colors duration-300">
                  {card.handNote}
                </span>

                <div className="mb-3 sm:mb-5">
                  <CardScene kind={card.id} />

                  <CardTitle className="mb-1.5 sm:mb-2 text-base sm:text-lg group-hover:text-espresso transition-colors font-serif leading-tight">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-[13px] text-espresso-muted leading-relaxed ">
                    {card.desc}
                  </CardDescription>
                </div>

                {/* Footer link */}
                <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-mono text-matcha font-medium group-hover:text-matcha-dark transition-colors">
                  <span>Open section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Card>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
