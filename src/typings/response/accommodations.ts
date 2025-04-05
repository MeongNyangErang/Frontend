export type AccommodationType =
  | 'HOTELRESORT'
  | 'DETACHEDHOUSE'
  | 'FULLVILLA'
  | 'PENSION';

export interface Accommodation {
  accommodationId: number;
  name: string;
  thumbnailImageUrl: string;
  totalRating: number;
  minPrice: number;
  type: AccommodationType;
}

export interface SearchAccommodationsData {
  content: Accommodation[];
  nextCursor: number;
  hasNext: boolean;
}

export interface SearchAccommodationsResponse {
  code: number;
  data: SearchAccommodationsData;
}
