import { AppMember } from '@typings/member';
import { fetchCall } from './api';

export const loginUser = async (
  email: string,
  password: string,
): Promise<AppMember> => {
  return await fetchCall('users/login', 'post', { email, password });
};

export const loginHost = async (
  email: string,
  password: string,
): Promise<AppMember> => {
  return await fetchCall('host/login', 'post', { email, password });
};

export const postLogout = async () => {
  return await fetchCall('users/logout', 'post');
};
