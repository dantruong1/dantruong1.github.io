import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music, BookOpen, Quote, Lightbulb, User, Coffee, Moon, Sun, Package, Layers, Menu, X, Heart } from 'lucide-react';
import { Button } from './ui/button';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Sparkles },
  { id: 'about', label: 'About', icon: User },
  { id: 'products', label: 'Favorite Products', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  { id: 'creations', label: "Things I've Created", icon: Layers },
  { id: 'quotes', label: 'Quotes', icon: Quote },
];

export function Navbar({ activeTab, setActiveTab, isPlaying, toggleLofi, isDarkMode, toggleDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectNav = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-3 sm:top-4 z-50 mb-6 sm:mb-10 w-full"
    >
      <div className="bg-card/90 dark:bg-night-card/90 backdrop-blur-md border border-espresso/8 dark:border-night-border rounded-cozy-lg shadow-cozy dark:shadow-dark-cozy px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3 md:gap-4 w-full">
        {/* Brand */}
        <button
          onClick={() => handleSelectNav('home')}
          className="flex items-center gap-2 group text-left shrink-0"
        >
          {/* Coffee cup doodle */}
          <span className="w-8 h-8 rounded-full bg-mocha-soft dark:bg-night-card-alt flex items-center justify-center group-hover:bg-matcha-soft dark:group-hover:bg-matcha-dark transition-colors duration-300">
            <Coffee className="w-4 h-4 text-terracotta dark:text-terracotta-glow group-hover:text-matcha dark:group-hover:text-matcha-glow transition-colors duration-300" />
          </span>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold text-espresso dark:text-night-text group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors leading-none block tracking-tight">
              Dan Truong
            </span>
            <span className="text-[9px] font-mono text-espresso-muted dark:text-night-muted leading-none hidden sm:block">
              product at microsoft
            </span>
          </div>
        </button>

        {/* Desktop Navigation pills (hidden on mobile/tablet, visible on lg+) */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 justify-center flex-1 max-w-full">
          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <span className="nav-dot mx-0.5 hidden xl:block" />}
                <button
                  onClick={() => handleSelectNav(item.id)}
                  className={`relative px-2.5 md:px-3 py-1.5 rounded-full text-[12px] md:text-[12.5px] font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
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
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="inline">{item.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Controls: Dark / Light Mode Toggle, Lofi Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Theme Mode Switcher Pill */}
          <button
            onClick={toggleDarkMode}
            className="h-8 px-2.5 sm:px-3 rounded-full bg-parchment-dark/80 dark:bg-night-card-alt text-espresso dark:text-night-text flex items-center gap-1.5 hover:border-matcha-dark dark:hover:border-matcha-glow transition-all duration-200 shadow-xs border border-espresso/10 dark:border-night-border cursor-pointer group text-[11px] sm:text-[12px] font-mono font-medium"
            title={isDarkMode ? 'Switch to Light Parchment mode' : 'Switch to Dark Espresso mode'}
            aria-label="Toggle theme mode"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-warm group-hover:rotate-45 transition-transform duration-300 shrink-0" />
                <span className="hidden xs:inline">Dark</span>
                <span className="xs:hidden">Dark</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-espresso dark:text-night-text group-hover:-rotate-12 transition-transform duration-300 shrink-0" />
                <span className="hidden xs:inline">Light</span>
                <span className="xs:hidden">Light</span>
              </>
            )}
          </button>

          {/* Desktop Lofi Toggle */}
          <Button
            variant={isPlaying ? 'terracotta' : 'outline'}
            size="sm"
            onClick={toggleLofi}
            className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono shrink-0 h-8 px-3"
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

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden h-8 w-8 rounded-full bg-parchment-dark/80 dark:bg-night-card-alt text-espresso dark:text-night-text flex items-center justify-center hover:border-matcha-dark dark:hover:border-matcha-glow transition-all duration-200 border border-espresso/10 dark:border-night-border cursor-pointer shadow-xs"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-terracotta dark:text-terracotta-glow" />
            ) : (
              <Menu className="w-4 h-4 text-espresso dark:text-night-text" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Top-Down Slide-in Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden mt-2 bg-card dark:bg-night-card border border-espresso/10 dark:border-night-border rounded-cozy shadow-cozy-lg p-3 sm:p-4 space-y-1.5"
          >
            <div className="grid grid-cols-1 gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectNav(item.id)}
                    className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-matcha dark:bg-matcha-dark text-white font-semibold shadow-xs'
                        : 'text-espresso dark:text-night-text hover:bg-parchment-dark/70 dark:hover:bg-night-card-alt'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-white/20 text-white' : 'bg-mocha-soft/70 dark:bg-night-card-alt text-matcha-dark dark:text-matcha-glow'
                      }`}>
                        <Icon className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Lofi Beat Player Row */}
            <div className="pt-2 mt-2 border-t border-espresso/8 dark:border-night-border flex items-center justify-between gap-2 px-1">
              <span className="text-xs font-mono text-espresso-muted dark:text-night-muted flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow" />
                Background Lofi
              </span>
              <button
                onClick={toggleLofi}
                className={`text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-xs ${
                  isPlaying
                    ? 'bg-terracotta text-white font-semibold'
                    : 'bg-parchment-dark dark:bg-night-card-alt text-espresso dark:text-night-text border border-espresso/10 dark:border-night-border'
                }`}
              >
                {isPlaying ? (
                  <>
                    <span className="flex items-end gap-px h-3">
                      <span className="eq-bar animate-eq-bar-1 bg-white" style={{ height: '4px' }} />
                      <span className="eq-bar animate-eq-bar-2 bg-white" style={{ height: '8px' }} />
                      <span className="eq-bar animate-eq-bar-3 bg-white" style={{ height: '3px' }} />
                    </span>
                    <span>Playing</span>
                  </>
                ) : (
                  <span>Play Lofi</span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

