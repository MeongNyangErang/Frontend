import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyPetList from '@hooks/query/user/useMyPetList';
import SubPageHeader from '@components/common/SubPageHeader';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import ROUTES from '@constants/routes';
import dogProfile from '@assets/images/profile/profileDog.png';
import catProfile from '@assets/images/profile/profileCat.png';
import { getAge } from '@utils/formatter';
import useToggleModal from '@hooks/ui/useToggleModal';
import { PetInfo } from '@typings/pet';
import {
  PET_TYPE_MAP,
  PET_ACTIVITY_LEVEL_MAP,
  PET_PERONALITY_MAP,
} from '@constants/pet';
import {
  SUserMyPetWrap,
  SUserMyPetStatus,
  SUserMyPetItems,
  SUserMyPetItem,
  SItemImageBox,
  SItemTextBox,
  SItemButtonBox,
  SItemEditButton,
  SUserEmptyBox,
} from './styles';
import PetForm from './PetForm';

const UserMyPet = () => {
  const navigate = useNavigate();
  const { data: { data } = {}, error, isLoading } = useMyPetList();
  const [selectedPet, setSelectedPet] = useState<PetInfo | null>(null);
  const { isModalOpen, openModal, closeModal } = useToggleModal();

  const updateSelectedPet = (pet: PetInfo) => {
    setSelectedPet(pet);
  };

  const resetSelectedPet = () => {
    setSelectedPet(null);
  };

  return (
    <>
      <SubPageHeader
        onClick={() => {
          navigate(ROUTES.myPage.user.root);
        }}
        style="noButton"
        title="내 반려동물"
      />
      {error && <MessageBox>{error.message}</MessageBox>}
      {isLoading && (
        <MessageBox>
          <Loader loading size={10} color="grayBorder" />
        </MessageBox>
      )}
      <SUserMyPetWrap>
        {data && data.length > 0 && (
          <>
            <SUserMyPetStatus>
              {data.length}마리의 반려동물 / 최대 10마리
            </SUserMyPetStatus>
            <SUserMyPetItems>
              {data.map((pet) => {
                const { name, birthDate, activityLevel, personality, type } =
                  pet;
                return (
                  <SUserMyPetItem key={name}>
                    <SItemImageBox>
                      <img
                        src={type === 'CAT' ? catProfile : dogProfile}
                        alt={type}
                      />
                    </SItemImageBox>
                    <SItemTextBox>
                      <h3>
                        {name}
                        <i>·</i>
                        <span>{getAge(birthDate)}세</span>
                      </h3>
                      <p>{PET_TYPE_MAP[type]}</p>
                      <div>
                        <span>{PET_PERONALITY_MAP[personality]}</span>
                        <span>{PET_ACTIVITY_LEVEL_MAP[activityLevel]}</span>
                      </div>
                    </SItemTextBox>
                    <SItemButtonBox>
                      <SItemEditButton onClick={() => updateSelectedPet(pet)}>
                        편집
                      </SItemEditButton>
                    </SItemButtonBox>
                  </SUserMyPetItem>
                );
              })}
            </SUserMyPetItems>
          </>
        )}
        {data && data.length === 0 && (
          <SUserEmptyBox>
            <p>아직 등록된 반려동물이 없어요.</p>
            <span>반려동물을 등록하고 맞춤 숙소 추천을 받아보세요!</span>
          </SUserEmptyBox>
        )}
        <Button onClick={openModal} fontSize="13px" variant="grayBorder">
          등록하기
        </Button>
      </SUserMyPetWrap>
      <Modal
        onClose={closeModal}
        isOpen={isModalOpen}
        variant="full"
        closeType="x"
      >
        <PetForm selectedPet={selectedPet} />
      </Modal>
    </>
  );
};

export default UserMyPet;
