import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Radio,
  Camera,
  Zap,
  Sparkles,
  MapPin,
  Battery,
  BatteryCharging,
  Navigation,
  Eye,
  Send,
  Flame,
  Heart,
  Coffee,
  Smile,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Wifi,
  Smartphone,
  Sliders,
  Check,
} from 'lucide-react';

const INITIAL_FRIENDS = [
  {
    id: 'f1',
    name: 'Hà My',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    distance: '120m',
    battery: 78,
    isCharging: false,
    status: 'Đang ở Circle K Tây Thạnh',
    speed: '0 km/h',
    x: 72, // percentage on radar
    y: 28,
    color: '#22d3ee',
    lastSeen: 'Vừa xong',
  },
  {
    id: 'f2',
    name: 'Minh Khôi',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    distance: '850m',
    battery: 34,
    isCharging: false,
    status: 'Đang chạy qua Aeon Mall',
    speed: '28 km/h',
    x: 24,
    y: 75,
    color: '#f59e0b',
    lastSeen: '1 phút trước',
  },
  {
    id: 'f3',
    name: 'Bảo Trâm',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    distance: '450m',
    battery: 99,
    isCharging: true,
    status: 'The Coffee House HUIT',
    speed: '0 km/h',
    x: 78,
    y: 68,
    color: '#ec4899',
    lastSeen: '3 phút trước',
  },
  {
    id: 'f4',
    name: 'Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    distance: '1.4km',
    battery: 55,
    isCharging: false,
    status: 'Đang ở KTX Đại Học',
    speed: '5 km/h',
    x: 32,
    y: 35,
    color: '#a855f7',
    lastSeen: '5 phút trước',
  },
];

const PRESET_MOMENTS = [
  {
    id: 'p1',
    title: 'Học bài tại HUIT',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
    caption: 'Đang ngồi thư viện HUIT code radar...',
  },
  {
    id: 'p2',
    title: 'Cà phê chiều chill',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600',
    caption: 'Ly trà sữa nạp năng lượng chiều nay 🧋',
  },
  {
    id: 'p3',
    title: 'Check-in hoàng hôn TP.HCM',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
    caption: 'Hoàng hôn Sài Gòn nhìn từ góc ban công 🌅',
  },
];

