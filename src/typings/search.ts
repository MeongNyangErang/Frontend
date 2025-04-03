import { QUERY_KEYS } from '@constants/queryKeys';
import { SINGLE_SELECT_FILTER_KEY } from '@constants/search';

type SearchQueryMap = typeof QUERY_KEYS.SEARCH.BASE;
type SearchQueryKey = SearchQueryMap[keyof SearchQueryMap];

export type SearchQuery = {
  [K in SearchQueryKey]: string;
};

type SearchFilterMap = typeof QUERY_KEYS.SEARCH.FILTER;

export type SearchFilterKey = SearchFilterMap[keyof SearchFilterMap];

export type SingleSelectFilterKey = (typeof SINGLE_SELECT_FILTER_KEY)[number];

export type SearchFilterType = {
  [K in SearchFilterKey]: K extends SingleSelectFilterKey ? string : string[];
};
