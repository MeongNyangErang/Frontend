import { fetchCall } from './api';

export const signupUser = async (formData: FormData) => {
  return await fetchCall('users/signup', 'post', formData);
};

export const signupHost = async (formData: FormData) => {
  return await fetchCall('hosts/signup', 'post', formData);
};

export const checkNicknameDuplicate = async (nickname: string) => {
  return await fetchCall(`nickname/check?nickname=${nickname}`, 'get');
};

export const checkUserEmailDuplicate = async (email: string) => {
  return await fetchCall(`email/check/user?email=${email}`, 'get');
};

export const checkHostEmailDuplicate = async (email: string) => {
  return await fetchCall(`email/check/host?email=${email}`, 'get');
};

export const getVerificationCode = async (email: string) => {
  return await fetchCall('email/send-code', 'post', { email });
};

export const confirmVerificationCode = async (email: string, code: string) => {
  return await fetchCall('email/verify-code', 'post', { email, code });
};
