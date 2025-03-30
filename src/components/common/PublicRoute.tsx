import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';

const PublicRoute = () => {
  const { member } = useAuth();

  if (member) return <Navigate to={ROUTES.home} replace />;

  return <Outlet />;
};

export default PublicRoute;
