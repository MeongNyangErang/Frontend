import useKakaoSDK from '@hooks/ui/useKakaoSDK';
import { MemberRole } from '@typings/member';
import { getClientDomain } from '@utils/getClientDomain';
import ROUTES from '@constants/routes';

const useKakaoLogin = (
  role: MemberRole,
  onError: (errorMessage: string) => void,
) => {
  const { isLoaded } = useKakaoSDK();

  const loginWithKakao = () => {
    if (!isLoaded) {
      onError('에러가 발생했습니다. 다시 시도해주세요.');
      return;
    }

    const redirectUri = `${getClientDomain()}${ROUTES.kakaoLogInRedirect}`;
    const memberRole = role === 'USER' ? 'ROLE_USER' : 'ROLE_HOST';
    const uriWithRole = `${redirectUri}?role=${memberRole}`;

    window.Kakao.Auth.authorize({
      redirectUri: uriWithRole,
    });
  };

  return {
    loginWithKakao,
  };
};

export default useKakaoLogin;
