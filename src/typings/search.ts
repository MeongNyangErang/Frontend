import { QUERY_KEYS } from '@constants/queryKeys';

export type BaseSearchState = {
  [QUERY_KEYS.SEARCH.CHECK_IN_DATE]: string;
  [QUERY_KEYS.SEARCH.CHECK_OUT_DATE]: string;
  [QUERY_KEYS.SEARCH.LOCATION]: string;
  [QUERY_KEYS.SEARCH.PEOPLE_COUNT]: string;
  [QUERY_KEYS.SEARCH.PET_COUNT]: string;
};
