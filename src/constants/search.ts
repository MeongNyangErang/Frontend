import { QUERY_KEYS } from './queryKeys';

export const locations = [
  '서울',
  '제주',
  '부산',
  '인천',
  '여수',
  '강릉',
  '속초',
  '평창',
  '전주',
  '대구',
  '경주',
  '가평',
] as const;

export const FILTER_ITEMS = [
  {
    key: QUERY_KEYS.SEARCH.FILTER.ACCOMMODATION_TYPE,
    name: '숙소유형',
    options: ['호텔/리조트', '풀빌라', '펜션', '독채'],
    type: 'radio',
  },
] as const;
