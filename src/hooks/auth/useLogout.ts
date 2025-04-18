import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';
import { MemberRole } from '@typings/member';
import { removeLocalStorage } from '@utils/storage';
import { STORAGE_KEYS } from '@constants/storageKey';

const useLogout = (memberType: MemberRole) => {
  const { removeMember } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    removeMember();
    removeLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
    navigate(ROUTES.home, { replace: true });
  };

  return { logout };
};

export default useLogout;
