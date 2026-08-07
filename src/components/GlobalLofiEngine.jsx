import React, { useEffect, useRef } from 'react';

// Preset Audio Configurations
// Preset 0: Cozy Lofi Piano (Rhodes + Vinyl)
// Preset 1: Rainy Coffee Shop (Rain Noise + Mellow Jazz 7ths)
// Preset 2: Sunset Glow (Warm Ambient Pad + Ocean Wave Swells)

const PRESET_PROGRESSIONS = [
  // Preset 0: Cozy Lofi Piano
  [
    { freqs: [130.81, 164.81, 196.00, 246.94, 293.66], bass: 65.41 }, // Cmaj9
    { freqs: [110.00, 130.81, 164.81, 196.00, 246.94], bass: 55.00 }, // Am9
    { freqs: [87.31, 110.00, 130.81, 164.81, 246.94], bass: 43.65 },  // Fmaj7#11
    { freqs: [98.00, 146.83, 174.61, 220.00, 261.63], bass: 49.00 },  // G11
  ],
  // Preset 1: Rainy Coffee Shop
  [
    { freqs: [146.83, 174.61, 220.00, 261.63, 329.63], bass: 73.42 }, // Dm9
    { freqs: [98.00, 174.61, 246.94, 329.63], bass: 49.00 },          // G13
    { freqs: [130.81, 196.00, 246.94, 329.63, 293.66], bass: 65.41 }, // Cmaj9
    { freqs: [110.00, 196.00, 277.18, 349.23], bass: 55.00 },         // A7alt
  ],
  // Preset 2: Sunset Glow
  [
    { freqs: [87.31, 130.81, 164.81, 220.00, 392.00], bass: 87.31 },  // Fmaj9
    { freqs: [82.41, 123.47, 164.81, 196.00, 293.66], bass: 82.41 },  // Em7
    { freqs: [73.42, 110.00, 174.61, 261.63, 329.63], bass: 73.42 },  // Dm9
    { freqs: [65.41, 98.00, 130.81, 164.81, 246.94], bass: 65.41 },   // Cmaj7
  ],
];

