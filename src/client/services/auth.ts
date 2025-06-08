import { UserProfile, HostProfile } from '@typings/response/auth';
import { KakaoMemberRole } from '@typings/member';
import { AuthToken } from '@shared/typings/response/authResponse';
import { fetchCall } from './apiClient';

const loginUser = async (email: string, password: string) => {
  return await fetchCall<AuthToken>('users/login', 'post', {
    email,
    password,
  });
};

const loginHost = async (email: string, password: string) => {
  return await fetchCall<AuthToken>('hosts/login', 'post', {
    email,
    password,
  });
};

const kakaoLogin = async (code: string, role: KakaoMemberRole) => {
  return await fetchCall<AuthToken>(
    `oauth/kakao/callback?code=${code}&role=${role}`,
    'get',
  );
};

const getUserProfile = async () => {
  return await fetchCall<UserProfile>('users/me', 'get');
};

const getHostProfile = async () => {
  return await fetchCall<HostProfile>('hosts/me', 'get');
};

export { loginUser, loginHost, kakaoLogin, getUserProfile, getHostProfile };
