import { createContext, useContext } from 'react';

export type ThemeSettings = {
  mode: string;
  accent: string;
};

type ThemeContextValue = {
  theme: ThemeSettings | null;
  setTheme: (t: ThemeSettings | null) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
