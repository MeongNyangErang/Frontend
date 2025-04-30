import { fetchCall } from '@admin/services/adminApi';
import { HostSignupRequestsResponse } from '@admin/typings/response/adminHostSignupResponse';

const getHostSignupRequests = async (page: number) => {
  return fetchCall<HostSignupRequestsResponse>(
    `hosts/pending?page=${page}`,
    'get',
  );
};

const getHostSignupRequestDetail = async (hostId: number) => {
  return fetchCall(`hosts/pending/${hostId}`, 'get');
};

const aproveHostSignupRequest = async (hostId: number) => {
  return fetchCall(`hosts/${hostId}/approve`, 'patch');
};

const rejectHostSignupRequest = async (hostId: number) => {
  return fetchCall(`hosts/${hostId}/reject`, 'delete');
};

export {
  getHostSignupRequests,
  getHostSignupRequestDetail,
  aproveHostSignupRequest,
  rejectHostSignupRequest,
};
