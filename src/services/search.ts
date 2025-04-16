import { fetchCall } from './api';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import { SearchAccommodationsResponse } from '@typings/response/accommodations';
import { FILTER_VALUE_MAP } from '@constants/searchFilterMap';

export const searchAccommodations = async (
  query: SearchBaseType,
  cursor: number | null,
  filter?: SearchFilterType,
) => {
  const data = { ...query, ...(filter ? filter : {}) } as any;
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

  const blob = new Blob([JSON.stringify(mappedData)], {
    type: 'application/json',
  });
  const formData = new FormData();
  formData.append('request', blob);

  return await fetchCall<SearchAccommodationsResponse>(
    'search/accommodations',
    'post',
    formData,
  ).then((v) => v.data);
};
