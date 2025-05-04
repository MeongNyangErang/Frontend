import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const usePaginationNavigator = (routeFn: (page: number) => string) => {
  const navigate = useNavigate();

  return useCallback((page: number) => {
    navigate(routeFn(page));
  }, []);
};

export default usePaginationNavigator;
