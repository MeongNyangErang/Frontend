import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';
import { logoutMember } from '@services/auth';
import { setLogoutFn } from '@utils/logoutEmitter';

const useLogout = () => {
  const { removeMember } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const invalidateAllQueries = () => {
    queryClient.invalidateQueries();
  };

  const logout = async () => {
    await logoutMember();
    removeMember();
    invalidateAllQueries();
    navigate(ROUTES.home, { replace: true });
  };

  useEffect(() => {
    setLogoutFn(logout);
  }, []);

  return { logout };
};

export default useLogout;
