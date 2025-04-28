import { SEARCH_KEYS } from '@constants/searchKeys';
import { SINGLE_SELECT_FILTER_KEY } from '@constants/search';
import {
  SearchBaseType,
  SearchFilterType,
  SearchFilterKey,
  SingleSelectFilterKey,
} from '@typings/search';

const BASE = SEARCH_KEYS.BASE;
const FILTER = SEARCH_KEYS.FILTER;

export const getSearchBase = (searchParams: URLSearchParams) => {
  const searchBase = {} as SearchBaseType;

  for (let key in BASE) {
    const typedKey = BASE[key as keyof typeof BASE];
    searchBase[typedKey] = searchParams.get(typedKey) || '';
  }
  return searchBase;
};

export const getSearchFilter = (searchParams: URLSearchParams | null) => {
  const searchFilter = {} as SearchFilterType;

  const isSingleSelectKey = (
    key: SearchFilterKey,
  ): key is SingleSelectFilterKey =>
    SINGLE_SELECT_FILTER_KEY.includes(key as SingleSelectFilterKey);

  for (let key of Object.values(FILTER)) {
    const currentValue = searchParams?.get(key) || undefined;

    if (isSingleSelectKey(key)) {
      searchFilter[key] = currentValue || '';
    } else {
      searchFilter[key] = currentValue ? currentValue.split(',') : [];
    }
  }

  return searchFilter;
};
