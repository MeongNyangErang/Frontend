import ROUTES from '@constants/routes';
import logoImage from '@assets/images/logo2.png';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import kakaoImage from '@assets/images/sns/kakao.png';
import googleImage from '@assets/images/sns/google.png';
import useLoginPage from '@hooks/page/useLoginPage';
import {
  SLogin,
  SLogo,
  SDesc,
  SForm,
  SSocialArea,
  SSocialButton,
  SSignUpButton,
} from './styles';
import MemberTypeSelector from './MemberTypeSelector';

const Login = () => {
  const {
    formData,
    isLoading,
    error,
    isMemberSelectorOpen,
    openMemberSelector,
    closeMemberSelector,
    resetError,
    onChange,
    onSubmit,
  } = useLoginPage();

  return (
    <SLogin>
      <SLogo to={ROUTES.home}>
        <h2>
          <img src={logoImage} alt="멍냥이랑" />
        </h2>
      </SLogo>
      <SDesc>반려동물 동반 숙소, 쉽고 빠르게 찾기!</SDesc>
      <SForm onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={(e) => {
            onChange(e, 'email');
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={(e) => {
            onChange(e, 'password');
          }}
        />
        <Button
          type="submit"
          variant="main"
          fontSize="14px"
          fullWidth={true}
          fixedHeight={true}
          isLoading={isLoading}
        >
          로그인
        </Button>
      </SForm>
      <SSocialArea>
        <SSocialButton $variant="yellow">
          <img src={kakaoImage} alt="카카오" />
          카카오로 시작하기
        </SSocialButton>
        <SSocialButton $variant="gray">
          <img src={googleImage} alt="구글" />
          구글로 시작하기
        </SSocialButton>
      </SSocialArea>
      <SSignUpButton onClick={openMemberSelector}>
        이메일로 회원가입
      </SSignUpButton>
      <Modal
        isOpen={isMemberSelectorOpen}
        onClose={closeMemberSelector}
        variant="centered"
        closeType="x"
      >
        <MemberTypeSelector />
      </Modal>
      <Modal
        isOpen={!!error}
        onClose={resetError}
        variant="centered"
        closeType="x"
      >
        {error}
      </Modal>
    </SLogin>
  );
};

export default Login;
