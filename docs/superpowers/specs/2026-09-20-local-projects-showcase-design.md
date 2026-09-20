# Đặc Tả Kỹ Thuật: Tích Hợp Dự Án Local (Cenkin & Autonomous AI Company OS) Vào Projects Showcase

- **Ngày tạo**: 2026-09-20
- **Trạng thái**: Đã thống nhất (Approved Design)
- **Tác giả**: Antigravity Pair Programming & Founder (Lio)

---

## 1. Mục Tiêu & Yêu Cầu Dự Án (Product Vision & Goals)

### 1.1. Bối cảnh
Người dùng có 2 dự án lớn đang được phát triển nội bộ trên máy cục bộ (Local environment):
1. `/Users/admin/Documents/1.LIO_ECOM_FULL/3.LIO_CHECKIN`: **Cenkin** - Mạng xã hội check-in thời gian thực, kết hợp phong cách Locket camera widget, Bump kết bạn vật lý và radar bản đồ Zenly.
2. `/Users/admin/Documents/0.1.COMPANY `: **Autonomous AI Company OS** - Hệ điều hành công ty AI tự động hóa phân cấp từ Founder ➜ CEO Agent ➜ PM Agent ➜ Department Studios (Video AI Studio, Web AI Studio) trên chip Apple Silicon M2 Pro.

### 1.2. Yêu cầu của người dùng
- Đưa 2 dự án này vào trang cá nhân/landing page hiện tại (`/Users/admin/Documents/13.landingpage`).
- Trình bày theo dạng **"coi thôi / view-only"**:
  - Có thông báo rõ ràng cho người xem: *"Đây là phiên bản đang chạy trên môi trường máy chủ nội bộ (Local), chưa mở cấp phép cho cộng đồng test tính năng, chỉ dành cho khách ghé thăm xem trước giao diện & kiến trúc"*.
  - Không để các liên kết điều hướng ngoài gây nhầm lẫn hoặc lỗi 404.
  - Thiết kế mockup sống động trực tiếp trên Bento Card (quét radar Zenly + Locket camera; sơ đồ Agent AI + terminal feed).
  - Có nút mở Modal xem chi tiết kiến trúc và công nghệ của từng dự án.

---

## 2. Kiến Trúc Thành Phần & Cấu Trúc File (Component Architecture)

```
src/
├── components/
│   ├── ProjectsShowcase.jsx      # Bento Grid chính: thêm 2 thẻ dự án Local (Cenkin & AI Company)
│   ├── LocalProjectModal.jsx     # Modal chi tiết dự án Local + Hộp cảnh báo trang trọng
│   └── ... (các component hiện hữu)
└── data/
    └── defaultProfile.js         # Lưu cấu hình dữ liệu thông tin 2 dự án local (nếu cần tách)
```

### 2.1. Component `LocalProjectModal.jsx`
- **Mục đích**: Hiển thị popup toàn màn hình (với nền backdrop-blur mờ tối) khi người dùng bấm nút "Xem Chi Tiết & Kiến Trúc" trên thẻ.
- **Nội dung chính**:
  1. **Header**: Tiêu đề dự án, huy hiệu `🔒 Bản Local Nội Bộ`, nút đóng Modal (`Esc` hoặc bấm nút `X` hoặc click backdrop).
  2. **Banner Cảnh Báo Bản Quyền & Trạng Thái Local (Callout Banner)**:
     - Nền vàng hổ phách/cam (amber/orange glass) với icon cảnh báo (`ShieldAlert` hoặc `Lock`).
     - Nội dung: *"Dự án hiện đang vận hành và thử nghiệm trên môi trường máy chủ nội bộ (Local / Apple Silicon). Để đảm bảo an toàn tài nguyên và tính ổn định, phiên bản này chưa mở tính năng dùng thử trực tuyến (Live Demo). Quý khách vui lòng tham khảo thiết kế giao diện, luồng vận hành và thông số kỹ thuật bên dưới."*
  3. **Kiến Trúc Kỹ Thuật (Architecture & Flow)**: Trình bày sơ đồ luồng dữ liệu theo dạng khối trực quan.
  4. **Điểm Nhấn Tính Năng (Key Features)**: Danh sách các tính năng đột phá đã hoàn thiện trong mã nguồn.
  5. **Bộ Công Nghệ (Tech Stack)**: Các badge công nghệ được phân loại (Frontend, Backend, Sockets, Hardware, AI).
  6. **Footer**: Nút "Sao chép thông tin dự án" (Copy Project Info) và nút "Đóng".

---

## 3. Chi Tiết Thiết Kế Thẻ Dự Án (Bento Cards Specification)

