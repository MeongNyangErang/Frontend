import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { memberAtom } from '@recoil/authAtom';
import { MemberRole } from '@typings/member';
import { AuthToken } from '@typings/response/auth';
import { setLocalStorage, getLocalStorage } from '@shared/utils/storage';
import { STORAGE_KEYS } from '@constants/storageKey';
import { MEMBER_KEYS } from '@constants/member';
import { reIssueToken } from '@services/auth';
import {
  saveAuthTokens,
  removeAuthTokens,
  extractUserInfoFromToken,
} from '@utils/auth';

const accessTokenKey = STORAGE_KEYS.ACCESS_TOKEN;

const useAuth = () => {
  const [member, setMember] = useRecoilState(memberAtom);

  const setCurrentMember = (
    tokens: AuthToken,
    role: MemberRole,
    email: string,
  ) => {
    const member = {
      [MEMBER_KEYS['ROLE']]: role as MemberRole,
      [MEMBER_KEYS['EMAIL']]: email,
    };
    setMember((prev) => ({ ...prev, data: member }));
    const { accessToken, refreshToken } = tokens;
    saveAuthTokens(accessToken, refreshToken);
  };

  const removeMember = () => {
    setMember((prev) => ({ ...prev, data: null }));
    removeAuthTokens();
  };

  useEffect(() => {
    if (!member.authLoading) return;

    if (import.meta.env.DEV) {
      setMember((prev) => ({ ...prev, authLoading: false }));
      return;
    }

    const token = getLocalStorage<string>(accessTokenKey);

    if (token) {
      const payload = extractUserInfoFromToken(token);
      const isTokenExpired = Date.now() > payload.exp * 1000;

      if (!isTokenExpired) {
        const { role, email } = payload;
        setMember((prev) => ({ ...prev, data: { role, email } }));
        setMember((prev) => ({ ...prev, authLoading: false }));
        return;
      }
    }

    const refreshToken = getLocalStorage<string>(STORAGE_KEYS['REFRESH_TOKEN']);
    if (refreshToken) {
      reIssueToken(refreshToken)
        .then(({ accessToken }) => {
          setLocalStorage(STORAGE_KEYS['ACCESS_TOKEN'], accessToken);
          const { role, email } = extractUserInfoFromToken(accessToken);
          setMember((prev) => ({ ...prev, data: { role, email } }));
        })
        .catch(() => {
          removeMember();
        })
        .finally(() => {
          setMember((prev) => ({ ...prev, authLoading: false }));
        });
    }

    if (!token && !refreshToken) {
      setMember((prev) => ({ ...prev, authLoading: false }));
    }
  }, []);

  return { member, setCurrentMember, removeMember };
};

export default useAuth;
