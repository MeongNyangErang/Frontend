import { BsFire } from 'react-icons/bs';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import useMostViewedRecommendations from '@hooks/query/user/useMostViewedRecommendations';
import RecommendationSlider from '../RecommendationSlider';
import { SSectionTitle, SSectionContainer, SSectionBox } from '../styles';

const MostViewedRecommendations = () => {
  const {
    data: { data } = {},
    isLoading,
    error,
  } = useMostViewedRecommendations();

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
      {data && !error && <RecommendationSlider recommendations={data} />}
    </SSectionContainer>
  );
};

export default MostViewedRecommendations;
