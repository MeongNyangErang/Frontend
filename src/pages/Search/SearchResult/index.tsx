import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import { SearchQuery, SearchFilterType } from '@typings/search';

interface Props {
  currentQuery: SearchQuery;
  currentFilter: SearchFilterType;
}

const SearchResult = ({ currentQuery, currentFilter }: Props) => {
  const { data, isLoading, error } = useSearchAccommodations(
    currentQuery,
    currentFilter,
  );
  console.log(data, isLoading, error);
  if (isLoading) {
    return <>loading...</>;
  }
  if (error) {
    return <>error occurred</>;
  }
  return (
    <>
      {data?.content.map(
        ({
          accommodationId,
          name,
          thumbnailImageUrl,
          totalRating,
          minPrice,
        }) => <div key={accommodationId}>{name}</div>,
      )}
    </>
  );
};

export default SearchResult;
