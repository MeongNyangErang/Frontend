import { UserProfile, HostProfile } from '@typings/response/auth';
import { AuthToken, ReIssueToken } from '@typings/response/auth';
import { KakaoMemberRole } from '@typings/member';
import { fetchCall } from '@services/api';

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
  return fetchCall<AuthToken>(
    `oauth/kakao/callback?code=${code}&role=${role}`,
    'get',
  );
};

const logoutMember = async () => {
  return fetchCall('auth/logout', 'post');
};

const getUserProfile = async () => {
  return await fetchCall<UserProfile>('users/me', 'get');
};

const getHostProfile = async () => {
  return await fetchCall<HostProfile>('hosts/me', 'get');
};

const reIssueToken = async (refreshToken: string | null) => {
  return await fetchCall<ReIssueToken>('/api/v1/auth/reissue', 'post', {
    refreshToken,
  });
};

export {
  loginUser,
  loginHost,
  kakaoLogin,
  logoutMember,
  getUserProfile,
  getHostProfile,
  reIssueToken,
};
