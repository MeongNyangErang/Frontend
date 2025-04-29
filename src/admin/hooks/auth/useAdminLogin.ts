import { loginAdmin } from '@admin/services/adminAuth';
import useAdminAuth from './useAdminAuth';

const useAdminLogin = () => {
  const { setCurrentAdminUser } = useAdminAuth();

  const loginAdminUser = async (email: string, password: string) => {
    const { accessToken } = await loginAdmin(email, password);
    setCurrentAdminUser({ email }, accessToken);
  };

  return { loginAdminUser };
};

export default useAdminLogin;
