import {
  HostProfileResponse,
  UserProfileResponse,
} from '@typings/response/auth';
import { AppMember } from '@typings/member';
import { fetchCall } from './api';

export const loginUser = async (email: string, password: string) => {
  return await fetchCall<AppMember>('users/login', 'post', { email, password });
};

export const loginHost = async (email: string, password: string) => {
  return await fetchCall<AppMember>('hosts/login', 'post', { email, password });
};

export const logoutUser = async () => {
  return await fetchCall('users/logout', 'post');
};

export const logoutHost = async () => {
  return await fetchCall('hosts/logout', 'post');
};

export const getUserProfile = async (userId: string) => {
  return await fetchCall<UserProfileResponse>(
    `users/profile?id={${userId}}`,
    'get',
  );
};

export const getHostProfile = async (hostId: string) => {
  return await fetchCall<HostProfileResponse>(
    `hosts/profile?id=${hostId}`,
    'get',
  );
};
