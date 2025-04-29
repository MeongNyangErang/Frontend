import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { adminAuthAtom } from '@admin/recoil/adminAuthAtom';
import { AdminUser } from '@admin/typings/adminAuth';
import { setLocalStorage, removeLocalStorage } from '@shared/utils/storage';
import { STORAGE_KEYS } from '@admin/constants/storageKey';

const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useRecoilState(adminAuthAtom);

  const setCurrentAdminUser = (data: AdminUser, token: string) => {
    setAdminUser((prev) => ({ ...prev, data }));
    setLocalStorage(STORAGE_KEYS['ACCESS_TOKEN'], token);
  };

  const removeCurrentAdminUser = () => {
    setAdminUser((prev) => ({ ...prev, data: null }));
    removeLocalStorage(STORAGE_KEYS['ACCESS_TOKEN']);
  };

  useEffect(() => {
    setAdminUser((prev) => ({ ...prev, authLoading: false }));
  }, []);

  return {
    authLoading: adminUser.authLoading,
    adminUser: adminUser.data,
    setCurrentAdminUser,
    removeCurrentAdminUser,
  };
};

export default useAdminAuth;
