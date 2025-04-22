import { memo, useCallback, useEffect, useState } from 'react';
import { getMoreUserRecommendations } from '@services/recommendations';
import { RecommendationsAccommodation } from '@typings/recommendations';
import useIsLoading from '@hooks/ui/useIsLoading';
import RecommendationSlider from '../RecommendationSlider';

interface UserPetRecommendationSectionProps {
  initialRecommendations: RecommendationsAccommodation[];
  petId: number;
}

const MAX_INITIAL_DATA_SIZE = 6;

const UserPetRecommendationSection = ({
  initialRecommendations,
  petId,
}: UserPetRecommendationSectionProps) => {
  const [recommendations, setRecommendations] = useState(
    initialRecommendations,
  );
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [hasMoreFetched, setHasMoreFetched] = useState(false);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();

  const onClickMore = useCallback(async () => {
    if (last || isLoading) return;

    startIsLoading();

    try {
      const {
        content,
        last,
        page: currentPage,
      } = await getMoreUserRecommendations(petId, page);
      setRecommendations((prev) => [...prev, ...content]);
      setHasMoreFetched(true);
      setLast(last);
      setPage(currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      endIsLoading();
    }
  }, [last, isLoading]);

  const onSuccessClickWishButton = useCallback((accommodationId: number) => {
    setRecommendations((prev) => {
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
  }, []);

  useEffect(() => {
    if (!hasMoreFetched) {
      setRecommendations(initialRecommendations);
      const legnth = initialRecommendations.length;
      if (legnth < MAX_INITIAL_DATA_SIZE) {
        setLast(true);
      } else {
        setLast(false);
        setPage(0);
      }
    }
  }, [initialRecommendations]);

  return (
    <RecommendationSlider
      recommendations={recommendations}
      onClickMore={onClickMore}
      onSuccessClickWishButton={onSuccessClickWishButton}
      last={last}
      isLoading={isLoading}
    />
  );
};

export default memo(UserPetRecommendationSection);
