import { http, HttpResponse } from 'msw';

const ADMIN_BASE_URL = import.meta.env.VITE_API_ADMIN_BASE_URL;

export const handlers = [
  http.post(`${ADMIN_BASE_URL}/login`, async () => {
    return HttpResponse.json({
      accessToken: 123,
    });
  }),
];
