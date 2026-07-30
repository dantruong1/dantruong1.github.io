import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Youtube, Sparkles, ExternalLink } from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

const FAVORITE_VIDEOS = [
  {
    id: 'obama-2004-dnc',
    title: 'Barack Obama’s 2004 DNC Convention Speech',
    speaker: 'Barack Obama',
    date: 'July 2004 · DNC Keynote Address',
    embedUrl: 'https://www.youtube.com/embed/eWynt87PaJ0?enablejsapi=1',
    youtubeUrl: 'https://www.youtube.com/watch?v=eWynt87PaJ0',
    vibe: 'Masterclass in Hope, Rhetoric & Unity',
    note: 'The historic speech that introduced Barack Obama to the national stage. An absolute masterclass in storytelling, hope, unity, and rhetorical cadence.',
  },
  {
    id: 'steve-jobs-stanford-2005',
    title: 'Steve Jobs’ 2005 Stanford Commencement Address',
    speaker: 'Steve Jobs',
    date: 'June 2005 · Stanford University',
    embedUrl: 'https://www.youtube.com/embed/UF8uR6Z6KLc?enablejsapi=1',
    youtubeUrl: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc',
    vibe: 'Stay Hungry, Stay Foolish',
    note: 'Three simple stories: connecting the dots, love and loss, and death as life’s change agent. One of the most inspiring commencement speeches ever delivered.',
  },
  {
    id: 'emily-esfahani-smith-ted',
    title: 'There’s More to Life Than Being Happy',
    speaker: 'Emily Esfahani Smith',
    date: 'TED Talk · April 2017',
    embedUrl: 'https://www.youtube.com/embed/y9Trdafp83U?enablejsapi=1',
    youtubeUrl: 'https://www.youtube.com/watch?v=y9Trdafp83U',
    vibe: 'The 4 Pillars of a Meaningful Life',
    note: 'A powerful perspective shift on why chasing happiness can leave us feeling empty, and how cultivating belonging, purpose, transcendence, and storytelling creates true meaning.',
  },
  {
    id: 'jonathan-haidt-ted',
    title: 'The Moral Roots of Liberals and Conservatives',
    speaker: 'Jonathan Haidt',
    date: 'TED Talk · Sept 2008',
    embedUrl: 'https://www.youtube.com/embed/vs41JrnGaxc?enablejsapi=1',
    youtubeUrl: 'https://www.youtube.com/watch?v=vs41JrnGaxc',
    vibe: 'Moral Foundations & Empathy Across Ideologies',
    note: 'Social psychologist Jonathan Haidt explores the five moral foundations that underpin political divisions, offering a brilliant blueprint for understanding and bridging ideological divides.',
  },
  {
    id: 'fred-again-tiny-desk',
    title: 'Fred again..: NPR Music Tiny Desk Concert',
    speaker: 'Fred again..',
    date: 'NPR Music · April 2023',
    embedUrl: 'https://www.youtube.com/embed/c0-hvjV2A5Y?enablejsapi=1',
    youtubeUrl: 'https://www.youtube.com/watch?v=c0-hvjV2A5Y',
    vibe: 'Vulnerable Electronic Mastery & Soulful Sampling',
    note: 'An extraordinary, intimate performance where Fred again.. plays marimba, acoustic piano, and live sampling — turning electronic music into pure emotional vulnerability.',
  },
];

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
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <span className="section-kicker">
          <Video className="w-3.5 h-3.5" />
          Favorite Videos
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-espresso dark:text-night-text tracking-tight">
          All-Time Favorite Speeches & Performances
        </h3>
        <div className="organic-divider flex-1" />
      </motion.div>

      <motion.p variants={fadeUp} className="text-[14px] text-espresso-muted dark:text-night-muted font-sans leading-relaxed max-w-2xl">
        Iconic speeches, TED talks, and musical performances that I come back to again and again for inspiration on leadership, psychology, music, and purpose.
      </motion.p>

      {/* Embedded Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {FAVORITE_VIDEOS.map((vid) => (
          <motion.div key={vid.id} variants={fadeUp}>
            <Card
              className="p-5 bg-card dark:bg-night-card border-espresso/10 dark:border-night-border h-full flex flex-col justify-between shadow-cozy hover:border-matcha/40 transition-all duration-300 group"
              onClick={handleVideoInteraction}
            >
              <div>
                {/* Embedded YouTube Iframe */}
                <div
                  className="relative w-full aspect-video rounded-cozy overflow-hidden bg-espresso/90 mb-4 border border-espresso/10 shadow-sm cursor-pointer"
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

                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="terracotta">{vid.speaker}</Badge>
                  <span className="text-[11px] font-mono text-espresso-muted dark:text-night-muted">
                    {vid.date}
                  </span>
                </div>

                <CardTitle className="text-lg font-serif mb-1 group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors leading-snug">
                  {vid.title}
                </CardTitle>

                <span className="text-xs font-hand text-terracotta dark:text-terracotta-glow text-base block mb-3">
                  "{vid.vibe}"
                </span>

                <CardDescription className="text-xs sm:text-sm text-espresso-light dark:text-night-muted leading-relaxed font-sans mb-4">
                  {vid.note}
                </CardDescription>
              </div>

              <div className="pt-3 border-t border-espresso/8 dark:border-night-border flex items-center justify-between">
                <a
                  href={vid.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleVideoInteraction}
                  className="text-xs font-mono text-matcha-dark dark:text-matcha-glow hover:text-matcha font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-600" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <Sparkles className="w-3.5 h-3.5 text-amber-warm" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
