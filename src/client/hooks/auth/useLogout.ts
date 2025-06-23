import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';
import { setLogoutFn } from '@shared/utils/logoutEmitter';
import useInvalidateQueries from '@shared/hooks/query/useInvalidateQueries';
import { authServices } from '@services/authServices';

const useLogout = () => {
  const { removeMember } = useAuth();
  const navigate = useNavigate();
  const { invalidateAllQueries } = useInvalidateQueries();

  const logout = async () => {
    try {
      await authServices.logout();
      removeMember();
      invalidateAllQueries();
      // navigate(ROUTES.home, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLogoutFn(logout);
  }, []);

  return { logout };
};

export default useLogout;
