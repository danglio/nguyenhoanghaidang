import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Check,
  Clock,
  Music,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

// Authentic Spotify Logo SVG Component
function SpotifyLogo({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.216.353-.674.467-1.027.25-2.822-1.724-6.374-2.113-10.558-1.158-.403.093-.804-.158-.897-.562-.093-.404.158-.805.562-.898 4.582-1.047 8.513-.604 11.67 1.341.353.217.467.674.25 1.027zm1.468-3.264c-.272.441-.852.581-1.293.31-3.23-1.986-8.155-2.56-11.977-1.4-.499.152-1.027-.133-1.179-.632-.152-.499.133-1.028.632-1.18 4.372-1.327 9.805-.684 13.507 1.593.441.271.581.851.31 1.292v.017zm.135-3.398c-3.874-2.3-10.264-2.512-13.978-1.385-.595.18-1.226-.157-1.407-.752-.18-.595.158-1.226.753-1.407 4.269-1.296 11.328-1.048 15.787 1.598.535.318.71 1.011.393 1.546-.318.536-1.011.71-1.546.393l-.002.007z" />
    </svg>
  );
}

export default function SpotifyAlbumShowcase({ showToast }) {
  const baseUrl = import.meta.env.BASE_URL;

  // EP Tracks Metadata
  const tracks = [
    {
      id: 1,
      title: 'The Dashboard Vow',
      artist: 'Đăng Lio',
      tag: 'Midnight Reflection',
      durationStr: '02:53',
      durationSec: 173,
      audioSrc: `${baseUrl}music/the_dashboard_vow.mp3`,
      coverSrc: `${baseUrl}music/covers/dashboard_vow.jpg`,
      accentColor: 'from-cyan-500/20 to-indigo-500/10',
    },
    {
      id: 2,
      title: 'The Hour Before Waking',
      artist: 'Đăng Lio',
      tag: 'Blue Hour Ambient',
      durationStr: '02:32',
      durationSec: 152,
      audioSrc: `${baseUrl}music/the_hour_before_waking.mp3`,
      coverSrc: `${baseUrl}music/covers/hour_before_waking.jpg`,
      accentColor: 'from-indigo-500/20 to-purple-500/10',
    },
    {
      id: 3,
      title: 'Worth Anew',
      artist: 'Đăng Lio',
      tag: 'Golden Dawn Melodic',
      durationStr: '02:58',
      durationSec: 179,
      audioSrc: `${baseUrl}music/worth_anew.mp3`,
      coverSrc: `${baseUrl}music/covers/worth_anew.jpg`,
      accentColor: 'from-amber-500/20 to-orange-500/10',
    },
  ];

  const mainAlbumCover = `${baseUrl}music/covers/dawn_chronicles_ep.jpg`;

  // State Management
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState(null);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Audio coordination: Pause if other site player starts
  useEffect(() => {
    const handleOtherSoundtrackPlay = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('soundtrack-play', handleOtherSoundtrackPlay);
    return () => {
      window.removeEventListener('soundtrack-play', handleOtherSoundtrackPlay);
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Play a specific track index
  const playTrack = useCallback(
    (index) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Broadcast global event to pause background soundtrack
      window.dispatchEvent(new CustomEvent('spotify-album-play'));

      if (currentTrackIndex === index) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      } else {
        setCurrentTrackIndex(index);
        setCurrentTime(0);
        audio.src = tracks[index].audioSrc;
        audio.load();
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            if (showToast) {
              showToast({
                message: `Đang phát: ${tracks[index].title} 🎵`,
                type: 'success',
              });
            }
          })
          .catch(() => {});
      }
    },
    [currentTrackIndex, isPlaying, showToast, tracks]
  );

  // Master Album Play/Pause Button
  const toggleMasterPlay = () => {
    if (currentTrackIndex === null) {
      playTrack(0);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        window.dispatchEvent(new CustomEvent('spotify-album-play'));
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  // Next / Previous Track
  const playNextTrack = () => {
    if (currentTrackIndex === null) {
      playTrack(0);
    } else {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(nextIndex);
    }
  };

  const playPrevTrack = () => {
    if (currentTrackIndex === null) {
      playTrack(0);
    } else {
      const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      playTrack(prevIndex);
    }
  };

  // Audio Event Listeners
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    if (currentTrackIndex !== null) {
      const nextIndex = currentTrackIndex + 1;
      if (nextIndex < tracks.length) {
        playTrack(nextIndex);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }
  };

  // Scrubber Progress Bar Seek
  const handleProgressClick = (e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newRatio = Math.max(0, Math.min(1, clickX / width));
    const newTime = newRatio * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Volume Change
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Like Toggle
  const handleToggleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    if (showToast) {
      showToast({
        message: nextState
          ? 'Đã thêm "THE DAWN CHRONICLES (EP)" vào thư viện yêu thích! 💚'
          : 'Đã bỏ yêu thích album.',
        type: nextState ? 'success' : 'default',
      });
    }
  };

  // Share Album Link
  const handleShareAlbum = async () => {
    try {
      const shareUrl = `${window.location.origin}${window.location.pathname}#spotify-album`;
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (showToast) {
        showToast({
          message: 'Đã sao chép liên kết Album Spotify vào clipboard! 🔗',
          type: 'success',
        });
      }
    } catch {
      if (showToast) {
        showToast({
          message: 'Không thể sao chép liên kết, vui lòng thử lại!',
          type: 'error',
        });
      }
    }
  };

  const activeTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      id="spotify-album"
      className="w-full rounded-3xl overflow-hidden bg-neutral-950/95 border border-neutral-800/90 shadow-2xl relative group/album"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at top left, rgba(29, 185, 84, 0.12), transparent 60%), radial-gradient(ellipse at bottom right, rgba(99, 102, 241, 0.08), transparent 60%)',
      }}
    >
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Subtle Top Ambient Neon Spotify Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#1DB954] to-transparent opacity-80" />

      {/* Main Container */}
      <div className="p-6 sm:p-8 lg:p-10 space-y-8">
        {/* ================= 1. ALBUM HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
          {/* Square 1:1 Album Cover Art with Glow */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-neutral-700/60 shrink-0 group/cover"
          >
            <img
              src={mainAlbumCover}
              alt="THE DAWN CHRONICLES (EP) Album Cover"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/cover:scale-105"
            />
            {/* Holographic Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />

            {/* Quick Hover Play Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMasterPlay}
                className="w-14 h-14 rounded-full bg-[#1DB954] text-neutral-950 flex items-center justify-center shadow-2xl"
                aria-label={isPlaying ? 'Tạm dừng EP' : 'Phát toàn bộ EP'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-neutral-950 text-neutral-950" />
                ) : (
                  <Play className="w-7 h-7 fill-neutral-950 text-neutral-950 ml-0.5" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Album Information & Metadata */}
          <div className="flex-1 text-center md:text-left space-y-3 w-full">
            {/* Badge & Spotify Brand Identity */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1DB954]/15 text-[#1DB954] border border-[#1DB954]/30 shadow-sm">
                <SpotifyLogo className="w-4 h-4" />
                <span>SPOTIFY EP RELEASE</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
                LOSSLESS AUDIO
              </span>
            </div>

            {/* Album Title */}
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-semibold mb-1">
                ALBUM // MINI EP
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                THE DAWN CHRONICLES
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Bộ 3 bản phối Soundtrack câu chuyện số độc quyền do Đăng Lio sáng tác & sản xuất.
              </p>
            </div>

            {/* Artist Line & Meta Info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <img
                  src={`${baseUrl}avatar.jpg`}
                  alt="Đăng Lio"
                  className="w-6 h-6 rounded-full object-cover border border-neutral-600"
                />
                <span className="font-bold text-white hover:text-[#1DB954] transition-colors cursor-pointer">
                  Đăng Lio
                </span>
              </div>
              <span className="text-neutral-600">•</span>
              <span>2026</span>
              <span className="text-neutral-600">•</span>
              <span className="font-medium text-neutral-200">3 bài hát</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">8 phút 24 giây</span>
            </div>
          </div>
        </div>

        {/* ================= 2. SPOTIFY ACTION CONTROLS BAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-neutral-800/80">
          <div className="flex items-center gap-4">
            {/* Master Big Green Play Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMasterPlay}
              className="w-14 h-14 rounded-full bg-[#1DB954] text-neutral-950 flex items-center justify-center shadow-[0_10px_25px_rgba(29,185,84,0.4)] hover:brightness-110 transition-all"
              title={isPlaying ? 'Tạm dừng EP' : 'Phát toàn bộ EP'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-neutral-950 text-neutral-950" />
              ) : (
                <Play className="w-7 h-7 fill-neutral-950 text-neutral-950 ml-1" />
              )}
            </motion.button>

            {/* Heart / Like Action */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleLike}
              className={`p-3 rounded-full transition-colors ${
                isLiked
                  ? 'text-[#1DB954] bg-[#1DB954]/10'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60'
              }`}
              title={isLiked ? 'Đã yêu thích' : 'Lưu vào thư viện yêu thích'}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-[#1DB954]' : ''}`} />
            </motion.button>

            {/* Share / Copy Link Action */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShareAlbum}
              className="p-3 rounded-full text-neutral-400 hover:text-white bg-neutral-900/60 transition-colors"
              title="Sao chép link Album"
            >
              {copied ? (
                <Check className="w-6 h-6 text-[#1DB954]" />
              ) : (
                <Share2 className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Currently Playing Status Indicator */}
          {activeTrack && (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-xs">
              <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
              <span className="text-neutral-400">Đang phát:</span>
              <span className="font-bold text-white max-w-[200px] truncate">
                {activeTrack.title}
              </span>
              <span className="text-[11px] font-mono text-[#1DB954]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          )}
        </div>

        {/* ================= 3. SPOTIFY TRACKLIST TABLE ================= */}
        <div className="space-y-1">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-3 px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-800/60 select-none">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-8 sm:col-span-8">Tiêu đề & Ca khúc</div>
            <div className="hidden sm:block sm:col-span-2 text-right">Thể loại</div>
            <div className="col-span-3 sm:col-span-1 text-right flex items-center justify-end gap-1">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Track Rows */}
          {tracks.map((track, index) => {
            const isThisPlaying = currentTrackIndex === index && isPlaying;
            const isThisSelected = currentTrackIndex === index;

            return (
              <motion.div
                key={track.id}
                onMouseEnter={() => setHoveredTrack(index)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => playTrack(index)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                className={`grid grid-cols-12 gap-3 px-4 py-3 rounded-xl items-center cursor-pointer transition-colors duration-150 group/row ${
                  isThisSelected
                    ? 'bg-white/[0.08] border border-neutral-700/60'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                {/* Column 1: Number OR Play/Pause Icon OR Equalizer */}
                <div className="col-span-1 flex items-center justify-center">
                  {isThisPlaying ? (
                    <div className="flex items-end space-x-0.5 h-4">
                      <span className="w-1 bg-[#1DB954] rounded-full animate-wave-1 h-3" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-wave-2 h-4" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-wave-3 h-2" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-wave-4 h-3.5" />
                    </div>
                  ) : hoveredTrack === index || isThisSelected ? (
                    <button
                      className="text-white hover:text-[#1DB954] transition-colors"
                      aria-label={`Phát ${track.title}`}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white" />
                      )}
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-neutral-400 font-semibold">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Column 2: Track Thumbnail & Title & Artist */}
                <div className="col-span-8 sm:col-span-8 flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-neutral-700/60 shadow-md relative">
                    <img
                      src={track.coverSrc}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    {isThisPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-sm font-bold truncate transition-colors ${
                        isThisSelected ? 'text-[#1DB954]' : 'text-white group-hover/row:text-[#1DB954]'
                      }`}
                    >
                      {track.title}
                    </div>
                    <div className="text-xs text-neutral-400 truncate flex items-center gap-1.5 mt-0.5">
                      <span className="hover:underline text-neutral-300">{track.artist}</span>
                      <span className="text-neutral-600 sm:hidden">•</span>
                      <span className="text-[10px] text-neutral-500 sm:hidden">{track.tag}</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Tag / Subtitle (Desktop only) */}
                <div className="hidden sm:block sm:col-span-2 text-right">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                    {track.tag}
                  </span>
                </div>

                {/* Column 4: Duration */}
                <div className="col-span-3 sm:col-span-1 text-right text-xs font-mono text-neutral-400 font-medium">
                  {track.durationStr}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= 4. EMBEDDED PLAYER CONTROLS (WHEN A TRACK IS ACTIVE) ================= */}
        {activeTrack && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-3 backdrop-blur-md"
          >
            {/* Top row: Track Details & Central Controls & Volume */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left: Active Track Details */}
              <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                <img
                  src={activeTrack.coverSrc}
                  alt={activeTrack.title}
                  className="w-12 h-12 rounded-xl object-cover border border-neutral-700 shadow-md shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    <span>{activeTrack.title}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate">{activeTrack.artist}</div>
                </div>
              </div>

              {/* Center: Playback Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={playPrevTrack}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Bài trước đó"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => playTrack(currentTrackIndex)}
                  className="w-10 h-10 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-md hover:bg-[#1DB954] hover:text-neutral-950 transition-colors"
                  aria-label={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={playNextTrack}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Bài tiếp theo"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </motion.button>
              </div>

              {/* Right: Volume Slider */}
              <div className="hidden md:flex items-center gap-2.5 w-36 shrink-0 justify-end">
                <button
                  onClick={toggleMute}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 rounded-lg appearance-none bg-neutral-700 accent-[#1DB954] cursor-pointer"
                  aria-label="Âm lượng bài hát"
                />
              </div>
            </div>

            {/* Bottom Row: Scrubber Timeline Bar */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[10px] font-mono text-neutral-400 w-9 text-right select-none">
                {formatTime(currentTime)}
              </span>

              <div
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="flex-1 h-1.5 bg-neutral-800 hover:h-2.5 rounded-full overflow-hidden cursor-pointer relative transition-all group/bar"
              >
                <div
                  className="h-full bg-[#1DB954] group-hover/bar:bg-[#1ed760] transition-all duration-75 relative rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-neutral-400 w-9 text-left select-none">
                {formatTime(duration)}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
