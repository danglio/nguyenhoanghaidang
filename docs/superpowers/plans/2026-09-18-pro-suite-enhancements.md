# Nâng Cấp Toàn Diện Landing Page Pro Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp Landing Page của Nguyễn Hoàng Hải Đăng (Lio) lên chuẩn quốc tế cao cấp nhất: Thẻ 3D Lanyard lật 2 mặt (QR Code & Gold Chip), Khối trưng bày Dự án siêu phẩm (Web App Hôm Nay Uống Gì Lio & Series Podcast), Form liên hệ hợp tác chuyên nghiệp và Widget âm nhạc chill thật với sóng âm thanh soundwave.

**Architecture:** Mở rộng `LanyardBadge.jsx` với 3D preserve-3d flip; tạo `ProjectsShowcase.jsx` cho các sản phẩm sáng tạo; xây dựng `ContactModal.jsx` và `SoundtrackPlayer.jsx`; kết nối toàn bộ vào `Navbar.jsx` và `App.jsx`.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, Web Audio API, Lucide React, Canvas Confetti.

## Global Constraints

- Thẻ 3D Lanyard: Có nút lật 3D (`rotateY: 180deg`), mặt sau có QR Code SVG quét được thật ra trang cá nhân, chip vàng thông minh, dải từ tính và mã bảo mật `#LIO-PASSPORT-2026`.
- Projects Showcase: Trưng bày nổi bật Web App "Hôm Nay Uống Gì Lio" (mở hòm CS2 & thẻ FIFA), Series Podcast TikTok và Kênh YouTube.
- Contact Modal: Form liên hệ hợp tác chuyên nghiệp (booking quảng cáo, sản xuất video, dự án công nghệ) với tính năng gửi email `mailto:` và sao chép nội dung.
- Soundtrack Player: Phát nhạc lofi/chill nhẹ nhàng bằng Web Audio API synthesizer với sóng âm thanh nhảy múa thật.
- Không phát sinh lỗi cú pháp hay cảnh báo khi chạy `npm run build`.

---

### Task 1: Nâng cấp Thẻ 3D Lanyard với tính năng Lật 2 Mặt 3D (Flip Card) (`src/components/LanyardBadge.jsx`)

**Files:**
- Modify: `src/components/LanyardBadge.jsx`

**Interfaces:**
- Consumes: `{ personal }`
- Produces: `LanyardBadge` với trạng thái `isFlipped`, nút lật 360°, mặt trước Acrylic và mặt sau Digital Passport (QR Code + Gold Chip).

- [ ] **Step 1: Cập nhật `src/components/LanyardBadge.jsx`**

Bao gồm:
- Thêm state `isFlipped` (mặc định `false`).
- Nút xoay lật 3D ở góc trên thẻ (`Flip Card` icon) với tooltip rõ ràng.
- Bọc thẻ trong container `transform-style: preserve-3d`.
- Mặt trước (`backface-visibility: hidden`): Ảnh chân dung Lio, chữ ký viết tay Lio, dải holographic, barcode.
- Mặt sau (`backface-visibility: hidden, transform: rotateY(180deg)`):
  - Khung viền kim loại Carbon & dải từ tính Magnetic Stripe.
  - Chip điện tử mạ vàng (Gold Smart Chip) & vân mạch NFC.
  - Mã QR Code SVG quét thật (mở link portfolio).
  - Tên Nguyễn Hoàng Hải Đăng, chức danh Storyteller & Digital Creator.
  - Mã định danh `#LIO-PASSPORT-2026`, email `contact@danglio.com`.

- [ ] **Step 2: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/LanyardBadge.jsx
git commit -m "feat: upgrade 3D Lanyard badge with dual-sided 3D flip, QR code, and smart chip"
```

---

### Task 2: Xây dựng Khối Trình Diễn Dự Án Tiêu Biểu (`src/components/ProjectsShowcase.jsx`)

**Files:**
- Create: `src/components/ProjectsShowcase.jsx`

**Interfaces:**
- Consumes: `{ showToast }`
- Produces: React component `ProjectsShowcase` hiển thị danh mục dự án và sản phẩm sáng tạo

- [ ] **Step 1: Tạo `src/components/ProjectsShowcase.jsx`**

Bao gồm:
- Tiêu đề section: `Dự Án & Sản Phẩm Sáng Tạo` kèm kicker `PORTFOLIO HIGHLIGHTS`.
- **Card 1 (Hero Feature Card):** Web App **"Hôm Nay Uống Gì Lio"** (`https://danglio.github.io/homnayuonggilio/`)
  - Mockup hình ảnh/giao diện mở hòm CS2 & thẻ FIFA Online chọn đồ uống.
  - Tag công nghệ: `⚡ Mini Web Game`, `🎲 CS2 & FIFA Case Opening`, `🎨 Vite & Tailwind`.
  - Nút: `Trải nghiệm ngay ↗` (mở link) và `Sao chép link dự án`.
