import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import useUserPetRecommendations from '@hooks/query/user/useUserPetRecommendations';
import titleIcon from '@assets/icons/recommendationIcon.png';
import RecommendationSlider from './RecommendationSlider';
import { SSectionTitle, SSectionContainer, SSectionBox } from './styles';

const UserRecommendations = () => {
  const { data, isLoading, error } = useUserPetRecommendations();

  return (
    <>
      {data?.map(({ petId, petName, recommendations }) => {
        return (
          <SSectionContainer key={petId}>
            <SSectionTitle>
              <span>{petName}</span>을 위한 추천 숙소
              <i>
                <img src={titleIcon} alt="아이콘" />
              </i>
            </SSectionTitle>
            {error && (
              <SSectionBox>
                <MessageBox variant="light">
                  데이터를 불러오지 못했습니다.
                </MessageBox>
              </SSectionBox>
            )}
            {isLoading && (
              <SSectionBox>
                <Loader size={10} color="grayBorder" loading />
              </SSectionBox>
            )}
            {recommendations && (
              <RecommendationSlider recommendations={recommendations} />
            )}
          </SSectionContainer>
        );
      })}
    </>
  );
};

export default UserRecommendations;
