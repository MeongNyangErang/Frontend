import { Outlet, Navigate } from 'react-router-dom';
import ROUTES from '@constants/routes';

interface Props {
  allowedRoles: ('user' | 'host')[];
}

const PrivateRoute = ({ allowedRoles }: Props) => {
  // const {user} = useAuth()

  // if(!user) return <Navigate to={ROUTES.home} replace/>

  // if (!allowedRoles.includes(user.role)) return <Navigate to="/403" replace />;

  return <Outlet />;
};

export default PrivateRoute;
