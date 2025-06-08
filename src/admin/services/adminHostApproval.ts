import {
  HostSignupRequestsResponse,
  HostSignupRequestDetailResponse,
} from '@admin/typings/response/adminHostSignupResponse';
import { fetchCall } from './adminApiClient';

const getHostSignupRequests = async (page: number) => {
  return fetchCall<HostSignupRequestsResponse>(
    `hosts/pending?page=${page}`,
    'get',
  );
};

const getHostSignupRequestDetail = async (hostId: number) => {
  return fetchCall<HostSignupRequestDetailResponse>(
    `hosts/pending/${hostId}`,
    'get',
  );
};

const approveHostSignupRequest = async (hostId: number) => {
  return fetchCall(`hosts/${hostId}/approve`, 'patch');
};

const rejectHostSignupRequest = async (hostId: number) => {
  return fetchCall(`hosts/${hostId}/reject`, 'delete');
};

export {
  getHostSignupRequests,
  getHostSignupRequestDetail,
  approveHostSignupRequest,
  rejectHostSignupRequest,
};
