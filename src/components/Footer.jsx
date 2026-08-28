import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Github, Linkedin, BookOpen, ArrowUp, Sparkles, Sun, Moon } from 'lucide-react';

export function Footer({ onScrollTop, isDarkMode, toggleDarkMode }) {
  return (
    <footer className="mt-20 relative">
      {/* Organic divider */}
      <div className="organic-divider mb-10" />

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6 pb-14 sm:pb-16" style={{ paddingBottom: 'calc(3.5rem + env(safe-area-inset-bottom, 0px))' }}>
        {/* Actions: Back to top & Theme switcher */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onScrollTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-matcha-soft dark:bg-matcha-dark/40 text-matcha-dark dark:text-matcha-glow flex items-center justify-center hover:bg-matcha-light dark:hover:bg-matcha-dark transition-all duration-200 shadow-xs border border-matcha/20 dark:border-matcha/30 cursor-pointer"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>

          {toggleDarkMode && (
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="h-10 px-4 rounded-full bg-matcha-soft dark:bg-matcha-dark/40 text-matcha-dark dark:text-matcha-glow flex items-center gap-2 hover:bg-matcha-light dark:hover:bg-matcha-dark transition-all duration-200 shadow-xs border border-matcha/20 dark:border-matcha/30 cursor-pointer text-xs font-mono font-medium"
              aria-label="Toggle theme"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-warm" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-espresso dark:text-night-text" />
                  <span>Light Mode</span>
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
          {[
            { href: 'https://www.linkedin.com/in/dantruong1/', icon: Linkedin, label: 'LinkedIn' },
            { href: 'https://github.com/dantruong1', icon: Github, label: 'GitHub' },
            { href: 'https://substack.com/@dantruong12', icon: BookOpen, label: 'Substack' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-1.5 text-xs font-mono text-espresso-muted dark:text-night-muted hover:text-matcha-dark dark:hover:text-matcha-glow transition-colors duration-200 px-2 py-1.5 rounded-md hover:bg-parchment-dark/40 dark:hover:bg-night-card-alt"
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

        <span className="text-[11px] font-mono text-espresso-muted/60 dark:text-night-muted/60">
          last updated: 08/14/2026 · UC Berkeley '24
        </span>
      </div>
    </footer>
  );
}
