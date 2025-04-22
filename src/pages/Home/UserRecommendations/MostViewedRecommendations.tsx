import { useEffect, useState } from 'react';
import { BsFire } from 'react-icons/bs';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import useMostViewedRecommendations from '@hooks/query/user/useMostViewedRecommendations';
import RecommendationSlider from '../RecommendationSlider';
import { SSectionTitle, SSectionContainer, SSectionBox } from '../styles';
import { RecommendationsAccommodation } from '@typings/recommendations';

const MostViewedRecommendations = () => {
  const [list, setList] = useState<RecommendationsAccommodation[]>([]);
  const { data, isLoading, error } = useMostViewedRecommendations();

  const onSuccessClickWishButton = (accommodationId: number) => {
    setList((prev) => {
      const targetIndex = prev.findIndex((v) => v.id === accommodationId);
      const updated = {
        ...prev[targetIndex],
        wishlisted: !prev[targetIndex].wishlisted,
      };
      return prev.map((v) => {
        if (v.id === accommodationId) return updated;
        return v;
      });
    });
  };

  useEffect(() => {
    if (!data) return;
    setList([...data]);
  }, [data]);

  return (
    <SSectionContainer>
      <SSectionTitle>
        인기 숙소
        <i>
          <BsFire />
        </i>
      </SSectionTitle>
      {error && (
        <MessageBox variant="light">데이터를 불러오지 못했습니다.</MessageBox>
      )}
      {isLoading && (
        <SSectionBox>
          <Loader size={10} color="grayBorder" loading />
        </SSectionBox>
      )}
      {data && !error && (
        <RecommendationSlider
          recommendations={list}
          onSuccessClickWishButton={onSuccessClickWishButton}
          wishButton
        />
      )}
    </SSectionContainer>
  );
};

export default MostViewedRecommendations;
