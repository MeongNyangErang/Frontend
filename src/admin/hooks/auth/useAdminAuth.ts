import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { adminAuthAtom } from '@admin/recoil/adminAuthAtom';

const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useRecoilState(adminAuthAtom);

  useEffect(() => {
    setAdminUser((prev) => ({ ...prev, authLoading: false }));
  }, []);

  return { authLoading: adminUser.authLoading, adminUser: adminUser.data };
};

export default useAdminAuth;
