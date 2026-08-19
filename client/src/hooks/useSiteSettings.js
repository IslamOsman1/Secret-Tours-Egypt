import { useEffect, useState } from 'react';
import { api, getStoredSettings, SETTINGS_UPDATED_EVENT } from '../api';

export default function useSiteSettings() {
  const [settings, setSettings] = useState(() => getStoredSettings());

  useEffect(() => {
    const loadSettings = () => {
      api.get('/settings').then(({ data }) => setSettings(data)).catch(() => {});
    };

    const handleStorage = event => {
      if (!event.key || event.key === 'ste_settings') {
        loadSettings();
      }
    };

    loadSettings();
    window.addEventListener(SETTINGS_UPDATED_EVENT, loadSettings);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(SETTINGS_UPDATED_EVENT, loadSettings);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return settings;
}
