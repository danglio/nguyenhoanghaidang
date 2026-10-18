# 7 Layout Demos & Interactive Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng bộ 7 bản demo bố cục nổi tiếng nhất và thanh điều khiển chuyển đổi trực tiếp (Interactive Layout Switcher Dock) để người dùng bấm thử nghiệm trực tiếp trên trình duyệt (`localhost:5173`).

**Architecture:** Tạo thư mục `src/components/layouts/` gồm component điều khiển `LayoutSwitcherBar.jsx` và 7 layout components (`ClassicLayout`, `BentoLayout`, `SplitLayout`, `TabsLayout`, `MinimalBioLayout`, `MacOSLayout`, `EditorialLayout`). Quản lý state `activeLayout` tại `App.jsx` và lưu vào `localStorage`. Tất cả các layout tái sử dụng toàn bộ dữ liệu thật và component hiện hữu mà không làm hỏng code cũ.

**Tech Stack:** React 18, Vite 6, Tailwind CSS 3, Framer Motion 12, Lucide React icons, Canvas Confetti.

## Global Constraints
- Không làm xáo trộn hoặc xóa mất code gốc; chế độ `classic` luôn là điểm tựa an toàn.
- Hỗ trợ đầy đủ Dark Mode & Light Mode (tương thích các class `dark:` của Tailwind).
- Giữ nguyên toàn bộ logic tương tác (3D Lanyard, Video links, Spotify audio, Contact Modal, Toast).
- Hiệu ứng chuyển layout êm ái qua Framer Motion.

---

### Task 1: Xây dựng Component Thanh Điều Khiển `LayoutSwitcherBar.jsx`
**Files:**
- Create: `src/components/layouts/LayoutSwitcherBar.jsx`

**Interfaces:**
- Props: `activeLayout` (string), `onSelectLayout` (fn), `layouts` (array of objects)
- Produces: Floating dock bar at bottom with 7 items, active highlight, minimize/expand toggle.

- [ ] **Step 1:** Tạo file `src/components/layouts/LayoutSwitcherBar.jsx` với giao diện Glassmorphism, 7 nút chọn kèm icon Lucide (Layers, LayoutGrid, Columns, Bookmark, Smartphone, Monitor, BookOpen), tooltip, badge hiển thị số thứ tự và nút toggle thu gọn.
- [ ] **Step 2:** Kiểm tra render độc lập và export component.

---

### Task 2: Đóng gói Bố Cục Gốc Thành `ClassicLayout.jsx`
**Files:**
- Create: `src/components/layouts/ClassicLayout.jsx`

**Interfaces:**
- Consumes: `profile`, `onOpenContact`, `setToast`
- Produces: `ClassicLayout` component tái hiện chính xác 100% nội dung và luồng cuộn hiện tại của `App.jsx`.

