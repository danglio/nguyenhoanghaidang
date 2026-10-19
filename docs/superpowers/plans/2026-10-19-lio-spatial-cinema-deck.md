# Lio Spatial Cinema Exhibition Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng bản Landing Page đột phá "Lio Spatial Cinema // The Digital Exhibition Deck" kết hợp VisionOS Spatial Glass, Raycast Command Palette (Cmd+K), Web Audio Micro-Sounds và 4 Gian Triển Lãm Tương Tác.

**Architecture:** 
- Hook `useSoundFX.js` (Web Audio API procedural sound synthesis).
- Component `CommandPaletteModal.jsx` (Raycast style Cmd+K modal).
- Component `SpatialBackgroundGlow.jsx` (Mouse-tracking ambient spotlight).
- Component `VinylSoundLounge.jsx` (Realistic 3D rotating vinyl Lo-Fi player).
- Layout `SpatialCinemaLayout.jsx` (Core fusion layout integrating the 4 pavilions).
- Cập nhật `LayoutSwitcherBar.jsx` và `App.jsx` để đưa bản demo mới này lên vị trí nổi bật hàng đầu.

**Tech Stack:** React 18, Vite 6, Tailwind CSS 3, Framer Motion 12, Lucide Icons, Web Audio API, Canvas Confetti.

---

### Task 1: Xây Dựng Web Audio Micro-Sound Engine `useSoundFX.js`
**Files:**
- Create: `src/hooks/useSoundFX.js`

**Interfaces:**
- Produces: `useSoundFX()` hook providing `{ isMuted, toggleMute, playHover, playClick, playSuccess, playWhoosh }`.

- [x] **Step 1:** Khởi tạo `AudioContext` và tạo các bộ dao động (OscillatorNode, GainNode) với đường cong âm lượng mượt mà (exponentialRampToValueAtTime) tạo âm thanh click, pop và chime vi mô.
- [x] **Step 2:** Thêm trạng thái `isMuted` lưu trong `localStorage` để người dùng có thể bật/tắt tự do.

---

### Task 2: Xây Dựng Command Palette Raycast Spotlight (`CommandPaletteModal.jsx`)
**Files:**
- Create: `src/components/CommandPaletteModal.jsx`

**Interfaces:**
- Props: `isOpen` (bool), `onClose` (fn), `profile` (object), `onOpenContact` (fn), `showToast` (fn)
- Lắng nghe sự kiện bàn phím toàn cục `Cmd+K` và `Ctrl+K`.

- [x] **Step 1:** Tạo modal giao diện kính không gian VisionOS với thanh input tìm kiếm tức thì.
- [x] **Step 2:** Nhóm kết quả theo `Dự án & Live App`, `Video & Thước phim`, `Kênh Mạng Xã Hội`, và `Tác vụ Nhanh` (Gửi email, Bật/tắt nhạc, Đổi theme).
- [x] **Step 3:** Hỗ trợ điều hướng bằng phím mũi tên `ArrowUp`, `ArrowDown`, `Enter` để chọn nhanh.

---

### Task 3: Xây Dựng Mouse-Tracking Spotlight `SpatialBackgroundGlow.jsx`
**Files:**
- Create: `src/components/SpatialBackgroundGlow.jsx`

**Interfaces:**
- Bắt tọa độ con trỏ chuột `(clientX, clientY)` và render dải ánh sáng mềm mại theo chuột kèm lưới dot matrix nhẹ nhàng.

- [x] **Step 1:** Dùng `framer-motion` `useMotionValue` và `useSpring` để tạo độ trễ vật lý êm ái khi di chuột.
- [x] **Step 2:** Tối ưu hiệu năng trên mobile (tự động chuyển sang quầng sáng breathing tĩnh).

---

### Task 4: Xây Dựng Phòng Nghe Đĩa Than 3D `VinylSoundLounge.jsx`
**Files:**
- Create: `src/components/VinylSoundLounge.jsx`

**Interfaces:**
- Tái sử dụng các track có sẵn: `the_dashboard_vow.mp3`, `the_hour_before_waking.mp3`, `worth_anew.mp3`.
- Produces: Máy đĩa than 3D xoay thật sự khi phát nhạc, cần kim máy hát di chuyển, bộ điều khiển Play/Pause/Next, sóng nhạc neon.

- [x] **Step 1:** Xây dựng đĩa than Vinyl với các rãnh đĩa đồng tâm, nhãn tròn bìa album xoay 360 độ bằng Framer Motion.
- [x] **Step 2:** Tích hợp bộ phát audio thật với thanh thời lượng và chuyển bài mượt mà.

---

### Task 5: Xây Dựng Bố Cục Hoàn Chỉnh `SpatialCinemaLayout.jsx`
**Files:**
- Create: `src/components/layouts/SpatialCinemaLayout.jsx`

**Interfaces:**
- Kết hợp Hero Cinematic với typography lớn, Spatial Portrait Lens, và 4 Gian Triển Lãm Tương Tác:
  - Gian 1: Cinema Reel Spotlight
  - Gian 2: Interactive Web Lab (Hôm Nay Uống Gì Live Demo + Zenly Radar)
  - Gian 3: Vinyl Sound Lounge
  - Gian 4: Proof of Impact & 3 Trụ Cột Kỹ Năng

- [x] **Step 1:** Tạo bố cục triển lãm nghệ thuật số với các khối kính không gian bo tròn góc lớn (rounded-3xl).
- [x] **Step 2:** Gắn kết các tương tác âm thanh vi mô `playHover`, `playClick` từ `useSoundFX`.

---

### Task 6: Tích Hợp Vào `Navbar.jsx`, `LayoutSwitcherBar.jsx` và `App.jsx`
**Files:**
- Modify: `src/components/Navbar.jsx` (Thêm nút Kính lúp Cmd+K và nút Bật/Tắt âm thanh)
- Modify: `src/components/layouts/LayoutSwitcherBar.jsx` (Thêm lựa chọn `spatial`: 🌌 Spatial Cinema)
- Modify: `src/App.jsx` (Tích hợp `CommandPaletteModal`, `SpatialCinemaLayout`, và set làm layout mặc định mới)

- [x] **Step 1:** Cập nhật `LAYOUT_OPTIONS` trong `LayoutSwitcherBar.jsx` để đưa `spatial` lên vị trí đắt giá nhất.
- [x] **Step 2:** Render `CommandPaletteModal` và `SpatialCinemaLayout` trong `App.jsx`.
- [x] **Step 3:** Kiểm tra build bằng `npm run build` và kiểm thử trực tiếp trên trình duyệt.
