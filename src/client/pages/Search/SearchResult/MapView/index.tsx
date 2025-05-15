import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchViewProps } from '@typings/search';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import ROUTES from '@constants/routes';
import useKakaoSearchMap from './useKakaoSearchMap';
import { SMapWrap, SMapContainer, SMoreAccommodationsButton } from './styles';

type MapViewProps = SearchViewProps & { headerHeight: number };

const MapView = ({
  headerHeight,
  currentQuery,
  currentFilter,
}: MapViewProps) => {
  const { results, currentPage, totalPages, fetchNextPage, toggleWishStatus } =
    useSearchAccommodations(currentQuery, currentFilter);
  const mapRef = useRef<HTMLDivElement>(null);
  const accommodations = useMemo(() => results, [results]);
  const navigate = useNavigate();
  const isMoreButtonActive =
    currentPage !== undefined && totalPages !== undefined;

  const handleClickCard = useCallback(
    (accommodationId: number) => {
      navigate(ROUTES.accommodationDetail.root(accommodationId), {
        state: {
          checkInDate: currentQuery.checkInDate,
          checkOutDate: currentQuery.checkOutDate,
          peopleCount: currentQuery.peopleCount,
          petCount: currentQuery.petCount,
        },
      });
    },
    [navigate, currentQuery],
  );

  useKakaoSearchMap({
    mapContainer: mapRef.current,
    accommodations,
    onClickCard: handleClickCard,
  });

  return (
    <SMapWrap $headerHeight={headerHeight}>
      <SMapContainer ref={mapRef} />
      <SMoreAccommodationsButton
        disabled={!isMoreButtonActive || currentPage + 1 >= totalPages}
        onClick={() => fetchNextPage()}
      >
        숙소 더 보기
        {isMoreButtonActive && (
          <span>
            {currentPage + 1}/{totalPages}
          </span>
        )}
      </SMoreAccommodationsButton>
    </SMapWrap>
  );
};

export default MapView;
