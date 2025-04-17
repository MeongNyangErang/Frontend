import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { memberAtom } from '@recoil/authAtom';
import { AppMember } from '@typings/member';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@utils/storage';
import { STORAGE_KEYS } from '@constants/storageKey';

const accessTokenKey = STORAGE_KEYS.ACCESS_TOKEN;

const useAuth = () => {
  const [member, setMember] = useRecoilState(memberAtom);

  const setCurrentMember = (member: AppMember, accessToken: string) => {
    setMember((prev) => ({ ...prev, data: member }));
    setLocalStorage(accessTokenKey, accessToken);
  };

  const removeMember = () => {
    setMember((prev) => ({ ...prev, data: null }));
    removeLocalStorage(accessTokenKey);
  };

  useEffect(() => {
    if (!member.authLoading) return;

    const token = getLocalStorage<string>(accessTokenKey);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isTokenExpired = Date.now() > payload.exp * 1000;

      if (!isTokenExpired) {
        const role = payload.role;
        setMember((prev) => ({ ...prev, data: { role, email: '' } }));
      }
    }

    setMember((prev) => ({ ...prev, authLoading: false }));
  }, []);

  return { member, setCurrentMember, removeMember };
};

export default useAuth;
