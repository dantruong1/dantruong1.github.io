import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, BookOpen, Lightbulb, Quote, Music, User, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';

export function CozyCorner({ onNavigate }) {
  const cards = [
    {
      id: 'sf-map',
      title: 'SF Recommendations Map',
      desc: 'Interactive map of my favorite bakeries, viewpoints, food & drinks in SF.',
      icon: MapPin,
      accent: 'bg-terracotta-soft text-terracotta',
      border: 'hover:border-terracotta',
      handNote: 'sf spots 📍',
    },
    {
      id: 'projects',
      title: 'Projects & Code',
      desc: 'Consumer products, data economics, and personal code builds.',
      icon: Gamepad2,
      accent: 'bg-matcha-soft text-matcha-dark',
      border: 'hover:border-matcha',
      handNote: 'things built ✦',
    },
    {
      id: 'writings',
      title: 'Writings & Op-Eds',
      desc: 'Daily Cal op-eds, tech reflections, and college essays.',
      icon: BookOpen,
      accent: 'bg-terracotta-soft text-terracotta',
      border: 'hover:border-terracotta-muted',
      handNote: 'thoughts & essays ✎',
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      desc: 'Paul Graham, investment philosophy, and curated reads.',
      icon: Lightbulb,
      accent: 'bg-amber-light text-amber-warm',
      border: 'hover:border-amber-warm/40',
      handNote: 'curated gems ✧',
    },
    {
      id: 'quotes',
      title: 'Quote Collection',
      desc: 'Sayings and wisdom that guide my thinking and work.',
      icon: Quote,
      accent: 'bg-matcha-soft text-matcha-dark',
      border: 'hover:border-matcha',
      handNote: 'favorite words 〃',
    },
    {
      id: 'music',
      title: 'Music & Vibes',
      desc: 'Frank Ocean, BROCKHAMPTON, keshi, and lofi focus rotations.',
      icon: Music,
      accent: 'bg-terracotta-soft text-terracotta',
      border: 'hover:border-terracotta-muted',
      handNote: 'daily rotation ♪',
    },
    {
      id: 'about',
      title: 'About Dan',
      desc: 'UC Berkeley background, economics, and Xbox @ MSFT.',
      icon: User,
      accent: 'bg-mocha-soft text-mocha',
      border: 'hover:border-mocha-light',
      handNote: 'bio & background ◯',
    },
  ];

  return (
    <section className="mb-14">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-hand text-xl text-terracotta">explore</span>
        <h2 className="font-serif text-2xl font-bold text-espresso tracking-tight">
          The Cozy Corner
        </h2>
        <div className="organic-divider flex-1" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => onNavigate(card.id)}
              className="cursor-pointer"
            >
              <Card className={`p-6 h-full flex flex-col justify-between group ${card.border} relative transition-all duration-300`}>
                {/* Hand note */}
                <span className="font-hand text-[13px] text-espresso-muted/60 absolute top-4 right-5 group-hover:text-terracotta transition-colors duration-300">
                  {card.handNote}
                </span>

                <div className="mb-5">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-cozy flex items-center justify-center ${card.accent} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>

                  <CardTitle className="mb-2 text-lg group-hover:text-espresso transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-[13px] text-espresso-muted leading-relaxed">
                    {card.desc}
                  </CardDescription>
                </div>

                {/* Footer link */}
                <div className="flex items-center gap-1.5 text-[12px] font-mono text-matcha font-medium group-hover:text-matcha-dark transition-colors">
                  <span>Open section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
