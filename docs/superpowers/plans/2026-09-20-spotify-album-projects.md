# Spotify Album EP Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a high-fidelity, Spotify-styled Album/EP Showcase into the Projects section featuring 3 original audio tracks and custom AI-generated artwork.

**Architecture:** A self-contained `SpotifyAlbumShowcase.jsx` component rendered within `ProjectsShowcase.jsx`, featuring Spotify-accurate glassmorphic styling, an interactive HTML5 audio engine, dynamic soundwave equalizers, and two-way audio coordination with the background `SoundtrackPlayer.jsx`.

**Tech Stack:** React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide Icons, HTML5 Audio API, Playwright for automated verification.

## Global Constraints
- Audio files must reside in `public/music/` and use `import.meta.env.BASE_URL` for GitHub Pages `/nguyenhoanghaidang/` compatibility.
- Never hardcode raw phone numbers in any visible text.
- Must coordinate playback: playing a track in the Spotify album pauses background music in `SoundtrackPlayer`, and vice versa.
- Must be fully responsive across mobile and desktop viewports.

---

### Task 1: Music Assets Preparation & AI Artwork Generation

**Files:**
- Create: `public/music/the_dashboard_vow.mp3`
- Create: `public/music/the_hour_before_waking.mp3`
- Create: `public/music/worth_anew.mp3`
- Create: `public/music/covers/dawn_chronicles_ep.jpg`
- Create: `public/music/covers/dashboard_vow.jpg`
- Create: `public/music/covers/hour_before_waking.jpg`
- Create: `public/music/covers/worth_anew.jpg`

**Interfaces:**
- Consumes: Local MP3 files in project assets
- Produces: Web-accessible assets in `public/music/` and `public/music/covers/`

- [ ] **Step 1: Copy MP3 files to `public/music/` and verify integrity**
- [ ] **Step 2: Generate 4 AI artworks using `generate_image`**
  - Main Album EP: `album_cover_the_dawn_chronicles`
  - Track 1: `track_cover_dashboard_vow`
  - Track 2: `track_cover_hour_before_waking`
  - Track 3: `track_cover_worth_anew`
- [ ] **Step 3: Transfer generated artworks to `public/music/covers/` and verify format**
- [ ] **Step 4: Commit assets to git**

---

### Task 2: Build `SpotifyAlbumShowcase.jsx` Component

**Files:**
- Create: `src/components/SpotifyAlbumShowcase.jsx`

**Interfaces:**
- Consumes:
  - Tracks metadata array:
    - ID, title, artist ("Đăng Lio"), duration ("02:53", "02:32", "02:58"), audioSrc, coverSrc, mood/tags
  - `showToast` prop for feedback notifications
- Produces:
  - `<SpotifyAlbumShowcase showToast={showToast} />` React component
  - Global event `window.dispatchEvent(new CustomEvent('spotify-album-play'))`

- [ ] **Step 1: Build component layout with Spotify Header, Vinyl Cover Art, and Tracklist table**
- [ ] **Step 2: Implement audio playback logic (HTML5 Audio ref, play/pause, timeupdate, onended, scrubber progress bar)**
- [ ] **Step 3: Implement Spotify Green active styling, animated equalizer bars, and volume slider**
- [ ] **Step 4: Add Like toggle and Copy Share Link actions with toast alerts**
- [ ] **Step 5: Verify component syntax and prop handling**
- [ ] **Step 6: Commit component to git**

---

### Task 3: Integrate Spotify Album into `ProjectsShowcase.jsx` & Audio Coordination

**Files:**
- Modify: `src/components/ProjectsShowcase.jsx`
- Modify: `src/components/SoundtrackPlayer.jsx`

**Interfaces:**
- Consumes: `<SpotifyAlbumShowcase />`
- Produces:
  - Integrated Project Bento Section displaying Spotify Album prominently
  - Mutual audio mute/pause event listeners (`spotify-album-play` and `soundtrack-play`)

- [ ] **Step 1: Mount `SpotifyAlbumShowcase` inside `ProjectsShowcase.jsx`**
- [ ] **Step 2: Update `SoundtrackPlayer.jsx` to listen for `spotify-album-play` and pause background audio**
- [ ] **Step 3: Update `SpotifyAlbumShowcase.jsx` to listen for `soundtrack-play` and pause Spotify audio if active**
- [ ] **Step 4: Commit changes to git**

---

### Task 4: Automated Testing, Production Build & GitHub Pages Deployment

**Files:**
- Test script: `tests/verify_spotify_album.py`
- Target: GitHub Pages deployment

- [ ] **Step 1: Run Playwright automated verification test**
  - Verify tracklist rendering, song titles, cover images
  - Verify audio play/pause interaction
  - Verify audio event mutual exclusion
  - Capture screenshot of the Spotify Album section
- [ ] **Step 2: Run `npm run build` and ensure clean bundle generation**
- [ ] **Step 3: Run `npm run deploy` to publish to GitHub Pages (`gh-pages` branch)**
- [ ] **Step 4: Verify live deployment at `https://danglio.github.io/nguyenhoanghaidang/`**
