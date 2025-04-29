import logoImage from '@shared/assets/images/logo2.png';
import Button from '@shared/components/common/Button';
import Modal from '@shared/components/common/Modal';
import { parseNewLine } from '@shared/utils/formatter';
import useLoginPage from '@admin/hooks/page/useLoginPage';
import {
  SLoginWrap,
  SLoginContainer,
  SLoginLogo,
  SLoginForm,
  SLoginInput,
} from './styles';

const Login = () => {
  const {
    formData,
    isLoading,
    error,
    resetError,
    handleChangeInput,
    handleLogin,
  } = useLoginPage();

  return (
    <SLoginWrap>
      <SLoginContainer>
        <SLoginLogo>
          <img src={logoImage} alt="멍냥이랑" />
        </SLoginLogo>
        <SLoginForm onSubmit={handleLogin}>
          <SLoginInput
            type="email"
            placeholder="이메일을 입력해주세요"
            value={formData['email']}
            onChange={(e) => handleChangeInput('email', e.target.value)}
          />
          <SLoginInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData['password']}
            onChange={(e) => handleChangeInput('password', e.target.value)}
          />
          <Button
            variant="main"
            fontSize="14px"
            type="submit"
            isLoading={isLoading}
            fullWidth
            fixedHeight
          >
            로그인
          </Button>
        </SLoginForm>
      </SLoginContainer>
      <Modal
        isOpen={!!error}
        variant="centered"
        closeType="none"
        role="alert"
        onClose={resetError}
      >
        {parseNewLine(error)}
      </Modal>
    </SLoginWrap>
  );
};

export default Login;
