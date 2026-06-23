import { createContext, useContext } from 'react';

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
};

type UserContextValue = {
  user: User | null;
  setUser: (u: User | null) => void;
};

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
}