- **Card 2:** Series Podcast **"Lio Tập Kể Chuyện"** (`https://www.tiktok.com/@liotapkechuyen`)
  - Video storytelling & podcast cuộc sống trên TikTok.
  - Nút `Xem trên TikTok ↗`.
- **Card 3:** Kênh Sáng Tạo **YouTube @lio_tsv** (`https://youtube.com/@lio_tsv?si=FBUf3BvbKV8h10jZ`)
  - Vlog đời sống, video dài tập và hậu trường sáng tạo nội dung số.
  - Nút `Khám phá YouTube ↗`.

- [ ] **Step 2: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectsShowcase.jsx
git commit -m "feat: build ProjectsShowcase component featuring Hom Nay Uong Gi Lio and video series"
```

---

### Task 3: Xây dựng Form Liên Hệ Hợp Tác & Widget Âm Nhạc Chill Thật

**Files:**
- Create: `src/components/ContactModal.jsx`
- Create: `src/components/SoundtrackPlayer.jsx`

**Interfaces:**
- `ContactModal`: `{ isOpen, onClose, showToast }`
- `SoundtrackPlayer`: `{}` (Web Audio API Synthesizer)

- [ ] **Step 1: Tạo `src/components/ContactModal.jsx`**

Bao gồm:
- Modal popup hiệu ứng kính mờ Glassmorphism.
- Form nhập: Tên đối tác, Email liên hệ, Mục đích hợp tác (Pills: *Tài trợ / Booking video*, *Sản xuất nội dung*, *Dự án web*, *Giao lưu kết nối*), Lời nhắn.
- Nút "Gửi đề xuất hợp tác": Tự động mở `mailto:contact@danglio.com` và sao chép nội dung vào Clipboard kèm pháo hoa chúc mừng (`confetti`).

- [ ] **Step 2: Tạo `src/components/SoundtrackPlayer.jsx`**

Bao gồm:
- Tạo âm thanh ambient lofi êm dịu thông qua Web Audio API Synthesizer (nhẹ nhàng, không tốn băng thông, không vi phạm bản quyền).
- Nút Play/Pause có hiệu ứng phát quang.
- Bộ 4 cột sóng âm thanh (Soundwave equalizer bars) nhấp nhô theo điệu nhạc.
- Nút điều chỉnh âm lượng (Mute / Unmute / Volume level).

- [ ] **Step 3: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactModal.jsx src/components/SoundtrackPlayer.jsx
git commit -m "feat: add professional ContactModal and interactive Web Audio SoundtrackPlayer"
```

---

### Task 4: Nâng cấp Navbar và Tích hợp toàn diện vào `src/App.jsx`

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Tích hợp: `HeroLanyard`, `ProjectsShowcase`, `SocialLinks`, `SkillsSection`, `ContactModal`, `SoundtrackPlayer`.

- [ ] **Step 1: Cập nhật `src/components/Navbar.jsx`**

- Thêm tab `Dự án` (`#projects`) vào thanh điều hướng Dock ở giữa.
- Thêm nút `Hợp tác` (với icon Send) mở `ContactModal`.

- [ ] **Step 2: Cập nhật `src/App.jsx`**

- Import và đặt `ProjectsShowcase` ngay sau `HeroLanyard`.
- Thêm state `isContactOpen` và nhúng `ContactModal`.
- Nhúng `SoundtrackPlayer` ở góc giao diện tinh tế.
- Đảm bảo tất cả các nút liên hệ và chỉnh sửa hồ sơ hoạt động trơn tru.

- [ ] **Step 3: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/App.jsx
git commit -m "feat: integrate full pro suite with ProjectsShowcase, ContactModal, and SoundtrackPlayer"
```

---

### Task 5: Kiểm thử toàn diện & Đánh giá Code Reviewer

- [ ] **Step 1: Chạy `npm run build` xác nhận bundle production hoàn hảo.**
- [ ] **Step 2: Điều phối Final Code Reviewer subagent đánh giá chất lượng.**
- [ ] **Step 3: Dọn dẹp workspace và báo cáo hoàn thành.**
