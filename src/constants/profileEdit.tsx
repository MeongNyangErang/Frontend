import { UserProfile, HostProfile } from '@typings/response/auth';
import NameEditForm from '@components/common/ProfileEdit/NameEditForm';
import NickNameEditForm from '@components/common/ProfileEdit/NickNameEditForm';
import PhoneNumberEditForm from '@components/common/ProfileEdit/PhoneNumberEditForm';
import PasswordEditForm from '@components/common/ProfileEdit/PasswordEditForm';
import WithdrawForm from '@components/common/ProfileEdit/WithdrawForm';

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
      id: 'nickname';
      element: (data: UserProfile | HostProfile) => JSX.Element;
    }
  | {
      id: 'name' | 'phoneNumber';
      element: (data: HostProfile) => JSX.Element;
    }
  | { id: 'password' | 'withdraw'; element: () => JSX.Element };

export const modalFormList: ModalFormItem[] = [
  {
    id: 'nickname',
    element: (data: UserProfile | HostProfile) => (
      <NickNameEditForm defaultValue={data.nickname} />
    ),
  },
  {
    id: 'name',
    element: (data: HostProfile) => <NameEditForm defaultValue={data.name} />,
  },
  {
    id: 'phoneNumber',
    element: (data: HostProfile) => (
      <PhoneNumberEditForm defaultValue={data.currentPhoneNumber} />
    ),
  },
  { id: 'password', element: () => <PasswordEditForm /> },
  { id: 'withdraw', element: () => <WithdrawForm /> },
];
