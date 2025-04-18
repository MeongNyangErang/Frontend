import ROUTES from '@constants/routes';
import Modal from '@components/common/Modal';
import { SectionLayout } from '@components/layouts/SectionLayout';
import logoImage from '@assets/images/logo2.png';
import kakaoImage from '@assets/images/sns/kakao.png';
import googleImage from '@assets/images/sns/google.png';
import { MemberRole } from '@typings/member';
import useLoginPage from '@hooks/page/useLoginPage';
import { parseNewLine } from '@utils/formatter';
import LoginForm from './LoginForm';
import {
  SLogin,
  SLogo,
  SDesc,
  SSocialArea,
  SSocialButton,
  SSignUpButton,
  STabBox,
} from './styles';
import MemberTypeSelector from './MemberTypeSelector';

const tabList = [
  { memberType: 'USER', name: '일반회원' },
  { memberType: 'HOST', name: '호스트회원' },
] as const;

const Login = () => {
  const {
    currentType,
    isLoading,
    error,
    isModalOpen,
    openModal,
    closeModal,
    changeTab,
    startIsLoading,
    endIsLoading,
    updateError,
    resetError,
  } = useLoginPage();

  return (
    <SectionLayout>
      <SLogin>
        <SLogo to={ROUTES.home}>
          <h2>
            <img src={logoImage} alt="멍냥이랑" />
          </h2>
        </SLogo>
        <SDesc>반려동물 동반 숙소, 쉽고 빠르게 찾기!</SDesc>
        <STabBox>
          {tabList.map(({ memberType, name }) => (
            <button
              key={memberType}
              className={memberType === currentType ? 'is-active' : ''}
              onClick={() => changeTab(memberType as MemberRole)}
            >
              {name}
            </button>
          ))}
        </STabBox>
        <LoginForm
          memberType={currentType}
          isLoading={isLoading}
          onStart={startIsLoading}
          onEnd={endIsLoading}
          onError={updateError}
        />
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
        <SSignUpButton onClick={openModal}>이메일로 회원가입</SSignUpButton>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          variant="centered"
          closeType="x"
        >
          <MemberTypeSelector />
        </Modal>
        <Modal
          isOpen={!!error}
          onClose={resetError}
          variant="centered"
          closeType="none"
          role="alert"
        >
          {parseNewLine(error)}
        </Modal>
      </SLogin>
    </SectionLayout>
  );
};

export default Login;
