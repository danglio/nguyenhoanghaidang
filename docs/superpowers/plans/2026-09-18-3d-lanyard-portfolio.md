# 3D Lanyard Badge & Cyber-Minimalist Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển đổi giao diện Landing Page của Nguyễn Hoàng Hải Đăng (Lio) sang phong cách Portfolio cao cấp với điểm nhấn Thẻ đeo sự kiện 3D Lanyard ID Card tương tác đung đưa, Hero Section Dark Gradient và hàng nút bấm Pill hiện đại như video TikTok @dpi1n.

**Architecture:** Tạo component `LanyardBadge.jsx` với dây đeo vải dệt, móc kim loại Chrome và thẻ sự kiện Acrylic bóng kính sử dụng CSS 3D + Framer Motion physics; tích hợp vào `HeroLanyard.jsx`; nâng cấp `Navbar.jsx` và cập nhật `App.jsx`.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React.

## Global Constraints

- Thẻ 3D Lanyard: Có dây ruy-băng in `★ LIO CREATIVE STORYTELLER ★`, móc kim loại Chrome, thẻ Acrylic bóng kính hiển thị ảnh Lio, chữ ký Lio, barcode, dải holographic.
- Tương tác: Tự đung đưa (pendulum), nghiêng 3D theo chuột, kéo thả đàn hồi (spring physics).
- Responsive: Desktop nằm bên phải text, Mobile nằm trang trọng chính giữa đung đưa từ trên xuống.
- Nút bấm Hero: Hàng nút dạng viên thuốc (Pill) dẫn đến TikTok Kể Chuyện, YouTube, Hôm Nay Uống Gì Lio, Instagram, Facebook.
- Đồng bộ: Dữ liệu thẻ và hero lấy trực tiếp từ state `profile` để khi người dùng sửa ảnh/thông tin qua Edit Modal thì thẻ 3D cập nhật theo.
- Không phát sinh lỗi cú pháp hay cảnh báo khi chạy `npm run build`.

---

### Task 1: Xây dựng Component Thẻ đeo cổ 3D Lanyard Badge (`src/components/LanyardBadge.jsx`)

**Files:**
- Create: `src/components/LanyardBadge.jsx`
- Test: `test-lanyard-import.mjs`

**Interfaces:**
- Consumes: `{ personal: { avatarUrl, fullName, title, status } }`
- Produces: React component `LanyardBadge` với chuyển động 3D vật lý

- [ ] **Step 1: Viết test kiểm tra cú pháp và import của `LanyardBadge.jsx`**

```javascript
import React from 'react';
import assert from 'node:assert';

// Verification test will verify that LanyardBadge exports a valid React component function
console.log('Testing LanyardBadge export...');
```

- [ ] **Step 2: Tạo component `src/components/LanyardBadge.jsx`**

Bao gồm:
- Anchor pin ở đỉnh.
- Dây đeo Lanyard Strap: hoa văn gân vải, viền phát quang, text xoay dọc `★ LIO CREATIVE STORYTELLER ★`.
- Móc kim loại Chrome xoay 3D và khuyên D-Ring.
- Thẻ ID Card Acrylic trong suốt:
  - Khe khoét lỗ xỏ dây.
  - Header logo `LIO CREATIVE HUB` + status dot xanh.
  - Ảnh chân dung bo góc mềm, viền glow.
  - Chữ ký nghệ thuật viết tay chữ "Lio".
  - Tên Nguyễn Hoàng Hải Đăng, chức danh Storyteller & Digital Creator.
  - Dải phản quang Holographic ribbon + Barcode + ID `#LIO-2026-0802`.
- Hiệu ứng physics:
  - Tự lắc nhẹ như con lắc (pendulum animation).
  - Nghiêng 3D theo chuột (`onMouseMove` tính toán `rotateX`, `rotateY`, `glareX`, `glareY`).
  - Kéo thả tự do bằng Framer Motion (`drag`, `dragConstraints`, `dragElastic`, spring release).

- [ ] **Step 3: Chạy `npm run build` để kiểm tra compile sạch sẽ**

Chạy: `npm run build`
Kỳ vọng: Thành công 100%.

- [ ] **Step 4: Commit**

