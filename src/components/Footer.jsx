import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Github, Linkedin, Mail, ArrowUp, Leaf } from 'lucide-react';

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
          className="w-10 h-10 rounded-full bg-matcha-soft text-matcha-dark flex items-center justify-center hover:bg-matcha-light transition-colors shadow-sm border border-matcha/15"
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
              className="flex items-center gap-1.5 text-[12px] font-mono text-espresso-muted hover:text-matcha transition-colors duration-200"
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Crafted with */}
        <div className="flex items-center gap-2 text-[12px] font-sans text-espresso-muted/70">
          <span>Crafted with</span>
          <span className="coffee-steam relative inline-block">
            <Coffee className="w-3.5 h-3.5 text-terracotta" />
          </span>
          <span>& lofi beats</span>
          <Leaf className="w-3 h-3 text-matcha/60" />
        </div>

        {/* Closing quote */}
        <p className="font-hand text-lg text-terracotta/70 text-center max-w-sm leading-snug">
          "The cold water does not get warmer if you jump late."
        </p>

        <span className="text-[10px] font-mono text-espresso-muted/40">
          © {new Date().getFullYear()} Dan Truong · UC Berkeley '24
        </span>
      </div>
    </footer>
  );
}
