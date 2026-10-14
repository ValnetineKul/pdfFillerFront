import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { getSession } from '@/api/session';

export function RequireSession({ children }: { children: ReactNode }) {
  if (!getSession()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
