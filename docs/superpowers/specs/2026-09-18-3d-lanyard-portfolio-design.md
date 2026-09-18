# Thiết Kế Kỹ Thuật: Redesign Landing Page theo phong cách 3D Lanyard Card & Cyber-Minimalist Portfolio

**Ngày thiết kế:** 18/09/2026  
**Trạng thái:** Đã phê duyệt (Approved by User)  
**Tham chiếu:** Video TikTok @dpi1n (Portfolio "Davin Yoga Ardiyansyah" với 3D Lanyard ID Badge)  

---

## 1. Mục Tiêu Thiết Kế (Design Goal)

Chuyển đổi toàn bộ phong cách giao diện Landing Page của **Nguyễn Hoàng Hải Đăng (Lio)** thành một Portfolio đẳng cấp, thời thượng giống như mẫu video TikTok tham khảo:
1. **Tâm điểm thị giác:** Thẻ đeo cổ sự kiện 3D tương tác (Interactive 3D Lanyard ID Card) với dây ruy-băng thả từ đỉnh màn hình, móc kim loại xoay 3D, mặt thẻ nhựa Acrylic bóng kính phản chiếu ánh sáng khi rê chuột và vật lý con lắc đung đưa/kéo thả mượt mà.
2. **Khu vực Hero:** Bố cục Dark Gradient hiện đại với tiêu đề lớn rực rỡ, lời chào "WELCOME TO MY CREATIVE SPACE", hàng nút bấm dạng viên thuốc (Pill Buttons) dẫn thẳng đến các kênh sáng tạo (TikTok Lio Kể Chuyện, YouTube, Dự án Hôm Nay Uống Gì Lio, Instagram, Facebook).
3. **Thanh điều hướng Navbar:** Phong cách Glassmorphism nổi với logo `Lio.` và các liên kết điều hướng nhanh.
4. **Hiệu năng & Khả năng phản hồi (Responsiveness):** Hoạt động mượt mà 60-120fps trên mọi trình duyệt cả Desktop (thẻ nằm bên phải cạnh text) và Mobile (thẻ nằm chính giữa trên cùng đung đưa xuống như trong video).

---

## 2. Kiến Trúc & Thành Phần Chi Tiết (Component Architecture)

### 2.1 Thành phần Thẻ đeo 3D (`src/components/LanyardBadge.jsx`)
* **Dây đeo cổ (Lanyard Ribbon):**
  - Chiều dài kéo dài từ đỉnh màn hình xuống móc khóa (`h-28` đến `h-36` trên desktop, `h-20` trên mobile).
  - Họa tiết vân vải dệt sọc chéo, viền phát quang phản quang nhẹ, dập nổi dòng chữ `★ LIO CREATIVE STORYTELLER ★` xoay dọc theo dây.
  - Có khuy bấm kim loại nối đỉnh và móc xoay bên dưới.
* **Móc xoay kim loại (Metallic Carabiner Clasp):**
  - Dựng bằng CSS 3D & gradient kim loại đa lớp: Chrome Silver với bóng sáng trắng và bóng tối kim loại tạo độ sâu chân thực 3D.
  - Vòng khuyên D-ring luồn qua lỗ khuyên của thẻ nhựa.
* **Mặt thẻ sự kiện (Event ID Badge Card):**
  - **Kích thước:** Tỷ lệ chuẩn thẻ đeo sự kiện dọc (~240px x 360px).
  - **Chất liệu:** Kính Acrylic bán trong suốt (`backdrop-blur-md`, viền `border-white/20`, đổ bóng sâu `shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]`).
  - **Lỗ khoét đỉnh:** Khe oval để xỏ khuyên móc.
  - **Đầu thẻ:** Logo `LIO CREATIVE HUB` + chấm xanh hiển thị trạng thái phát trực tiếp / đang sáng tạo.
  - **Ảnh đại diện:** Ảnh chân dung đặt trong khung bo góc mềm mại có ánh sáng viền.
  - **Chữ ký nghệ thuật:** Chữ ký viết tay cách điệu nghệ thuật `Lio` đặt đè nhẹ góc dưới của ảnh chân dung.
  - **Thông tin định danh:** Họ tên `Nguyễn Hoàng Hải Đăng`, danh xưng `Storyteller & Digital Creator`.
  - **Chân thẻ:** Dải màu phản quang đổi màu Holographic Ribbon + Mã vạch Barcode + Mã định danh độc bản `#LIO-2026-0802`.
