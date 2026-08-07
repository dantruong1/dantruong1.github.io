import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Sparkles, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { LOFI_PRESETS } from '../data/lofiPresets';

export function LofiPlayer({
  isPlaying,
  toggleLofi,
  presetIdx = 0,
  handleNextPreset,
  isMuted = false,
  toggleMute,
}) {
  const preset = LOFI_PRESETS[presetIdx] || LOFI_PRESETS[0];

  return (
    <Card className="p-5 bg-card-warm dark:bg-night-card border-espresso/8 dark:border-night-border relative overflow-hidden group shadow-cozy">
      <div className="flex items-center gap-4">
        {/* Spinning Vinyl */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 6,
            ease: 'linear',
          }}
          className="relative w-[60px] h-[60px] rounded-full bg-espresso flex items-center justify-center shadow-lg shrink-0 cursor-pointer"
          onClick={toggleLofi}
          title={isPlaying ? 'Pause Lofi' : 'Play Lofi'}
          style={{
            background: 'conic-gradient(from 0deg, #2e2722, #3d342d, #2e2722, #3d342d, #2e2722)',
          }}
        >
          <div className="w-5 h-5 rounded-full bg-amber-warm border-[3px] border-espresso flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-espresso" />
          </div>
          <div className="absolute inset-[6px] rounded-full border border-white/10" />
          <div className="absolute inset-[11px] rounded-full border border-white/5" />
        </motion.div>

        {/* Info & Controls */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="font-sans text-sm font-bold text-espresso dark:text-night-text leading-tight flex items-center gap-1.5 truncate">
              <Sparkles className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0" />
              {preset.title}
            </span>
            <span className="text-[10px] font-mono bg-matcha-soft dark:bg-matcha-dark/40 text-matcha-dark dark:text-matcha-glow px-2 py-0.5 rounded-full shrink-0">
              {isPlaying ? preset.tag : 'Paused'}
            </span>
          </div>

          <p className="text-[11px] text-espresso-muted dark:text-night-muted truncate mb-2.5 font-sans">
            {preset.desc}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={isPlaying ? 'terracotta' : 'default'}
              size="sm"
              onClick={toggleLofi}
              className="h-7 text-[11px] px-3 gap-1.5 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Play Lofi'}</span>
            </Button>

            <button
              onClick={handleNextPreset}
              className="h-7 px-2 text-[11px] text-espresso-muted dark:text-night-muted hover:text-matcha-dark dark:hover:text-matcha-glow flex items-center gap-1 font-mono transition-colors cursor-pointer rounded-md hover:bg-parchment-dark/50 dark:hover:bg-night-card-alt"
              title="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>

            <button
              onClick={toggleMute}
              className="text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text transition-colors p-1 cursor-pointer rounded-md hover:bg-parchment-dark/50 dark:hover:bg-night-card-alt"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-terracotta" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Equalizer animation when active */}
            {isPlaying && !isMuted && (
              <div className="flex items-end gap-px h-3.5 ml-auto">
                <span className="eq-bar animate-eq-bar-1 text-terracotta bg-terracotta dark:bg-terracotta-glow" style={{ height: '5px' }} />
                <span className="eq-bar animate-eq-bar-2 text-terracotta bg-terracotta dark:bg-terracotta-glow" style={{ height: '10px' }} />
                <span className="eq-bar animate-eq-bar-3 text-terracotta bg-terracotta dark:bg-terracotta-glow" style={{ height: '3px' }} />
                <span className="eq-bar animate-eq-bar-1 text-terracotta bg-terracotta dark:bg-terracotta-glow" style={{ height: '8px' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
