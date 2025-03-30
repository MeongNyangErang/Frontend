import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { memberAtom } from '@recoil/authAtom';
import { AppMember } from '@typings/member';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@utils/storage';
import { STORAGE_KEYS } from '@constants/storageKey';

const memberKey = STORAGE_KEYS.MEMBER;

const useAuth = () => {
  const [member, setMember] = useRecoilState(memberAtom);

  const setCurrentMember = useCallback(
    (member: AppMember) => {
      setMember(member);
      setLocalStorage(memberKey, member);
    },
    [setMember],
  );

  const removeMember = useCallback(() => {
    setMember(null);
    removeLocalStorage(memberKey);
  }, [setMember]);

  useEffect(() => {
    const storedMember = getLocalStorage<AppMember>(memberKey);
    if (storedMember) setMember(storedMember);
  }, []);

  return { member, setCurrentMember, removeMember };
};

export default useAuth;
