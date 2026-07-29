import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Sparkles, CloudRain, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function LofiPlayer({ isPlaying, toggleLofi }) {
  const [ambientType, setAmbientType] = useState('lofi');
  const audioCtxRef = useRef(null);
  const isSetupRef = useRef(false);

  useEffect(() => {
    if (!isPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    if (!isSetupRef.current) {
      isSetupRef.current = true;
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.012;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, ctx.currentTime);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();
    }
  }, [isPlaying]);

  return (
    <Card className="p-5 bg-card-warm border-espresso/8 relative overflow-hidden group shadow-cozy">
      <div className="flex items-center gap-4">
        {/* Spinning Vinyl */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 6,
            ease: 'linear',
          }}
          className="relative w-[60px] h-[60px] rounded-full bg-espresso flex items-center justify-center shadow-lg shrink-0"
          style={{
            background: 'conic-gradient(from 0deg, #2e2722, #3d342d, #2e2722, #3d342d, #2e2722)',
          }}
        >
          <div className="w-5 h-5 rounded-full bg-amber-warm border-[3px] border-espresso flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-espresso" />
          </div>
          {/* Groove rings */}
          <div className="absolute inset-[6px] rounded-full border border-white/8" />
          <div className="absolute inset-[10px] rounded-full border border-white/5" />
          <div className="absolute inset-[14px] rounded-full border border-white/5" />
        </motion.div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-hand text-lg font-bold text-espresso leading-tight flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              Lofi Café Radio
            </span>
          </div>

          <p className="text-[11px] text-espresso-muted truncate mb-2.5 font-sans">
            Warm piano, vinyl crackle & soft rain ambiance
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant={isPlaying ? 'terracotta' : 'default'}
              size="sm"
              onClick={toggleLofi}
              className="h-7 text-[11px] px-3 gap-1.5"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </Button>

            <button
              onClick={() => setAmbientType(ambientType === 'lofi' ? 'rain' : 'lofi')}
              className="text-[11px] text-espresso-muted hover:text-matcha flex items-center gap-1 font-mono transition-colors"
            >
              {ambientType === 'lofi' ? (
                <><Volume2 className="w-3 h-3 text-matcha" /> Beats</>
              ) : (
                <><CloudRain className="w-3 h-3 text-matcha" /> Rain</>
              )}
            </button>

            {/* Mini equalizer when playing */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-end gap-px h-3.5 ml-auto"
              >
                <span className="eq-bar animate-eq-bar-1 text-terracotta bg-terracotta" style={{ height: '5px' }} />
                <span className="eq-bar animate-eq-bar-2 text-terracotta bg-terracotta" style={{ height: '10px' }} />
                <span className="eq-bar animate-eq-bar-3 text-terracotta bg-terracotta" style={{ height: '3px' }} />
                <span className="eq-bar animate-eq-bar-1 text-terracotta bg-terracotta" style={{ height: '8px' }} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
