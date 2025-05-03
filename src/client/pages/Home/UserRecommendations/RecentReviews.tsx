import MessageBox from '@shared/components/common/MessageBox';
import Loader from '@shared/components/common/Loader';
import useRecentReviewList from '@hooks/query/user/useRecentReviewList';
import ReviewSlider from './ReviewSlider';

import { SSectionTitle, SSectionContainer, SSectionBox } from '../styles';

const RecentReviews = () => {
  const { data, isLoading, error } = useRecentReviewList();

  if (error) {
    return (
      <SSectionContainer>
        <SSectionTitle>최근 작성된 리뷰</SSectionTitle>
        <MessageBox variant="light">데이터를 불러오지 못했습니다.</MessageBox>
      </SSectionContainer>
    );
  }

  if (isLoading) {
    return (
      <SSectionContainer>
        <SSectionTitle>최근 작성된 리뷰</SSectionTitle>
        <SSectionBox>
          <Loader size={10} color="grayBorder" loading />
        </SSectionBox>
      </SSectionContainer>
    );
  }

  return (
    <SSectionContainer>
      <SSectionTitle>최근 작성된 리뷰</SSectionTitle>
      {data && <ReviewSlider reviews={data} />}
    </SSectionContainer>
  );
};

export default RecentReviews;
