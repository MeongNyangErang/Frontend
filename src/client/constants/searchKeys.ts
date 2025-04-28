export const SEARCH_KEYS = {
  BASE: {
    LOCATION: 'location',
    CHECK_IN_DATE: 'checkInDate',
    CHECK_OUT_DATE: 'checkOutDate',
    PEOPLE_COUNT: 'peopleCount',
    PET_COUNT: 'petCount',
  },
  FILTER: {
    ACCOMMODATION_TYPE: 'accommodationType',
    MIN_PRICE: 'minPrice',
    MAX_PRICE: 'maxPrice',
    MIN_RATING: 'minRating',
    PET_TYPE: 'allowPets',
    HASH_TAG: 'hashtags',
    ACCOMMODATION_FACILITIES: 'accommodationFacilities',
    ACCOMMODATION_PET_FACILITIES: 'accommodationPetFacilities',
    ROOM_FACILITIES: 'roomFacilities',
    ROOM_PET_FACILITIES: 'roomPetFacilities',
  },
} as const;
