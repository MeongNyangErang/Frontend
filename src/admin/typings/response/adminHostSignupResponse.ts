import { HostRequestItem, HostRequestDetail } from '../adminHostSignup';

interface HostSignupRequestsResponse {
  code: number;
  data: {
    content: HostRequestItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

interface HostSignupRequestDetailResponse {
  code: number;
  data: HostRequestDetail;
}

export { HostSignupRequestsResponse, HostSignupRequestDetailResponse };
