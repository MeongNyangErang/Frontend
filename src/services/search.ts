import { fetchCall } from './api';
import { SearchQuery, SearchFilterType } from '@typings/search';
import { SearchAccommodationsResponse } from '@typings/response/accommodations';

export const searchAccommodations = async (
  query: SearchQuery,
  cursor: number | null,
  filter?: SearchFilterType,
) => {
  const isFilterEmpty =
    !filter ||
    Object.values(filter).some((v) => {
      if (Array.isArray(v)) {
        return v.length === 0;
      }
      return v === '';
    });
  const queries = { ...query, ...(isFilterEmpty ? {} : filter) };
  const params = new URLSearchParams();
  for (let key in queries) {
    const typedKey = key as keyof typeof queries;
    const value = queries[typedKey];
    if (value && value.length > 0) {
      if (Array.isArray(value)) {
        value.forEach((el) => params.append(key, el));
      } else {
        params.append(key, value);
      }
    }
  }

  if (cursor) params.append('cursor', cursor.toString());
  const baseUrl = `users/accommodations/search?${params.toString()}`;

  return await fetchCall<SearchAccommodationsResponse>(baseUrl, 'get').then(
    (v) => v.data,
  );
};
