# Design Document: Spotify Album EP Showcase for Creative Works

**Date:** 2026-09-20  
**Status:** Approved  
**Author:** Antigravity & Đăng Lio  
**Target File(s):**  
- `src/components/SpotifyAlbumShowcase.jsx` (New component)
- `src/components/ProjectsShowcase.jsx` (Integration point)
- `src/components/SoundtrackPlayer.jsx` (Audio collision coordination)
- `public/music/` (Storage for 3 MP3 files)
- `public/music/covers/` (Storage for generated artwork)

---

## 1. Goal & Requirements
- **Audio Assets:** Incorporate the 3 MP3 music files from `/Users/admin/Downloads/Nhạc dự án/`:
  1. `the_dashboard_vow.mp3` (173.3s ~ 02:53)
  2. `the_hour_before_waking.mp3` (152.2s ~ 02:32)
  3. `worth_anew.mp3` (178.9s ~ 02:58)
- **Visuals:** Generate 4 bespoke artworks:
  - Main EP Album Cover: `album_cover_the_dawn_chronicles`
  - Track 1 Cover: `track_cover_dashboard_vow`
  - Track 2 Cover: `track_cover_hour_before_waking`
  - Track 3 Cover: `track_cover_worth_anew`
- **Spotify Aesthetic:**
  - Dark glassmorphic design inspired by Spotify's web/desktop player UI (`#121212` background, `#1DB954` Spotify green accents, typography, play buttons, and subtle hover highlights).
  - Album metadata header: Album Type badge (`EP`), Album Title (`THE DAWN CHRONICLES`), Artist (`Đăng Lio`), Year (`2026`), Track count (`3 bài hát`), Duration (`8 phút 24 giây`).
  - Interactive Tracklist: Track number, hover-to-play icon, track cover thumbnail, title & artist, dynamic equalizer bars when active, formatted duration.
  - Interactive playback engine: HTML5 Audio playback with play, pause, track selection, scrubber progress bar, and volume management.
  - Conflict prevention: Custom event or callback to pause the floating background `SoundtrackPlayer` whenever a track from the Spotify Album starts playing, preventing overlapping audio.

---

## 2. Component Architecture & Data Flow

### 2.1 File Storage & Asset Structure
```
public/
  music/
    the_dashboard_vow.mp3
    the_hour_before_waking.mp3
    worth_anew.mp3
    covers/
      dawn_chronicles_ep.jpg
      dashboard_vow.jpg
      hour_before_waking.jpg
      worth_anew.jpg
```
All paths in components will use `import.meta.env.BASE_URL + 'music/...'` to ensure compatibility with GitHub Pages base path `/nguyenhoanghaidang/`.

### 2.2 Component: `SpotifyAlbumShowcase.jsx`
- **State Management:**
  - `currentTrackIndex`: `null | number` (0, 1, 2)
  - `isPlaying`: boolean
  - `currentTime`: number (seconds)
  - `trackDuration`: number (seconds)
  - `volume`: number (0.0 to 1.0)
  - `isLiked`: boolean (local like toggle state)
- **Audio Coordination:**
  - Emits custom window event `window.dispatchEvent(new CustomEvent('spotify-album-play'))` when playback starts.
  - Listens to global events if other players start.
  - `SoundtrackPlayer.jsx` listens for `spotify-album-play` to automatically pause background ambience without jarring the user.
- **Tracklist Items:**
  1. **The Dashboard Vow** (02:53) - Mood: Midnight Drive, Reflection, Determination
  2. **The Hour Before Waking** (02:32) - Mood: Pre-dawn Blue Hour, Ethereal Solitude
  3. **Worth Anew** (02:58) - Mood: Golden Dawn, Uplifting Renewal

---

## 3. Visual & Motion Design
- Glassmorphism: `backdrop-blur-xl bg-neutral-950/80 border border-neutral-800/80 shadow-2xl`
- Spotify Accent Color: `#1DB954` / `emerald-500` glow
- Equalizer Animation: 4 vertical bouncing bars with CSS keyframes
- Smooth Framer Motion transitions on track selection and hover states
- Responsive design: Stacks neatly on mobile screens (<640px) while maintaining full desktop Spotify glory on larger displays.

---

## 4. Verification & Testing Plan
- Verify all 3 MP3 files are copied and load properly via `import.meta.env.BASE_URL`.
- Verify generated artworks are crisp, 1:1 aspect ratio, and properly displayed.
- Test Play / Pause / Next / Track Switch functionality via Playwright headless browser test.
- Verify audio collision handling (background soundtrack pauses when Spotify track plays).
- Run production build (`npm run build`) and verify zero errors.
- Deploy to GitHub Pages and verify live URL.
