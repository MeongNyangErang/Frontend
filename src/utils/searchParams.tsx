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
    searchQuery[key as keyof SearchQuery] = searchParams.get(key) || '';
  }

  return searchQuery;
};

export const getSearchFilter = (searchParams: URLSearchParams) => {
  const searchFilter = {} as SearchFilterType;

  const isSingleSelectKey = (
    key: SearchFilterKey,
  ): key is SingleSelectFilterKey => {
    return SINGLE_SELECT_FILTER_KEY.includes(key as SingleSelectFilterKey);
  };

  for (let key in FILTER) {
    const typedKey = key as SearchFilterKey;
    const currentValue = searchParams.get(typedKey);

    if (isSingleSelectKey(typedKey)) {
      searchFilter[typedKey] = currentValue || '';
    } else {
      searchFilter[typedKey] = currentValue ? [currentValue] : [];
    }
  }

  return searchFilter;
};
