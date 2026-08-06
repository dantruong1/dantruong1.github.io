import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Github, Linkedin, Mail, ArrowUp, Sparkles } from 'lucide-react';

export function Footer({ onScrollTop }) {
  return (
    <footer className="mt-20 relative">
      {/* Organic divider */}
      <div className="organic-divider mb-10" />

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6 pb-14">
        {/* Back to top */}
        <motion.button
          onClick={onScrollTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-matcha-soft dark:bg-matcha-dark/40 text-matcha-dark dark:text-matcha-glow flex items-center justify-center hover:bg-matcha-light dark:hover:bg-matcha-dark transition-all duration-200 shadow-xs border border-matcha/20 dark:border-matcha/30"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>

        {/* Social links */}
        <div className="flex items-center gap-5">
          {[
            { href: 'https://www.linkedin.com/in/dantruong1/', icon: Linkedin, label: 'LinkedIn' },
            { href: 'https://github.com/dantruong1', icon: Github, label: 'GitHub' },
            { href: 'mailto:contact@dantruong.com', icon: Mail, label: 'Contact' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-1.5 text-[12px] font-mono text-espresso-muted dark:text-night-muted hover:text-matcha-dark dark:hover:text-matcha-glow transition-colors duration-200"
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Crafted with */}
        <div className="flex items-center gap-2 text-[12px] font-sans text-espresso-muted/80 dark:text-night-muted/80">
          <span>Crafted with</span>
          <span className="coffee-steam relative inline-block">
            <Coffee className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow" />
          </span>
          <span>& warm lofi beats</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-warm shrink-0" />
        </div>

        <span className="text-[10px] font-mono text-espresso-muted/50 dark:text-night-muted/50">
          © {new Date().getFullYear()} Dan Truong · UC Berkeley '24
        </span>
      </div>
    </footer>
  );
}
