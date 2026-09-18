# Cập Nhật Thông Tin Cá Nhân & Các Kênh Liên Kết Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cập nhật thông tin nhận diện thương hiệu cá nhân của Nguyễn Hoàng Hải Đăng (Lio) cùng đầy đủ 6 liên kết mạng xã hội và dự án web trích xuất từ file docx vào Landing Page.

**Architecture:** Cập nhật file dữ liệu `src/data/defaultProfile.js` và nâng cấp khóa lưu trữ `STORAGE_KEY` trong `src/hooks/useProfileData.js` lên phiên bản `personal_bio_profile_v3` để tự động làm mới bộ nhớ trình duyệt, sau đó kiểm thử toàn diện với Vite build.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React.

## Global Constraints

- Họ tên: `Nguyễn Hoàng Hải Đăng (Lio)`
- Danh xưng: `Content Creator & Digital Storyteller`
- Đủ 6 liên kết: TikTok Kể chuyện (`@liotapkechuyen`), TikTok Cá nhân (`@nguyndang0802`), YouTube (`@lio_tsv`), Instagram (`@nguyenhoanghaidanglio`), Facebook, Web dự án `danglio.github.io/homnayuonggilio/`
- Storage Key: `personal_bio_profile_v3`
- Không phát sinh lỗi cú pháp hay cảnh báo khi chạy `npm run build`

---

### Task 1: Cập nhật dữ liệu mặc định trong `src/data/defaultProfile.js`

**Files:**
- Modify: `src/data/defaultProfile.js`
- Test: `test-profile-data.mjs` (scratch test script)

**Interfaces:**
- Consumes: Cấu trúc đối tượng `DEFAULT_PROFILE`
- Produces: `DEFAULT_PROFILE` chứa dữ liệu mới của Lio

- [ ] **Step 1: Viết test script kiểm tra dữ liệu `DEFAULT_PROFILE`**

Tạo file scratch script kiểm tra:
```javascript
import { DEFAULT_PROFILE } from './src/data/defaultProfile.js';
import assert from 'node:assert';

assert.strictEqual(DEFAULT_PROFILE.personal.fullName, 'Nguyễn Hoàng Hải Đăng (Lio)');
assert.strictEqual(DEFAULT_PROFILE.personal.title, 'Content Creator & Digital Storyteller');
assert.strictEqual(DEFAULT_PROFILE.links.length, 6);
assert.ok(DEFAULT_PROFILE.links.some(l => l.url.includes('liotapkechuyen')));
assert.ok(DEFAULT_PROFILE.links.some(l => l.url.includes('nguyndang0802')));
assert.ok(DEFAULT_PROFILE.links.some(l => l.url.includes('homnayuonggilio')));
console.log('Task 1 verification passed!');
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Chạy: `node test-profile-data.mjs`
Kỳ vọng: FAIL (vì dữ liệu hiện tại là Alex Nguyễn)

- [ ] **Step 3: Cập nhật `src/data/defaultProfile.js`**

Thay thế nội dung `src/data/defaultProfile.js` với dữ liệu mới của Nguyễn Hoàng Hải Đăng (Lio).

- [ ] **Step 4: Chạy lại test để xác nhận pass**

Chạy: `node test-profile-data.mjs`
Kỳ vọng: PASS ("Task 1 verification passed!")

- [ ] **Step 5: Xóa test script và Commit**

```bash
rm test-profile-data.mjs
git add src/data/defaultProfile.js
git commit -m "feat: update default profile to Nguyen Hoang Hai Dang (Lio) with 6 social links"
```

---

### Task 2: Nâng cấp khóa bộ nhớ trình duyệt `STORAGE_KEY` trong `src/hooks/useProfileData.js`

**Files:**
- Modify: `src/hooks/useProfileData.js`

**Interfaces:**
- Consumes: `STORAGE_KEY = 'personal_bio_profile_v2'`
- Produces: `STORAGE_KEY = 'personal_bio_profile_v3'`

- [ ] **Step 1: Cập nhật `STORAGE_KEY` sang `personal_bio_profile_v3`**

Chỉnh sửa dòng 4 trong `src/hooks/useProfileData.js` từ `'personal_bio_profile_v2'` thành `'personal_bio_profile_v3'`.

- [ ] **Step 2: Kiểm tra build với `npm run build`**

Chạy: `npm run build`
Kỳ vọng: Build thành công (exit code 0, không có lỗi bundling)

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useProfileData.js
git commit -m "fix: bump storage key to v3 for seamless profile cache migration"
```

---

### Task 3: Xác thực tổng thể và dọn dẹp file tạm

**Files:**
- Modify: `thông tin.docx` (dọn dẹp file copy tạm nếu cần)
- Test: Toàn bộ project với `npm run build`

- [ ] **Step 1: Chạy build production kiểm tra toàn diện**

Chạy: `npm run build`
Kỳ vọng: dist/ được tạo ra trơn tru, không có lỗi runtime/build.

- [ ] **Step 2: Xóa file docx đã copy vào thư mục gốc dự án**

```bash
rm -f "thông tin.docx"
```

- [ ] **Step 3: Commit hoàn thiện**

```bash
git add -A
git commit -m "chore: finalize profile update from docx and clean up workspace"
```
