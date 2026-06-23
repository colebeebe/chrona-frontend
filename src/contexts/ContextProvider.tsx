import UserProvider from './UserProvider';

import type { ReactNode } from 'react';

type ContextProviderProps = {
  children: ReactNode;
};

function ContextProvider({ children }: ContextProviderProps) {
  return <UserProvider>{children}</UserProvider>;
}

export default ContextProvider;
