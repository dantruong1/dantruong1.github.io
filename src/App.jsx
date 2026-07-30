import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONTENT } from './data/content';
import { Navbar } from './components/Navbar';
import { HeroBento } from './components/HeroBento';
import { CozyCorner } from './components/CozyCorner';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WritingsSection } from './components/WritingsSection';
import { QuotesSection } from './components/QuotesSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import { MusicSection } from './components/MusicSection';
import { SFMapSection } from './components/SFMapSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleLofi = useCallback(() => {
    setIsPlaying((prev) => !prev);
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
      case 'sf-map':
        return <SFMapSection />;
      case 'about':
        return <AboutSection content={SITE_CONTENT} />;
      case 'projects':
        return <ProjectsSection content={SITE_CONTENT} />;
      case 'writings':
        return <WritingsSection content={SITE_CONTENT} />;
      case 'quotes':
        return <QuotesSection content={SITE_CONTENT} />;
      case 'recommendations':
        return <RecommendationsSection content={SITE_CONTENT} />;
      case 'music':
        return <MusicSection content={SITE_CONTENT} />;
      case 'home':
      default:
        return (
          <>
            <HeroBento
              content={SITE_CONTENT}
              isPlaying={isPlaying}
              toggleLofi={toggleLofi}
              onNavigate={setActiveTab}
            />
            <CozyCorner onNavigate={setActiveTab} />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-parchment text-espresso font-sans">
      {/* Analog Grain */}
      <div className="analog-grain" aria-hidden="true" />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Container — generous desktop padding */}
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 lg:px-14 py-6 md:py-10">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPlaying={isPlaying}
          toggleLofi={toggleLofi}
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

        <Footer onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </div>
    </div>
  );
}
