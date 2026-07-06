import { useEffect } from 'react';
import { useTheme } from '../contexts/themeContext';

export function useThemeHook() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme ? theme.mode : 'light',
    );

    document.documentElement.style.setProperty(
      '--accent',
      `var(--${theme ? theme.accent : 'green'})`,
    );

    document.documentElement.style.setProperty(
      '--accent__alt',
      `var(--${theme ? theme.accent : 'green'}__alt)`,
    );
  }, [theme]);
}
