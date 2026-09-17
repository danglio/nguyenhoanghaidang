# Thiết kế Kỹ thuật: Trang Web Giới Thiệu Bản Thân (Personal Bio & Portfolio Landing Page)

**Ngày thiết kế:** 17/09/2026  
**Trạng thái:** Chờ người dùng xem xét & phê duyệt (Review Pending)  
**Phong cách:** Minimalist & Clean (Notion / Apple Vibe), Hiệu ứng chuyển động mượt mà (Framer Motion & Micro-interactions), Tương thích Dark/Light Mode.

---

## 1. Tổng quan Dự án (Project Overview)

Trang web giới thiệu bản thân (Personal Landing Page / Link-in-Bio Portfolio) được thiết kế theo chuẩn phong cách Apple & Notion: tối giản, tinh tế, hiện đại với hiệu ứng chuyển động (motion) mượt mà và trực quan.

Hệ thống cho phép:
1. Hiển thị thông tin cá nhân nổi bật (Avatar, Họ tên, Danh xưng, Ngày sinh & Tuổi tự động tính, Địa điểm, Trạng thái hoạt động, Tiểu sử).
2. Hiển thị các khối Thành tích / Chỉ số ấn tượng (Bento Highlights: số năm kinh nghiệm, lượng người theo dõi, số dự án, v.v.).
3. Hiển thị danh sách các Kênh hoạt động & Mạng xã hội (YouTube, TikTok, Facebook, GitHub, X, Website...) với thẻ tương tác cao cấp.
4. Chế độ Chỉnh sửa hồ sơ (Edit Profile Modal): Cho phép cập nhật tất cả thông tin, thêm/sửa/xoá kênh liên kết, sửa chỉ số thành tích, lưu trữ tự động vào `localStorage`, đồng thời hỗ trợ Xuất (Export) và Nhập (Import) file JSON để sao lưu dữ liệu mọi lúc.

---

## 2. Công nghệ & Thư viện (Tech Stack)

* **Core Framework**: React 18 / 19 + Vite (tối ưu tốc độ tải và hot module replacement).
* **Styling**: Tailwind CSS (Utility-first styling, tối ưu responsive, hỗ trợ Dark/Light mode).
* **Motion & Animation**: `framer-motion` (chuyển động xuất hiện so le - staggered entrance, hiệu ứng hover đàn hồi mượt mà - spring physics).
* **Icons**: `lucide-react` (bộ icon tối giản, sắc nét, đồng bộ cho các nền tảng và nút thao tác).
* **Hiệu ứng chúc mừng / Tương tác**: `canvas-confetti` (bắn pháo hoa mini khi bấm Chia sẻ trang hoặc Lưu thành công).
* **Lưu trữ**: Trình duyệt `localStorage` (không phụ thuộc backend, dữ liệu an toàn và độc lập trên máy người dùng).

---

## 3. Kiến trúc Thành phần (Component Architecture)

```
src/
├── assets/
├── components/
│   ├── Navbar.jsx               # Header: Monogram/Tên, Toggle Dark/Light, Nút Chỉnh sửa, Nút Chia sẻ
│   ├── AmbientBackground.jsx    # Nền gradient mesh mờ ảo, chuyển động nhẹ nhàng
│   ├── HeroProfile.jsx          # Avatar (hover tilt), Tên, Title, Badge ngày sinh/tuổi, Status, Bio
│   ├── AchievementsStats.jsx    # Khối thẻ Bento hiển thị số liệu & thành tích ấn tượng
│   ├── SocialLinks.jsx          # Danh sách thẻ liên kết mạng xã hội (card hover, micro-interaction)
│   ├── EditModal.jsx            # Modal chỉnh sửa toàn diện (chia tabs trực quan)
│   └── Toast.jsx                # Thông báo nổi (Lưu thành công, Sao chép link, Nhập dữ liệu)
├── data/
│   └── defaultProfile.js        # Dữ liệu mẫu ban đầu cực kỳ chuyên nghiệp và thẩm mỹ
├── hooks/
│   └── useProfileData.js        # Custom hook quản lý state, LocalStorage, Export/Import JSON
├── App.jsx                      # Component gốc tích hợp các thành phần và quản lý theme
├── main.jsx                     # Entry point Vite
└── index.css                    # Cấu hình Tailwind và animation keyframes
```

---

## 4. Mô hình Dữ liệu (Data Model Schema)

Dữ liệu được quản lý dưới dạng JSON object đồng bộ với `localStorage` (`personal_bio_profile_v1`):

