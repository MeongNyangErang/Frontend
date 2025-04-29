import { fetchCall } from '@admin/services/adminApi';

const loginAdmin = async (email: string, password: string) => {
  return await fetchCall<{ accessToken: string }>('login', 'post', {
    email,
    password,
  });
};

const logoutAdmin = async () => {};

export { loginAdmin, logoutAdmin };
