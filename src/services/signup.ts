import { CommonFormData, SignUpFormData } from '@typings/signUp';
import { MemberRole } from '@typings/member';
import { fetchCall } from './api';

export const signupUser = async (formData: CommonFormData) => {
  const { profileImage, ...rest } = formData;
  const data = profileImage === null ? rest : { ...rest, profileImage };
  return await fetchCall('users/signup', 'post', data);
};

export const signupHost = async (formData: SignUpFormData) => {
  const { profileImage, ...rest } = formData;
  const data = profileImage === null ? rest : { ...rest, profileImage };
  return await fetchCall('hotsts/signup', 'post', data);
};

export const checkNicknameDuplicate = async (nickname: string) => {
  return await fetchCall('nickname/check', 'get', { nickname });
};

export const checkEmailDuplicate = async (email: string, role: MemberRole) => {
  return await fetchCall('nickname/check', 'get', { email, role });
};

export const getVerificationCode = async (email: string) => {
  return await fetchCall('email/send-code', 'post', { email });
};

export const confirmVerificationCode = async (email: string, code: string) => {
  return await fetchCall('email/verify-code', 'post', { email, code });
};
