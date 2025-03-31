import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SignUpFormData,
  SignUpFormError,
  ValidateOnChangeFields,
  FileFormatFields,
} from '@typings/signUp';
import {
  userSignUpFormData,
  userSignUpFormError,
  hostSignUpFormData,
  hostSignUpFormError,
} from '@constants/signUp/form';
import { validateOnChange } from '@utils/validateSignUp';
import ROUTES from '@constants/routes';

const useSignUp = <T extends 'user' | 'host'>(type: T) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpFormData>(
    type === 'host' ? hostSignUpFormData : userSignUpFormData,
  );
  const [formError, setFormError] = useState<SignUpFormError>(
    type === 'host' ? hostSignUpFormError : userSignUpFormError,
  );
  const [checkStatus, setCheckStatus] = useState({
    email: false,
    emailCode: false,
    nickname: false,
  });
  const [loading, setLoading] = useState({
    email: false,
    emailCode: false,
    nickname: false,
    submit: false,
  });
  const [isEmailCodeRequested, setIsEmailCodeRequested] = useState(false);
  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    navigate(ROUTES.logIn);
  }, []);

  const onChangeStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const updateError = useCallback(
    (key: keyof SignUpFormError, message: string) => {
      setFormError((prev) => ({ ...prev, [key]: message }));
    },
    [],
  );

  const startLoading = useCallback((key: keyof typeof loading) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
  }, []);

  const endLoading = useCallback((key: keyof typeof loading) => {
    setLoading((prev) => ({ ...prev, [key]: false }));
  }, []);

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: ValidateOnChangeFields) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [key]: value.trim() }));

      if (
        ['nickname', 'email'].includes(key) &&
        checkStatus[key as 'email' | 'nickname']
      ) {
        setCheckStatus((prev) => ({ ...prev, [key]: false }));
      }

      if (key === 'email' && isEmailCodeRequested) {
        setIsEmailCodeRequested(false);
      }

      if (key === 'email' && checkStatus.emailCode)
        setCheckStatus((prev) => ({ ...prev, emailCode: false }));

      const error =
        key === 'passwordCheck'
          ? validateOnChange(key, value, formData.password)
          : validateOnChange(key, value);
      updateError(key, error);
    },
    [formData, checkStatus, isEmailCodeRequested],
  );

  const onChangeFileData = useCallback(
    (key: FileFormatFields, file: File | null) => {
      setFormData((prev) => ({ ...prev, [key]: file }));
    },
    [],
  );

  const onCheckEmail = useCallback(() => {
    try {
      // 이메일 중복확인 api
      setCheckStatus((prev) => ({ ...prev, email: true }));
    } catch (e) {
      console.log(e);
      updateError('email', '이메일 중복 에러');
    }
  }, []);

  const onCheckNickname = useCallback(() => {
    try {
      // 닉네임 중복확인 api
      setCheckStatus((prev) => ({ ...prev, nickname: true }));
    } catch (e) {
      console.log(e);
      updateError('nickname', '닉네임 중복 에러');
    }
  }, []);

  const onRequestCode = useCallback(async () => {
    if (!isEmailCodeRequested) setIsEmailCodeRequested(true);
    try {
      //이메일 인증 코드 요청 api
      // formData.email 필요
      return true;
    } catch (error) {
      updateError('emailCode', '');
      return false;
    }
  }, [formData, isEmailCodeRequested]);

  const onVerifyCode = useCallback(
    async (code: string, timeLeft: number) => {
      if (checkStatus.emailCode) return;

      if (!code) {
        updateError('emailCode', '인증번호를 입력해주세요');
        return false;
      }

      if (timeLeft < 1) {
        updateError(
          'emailCode',
          '유효시간이 만료됐습니다.\n인증번호를 다시 요청해주세요.',
        );
        return false;
      }

      try {
        //이메일 인증 코드 확인 api
        setCheckStatus((prev) => ({ ...prev, emailCode: true }));
        return true;
      } catch (error) {
        return false;
      }
    },
    [checkStatus.emailCode],
  );

  const onSubmit = useCallback(() => {
    console.log(formData);
    try {
    } catch (error) {}
  }, [formData]);

  const result = {
    step,
    formData,
    formError,
    checkStatus,
    loading,
    isEmailCodeRequested,
    goToLogin,
    updateError,
    onChangeStep,
    onChangeInput,
    onChangeFileData,
    onCheckEmail,
    onCheckNickname,
    onRequestCode,
    onVerifyCode,
    onSubmit,
  };

  return result;
};

export default useSignUp;
