import { UserProfile, HostProfile } from '@typings/response/auth';
import { LoginAccessToken } from '@typings/response/auth';
import { KakaoMemberRole } from '@typings/member';
import { fetchCall } from '@services/api';

const loginUser = async (email: string, password: string) => {
  return await fetchCall<LoginAccessToken>('users/login', 'post', {
    email,
    password,
  });
};

const loginHost = async (email: string, password: string) => {
  return await fetchCall<LoginAccessToken>('hosts/login', 'post', {
    email,
    password,
  });
};

const kakaoLogin = async (code: string, role: KakaoMemberRole) => {
  return fetchCall<LoginAccessToken>(
    `oauth/kakao/callback?code=${code}&role=${role}`,
    'get',
  );
};

const logout = async () => {
  return fetchCall('auth/logout', 'post');
};

const getUserProfile = async () => {
  return await fetchCall<UserProfile>('users/me', 'get');
};

const getHostProfile = async () => {
  return await fetchCall<HostProfile>('hosts/me', 'get');
};

export {
  loginUser,
  loginHost,
  kakaoLogin,
  logout,
  getUserProfile,
  getHostProfile,
};
