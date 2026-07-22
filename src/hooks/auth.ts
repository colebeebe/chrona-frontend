import { useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import { useTheme } from '../contexts/themeContext';

export function useAuth() {
  const { setUser } = useUser();
  const { setTheme } = useTheme();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(API_URL + '/auth/me', {
          credentials: 'include',
        });

        if (res.status === 401) {
          setUser(null);
          return;
        }

        const data = await res.json();

        setUser({
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          username: data.username,
          birthdate: data.birthdate,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        });
        setTheme({
          mode: data.theme,
          accent: data.accent,
        });
      } catch {
        setUser(null);
        setTheme({
          mode: 'light',
          accent: 'green',
        });
      }
    };

    checkAuth();
  }, [setUser, setTheme, API_URL]);
}
