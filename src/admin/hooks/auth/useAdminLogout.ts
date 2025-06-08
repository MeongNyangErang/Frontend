import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInvalidateQueries from '@shared/hooks/query/useInvalidateQueries';
import ROUTES from '@admin/constants/routes';
import { setLogoutFn } from '@shared/utils/logoutEmitter';
import { authServices } from '@admin/services/adminAuthServices';
import useAdminAuth from './useAdminAuth';

const useAdminLogout = () => {
  const { removeCurrentAdminUser } = useAdminAuth();
  const { invalidateAllQueries } = useInvalidateQueries();
  const navigate = useNavigate();
  const logoutAdminUser = async () => {
    try {
      await authServices.logout();
      removeCurrentAdminUser();
      invalidateAllQueries();
      navigate(ROUTES.login);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLogoutFn(logoutAdminUser);
  }, []);

  return { logoutAdminUser };
};

export default useAdminLogout;
