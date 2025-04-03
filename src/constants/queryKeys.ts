export const QUERY_KEYS = {
  SEARCH: {
    BASE: {
      LOCATION: 'location',
      CHECK_IN_DATE: 'checkInDate',
      CHECK_OUT_DATE: 'checkOutDate',
      PEOPLE_COUNT: 'peopleCount',
      PET_COUNT: 'petCount',
    },
    FILTER: {
      ACCOMMODATION_TYPE: 'accomodationType',
      USER_RATING: 'userRating',
      PET_TYPE: 'petTYPE',
    },
  },
} as const;
