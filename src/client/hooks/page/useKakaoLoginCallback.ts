import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ROUTES from '@constants/routes';
import { kakaoLogin } from '@services/auth';
import { KakaoMemberRole } from '@typings/member';
import useAuth from '@hooks/auth/useAuth';

const useKakaoLoginCallback = () => {
  const [searchParams] = useSearchParams();
  const { setCurrentMember } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const role = searchParams.get('role') as KakaoMemberRole;

    if (!code || !role) {
      navigate(ROUTES.logIn);
      return;
    }

    const login = async () => {
      const memberRole = role === 'ROLE_USER' ? 'USER' : 'HOST';

      try {
        const { accessToken } = await kakaoLogin(code, role);
        setCurrentMember(accessToken, memberRole, '');
      } catch (error) {
        console.log(error);
        navigate(ROUTES.logIn);
      }
    };

    login();
  }, [searchParams, navigate]);
};

export default useKakaoLoginCallback;
