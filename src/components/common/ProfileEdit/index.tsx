import { useCallback, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { MemberRole } from '@typings/member';
import {
  userProfileEditList,
  hostProfileEditList,
  modalFormList,
} from '@constants/profileEdit';
import { HostProfile } from '@typings/response/auth';
import useMemberProfile from '@hooks/query/useMemberProfile';
import SubPageHeader from '../SubPageHeader';
import ProfileImage from '../ProfileImage/ProfileImage';
import {
  SProfileEditWrap,
  SProfileEditList,
  SProfileEditItem,
  SProfileImageEdit,
} from './styles';
import Modal from '../Modal';
import MessageBox from '../MessageBox';

interface ProfileEditProps {
  role: MemberRole;
}

const ProfileEdit = ({ role }: ProfileEditProps) => {
  const { data, error, isLoading, invalidateProfile } = useMemberProfile(role);
  const enableToEdit = !isLoading;
  const editList = role === 'USER' ? userProfileEditList : hostProfileEditList;
  type EditItem = (typeof editList)[number]['id'] | 'profileImage';
  const [selectedEditItem, setSelectedEditItem] = useState<EditItem | null>(
    null,
  );

  const handleClickEditItem = (item: EditItem) => {
    setSelectedEditItem(item);
  };

  const onCloseModal = useCallback(() => {
    setSelectedEditItem(null);
    invalidateProfile();
  }, []);

  if (error) {
    return (
      <>
        <SubPageHeader title=" 내 정보 관리" style="noButton" />
        <MessageBox>에러가 발생했습니다. 새로고침 해주세요.</MessageBox>
      </>
    );
  }

  return (
    <>
      <SubPageHeader title=" 내 정보 관리" style="noButton" />
      <SProfileEditWrap>
        <SProfileImageEdit>
          <ProfileImage
            imageUrl={data?.profileImageUrl || null}
            width={'128px'}
          />
          <button onClick={() => handleClickEditItem('profileImage')}>
            프로필 이미지 변경
          </button>
        </SProfileImageEdit>
        <SProfileEditList>
          {editList.map((item) => {
            return (
              <SProfileEditItem
                key={item.id}
                onClick={() => handleClickEditItem(item.id)}
              >
                {item.name}
                <FaChevronRight />
              </SProfileEditItem>
            );
          })}
        </SProfileEditList>
      </SProfileEditWrap>
      {data &&
        modalFormList.map(({ id, element }) => {
          const isOpen = selectedEditItem === id;
          if ((id === 'name' || id === 'phoneNumber') && role === 'HOST') {
            return (
              <Modal
                key={id}
                isOpen={isOpen && enableToEdit}
                variant="full"
                onClose={onCloseModal}
                closeType="x"
              >
                {element(data as HostProfile, onCloseModal)}
              </Modal>
            );
          }
          if (id === 'nickname' || id === 'profileImage') {
            return (
              <Modal
                key={id}
                isOpen={isOpen && enableToEdit}
                variant="full"
                onClose={onCloseModal}
                closeType="x"
              >
                {element(data, onCloseModal)}
              </Modal>
            );
          }
          if (id === 'password' || id === 'withdraw') {
            return (
              <Modal
                key={id}
                isOpen={isOpen && enableToEdit}
                variant="full"
                onClose={onCloseModal}
                closeType="x"
              >
                {element(onCloseModal)}
              </Modal>
            );
          }
        })}
    </>
  );
};

export default ProfileEdit;
