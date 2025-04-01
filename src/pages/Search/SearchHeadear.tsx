import styled from 'styled-components';
import SearchBar from '@components/common/SearchBar';
import { BaseSearchState } from '@typings/search';

interface Props {
  baseSearchState: BaseSearchState;
}

const SearchHeader = ({ baseSearchState }: Props) => {
  return (
    <SSearchBarWrap>
      <SearchBar baseSearchState={baseSearchState} />
    </SSearchBarWrap>
  );
};

export default SearchHeader;

const SSearchBarWrap = styled.div`
  margin-bottom: 20px;
`;
