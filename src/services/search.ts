import { fetchCall } from './api';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import {
  SearchAccommodationsResponse,
  SearchAccommodationsData,
} from '@typings/response/accommodations';
import { FILTER_VALUE_MAP } from '@constants/searchFilterMap';

export const searchAccommodations = async (
  query: SearchBaseType,
  cursor: number | null,
  filter?: SearchFilterType,
) => {
  const data = { ...query, ...(filter ? filter : {}) } as any;

  for (let i in data) {
    const value = data[i];
    if (!value) delete data[i];
  }

  const entries = Object.entries(data).map(([key, value]) => {
    const mapObj = FILTER_VALUE_MAP[key as keyof typeof FILTER_VALUE_MAP];
    if (mapObj) {
      if (Array.isArray(value)) {
        const mappedValue = value.map((v) => mapObj[v as keyof typeof mapObj]);
        return [key, mappedValue];
      } else {
        const mappedValue = mapObj[value as keyof typeof mapObj];
        return [key, mappedValue || ''];
      }
    }
    return [key, value];
  });
  const mappedData = Object.fromEntries(entries);
  if (cursor) data.cursor = cursor;

  return await fetchCall<SearchAccommodationsData>(
    'search/accommodations',
    'post',
    mappedData,
  );
};
