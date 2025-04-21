import { memo } from 'react';
import SearchBar from '@components/common/SearchBar';
import { SearchBaseType } from '@typings/search';
import { SHeaderWrap, SHeaderContainer } from './styles';
import SearchControls from '../SearchControls';

interface SearchHeaderProps {
  currentQuery: SearchBaseType;
  onOpenFilter(): void;
}

const SearchHeader = ({ currentQuery, onOpenFilter }: SearchHeaderProps) => {
  return (
    <>
      <SHeaderWrap>
        <SHeaderContainer>
          <SearchBar currentQuery={currentQuery} />
        </SHeaderContainer>
      </SHeaderWrap>
      <SHeaderWrap>
        <SHeaderContainer>
          <SearchControls onOpenFilter={onOpenFilter} />
        </SHeaderContainer>
      </SHeaderWrap>
    </>
  );
};

export default memo(SearchHeader);
