import { useCallback } from 'react';
import useAuth from '@hooks/auth/useAuth';
import { postLogin } from '@services/auth';

const useLogin = () => {
  const { setCurrentMember } = useAuth();
  const login = useCallback(async (email: string, password: string) => {
    const currentMember = await postLogin(email, password);
    setCurrentMember(currentMember);
  }, []);
  return { login };
};

export default useLogin;
