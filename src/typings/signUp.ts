import useSignUp from '@hooks/page/useSignUp';

export interface CommonFormData {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  profileImage: null | File;
}

interface OptionalFormData {
  name?: string;
  phoneNumber?: string;
  businessRegistration?: null | File;
  accommodationPermit?: null | File;
}

export type SignUpFormData = CommonFormData & OptionalFormData;

export type ValidateOnChangeFields =
  | 'name'
  | 'phoneNumber'
  | 'email'
  | 'password'
  | 'passwordCheck'
  | 'nickname';

export type FileFormatFields =
  | 'profileImage'
  | 'businessRegistration'
  | 'accommodationPermit';

export interface CheckStatus {
  email: boolean;
  emailCode: boolean;
  nickname: boolean;
}

export interface SignUpLoading {
  email: boolean;
  emailCode: boolean;
  nickname: boolean;
  submit: boolean;
}

export type SignUpFormError = Record<
  Exclude<keyof CommonFormData, 'profileImage'> | 'emailCode' | 'submit',
  string
> &
  Partial<Record<keyof OptionalFormData, string>>;

const inferUser = () => useSignUp('user');
const inferHost = () => useSignUp('host');

type UseUserSignUpReturn = ReturnType<typeof inferUser>;
type UseHostSignUpReturn = ReturnType<typeof inferHost>;

export type SignUpFormProps<T extends 'user' | 'host'> = Pick<
  UseUserSignUpReturn,
  | 'checkStatus'
  | 'isEmailCodeRequested'
  | 'loading'
  | 'onCheckEmail'
  | 'onCheckNickname'
  | 'onRequestCode'
  | 'onVerifyCode'
> & {
  type: T;
  formData: T extends 'host'
    ? UseHostSignUpReturn['formData']
    : UseUserSignUpReturn['formData'];
  formError: T extends 'host'
    ? UseHostSignUpReturn['formError']
    : UseUserSignUpReturn['formError'];
  onChange: UseHostSignUpReturn['onChangeInput'];
  onPrev: () => void;
  onNext: () => void;
};
