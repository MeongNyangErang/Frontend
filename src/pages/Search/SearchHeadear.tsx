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

export default SearchHeader;

const SSearchBarWrap = styled.div`
  margin-bottom: 20px;
`;
