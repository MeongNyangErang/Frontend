import { AuthToken } from '@shared/typings/response/authResponse';
import { fetchCall } from './adminApiClient';

export const loginAdmin = async (email: string, password: string) => {
  return await fetchCall<AuthToken>('login', 'post', {
    email,
    password,
  });
};
