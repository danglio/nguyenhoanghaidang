# 🌟 Trang Web Giới Thiệu Bản Thân Cá Nhân (Personal Bio & Portfolio Landing Page)

Trang web giới thiệu bản thân cá nhân được thiết kế theo phong cách **Minimalist Notion & Apple**, kết hợp hiệu ứng chuyển động mượt mà bằng **Framer Motion**, cùng tính năng **chỉnh sửa trực tiếp (In-place Edit Modal)** lưu an toàn vào `localStorage` và hỗ trợ Xuất/Nhập file JSON.

---

## ✨ Tính Năng Nổi Bật

1. **Giao Diện Chuẩn Apple / Notion**:
   - Typography Inter sắc nét, tối giản, thanh lịch.
   - Hỗ trợ chế độ **Sáng / Tối (Light & Dark Mode)** mượt mà.
   - Thẻ kính mờ **Glassmorphism** với đường viền tinh tế.

2. **Hiệu Ứng Chuyển Động Đẳng Cấp**:
   - **Nền Ambient Mesh Glow**: Quả cầu ánh sáng chuyển động chậm rãi phía sau tạo chiều sâu không gian.
   - **Avatar 3D Tilt**: Rê chuột lên ảnh đại diện tạo cảm ứng chuyển động 3 chiều.
   - **Hiệu ứng Thẻ Tương Tác**: Nổi nhẹ, mũi tên góc xoay nhẹ khi rê chuột.
   - **Pháo Hoa Mini (Confetti)**: Bắn pháo hoa ăn mừng khi sao chép liên kết hoặc lưu thành công thông tin hồ sơ.

3. **Chế Độ Chỉnh Sửa Hồ Sơ Toàn Diện (Edit Modal)**:
   - **Cá nhân**: Thay ảnh đại diện (Tải ảnh từ máy tính hoặc dán link URL), cập nhật Họ tên, Danh xưng, Ngày sinh (tự động tính số tuổi), Địa điểm, Trạng thái hoạt động 🟢, Tiểu sử.
   - **Thành tích**: 4 ô thẻ Bento hiển thị các con số nổi bật (người theo dõi, kinh nghiệm, dự án...).
   - **Liên kết**: Thêm/xoá/sửa liên kết các kênh hoạt động (YouTube, TikTok, Facebook, GitHub, X, Instagram, LinkedIn, Telegram, Website, Email...).
   - **Dữ liệu**: Tự động lưu `localStorage`, có nút **Xuất JSON (Sao lưu)** và **Nhập JSON (Khôi phục)**, nút **Khôi phục mặc định**.

---

## 🚀 Hướng Dẫn Sử Dụng & Khởi Chạy

### 1. Khởi động môi trường phát triển (Dev Server)
```bash
npm run dev
```
Truy cập trên trình duyệt: `http://localhost:5173`

### 2. Đóng gói cho môi trường thực tế (Build Production)
```bash
npm run build
```
Thư mục `dist/` sẵn sàng để bạn tải lên bất kỳ nền tảng lưu trữ nào (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

---

## 🛠️ Cấu Trúc Dự Án

```
├── docs/
│   └── superpowers/
│       ├── specs/2026-09-17-personal-bio-portfolio-design.md
│       └── plans/2026-09-17-personal-bio-portfolio.md
├── src/
│   ├── components/
│   │   ├── AmbientBackground.jsx  # Hiệu ứng nền gradient chuyển động
│   │   ├── Navbar.jsx             # Thanh header kính mờ, theme toggle, nút sửa & chia sẻ
│   │   ├── HeroProfile.jsx        # Avatar 3D tilt, Tên, Ngày sinh/Tuổi, Địa điểm, Bio
│   │   ├── AchievementsStats.jsx  # Lưới thẻ Bento thành tích & chỉ số
│   │   ├── SocialIcons.jsx        # Bộ icon SVG chuẩn của các nền tảng MXH
│   │   ├── SocialLinks.jsx        # Thẻ liên kết mạng xã hội với hiệu ứng hover
│   │   ├── EditModal.jsx          # Modal chỉnh sửa 3 tabs, upload ảnh, xuất/nhập JSON
│   │   └── Toast.jsx              # Thông báo nổi feedback mượt mà
│   ├── data/
│   │   └── defaultProfile.js      # Dữ liệu mẫu chuẩn bị sẵn
│   ├── hooks/
│   │   └── useProfileData.js      # Quản lý state, LocalStorage, tính tuổi, JSON backup
│   ├── App.jsx                    # Tích hợp ứng dụng & pháo hoa confetti
│   ├── index.css                  # Tailwind directives & glassmorphism classes
│   └── main.jsx                   # Entry point React
├── package.json
├── tailwind.config.js
└── vite.config.js
```
