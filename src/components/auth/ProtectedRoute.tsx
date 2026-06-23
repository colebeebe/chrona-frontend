import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useUser } from '../../contexts/userContext';

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
