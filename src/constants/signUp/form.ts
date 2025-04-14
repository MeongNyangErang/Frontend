const commonFormData = {
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  profileImage: null,
};

export const userSignUpFormData = {
  ...commonFormData,
};

export const hostSignUpFormData = {
  ...commonFormData,
  name: '',
  phoneNumber: '',
  businessRegistration: null,
  accommodationPermit: null,
};

const commonFormError = {
  email: '',
  emailCode: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  submit: '',
};

export const userSignUpFormError = {
  ...commonFormError,
};

export const hostSignUpFormError = {
  ...commonFormError,
  name: '',
  phoneNumber: '',
  businessRegistration: '',
  accommodationPermit: '',
};

export const hostSignUpFields = [
  {
    name: '이름',
    id: 'name',
    type: 'text',
    placeholder: '이름을 입력해주세요',
  },
  {
    name: '연락처',
    id: 'phoneNumber',
    type: 'text',
    placeholder: '연락처를 입력해주세요',
  },
  {
    name: '이메일',
    id: 'email',
    type: 'email',
    placeholder: 'abcde@gmail.com',
  },
  {
    name: '비밀번호',
    id: 'password',
    type: 'password',
    placeholder: '영문/숫자/특수문자 혼합 8~20자',
  },
  {
    name: '비밀번호 확인',
    id: 'passwordCheck',
    type: 'password',
    placeholder: '비밀번호를 한번 더 입력해주세요',
  },
  {
    name: '닉네임',
    id: 'nickname',
    type: 'text',
    placeholder: '한글/영문/숫자 혼합 3~12자',
  },
] as const;

const excludeIds = ['name', 'phoneNumber'] as const;
type ExcludeIds = (typeof excludeIds)[number];

export const userSignUpFields = hostSignUpFields.filter(
  (f): f is Exclude<(typeof hostSignUpFields)[number], { id: ExcludeIds }> =>
    !['name', 'phoneNumber'].includes(f.id),
);
