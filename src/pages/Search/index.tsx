import { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { getSearchQuery, getSearchFilter } from '@utils/searchParams';
import useToggleModal from '@hooks/ui/useToggleModal';
import ROUTES from '@constants/routes';
import { DEFAULT_SEARCH_QUERY } from '@constants/search';
import SearchHeader from './SearchHeadear';
import SearchResult from './SearchResult';
import SearchFilter from './SearchFilter';
import SearchControls from './SearchControls';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [currentQuery, setCurrentQuery] = useState(
    getSearchQuery(searchParams),
  );
  const [currentFilter, setCurrentFilter] = useState(
    getSearchFilter(searchParams),
  );
  const { isModalOpen, openModal, closeModal } = useToggleModal();

  useEffect(() => {
    setCurrentQuery(getSearchQuery(searchParams));
    setCurrentFilter(getSearchFilter(searchParams));
    if (isModalOpen) {
      closeModal();
    }
  }, [searchParams]);

  if (searchParams.size === 0) {
    const params = new URLSearchParams();
    for (let key in DEFAULT_SEARCH_QUERY) {
      params.append(
        key,
        DEFAULT_SEARCH_QUERY[key as keyof typeof DEFAULT_SEARCH_QUERY],
      );
    }
    return <Navigate to={`${ROUTES.search}?${params.toString()}`} />;
  }

  return (
    <>
      <SearchHeader currentQuery={currentQuery} />
      <SearchControls onOpenFilter={openModal} />
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
