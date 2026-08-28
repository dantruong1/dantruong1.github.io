import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Youtube, ExternalLink } from 'lucide-react';
import { Card, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FAVORITE_VIDEOS } from '../data/videos';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function FavoriteVideosSection({ onVideoPlay }) {
  const handleVideoInteraction = () => {
    if (onVideoPlay) {
      onVideoPlay();
    }
  };

  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        handleVideoInteraction();
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className="space-y-6 pt-4"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">
            <Video className="w-3.5 h-3.5" />
            Favorite Videos
          </span>
          <div className="organic-divider flex-1" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2">
          My Favorite Videos of All Time
        </h3>
        <p className="text-sm text-espresso-muted dark:text-night-muted font-sans leading-relaxed">
          Speeches, talks, and performances I come back to again and again.
        </p>
      </motion.div>

      {/* Videos — clean 2-column grid, minimal card chrome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FAVORITE_VIDEOS.map((vid) => (
          <motion.div key={vid.id} variants={fadeUp}>
            <Card
              className="p-4 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border h-full flex flex-col shadow-cozy hover:border-matcha/30 dark:hover:border-matcha-glow transition-all duration-300 group"
              onClick={handleVideoInteraction}
            >
              {/* Embedded YouTube */}
              <div
                className="relative w-full aspect-video rounded-lg overflow-hidden bg-espresso/90 mb-3 border border-espresso/8 dark:border-night-border"
                onClick={handleVideoInteraction}
              >
                <iframe
                  src={vid.embedUrl}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="terracotta" className="text-[10px]">{vid.speaker}</Badge>
                <span className="text-[10px] font-mono text-espresso-muted dark:text-night-muted">{vid.date}</span>
              </div>

              <CardTitle className="text-base font-serif mb-1.5 group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors leading-snug">
                {vid.title}
              </CardTitle>

              <p className="text-xs text-espresso-muted dark:text-night-muted font-sans leading-relaxed flex-1">
                {vid.note}
              </p>

              <div className="pt-2.5 mt-2.5 border-t border-espresso/6 dark:border-night-border">
                <a
                  href={vid.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleVideoInteraction}
                  className="text-[11px] font-mono text-matcha-dark dark:text-matcha-glow hover:text-matcha font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
