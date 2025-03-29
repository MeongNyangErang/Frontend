import { ValidateOnChangeFields } from '@typings/signUp';

function validateName(name: string) {
  const regex = /^[a-z가-힣]{2,20}$/;
  if (!name) return '이름을 입력해주세요.';
  if (name.length < 2) return '이름은 2자 이상 입력해주세요.';
  if (!regex.test(name))
    return '한글 또는 영문 소문자로 된 정확한 이름을 입력해주세요.';
  return '';
}

function validatePhoneNumber(phoneNumber: string) {
  const regex = /^(01[016789]\d{7,8}|0\d{1,2}\d{7,8}|1[5789]00\d{4})$/;
  if (!phoneNumber) return '연락처를 입력해주세요.';
  if (!regex.test(phoneNumber))
    return '-를 제외한 올바른 연락처를 입력해주세요.';
  return '';
}

function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return '이메일을 입력해주세요.';
  if (!regex.test(email)) return '올바른 이메일을 입력해주세요.';
  return '';
}

function validatePassword(password: string) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$])[A-Za-z\d!@#$]+$/;
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 8) return '비밀번호는 8자 이상 입력해주세요.';
  if (!regex.test(password))
    return '영문/숫자/특수문자(!,@,#,$)를 각 1개 이상 포함해야 합니다.';
  return '';
}

function validatePasswordCheck(password: string, passwordCheck: string) {
  if (!passwordCheck) return '비밀번호를 한번 더 입력해주세요.';
  if (passwordCheck !== password) return '비밀번호가 다릅니다.';
  return '';
}

function validateNickname(nickname: string) {
  const regex = /^[가-힣a-zA-Z0-9]{3,12}$/;
  if (!nickname) return '닉네임을 입력해주세요.';
  if (!regex.test(nickname))
    return '한글/영문/숫자 포함 3자 이상 12자 이하로 입력해주세요.';
  return '';
}

const validator = {
  name: validateName,
  phoneNumber: validatePhoneNumber,
  email: validateEmail,
  password: validatePassword,
  passwordCheck: validatePasswordCheck,
  nickname: validateNickname,
} as const;

export function validateOnChange(
  key: ValidateOnChangeFields,
  value1: string,
  value2?: string,
) {
  return key === 'passwordCheck'
    ? validator[key](value1, value2!)
    : validator[key](value1);
}
