import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Download,
  UploadCloud,
  RotateCcw,
  Check,
  Image as ImageIcon,
  User,
  BarChart3,
  Link as LinkIcon,
} from 'lucide-react';

const AVAILABLE_PLATFORMS = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'github', label: 'GitHub' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'email', label: 'Email' },
  { value: 'website', label: 'Website / Blog' },
];

const AVAILABLE_ICONS = [
  'Users',
  'Sparkles',
  'Flame',
  'Heart',
  'Trophy',
  'Rocket',
  'Star',
  'Code',
  'Award',
  'Zap',
];

export default function EditModal({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
  onExport,
  onImport,
  showToast,
}) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(profile);
  const fileInputRef = useRef(null);
  const avatarFileRef = useRef(null);

  // Sync state when modal opens or profile changes
  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(profile)));
    }
  }, [isOpen, profile]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Personal info updater
  const handlePersonalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // Avatar upload from local file
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast?.({ message: 'Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      handlePersonalChange('avatarUrl', event.target.result);
      showToast?.({ message: 'Đã tải ảnh đại diện từ máy tính!', type: 'success' });
    };
    reader.readAsDataURL(file);
  };

  // Stats updater
  const handleStatChange = (index, field, value) => {
    setFormData((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  // Links updater
  const handleLinkChange = (index, field, value) => {
    setFormData((prev) => {
      const newLinks = [...prev.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, links: newLinks };
    });
  };

  const handleAddLink = () => {
    const newLink = {
      id: `link-${Date.now()}`,
      platform: 'website',
      title: 'Liên kết mới',
      url: 'https://',
      description: 'Mô tả ngắn về kênh',
    };
    setFormData((prev) => ({
      ...prev,
      links: [newLink, ...prev.links],
    }));
    setActiveTab('links');
  };

  const handleRemoveLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  // Save handler
  const handleSave = () => {
    // Clean URLs in links
    const sanitizedLinks = formData.links.map((item) => {
      let url = (item.url || '').trim();
      if (url && !/^https?:\/\//i.test(url) && !url.startsWith('mailto:')) {
        url = `https://${url}`;
      }
      return { ...item, url };
    });

    const finalData = {
      ...formData,
      links: sanitizedLinks,
    };

    onSave(finalData);
    onClose();
  };

  // Handle JSON Import
  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await onImport(file);
      setFormData(importedData);
      showToast?.({ message: 'Đã nhập dữ liệu thành công!', type: 'success' });
    } catch (err) {
      showToast?.({ message: err.message || 'Lỗi khi nhập file JSON', type: 'error' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Chỉnh Sửa Trang Cá Nhân
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Tự động lưu vào trình duyệt của bạn
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-100 dark:border-neutral-800 px-5 pt-2 gap-2 shrink-0 bg-neutral-50/60 dark:bg-neutral-900/60">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center space-x-1.5 pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'personal'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Cá nhân</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center space-x-1.5 pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'stats'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Thành tích</span>
            </button>

            <button
              onClick={() => setActiveTab('links')}
              className={`flex items-center space-x-1.5 pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'links'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Liên kết ({formData.links.length})</span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* TAB 1: THÔNG TIN CÁ NHÂN */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                {/* Avatar Preview & Upload */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    Ảnh đại diện (Avatar)
                  </label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={formData.personal.avatarUrl}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shadow-sm shrink-0"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => avatarFileRef.current?.click()}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh từ máy</span>
                        </button>
                        <input
                          ref={avatarFileRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarFileUpload}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Hoặc dán URL ảnh trực tiếp..."
                        value={formData.personal.avatarUrl}
                        onChange={(e) => handlePersonalChange('avatarUrl', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Name & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      value={formData.personal.fullName}
                      onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                      placeholder="Ví dụ: Alex Nguyễn"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Chức danh / Nghề nghiệp
                    </label>
                    <input
                      type="text"
                      value={formData.personal.title}
                      onChange={(e) => handlePersonalChange('title', e.target.value)}
                      placeholder="Ví dụ: Content Creator & Developer"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    />
                  </div>
                </div>

                {/* BirthDate & ShowAge Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Ngày tháng năm sinh
                    </label>
                    <input
                      type="date"
                      value={formData.personal.birthDate}
                      onChange={(e) => handlePersonalChange('birthDate', e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    />
                  </div>

                  <div className="flex items-center space-x-2 py-2.5">
                    <input
                      type="checkbox"
                      id="showAge"
                      checked={formData.personal.showAge}
                      onChange={(e) => handlePersonalChange('showAge', e.target.checked)}
                      className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-500 border-neutral-300"
                    />
                    <label htmlFor="showAge" className="text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                      Tự động tính & hiển thị số tuổi
                    </label>
                  </div>
                </div>

                {/* Location & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Địa điểm sinh sống
                    </label>
                    <input
                      type="text"
                      value={formData.personal.location}
                      onChange={(e) => handlePersonalChange('location', e.target.value)}
                      placeholder="Ví dụ: Hà Nội, Việt Nam"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Trạng thái hiện tại
                    </label>
                    <input
                      type="text"
                      value={formData.personal.status}
                      onChange={(e) => handlePersonalChange('status', e.target.value)}
                      placeholder="Ví dụ: 🟢 Sẵn sàng hợp tác"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Tiểu sử / Lời giới thiệu ngắn
                  </label>
                  <textarea
                    rows={3}
                    value={formData.personal.bio}
                    onChange={(e) => handlePersonalChange('bio', e.target.value)}
                    placeholder="Viết vài dòng giới thiệu về bản thân, sở thích hoặc định hướng..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: THÀNH TÍCH & CHỈ SỐ */}
            {activeTab === 'stats' && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  4 ô thẻ Bento hiển thị các thành tựu hoặc điểm nhấn nổi bật của bạn:
                </p>
                {formData.stats.map((stat, idx) => (
                  <div
                    key={stat.id || idx}
                    className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-0.5">
                          Số liệu / Giá trị
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                          placeholder="50K+, 3+ Năm..."
                          className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-0.5">
                          Nhãn mô tả
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                          placeholder="Người theo dõi, Dự án..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: LIÊN KẾT & MẠNG XÃ HỘI */}
            {activeTab === 'links' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Danh sách các kênh bạn đang hoạt động
                  </span>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Thêm kênh mới</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.links.map((link, idx) => (
                    <div
                      key={link.id || idx}
                      className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2.5 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <select
                            value={link.platform}
                            onChange={(e) => handleLinkChange(idx, 'platform', e.target.value)}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                          >
                            {AVAILABLE_PLATFORMS.map((p) => (
                              <option key={p.value} value={p.value}>
                                {p.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveLink(idx)}
                          className="p-1 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Xoá kênh này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleLinkChange(idx, 'title', e.target.value)}
                          placeholder="Tên hiển thị (ví dụ: Kênh YouTube)"
                          className="w-full px-2.5 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        />

                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleLinkChange(idx, 'url', e.target.value)}
                          placeholder="Đường dẫn URL (https://...)"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        />
                      </div>

                      <input
                        type="text"
                        value={link.description || ''}
                        onChange={(e) => handleLinkChange(idx, 'description', e.target.value)}
                        placeholder="Mô tả phụ (ví dụ: 10K Sub • Video review hàng tuần)"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="px-5 py-3.5 bg-neutral-50 dark:bg-neutral-900/90 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
            {/* Backup / Restore tools */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={onExport}
                title="Xuất file JSON sao lưu"
                className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 transition-colors text-xs flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Xuất JSON</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Nhập file JSON khôi phục"
                className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 transition-colors text-xs flex items-center space-x-1"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nhập JSON</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportFile}
              />

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn khôi phục về dữ liệu mẫu mặc định?')) {
                    onReset();
                    onClose();
                  }
                }}
                title="Khôi phục mẫu mặc định"
                className="p-2 rounded-xl text-neutral-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Save & Cancel */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-sm transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