```bash
git add src/components/LanyardBadge.jsx
git commit -m "feat: create interactive 3D Lanyard ID Badge component"
```

---

### Task 2: Xây dựng Hero Section mới (`src/components/HeroLanyard.jsx`)

**Files:**
- Create: `src/components/HeroLanyard.jsx`

**Interfaces:**
- Consumes: `{ profile, onOpenEdit, showToast }`
- Produces: Hero Section với bố cục 2 cột (Desktop) và căn giữa xếp chồng (Mobile)

- [ ] **Step 1: Tạo component `src/components/HeroLanyard.jsx`**

Bao gồm:
- Kicker Pill: `✨ WELCOME TO MY CREATIVE SPACE`
- Headline cực đại: `Hi, I'm ` + `Nguyễn Hoàng Hải Đăng (Lio)` dạng Neon Gradient text.
- Sub-headline & dynamic roles: `Content Creator & Digital Storyteller`.
- Bio text truyền cảm hứng.
- Hàng nút bấm Pill Buttons:
  - TikTok Kể Chuyện (`https://www.tiktok.com/@liotapkechuyen`) - Gradient Button rực rỡ với TikTok icon.
  - YouTube @lio_tsv (`https://youtube.com/@lio_tsv...`) - Glass pill button.
  - Dự án Hôm Nay Uống Gì Lio (`https://danglio.github.io/homnayuonggilio/`) - Glass pill button với Game icon.
  - Instagram & Facebook pill buttons.
  - Nút Liên hệ / Gửi email hoặc sao chép liên hệ.
- Cột bên phải (Desktop) / Vị trí trên cùng (Mobile): Render component `<LanyardBadge personal={profile.personal} />`.

- [ ] **Step 2: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroLanyard.jsx
git commit -m "feat: build HeroLanyard section with cyber dark aesthetic and pill buttons"
```

---

### Task 3: Nâng cấp Navbar và tích hợp toàn diện vào `src/App.jsx`

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `HeroLanyard`, `Navbar`, `SocialLinks`, `SkillsSection`, `EditModal`
- Produces: Giao diện Portfolio hoàn chỉnh, mượt mà và tương thích toàn diện

- [ ] **Step 1: Cập nhật `src/components/Navbar.jsx`**

- Logo: `Lio.` với dấu chấm Cyan phát sáng.
- Thêm thanh menu điều hướng dạng Dock/Pill mờ ảo ở giữa: `Trang chủ`, `Về Lio`, `Kênh sáng tạo`, `Dự án`.
- Giữ các nút thao tác: Toggle Dark/Light, Nút Chỉnh sửa hồ sơ, Nút Chia sẻ trang.

- [ ] **Step 2: Tích hợp `HeroLanyard` vào `src/App.jsx`**

- Thay thế `LargeProfileCard` & `ProfileOverview` bằng `HeroLanyard` ở vị trí tâm điểm.
- Bên dưới là các section:
  - Danh sách chi tiết 6 kênh liên kết (`SocialLinks`) với thẻ card tương tác cao cấp.
  - Bộ kỹ năng & Thống kê nổi bật.
  - Widget âm nhạc chill vibe.
  - Footer bản quyền và liên hệ.
- Đảm bảo Edit Modal vẫn hoạt động trơn tru, đồng bộ dữ liệu vào `profile` state.

- [ ] **Step 3: Chạy `npm run build` để xác nhận bundle toàn diện**

Chạy: `npm run build`
Kỳ vọng: PASS không lỗi.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/App.jsx
git commit -m "feat: integrate 3D Lanyard hero and modernized pill navbar into main App"
```

---

### Task 4: Kiểm thử toàn diện & Tinh chỉnh Responsive

**Files:**
- Test: Trình duyệt tại `http://localhost:5173/`

- [ ] **Step 1: Kiểm tra build production `npm run build`**
- [ ] **Step 2: Kiểm tra tương tác thẻ 3D: đung đưa tự nhiên, nghiêng theo chuột, kéo thả đàn hồi.**
- [ ] **Step 3: Kiểm tra hiển thị chuẩn trên màn hình máy tính và di động.**
- [ ] **Step 4: Commit hoàn thiện**

```bash
git add -A
git commit -m "chore: finalize 3d lanyard portfolio redesign"
```
