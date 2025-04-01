import { useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchQuery, getSearchFilter } from '@utils/searchParams';
import useToggleModal from '@hooks/ui/useToggleModal';
import SearchHeader from './SearchHeadear';
import SearchResult from './SearchResult';
import SearchFilter from './SearchFilter';

const Search = () => {
  const [searchParams] = useSearchParams();
  const currentQuery = useRef(getSearchQuery(searchParams));
  const currentFilterRef = useRef(getSearchFilter(searchParams));
  const { isModalOpen, openModal, closeModal } = useToggleModal();

  useEffect(() => {
    currentQuery.current = getSearchQuery(searchParams);
    currentFilterRef.current = getSearchFilter(searchParams);
  }, [searchParams]);

  return (
    <>
      <SearchHeader currentQuery={currentQuery.current} />
      <button onClick={openModal}>filter</button>
      <SearchResult />
      <SearchFilter
        isOpen={isModalOpen}
        onClose={closeModal}
        currentFilter={currentFilterRef.current}
      />
    </>
  );
};

export default Search;