### 3.1. Thẻ Dự Án 1: CENKIN (Locket & Zenly Radar Check-in)
- **Vị trí**: Bento Card `lg:col-span-6` (cạnh thẻ AI Company).
- **Header**:
  - Huy hiệu góc:
    - `🔒 BẢN LOCAL // NỘI BỘ` (nền amber/rose mờ, viền vàng cam).
    - `👀 CHỈ XEM PREVIEW` (icon con mắt `Eye` nhấp nháy nhẹ).
- **Thông tin**:
  - **Tên dự án**: `Cenkin // Locket & Zenly Radar`
  - **Phụ đề**: Mạng xã hội check-in khoảnh khắc, radar định vị bạn bè & giữ lửa hàng ngày.
  - **Dòng thông báo nhanh**: *"Dự án chạy trên máy chủ Socket nội bộ, hiện chưa mở tương tác công khai."*
- **Mockup đồ họa tương tác mô phỏng (Visual Simulation)**:
  - **Zenly Radar Scanner**: Vòng tròn radar xanh ngọc neon (`cyan-400`/`emerald-400`) có kim quét xoay liên tục 360°, điểm toạ độ vệ tinh nhấp nháy phát sóng ping xung quanh.
  - **Locket Camera Frame**: Khung widget bo tròn hiển thị camera viewfinder, nút chụp tròn và huy hiệu lửa `🔥 14 Days Streak`.
- **Hành động (Action)**:
  - Nút chính: `Xem Chi Tiết & Giao Diện` (kích hoạt mở `LocalProjectModal` với dữ liệu của Cenkin).
  - Nút phụ: `Sao chép thông tin` (copy tóm tắt dự án vào clipboard).

### 3.2. Thẻ Dự Án 2: AUTONOMOUS AI COMPANY OS (Hệ Điều Hành Doanh Nghiệp AI)
- **Vị trí**: Bento Card `lg:col-span-6` (cạnh thẻ Cenkin).
- **Header**:
  - Huy hiệu góc:
    - `🔒 BẢN LOCAL // NỘI BỘ` (nền tím/indigo mờ).
    - `👀 CHỈ XEM PREVIEW` (icon CPU/Bot phát sáng).
- **Thông tin**:
  - **Tên dự án**: `Autonomous AI Company OS`
  - **Phụ đề**: Hệ điều hành doanh nghiệp AI tự động hóa phân cấp Top-Down (CEO ➜ PM ➜ Multi-Agent Studios).
  - **Dòng thông báo nhanh**: *"Hệ thống điều hành trên chip Apple Silicon M2 Pro & GPU nội bộ, bảo mật máy chủ."*
- **Mockup đồ họa tương tác mô phỏng (Visual Simulation)**:
  - **Sơ đồ phân cấp Agent (Org-Tree)**: Node `Founder` ➔ `CEO Agent` ➔ `PM Agent` ➔ `Video/Web Studio` với các đường bus kết nối xung điện phát sáng (pulse animation).
  - **Live Terminal Feed**: Hộp đen terminal mini hiển thị các dòng log điều phối agent tự động cuộn (ví dụ: `[CEO] Directive received`, `[PM] Task dispatched to VideoStudio`).
- **Hành động (Action)**:
  - Nút chính: `Xem Chi Tiết & Giao Diện` (kích hoạt mở `LocalProjectModal` với dữ liệu của AI Company).
  - Nút phụ: `Sao chép thông tin` (copy tóm tắt dự án vào clipboard).

---

## 4. Kiểm Thử & Tiêu Chí Nghiệm Thu (Testing & Acceptance Criteria)

1. **Hiển thị & Responsive**: Cả 2 card hiển thị mượt mà trên cả máy tính (desktop bento 2 cột) và điện thoại (mobile xếp chồng 1 cột).
2. **Thông báo bản Local**: Thông điệp "Bản local chưa cho phép test / chỉ xem giao diện" được hiển thị rõ ràng ở cả thẻ ngoài và bên trong popup modal, không gây hiểu lầm cho người dùng.
3. **Hiệu ứng đồ họa**: Các animation mô phỏng (quét radar, sóng ping, xung nhịp cây sơ đồ agent) chạy mượt bằng CSS/Framer Motion, không gây giật lag hay ngốn CPU/RAM.
4. **Modal hoạt động hoàn hảo**:
   - Mở khi bấm nút xem chi tiết.
   - Đóng bằng phím `Escape`, nút `X` hoặc bấm vùng ngoài backdrop.
   - Thao tác sao chép thông tin thành công kèm Toast thông báo.
5. **Độ tương thích theme**: Hiển thị đẹp, hài hòa trên cả chế độ Sáng (Light Mode) và chế độ Tối (Dark Mode).
