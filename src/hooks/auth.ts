import { useEffect } from 'react';
import { useUser } from '../contexts/userContext';

export function useAuth() {
  const { setUser } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:4000/auth/me', {
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
  }, [setUser]);
}
