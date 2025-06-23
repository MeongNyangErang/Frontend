import { ReIssueToken } from '@shared/typings/response/authResponse';
import { STORAGE_KEYS } from '@shared/constants/storageKey';
import { authInstance } from './api';

export const createAuthServices = (baseURL: string) => {
  return {
    logout: async () => {
      const ACCESS_TOKEN = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return authInstance.post('auth/logout', null, {
        baseURL,
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
    },
    reIssueToken: async (refreshToken: string | null): Promise<ReIssueToken> =>
      authInstance
        .post('auth/reissue', { refreshToken }, { baseURL })
        .then((res) => res.data),
  };
};
