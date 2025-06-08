import { useEffect } from 'react';
import { getLocalStorage } from '@shared/utils/storage';
import { extractUserInfoFromToken } from '@shared/utils/auth';
import { STORAGE_KEYS } from '@constants/storageKey';
import { setLocalStorage } from '@shared/utils/storage';
import { PayloadFromToken } from '@shared/typings/auth';
import { ReIssueToken } from '@shared/typings/response/authResponse';

interface UseInitAuth<T> {
  authLoading: boolean;
  onAuthLoadingEnd: () => void;
  parseUserInfo: (payload: PayloadFromToken) => T;
  onSetUser: (userInfo: T) => void;
  onRemoveUser: () => void;
  reIssueTokenFn: (refreshToken: string) => Promise<ReIssueToken>;
}

const useInitAuth = <T>({
  authLoading,
  onAuthLoadingEnd,
  parseUserInfo,
  onSetUser,
  onRemoveUser,
  reIssueTokenFn,
}: UseInitAuth<T>) => {
  useEffect(() => {
    if (!authLoading) return;

    if (import.meta.env.DEV) {
      onAuthLoadingEnd();
      return;
    }

    const token = getLocalStorage<string>(STORAGE_KEYS['ACCESS_TOKEN']);

    if (token) {
      const payload = extractUserInfoFromToken(token);
      const isTokenExpired = Date.now() > payload.exp * 1000;

      if (!isTokenExpired) {
        const userInfo = parseUserInfo(payload);
        onSetUser(userInfo);
        onAuthLoadingEnd();
        return;
      }

      const refreshToken = getLocalStorage<string>(
        STORAGE_KEYS['REFRESH_TOKEN'],
      );

      if (refreshToken) {
        reIssueTokenFn(refreshToken)
          .then(({ accessToken }) => {
            setLocalStorage(STORAGE_KEYS['ACCESS_TOKEN'], accessToken);
            const payload = extractUserInfoFromToken(accessToken);
            const userInfo = parseUserInfo(payload);
            onSetUser(userInfo);
          })
          .catch(() => {
            onRemoveUser();
          })
          .finally(() => {
            onAuthLoadingEnd();
          });

        return;
      }
    }

    onAuthLoadingEnd();
  }, []);
};

export default useInitAuth;
