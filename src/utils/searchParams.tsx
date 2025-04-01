import { QUERY_KEYS } from '@constants/queryKeys';

export const getBaseSearchState = (searchParams: URLSearchParams) => {
  return {
    [QUERY_KEYS.SEARCH.CHECK_IN_DATE]:
      searchParams.get(QUERY_KEYS.SEARCH.CHECK_IN_DATE) || '',
    [QUERY_KEYS.SEARCH.CHECK_OUT_DATE]:
      searchParams.get(QUERY_KEYS.SEARCH.CHECK_OUT_DATE) || '',
    [QUERY_KEYS.SEARCH.LOCATION]:
      searchParams.get(QUERY_KEYS.SEARCH.LOCATION) || '',
    [QUERY_KEYS.SEARCH.PEOPLE_COUNT]:
      searchParams.get(QUERY_KEYS.SEARCH.PEOPLE_COUNT) || '',
    [QUERY_KEYS.SEARCH.PET_COUNT]:
      searchParams.get(QUERY_KEYS.SEARCH.PET_COUNT) || '',
  };
};