- [ ] **Step 1:** Trích xuất các section hiện tại trong `App.jsx` (#home, #projects, #socials, #skills) vào `ClassicLayout.jsx`.
- [ ] **Step 2:** Đảm bảo tất cả props truyền vào các component con (`HeroLanyard`, `ProjectsShowcase`, `SocialLinks`, `AchievementsStats`, `SkillsSection`) khớp hoàn toàn.

---

### Task 3: Xây dựng Bố Cục `BentoLayout.jsx` (Linear & Apple Style)
**Files:**
- Create: `src/components/layouts/BentoLayout.jsx`

**Interfaces:**
- Consumes: `profile`, `onOpenContact`, `setToast`
- Produces: Giao diện Bento Grid 2.0 dạng module nhiều cột, thẻ 3D Lanyard kết hợp cùng mini player, stats, projects và socials dạng widget.

- [ ] **Step 1:** Tạo cấu trúc CSS Grid responsive (`grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`).
- [ ] **Step 2:** Đặt Thẻ 3D Lanyard vào ô lớn (col-span-2), widget âm nhạc và ô thống kê 55K views vào các ô vệ tinh.
- [ ] **Step 3:** Đặt ProjectsShowcase và SocialLinks vào các hàng tiếp theo có bo góc viền kính đồng bộ.

---

### Task 4: Xây dựng Bố Cục `SplitLayout.jsx` (Brittany Chiang & Vercel Style)
**Files:**
- Create: `src/components/layouts/SplitLayout.jsx`

**Interfaces:**
- Consumes: `profile`, `onOpenContact`, `setToast`
- Produces: Bố cục 2 cột (Cột trái ~38% sticky cố định Profile & 3D Lanyard, cột phải ~62% cuộn độc lập).

- [ ] **Step 1:** Tạo cấu trúc 2 cột (`lg:flex lg:gap-8 xl:gap-12`).
- [ ] **Step 2:** Cột trái `lg:w-[38%] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:flex lg:flex-col lg:justify-between` chứa thẻ 3D Lanyard, Bio, Menu Anchor và Quick Socials.
- [ ] **Step 3:** Cột phải `lg:w-[62%] space-y-16` cuộn mượt các Case studies Dự án, Thành tích và Kỹ năng.

---

### Task 5: Xây dựng Bố Cục `TabsLayout.jsx` (iOS 18 & Raycast Segmented Tabs)
**Files:**
- Create: `src/components/layouts/TabsLayout.jsx`

**Interfaces:**
- Consumes: `profile`, `onOpenContact`, `setToast`
- Produces: Hero Lanyard phía trên và thanh Segmented Tabs tròn viền kính ở giữa với 4 tab: `Tất cả`, `Dự án`, `Kênh MXH`, `Thành tích`.

- [ ] **Step 1:** Tạo state `currentTab` (`all`, `projects`, `socials`, `stats`) và thanh tab selector với hiệu ứng sliding pill của Framer Motion.
- [ ] **Step 2:** Dùng `AnimatePresence` để chuyển đổi nội dung mượt mà khi người dùng bấm qua lại giữa các tab.

---

### Task 6: Xây dựng Bố Cục `MinimalBioLayout.jsx` (Readcv & Bento.me Minimalist)
**Files:**
- Create: `src/components/layouts/MinimalBioLayout.jsx`

**Interfaces:**
- Consumes: `profile`, `onOpenContact`, `setToast`
- Produces: Danh thiếp số tinh gọn căn giữa màn hình (max-w-xl), tối ưu cho mobile-first.

- [ ] **Step 1:** Cấu trúc container `max-w-xl mx-auto space-y-4 px-3`.
- [ ] **Step 2:** Thẻ 3D Lanyard dạng compact, phía dưới là các thẻ liên kết kính mờ bo tròn (Link cards) có icon động, micro-badge và nút tương tác nhanh.

---

### Task 7: Xây dựng Bố Cục `MacOSLayout.jsx` (Apple Desktop & Window Style)
**Files:**
- Create: `src/components/layouts/MacOSLayout.jsx`

**Interfaces:**
- Consumes: `profile`, `onOpenContact`, `setToast`
- Produces: Giao diện giả lập máy Mac với status bar trên cùng, cửa sổ chính có 3 nút Đỏ/Vàng/Xanh và app dock dưới đáy.

- [ ] **Step 1:** Tạo thanh macOS Top Bar (` LioOS • Hồ sơ • Dự án • 23:45 • Pin 100%`).
- [ ] **Step 2:** Cửa sổ Mac Window bo tròn chứa nội dung với thanh tiêu đề cửa sổ (Traffic light buttons).
- [ ] **Step 3:** Thanh Dock ứng dụng nổi ở dưới đáy màn hình với các icon ứng dụng có hiệu ứng hover zoom (macOS magnification).

---

### Task 8: Xây dựng Bố Cục `EditorialLayout.jsx` (Awwwards Magazine & Storyteller)
**Files:**
- Create: `src/components/layouts/EditorialLayout.jsx`

**Interfaces:**
- Consumes: `profile`, `onOpenContact`, `setToast`
- Produces: Bố cục phong cách tạp chí nghệ thuật với Typography lớn và chia thành từng chương kể chuyện (Chapters).

- [ ] **Step 1:** Tạo Hero Section ấn tượng với trích dẫn kể chuyện và thẻ 3D Lanyard cỡ lớn.
- [ ] **Step 2:** Thiết kế Chương 01 (Bản sắc & Hành trình), Chương 02 (Sáng tạo nội dung 55K+ views), Chương 03 (Thử nghiệm công nghệ & Dự án) theo phong cách báo chí hiện đại.

---

### Task 9: Tích Hợp Vào `src/App.jsx`
**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Quản lý `activeLayout` bằng `useState`, tự động đọc/ghi `localStorage.getItem('lio_active_layout_preview')`.
- Render `LayoutSwitcherBar` ở mép dưới.
- Bao bọc layout hiển thị trong `<AnimatePresence mode="wait">` của Framer Motion.

- [ ] **Step 1:** Import `LayoutSwitcherBar` và 7 layouts components.
- [ ] **Step 2:** Thay thế khối `main` tĩnh bằng bộ switch động theo `activeLayout`.
- [ ] **Step 3:** Thêm thông báo Toast nhỏ khi người dùng chuyển layout thành công.

---

### Task 10: Kiểm Thử Build & Trải Nghiệm Thực Tế
**Files:**
- Test runtime: `npm run build`

- [ ] **Step 1:** Chạy `npm run build` đảm bảo không có bất kỳ lỗi cú pháp hoặc import nào.
- [ ] **Step 2:** Kiểm tra dev server tại `http://localhost:5173/` hoạt động ổn định và thông báo cho người dùng trải nghiệm.
