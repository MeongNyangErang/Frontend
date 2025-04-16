export type AccommodationType =
  | 'HOTELRESORT'
  | 'DETACHEDHOUSE'
  | 'FULLVILLA'
  | 'PENSION';

export interface Accommodation {
  accommodationId: number;
  accommodationName: string;
  thumbnailUrl: string;
  address: string;
  totalRating: number;
  price: number;
  accommodationType: AccommodationType;
  standardPeopleCount: number;
  standardPetCount: number;
}

export interface SearchAccommodationsData {
  content: Accommodation[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface SearchAccommodationsResponse {
  code: number;
  data: SearchAccommodationsData;
}
