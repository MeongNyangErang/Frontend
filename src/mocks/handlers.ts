import { http, HttpResponse } from 'msw';
import { SearchAccommodationsResponse } from '@typings/response/accommodations';
import { accommodationsData } from './data/accommodations';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.post(`${BASE_URL}/users/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    const userMember = {
      email: 'user123@test.com',
      password: 'user123#',
      data: {
        id: 'user-1',
        email: 'user123@test.com',
        role: 'user',
        status: 'active',
      },
    };

    if (email === userMember.email && password === userMember.password) {
      return HttpResponse.json(userMember.data);
    }

    return HttpResponse.json(
      {
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      },
      { status: 401 },
    );
  }),
  http.post(`${BASE_URL}/users/logout`, async () => {
    return HttpResponse.json({ message: '로그아웃 성공' });
  }),
  http.post(`${BASE_URL}/hosts/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    const hostMember = {
      email: 'host123@test.com',
      password: 'host123#',
      data: {
        id: 'host-1',
        email: 'host123@test.com',
        role: 'host',
        status: 'active',
      },
    };

    if (email === hostMember.email && password === hostMember.password) {
      return HttpResponse.json(hostMember.data);
    }

    return HttpResponse.json(
      {
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      },
      { status: 401 },
    );
  }),
  http.post(`${BASE_URL}/hosts/logout`, async () => {
    return HttpResponse.json({ message: '로그아웃 성공' });
  }),
  http.get(`${BASE_URL}/users/accommodations/search`, async () => {
    const mockData: SearchAccommodationsResponse = {
      code: 200,
      data: accommodationsData,
    };

    return HttpResponse.json(mockData);
  }),
  http.get(`${BASE_URL}/users/profile`, async () => {
    const userProfileData = {
      code: 200,
      data: {
        nickname: '유저123닉네임',
        profileImageUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      },
    };
    return HttpResponse.json(userProfileData);
  }),
  http.get(`${BASE_URL}/hosts/profile`, async () => {
    const userProfileData = {
      code: 200,
      data: {
        nickname: '호스트123닉네임',
        profileImageUrl: 'https://i.imgur.com/WrQthuy.jpeg',
        name: '홍길동',
        currentPhoneNumber: '01012345678',
      },
    };
    return HttpResponse.json(userProfileData);
  }),
];
