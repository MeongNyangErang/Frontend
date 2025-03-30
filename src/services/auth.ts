import { AppMember } from '@typings/member';
import { fetchCall } from './api';

export const postLogin = async (
  email: string,
  password: string,
): Promise<AppMember> => {
  return await fetchCall('users/login', 'post', { email, password });
};

export const postLogout = async () => {
  return await fetchCall('users/logout', 'post');
};
