import { fetchCall } from '@shared/services/api';

const loginAdmin = async (email: string, password: string) => {
  return await fetchCall('', 'post');
};

const logoutAdmin = async () => {};

export { loginAdmin, logoutAdmin };
