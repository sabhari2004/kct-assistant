import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AppSettings } from '../types';

interface ThemeContextType {
  theme: AppSettings['theme'];
  setTheme: (theme: AppSettings['theme']) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AppSettings['theme']>(() => {
    return (localStorage.getItem('campusai-theme') as AppSettings['theme']) || 'light';
  });

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const setTheme = (newTheme: AppSettings['theme']) => {
    setThemeState(newTheme);
    localStorage.setItem('campusai-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
