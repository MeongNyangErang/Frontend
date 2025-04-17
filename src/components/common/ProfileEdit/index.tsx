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
import ProfileImageUploader from '../ProfileImage/ProfileImageUploader';
import SubPageHeader from '../SubPageHeader';
import ProfileImage from '../ProfileImage/ProfileImage';
import {
  SProfileEditWrap,
  SProfileEditList,
  SProfileEditItem,
  SProfileImageEdit,
} from './styles';
import Modal from '../Modal';

interface ProfileEditProps {
  role: MemberRole;
}

const ProfileEdit = ({ role }: ProfileEditProps) => {
  const { data, error, isLoading } = useMemberProfile(role);
  const enableToEdit = !isLoading;
  const editList = role === 'user' ? userProfileEditList : hostProfileEditList;
  type EditItem = (typeof editList)[number]['id'];
  const [selectedEditItem, setSelectedEditItem] = useState<EditItem | null>(
    null,
  );

  const handleClickEditItem = (item: EditItem) => {
    setSelectedEditItem(item);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedEditItem(null);
  }, []);

  return (
    <>
      <SubPageHeader title=" 내 정보 관리" style="noButton" />
      <SProfileEditWrap>
        <SProfileImageEdit>
          <ProfileImage
            imageUrl={data?.profileImageUrl || null}
            width={'128px'}
          />
          <button>프로필 이미지 변경</button>
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
          if ((id === 'name' || id === 'phoneNumber') && role === 'host') {
            return (
              <Modal
                isOpen={isOpen && enableToEdit}
                variant="centered"
                onClose={handleCloseModal}
                closeType="x"
              >
                {element(data as HostProfile)}
              </Modal>
            );
          }
          if (id === 'nickname') {
            return (
              <Modal
                isOpen={isOpen && enableToEdit}
                variant="centered"
                onClose={handleCloseModal}
                closeType="x"
              >
                {element(data)}
              </Modal>
            );
          }
          if (id === 'password' || id === 'withdraw') {
            return (
              <Modal
                isOpen={isOpen && enableToEdit}
                variant="centered"
                onClose={handleCloseModal}
                closeType="x"
              >
                {element()}
              </Modal>
            );
          }
        })}
    </>
  );
};

export default ProfileEdit;
