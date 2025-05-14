export type AccommodationType =
  | 'HOTEL_RESORT'
  | 'DETACHED_HOUSE'
  | 'FULL_VILLA'
  | 'PENSION';

export interface Accommodation {
  accommodationId: number;
  accommodationName: string;
  wishlisted: boolean;
  thumbnailUrl: string;
  address: string;
  totalRating: number;
  price: number;
  accommodationType: AccommodationType;
  standardPeopleCount: number;
  standardPetCount: number;
  latitude: number;
  longitude: number;
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
