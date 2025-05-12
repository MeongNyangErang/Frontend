import { SearchViewProps } from '@typings/search';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import useSearchWish from '../useSearchWish';
import { SMapWrap, SMapContainer } from './styles';
import { RefObject } from 'react';

type MapViewProps = SearchViewProps & { headerHeight: number };

const MapView = ({
  headerHeight,
  currentQuery,
  currentFilter,
}: MapViewProps) => {
  const {
    results,
    currentPage,
    totalPages,
    hasNextPage,
    fetchNextPage,
    toggleWishStatus,
  } = useSearchAccommodations(currentQuery, currentFilter);

  const { wishError, resetWishError, handleClickWishButton } = useSearchWish();

  return (
    <SMapWrap $headerHeight={headerHeight}>
      <SMapContainer>d</SMapContainer>
    </SMapWrap>
  );
};

export default MapView;
