import { memo } from 'react';
import { FaFilter, FaMap, FaList } from 'react-icons/fa';
import useSearchView from '@hooks/page/useSearchView';
import { SSearchControlsContainer, SFilterButton, SViewButton } from './styles';

interface SearchControlsProps {
  isFiltered: boolean;
  onOpenFilter(): void;
}

const SearchControls = ({ onOpenFilter, isFiltered }: SearchControlsProps) => {
  const { view, toggleSearchView } = useSearchView();

  return (
    <SSearchControlsContainer>
      <SFilterButton
        className={isFiltered ? 'is--active' : ''}
        onClick={onOpenFilter}
      >
        <FaFilter /> 필터
      </SFilterButton>
      <SViewButton onClick={toggleSearchView}>
        {view === 'list' ? (
          <>
            지도 보기
            <FaMap />
          </>
        ) : (
          <>
            목록 보기
            <FaList />
          </>
        )}
      </SViewButton>
    </SSearchControlsContainer>
  );
};

export default memo(SearchControls);
