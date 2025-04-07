import { FaEdit, FaPaw } from 'react-icons/fa';
import ProfileImage from '@components/common/ProfileImage/ProfileImage';
import useMemberProfile from '@hooks/query/useMemberProfile';
import ROUTES from '@constants/routes';
import Loader from '@components/common/Loader';

import {
  SProfileBoxWrap,
  SProfileArea,
  SProfileText,
  SProfileImageWrap,
  SEditButtons,
  SEditButton,
} from './styles';

interface ProfileBoxInterface {
  memberId: string;
  email: string;
  role: 'user' | 'host';
}

const USER_EDIT_LIST = [
  { name: '내 정보 관리', path: ROUTES.myPage.user.profile, icon: <FaEdit /> },
  {
    name: '내 반려동물',
    path: ROUTES.myPage.user.myPet,
    icon: <FaPaw />,
  },
] as const;

const HOST_EDIT_LIST = [
  { name: '내 정보 관리', path: ROUTES.myPage.host.profile, icon: <FaEdit /> },
] as const;

const ProfileBox = ({ memberId, email, role }: ProfileBoxInterface) => {
  const { data: { data } = {}, isLoading } = useMemberProfile(memberId, role);
  const editList = role === 'user' ? USER_EDIT_LIST : HOST_EDIT_LIST;

  if (isLoading) {
    return (
      <SProfileBoxWrap>
        <Loader loading size={10} color="mainBorder" />
      </SProfileBoxWrap>
    );
  }

  return (
    <SProfileBoxWrap>
      <SProfileArea>
        <SProfileImageWrap>
          <ProfileImage imageUrl={data?.profileImageUrl || null} width="100%" />
        </SProfileImageWrap>
        <SProfileText>
          <p>{data?.nickname || '닉네임을 불러오지 못했습니다.'}</p>
          <span>{email}</span>
        </SProfileText>
      </SProfileArea>
      <SEditButtons>
        {editList.map(({ icon, name, path }) => (
          <SEditButton to={path} key={name}>
            {icon}
            {name}
          </SEditButton>
        ))}
      </SEditButtons>
    </SProfileBoxWrap>
  );
};

export default ProfileBox;
