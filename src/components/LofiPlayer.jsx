import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Sparkles, CloudRain, Volume2, VolumeX, SkipForward, Disc, Radio } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

// Presets for procedural cozy lofi ambiance
const LOFI_PRESETS = [
  { id: 'lofi-chords', title: 'Cozy Lofi Piano', desc: 'Warm Rhodes chords & vinyl crackle' },
  { id: 'rain-cafe', title: 'Rainy Coffee Shop', desc: 'Gentle rain drops & soft lofi harmonies' },
  { id: 'sunset-vibes', title: 'Sunset Glow', desc: 'Mellow ambient waves & golden hour chords' },
];

// Lofi Chord progressions (frequency in Hz)
const CHORD_PROGRESSIONS = [
  // Cmaj7 -> Am7 -> Fmaj7 -> G7
  [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23], // G7
  ],
  // Dm7 -> G7 -> Cmaj7 -> A7
  [
    [293.66, 349.23, 440.00, 523.25], // Dm7
    [196.00, 246.94, 293.66, 349.23], // G7
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 277.18, 329.63, 392.00], // A7
  ],
];

export function LofiPlayer({ isPlaying, toggleLofi }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const masterGainRef = useRef(null);
  const vinylGainRef = useRef(null);
  const rainGainRef = useRef(null);

  const preset = LOFI_PRESETS[presetIdx];

  // Initialize and run Procedural Web Audio Engine
  useEffect(() => {
    if (!isPlaying) {
      stopAudioEngine();
      return;
    }

    startAudioEngine();

    return () => {
      stopAudioEngine();
    };
  }, [isPlaying, presetIdx]);

  // Adjust volume
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetVol = isMuted ? 0 : volume * 0.15;
      masterGainRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume, isMuted]);

  const startAudioEngine = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Vinyl Crackle Noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Soft vinyl crackle & pop noise
        const pop = Math.random() < 0.002 ? (Math.random() * 2 - 1) * 0.3 : 0;
        output[i] = (Math.random() * 2 - 1) * 0.015 + pop;
      }
      const vinylSource = ctx.createBufferSource();
      vinylSource.buffer = noiseBuffer;
      vinylSource.loop = true;

      const vinylFilter = ctx.createBiquadFilter();
      vinylFilter.type = 'bandpass';
      vinylFilter.frequency.setValueAtTime(1200, ctx.currentTime);
      vinylFilter.Q.setValueAtTime(1.0, ctx.currentTime);

      const vinylGain = ctx.createGain();
      vinylGain.gain.setValueAtTime(0.3, ctx.currentTime);
      vinylGainRef.current = vinylGain;

      vinylSource.connect(vinylFilter);
      vinylFilter.connect(vinylGain);
      vinylGain.connect(masterGain);
      vinylSource.start();

      // 2. Rain Sound Effect (filtered pinkish noise)
      if (presetIdx === 1) { // Rain preset
        const rainSource = ctx.createBufferSource();
        rainSource.buffer = noiseBuffer;
        rainSource.loop = true;

        const rainFilter = ctx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(600, ctx.currentTime);

        const rainGain = ctx.createGain();
        rainGain.gain.setValueAtTime(0.4, ctx.currentTime);
        rainGainRef.current = rainGain;

        rainSource.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(masterGain);
        rainSource.start();
      }

      // 3. Play Lofi Piano Chords Sequence
      let step = 0;
      const progression = CHORD_PROGRESSIONS[presetIdx % CHORD_PROGRESSIONS.length];

      const playNextChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;

        const chordFreqs = progression[step % progression.length];
        const now = ctx.currentTime;

        // Play each note of the chord with a soft Rhodes-like envelope
        chordFreqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Subtle detune for warm vintage lofi wobble
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

          // Warm lowpass filter
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800 + i * 150, now);

          // Envelope: soft attack, long decaying sustain
          const arpeggioStagger = i * 0.08;
          const noteTime = now + arpeggioStagger;
          noteGain.gain.setValueAtTime(0.001, noteTime);
          noteGain.gain.exponentialRampToValueAtTime(0.2, noteTime + 0.15);
          noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 2.8);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(noteTime);
          osc.stop(noteTime + 3.0);
        });

        step++;
      };

      playNextChord();
      timerRef.current = setInterval(playNextChord, 3200);

    } catch (e) {
      console.error("Audio synth error:", e);
    }
  };

  const stopAudioEngine = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const handleNextPreset = () => {
    setPresetIdx((prev) => (prev + 1) % LOFI_PRESETS.length);
  };

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
          className="relative w-[60px] h-[60px] rounded-full bg-espresso flex items-center justify-center shadow-lg shrink-0 cursor-pointer"
          onClick={toggleLofi}
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
            <span className="font-sans text-sm font-bold text-espresso leading-tight flex items-center gap-1.5 truncate">
              <Sparkles className="w-3.5 h-3.5 text-terracotta shrink-0" />
              {preset.title}
            </span>
            <span className="text-[10px] font-mono bg-matcha-soft text-matcha-dark px-2 py-0.5 rounded-full shrink-0">
              {isPlaying ? '♪ Playing Synth Lofi' : 'Paused'}
            </span>
          </div>

          <p className="text-[11px] text-espresso-muted truncate mb-2.5 font-sans">
            {preset.desc}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={isPlaying ? 'terracotta' : 'default'}
              size="sm"
              onClick={toggleLofi}
              className="h-7 text-[11px] px-3 gap-1.5"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Play Lofi'}</span>
            </Button>

            <button
              onClick={handleNextPreset}
              className="h-7 px-2 text-[11px] text-espresso-muted hover:text-matcha flex items-center gap-1 font-mono transition-colors"
              title="Next Preset"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-espresso-muted hover:text-espresso transition-colors p-1"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Equalizer animation when active */}
            {isPlaying && (
              <div className="flex items-end gap-px h-3.5 ml-auto">
                <span className="eq-bar animate-eq-bar-1 text-terracotta bg-terracotta" style={{ height: '5px' }} />
                <span className="eq-bar animate-eq-bar-2 text-terracotta bg-terracotta" style={{ height: '10px' }} />
                <span className="eq-bar animate-eq-bar-3 text-terracotta bg-terracotta" style={{ height: '3px' }} />
                <span className="eq-bar animate-eq-bar-1 text-terracotta bg-terracotta" style={{ height: '8px' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
