import { Outlet, Navigate } from 'react-router-dom';
import ROUTES from '@constants/routes';
import useAuth from '@hooks/auth/useAuth';

interface Props {
  allowedRoles: ('USER' | 'HOST')[];
}

const PrivateRoute = ({ allowedRoles }: Props) => {
  const {
    member: { data, authLoading },
  } = useAuth();

  if (authLoading) return null;

  if (data === null) return <Navigate to={ROUTES.home} replace />;

  if (!allowedRoles.includes(data.role)) return <Navigate to="/403" replace />;

  return <Outlet />;
};

export default PrivateRoute;
