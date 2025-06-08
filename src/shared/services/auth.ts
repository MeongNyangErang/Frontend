import { ReIssueToken } from '@shared/typings/response/authResponse';
import { authInstance } from './api';

export const createAuthServices = (baseURL: string) => {
  return {
    logout: () => authInstance.post('auth/logout', null, { baseURL }),
    reIssueToken: (refreshToken: string | null): Promise<ReIssueToken> =>
      authInstance
        .post('auth/reissue', { refreshToken }, { baseURL })
        .then((res) => res.data),
  };
};
