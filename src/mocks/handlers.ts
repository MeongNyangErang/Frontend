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
  http.get(`${BASE_URL}/register/roomList`, async () => {
    const roomListData = {
      code: 200,
      data: [
        {
          roomId: 1,
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
      nextCursor: '1',
      hasNext: true,
    };
    return HttpResponse.json(roomListData);
  }),
  http.post(
    `${BASE_URL}/accommodation/:accommodationId/reservation`,
    async () => {
      return HttpResponse.json({ message: '예약이 완료되었습니다' });
    },
  ),
  http.post(`${BASE_URL}/register/accommodation`, async () => {
    return HttpResponse.json({
      message: '숙소 등록이 완료되었습니다',
      id: 'accommodationId',
    });
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
      thumbnail: 'https://i.imgur.com/TuefC4N.jpeg',
      additionalImages: ['https://i.imgur.com/TuefC4N.jpeg'],
    };
    return HttpResponse.json(accommodationData);
  }),
  http.get(`${BASE_URL}/register/detailAccommodation`, async () => {
    const detailAccommodationData = {
      accommodationsId: 1,
      name: '광안리 위더스오션',
      description:
        '이곳은 바다 전망이 아름다운 숙소입니다. 가족 단위 여행이나 친구들과 함께 편안하게 지낼 수 있는 공간입니다.',
      address: '부산광역시 수영구 광안해변로 200',
      detailedAddress: '상세주소',
      totalRating: 4.5,
      type: 'PENSION',
      thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      accommodationImagesUrls: [
        'https://i.imgur.com/TuefC4N.jpeg',
        'https://i.imgur.com/TuefC4N.jpeg',
      ],
      accommodationFacilities: [
        '무료 Wi-Fi',
        '조식 서비스',
        '수영장',
        '주차 공간',
        '회의실',
      ],
      accommodationPetFacilities: [
        '반려동물 동반 가능',
        '반려동물 전용 침대',
        '애견 놀이터',
      ],
      allowPets: ['고양이'],
      latitude: 35.1585,
      longitude: 129.1669,
      reviews: [
        {
          reviewId: 1,
          reviewRating: 4.5,
          content: '너무 좋았어요! 바다 전망이 최고였고, 직원들이 친절했어요.',
          createdAt: '2025-04-11',
        },
        {
          reviewId: 2,
          reviewRating: 4.0,
          content:
            '숙소는 깔끔하고, 조식도 맛있었어요. 하지만 방이 조금 좁았습니다.',
          createdAt: '2025-08-11',
        },
      ],
      roomDetails: [
        {
          roomId: 1,
          roomName: '디럭스 오션뷰',
          roomImageUrl: ['https://i.imgur.com/TuefC4N.jpeg'],
          price: 200000,
          standardPeopleCount: 2,
          maxPeopleCount: 4,
          standardPetCount: 1,
          maxPetCount: 2,
          extraPeopleFee: 20000,
          extraPetFee: 10000,
          extraFee: 0,
          checkInTime: '15:00',
          checkOutTime: '11:00',
        },
        {
          roomId: 2,
          roomName: '디럭스 오션뷰',
          roomImageUrl: ['https://i.imgur.com/TuefC4N.jpeg'],
          price: 200000,
          standardPeopleCount: 2,
          maxPeopleCount: 4,
          standardPetCount: 1,
          maxPetCount: 2,
          extraPeopleFee: 20000,
          extraPetFee: 10000,
          extraFee: 0,
          checkInTime: '15:00',
          checkOutTime: '11:00',
        },
      ],
    };
    return HttpResponse.json({
      detailAccommodationData,
    });
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
  http.get(`${BASE_URL}/accommodation/:accommodationId`, async () => {
    const roomDetaiData = {
      roomId: 1,
      name: 'Cozy Mountain Cabin',
      description:
        'A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.',
      standardPeopleCount: 2,
      maxPeopleCount: 4,
      standardPetCount: 1,
      maxPetCount: 2,
      price: 120000,
      extraPeopleFee: 30000,
      extraPetFee: 15000,
      checkInTime: '15:00',
      checkOutTime: '11:00',
      thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      FacilityTypes: ['Air Conditioning', 'Wi-Fi', 'Kitchen', 'TV', 'Heater'],
      PetFacilityTypes: ['Pet bed', 'Pet food bowls', 'Fenced yard'],
      hashtagTypes: [
        'MountainRetreat',
        'CozyStay',
        'PetFriendly',
        'RomanticGetaway',
      ],
    };
    return HttpResponse.json(roomDetaiData);
  }),
  http.post(`${BASE_URL}/register/room`, async () => {
    return HttpResponse.json({
      message: '숙소 등록이 완료되었습니다',
      id: 'roomId',
    });
  }),
  http.put(`${BASE_URL}/register/room`, async () => {
    return HttpResponse.json({ message: '숙소 정보가 업데이트되었습니다' });
  }),
  http.get(`${BASE_URL}/register/room`, async () => {
    const accommodationData = {
      code: 200,
      id: 1,
      name: '서울 중심가 호텔 리조트',
      description: '서울 중심가에 위치한 최고급 호텔 리조트입니다.',
      standardPeopleCount: 2,
      maxPeopleCount: 4,
      standardPetCount: 3,
      maxPetCount: 5,
      extraPeopleFee: 23000,
      extraPetFee: 3000,
      extraFee: 3000,
      price: 30000,
      facilityTypes: ['편의점', '공용 수영장', '피트니스'],
      petFacilityTypes: ['대형 운동장', '전용 마당'],
      hashTagTypes: ['사우나', '운동장'],
      thumbnail: 'https://i.imgur.com/TuefC4N.jpeg',
      checkInTime: '15:30',
      checkOutTime: '11:30',
    };
    return HttpResponse.json(accommodationData);
  }),
];
