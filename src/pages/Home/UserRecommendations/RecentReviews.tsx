import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import useRecentReviewList from '@hooks/query/user/useRecentReviewList';
import ReviewSlider from './ReviewSlider';

import { SSectionTitle, SSectionContainer, SSectionBox } from '../styles';

const RecentReviews = () => {
  const { data: { data } = {}, isLoading, error } = useRecentReviewList();
  return (
    <SSectionContainer>
      <SSectionTitle>최근 작성된 리뷰</SSectionTitle>
      {error && (
        <MessageBox variant="light">데이터를 불러오지 못했습니다.</MessageBox>
      )}
      {isLoading && (
        <SSectionBox>
          <Loader size={10} color="grayBorder" loading />
        </SSectionBox>
      )}
      {data && !error && <ReviewSlider reviews={data} />}
    </SSectionContainer>
  );
};

export default RecentReviews;
