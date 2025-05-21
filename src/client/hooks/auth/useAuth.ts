import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { memberAtom } from '@recoil/authAtom';
import { MemberRole } from '@typings/member';
import { AuthToken } from '@typings/response/auth';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@shared/utils/storage';
import { STORAGE_KEYS } from '@constants/storageKey';
import { MEMBER_KEYS } from '@constants/member';

const accessTokenKey = STORAGE_KEYS.ACCESS_TOKEN;
const refreshTokenKey = STORAGE_KEYS.REFRESH_TOKEN;

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
    saveAuthTokens(JSON.parse(accessToken), JSON.parse(refreshToken));
  };

  const saveAuthTokens = (accessToken: string, refreshToken: string) => {
    setLocalStorage(accessTokenKey, accessToken);
    setLocalStorage(refreshTokenKey, refreshToken);
  };

  const removeMember = () => {
    setMember((prev) => ({ ...prev, data: null }));
    removeLocalStorage(accessTokenKey);
    removeLocalStorage(refreshTokenKey);
  };

  useEffect(() => {
    if (!member.authLoading) return;

    if (import.meta.env.DEV) {
      setMember((prev) => ({ ...prev, authLoading: false }));
      return;
    }

    const token = getLocalStorage<string>(accessTokenKey);

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isTokenExpired = Date.now() > payload.exp * 1000;

      if (!isTokenExpired) {
        const role = payload.role.split('_')[1];
        const email = payload.sub;
        setMember((prev) => ({ ...prev, data: { role, email } }));
      } else {
        // removeLocalStorage(accessTokenKey);
      }
    }

    setMember((prev) => ({ ...prev, authLoading: false }));
  }, []);

  return { member, setCurrentMember, removeMember };
};

export default useAuth;
