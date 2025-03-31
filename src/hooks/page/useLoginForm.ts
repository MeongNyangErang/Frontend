import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import useLogin from '@hooks/auth/useLogin';
import { MemberRole } from '@typings/member';
import { validateEmail } from '@utils/validateSignUp';

const useLoginForm = <T extends MemberRole>(
  memberType: T,
  onStart: () => void,
  onEnd: () => void,
  onError: (message: string) => void,
) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useLogin(memberType);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: 'email' | 'password') => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value.trim() }));
    },
    [],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const emailError = validateEmail(formData.email);
      if (emailError) {
        onError(emailError);
        return;
      }

      if (!formData.password) {
        onError('비밀번호를 입력해주세요.');
        return;
      }

      onStart();
      try {
        await login(formData.email, formData.password);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          onError(error.message);
        } else {
          onError('로그인에 실패했습니다.\n다시 시도 해주세요');
        }
      } finally {
        onEnd();
      }
    },
    [formData],
  );

  useEffect(() => {
    setFormData({ email: '', password: '' });
  }, [memberType]);

  return {
    formData,
    onChange,
    onSubmit,
  };
};

export default useLoginForm;
