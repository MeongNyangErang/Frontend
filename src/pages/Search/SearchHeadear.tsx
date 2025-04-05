import { memo } from 'react';
import styled from 'styled-components';
import SearchBar from '@components/common/SearchBar';
import { SearchQuery } from '@typings/search';

interface Props {
  currentQuery: SearchQuery;
}

const SearchHeader = ({ currentQuery }: Props) => {
  return (
    <SSearchBarWrap>
      <SearchBar currentQuery={currentQuery} />
    </SSearchBarWrap>
  );
};

export default memo(SearchHeader);

const SSearchBarWrap = styled.div``;
