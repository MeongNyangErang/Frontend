import { MemberRole } from '@typings/member';
import useKakaoLogin from '@hooks/auth/useKakaoLogin';
import kakaoImage from '@assets/images/sns/kakao.png';
import { SSocialArea, SSocialButton } from './styles';

interface SocialAreaprops {
  memberType: MemberRole;
  onError: (error: string) => void;
}

const SocialArea = ({ memberType, onError }: SocialAreaprops) => {
  const { loginWithKakao } = useKakaoLogin(memberType, onError);

  return (
    <SSocialArea>
      <SSocialButton $variant="yellow" onClick={loginWithKakao}>
        <img src={kakaoImage} alt="카카오" />
        {memberType === 'USER'
          ? '카카오로 로그인'
          : '카카오로 호스트회원 로그인'}
      </SSocialButton>
    </SSocialArea>
  );
};

export default SocialArea;
