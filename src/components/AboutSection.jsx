import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Sparkles, Heart, Coffee, Code2 } from 'lucide-react';
import { Card } from './ui/card';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const quickFacts = [
  { label: 'CURRENT ROLE', value: 'Xbox @ Microsoft (TPM 2)', icon: Briefcase, color: 'text-matcha' },
  { label: 'ALMA MATER', value: 'UC Berkeley \'24', icon: GraduationCap, color: 'text-matcha' },
  { label: 'LOCATION', value: 'San Francisco, CA', icon: MapPin, color: 'text-terracotta' },
  { label: 'INTERESTS', value: 'Data Econ · Lofi R&B · Essays', icon: Heart, color: 'text-terracotta' },
];

export function AboutSection({ content }) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto mb-14"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <span className="font-hand text-xl text-terracotta">background</span>
        <h2 className="font-serif text-3xl font-bold text-espresso tracking-tight">{content.about.title}</h2>
        <div className="organic-divider flex-1" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
        {/* Main text */}
        <motion.div variants={fadeUp} className="md:col-span-8">
          <Card className="p-7 md:p-9 bg-card border-espresso/8 relative overflow-hidden shadow-cozy">
            <div className="washi-tape washi-tape-top-left" />

            <h3 className="font-serif text-xl font-semibold text-espresso mb-5 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-matcha" />
              Building at the intersection of Economics & Technology
            </h3>

            <div className="space-y-4 text-espresso-light text-[15px] leading-[1.8] font-sans">
              {content.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Cozy illustration at bottom */}
            <div className="mt-6 pt-5 border-t border-espresso/8 flex items-center gap-3">
              <img
                src="images/cozy/relax-art.png"
                alt="Relaxing illustration"
                className="w-12 h-12 object-contain opacity-70 rounded-lg"
              />
              <span className="font-hand text-base text-espresso-muted">
                always learning, always building ✦
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Quick Facts sidebar */}
        <motion.div variants={fadeUp} className="md:col-span-4 flex flex-col gap-4">
          <Card className="p-5 bg-matcha-soft/50 border-matcha/15 shadow-inner-warm">
            <h4 className="font-hand text-xl font-bold text-matcha-dark mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta" />
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
                    <span className="font-mono text-[10px] text-espresso-muted/70 tracking-wider block mb-0.5">
                      {fact.label}
                    </span>
                    <span className="font-medium text-[13px] text-espresso flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${fact.color}`} />
                      {fact.value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          <Card className="p-5 bg-mocha-soft/40 border-mocha-light/30 flex items-center gap-3">
            <Coffee className="w-5 h-5 text-terracotta" />
            <span className="font-hand text-base text-espresso-muted">
              fueled by oat lattes & lofi beats
            </span>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
