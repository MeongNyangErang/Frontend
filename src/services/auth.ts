import { UserProfile, HostProfile } from '@typings/response/auth';
import { LoginAccessToken } from '@typings/response/auth';
import { fetchCall } from './api';

export const loginUser = async (email: string, password: string) => {
  return await fetchCall<LoginAccessToken>('users/login', 'post', {
    email,
    password,
  });
};

export const loginHost = async (email: string, password: string) => {
  return await fetchCall<LoginAccessToken>('hosts/login', 'post', {
    email,
    password,
  });
};

export const logoutUser = async () => {
  return await fetchCall('users/logout', 'post');
};

export const logoutHost = async () => {
  return await fetchCall('hosts/logout', 'post');
};

export const getUserProfile = async () => {
  console.log('im working');
  return await fetchCall<UserProfile>('users/me', 'get');
};

export const getHostProfile = async () => {
  return await fetchCall<HostProfile>('hosts/me', 'get');
};
