import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc3,
  Minimize2,
  Maximize2,
  Sparkles,
} from 'lucide-react';

// Chords progression for Ambient Lo-Fi (ii-V-I-vi in C major / A minor)
// Stored as frequency arrays in Hz [Bass, Note1, Note2, Note3, Note4]
const LOFI_CHORDS = [
  // Dm9 (D2, F3, A3, C4, E4)
  {
    bass: 73.42,
    notes: [174.61, 220.0, 261.63, 329.63],
    chime: 659.25, // E5
  },
  // G13 / G7 (G2, F3, B3, E4, A4)
  {
    bass: 98.0,
    notes: [174.61, 246.94, 329.63, 440.0],
    chime: 587.33, // D5
  },
  // Cmaj9 (C2, E3, G3, B3, D4)
  {
    bass: 65.41,
    notes: [164.81, 196.0, 246.94, 293.66],
    chime: 493.88, // B4
  },
  // Am9 (A2, C3, E3, G3, B3)
  {
    bass: 110.0,
    notes: [130.81, 164.81, 196.0, 246.94],
    chime: 392.0, // G4
  },
];

export default function SoundtrackPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeChordIndex, setActiveChordIndex] = useState(0);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const loopTimerRef = useRef(null);
  const chordIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);

  // Sync refs with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Initialize Web Audio Context
  const getOrCreateAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;

      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
    }
    return audioCtxRef.current;
  }, []);

  // Play a single Lo-Fi synth voice with vintage tape warmth & subtle chorus
  const playLoFiVoice = useCallback((ctx, freq, startTime, duration = 3.2, gainLevel = 0.035) => {
    try {
      // Main warm oscillator (sine)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, startTime);
      osc1.detune.setValueAtTime(-5, startTime); // Subtle detune for analog chorus

      // Secondary body oscillator (triangle)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq, startTime);
      osc2.detune.setValueAtTime(5, startTime);

      // Lowpass filter for smooth vintage Lo-Fi tape texture
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, startTime);
      filter.Q.setValueAtTime(1.2, startTime);

      // Note envelope gain
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, startTime);
      // Soft gentle attack (120ms)
      noteGain.gain.exponentialRampToValueAtTime(gainLevel, startTime + 0.12);
      // Natural organic decay
      noteGain.gain.exponentialRampToValueAtTime(gainLevel * 0.45, startTime + 1.6);
      // Warm release fade out
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      // Routing
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGainRef.current);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.1);
      osc2.stop(startTime + duration + 0.1);
    } catch {
      // Ignore audio scheduling on fast teardown
    }
  }, []);

  // Play sub bass note
  const playBassVoice = useCallback((ctx, freq, startTime, duration = 3.2) => {
    try {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0.0001, startTime);
      bassGain.gain.exponentialRampToValueAtTime(0.06, startTime + 0.15);
      bassGain.gain.exponentialRampToValueAtTime(0.035, startTime + 2.0);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(bassGain);
      bassGain.connect(masterGainRef.current);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    } catch {
      // Ignore audio scheduling on teardown
    }
  }, []);

  // Play delicate chime / raindrop bell
  const playChimeVoice = useCallback((ctx, freq, startTime) => {
    try {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      const chimeGain = ctx.createGain();
      chimeGain.gain.setValueAtTime(0.0001, startTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.02, startTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.0);

      osc.connect(chimeGain);
      chimeGain.connect(masterGainRef.current);

      osc.start(startTime);
      osc.stop(startTime + 2.1);
    } catch {
      // Ignore audio scheduling
    }
  }, []);

  // Trigger one Lo-Fi chord cycle
  const triggerChord = useCallback(() => {
    const ctx = getOrCreateAudioContext();
    if (!ctx || ctx.state === 'suspended') return;

    const currentChord = LOFI_CHORDS[chordIndexRef.current];
    const now = ctx.currentTime;
    const duration = 3.6;

    // 1. Play warm sub-bass
    playBassVoice(ctx, currentChord.bass, now, duration);

    // 2. Play chord voices with realistic human strum staggering
    currentChord.notes.forEach((freq, idx) => {
      const stagger = idx * 0.04;
      playLoFiVoice(ctx, freq, now + stagger, duration - stagger, 0.032);
    });

    // 3. Play gentle ambient chime note halfway through
    if (currentChord.chime) {
      playChimeVoice(ctx, currentChord.chime, now + 1.2);
    }

    // Step index for next chord
    chordIndexRef.current = (chordIndexRef.current + 1) % LOFI_CHORDS.length;
    setActiveChordIndex(chordIndexRef.current);
  }, [getOrCreateAudioContext, playBassVoice, playLoFiVoice, playChimeVoice]);

  // Start continuous ambient Lo-Fi playback
  const startMusic = useCallback(async () => {
    const ctx = getOrCreateAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (masterGainRef.current) {
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.setValueAtTime(
        isMutedRef.current ? 0 : 0.25,
        ctx.currentTime
      );
    }

    // Trigger initial chord immediately
    triggerChord();

    // Loop every 3.5 seconds
    if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    loopTimerRef.current = setInterval(() => {
      if (isPlayingRef.current) {
        triggerChord();
      }
    }, 3500);

    setIsPlaying(true);
  }, [getOrCreateAudioContext, triggerChord]);

  // Pause music smoothly
  const pauseMusic = useCallback(() => {
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }

    const ctx = audioCtxRef.current;
    if (ctx && masterGainRef.current) {
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
    }

    setIsPlaying(false);
  }, []);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  // Toggle Mute / Unmute
  const handleToggleMute = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !masterGainRef.current) {
      setIsMuted(!isMuted);
      return;
    }

    if (isMuted) {
      // Unmute: ramp volume back up smoothly
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.setTargetAtTime(0.25, ctx.currentTime, 0.08);
      setIsMuted(false);
    } else {
      // Mute: ramp volume to zero smoothly
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
      setIsMuted(true);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {
          // Ignore close error
        }
      }
    };
  }, []);

  return (
    <aside
      aria-label="Nhạc nền thư giãn"
      className="fixed bottom-5 left-5 z-40 select-none print:hidden"
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Compact Icon Button */
          <motion.div
            key="minimized"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="flex items-center gap-2 p-2 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl glow-hover"
          >
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc Lo-Fi'}
              className="relative w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Mini Equalizer */}
            <div className="flex items-end space-x-0.5 h-4 px-1">
              <span
                className={`w-0.5 rounded-full bg-emerald-500 ${
                  isPlaying && !isMuted ? 'animate-wave-1' : 'h-1 bg-neutral-400 dark:bg-neutral-600'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-emerald-400 ${
                  isPlaying && !isMuted ? 'animate-wave-2' : 'h-1 bg-neutral-400 dark:bg-neutral-600'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-emerald-500 ${
                  isPlaying && !isMuted ? 'animate-wave-3' : 'h-1 bg-neutral-400 dark:bg-neutral-600'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-emerald-400 ${
                  isPlaying && !isMuted ? 'animate-wave-4' : 'h-1 bg-neutral-400 dark:bg-neutral-600'
                }`}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              aria-label="Mở rộng trình phát nhạc"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          /* Full Floating Player Card */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-neutral-200/90 dark:border-neutral-800/90 shadow-2xl max-w-[calc(100vw-2.5rem)] sm:max-w-sm glow-hover group"
          >
            {/* Spinning Disc / Vinyl Art */}
            <div className="relative shrink-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
                  isPlaying && !isMuted
                    ? 'bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-500 dark:text-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-400'
                }`}
              >
                <Disc3
                  className={`w-6 h-6 ${
                    isPlaying && !isMuted ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '4s' }}
                />
              </div>

              {/* Live green dot */}
              {isPlaying && !isMuted && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              )}
            </div>

            {/* Track Info & Equalizer */}
            <div className="min-w-0 flex-1 pr-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Lo-Fi Ambient Synth</span>
                </span>
              </div>

              <div
                className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate"
                title="Lio Lo-Fi Soundscapes // Deep Focus"
              >
                Lio Lo-Fi Soundscapes // Deep Focus
              </div>

              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {isPlaying
                    ? isMuted
                      ? 'Đã tắt tiếng (Muted)'
                      : 'Đang phát • Chill & Focus'
                    : 'Nhấn Play để trải nghiệm'}
                </span>

                {/* 4 Soundwave Equalizer Bars */}
                <div
                  className="flex items-end space-x-1 h-3.5 shrink-0 pl-1"
                  title={isPlaying && !isMuted ? 'Soundwave Visualizer' : 'Soundwave Paused'}
                >
                  <span
                    className={`w-0.5 sm:w-1 rounded-full bg-emerald-500 transition-all ${
                      isPlaying && !isMuted
                        ? 'animate-wave-1'
                        : 'h-1 bg-neutral-300 dark:bg-neutral-700'
                    }`}
                  />
                  <span
                    className={`w-0.5 sm:w-1 rounded-full bg-emerald-400 transition-all ${
                      isPlaying && !isMuted
                        ? 'animate-wave-2'
                        : 'h-1 bg-neutral-300 dark:bg-neutral-700'
                    }`}
                  />
                  <span
                    className={`w-0.5 sm:w-1 rounded-full bg-emerald-500 transition-all ${
                      isPlaying && !isMuted
                        ? 'animate-wave-3'
                        : 'h-1 bg-neutral-300 dark:bg-neutral-700'
                    }`}
                  />
                  <span
                    className={`w-0.5 sm:w-1 rounded-full bg-emerald-400 transition-all ${
                      isPlaying && !isMuted
                        ? 'animate-wave-4'
                        : 'h-1 bg-neutral-300 dark:bg-neutral-700'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Controls: Play/Pause, Mute/Unmute, Minimize */}
            <div className="flex items-center gap-1 shrink-0 border-l border-neutral-100 dark:border-neutral-800/80 pl-2">
              {/* Play / Pause Button */}
              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc Lo-Fi'}
                title={isPlaying ? 'Tạm dừng' : 'Bật nhạc Lo-Fi'}
                className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>

              {/* Mute / Unmute Button */}
              <button
                type="button"
                onClick={handleToggleMute}
                aria-label={isMuted ? 'Bật âm lượng' : 'Tắt tiếng'}
                title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                className={`p-1.5 rounded-lg transition-colors ${
                  isMuted
                    ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Minimize Widget Button */}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                aria-label="Thu nhỏ trình phát"
                title="Thu nhỏ"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:inline-flex"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
