import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';

const PublicRoute = () => {
  const {
    member: { authLoading, data },
  } = useAuth();

  if (authLoading) return null;

  if (data) return <Navigate to={ROUTES.home} replace />;

  return <Outlet />;
};

export default PublicRoute;
