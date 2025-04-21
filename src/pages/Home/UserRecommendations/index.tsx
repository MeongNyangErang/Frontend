import { Fragment } from 'react';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import useUserPetRecommendations from '@hooks/query/user/useUserPetRecommendations';
import RecommendationSlider from '../RecommendationSlider';
import { SSectionTitle, SSectionContainer } from '../styles';

const UserRecommendations = () => {
  const { data, isLoading, error } = useUserPetRecommendations();

  return (
    <>
      {data?.map(({ petId, petName, recommendations }) => {
        return (
          <Fragment key={petId}>
            <SSectionTitle>{petName}을 위한 추천 숙소</SSectionTitle>
            {error && (
              <MessageBox variant="light">
                데이터를 불러오지 못했습니다.
              </MessageBox>
            )}
            {isLoading && (
              <SSectionContainer>
                <Loader size={10} color="grayBorder" loading />
              </SSectionContainer>
            )}
            {recommendations && (
              <RecommendationSlider recommendations={recommendations} />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default UserRecommendations;
