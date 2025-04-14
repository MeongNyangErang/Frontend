import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { memberAtom } from '@recoil/authAtom';
import { AppMember } from '@typings/member';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@utils/storage';
import { isTokenExpired } from '@utils/jwt';
import { STORAGE_KEYS } from '@constants/storageKey';
import { getUserProfile, getHostProfile } from '@services/auth';

const accessTokenKey = STORAGE_KEYS.ACCESS_TOKEN;

const useAuth = () => {
  const [member, setMember] = useRecoilState(memberAtom);

  const setCurrentMember = (member: AppMember, accessToken: string) => {
    setMember(member);
    setLocalStorage(accessTokenKey, accessToken);
  };

  const removeMember = () => {
    setMember(null);
    removeLocalStorage(accessTokenKey);
  };

  useEffect(() => {
    // const token = getLocalStorage<string>(accessTokenKey);
    // if (!token) return;
    // if (isTokenExpired(token)) {
    //   removeMember();
    //   return;
    // }
    // const payload = JSON.parse(atob(token.split('.')[1]));
    // const role = payload.role;
    // const getMemberInfo = async () => {
    //   try {
    //     const getInfoFn = role === 'host' ? getHostProfile : getUserProfile;
    //     const { data } = await getInfoFn();
    //   } catch {
    //     removeMember();
    //   }
    // };
    // getMemberInfo()
  }, []);

  return { member, setCurrentMember, removeMember };
};

export default useAuth;
