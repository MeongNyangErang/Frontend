import { UserProfile, HostProfile } from '@typings/response/auth';
import NameEditForm from '@components/common/ProfileEdit/NameEditForm';
import NickNameEditForm from '@components/common/ProfileEdit/NickNameEditForm';
import PhoneNumberEditForm from '@components/common/ProfileEdit/PhoneNumberEditForm';
import PasswordEditForm from '@components/common/ProfileEdit/PasswordEditForm';
import WithdrawForm from '@components/common/ProfileEdit/WithdrawForm';
import ProfileImageEditForm from '@components/common/ProfileEdit/ProfileImageEditForm';

export const userProfileEditList = [
  { name: '닉네임 변경', id: 'nickname' },
  { name: '비밀번호 변경', id: 'password' },
  { name: '회원 탈퇴', id: 'withdraw' },
] as const;

export const hostProfileEditList = [
  { name: '이름 변경', id: 'name' },
  { name: '연락처 변경', id: 'phoneNumber' },
  { name: '닉네임 변경', id: 'nickname' },
  { name: '비밀번호 변경', id: 'password' },
  { name: '회원 탈퇴', id: 'withdraw' },
] as const;

type ModalFormItem =
  | {
      id: 'nickname' | 'profileImage';
      element: (
        data: UserProfile | HostProfile,
        onClose: () => void,
      ) => JSX.Element;
    }
  | {
      id: 'name' | 'phoneNumber';
      element: (data: HostProfile, onClose: () => void) => JSX.Element;
    }
  | {
      id: 'password' | 'withdraw';
      element: (onClose: () => void) => JSX.Element;
    };

export const modalFormList: ModalFormItem[] = [
  {
    id: 'profileImage',
    element: (data: UserProfile | HostProfile, onClose: () => void) => (
      <ProfileImageEditForm
        defaultValue={data.profileImageUrl}
        onClose={onClose}
      />
    ),
  },
  {
    id: 'nickname',
    element: (data: UserProfile | HostProfile, onClose: () => void) => (
      <NickNameEditForm defaultValue={data.nickname} onClose={onClose} />
    ),
  },
  {
    id: 'name',
    element: (data: HostProfile, onClose: () => void) => (
      <NameEditForm defaultValue={data.name} onClose={onClose} />
    ),
  },
  {
    id: 'phoneNumber',
    element: (data: HostProfile, onClose: () => void) => (
      <PhoneNumberEditForm defaultValue={data.phone} onClose={onClose} />
    ),
  },
  {
    id: 'password',
    element: (onClose: () => void) => <PasswordEditForm onClose={onClose} />,
  },
  {
    id: 'withdraw',
    element: (onClose: () => void) => <WithdrawForm onClose={onClose} />,
  },
];

export const passwordEditFormData = {
  password: '',
  newPassword: '',
  newPasswordCheck: '',
};

export const passwordEditFormFields = [
  {
    id: 'password',
    label: '기존 비밀번호',
    placeholder: '기존 비밀번호를 입력해주세요.',
  },
  {
    id: 'newPassword',
    label: '새 비밀번호',
    placeholder: '새 비밀번호를 입력해주세요.',
  },
  {
    id: 'newPasswordCheck',
    label: '새 비밀번호 확인',
    placeholder: '새 비밀번호를 한번 더 입력해주세요.',
  },
] as const;
