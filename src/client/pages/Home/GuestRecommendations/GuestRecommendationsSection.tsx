import { memo, useCallback, useEffect, useState } from 'react';
import { getMoreGuestRecommendations } from '@services/recommendations';
import { RecommendationsAccommodation } from '@typings/recommendations';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import { PET_TYPE_MAP_REVERSE } from '@constants/pet';
import { petType } from '.';
import RecommendationSlider from '../RecommendationSlider';

interface GuestRecommendationsSectionProps {
  petType: (typeof petType)[number];
  initialRecommendations: RecommendationsAccommodation[];
}

const MAX_INITIAL_DATA_SIZE = 6;

const GuestRecommendationsSection = ({
  petType,
  initialRecommendations,
}: GuestRecommendationsSectionProps) => {
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
      const type = PET_TYPE_MAP_REVERSE[petType];
      const {
        content,
        last,
        page: currentPage,
      } = await getMoreGuestRecommendations(type, page);
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
      last={last}
      isLoading={isLoading}
    />
  );
};

export default memo(GuestRecommendationsSection);
