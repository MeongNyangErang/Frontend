import { AuthToken } from '@shared/typings/response/authResponse';
import { useRecoilState } from 'recoil';
import { memberAtom } from '@recoil/authAtom';
import { MemberRole } from '@typings/member';
import { MEMBER_KEYS } from '@constants/member';
import { saveAuthTokens, removeAuthTokens } from '@shared/utils/auth';
import useInitAuth from '@shared/hooks/auth/useInitAuth';
import { authServices } from '@services/authServices';

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

  useInitAuth({
    authLoading: member.authLoading,
    onAuthLoadingEnd: () =>
      setMember((prev) => ({ ...prev, authLoading: false })),
    parseUserInfo: (payload) => {
      const email = payload.sub;
      const role = payload.role!.split('_')[1] as MemberRole;
      return { email, role };
    },
    onSetUser: (userInfo) => {
      setMember((prev) => ({
        ...prev,
        data: userInfo,
      }));
    },
    onRemoveUser: removeMember,
    reIssueTokenFn: authServices.reIssueToken,
  });

  return { member, setCurrentMember, removeMember };
};

export default useAuth;
