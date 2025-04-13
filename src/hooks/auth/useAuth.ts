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

  const setCurrentMember = (member: AppMember) => {
    setMember(member);
    setLocalStorage(accessTokenKey, member);
  };

  const removeMember = () => {
    setMember(null);
    removeLocalStorage(accessTokenKey);
  };

  useEffect(() => {
    const storedMember = getLocalStorage<AppMember>(accessTokenKey);
    if (storedMember) setMember(storedMember);
  }, []);

  return { member, setCurrentMember, removeMember };
};

export default useAuth;
