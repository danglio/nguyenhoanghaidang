# Personal Bio & Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng landing page giới thiệu bản thân cá nhân chuẩn phong cách Apple/Notion với hiệu ứng chuyển động mượt mà (Framer Motion), giao diện sang trọng (Bento stats, Social links), và chế độ Modal chỉnh sửa lưu trực tiếp vào LocalStorage kèm Xuất/Nhập JSON.

**Architecture:** Ứng dụng Single Page Application (SPA) xây dựng trên React + Vite, chia nhỏ các thành phần giao diện (Navbar, AmbientBackground, HeroProfile, AchievementsStats, SocialLinks, EditModal, Toast). Dữ liệu cá nhân được trừu tượng hóa qua custom hook `useProfileData` lưu trữ trong `localStorage` và đồng bộ tức thì.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Canvas Confetti.

## Global Constraints

- Không sử dụng backend hay database bên ngoài; toàn bộ trạng thái lưu trong `localStorage` với key `personal_bio_profile_v1`.
- Hỗ trợ đầy đủ Dark Mode & Light Mode với chuyển đổi mượt mà.
- Hỗ trợ tải ảnh từ máy tính (chuyển sang base64) hoặc nhập link ảnh URL trực tiếp.
- Đảm bảo responsive tối ưu trên cả thiết bị di động (mobile) và máy tính (desktop).
- Tự động tính số tuổi dựa trên ngày sinh `birthDate` (định dạng `YYYY-MM-DD`).
- Mọi liên kết ngoài phải có `rel="noopener noreferrer"` và `target="_blank"`.

---

### Task 1: Khởi tạo dự án Vite + React + Tailwind CSS & Cài đặt Thư viện

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/index.css`

**Interfaces:**
- Produces: Môi trường chạy Vite với Tailwind CSS và các dependency `lucide-react`, `framer-motion`, `canvas-confetti`.

- [ ] **Step 1: Khởi tạo package.json và cài đặt dependencies**
Chạy lệnh khởi tạo project và cài đặt:
`npm init -y`
`npm install react react-dom lucide-react framer-motion canvas-confetti`
`npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer`

- [ ] **Step 2: Cấu hình Tailwind CSS và PostCSS**
Tạo file `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Cấu hình Vite, index.html và src/index.css**
Tạo `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Tạo `src/index.css` với Tailwind directives và hiệu ứng kính/mờ:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .dark .glass {
    background: rgba(18, 18, 22, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
```

