import { Outlet, Navigate, useLocation } from 'react-router-dom';
import ROUTES from '@admin/constants/routes';
import useAdminAuth from '@admin/hooks/auth/useAdminAuth';

const PrivateRoute = () => {
  const { authLoading, adminUser } = useAdminAuth();
  const location = useLocation();

  if (authLoading) return null;

  if (!adminUser) return <Navigate to={ROUTES.login} replace />;

  if (location.pathname === '/')
    return <Navigate to={ROUTES.dashboard} replace />;

  return <Outlet />;
};

export default PrivateRoute;
