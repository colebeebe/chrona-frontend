import { useEffect } from 'react';
import { useUser } from '../contexts/userContext';

export function useAuth() {
  const { setUser } = useUser();

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

        setUser(data);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, [setUser, API_URL]);
}