- [ ] **Step 4: Kiểm tra build cơ bản**
Run: `npm run build` hoặc `npx vite build`
Expected: Build thành công tạo thư mục `dist/`.

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "chore: scaffold vite react project with tailwind and framer motion"
```

---

### Task 2: Cấu trúc Dữ liệu Mẫu (Default Data) & Custom Hook `useProfileData`

**Files:**
- Create: `src/data/defaultProfile.js`
- Create: `src/hooks/useProfileData.js`

**Interfaces:**
- Produces: `useProfileData()` trả về:
  - `profile`: Dữ liệu hồ sơ hiện tại (`personal`, `stats`, `links`).
  - `updateProfile(newProfile)`: Cập nhật và lưu vào LocalStorage.
  - `resetProfile()`: Khôi phục dữ liệu về mặc định.
  - `exportProfileJSON()`: Tải file JSON về máy tính.
  - `importProfileJSON(file)`: Đọc và xác thực file JSON tải lên.
  - `calculateAge(birthDate)`: Tính số tuổi chính xác từ ngày sinh.

- [ ] **Step 1: Tạo file `src/data/defaultProfile.js`**
Chứa thông tin mẫu chuẩn chỉn, chuyên nghiệp với avatar đẹp từ Unsplash, họ tên, danh xưng, ngày sinh, các chỉ số thành tích và các link mạng xã hội (YouTube, TikTok, Facebook, GitHub, X).

- [ ] **Step 2: Tạo custom hook `src/hooks/useProfileData.js`**
Quản lý state với `localStorage.getItem('personal_bio_profile_v1')`. Tích hợp logic:
- `calculateAge(birthDate)`:
```javascript
export function calculateAge(birthDateString) {
  if (!birthDateString) return null;
  const birth = new Date(birthDateString);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
```
- Logic export và import JSON an toàn với `JSON.parse` có try/catch.

- [ ] **Step 3: Kiểm tra thử nghiệm tính năng hook qua test/demo**
- [ ] **Step 4: Commit**
```bash
git add src/data/defaultProfile.js src/hooks/useProfileData.js
git commit -m "feat: add default profile data and useProfileData hook"
```

---

### Task 3: Hiệu ứng Nền (AmbientBackground) & Thanh Điều Hướng (Navbar)

**Files:**
- Create: `src/components/AmbientBackground.jsx`
- Create: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `theme` ('light' | 'dark'), `toggleTheme()`, `onOpenEdit()`, `onShare()`
- Produces:
  - `AmbientBackground`: Gradient mesh phát sáng mờ ảo chuyển động nhẹ phía sau.
  - `Navbar`: Header cố định hoặc sticky, hiển thị logo/monogram, nút Dark/Light mode toggle, nút Share (sao chép link), và nút "✏️ Chỉnh sửa hồ sơ".

- [ ] **Step 1: Tạo `src/components/AmbientBackground.jsx`**
Dùng Framer Motion tạo 2-3 quả cầu gradient mờ (`blur-3xl`) nổi chuyển động chậm rãi theo chu kỳ (loop infinite floating).
- [ ] **Step 2: Tạo `src/components/Navbar.jsx`**
Thiết kế thanh Header phong cách Apple: nền kính mờ (`glass`), viền dưới mảnh (`border-neutral-200/80 dark:border-neutral-800/80`), nút pill tròn mềm mại, icon Sun/Moon, Share2, Edit3 từ Lucide.
- [ ] **Step 3: Commit**
```bash
git add src/components/AmbientBackground.jsx src/components/Navbar.jsx
git commit -m "feat: add ambient glowing background and navbar with theme toggle"
```

---

### Task 4: Khu Vực Thông Tin Cá Nhân (HeroProfile)

**Files:**
- Create: `src/components/HeroProfile.jsx`

**Interfaces:**
- Consumes: `personal` object (`avatarUrl`, `fullName`, `title`, `birthDate`, `showAge`, `location`, `status`, `bio`).

- [ ] **Step 1: Xây dựng HeroProfile với Framer Motion**
- Ảnh đại diện tròn `w-24 h-24 sm:w-28 sm:h-28`, viền trắng/xám cao cấp, hiệu ứng 3D tilt nhẹ khi hover.
- Badge trạng thái hoạt động: Chấm xanh nhấp nháy (`animate-ping`) và text trạng thái (ví dụ: *🟢 Open for work*).
- Họ tên dạng Typography Apple: `text-3xl sm:text-4xl font-extrabold tracking-tight`.
- Badge ngày sinh & tuổi: Định dạng ngày sinh đẹp mắt (`dd/mm/yyyy`) kèm số tuổi tính tự động nếu `showAge` bật.
- Đoạn văn bản Bio: Dòng chữ tinh tế, font dễ đọc, độ tương phản dịu mắt.
- [ ] **Step 2: Commit**
```bash
git add src/components/HeroProfile.jsx
git commit -m "feat: add hero profile component with avatar tilt and bio"
```

---

### Task 5: Khối Thành Tích & Chỉ Số Ấn Tượng (AchievementsStats)

**Files:**
- Create: `src/components/AchievementsStats.jsx`

**Interfaces:**
- Consumes: `stats` array (danh sách `{ id, value, label, icon }`).

- [ ] **Step 1: Xây dựng Bento Grid Stats**
Lưới 2x2 hoặc 4 cột linh hoạt theo màn hình (`grid grid-cols-2 sm:grid-cols-4 gap-3`).
Mỗi thẻ là một chiếc card phong cách Apple:
- Icon nhỏ gọn (Users, Sparkles, Flame, Heart...).
- Con số nổi bật: `text-xl sm:text-2xl font-bold`.
- Nhãn mô tả: `text-xs text-neutral-500 dark:text-neutral-400 font-medium`.
- Hiệu ứng hover: Nhẹ nhàng nổi lên, viền sáng bóng.
- [ ] **Step 2: Commit**
```bash
git add src/components/AchievementsStats.jsx
git commit -m "feat: add achievements and stats bento grid"
```

---

### Task 6: Danh Sách Thẻ Mạng Xã Hội & Kênh Hoạt Động (SocialLinks)

**Files:**
- Create: `src/components/SocialLinks.jsx`

**Interfaces:**
- Consumes: `links` array (`id`, `platform`, `title`, `url`, `description`).

- [ ] **Step 1: Xây dựng danh sách liên kết với icon chuẩn**
Tự động map platform với icon Lucide tương ứng (Youtube, Video, Facebook, Github, Twitter/X, Globe, Mail, MessageCircle...).
- [ ] **Step 2: Hiệu ứng tương tác cao cấp**
- Mỗi thẻ là link có `target="_blank" rel="noopener noreferrer"`.
- Hiệu ứng hover: Thẻ trượt sang phải 4px hoặc nâng lên 2px (`hover:-translate-y-0.5`), viền sáng màu thương hiệu hoặc viền trắng mờ, icon mũi tên `ArrowUpRight` xoay nhẹ.
- [ ] **Step 3: Commit**
```bash
git add src/components/SocialLinks.jsx
git commit -m "feat: add interactive social links cards with motion"
```

---

### Task 7: Modal Chỉnh Sửa Hồ Sơ Toàn Diện (EditModal) & Thông Báo (Toast)

**Files:**
- Create: `src/components/EditModal.jsx`
- Create: `src/components/Toast.jsx`

**Interfaces:**
- Consumes:
  - `isOpen`: boolean
  - `onClose`: () => void
  - `profile`: dữ liệu hiện tại
  - `onSave`: (updatedProfile) => void
  - `onReset`: () => void
  - `onExport`: () => void
  - `onImport`: (file) => void
- Produces: Modal popup mượt mà, chia 3 tabs:
  1. Cá nhân (Avatar URL/Upload, Tên, Title, Ngày sinh, ShowAge, Địa điểm, Status, Bio).
  2. Thành tích (Sửa các giá trị Stats).
  3. Liên kết (Thêm link mới, sửa, xoá, đổi platform).
  - Nút Lưu, Xuất JSON, Nhập JSON, Đặt lại mẫu.

- [ ] **Step 1: Xây dựng `src/components/Toast.jsx`**
Thông báo nổi góc dưới màn hình với icon check xanh và hiệu ứng trượt mượt mà.
- [ ] **Step 2: Xây dựng `src/components/EditModal.jsx`**
- Hỗ trợ chọn ảnh từ máy tính (FileReader `readAsDataURL` với giới hạn dung lượng < 2MB).
- Hỗ trợ thêm/xoá link mạng xã hội linh hoạt.
- Đóng modal bằng phím `Escape` hoặc click ngoài vùng backdrop.
- [ ] **Step 3: Commit**
```bash
git add src/components/EditModal.jsx src/components/Toast.jsx
git commit -m "feat: add comprehensive edit modal with file upload and json backup"
```

---

### Task 8: Tích Hợp Hoàn Chỉnh (App.jsx), Pháo Hoa Confetti & Kiểm Thử Toàn Diện

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Ghép nối tất cả components vào `src/App.jsx`**
Tích hợp `AmbientBackground`, `Navbar`, `HeroProfile`, `AchievementsStats`, `SocialLinks`, `EditModal`, `Toast`.
- [ ] **Step 2: Kích hoạt pháo hoa Canvas Confetti**
Khi bấm nút "Sao chép liên kết" hoặc khi bấm "Lưu thay đổi" trong Modal.
- [ ] **Step 3: Kiểm tra Build & Chạy thử nghiệm**
Run: `npm run build`
Expected: Build production thành công 100%.
- [ ] **Step 4: Kiểm tra Responsive và chức năng LocalStorage**
- [ ] **Step 5: Commit**
```bash
git add src/App.jsx
git commit -m "feat: complete personal bio landing page with confetti and full integration"
```

---

## Plan Review & Handoff
Sau khi kế hoạch hoàn tất, tiến hành thực hiện tuần tự từng task đảm bảo giao diện đẹp mắt, chuyển động mượt mà và hoạt động tin cậy.
