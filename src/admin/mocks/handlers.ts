import { http, HttpResponse } from 'msw';
import { hostSignupDetail, hostSignupList } from './data/hostSignup';

const ADMIN_BASE_URL = import.meta.env.VITE_API_ADMIN_BASE_URL;

export const handlers = [
  http.post(`${ADMIN_BASE_URL}/login`, async () => {
    return HttpResponse.json({
      accessToken: 123,
    });
  }),

  http.get(`${ADMIN_BASE_URL}/hosts/pending`, async () => {
    const response = {
      code: 200,
      data: {
        content: hostSignupList,
        page: 0,
        size: 6,
        totalElements: 12,
        totalPages: 2,
        first: true,
        last: false,
      },
    };

    return HttpResponse.json(response);
  }),

  http.get(`${ADMIN_BASE_URL}/hosts/pending/:hostId`, async () => {
    const response = {
      code: 200,
      data: hostSignupDetail,
    };
    return HttpResponse.json(response);
  }),
];
