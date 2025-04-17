import { ChangeEvent, useCallback, useState } from 'react';
import { AxiosError } from 'axios';
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
import {
  checkHostEmailDuplicate,
  checkUserEmailDuplicate,
  checkNicknameDuplicate,
  confirmVerificationCode,
  getVerificationCode,
  signupHost,
  signupUser,
} from '@services/signup';

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

  const [successMessage, setSuccessMessage] = useState('');
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

  const handleConfirmSuccessMessage = () => {
    setSuccessMessage('');
    goToLogin();
  };

  const onCheckEmail = useCallback(async () => {
    startLoading('email');
    const checkFn =
      type === 'user' ? checkUserEmailDuplicate : checkHostEmailDuplicate;
    try {
      const res = await checkFn(formData.email);
      console.log(res);
      setCheckStatus((prev) => ({ ...prev, email: true }));
    } catch (e) {
      console.log(e);
      updateError('email', '사용 할 수 없는 이메일 입니다.');
    } finally {
      endLoading('email');
    }
  }, [formData]);

  const onCheckNickname = useCallback(async () => {
    startLoading('nickname');
    try {
      await checkNicknameDuplicate(formData.nickname);
      setCheckStatus((prev) => ({ ...prev, nickname: true }));
    } catch (e) {
      console.log(e);
      updateError('nickname', '사용 할 수 없는 닉네임 입니다.');
    } finally {
      endLoading('nickname');
    }
  }, [formData]);

  const onRequestCode = useCallback(async () => {
    if (!isEmailCodeRequested) setIsEmailCodeRequested(true);
    updateError('emailCode', '');

    startLoading('emailCode');
    try {
      await getVerificationCode(formData.email);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        updateError('emailCode', error.message);
      } else {
        updateError(
          'emailCode',
          '인증번호 요청에 실패했습니다.\n다시 시도해주세요.',
        );
      }
      return false;
    } finally {
      endLoading('emailCode');
    }
  }, [formData, isEmailCodeRequested]);

  const onVerifyCode = useCallback(
    async (code: string, timeLeft: number) => {
      if (checkStatus.emailCode) return;
      updateError('emailCode', '');

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

      startLoading('emailCode');

      try {
        await confirmVerificationCode(formData.email, code);
        setCheckStatus((prev) => ({ ...prev, emailCode: true }));
        return true;
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          updateError('emailCode', error.message);
        } else {
          updateError('emailCode', '인증에 실패했습니다.\n다시 시도해주세요.');
        }
        return false;
      } finally {
        endLoading('emailCode');
      }
    },
    [checkStatus.emailCode, formData],
  );

  const onSubmit = useCallback(async () => {
    const data = { ...formData };
    Object.entries(formData).forEach(([key, value]) => {
      if (
        !value ||
        [
          'businessRegistration',
          'accommodationPermit',
          'profileImage',
        ].includes(key)
      ) {
        delete data[key as keyof typeof data];
      }
    });

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    const formDataToRequest = new FormData();
    const infoType = type === 'user' ? 'userInfo' : 'hostInfo';
    formDataToRequest.append(infoType, blob);
    formDataToRequest.append('profileImage', formData.profileImage!);
    if (formData.accommodationPermit && formData.businessRegistration) {
      formDataToRequest.append(
        'businessLicense',
        formData.businessRegistration!,
      );
      formDataToRequest.append('submitDocument', formData.accommodationPermit!);
    }

    const submitFn = type === 'user' ? signupUser : signupHost;

    startLoading('submit');
    try {
      await submitFn(formDataToRequest);
      setSuccessMessage(
        '회원 가입에 성공했습니다.\n로그인 화면으로 이동합니다.',
      );
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        updateError('submit', error.message);
      } else {
        updateError('submit', '회원가입에 실패했습니다.\n다시 시도해주세요.');
      }
    } finally {
      endLoading('submit');
    }
  }, [formData]);

  const result = {
    step,
    formData,
    formError,
    checkStatus,
    loading,
    successMessage,
    isEmailCodeRequested,
    goToLogin,
    updateError,
    handleConfirmSuccessMessage,
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
