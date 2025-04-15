import { formatDate } from '@utils/date';
import { ACCOMMODATION_TAGS } from './accommodation';
import { SEARCH_KEYS } from './searchKeys';

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
  [SEARCH_KEYS.FILTER.ACCOMMODATION_TYPE]: '',
} as const;

export const SEARCH_FILTER_ITEMS = [
  {
    category: '동반 반려동물',
    key: SEARCH_KEYS.FILTER.PET_TYPE,
    name: '동반 반려동물',
    options: ['고양이', '소형견', '중형견', '대형견'],
    type: 'squareFixed',
  },
  {
    category: '숙소유형',
    key: SEARCH_KEYS.FILTER.ACCOMMODATION_TYPE,
    name: '숙소유형',
    options: ['호텔/리조트', '풀빌라', '펜션', '독채'],
    type: 'radio',
  },
  {
    category: '사용자 평점',
    key: SEARCH_KEYS.FILTER.USER_RATING,
    name: '사용자 평점',
    options: ['3', '3.5', '4', '4.5'],
    type: 'radio',
  },
  {
    category: '#특징',
    key: SEARCH_KEYS.FILTER.TAG,
    name: '#특징',
    options: ACCOMMODATION_TAGS,
    type: 'capsule',
  },
] as const;

export const SINGLE_SELECT_FILTER_KEY = [
  SEARCH_KEYS.FILTER.ACCOMMODATION_TYPE,
  SEARCH_KEYS.FILTER.USER_RATING,
] as const;

export const FILTER_CATEGORIES = [
  '동반 반려동물',
  '숙소유형',
  '가격',
  '사용자 평점',
  '#특징',
  '시설/서비스',
] as const;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export const DEFAULT_SEARCH_QUERY = {
  [SEARCH_KEYS.BASE.CHECK_IN_DATE]: formatDate(today),
  [SEARCH_KEYS.BASE.CHECK_OUT_DATE]: formatDate(tomorrow),
  [SEARCH_KEYS.BASE.LOCATION]: '제주',
  [SEARCH_KEYS.BASE.PEOPLE_COUNT]: '1',
  [SEARCH_KEYS.BASE.PET_COUNT]: '1',
};
