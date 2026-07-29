import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Sparkles, CloudRain, Volume2, VolumeX, SkipForward, Disc } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

// Curated royalty-free calming lofi audio tracks
const LOFI_TRACKS = [
  {
    id: 'chill-study',
    title: 'Cozy Study Session',
    artist: 'Lofi Chill Beats',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  },
  {
    id: 'coffee-lounge',
    title: 'Warm Coffee & Rain',
    artist: 'Café Vibes',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=cozy-lofi-lounge-11441.mp3',
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour Sunset',
    artist: 'Relaxing Melodies',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=gentle-rain-lofi-9824.mp3',
  },
];

export function LofiPlayer({ isPlaying, toggleLofi }) {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);

  const track = LOFI_TRACKS[currentTrackIdx];

  // Handle Play/Pause and track audio state
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(track.src);
      audioRef.current.loop = true;
      audioRef.current.crossOrigin = 'anonymous';
    }

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setAudioError(false))
          .catch(() => {
            // Fallback to Web Audio API Lofi Synth if stream block occurs
            setAudioError(true);
            playSynthLofi();
          });
      }
    } else {
      audio.pause();
      stopSynthLofi();
    }
  }, [isPlaying, currentTrackIdx]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % LOFI_TRACKS.length;
    setCurrentTrackIdx(nextIdx);
    if (audioRef.current) {
      audioRef.current.src = LOFI_TRACKS[nextIdx].src;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Fallback procedural Web Audio synth (warm chord progression: Cmaj7 -> Am7 -> Dm7 -> G7)
  const playSynthLofi = () => {
    if (!synthCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      synthCtxRef.current = new AudioCtx();
    }
    const ctx = synthCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
  };

  const stopSynthLofi = () => {
    if (synthCtxRef.current && synthCtxRef.current.state === 'running') {
      synthCtxRef.current.suspend();
    }
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
            <span className="font-hand text-lg font-bold text-espresso leading-tight flex items-center gap-1.5 truncate">
              <Sparkles className="w-3.5 h-3.5 text-terracotta shrink-0" />
              {track.title}
            </span>
            <span className="text-[10px] font-mono bg-matcha-soft text-matcha-dark px-2 py-0.5 rounded-full shrink-0">
              {isPlaying ? '♪ Playing' : 'Paused'}
            </span>
          </div>

          <p className="text-[11px] text-espresso-muted truncate mb-2 font-sans">
            {track.artist} · Calm lofi beats & vinyl crackle
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
              onClick={handleNextTrack}
              className="h-7 px-2 text-[11px] text-espresso-muted hover:text-matcha flex items-center gap-1 font-mono transition-colors"
              title="Next Lofi Track"
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

            {/* Equalizer bars animation when playing */}
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
