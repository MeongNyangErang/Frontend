import { memo } from 'react';
import { SearchViewProps } from '@typings/search';
import useSearchView from '@hooks/page/useSearchView';
import SearchListView from './SearchListView';
import SearchMapView from './SearchMapView';

const SearchResult = (searchResultProps: SearchViewProps) => {
  const { view } = useSearchView();

  return (
    <>
      {view === 'list' ? (
        <SearchListView {...searchResultProps} />
      ) : (
        <SearchMapView {...searchResultProps} />
      )}
    </>
  );
};

export default memo(SearchResult);
