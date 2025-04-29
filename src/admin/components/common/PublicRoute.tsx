import { Outlet, Navigate } from 'react-router-dom';
import ROUTES from '@admin/constants/routes';
import useAdminAuth from '@admin/hooks/auth/useAdminAuth';

const PublicRoute = () => {
  const { authLoading, adminUser } = useAdminAuth();

  if (authLoading) return null;

  if (adminUser) return <Navigate to={ROUTES.dashboard} replace />;

  return <Outlet />;
};

export default PublicRoute;
