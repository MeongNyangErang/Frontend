import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QUERY_KEYS } from '@constants/queryKeys';
import { getBaseSearchState } from '@utils/searchParams';
import useToggleModal from '@hooks/ui/useToggleModal';
import SearchHeader from './SearchHeadear';
import SearchResult from './SearchResult';
import SearchFilter from './SearchFilter';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchState, setSearchState] = useState({
    base: getBaseSearchState(searchParams),
    filter: {},
  });
  const { isModalOpen, openModal, closeModal } = useToggleModal();

  useEffect(() => {
    setSearchState((prev) => ({
      ...prev,
      base: getBaseSearchState(searchParams),
    }));
  }, [searchParams]);

  return (
    <>
      <SearchHeader baseSearchState={searchState.base} />
      <button onClick={openModal}>filter</button>
      <SearchResult />
      <SearchFilter isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Search;