* **Hiệu ứng vật lý (Interactive Physics & Motion):**
  - **Pendulum Idle Swing:** Thẻ tự đung đưa theo chu kỳ con lắc nhẹ nhàng (dao động góc `rotateZ` từ -2.5° đến 2.5°, `rotateY` từ -3° đến 3°).
  - **Mouse / Gyro 3D Tilt:** Khi người dùng di chuyển con trỏ chuột trên vùng Hero, thẻ sẽ nghiêng 3D đón hướng nhìn (`rotateX`, `rotateY`), kèm theo lớp phủ vệt sáng (dynamic specular glare) di chuyển trên bề mặt thẻ.
  - **Kéo thả đàn hồi (Drag & Spring Physics):** Cho phép người dùng click và kéo thẻ (Framer Motion `drag`), khi buông chuột thẻ sẽ nảy về vị trí cân bằng với hiệu ứng lò xo (`stiffness: 260, damping: 15`).

### 2.2 Khu vực Hero Section mới (`src/components/HeroLanyard.jsx`)
* **Kicker Pill:** Badge nhỏ bo tròn với hiệu ứng sao sáng `✨ WELCOME TO MY CREATIVE SPACE`.
* **Headline:** `Hi, I'm ` + tên `Nguyễn Hoàng Hải Đăng` với hiệu ứng chữ Gradient phát quang (`from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent`).
* **Sub-headline:** `Content Creator & Digital Storyteller` kèm vai trò luân chuyển dạng Typewriter / Rotating text.
* **Bio Snippet:** Đoạn văn ngắn gọn, truyền cảm hứng về nghệ thuật kể chuyện & phát triển sản phẩm web tương tác.
* **Hàng nút hành động dạng viên thuốc (Pill Buttons):**
  1. `TikTok Kể Chuyện`: Nút nổi bật nhất với màu nền gradient neon tím xanh, icon TikTok, chuyển động hover phồng nhẹ.
  2. `YouTube @lio_tsv`: Nút viên thuốc kính mờ viền đỏ pastel nhẹ, mở kênh YouTube.
  3. `Dự Án Hôm Nay Uống Gì Lio`: Nút gắn icon Game/Dice dẫn tới trang web CS2 & FIFA chọn đồ uống.
  4. `Instagram` & `Facebook`: Nút icon mạng xã hội gọn gàng.
  5. `Liên Hệ Hợp Tác`: Nút mở email hoặc copy thông tin liên lạc.

### 2.3 Navbar nâng cấp (`src/components/Navbar.jsx`)
* Logo chữ **`Lio.`** thanh mảnh hiện đại với dấu chấm phát sáng cyan.
* Thanh điều hướng giữa dạng Dock/Pill với các liên kết mượt mà cuộn xuống các phần của trang: `Trang chủ`, `Về Lio`, `Mạng xã hội`, `Dự án`.
* Nút Đổi Theme Sáng/Tối và Nút Chỉnh Sửa Hồ Sơ (Edit Profile) tiện lợi.

---

## 3. Quản Lý Dữ Liệu & Khả Năng Tương Thích

* Toàn bộ dữ liệu của Hải Đăng (Lio) từ `src/data/defaultProfile.js` vẫn là nguồn dữ liệu chuẩn (Single Source of Truth).
* Chiếc thẻ 3D Lanyard và Hero Section sẽ tự động lấy avatar, họ tên, danh hiệu, trạng thái từ `profile.personal`, giúp người dùng vẫn có thể chỉnh sửa avatar hoặc thông tin bất cứ lúc nào qua modal Chỉnh sửa mà thẻ 3D sẽ tự động cập nhật theo!

---

## 4. Kế Hoạch Kiểm Thử (Verification Plan)

1. Kiểm tra build dự án (`npm run build`) thành công, không phát sinh cảnh báo.
2. Kiểm tra hiệu ứng con lắc đung đưa, kéo thả thẻ 3D trên Desktop và Mobile.
3. Kiểm tra tính năng mở liên kết ra tab mới của tất cả các nút bấm trên Hero.
4. Kiểm tra khả năng đồng bộ khi thay đổi avatar qua nút Chỉnh sửa hồ sơ.
