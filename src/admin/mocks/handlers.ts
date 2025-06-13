import { http, HttpResponse } from 'msw';
import { notices } from '@shared/mocks/data/notices';
import { noticeDetail } from '@shared/mocks/data/noticeDetail';
import { hostSignupDetail, hostSignupList } from './data/hostSignupList';
import { reportList } from './data/reportList';

const ADMIN_BASE_URL = import.meta.env.VITE_API_ADMIN_BASE_URL;
const CLIENT_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.post(`${ADMIN_BASE_URL}/login`, async () => {
    return HttpResponse.json({
      accessToken: 123,
      refreshToken: 2456,
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

  http.get(`${ADMIN_BASE_URL}/reports/review`, async () => {
    const response = {
      code: 200,
      data: {
        content: reportList,
        page: 0,
        size: 20,
        totalElements: 30,
        totalPages: 2,
        first: true,
        last: false,
      },
    };
    return HttpResponse.json(response);
  }),

  http.get(`${CLIENT_BASE_URL}/notices`, async () => {
    const response = {
      code: 200,
      data: notices,
      page: 0,
      size: 20,
      totalElements: 22,
      tatalPages: 2,
      first: true,
      last: false,
    };

    return HttpResponse.json(response);
  }),

  http.get(`${CLIENT_BASE_URL}/notices/:noticeId`, async () => {
    const response = {
      code: 200,
      data: noticeDetail,
    };

    return HttpResponse.json(response);
  }),
];
