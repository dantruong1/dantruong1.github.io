import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONTENT } from './data/content';
import { Navbar } from './components/Navbar';
import { HeroBento } from './components/HeroBento';
import { CozyCorner } from './components/CozyCorner';
import { AboutSection } from './components/AboutSection';
import { CreationsSection } from './components/CreationsSection';
import { QuotesSection } from './components/QuotesSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import { ProductRecsSection } from './components/ProductRecsSection';
import { WishlistSection } from './components/WishlistSection';

import { GlobalLofiEngine } from './components/GlobalLofiEngine';
import { Footer } from './components/Footer';
import { LOFI_PRESETS } from './data/lofiPresets';

const VALID_TABS = ['about', 'products', 'wishlist', 'recommendations', 'creations', 'projects', 'writings', 'quotes', 'home'];

const getTabFromHash = () => {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return VALID_TABS.includes(hash) ? hash : 'home';
};

export default function App() {
  const [activeTab, setActiveTabState] = useState(getTabFromHash);

  const handleTabChange = useCallback((tabId) => {
    setActiveTabState(tabId);
    const targetHash = tabId === 'home' ? '#/' : `#/${tabId}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
  }, []);

  useEffect(() => {
    const handleHashOrPopState = () => {
      setActiveTabState(getTabFromHash());
    };

    window.addEventListener('hashchange', handleHashOrPopState);
    window.addEventListener('popstate', handleHashOrPopState);

    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('popstate', handleHashOrPopState);
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [presetIdx, setPresetIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Dark Mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply .dark class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const toggleLofi = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const stopLofi = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleNextPreset = useCallback(() => {
    setPresetIdx((prev) => (prev + 1) % LOFI_PRESETS.length);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection content={SITE_CONTENT} />;
      case 'products':
        return <ProductRecsSection />;
      case 'wishlist':
        return <WishlistSection />;
      case 'creations':
      case 'projects':
      case 'writings':
        return <CreationsSection content={SITE_CONTENT} />;
      case 'quotes':
        return <QuotesSection content={SITE_CONTENT} />;
      case 'recommendations':
        return <RecommendationsSection content={SITE_CONTENT} onVideoPlay={stopLofi} />;

      case 'home':
      default:
        return (
          <>
            <HeroBento
              content={SITE_CONTENT}
              isPlaying={isPlaying}
              toggleLofi={toggleLofi}
              presetIdx={presetIdx}
              handleNextPreset={handleNextPreset}
              isMuted={isMuted}
              toggleMute={toggleMute}
              onNavigate={handleTabChange}
            />
            <CozyCorner onNavigate={handleTabChange} />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-parchment dark:bg-night-bg text-espresso dark:text-night-text font-sans transition-colors duration-500">
      {/* Persistent Global Lofi Web Audio Engine across ALL tabs */}
      <GlobalLofiEngine isPlaying={isPlaying} presetIdx={presetIdx} isMuted={isMuted} />

      {/* Analog Grain */}
      <div className="analog-grain" aria-hidden="true" />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Container — generous max width for all tabs without scroll */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isPlaying={isPlaying}
          toggleLofi={toggleLofi}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </div>
  );
}
