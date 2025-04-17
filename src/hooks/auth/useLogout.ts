import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';
import { MemberRole } from '@typings/member';

const useLogout = (memberType: MemberRole) => {
  const { removeMember } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    // const logoutFn = memberType === 'user' ? logoutUser : logoutHost;
    // await logoutFn();
    removeMember();
    navigate(ROUTES.home, { replace: true });
  };

  return { logout };
};

export default useLogout;
