import { FormEvent, useState } from 'react';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import useAdminLogin from '@admin/hooks/auth/useAdminLogin';
import { validateEmail } from '@shared/utils/validateSignUp';

const useLoginPage = () => {
  const { loginAdminUser } = useAdminLogin();
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const error = validateLoginForm();
    if (error) {
      updateError(error);
      return;
    }

    startIsLoading();
    try {
      await loginAdminUser(formData.email, formData.password);
    } catch (error) {
      updateError('로그인에 실패했습니다.\n다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  return {
    formData,
    isLoading,
    error,
    resetError,
    handleChangeInput,
    handleLogin,
  };
};

export default useLoginPage;
