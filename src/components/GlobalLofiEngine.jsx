import React, { useEffect, useRef } from 'react';

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

export function GlobalLofiEngine({ isPlaying }) {
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const vinylSourceRef = useRef(null);
  const masterGainRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      stopAudioEngine();
      return;
    }

    startAudioEngine();

    return () => {
      stopAudioEngine();
    };
  }, [isPlaying]);

  const startAudioEngine = () => {
    // Stop any existing loop first to avoid overlapping intervals
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

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Vinyl Crackle Noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const pop = Math.random() < 0.002 ? (Math.random() * 2 - 1) * 0.3 : 0;
        output[i] = (Math.random() * 2 - 1) * 0.015 + pop;
      }

      const vinylSource = ctx.createBufferSource();
      vinylSource.buffer = noiseBuffer;
      vinylSource.loop = true;
      vinylSourceRef.current = vinylSource;

      const vinylFilter = ctx.createBiquadFilter();
      vinylFilter.type = 'bandpass';
      vinylFilter.frequency.setValueAtTime(1200, ctx.currentTime);
      vinylFilter.Q.setValueAtTime(1.0, ctx.currentTime);

      const vinylGain = ctx.createGain();
      vinylGain.gain.setValueAtTime(0.3, ctx.currentTime);

      vinylSource.connect(vinylFilter);
      vinylFilter.connect(vinylGain);
      vinylGain.connect(masterGain);
      vinylSource.start();

      // 2. Play Lofi Piano Chords Sequence
      let step = 0;
      const progression = CHORD_PROGRESSIONS[0];

      const playNextChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;

        const chordFreqs = progression[step % progression.length];
        const now = ctx.currentTime;

        chordFreqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800 + i * 150, now);

          const arpeggioStagger = i * 0.08;
          const noteTime = now + arpeggioStagger;
          noteGain.gain.setValueAtTime(0.001, noteTime);
          noteGain.gain.exponentialRampToValueAtTime(0.18, noteTime + 0.15);
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
      console.error('Audio synth error:', e);
    }
  };

  const stopAudioEngine = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (vinylSourceRef.current) {
      try {
        vinylSourceRef.current.stop();
      } catch (e) {
        // Ignored if already stopped
      }
      vinylSourceRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  return null; // Persistent invisible global audio manager
}
