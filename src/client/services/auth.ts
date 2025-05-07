import { UserProfile, HostProfile } from '@typings/response/auth';
import { LoginAccessToken } from '@typings/response/auth';
import { KakaoMemberRole } from '@typings/member';
import { fetchCall } from '@services/api';

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

export const kakaoLogin = async (code: string, role: KakaoMemberRole) => {
  return fetchCall<LoginAccessToken>(
    `oauth/kakao/callback?code=${code}&role=${role}`,
    'get',
  );
};

export const logoutUser = async () => {
  return await fetchCall('users/logout', 'post');
};

export const logoutHost = async () => {
  return await fetchCall('hosts/logout', 'post');
};

export const getUserProfile = async () => {
  return await fetchCall<UserProfile>('users/me', 'get');
};

export const getHostProfile = async () => {
  return await fetchCall<HostProfile>('hosts/me', 'get');
};
