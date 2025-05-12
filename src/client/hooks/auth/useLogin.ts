import useAuth from '@hooks/auth/useAuth';
import { loginUser, loginHost } from '@services/auth';
import { MemberRole } from '@typings/member';

const useLogin = <T extends MemberRole>(memberType: T) => {
  const { setCurrentMember } = useAuth();

  const login = async (email: string, password: string) => {
    const loginFn = memberType === 'USER' ? loginUser : loginHost;
    const { accessToken } = await loginFn(email, password);
    setCurrentMember(accessToken, memberType, email);
  };

  return { login };
};

export default useLogin;
