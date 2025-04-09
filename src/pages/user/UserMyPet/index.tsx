import { useNavigate } from 'react-router-dom';
import SubPageHeader from '@components/common/SubPageHeader';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import Button from '@components/common/Button';
import ROUTES from '@constants/routes';
import dogProfile from '@assets/images/profile/profileDog.png';
import catProfile from '@assets/images/profile/profileCat.png';
import { getAge } from '@utils/formatter';
import useUserMyPet from '@hooks/page/useUserMyPet';
import UserMyPetModals from './UserMyPetModals';
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
  SItemButton,
  SUserEmptyBox,
} from './styles';

const UserMyPet = () => {
  const {
    data,
    error,
    isLoading,
    openForm,
    handleEditItem,
    handleClickDeleteButton,
    ...rest
  } = useUserMyPet();
  const navigate = useNavigate();

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
                      <SItemButton onClick={() => handleEditItem(pet)}>
                        편집
                      </SItemButton>
                      <SItemButton
                        onClick={() => handleClickDeleteButton(pet.petId)}
                      >
                        삭제
                      </SItemButton>
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
        <Button onClick={openForm} fontSize="13px" variant="grayBorder">
          등록하기
        </Button>
      </SUserMyPetWrap>
      <UserMyPetModals {...rest} />
    </>
  );
};

export default UserMyPet;
