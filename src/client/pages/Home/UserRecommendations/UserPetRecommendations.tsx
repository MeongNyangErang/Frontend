import MessageBox from '@shared/components/common/MessageBox';
import Loader from '@shared/components/common/Loader';
import useUserPetRecommendations from '@hooks/query/user/useUserPetRecommendations';
import { addParticle } from '@utils/formatter';
import { SSectionTitle, SSectionContainer, SSectionBox } from '../styles';
import UserPetRecommendationSection from './UserPetRecommendationsSection';

const UserPetRecommendations = () => {
  const { data, isLoading, error, refresehUserPetRecommendations } =
    useUserPetRecommendations();

  return (
    <>
      {data?.map(({ petId, petName, recommendations }) => {
        return (
          <SSectionContainer key={petId}>
            <SSectionTitle>{addParticle(petName)}위한 추천 숙소</SSectionTitle>
            {error && (
              <MessageBox variant="light">
                데이터를 불러오지 못했습니다.
              </MessageBox>
            )}
            {isLoading && (
              <SSectionBox>
                <Loader size={10} color="grayBorder" loading />
              </SSectionBox>
            )}
            {!error && (
              <UserPetRecommendationSection
                petId={petId}
                initialRecommendations={recommendations}
                onSuccessClickWishButton={refresehUserPetRecommendations}
              />
            )}
          </SSectionContainer>
        );
      })}
    </>
  );
};

export default UserPetRecommendations;
