import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type Role = 'admin' | 'cliente' | undefined;

const ProtectedRoute = ({ children, role }: { children: JSX.Element; role?: Role }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="login" replace />;
  const userRole = session.user.user_metadata?.role as Role;
  if (role && userRole !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
