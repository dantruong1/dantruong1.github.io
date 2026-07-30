import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, BookOpen, Quote, Lightbulb, Gamepad2, User, Coffee, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar({ activeTab, setActiveTab, isPlaying, toggleLofi, isDarkMode, toggleDarkMode }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'projects', label: 'Projects', icon: Gamepad2 },
    { id: 'writings', label: 'Writings', icon: BookOpen },
    { id: 'quotes', label: 'Quotes', icon: Quote },
    { id: 'music', label: 'Music', icon: Music },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-4 z-50 mb-10 w-full"
    >
      <div className="bg-card/90 dark:bg-night-card/90 backdrop-blur-md border border-espresso/8 dark:border-night-border rounded-cozy-lg shadow-cozy dark:shadow-dark-cozy px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3 md:gap-4">
        {/* Brand */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 group text-left shrink-0"
        >
          {/* Coffee cup doodle */}
          <span className="w-8 h-8 rounded-full bg-mocha-soft dark:bg-night-card-alt flex items-center justify-center group-hover:bg-matcha-soft dark:group-hover:bg-matcha-dark transition-colors duration-300">
            <Coffee className="w-4 h-4 text-terracotta dark:text-terracotta-glow group-hover:text-matcha dark:group-hover:text-matcha-glow transition-colors duration-300" />
          </span>
          <div className="hidden sm:block">
            <span className="font-serif text-xl sm:text-2xl font-bold text-espresso dark:text-night-text group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors leading-none block tracking-tight">
              Dan Truong
            </span>
            <span className="text-[10px] font-mono text-espresso-muted dark:text-night-muted leading-none">
              xbox @ microsoft
            </span>
          </div>
        </button>

        {/* Navigation pills — horizontal layout */}
        <nav className="flex items-center gap-0.5 md:gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <span className="nav-dot mx-0.5 hidden xl:block" />}
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-2.5 sm:px-3 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text hover:bg-parchment-dark/60 dark:hover:bg-night-card-alt/80'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-matcha dark:bg-matcha-dark rounded-full -z-10"
                      style={{ boxShadow: '0 2px 8px rgba(138,154,123,0.3)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Controls: Dark Mode Toggle & Lofi Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark Espresso Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full bg-parchment-dark dark:bg-night-card-alt text-espresso dark:text-amber-warm flex items-center justify-center hover:scale-105 transition-all shadow-xs border border-espresso/5 dark:border-night-border"
            title={isDarkMode ? 'Switch to Light Parchment' : 'Switch to Dark Espresso'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-warm" />
            ) : (
              <Moon className="w-4 h-4 text-espresso" />
            )}
          </button>

          {/* Lofi Toggle */}
          <Button
            variant={isPlaying ? 'terracotta' : 'outline'}
            size="sm"
            onClick={toggleLofi}
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono shrink-0"
          >
            {isPlaying ? (
              <span className="flex items-center gap-1.5">
                <span className="flex items-end gap-px h-3.5">
                  <span className="eq-bar animate-eq-bar-1 bg-white" style={{ height: '6px' }} />
                  <span className="eq-bar animate-eq-bar-2 bg-white" style={{ height: '10px' }} />
                  <span className="eq-bar animate-eq-bar-3 bg-white" style={{ height: '4px' }} />
                </span>
                Lofi On
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Music className="w-3.5 h-3.5" />
                Lofi Beats
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
