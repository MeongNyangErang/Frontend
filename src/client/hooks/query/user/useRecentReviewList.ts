import { useQuery } from '@tanstack/react-query';
import { getRecentReviewList } from '@services/recommendations';

const useRecentReviewList = () => {
  return useQuery({
    queryKey: ['recent-review-list'],
    queryFn: () => getRecentReviewList(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useRecentReviewList;
