import { memo, RefObject } from 'react';
import { SearchViewProps } from '@typings/search';
import useSearchView from '@hooks/page/useSearchView';
import ListView from './ListView';
import MapView from './MapView';

type SearchResultProps = SearchViewProps & {
  headerHeight: number;
};

const SearchResult = ({ headerHeight, ...rest }: SearchResultProps) => {
  const { view } = useSearchView();

  return (
    <>
      {view === 'list' ? (
        <ListView {...rest} />
      ) : (
        <MapView headerHeight={headerHeight} {...rest} />
      )}
    </>
  );
};

export default memo(SearchResult);
