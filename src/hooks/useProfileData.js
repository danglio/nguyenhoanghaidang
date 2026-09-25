import { useState, useEffect } from 'react';
import { DEFAULT_PROFILE } from '../data/defaultProfile';

const STORAGE_KEY = 'personal_bio_profile_v13';

export function calculateAge(birthDateString) {
  if (!birthDateString) return null;
  const str = String(birthDateString).trim();
  const yearMatch = str.match(/\b(19\d\d|20\d\d)\b/);
  if (!yearMatch) return null;
  const birthYear = parseInt(yearMatch[1], 10);
  const now = new Date();
  let age = now.getFullYear() - birthYear;
  return age >= 0 ? age : null;
}

export function formatBirthDate(birthDateString) {
  if (!birthDateString) return '';
  const str = String(birthDateString).trim();
  const yearMatch = str.match(/\b(19\d\d|20\d\d)\b/);
  if (yearMatch) {
    return `Sinh năm ${yearMatch[1]}`;
  }
  return str;
}

export function useProfileData() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personal?.bio && parsed.personal.bio.includes('08/02/2008')) {
          parsed.personal.bio = parsed.personal.bio.replace(/Sinh ngày 08\/02\/2008/g, 'Sinh năm 2008').replace(/08\/02\/2008/g, '2008');
        }
        return {
          personal: { ...DEFAULT_PROFILE.personal, ...(parsed.personal || {}) },
          accentColor: parsed.accentColor || DEFAULT_PROFILE.accentColor,
          vibeMusic: { ...DEFAULT_PROFILE.vibeMusic, ...(parsed.vibeMusic || {}) },
          skills: Array.isArray(parsed.skills) ? parsed.skills : DEFAULT_PROFILE.skills,
          stats: Array.isArray(parsed.stats) ? parsed.stats : DEFAULT_PROFILE.stats,
          links: Array.isArray(parsed.links) ? parsed.links : DEFAULT_PROFILE.links,
        };
      }
    } catch (e) {
      console.error('Lỗi khi đọc profile từ localStorage:', e);
    }
    return DEFAULT_PROFILE;
  });

  const updateProfile = (newProfile) => {
    try {
      setProfile(newProfile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      return true;
    } catch (e) {
      console.error('Lỗi khi lưu profile vào localStorage:', e);
      return false;
    }
  };

  const resetProfile = () => {
    try {
      setProfile(DEFAULT_PROFILE);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return true;
    } catch (e) {
      console.error('Lỗi khi khôi phục profile mặc định:', e);
      return false;
    }
  };

  const exportProfileJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `profile-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importProfileJSON = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Vui lòng chọn file JSON hợp lệ'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          if (!content.personal || !content.links) {
            throw new Error('Định dạng file không đúng cấu trúc hồ sơ!');
          }
          const validProfile = {
            personal: { ...DEFAULT_PROFILE.personal, ...(content.personal || {}) },
            accentColor: content.accentColor || DEFAULT_PROFILE.accentColor,
            vibeMusic: { ...DEFAULT_PROFILE.vibeMusic, ...(content.vibeMusic || {}) },
            skills: Array.isArray(content.skills) ? content.skills : DEFAULT_PROFILE.skills,
            stats: Array.isArray(content.stats) ? content.stats : DEFAULT_PROFILE.stats,
            links: Array.isArray(content.links) ? content.links : DEFAULT_PROFILE.links,
          };
          updateProfile(validProfile);
          resolve(validProfile);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Không thể đọc file'));
      reader.readAsText(file);
    });
  };

  return {
    profile,
    updateProfile,
    resetProfile,
    exportProfileJSON,
    importProfileJSON,
  };
}
