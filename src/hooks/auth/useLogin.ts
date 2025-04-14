import { MEMBER_KEYS } from '@constants/member';
import useAuth from '@hooks/auth/useAuth';
import { loginUser, loginHost } from '@services/auth';
import { MemberRole } from '@typings/member';

const useLogin = <T extends MemberRole>(memberType: T) => {
  const { setCurrentMember } = useAuth();

  const login = async (email: string, password: string) => {
    const loginFn = memberType === 'user' ? loginUser : loginHost;
    const { accessToken } = await loginFn(email, password);
    const currentMember = {
      [MEMBER_KEYS['ROLE']]: memberType as MemberRole,
      [MEMBER_KEYS['EMAIL']]: email,
    };
    setCurrentMember(currentMember, accessToken);
  };
  return { login };
};

export default useLogin;