```json
{
  "personal": {
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    "fullName": "Alex Nguyen",
    "title": "Creative Content Creator & Tech Enthusiast",
    "birthDate": "2000-08-15",
    "showAge": true,
    "location": "Hà Nội, Việt Nam",
    "status": "🟢 Sẵn sàng cho dự án & hợp tác mới",
    "bio": "Đam mê sáng tạo nội dung số, lập trình giao diện hiện đại và chia sẻ kiến thức công nghệ đến cộng đồng."
  },
  "stats": [
    { "id": "1", "value": "50K+", "label": "Người theo dõi", "icon": "Users" },
    { "id": "2", "value": "3+ Năm", "label": "Sáng tạo nội dung", "icon": "Sparkles" },
    { "id": "3", "value": "100+", "label": "Video & Dự án", "icon": "Flame" },
    { "id": "4", "value": "100%", "label": "Tận tâm & Nhiệt huyết", "icon": "Heart" }
  ],
  "links": [
    {
      "id": "link-1",
      "platform": "youtube",
      "title": "Kênh YouTube Chính Thức",
      "url": "https://youtube.com",
      "description": "Video hướng dẫn công nghệ, review và chia sẻ kinh nghiệm hàng tuần"
    },
    {
      "id": "link-2",
      "platform": "tiktok",
      "title": "TikTok @alex.tech",
      "url": "https://tiktok.com",
      "description": "Short videos về mẹo công nghệ & lifestyle"
    },
    {
      "id": "link-3",
      "platform": "facebook",
      "title": "Facebook Cá Nhân",
      "url": "https://facebook.com",
      "description": "Kết nối và thảo luận về công việc"
    },
    {
      "id": "link-4",
      "platform": "github",
      "title": "GitHub Repositories",
      "url": "https://github.com",
      "description": "Mã nguồn các dự án mã nguồn mở & công cụ cá nhân"
    }
  ]
}
```

---

## 5. Thiết kế Hiệu ứng & Chuyển động Đặc biệt (Motion & Interactions)

1. **Ambient Gradient Background**:
   * Hai quả cầu gradient mờ (blur `120px`) di chuyển mềm mại ở nền phía sau tạo chiều sâu không gian (không gây nặng CPU).
2. **Page Entrance Animation**:
   * Hiệu ứng Staggered Fade-in & Slide-up: Khi tải trang, ảnh đại diện, họ tên, các chỉ số và từng thẻ mạng xã hội sẽ lần lượt xuất hiện theo nhịp điệu tự nhiên (`easeOutQuint`).
3. **Card 3D Hover & Magnetic Feedback**:
   * Khi rê chuột vào các thẻ liên kết: Thẻ hơi nâng nhẹ lên, viền phát sáng gradient thanh mảnh (Apple style border highlight), mũi tên góc phải (`↗`) chuyển động nhẹ 45 độ.
4. **Active Status Pulse**:
   * Chấm tròn trạng thái hoạt động có hiệu ứng ping sóng xung quanh (`animate-ping`) tạo cảm giác thời gian thực sống động.
5. **Confetti Celebration**:
   * Khi người dùng bấm **"Sao chép liên kết trang"** hoặc bấm **"Lưu hồ sơ"**, một màn pháo hoa confetti mini sẽ nổ ra nhẹ nhàng tạo cảm giác hứng khởi và thoả mãn thị giác.
6. **Smooth Modal Experience**:
   * Modal mở ra với hiệu ứng Scale-up từ 0.95 lên 1.0 và Backdrop Blur làm mờ toàn bộ nền phía sau.

---

## 6. Trải nghiệm Modal Chỉnh Sửa (Edit Modal UX)

* **Tab 1: Thông tin cá nhân**:
  * Đổi ảnh đại diện (Tải từ máy tính với tính năng FileReader base64 hoặc dán URL trực tiếp).
  * Điền Họ tên, Chức danh, Ngày sinh (trình chọn lịch ngày/tháng/năm), Bật/tắt hiển thị số tuổi, Vị trí, Trạng thái, Tiểu sử.
* **Tab 2: Thành tích & Chỉ số (Stats)**:
  * Cho phép sửa 4 thẻ chỉ số (Số liệu & Nhãn mô tả) để tôn vinh thành tích của bạn.
* **Tab 3: Quản lý Liên kết (Social Channels)**:
  * Thêm kênh mới không giới hạn.
  * Chọn nền tảng (menu chọn YouTube, TikTok, Facebook, Instagram, GitHub, X, Telegram, Website, Mail...).
  * Nhập Tên kênh, URL (tự chuẩn hóa `https://`), Mô tả phụ.
  * Nút Xóa từng kênh hoặc sắp xếp.
* **Thao tác dữ liệu (Action Bar)**:
  * Nút **Lưu thay đổi**: Cập nhật tức thì vào `localStorage`.
  * Nút **Xuất file JSON**: Tải file sao lưu về máy.
  * Nút **Nhập file JSON**: Khôi phục dữ liệu từ máy tính.
  * Nút **Khôi phục mẫu**: Trả về dữ liệu mẫu nếu muốn làm lại.

---

## 7. Kế hoạch Kiểm thử & Xác thực (Verification Plan)

1. **Kiểm tra Giao diện Responsive**: Thử nghiệm trên màn hình Mobile (375px), Tablet (768px), và Desktop (1280px+).
2. **Kiểm tra Chuyển đổi Dark / Light Mode**: Đảm bảo độ tương phản chữ, viền thẻ và màu nền luôn sắc nét.
3. **Kiểm tra Tính năng Chỉnh sửa & Lưu trữ**:
   * Thay đổi thông tin bất kỳ, bấm Lưu -> Tải lại trang (F5) xem dữ liệu có được giữ nguyên từ `localStorage` không.
   * Thử xuất file JSON -> chỉnh sửa dữ liệu -> nhập lại file JSON xem giao diện có cập nhật chính xác không.
4. **Kiểm tra Tính toán Tuổi**: Thay đổi năm sinh để kiểm tra hàm tính tuổi có chính xác theo ngày tháng năm sinh hiện tại không.
5. **Kiểm tra Build Production**: Chạy lệnh `npm run build` để đảm bảo bundle sạch, không có lỗi linter hoặc build error.
