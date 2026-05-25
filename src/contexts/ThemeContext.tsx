import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type ThemeMode = 'dark' | 'light';
type ThemePreset = 'delta' | 'red' | 'blue';

interface ThemeContextValue {
  theme: ThemeMode;
  preset: ThemePreset;
  toggleTheme: () => void;
  setPreset: (p: ThemePreset) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'fl3x-theme-mode';
const STORAGE_PRESET = 'fl3x-theme-preset';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return saved === 'light' ? 'light' : 'dark';
  });
  const [preset, setPresetState] = useState<ThemePreset>(() => {
    if (typeof window === 'undefined') return 'delta';
    const p = window.localStorage.getItem(STORAGE_PRESET) as ThemePreset | null;
    return p ?? 'delta';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.preset = preset;
    window.localStorage.setItem(STORAGE_PRESET, preset);
  }, [preset]);

  const value = useMemo(
    () => ({
      theme,
      preset,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      setPreset: (p: ThemePreset) => setPresetState(p)
    }),
    [theme, preset]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
