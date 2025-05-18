import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { kakaoLogin } from '@services/auth';
import { KakaoMemberRole } from '@typings/member';
import useAuth from '@hooks/auth/useAuth';

const useKakaoLoginCallback = (onError: (message: string) => void) => {
  const [searchParams] = useSearchParams();
  const { setCurrentMember } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const role = searchParams.get('role') as KakaoMemberRole;

    if (!code || !role) {
      onError('잘못된 접근입니다.');
      return;
    }

    const login = async () => {
      const memberRole = role === 'ROLE_USER' ? 'USER' : 'HOST';

      try {
        const { accessToken } = await kakaoLogin(code, role);
        setCurrentMember(accessToken, memberRole, '');
      } catch (error) {
        console.log(error);
        onError('로그인에 실패했습니다.');
      }
    };

    login();
  }, [searchParams]);
};

export default useKakaoLoginCallback;
