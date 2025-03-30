import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import { postLogout } from '@services/auth';
import ROUTES from '@constants/routes';

const useLogin = () => {
  const { removeMember } = useAuth();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    await postLogout();
    removeMember();
    navigate(ROUTES.home, { replace: true });
  }, []);

  return { logout };
};

export default useLogin;
