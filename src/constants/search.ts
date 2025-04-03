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

export const initialFilterState = {
  [QUERY_KEYS.SEARCH.FILTER.ACCOMMODATION_TYPE]: '',
} as const;

export const SEARCH_FILTER_ITEMS = [
  {
    key: QUERY_KEYS.SEARCH.FILTER.ACCOMMODATION_TYPE,
    name: '숙소유형',
    options: ['호텔/리조트', '풀빌라', '펜션', '독채'],
    type: 'radio',
  },
  {
    key: QUERY_KEYS.SEARCH.FILTER.USER_RATING,
    name: '사용자 평점',
    options: ['3', '3.5', '4', '4.5'],
    type: 'radio',
  },
  {
    key: QUERY_KEYS.SEARCH.FILTER.PET_TYPE,
    name: '수용 가능 반려동물',
    options: ['고양이', '소형견', '중형견', '대형견'],
    type: 'square',
  },
] as const;

export const SINGLE_SELECT_FILTER_KEY = [
  QUERY_KEYS.SEARCH.FILTER.ACCOMMODATION_TYPE,
  QUERY_KEYS.SEARCH.FILTER.USER_RATING,
] as const;
