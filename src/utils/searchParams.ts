import { QUERY_KEYS } from '@constants/queryKeys';
import { SINGLE_SELECT_FILTER_KEY } from '@constants/search';
import {
  SearchQuery,
  SearchFilterType,
  SearchFilterKey,
  SingleSelectFilterKey,
} from '@typings/search';

const BASE = QUERY_KEYS.SEARCH.BASE;
const FILTER = QUERY_KEYS.SEARCH.FILTER;

export const getSearchQuery = (searchParams: URLSearchParams) => {
  const searchQuery = {} as SearchQuery;

  for (let key in BASE) {
    const typedKey = BASE[key as keyof typeof BASE] as keyof SearchQuery;
    searchQuery[typedKey] = searchParams.get(key) || '';
  }

  return searchQuery;
};

export const getSearchFilter = (searchParams: URLSearchParams | null) => {
  const searchFilter = {} as SearchFilterType;

  const isSingleSelectKey = (
    key: SearchFilterKey,
  ): key is SingleSelectFilterKey => {
    return SINGLE_SELECT_FILTER_KEY.includes(key as SingleSelectFilterKey);
  };

  for (let key of Object.values(FILTER)) {
    const currentValue = searchParams?.get(key) || undefined;

    if (isSingleSelectKey(key)) {
      searchFilter[key] = currentValue || '';
    } else {
      searchFilter[key] = currentValue ? [currentValue] : [];
    }
  }

  return searchFilter;
};
