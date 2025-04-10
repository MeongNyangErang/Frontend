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

  // 객실 목록
  http.get(`${BASE_URL}/register/roomList`, async () => {
    const roomListData = {
      code: 200,
      data: [
        {
          roomId: '1',
          name: '해변 근처 럭셔리 리조트',
          description:
            '바다 전망을 즐길 수 있는 고급 리조트입니다. 가족 단위 여행에 적합합니다.',
          price: 150000,
          thumbnailUrl: 'https://i.imgur.com/WrQthuy.jpeg',
          standardPeopleCount: 3,
          maxPeopleCount: 8,
          standardPetCount: 2,
          maxPetCount: 5,
        },
      ],
    };
    return HttpResponse.json(roomListData);
  }),

  // 예약 페이지
  http.post(
    `${BASE_URL}/accommodation/:accommodationId/reservation`,
    async () => {
      return HttpResponse.json({ message: '예약이 완료되었습니다' });
    },
  ),

  http.post(`${BASE_URL}/register/accommodation`, async () => {
    return HttpResponse.json({ message: '숙소 등록이 완료되었습니다' });
  }),
  http.put(`${BASE_URL}/register/accommodation`, async () => {
    return HttpResponse.json({ message: '숙소 정보가 업데이트되었습니다' });
  }),
  http.get(`${BASE_URL}/register/accommodation`, async () => {
    const accommodationData = {
      code: 200,
      id: '1',
      name: '서울 중심가 호텔 리조트',
      type: '호텔 리조트',
      description: '서울 중심가에 위치한 최고급 호텔 리조트입니다.',
      address: {
        area: '서울특별시',
        town: '강남구',
      },
      detailedAddress: '서울특별시 강남구 테헤란로 100',
      latitude: 37.5665,
      longitude: 126.978,
      facilityTypes: ['편의점', '공용 수영장', '피트니스'],
      petFacilityTypes: ['대형 운동장', '전용 마당'],
      allowPetTypes: ['소형견', '고양이'],
      thumbnail: 'https://example.com/images/thumbnail1.jpg',
      additionalImages: ['https://example.com/images/additional1.jpg'],
    };
    return HttpResponse.json(accommodationData);
  }),
];
