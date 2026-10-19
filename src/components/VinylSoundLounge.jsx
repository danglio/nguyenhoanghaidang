import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc3,
  Music,
  Radio,
} from 'lucide-react';

export default function VinylSoundLounge({ soundFX, showToast }) {
  const baseUrl = import.meta.env.BASE_URL;

  const tracks = [
    {
      id: 1,
      title: 'The Dashboard Vow',
      artist: 'Đăng Lio',
      tag: 'Midnight Lo-Fi',
      audioSrc: `${baseUrl}music/the_dashboard_vow.mp3`,
      coverSrc: `${baseUrl}music/covers/dashboard_vow.jpg`,
    },
    {
      id: 2,
      title: 'The Hour Before Waking',
      artist: 'Đăng Lio',
      tag: 'Blue Hour Ambient',
      audioSrc: `${baseUrl}music/the_hour_before_waking.mp3`,
      coverSrc: `${baseUrl}music/covers/hour_before_waking.jpg`,
    },
    {
      id: 3,
      title: 'Worth Anew',
      artist: 'Đăng Lio',
      tag: 'Golden Dawn Melodic',
      audioSrc: `${baseUrl}music/worth_anew.mp3`,
      coverSrc: `${baseUrl}music/covers/worth_anew.jpg`,
    },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const currentTrack = tracks[currentTrackIndex];

  // Sync audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.audioSrc;
    audio.load();

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      // Auto play next track
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [tracks.length]);

  const togglePlay = () => {
    soundFX?.playClick();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = isMuted;
      audio.volume = 0.6;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleNext = () => {
    soundFX?.playClick();
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    soundFX?.playClick();
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl glow-card relative overflow-hidden">
      {/* Hidden Native Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/60 dark:border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center">
            <Radio className="w-5 h-5 animate-pulse text-indigo-500" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest">
              <span>PAVILION 03 // AUDIO VISUAL LOUNGE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              Phòng Nghe Đĩa Than 3D (Lo-Fi EP)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400">
            {tracks.length} Bản nhạc gốc
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Main Showcase: Vinyl Turntable on Left, Controls & Playlist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Turntable & Grooved Vinyl Disc */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative select-none">
          {/* Turntable Platter Base */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-3 bg-neutral-900/90 dark:bg-black/95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-neutral-700/80 dark:border-white/10 flex items-center justify-center">
            {/* Tone-Arm (Kim đĩa than) */}
            <motion.div
              animate={{ rotate: isPlaying ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="absolute -top-3 -right-2 z-30 origin-top-right pointer-events-none"
            >
              <div className="w-24 sm:w-28 h-2 rounded-full bg-gradient-to-r from-neutral-400 via-neutral-300 to-amber-400 shadow-md transform rotate-45">
                {/* Needle Cartridge */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-3 bg-neutral-900 border border-amber-400/80 rounded-sm" />
              </div>
            </motion.div>

            {/* Grooved Vinyl Disc with 360 Spin */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 6,
                ease: 'linear',
              }}
              onClick={togglePlay}
              className="relative w-full h-full rounded-full bg-[#0d0d11] p-1.5 shadow-2xl cursor-pointer flex items-center justify-center overflow-hidden group"
              title={isPlaying ? 'Bấm để tạm dừng' : 'Bấm để phát đĩa than'}
            >
              {/* Concentric Vinyl Sound Grooves */}
              <div className="absolute inset-2 rounded-full border border-neutral-800/80" />
              <div className="absolute inset-5 rounded-full border border-neutral-800/60" />
              <div className="absolute inset-8 rounded-full border border-neutral-800/70" />
              <div className="absolute inset-11 rounded-full border border-neutral-800/50" />
              <div className="absolute inset-14 rounded-full border border-neutral-800/60" />

              {/* Holographic Vinyl Sheen Overlay */}
              <div
                className="absolute inset-0 rounded-full opacity-40 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.12) 60deg, transparent 120deg, rgba(255,255,255,0.08) 240deg, transparent 360deg)',
                }}
              />

              {/* Center Album Art Label */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-lg flex items-center justify-center bg-neutral-900">
                <img
                  src={currentTrack.coverSrc}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `${baseUrl}avatar.jpg`;
                  }}
                />
                {/* Spindle Center Hole */}
                <div className="absolute w-4 h-4 rounded-full bg-neutral-950 border border-amber-400/80 shadow-inner" />
              </div>
            </motion.div>
          </div>

          {/* Quick status under disc */}
          <div className="mt-3 text-[11px] font-mono text-neutral-400 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-neutral-500'}`} />
            <span>{isPlaying ? 'Đang quay đĩa than 33 RPM' : 'Đĩa than đang dừng • Nhấn để phát'}</span>
          </div>
        </div>

        {/* Right: Track Info, Controls, Timeline & Playlist */}
        <div className="lg:col-span-6 space-y-5">
          {/* Track Metadata */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 uppercase tracking-wider mb-1.5">
              <span>{currentTrack.tag}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-0.5">
              {currentTrack.artist} • Lio Studio Exclusive
            </p>
          </div>

          {/* Timeline Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full transition-all duration-200"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 transition-colors cursor-pointer"
                title="Bản nhạc trước"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="p-4 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
                title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 transition-colors cursor-pointer"
                title="Bản nhạc tiếp theo"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Live Equalizer soundwave */}
            <div className="flex items-end space-x-1 h-5 px-2">
              <span className={`w-1 rounded-full bg-indigo-500 ${isPlaying ? 'animate-wave-1' : 'h-1'}`} />
              <span className={`w-1 rounded-full bg-cyan-400 ${isPlaying ? 'animate-wave-2' : 'h-1.5'}`} />
              <span className={`w-1 rounded-full bg-indigo-500 ${isPlaying ? 'animate-wave-3' : 'h-2'}`} />
              <span className={`w-1 rounded-full bg-cyan-400 ${isPlaying ? 'animate-wave-4' : 'h-1'}`} />
            </div>
          </div>

          {/* Playlist Track Selection List */}
          <div className="space-y-1.5 pt-2 border-t border-neutral-200/50 dark:border-white/5">
            {tracks.map((track, idx) => {
              const isSelected = currentTrackIndex === idx;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    soundFX?.playClick();
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs opacity-60">0{idx + 1}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{track.title}</div>
                      <div className="text-[10px] opacity-70 truncate">{track.tag}</div>
                    </div>
                  </div>
                  {isSelected && isPlaying && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      PLAYING
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
