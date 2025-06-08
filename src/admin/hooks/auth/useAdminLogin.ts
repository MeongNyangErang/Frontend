import { loginAdmin } from '@admin/services/adminAuth';
import useAdminAuth from './useAdminAuth';

const useAdminLogin = () => {
  const { setCurrentAdminUser } = useAdminAuth();

  const loginAdminUser = async (email: string, password: string) => {
    const tokens = await loginAdmin(email, password);
    setCurrentAdminUser({ email }, tokens);
  };

  return { loginAdminUser };
};

export default useAdminLogin;
