import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchBase, getSearchFilter } from '@utils/searchParams';
import ROUTES from '@constants/routes';
import { DEFAULT_SEARCH_QUERY } from '@constants/search';

const useSearchPage = () => {
  const [searchParams] = useSearchParams();
  const [currentQuery, setCurrentQuery] = useState(getSearchBase(searchParams));
  const [currentFilter, setCurrentFilter] = useState(
    getSearchFilter(searchParams),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.size === 0) {
      const params = new URLSearchParams();
      Object.entries(DEFAULT_SEARCH_QUERY).forEach(([k, v]) => {
        params.append(k, v);
      });
      navigate(`${ROUTES.search}?${params.toString()}`, { replace: true });
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.size === 0) return;

    setCurrentQuery(getSearchBase(searchParams));
    setCurrentFilter(getSearchFilter(searchParams));
  }, [searchParams]);

  return { searchParams, currentQuery, currentFilter };
};

export default useSearchPage;
