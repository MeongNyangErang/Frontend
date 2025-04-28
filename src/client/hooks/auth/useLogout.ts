import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';
import { MemberRole } from '@typings/member';
import { removeLocalStorage } from '@utils/storage';
import { STORAGE_KEYS } from '@constants/storageKey';

const useLogout = (memberType: MemberRole) => {
  const { removeMember } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const invalidateAllQueries = () => {
    queryClient.invalidateQueries();
  };

  const logout = async () => {
    removeMember();
    removeLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
    invalidateAllQueries();
    navigate(ROUTES.home, { replace: true });
  };

  return { logout };
};

export default useLogout;
