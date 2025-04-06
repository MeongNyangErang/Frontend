export const ACCOMMODATION_TAGS = [
  '가족여행',
  '스파',
  '풀빌라',
  '오션뷰',
  '파티룸',
  '아늑한',
  '모던한',
  '금연숙소',
  '포레스트뷰',
  '감성숙소',
] as const;

export const GENERAL_FACILITY = {
  ACCOMMODATION: [
    '편의점',
    '공용 수영장',
    '공용 바비큐',
    '피트니스',
    '노래방',
    '와이파이',
    '무료주차',
    '유료주차',
    '조식',
    '픽업서비스',
    '족구장',
  ],
  ROOM: [
    '스타일러',
    '냉장고',
    '전기밥솥',
    '샤워실',
    '에어컨',
    'TV',
    '와이파이',
    '욕실용품',
    '드라이기',
    '바비큐',
    '객실 내 취사',
  ],
} as const;

export const PET_FACILITY = {
  ACCOMMODATION: [
    '대형 운동장',
    '전용 마당',
    '놀이터',
    '샤워장',
    '수영장',
    '펜스 설치 공간',
    '돌봄 서비스',
    '펫 푸드 제공',
    '인근 동물병원',
  ],
  ROOM: [
    '식기',
    '배변 용품',
    '장난감',
    '침대',
    '드라이룸',
    '미끄럼 방지 바닥',
    '펜스 설치 공간',
    '캣 타워',
    '캣휠',
    '빗',
    '강아지 계단',
  ],
} as const;

export const ACCOMMODATION_TYPE_MAP = {
  HOTELRESORT: '호텔/리조트',
  DETACHEDHOUSE: '독채',
  FULLVILLA: '풀빌라',
  PENSION: '펜션',
} as const;
