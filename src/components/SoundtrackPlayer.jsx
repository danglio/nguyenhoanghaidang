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
  ExternalLink,
  Radio,
  Repeat,
} from 'lucide-react';
import { YouTubeIcon } from './SocialIcons';

/**
 * High-End Cyber Soundtrack Player
 * - Plays real extracted soundtrack from user's video (/soundtrack.mp3)
 * - Autoplays on page entrance (with seamless 1st-interaction fallback for browser policies)
 * - Exquisite 3D Vinyl Disc & Neon Equalizer Visualizer
 * - Real-time progress bar & time display
 * - Seamless auto-repeat (infinite loop) without lag or interruption
 */
export default function SoundtrackPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(23.5); // trimmed duration without outro chime
  const [showAutoplayHint, setShowAutoplayHint] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const isLoopingRef = useRef(isLooping);
  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  const handleAudioEnded = useCallback(() => {
    if (isLoopingRef.current && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      setIsPlaying(false);
    }
  }, []);

  // Attempt Autoplay on initial load + seamless fallback on 1st interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    // Events that modern browsers recognize as legitimate user gestures
    const activationEvents = ['pointerdown', 'mousedown', 'touchstart', 'touchend', 'keydown', 'click'];
    let cleanupListeners = null;

    const tryAutoplay = () => {
      // Stage 1: Attempt direct unmuted playback (works if user enabled sound or has MEI)
      audio.muted = false;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            setShowAutoplayHint(false);
          })
          .catch(() => {
            // Stage 2: Browser Autoplay Policy blocked unmuted audio
            // Start playing MUTED immediately so visualizer, vinyl, and track timeline start without delay
            audio.muted = true;
            setIsMuted(true);
            setShowAutoplayHint(true);

            audio
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                setIsPlaying(false);
              });

            // Stage 3: The very millisecond the user touches, clicks, or interacts anywhere on the page, unmute seamlessly
            const unlockSound = () => {
              if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.volume = 0.7;
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    setIsMuted(false);
                    setShowAutoplayHint(false);
                    if (cleanupListeners) cleanupListeners();
                  })
                  .catch(() => {});
              }
            };

            cleanupListeners = () => {
              activationEvents.forEach((evt) => {
                window.removeEventListener(evt, unlockSound, { capture: true });
                document.removeEventListener(evt, unlockSound, { capture: true });
              });
            };

            activationEvents.forEach((evt) => {
              window.addEventListener(evt, unlockSound, { capture: true, passive: true });
              document.addEventListener(evt, unlockSound, { capture: true, passive: true });
            });
          });
      }
    };

    tryAutoplay();

    // Time update & loop handlers
    const onTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      }
    };

    const onEndedListener = () => {
      handleAudioEnded();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onTimeUpdate);
    audio.addEventListener('ended', onEndedListener);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onTimeUpdate);
      audio.removeEventListener('ended', onEndedListener);
      if (cleanupListeners) cleanupListeners();
    };
  }, [handleAudioEnded]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      setIsMuted(false);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowAutoplayHint(false);
        })
        .catch((err) => {
          console.warn('Audio play error:', err);
        });
    }
  };

  // Toggle Mute / Unmute
  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Seek handler on progress bar click
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = newProgress * duration;
    setCurrentTime(audio.currentTime);
  };

  // Format mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside
      aria-label="Nhạc nền sáng tạo của Lio"
      className="fixed bottom-5 left-4 sm:left-6 z-40 select-none print:hidden"
    >
      {/* Hidden Audio Element with real soundtrack */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}soundtrack.mp3`}
        autoPlay
        playsInline
        loop={isLooping}
        onPlay={() => setIsPlaying(true)}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      {/* Autoplay Hint Banner (If browser blocked audio before interaction) */}
      <AnimatePresence>
        {showAutoplayHint && isMuted && (
          <motion.button
            type="button"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.volume = 0.7;
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    setIsMuted(false);
                    setShowAutoplayHint(false);
                  })
                  .catch(() => {});
              }
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-[11px] font-bold shadow-lg shadow-emerald-500/25 animate-bounce cursor-pointer border border-white/20"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Chạm bất kỳ đâu để bật âm thanh 🎵</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* MINIMIZED COMPACT VINYL DOCK */
          <motion.div
            key="minimized"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="relative flex items-center gap-2.5 p-2 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-neutral-200/90 dark:border-white/10 shadow-2xl glow-hover"
          >
            {/* Spinning Neon Vinyl Icon */}
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc bye (slowed)'}
              className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-neutral-950 border border-emerald-500/40 shadow-md group cursor-pointer"
            >
              <div
                className={`w-full h-full flex items-center justify-center bg-[radial-gradient(circle,#059669_10%,#09090b_70%)] ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3.5s' }}
              >
                <Disc3 className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Center Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white fill-white" />
                ) : (
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                )}
              </div>
            </button>

            {/* Mini Equalizer Waves */}
            <div className="flex items-end space-x-0.5 h-4 px-1" title="Visualizer">
              <span
                className={`w-0.5 rounded-full bg-emerald-500 transition-all ${
                  isPlaying ? 'animate-wave-1' : 'h-1 bg-neutral-400'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-cyan-400 transition-all ${
                  isPlaying ? 'animate-wave-2' : 'h-1 bg-neutral-400'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-indigo-500 transition-all ${
                  isPlaying ? 'animate-wave-3' : 'h-1 bg-neutral-400'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-pink-500 transition-all ${
                  isPlaying ? 'animate-wave-4' : 'h-1 bg-neutral-400'
                }`}
              />
            </div>

            {/* Maximize Button */}
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              aria-label="Mở rộng trình phát nhạc"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          /* EXPANDED HIGH-END CYBER AUDIO DOCK */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="relative flex flex-col p-3 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.25)] max-w-[calc(100vw-2rem)] sm:max-w-sm glow-hover group overflow-hidden"
          >
            {/* Ambient Background Aura */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="relative z-10 flex items-center gap-3">
              {/* 3D VINYL DISC WITH NEON RIM */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="relative w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-emerald-500/40 shadow-lg shadow-emerald-500/15 group/disc cursor-pointer"
                  title={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
                >
                  {/* Concentric Grooves */}
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '4s' }}
                  >
                    <Disc3 className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>

                  {/* Play / Pause Center Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/disc:opacity-100 transition-opacity">
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white fill-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    )}
                  </div>
                </button>

                {/* Pulse Green Beacon */}
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                )}
              </div>

              {/* Track Metadata & Equalizer */}
              <div className="min-w-0 flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    <span>GIAI ĐIỆU CẢM HƯNG // AUTO-PLAY</span>
                  </span>
                </div>

                <div
                  className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white truncate"
                  title="bye (slowed) — Altare Remix"
                >
                  bye (slowed)
                </div>

                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-medium">
                  Altare (Ariana Grande Remix)
                </div>
              </div>

              {/* Control Action Icons */}
              <div className="flex items-center gap-1 shrink-0 border-l border-neutral-100 dark:border-neutral-800 pl-2">
                {/* Play/Pause Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Bật nhạc'}
                  className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center shadow-md transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </motion.button>

                {/* Mute / Unmute Button */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? 'Bật âm lượng' : 'Tắt tiếng'}
                  title={isMuted ? 'Bật âm lượng' : 'Tắt tiếng'}
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

                {/* Seamless Auto-Repeat Toggle */}
                <button
                  type="button"
                  onClick={() => setIsLooping(!isLooping)}
                  aria-label={isLooping ? 'Đang bật tự động lặp lại' : 'Tắt lặp lại'}
                  title={isLooping ? 'Tự động lặp lại: Đang Bật' : 'Tự động lặp lại: Đang Tắt'}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isLooping
                      ? 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-400/15'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>

                {/* Minimize Button */}
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
            </div>

            {/* INTERACTIVE AUDIO TIMELINE & PROGRESS SCRUBBER */}
            <div className="relative z-10 pt-2.5 mt-1 border-t border-neutral-100 dark:border-white/5 space-y-1">
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className="group/bar relative h-1.5 w-full rounded-full bg-neutral-200/80 dark:bg-neutral-800 cursor-pointer overflow-hidden"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-pink-500 transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>{formatTime(currentTime)}</span>

                {/* Equalizer Visualizer Bars */}
                <div className="flex items-end space-x-1 h-3">
                  <span
                    className={`w-0.5 rounded-full bg-emerald-500 ${
                      isPlaying ? 'animate-wave-1' : 'h-1 bg-neutral-400'
                    }`}
                  />
                  <span
                    className={`w-0.5 rounded-full bg-cyan-400 ${
                      isPlaying ? 'animate-wave-2' : 'h-1 bg-neutral-400'
                    }`}
                  />
                  <span
                    className={`w-0.5 rounded-full bg-indigo-500 ${
                      isPlaying ? 'animate-wave-3' : 'h-1 bg-neutral-400'
                    }`}
                  />
                  <span
                    className={`w-0.5 rounded-full bg-pink-500 ${
                      isPlaying ? 'animate-wave-4' : 'h-1 bg-neutral-400'
                    }`}
                  />
                </div>

                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
