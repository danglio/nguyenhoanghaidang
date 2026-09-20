# Local Projects Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Cenkin and Autonomous AI Company OS as interactive view-only Bento cards with local disclaimer badges, visual simulations, and detail modals to ProjectsShowcase.

**Architecture:** Create `LocalProjectModal.jsx` for displaying technical architecture, features, and local environment disclaimer; update `ProjectsShowcase.jsx` with two new Bento Cards featuring radar scan, streak counter, agent tree node pulses, and live terminal feed.

**Tech Stack:** React 18, Tailwind CSS, Lucide React icons, Framer Motion, Vite.

## Global Constraints
- Do NOT provide broken external demo links for local projects.
- Prominently display local view-only disclaimer banner ("Bản chạy local nội bộ • Chưa mở test trực tiếp").
- Seamlessly support both Light Mode and Dark Mode.
- Pass `npm run build` without any syntax or bundling errors.

---

### Task 1: Create LocalProjectModal Component

**Files:**
- Create: `src/components/LocalProjectModal.jsx`

**Interfaces:**
- Consumes:
  - `project`: Object containing `{ id, title, subtitle, badge, status, disclaimer, architecture, features, techStack, highlights }`
  - `isOpen`: Boolean
  - `onClose`: Function `() => void`
  - `onCopyInfo`: Function `(text: string) => void`
- Produces:
  - Default export `LocalProjectModal({ project, isOpen, onClose, onCopyInfo })`

- [ ] **Step 1: Write `src/components/LocalProjectModal.jsx`**

Implement the full glassmorphic modal with:
1. Backdrop click & `Escape` key listeners to close.
2. Prominent amber/gold glass Disclaimer Notice box explaining that the project is running on a local private server and live demo is restricted.
3. Architecture data flow diagram / steps.
4. Core completed features grid.
5. Tech stack tag pills categorized by layer.
6. Copy project summary button and Close button.

- [ ] **Step 2: Verify component compiles**

Run: `npm run build`
Expected: PASS with no syntax errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/LocalProjectModal.jsx
git commit -m "feat: add LocalProjectModal component for local projects showcase"
```

---

### Task 2: Integrate Cenkin & Autonomous AI Company OS into ProjectsShowcase

**Files:**
- Modify: `src/components/ProjectsShowcase.jsx`

**Interfaces:**
- Consumes:
  - `LocalProjectModal` from `./LocalProjectModal`
  - `showToast` prop passed from `App.jsx`
- Produces:
  - 2 new Bento cards in the grid: Cenkin (col-span-6) and Autonomous AI Company OS (col-span-6)
  - Interactive UI Mockups:
    - Cenkin: Radar sweep 360° animation, satellite ping dots, Locket camera viewfinder preview with 14-day streak flame.
    - AI Company OS: Top-down hierarchical agent tree nodes with pulsing neon connectors, live terminal feed with animated log output.
  - State management for `activeModalProject` to open `LocalProjectModal`.

- [ ] **Step 1: Define project data constants in `ProjectsShowcase.jsx` or inline data model**

Include full details for:
1. `cenkin`: Title, subtitle, local badges, disclaimer, radar features, locket widget info, tech stack (`React Native Web`, `Redux Toolkit`, `Socket.io`, `Zenly Radar GPS`, `Bump Physical Engine`).
2. `aiCompany`: Title, subtitle, local badges, disclaimer, top-down hierarchy (CEO -> PM -> Studios), Apple Silicon M2 Pro optimization, tech stack (`Next.js 14`, `Python FastAPI`, `shadcn/ui`, `Apple Silicon VideoToolbox`, `Multi-Agent System`).

- [ ] **Step 2: Add Bento Cards and visual simulations to `ProjectsShowcase.jsx`**

Add the 2 cards directly below the Hero app card and before the YouTube / Spotify cards, each with:
- Top local badges: `🔒 BẢN LOCAL // NỘI BỘ` and `👀 CHỈ XEM PREVIEW`.
- Warning callout note: "Bản local chưa cho phép test • Chỉ xem giao diện".
- Interactive visual mockup (Radar + Locket for Cenkin; Agent Tree + Terminal for AI Company).
- "Xem Chi Tiết & Giao Diện" button triggering `LocalProjectModal`.
- "Sao chép thông tin" button with clipboard integration and Toast feedback.

- [ ] **Step 3: Test build**

Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsShowcase.jsx
git commit -m "feat: add Cenkin and AI Company OS view-only cards to ProjectsShowcase"
```

---

### Task 3: Build Verification, CSS Styling & Responsiveness Check

**Files:**
- Test / Verify: `src/components/ProjectsShowcase.jsx`, `src/components/LocalProjectModal.jsx`, `src/index.css`

- [ ] **Step 1: Check keyframe animations and styling**

Ensure necessary keyframes (e.g. radar-sweep, pulse, terminal typing) work smoothly with Tailwind and standard CSS.

- [ ] **Step 2: Run production build check**

Run: `npm run build`
Expected: Successful build in under 3 seconds, clean bundle.

- [ ] **Step 3: Commit any final refinements**

```bash
git add .
git commit -m "chore: verify build and styling for local projects showcase"
```
