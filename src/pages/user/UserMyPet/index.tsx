import { useNavigate } from 'react-router-dom';
import useMyPetList from '@hooks/query/user/useMyPetList';
import SubPageHeader from '@components/common/SubPageHeader';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import ROUTES from '@constants/routes';
import dogProfile from '@assets/images/profile/profileDog.png';
import catProfile from '@assets/images/profile/profileCat.png';
import {
  SUserMyPetWrap,
  SUserMyPetItems,
  SUserMyPetItem,
  SItemImageBox,
  SItemTextBox,
  SRegisterPetButton,
} from './styles';

const UserMyPet = () => {
  const navigate = useNavigate();
  const { data: { data } = {}, error, isLoading } = useMyPetList();

  return (
    <>
      <SubPageHeader
        onClick={() => {
          navigate(ROUTES.myPage.user.root);
        }}
        style="arrow"
        title="내 반려동물"
      />
      {error && <MessageBox>{error.message}</MessageBox>}
      {isLoading && (
        <MessageBox>
          <Loader loading size={10} color="grayBorder" />
        </MessageBox>
      )}
      {data && (
        <SUserMyPetWrap>
          <SUserMyPetItems>
            {data.map(
              ({
                name,
                birthDate,
                activityLevel,
                personality,
                type,
                petId,
              }) => {
                return (
                  <SUserMyPetItem key={name}>
                    <SItemImageBox>
                      <img
                        src={type === '고양이' ? catProfile : dogProfile}
                        alt={type}
                      />
                    </SItemImageBox>
                    <SItemTextBox>
                      <h3>{name}</h3>
                      <p>{birthDate}</p>
                      <span>{type}</span>
                      <span>{personality}</span>
                      <span>활동량 {activityLevel}</span>
                    </SItemTextBox>
                  </SUserMyPetItem>
                );
              },
            )}
          </SUserMyPetItems>
        </SUserMyPetWrap>
      )}
    </>
  );
};

export default UserMyPet;
