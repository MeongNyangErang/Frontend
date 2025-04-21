import { Fragment } from 'react';
import useGuestRecommendations from '@hooks/query/useGuestRecommendations';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import RecommendationSlider from '../RecommendationSlider';
import { SSectionTitle, SSectionContainer } from '../styles';

const PetType = ['소형견', '중형견', '대형견', '고양이'] as const;

const GuestRecommendations = () => {
  const { data, isLoading, error } = useGuestRecommendations();

  console.log(data, 'data');

  return (
    <>
      {PetType.map((type) => {
        const content = data?.[type] || [];
        return (
          <Fragment key={type}>
            <SSectionTitle>{type} 추천 숙소</SSectionTitle>
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
            {<RecommendationSlider recommendations={content} />}
          </Fragment>
        );
      })}
    </>
  );
};

export default GuestRecommendations;
