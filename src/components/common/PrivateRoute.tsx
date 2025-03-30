import { Outlet, Navigate } from 'react-router-dom';
import ROUTES from '@constants/routes';
import useAuth from '@hooks/auth/useAuth';

interface Props {
  allowedRoles: ('user' | 'host')[];
}

const PrivateRoute = ({ allowedRoles }: Props) => {
  const { member } = useAuth();

  if (!member) return <Navigate to={ROUTES.home} replace />;

  if (!allowedRoles.includes(member.role))
    return <Navigate to="/403" replace />;

  return <Outlet />;
};

export default PrivateRoute;
