import { useState, useEffect } from 'react';
import { DEFAULT_PROFILE } from '../data/defaultProfile';

const STORAGE_KEY = 'personal_bio_profile_v3';

export function calculateAge(birthDateString) {
  if (!birthDateString) return null;
  const birth = new Date(birthDateString);
  if (isNaN(birth.getTime())) return null;
  
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 ? age : null;
}

export function formatBirthDate(birthDateString) {
  if (!birthDateString) return '';
  const date = new Date(birthDateString);
  if (isNaN(date.getTime())) return birthDateString;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function useProfileData() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
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
