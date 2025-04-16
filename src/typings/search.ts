import { SEARCH_KEYS } from '@constants/searchKeys';
import { SINGLE_SELECT_FILTER_KEY } from '@constants/search';

type SearchBaseMap = typeof SEARCH_KEYS.BASE;
type SearchBaseKey = SearchBaseMap[keyof SearchBaseMap];

export type SearchBaseType = {
  [K in SearchBaseKey]: string;
};

type SearchFilterMap = typeof SEARCH_KEYS.FILTER;

export type SearchFilterKey = SearchFilterMap[keyof SearchFilterMap];

export type SingleSelectFilterKey = (typeof SINGLE_SELECT_FILTER_KEY)[number];

export type SearchFilterType = {
  [K in SearchFilterKey]: K extends SingleSelectFilterKey ? string : string[];
};
