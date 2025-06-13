import { ReIssueToken } from '@shared/typings/response/authResponse';
import { authInstance } from './api';

export const createAuthServices = (baseURL: string) => {
  return {
    logout: async () => authInstance.post('auth/logout', null, { baseURL }),
    reIssueToken: async (refreshToken: string | null): Promise<ReIssueToken> =>
      authInstance
        .post('auth/reissue', { refreshToken }, { baseURL })
        .then((res) => res.data),
  };
};
