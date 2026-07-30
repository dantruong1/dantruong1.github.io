import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, BookOpen, Quote, Lightbulb, Gamepad2, User, Coffee, MapPin } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar({ activeTab, setActiveTab, isPlaying, toggleLofi }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'about', label: 'About', icon: User },
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
      className="sticky top-5 z-50 mb-10"
    >
      <div className="bg-card/85 backdrop-blur-lg border border-espresso/8 rounded-cozy-lg shadow-cozy px-5 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 group text-left shrink-0"
        >
          {/* Coffee cup doodle */}
          <span className="w-8 h-8 rounded-full bg-mocha-soft flex items-center justify-center group-hover:bg-matcha-soft transition-colors duration-300">
            <Coffee className="w-4 h-4 text-terracotta group-hover:text-matcha transition-colors duration-300" />
          </span>
          <div className="hidden sm:block">
            <span className="font-serif text-2xl font-bold text-espresso group-hover:text-matcha-dark transition-colors leading-none block tracking-tight">
              Dan Truong
            </span>
            <span className="text-[10px] font-mono text-espresso-muted leading-none">
              xbox @ microsoft
            </span>
          </div>
        </button>

        {/* Navigation pills */}
        <nav className="flex items-center gap-0.5 overflow-x-auto no-scrollbar py-0.5">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <span className="nav-dot mx-1 hidden lg:block" />}
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-espresso-muted hover:text-espresso hover:bg-parchment-dark/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-matcha rounded-full -z-10"
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
    </motion.header>
  );
}
