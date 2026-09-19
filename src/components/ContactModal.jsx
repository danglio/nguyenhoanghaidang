import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Send,
  Sparkles,
  Copy,
  Check,
  Building,
  User,
  MessageSquare,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const COLLABORATION_PURPOSES = [
  { id: 'booking', label: '📢 Booking & Tài trợ', desc: 'Quảng bá nhãn hàng, tài trợ video & chiến dịch' },
  { id: 'video', label: '🎬 Sản xuất Video', desc: 'Hợp tác sáng tạo nội dung số, podcast, viral video' },
  { id: 'webapp', label: '💻 Dự án Web App', desc: 'Phát triển mini app, landing page, interactive web' },
  { id: 'connect', label: '☕ Giao lưu', desc: 'Kết nối mạng lưới sáng tạo, chia sẻ kinh nghiệm' },
];

export default function ContactModal({ isOpen, onClose, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: COLLABORATION_PURPOSES[0].label,
    message: '',
  });

  const [copiedKey, setCopiedKey] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyEmail = async (email, key) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      }
      setCopiedKey(key);
      showToast?.({
        message: `Đã sao chép email ${email} vào clipboard!`,
        type: 'success',
      });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      showToast?.({
        message: 'Không thể sao chép email, vui lòng copy thủ công!',
        type: 'error',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      showToast?.({
        message: 'Vui lòng điền đầy đủ họ tên, email và nội dung tin nhắn!',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    // 1. Phóng pháo hoa ăn mừng (Confetti celebration)
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#ec4899', '#3b82f6', '#10b981'],
      });
    } catch (err) {
      console.warn('Confetti error:', err);
    }

    // 2. Định dạng nội dung tin nhắn để lưu vào Clipboard
    const proposalClipboard = `[ĐỀ XUẤT HỢP TÁC VỚI NGUYỄN HOÀNG HẢI ĐĂNG (LIO)]
=============================================
• Đối tác / Họ tên: ${trimmedName}
• Email liên hệ: ${trimmedEmail}
• Loại hình hợp tác: ${formData.purpose}
=============================================
Nội dung chi tiết:
${trimmedMessage}

---
Gửi từ Portfolio Landing Page • contact@danglio.com`;

    // 3. Sao chép nội dung vào Clipboard
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(proposalClipboard);
      }
    } catch (err) {
      console.warn('Clipboard write error:', err);
    }

    // 4. Mở mailto link với tiêu đề và nội dung được mã hoá an toàn
    const mailSubject = `[Hợp Tác] ${formData.purpose} - Từ ${trimmedName}`;
    const mailBody = `Kính gửi Lio (Nguyễn Hoàng Hải Đăng),

Tôi là: ${trimmedName}
Email liên hệ: ${trimmedEmail}
Mục đích hợp tác: ${formData.purpose}

Nội dung đề xuất:
${trimmedMessage}

---
(Tin nhắn này đã được tự động lưu vào Clipboard để bạn tiện dán lại nếu cần)`;

    const mailtoLink = `mailto:nguyenhoanghaidang.lio@gmail.com?cc=contact@danglio.com&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    // Kích hoạt mở email client
    try {
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = mailtoLink;
    }

    // 5. Thông báo Toast thành công
    showToast?.({
      message: 'Đã sao chép nội dung và mở ứng dụng Email gửi tới Lio!',
      type: 'success',
    });

    // 6. Reset form và đóng modal
    setFormData({
      name: '',
      email: '',
      purpose: COLLABORATION_PURPOSES[0].label,
      message: '',
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="relative w-full max-w-xl my-auto rounded-3xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-200/90 dark:border-neutral-800/90 shadow-2xl overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            {/* Top decorative gradient line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800/80 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Sẵn sàng nhận dự án mới • 2026</span>
                </div>
                <h2
                  id="contact-modal-title"
                  className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2"
                >
                  <span>Liên Hệ Hợp Tác</span>
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  Gửi ý tưởng dự án, booking tài trợ, hoặc lời mời sáng tạo trực tiếp đến Lio.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng cửa sổ"
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 sm:space-y-5">
              {/* Tên & Email (2 columns on sm) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Họ và tên / Nhãn hàng <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="VD: Nguyễn Văn A / VNG Games"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/70 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email liên hệ <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="contact@company.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/70 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Loại hình hợp tác (Pills selector) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Loại hình hợp tác mong muốn <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COLLABORATION_PURPOSES.map((item) => {
                    const isSelected = formData.purpose === item.label;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleChange('purpose', item.label)}
                        className={`text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-sm ring-1 ring-indigo-500/20'
                            : 'border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-800/30 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        <span className="text-sm shrink-0 mt-0.5">{item.label.split(' ')[0]}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold leading-snug">
                            {item.label.replace(/^[\S]+ /, '')}
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight truncate mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lời nhắn chi tiết */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Nội dung đề xuất chi tiết <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Mô tả tóm tắt về dự án, mục tiêu, ngân sách dự kiến, deadline hoặc thời gian bạn muốn trao đổi..."
                    className="w-full p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/70 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Quick direct email copy footer pill */}
              <div className="space-y-2 p-3 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/50 text-xs">
                {/* Email 1: Gmail Cá Nhân */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>
                      Gmail trực tiếp: <strong className="font-mono text-neutral-900 dark:text-white">nguyenhoanghaidang.lio@gmail.com</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('nguyenhoanghaidang.lio@gmail.com', 'gmail')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 border border-neutral-300/80 dark:border-neutral-600 transition-colors font-medium text-[11px] shrink-0"
                  >
                    {copiedKey === 'gmail' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Email 2: Booking / Hợp tác */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-neutral-200/50 dark:border-neutral-700/40">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>
                      Booking & Hợp tác: <strong className="font-mono text-neutral-900 dark:text-white">contact@danglio.com</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('contact@danglio.com', 'work')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 border border-neutral-300/80 dark:border-neutral-600 transition-colors font-medium text-[11px] shrink-0"
                  >
                    {copiedKey === 'work' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit and Cancel Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Đóng
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Đề Xuất Hợp Tác</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
