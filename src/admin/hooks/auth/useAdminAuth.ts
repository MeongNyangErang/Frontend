import { AuthToken } from '@shared/typings/response/authResponse';
import { useRecoilState } from 'recoil';
import { adminAuthAtom } from '@admin/recoil/adminAuthAtom';
import { AdminUser } from '@admin/typings/adminAuth';
import { removeAuthTokens, saveAuthTokens } from '@shared/utils/auth';
import useInitAuth from '@shared/hooks/auth/useInitAuth';
import { authServices } from '@admin/services/adminAuthServices';

const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useRecoilState(adminAuthAtom);

  const setCurrentAdminUser = (data: AdminUser, tokens: AuthToken) => {
    setAdminUser((prev) => ({ ...prev, data }));
    const { accessToken, refreshToken } = tokens;
    saveAuthTokens(accessToken, refreshToken);
  };

  const removeCurrentAdminUser = () => {
    setAdminUser((prev) => ({ ...prev, data: null }));
    removeAuthTokens();
  };

  useInitAuth({
    authLoading: adminUser.authLoading,
    onAuthLoadingEnd: () => {
      setAdminUser((prev) => ({ ...prev, authLoading: false }));
    },
    parseUserInfo: (payload) => {
      const email = payload.sub;
      return { email };
    },
    onSetUser: (userInfo) => {
      setAdminUser((prev) => ({ ...prev, data: userInfo }));
    },
    onRemoveUser: removeCurrentAdminUser,
    reIssueTokenFn: authServices.reIssueToken,
  });

  return {
    authLoading: adminUser.authLoading,
    adminUser: adminUser.data,
    setCurrentAdminUser,
    removeCurrentAdminUser,
  };
};

export default useAdminAuth;
