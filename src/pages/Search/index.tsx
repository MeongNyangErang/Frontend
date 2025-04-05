import { useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchQuery, getSearchFilter } from '@utils/searchParams';
import useToggleModal from '@hooks/ui/useToggleModal';
import SearchHeader from './SearchHeadear';
import SearchResult from './SearchResult';
import SearchFilter from './SearchFilter';
import SearchControls from './SearchControls';

const Search = () => {
  const [searchParams] = useSearchParams();
  const currentQueryRef = useRef(getSearchQuery(searchParams));
  const currentFilterRef = useRef(getSearchFilter(searchParams));
  const { isModalOpen, openModal, closeModal } = useToggleModal();

  useEffect(() => {
    currentQueryRef.current = getSearchQuery(searchParams);
    currentFilterRef.current = getSearchFilter(searchParams);

    if (isModalOpen) {
      closeModal();
    }
  }, [searchParams]);

  return (
    <>
      <SearchHeader currentQuery={currentQueryRef.current} />
      <SearchControls onOpenFilter={openModal} />
      <SearchResult
        currentQuery={currentQueryRef.current}
        currentFilter={currentFilterRef.current}
      />
      <SearchFilter
        isOpen={isModalOpen}
        onClose={closeModal}
        currentQuery={currentQueryRef.current}
        currentFilter={currentFilterRef.current}
      />
    </>
  );
};

export default Search;
