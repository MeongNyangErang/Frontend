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
  return await fetchCall('hosts/login', 'post', { email, password });
};

export const logoutUser = async () => {
  return await fetchCall('users/logout', 'post');
};

export const logoutHost = async () => {
  return await fetchCall('hosts/logout', 'post');
};
