import { FormEvent, useState } from 'react';
import logoImage from '@shared/assets/images/logo2.png';
import Button from '@shared/components/common/Button';
import Modal from '@shared/components/common/Modal';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import { validateEmail } from '@shared/utils/validateSignUp';
import {
  SLoginWrap,
  SLoginContainer,
  SLoginLogo,
  SLoginForm,
  SLoginInput,
} from './styles';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { isLoading, endIsLoading, startIsLoading } = useIsLoading();
  const { error, resetError, updateError } = useError();

  const handleChangeInput = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateLoginForm = () => {
    const emailError = validateEmail(formData.email);
    if (emailError) return emailError;
    if (!formData.password) return '비밀번호를 입력해주세요.';
    return '';
  };

  const handleLogin = () => {
    const error = validateLoginForm();
    if (error) {
      updateError(error);
      return;
    }

    startIsLoading();
    try {
    } catch (error) {
      updateError('로그인에 실패했습니다. ');
    } finally {
      endIsLoading();
    }
  };

  return (
    <SLoginWrap>
      <SLoginContainer>
        <SLoginLogo>
          <img src={logoImage} alt="멍냥이랑" />
        </SLoginLogo>
        <SLoginForm>
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
            type="button"
            onClick={handleLogin}
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
        {error}
      </Modal>
    </SLoginWrap>
  );
};

export default Login;