export function GlobalLofiEngine({ isPlaying, presetIdx = 0, isMuted = false }) {
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const lfoSourceRef = useRef(null);
  const masterGainRef = useRef(null);
  const stepRef = useRef(0);

  // Update volume when mute state changes without restarting full engine
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : 0.12;
      masterGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.05);
    }
  }, [isMuted]);

  // Main Audio Engine effect trigger on isPlaying or presetIdx change
  useEffect(() => {
    if (!isPlaying) {
      stopAudioEngine();
      return;
    }

    stepRef.current = 0;
    startAudioEngine(presetIdx);

    return () => {
      stopAudioEngine();
    };
  }, [isPlaying, presetIdx]);

  const stopNoiseSources = () => {
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
      } catch (e) {
        // Ignored
      }
      noiseSourceRef.current = null;
    }
    if (lfoSourceRef.current) {
      try {
        lfoSourceRef.current.stop();
        lfoSourceRef.current.disconnect();
      } catch (e) {
        // Ignored
      }
      lfoSourceRef.current = null;
    }
  };

  const startAudioEngine = (currentPresetIdx) => {
    stopAudioEngine();

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain setup
      const masterGain = ctx.createGain();
      const initialGain = isMuted ? 0 : 0.12;
      masterGain.gain.setValueAtTime(initialGain, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Create Ambient Noise Layer based on Preset
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      if (currentPresetIdx === 0) {
        // Vinyl crackle noise
        for (let i = 0; i < bufferSize; i++) {
          const pop = Math.random() < 0.0025 ? (Math.random() * 2 - 1) * 0.25 : 0;
          output[i] = (Math.random() * 2 - 1) * 0.012 + pop;
        }
      } else if (currentPresetIdx === 1) {
        // Rain drop noise
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise approx
          lastOut = output[i];
          if (Math.random() < 0.001) output[i] += (Math.random() * 2 - 1) * 0.15; // Rain drop splash
        }
      } else {
        // Sunset wave swell ambient noise
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.015;
        }
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      noiseSourceRef.current = noiseSource;

      const noiseFilter = ctx.createBiquadFilter();
      if (currentPresetIdx === 0) {
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1100, ctx.currentTime);
        noiseFilter.Q.setValueAtTime(1.2, ctx.currentTime);
      } else if (currentPresetIdx === 1) {
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(750, ctx.currentTime);
      } else {
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(450, ctx.currentTime);
      }

      const noiseGain = ctx.createGain();
      const noiseLevel = currentPresetIdx === 1 ? 0.35 : currentPresetIdx === 2 ? 0.2 : 0.25;
      noiseGain.gain.setValueAtTime(noiseLevel, ctx.currentTime);

      // Rain / Wave LFO Modulation
      if (currentPresetIdx === 1 || currentPresetIdx === 2) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(currentPresetIdx === 1 ? 0.25 : 0.12, ctx.currentTime);
        lfoGain.gain.setValueAtTime(currentPresetIdx === 1 ? 0.12 : 0.1, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(noiseGain.gain);
        lfo.start();
        lfoSourceRef.current = lfo;
      }

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      // 2. Play Lofi Chords Sequence
      const progression = PRESET_PROGRESSIONS[currentPresetIdx] || PRESET_PROGRESSIONS[0];

      const playNextChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;

        const chordObj = progression[stepRef.current % progression.length];
        const { freqs, bass } = chordObj;
        const now = ctx.currentTime;

        // Sub/Bass Note
        if (bass) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          const bassFilter = ctx.createBiquadFilter();

          bassOsc.type = currentPresetIdx === 2 ? 'sine' : 'triangle';
          bassOsc.frequency.setValueAtTime(bass, now);

          bassFilter.type = 'lowpass';
          bassFilter.frequency.setValueAtTime(220, now);

          bassGain.gain.setValueAtTime(0.001, now);
          bassGain.gain.exponentialRampToValueAtTime(0.22, now + 0.1);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

          bassOsc.connect(bassFilter);
          bassFilter.connect(bassGain);
          bassGain.connect(masterGain);

          bassOsc.start(now);
          bassOsc.stop(now + 3.4);
        }

        // Chord Notes
        freqs.forEach((freq, i) => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          // Osc 1: Fundamental
          osc1.type = currentPresetIdx === 2 ? 'sawtooth' : 'sine';
          osc1.frequency.setValueAtTime(freq, now);
          osc1.detune.setValueAtTime((Math.random() - 0.5) * 6, now);

          // Osc 2: Soft Warmth Harmonic
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(freq, now);
          osc2.detune.setValueAtTime((Math.random() - 0.5) * 10, now);

          // Lowpass Filter for Lofi Warmth
          filter.type = 'lowpass';
          const cutoff = currentPresetIdx === 0 ? 850 + i * 120 : currentPresetIdx === 1 ? 700 + i * 100 : 500 + i * 80;
          filter.frequency.setValueAtTime(cutoff, now);

          // Stagger notes slightly for humanized touch
          const arpeggioStagger = i * (currentPresetIdx === 0 ? 0.035 : currentPresetIdx === 1 ? 0.045 : 0.06);
          const noteTime = now + arpeggioStagger;

          const attackTime = currentPresetIdx === 2 ? 0.4 : currentPresetIdx === 1 ? 0.08 : 0.03;
          const decayTime = currentPresetIdx === 2 ? 3.4 : 2.9;
          const maxGain = currentPresetIdx === 2 ? 0.12 : 0.16;

          noteGain.gain.setValueAtTime(0.0001, noteTime);
          noteGain.gain.exponentialRampToValueAtTime(maxGain, noteTime + attackTime);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + decayTime);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc1.start(noteTime);
          osc2.start(noteTime);
          osc1.stop(noteTime + decayTime + 0.1);
          osc2.stop(noteTime + decayTime + 0.1);
        });

        stepRef.current++;
      };

      // Play immediate first chord upon start or track change
      playNextChord();

      // Schedule subsequent chords
      const intervalMs = currentPresetIdx === 2 ? 3800 : currentPresetIdx === 1 ? 3400 : 3200;
      timerRef.current = setInterval(playNextChord, intervalMs);
    } catch (e) {
      console.error('Audio synth error:', e);
    }
  };

  const stopAudioEngine = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopNoiseSources();
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      try {
        audioCtxRef.current.suspend();
      } catch (e) {
        // Ignored
      }
    }
  };

  return null; // Persistent global audio manager
}
