import { HostRequestItem, HostRequestDetail } from '../adminHostSignup';

interface HostSignupRequestsResponse {
  content: HostRequestItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

type HostSignupRequestDetailResponse = HostRequestDetail;

export { HostSignupRequestsResponse, HostSignupRequestDetailResponse };
