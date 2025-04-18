import { fetchCall } from './api';

const deleteAccount = async () => {
  return await fetchCall('users', 'delete');
};

const changeNickname = async (newNickname: string) => {
  const data = { newNickname };
  return await fetchCall('account/nickname', 'patch', data);
};

const changePassword = async (currentPassword: string, newPassword: string) => {
  const data = { currentPassword, newPassword };
  return await fetchCall('account/password', 'patch', data);
};

const changeProfileImage = async (formData: FormData) => {
  return await fetchCall('account/profile-image', 'patch', formData);
};

const changePhoneNumber = async (phoneNumber: string) => {
  const data = { phoneNumber };
  return await fetchCall('hosts/phone', 'patch', data);
};

const changeName = async (name: string) => {
  const data = { name };
  return await fetchCall('hosts/name', 'patch', data);
};

export {
  deleteAccount,
  changeNickname,
  changePassword,
  changeProfileImage,
  changePhoneNumber,
  changeName,
};
