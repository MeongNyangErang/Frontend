import { useEffect } from 'react';
import useSearchPage from '@hooks/page/useSearchPage';
import useToggleModal from '@hooks/ui/useToggleModal';
import SearchHeader from './SearchHeader';
import SearchResult from './SearchResult';
import SearchFilter from './SearchFilter';

const Search = () => {
  const { searchParams, currentQuery, currentFilter } = useSearchPage();
  const { isModalOpen, openModal, closeModal } = useToggleModal();

  useEffect(() => {
    if (isModalOpen) closeModal();
  }, [searchParams]);

  return (
    <>
      <SearchHeader currentQuery={currentQuery} onOpenFilter={openModal} />
      <SearchResult currentQuery={currentQuery} currentFilter={currentFilter} />
      <SearchFilter
        isOpen={isModalOpen}
        onClose={closeModal}
        currentQuery={currentQuery}
        currentFilter={currentFilter}
      />
    </>
  );
};

export default Search;
