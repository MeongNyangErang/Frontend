import { QUERY_KEYS } from '@constants/queryKeys';

export interface SearchQuery {
  [QUERY_KEYS.SEARCH.BASE.CHECK_IN_DATE]: string;
  [QUERY_KEYS.SEARCH.BASE.CHECK_OUT_DATE]: string;
  [QUERY_KEYS.SEARCH.BASE.LOCATION]: string;
  [QUERY_KEYS.SEARCH.BASE.PEOPLE_COUNT]: string;
  [QUERY_KEYS.SEARCH.BASE.PET_COUNT]: string;
}

export interface SearchFilterType {
  [QUERY_KEYS.SEARCH.FILTER.ACCOMMODATION_TYPE]: string;
}
