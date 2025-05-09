import { memo, useEffect } from 'react';
import SearchBar from '@components/common/SearchBar';
import { SearchBaseType } from '@typings/search';
import useMediaQuery from '@hooks/ui/useMediaQuery';
import { BREAK_POINTS } from '@shared/components/styles/responsive';
import useToggleModal from '@shared/hooks/ui/useToggleModal';
import { SHeaderWrap, SHeaderContainer, SOverlay } from './styles';
import SearchSummary from '../SearchSummary';

interface SearchHeaderProps {
  currentQuery: SearchBaseType;
}

const SearchHeader = ({ currentQuery }: SearchHeaderProps) => {
  const isTablet = useMediaQuery(`(max-width:${BREAK_POINTS.tablet})`);
  const { isModalOpen, openModal, closeModal } = useToggleModal();

  useEffect(() => {
    if (!isTablet) {
      closeModal();
    }
  }, [isTablet]);

  if (!isTablet) {
    return (
      <SHeaderWrap>
        <SHeaderContainer>
          <SearchBar currentQuery={currentQuery} />
        </SHeaderContainer>
      </SHeaderWrap>
    );
  }

  return (
    <>
      <SHeaderWrap>
        <SHeaderContainer>
          <SearchSummary currentQuery={currentQuery} onClick={openModal} />
        </SHeaderContainer>
      </SHeaderWrap>
      {isModalOpen && <SOverlay />}
    </>
  );
};

export default memo(SearchHeader);
