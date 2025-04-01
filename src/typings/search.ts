import { QUERY_KEYS } from '@constants/queryKeys';

type SearchQueryMap = typeof QUERY_KEYS.SEARCH.BASE;
type SearchQueryKey = SearchQueryMap[keyof SearchQueryMap];

export type SearchQuery = {
  [K in SearchQueryKey]: string;
};

type SearchFilterMap = typeof QUERY_KEYS.SEARCH.FILTER;
export type SearchFilterKey = SearchFilterMap[keyof SearchFilterMap];

export type SearchFilterType = {
  [K in SearchFilterKey]: string;
};