export default function CenkinTestModal({ isOpen, onClose, showToast }) {
  const [activeTab, setActiveTab] = useState('radar'); // 'radar' | 'locket' | 'bump'
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [selectedFriend, setSelectedFriend] = useState(INITIAL_FRIENDS[0]);
  const [flyingEmojis, setFlyingEmojis] = useState([]);
  const [privacyMode, setPrivacyMode] = useState('precise'); // 'precise' | 'blurred' | 'ghost'
  const [realGpsCoords, setRealGpsCoords] = useState(null);
  const [isGettingGps, setIsGettingGps] = useState(false);

  // Locket state
  const [selectedPreset, setSelectedPreset] = useState(PRESET_MOMENTS[0]);
  const [customCaption, setCustomCaption] = useState('Đang test thử Cenkin Radar xịn quá 🔥');
  const [locketStreak, setLocketStreak] = useState(14);
  const [isLocketSent, setIsLocketSent] = useState(false);
  const [currentLocketDisplay, setCurrentLocketDisplay] = useState({
    image: PRESET_MOMENTS[0].image,
    caption: PRESET_MOMENTS[0].caption,
    time: 'Vừa xong',
  });

  // Bump engine state
  const [isBumping, setIsBumping] = useState(false);
  const [bumpSuccess, setBumpSuccess] = useState(false);
  const [bumpLog, setBumpLog] = useState([
    'Sẵn sàng nhận diện cảm biến gia tốc kế (Accelerometer)',
    'Socket.io phòng #bump-p2p đang lắng nghe...',
  ]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trigger real GPS
  const handleGetRealGps = () => {
    if (!navigator.geolocation) {
      if (showToast) {
        showToast({ message: 'Trình duyệt không hỗ trợ Geolocation API', type: 'error' });
      }
      return;
    }
    setIsGettingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGettingGps(false);
        const coords = {
          lat: pos.coords.latitude.toFixed(4),
          lng: pos.coords.longitude.toFixed(4),
          acc: Math.round(pos.coords.accuracy),
        };
        setRealGpsCoords(coords);
        if (showToast) {
          showToast({
            message: `Đã kết nối GPS thực: ${coords.lat}°N, ${coords.lng}°E (Độ chuẩn xác: ${coords.acc}m)`,
            type: 'success',
          });
        }
      },
      (err) => {
        setIsGettingGps(false);
        // Fallback to HUIT TP.HCM coordinates
        setRealGpsCoords({ lat: '10.8231', lng: '106.6297', acc: 10 });
        if (showToast) {
          showToast({
            message: 'Đã kích hoạt tọa độ mô phỏng tại Trường ĐH Công Thương TP.HCM (HUIT)',
            type: 'info',
          });
        }
      },
      { timeout: 8000 }
    );
  };

  // Send flying emoji reaction to selected friend
  const handleSendReaction = (emoji) => {
    const newId = Date.now() + Math.random();
    setFlyingEmojis((prev) => [...prev, { id: newId, emoji }]);
    setTimeout(() => {
      setFlyingEmojis((prev) => prev.filter((item) => item.id !== newId));
    }, 1800);

    if (navigator?.vibrate) {
      navigator.vibrate(30);
    }
  };

  // Handle Locket Send
  const handleSendLocket = () => {
    setIsLocketSent(true);
    setCurrentLocketDisplay({
      image: selectedPreset.image,
      caption: customCaption || selectedPreset.caption,
      time: 'Vừa xong',
    });
    setLocketStreak((prev) => prev + 1);

    if (showToast) {
      showToast({
        message: '📸 Đã gửi Locket Moment lên widget màn hình khóa bạn bè! Streak +1 🔥',
        type: 'success',
      });
    }

    setTimeout(() => setIsLocketSent(false), 2500);
  };

  // Handle Bump Simulation
  const handleTriggerBump = () => {
    if (isBumping) return;
    setIsBumping(true);
    setBumpSuccess(false);

    if (navigator?.vibrate) {
      navigator.vibrate([60, 40, 80]);
    }

    setBumpLog((prev) => [
      `[${new Date().toLocaleTimeString()}] Phát hiện gia tốc đột ngột 2.9G trên trục X/Y!`,
      `[${new Date().toLocaleTimeString()}] Khớp nối Bluetooth LE & Geohash bán kính <1.5m...`,
      ...prev.slice(0, 4),
    ]);

    setTimeout(() => {
      setIsBumping(false);
      setBumpSuccess(true);
      setBumpLog((prev) => [
        `[${new Date().toLocaleTimeString()}] 🎉 BUMP THÀNH CÔNG! Đã kết bạn với "Quỳnh Anh (iPhone 16 Pro)"`,
        ...prev.slice(0, 4),
      ]);

      // Add new friend to radar if not exists
      if (!friends.find((f) => f.id === 'f-bump')) {
        const newFriend = {
          id: 'f-bump',
          name: 'Quỳnh Anh (Vừa Bump)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          distance: '0.8m',
          battery: 88,
          isCharging: true,
          status: 'Vừa va chạm Bump thành công 🎉',
          speed: '0 km/h',
          x: 48,
          y: 42,
          color: '#10b981',
          lastSeen: 'Vừa xong',
        };
        setFriends((prev) => [newFriend, ...prev]);
        setSelectedFriend(newFriend);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cenkin-modal-title"
      >
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl my-auto rounded-3xl bg-neutral-950/95 text-white border border-emerald-500/30 shadow-[0_25px_70px_rgba(16,185,129,0.2)] overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top glowing neon beam */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500" />

          {/* Header */}
          <div className="p-4 sm:p-6 pb-4 border-b border-neutral-800/80 flex items-center justify-between gap-4 bg-neutral-900/60 backdrop-blur-md">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>CENKIN LIVE LAB // PHÒNG THỬ NGHIỆM TRỰC TIẾP</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
                  <Wifi className="w-3 h-3 text-cyan-400" />
                  <span>Socket &lt;32ms</span>
                </span>
              </div>
              <h2 id="cenkin-modal-title" className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Cenkin (Zenly Radar & Locket Moments)</span>
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer border border-neutral-700"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 border-b border-neutral-800/80 bg-neutral-900/30 overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'radar'
                  ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/25'
                  : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>🛰️ Zenly Radar 360°</span>
            </button>

            <button
              onClick={() => setActiveTab('locket')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'locket'
                  ? 'bg-cyan-500 text-neutral-950 shadow-md shadow-cyan-500/25'
                  : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>📸 Locket Widget Màn Hình Khóa</span>
            </button>

            <button
              onClick={() => setActiveTab('bump')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'bump'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/25'
                  : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>💥 Thử Nghiệm Bump Đập Máy</span>
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
            {/* =========================================================
                TAB 1: ZENLY RADAR 360° INTERACTIVE MAP
            ========================================================= */}
            {activeTab === 'radar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Radar Canvas / Circle (7 cols) */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="relative w-full aspect-square max-w-[360px] sm:max-w-[400px] rounded-full bg-neutral-900/90 border-2 border-emerald-500/40 p-4 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden flex items-center justify-center select-none">
                    {/* Concentric rings */}
                    <div className="absolute inset-4 rounded-full border border-emerald-500/25 pointer-events-none" />
                    <div className="absolute inset-12 rounded-full border border-dashed border-emerald-500/20 pointer-events-none" />
                    <div className="absolute inset-24 rounded-full border border-emerald-500/20 pointer-events-none" />
                    <div className="absolute inset-36 rounded-full border border-emerald-500/15 pointer-events-none" />

                    {/* Crosshair grid */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-emerald-500/20 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-emerald-500/20 pointer-events-none" />

                    {/* Rotating Radar Sweep Beam */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none animate-radar-sweep"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.45) 360deg)',
                      }}
                    />

                    {/* Center: Current User (Lio) */}
                    <div className="relative z-20 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_16px_#34d399] flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-neutral-950 animate-pulse" />
                      </div>
                      <div className="mt-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300 whitespace-nowrap shadow-md">
                        Bạn (Lio) • Tâm Radar
                      </div>
                    </div>

                    {/* Interactive Friend Blips on Radar */}
                    {friends.map((friend) => {
                      const isSelected = selectedFriend?.id === friend.id;
                      return (
                        <motion.div
                          key={friend.id}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedFriend(friend)}
                          style={{
                            position: 'absolute',
                            left: `${friend.x}%`,
                            top: `${friend.y}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          className="z-30 cursor-pointer flex flex-col items-center group"
                        >
                          <div className={`relative rounded-full p-0.5 transition-all ${
                            isSelected ? 'ring-4 ring-white shadow-[0_0_20px_#fff]' : 'hover:ring-2 hover:ring-cyan-400'
                          }`}>
                            <img
                              src={friend.avatar}
                              alt={friend.name}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/40"
                            />
                            {/* Pulse indicator */}
                            <span
                              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-neutral-900"
                              style={{ backgroundColor: friend.color }}
                            />
                          </div>

                          {/* Mini Name Pill */}
                          <div className="mt-1 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-neutral-700 text-[9px] font-mono font-bold text-white whitespace-nowrap shadow-md">
                            {friend.name} ({friend.distance})
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Flying Emoji Reactions overlay */}
                    {flyingEmojis.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 1, scale: 0.5, y: 0 }}
                        animate={{ opacity: 0, scale: 2.2, y: -90 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="absolute z-40 text-3xl pointer-events-none"
                        style={{
                          left: `${selectedFriend?.x || 50}%`,
                          top: `${selectedFriend?.y || 50}%`,
                        }}
                      >
                        {item.emoji}
                      </motion.div>
                    ))}
                  </div>

                  {/* Radar Telemetry Footer */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Phương vị: 360° Realtime</span>
                    </span>
                    <span>•</span>
                    <span>Độ trễ Socket: 24ms</span>
                    <span>•</span>
                    <span className="text-emerald-400">Đang quét 4 bạn bè</span>
                  </div>
                </div>

                {/* Right Details & Controls (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Selected Friend Profile Card */}
                  {selectedFriend && (
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedFriend.avatar}
                          alt={selectedFriend.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-white/20"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-white text-base truncate flex items-center gap-1.5">
                            <span>{selectedFriend.name}</span>
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          </h4>
                          <div className="text-xs text-neutral-400 flex items-center gap-2">
                            <span>{selectedFriend.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        <div className="p-2 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                          <div className="text-xs text-neutral-400">Khoảng cách</div>
                          <div className="font-mono font-bold text-emerald-400 text-sm">
                            {selectedFriend.distance}
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                          <div className="text-xs text-neutral-400">Pin thiết bị</div>
                          <div className="font-mono font-bold text-amber-400 text-sm flex items-center justify-center gap-1">
                            {selectedFriend.isCharging ? (
                              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Battery className="w-3.5 h-3.5" />
                            )}
                            <span>{selectedFriend.battery}%</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                          <div className="text-xs text-neutral-400">Tốc độ</div>
                          <div className="font-mono font-bold text-cyan-400 text-sm">
                            {selectedFriend.speed}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Emoji Reactions */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-semibold text-neutral-300">
                          ⚡ Bắn sóng PING tức thì tới {selectedFriend.name}:
                        </div>
                        <div className="flex items-center gap-2">
                          {['❤️', '🔥', '⚡', '👋', '☕'].map((emoji) => (
                            <motion.button
                              key={emoji}
                              whileHover={{ scale: 1.25, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSendReaction(emoji)}
                              className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 flex items-center justify-center text-xl cursor-pointer transition-all shadow-sm"
                              title={`Gửi ${emoji}`}
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Real GPS Connection Box */}
                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>TỌA ĐỘ VỆ TINH HIỆN TẠI</span>
                      </span>
                      {realGpsCoords && (
                        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                          Đã đồng bộ
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-neutral-300 font-mono">
                      {realGpsCoords
                        ? `LAT: ${realGpsCoords.lat}°N • LNG: ${realGpsCoords.lng}°E (Sai số ±${realGpsCoords.acc}m)`
                        : 'Mặc định: 10.8231° N, 106.6297° E (HUIT - TP.HCM)'}
                    </div>

                    <button
                      onClick={handleGetRealGps}
                      disabled={isGettingGps}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-all cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGettingGps ? 'animate-spin' : ''}`} />
                      <span>{isGettingGps ? 'Đang truy xuất GPS...' : '📍 Quét GPS Thực Tế Của Bạn'}</span>
                    </button>
                  </div>

                  {/* Privacy Mode Selector */}
                  <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Chế độ hiển thị vị trí (Ghost Mode):</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => setPrivacyMode('precise')}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          privacyMode === 'precise'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-neutral-800/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        🟢 Chính xác
                      </button>
                      <button
                        onClick={() => setPrivacyMode('blurred')}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          privacyMode === 'blurred'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-neutral-800/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        🟡 Mờ (500m)
                      </button>
                      <button
                        onClick={() => setPrivacyMode('ghost')}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          privacyMode === 'ghost'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-neutral-800/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        👻 Đóng băng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 2: LOCKET MOMENTS WIDGET CAMERA SIMULATOR
            ========================================================= */}
            {activeTab === 'locket' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Camera Creator & Presets (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Camera className="w-5 h-5 text-cyan-400" />
                      <span>Tạo & Gửi Ảnh Locket Lên Màn Hình Khóa</span>
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Chọn khoảnh khắc mẫu hoặc nhập caption để bắn trực tiếp lên Widget màn hình khóa bạn bè!
                    </p>
                  </div>

                  {/* Preset Moment Cards */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-neutral-300">
                      Chọn khoảnh khắc bạn muốn chia sẻ:
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {PRESET_MOMENTS.map((preset) => {
                        const isSelected = selectedPreset.id === preset.id;
                        return (
                          <div
                            key={preset.id}
                            onClick={() => {
                              setSelectedPreset(preset);
                              setCustomCaption(preset.caption);
                            }}
                            className={`p-2 rounded-2xl bg-neutral-900 border transition-all cursor-pointer relative overflow-hidden group ${
                              isSelected
                                ? 'border-cyan-400 ring-2 ring-cyan-500/30'
                                : 'border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            <img
                              src={preset.image}
                              alt={preset.title}
                              className="w-full aspect-square rounded-xl object-cover mb-1.5"
                            />
                            <div className="text-[11px] font-bold text-white truncate">
                              {preset.title}
                            </div>
                            {isSelected && (
                              <div className="absolute top-3 right-3 p-1 rounded-full bg-cyan-500 text-neutral-950 shadow-md">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Caption Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Lời nhắn đính kèm trên Widget:
                    </label>
                    <input
                      type="text"
                      value={customCaption}
                      onChange={(e) => setCustomCaption(e.target.value)}
                      placeholder="Nhập caption của bạn..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Send Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendLocket}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Bắn Locket Lên Widget Màn Hình Khóa</span>
                  </motion.button>
                </div>

                {/* Right: Phone Lock Screen Mockup (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full max-w-[280px] rounded-[36px] bg-neutral-900 p-3.5 border-4 border-neutral-800 shadow-2xl overflow-hidden text-center select-none">
                    {/* Top Speaker / Dynamic Island notch */}
                    <div className="w-20 h-4 bg-black rounded-full mx-auto mb-3" />

                    {/* Clock & Date */}
                    <div className="text-[11px] font-medium text-neutral-400">
                      Thứ Hai, 19 tháng 10
                    </div>
                    <div className="text-4xl font-extrabold tracking-tight text-white mb-4 font-mono">
                      16:20
                    </div>

                    {/* Locket Widget Frame */}
                    <div className="relative aspect-square w-full rounded-2xl bg-black overflow-hidden border border-white/20 shadow-lg">
                      <img
                        src={currentLocketDisplay.image}
                        alt="Locket Widget"
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Header badge */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white">
                        <span>Lio Đăng</span>
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      </div>

                      {/* Caption & Timestamp */}
                      <div className="absolute bottom-2 inset-x-2 text-left">
                        <div className="text-[10px] font-semibold text-white line-clamp-2 drop-shadow">
                          {currentLocketDisplay.caption}
                        </div>
                        <div className="text-[8px] font-mono text-neutral-300 mt-0.5">
                          {currentLocketDisplay.time}
                        </div>
                      </div>

                      {/* Flash on send animation */}
                      {isLocketSent && (
                        <motion.div
                          initial={{ opacity: 0.9 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 bg-white pointer-events-none"
                        />
                      )}
                    </div>

                    {/* Live Streak Pill */}
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{locketStreak} Ngày Streak Locket</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 3: BUMP PHYSICAL ENGINE SIMULATOR
            ========================================================= */}
            {activeTab === 'bump' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>Cơ Chế Bump Vật Lý (Chạm Nhẹ Điện Thoại Để Kết Bạn)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Sử dụng cảm biến gia tốc kế (Accelerometer) kết hợp Geohash p2p để nhận diện hai thiết bị vừa va chạm nhẹ vào nhau trong bán kính 1m.
                  </p>
                </div>

                {/* Bump Visual Simulation Stage */}
                <div className="relative p-6 sm:p-10 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
                  <div className="flex items-center justify-center gap-6 sm:gap-12 relative z-10">
                    {/* Device A (Your Phone) */}
                    <motion.div
                      animate={isBumping ? { x: [0, 25, 0] } : {}}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="w-24 h-40 sm:w-28 sm:h-48 rounded-2xl bg-neutral-950 border-2 border-cyan-500/60 p-2 shadow-lg flex flex-col justify-between"
                    >
                      <div className="w-8 h-1.5 bg-neutral-800 rounded-full mx-auto" />
                      <div className="text-center">
                        <Smartphone className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                        <span className="text-[10px] font-mono text-cyan-300 font-bold block">
                          Máy của bạn
                        </span>
                      </div>
                      <div className="w-4 h-4 rounded-full border border-neutral-700 mx-auto" />
                    </motion.div>

                    {/* Collision Impact Center Shockwave */}
                    <div className="relative flex items-center justify-center w-12 h-12">
                      {isBumping && (
                        <motion.div
                          initial={{ scale: 0.2, opacity: 1 }}
                          animate={{ scale: 3, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute w-16 h-16 rounded-full bg-amber-400/50 border border-amber-300"
                        />
                      )}
                      <span className="text-2xl font-black text-amber-400">⚡</span>
                    </div>

                    {/* Device B (Friend's Phone) */}
                    <motion.div
                      animate={isBumping ? { x: [0, -25, 0] } : {}}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="w-24 h-40 sm:w-28 sm:h-48 rounded-2xl bg-neutral-950 border-2 border-emerald-500/60 p-2 shadow-lg flex flex-col justify-between"
                    >
                      <div className="w-8 h-1.5 bg-neutral-800 rounded-full mx-auto" />
                      <div className="text-center">
                        <Smartphone className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                        <span className="text-[10px] font-mono text-emerald-300 font-bold block">
                          Máy bạn bè
                        </span>
                      </div>
                      <div className="w-4 h-4 rounded-full border border-neutral-700 mx-auto" />
                    </motion.div>
                  </div>

                  {/* Trigger Action */}
                  <div className="mt-8 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerBump}
                      disabled={isBumping}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-neutral-950 shadow-lg shadow-amber-500/25 cursor-pointer font-mono"
                    >
                      <Zap className="w-4 h-4 fill-neutral-950" />
                      <span>{isBumping ? 'ĐANG ĐẬP MÁY VA CHẠM...' : '💥 BẤM THỬ NGHIỆM BUMP VA CHẠM'}</span>
                    </motion.button>
                  </div>

                  {/* Success notification */}
                  {bumpSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>ĐÃ BUMP THÀNH CÔNG! Đã tự động kết bạn & ghim vị trí lên Radar 360°!</span>
                    </motion.div>
                  )}
                </div>

                {/* Realtime Sensor Telemetry Logs */}
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 font-mono text-xs text-neutral-400 space-y-1">
                  <div className="text-neutral-300 font-bold flex items-center gap-1.5 mb-1">
                    <span>📡 Nhật ký cảm biến Sensor & Socket.io:</span>
                  </div>
                  {bumpLog.map((log, index) => (
                    <div key={index} className="text-[11px] truncate">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
