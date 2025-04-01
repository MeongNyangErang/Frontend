import { QUERY_KEYS } from '@constants/queryKeys';

const BASE = QUERY_KEYS.SEARCH.BASE;
const FILTER = QUERY_KEYS.SEARCH.FILTER;

export const getSearchQuery = (searchParams: URLSearchParams) => {
  return {
    [BASE.CHECK_IN_DATE]: searchParams.get(BASE.CHECK_IN_DATE) || '',
    [BASE.CHECK_OUT_DATE]: searchParams.get(BASE.CHECK_OUT_DATE) || '',
    [BASE.LOCATION]: searchParams.get(BASE.LOCATION) || '',
    [BASE.PEOPLE_COUNT]: searchParams.get(BASE.PEOPLE_COUNT) || '',
    [BASE.PET_COUNT]: searchParams.get(BASE.PET_COUNT) || '',
  };
};

export const getSearchFilter = (searchParams: URLSearchParams) => {
  return {
    [FILTER.ACCOMMODATION_TYPE]:
      searchParams.get(FILTER.ACCOMMODATION_TYPE) || '',
  };
};
