import { http, HttpResponse } from 'msw';
import { SearchAccommodationsResponse } from '@typings/response/accommodations';
import { ReservationStatus } from '@typings/reservation';
import { accommodationsData } from './data/accommodations';
import {
  reservedReservations,
  canceledReservations,
  completedReservations,
} from './data/userReservationList';
import { userReviews } from './data/userReviews';

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
  http.get(`${BASE_URL}/users/pets`, async () => {
    const petListData = {
      code: 200,
      data: [
        {
          petId: 123,
          name: '콩',
          birthDate: '2013-10-14',
          type: 'SMALL_DOG',
          personality: 'INTROVERT',
          activityLevel: 'HIGH',
        },
        {
          petId: 1234,
          name: '솜',
          birthDate: '2016-10-14',
          type: 'CAT',
          personality: 'INTROVERT',
          activityLevel: 'LOW',
        },
        {
          petId: 12345,
          name: '라떼',
          birthDate: '2020-10-14',
          type: 'MEDIUM_DOG',
          personality: 'EXTROVERT',
          activityLevel: 'MEDIUM',
        },
      ],
    };

    return HttpResponse.json(petListData);
  }),
  http.post(`${BASE_URL}/users/pets`, async () => {
    return HttpResponse.json({ message: '반려동물 등록 성공' });
  }),
  http.put(`${BASE_URL}/users/pets/:petId`, async () => {
    return HttpResponse.json({ message: '반려동물 정보 수정 성공' });
  }),
  http.delete(`${BASE_URL}/users/pets/:petId`, async () => {
    return HttpResponse.json({ message: '반려동물 정보 삭제 성공' });
  }),
  http.get(`${BASE_URL}/users/reservations`, async ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') as ReservationStatus;

    let content;
    switch (status) {
      case 'reserved':
        content = reservedReservations;
        break;
      case 'completed':
        content = completedReservations;
        break;
      case 'canceled':
        content = canceledReservations;
        break;
      default:
        throw new Error('잘못된 status 입니다.');
    }

    const data = {
      code: 200,
      content,
      cursor: Math.ceil(Math.random() * 100),
      hasNext: true,
    };

    return HttpResponse.json(data);
  }),
  http.patch(
    `${BASE_URL}/users/reservations/:reservationId/cancel`,
    async () => {
      return HttpResponse.json({ message: '예약 취소 성공' });
    },
  ),
  http.post(`${BASE_URL}/users/reviews`, async () => {
    return HttpResponse.json({ message: '리뷰 등록 성공' });
  }),
  http.get(`${BASE_URL}/users/reviews`, async () => {
    const data = {
      code: 200,
      content: userReviews,
      cursor: Math.ceil(Math.random() * 100),
      hasNext: true,
    };
    return HttpResponse.json(data);
  }),
  http.put(`${BASE_URL}/users/reviews/:reviewId`, async () => {
    return HttpResponse.json({ message: '리뷰 수정 성공' });
  }),
  http.delete(`${BASE_URL}/users/reviews/:reviewId`, async () => {
    console.log('working');
    return HttpResponse.json({ message: '리뷰 삭제 성공' });
  }),
];
