import { memo } from 'react';
import SearchBar from '@components/common/SearchBar';
import { SearchQuery } from '@typings/search';
import { SSectionContainer } from '@components/layouts/SectionLayout';
import { SHeaderWrap } from './styles';
import SearchControls from '../SearchControls';

interface SearchHeaderProps {
  currentQuery: SearchQuery;
  onOpenFilter(): void;
}

const SearchHeader = ({ currentQuery, onOpenFilter }: SearchHeaderProps) => {
  return (
    <SHeaderWrap>
      <SSectionContainer>
        <SearchBar currentQuery={currentQuery} />
        <SearchControls onOpenFilter={onOpenFilter} />
      </SSectionContainer>
    </SHeaderWrap>
  );
};

export default memo(SearchHeader);
