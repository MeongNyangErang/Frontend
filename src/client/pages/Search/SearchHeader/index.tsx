import { memo, RefObject, useEffect } from 'react';
import SearchBar from '@components/common/SearchBar';
import { SearchBaseType } from '@typings/search';
import useMediaQuery from '@hooks/ui/useMediaQuery';
import useClickOutside from '@hooks/ui/useClickOutside';
import { BREAK_POINTS } from '@shared/components/styles/responsive';
import { SHeaderWrap, SHeaderContainer, SOverlay } from './styles';
import SearchSummary from '../SearchSummary';
import SearchControls from '../SearchControls';

interface SearchHeaderProps {
  currentQuery: SearchBaseType;
  onOpenFilter: () => void;
  isFiltered: boolean;
  headerRef: RefObject<HTMLDivElement>;
}

const SearchHeader = ({
  currentQuery,
  headerRef,
  ...rest
}: SearchHeaderProps) => {
  const isTablet = useMediaQuery(`(max-width:${BREAK_POINTS.tablet})`);
  const { isOpen, targetRef, toggleIsOpen } = useClickOutside();

  useEffect(() => {
    if (isOpen) {
      toggleIsOpen();
    }
  }, [currentQuery]);

  if (!isTablet) {
    return (
      <SHeaderWrap ref={headerRef}>
        <SHeaderContainer>
          <SearchBar currentQuery={currentQuery} />
        </SHeaderContainer>
        <SHeaderContainer>
          <SearchControls {...rest} />
        </SHeaderContainer>
      </SHeaderWrap>
    );
  }

  return (
    <>
      {!isOpen && (
        <SHeaderWrap ref={headerRef}>
          <SHeaderContainer>
            <SearchSummary currentQuery={currentQuery} onClick={toggleIsOpen} />
          </SHeaderContainer>
          <SHeaderContainer>
            <SearchControls {...rest} />
          </SHeaderContainer>
        </SHeaderWrap>
      )}
      {isOpen && (
        <>
          <div ref={headerRef}>
            <SHeaderWrap ref={targetRef}>
              <SHeaderContainer>
                <SearchBar currentQuery={currentQuery} />
              </SHeaderContainer>
            </SHeaderWrap>
            <SOverlay />
          </div>
        </>
      )}
    </>
  );
};

export default memo(SearchHeader);
