import { useCallback } from 'react';
import useAuth from '@hooks/auth/useAuth';
import { loginUser, loginHost } from '@services/auth';
import { MemberRole } from '@typings/member';

const useLogin = <T extends MemberRole>(memberType: T) => {
  const { setCurrentMember } = useAuth();

  const login = useCallback(
    async (email: string, password: string) => {
      const loginFn = memberType === 'user' ? loginUser : loginHost;
      const currentMember = await loginFn(email, password);
      setCurrentMember(currentMember);
    },
    [memberType],
  );
  return { login };
};

export default useLogin;
