import { SearchViewProps } from '@typings/search';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import useSearchWish from './useSearchWish';

const SearchMapView = ({ currentQuery, currentFilter }: SearchViewProps) => {
  const {
    results,
    currentPage,
    totalPages,
    hasNextPage,
    fetchNextPage,
    toggleWishStatus,
  } = useSearchAccommodations(currentQuery, currentFilter);

  const { wishError, resetWishError, handleClickWishButton } = useSearchWish();

  return <>s</>;
};

export default SearchMapView;
