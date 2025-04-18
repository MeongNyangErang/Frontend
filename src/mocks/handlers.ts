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
import { wishlist } from './data/wishlist';
import { chatList } from './data/chatList';
import { previouseChatMessages } from './data/previousChatMessages';

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
        accessToken: 123,
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
        accessToken: 2134,
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
  http.get(`${BASE_URL}/users/me`, async () => {
    const userProfileData = {
      nickname: '유저123닉네임',
      profileImageUrl: 'https://i.imgur.com/TuefC4N.jpeg',
    };
    return HttpResponse.json(userProfileData);
  }),
  http.get(`${BASE_URL}/hosts/me`, async () => {
    const hostProfileData = {
      nickname: '호스트123닉네임',
      profileImageUrl: 'https://i.imgur.com/WrQthuy.jpeg',
      name: '홍길동',
      currentPhoneNumber: '01012345678',
    };
    return HttpResponse.json(hostProfileData);
  }),
  http.delete(`${BASE_URL}/register/roomList`, async () => {
    return HttpResponse.json({ code: 200, message: '객실 삭제 성공' });
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
  http.post(`${BASE_URL}/user/reservations`, async () => {
    return HttpResponse.json({ message: '예약이 완료되었습니다' });
  }),
  http.post(`${BASE_URL}/register-accommodation`, async () => {
    return HttpResponse.json({
      message: '숙소 등록이 완료되었습니다',
      id: 'accommodationId',
    });
  }),
  http.put(`${BASE_URL}/register-accommodation`, async () => {
    return HttpResponse.json({ message: '숙소 정보가 업데이트되었습니다' });
  }),
  http.get(`${BASE_URL}/register-accommodation`, async () => {
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
      case 'RESERVED':
        content = reservedReservations;
        break;
      case 'COMPLETED':
        content = completedReservations;
        break;
      case 'CANCELED':
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
  http.get(`${BASE_URL}/register/roomReview`, async () => {
    const roomReview = {
      nickname: '김멍냥',
      profileImageUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      roomName: '오션 더블A',
      totalRating: 4.6,
      content:
        'A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.',
      reviewImages: [
        'https://i.imgur.com/WrQthuy.jpeg',
        'https://i.imgur.com/WrQthuy.jpeg',
        'https://i.imgur.com/WrQthuy.jpeg',
      ],
      createdAt: '2025-03-23',
    };
    return HttpResponse.json(roomReview);
  }),

  http.get(`${BASE_URL}/users/wishlist/accommodations`, async () => {
    const data = {
      code: 200,
      data: { content: wishlist, nextCursor: 123, hasNext: true },
    };

    return HttpResponse.json(data);
  }),
  http.delete(
    `${BASE_URL}/users/wishlist/accommodations/:accommodationId`,
    async () => {
      return HttpResponse.json({ message: '찜 해제제 성공' });
    },
  ),
  http.post(
    `${BASE_URL}/wishlist/accommodations/:accommodationId`,
    async () => {
      return HttpResponse.json({ message: '찜 등록 성공' });
    },
  ),
  http.get(`${BASE_URL}/review-list`, async () => {
    const ReviewList = {
      userId: '김멍냥',
      roomId: 2,
      reviewId: 3,
      roomName: '오션 더블A',
      totalRating: 4.6,
      imageUrls: ['https://i.imgur.com/TuefC4N.jpeg'],
      content:
        'A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.A peaceful retreat in the mountains, perfect for a quiet getaway with beautiful scenic views.',
      createdAt: '2025-03-23',
    };
    return HttpResponse.json([ReviewList]);
  }),
  http.get(`${BASE_URL}/reservation-list`, async () => {
    const ReservationList = {
      reservationDate: '2025-04-11',
      reservationName: '김멍냥',
      reservatioPhoneNumber: '010-1234-2345',
      peopleCount: '2',
      petCount: '3',
      hasVehicle: true,
      totalPrice: 23000,
      checkInDate: '2025-03-03',
      checkOutDate: '2025-03-09',
    };
    return HttpResponse.json([ReservationList]);
  }),

  http.get(`${BASE_URL}/chats`, async () => {
    const data = {
      content: chatList,
      page: 1,
      size: 20,
      totalElements: 123,
      totalPages: 7,
      first: true,
      last: false,
    };
    return HttpResponse.json(data);
  }),
  http.get(`${BASE_URL}/chats/:chatRoomId/messages`, async () => {
    const response = {
      code: 200,
      data: previouseChatMessages,
      nextCursorId: 100,
      hasNext: true,
    };

    return HttpResponse.json(response);
  }),
  http.get(`${BASE_URL}/recommendations/user-pet`, () => {
    const mockResponse = [
      {
        petId: 1,
        petName: '콩이',
        recommendations: [
          {
            id: 101,
            name: '강릉 펫프렌들리 호텔',
            price: 125000,
            totalRating: 4.8,
            thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
          },
          {
            id: 102,
            name: '속초 바닷가 숙소',
            price: 89000,
            totalRating: 4.5,
            thumbnailUrl: 'https://i.imgur.com/WrQthuy.jpeg',
          },
        ],
      },
      {
        petId: 2,
        petName: '솜이',
        recommendations: [
          {
            id: 201,
            name: '제주 고양이 리조트',
            price: 99000,
            totalRating: 4.6,
            thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
          },
        ],
      },
    ];
    return HttpResponse.json(mockResponse);
  }),
  http.get(`${BASE_URL}/recommendations/default/more`, () => {
    return HttpResponse.json([
      {
        acommodationId: 1,
        accommodationName: '속초 해변 펫텔',
        nickname: '김멍냥',
        content:
          '정말 만족스러웠어요! 강아지가 너무 편해했어요. 주변도 조용하고 산책로도 잘 되어 있어요. 또 오고 싶어요!',
        totalRating: 4.7,
        imageUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      },
      {
        acommodationId: 2,
        accommodationName: '경주 전통 펫하우스',
        nickname: '김냥냥',
        price: 99000,
        totalRating: 4.6,
        imageUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      },
    ]);
  }),
  http.get(`${BASE_URL}/recommendations/most-viewed`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '속초 해변 펫텔',
        price: 159000,
        totalRating: 4.6,
        thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      },
      {
        id: 2,
        name: '경주 전통 펫하우스',
        price: 129000,
        totalRating: 4.9,
        thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
      },
    ]);
  }),
  /*회원 allview*/
  http.get(`${BASE_URL}/recommendations/user-pet/more`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '반려견과 함께하는 바닷가 숙소',
        price: 120000,
        totalRating: 4.8,
        thumbnailUrl: 'https://example.com/images/beach-house.jpg',
      },
      {
        id: 2,
        name: '고양이 전용 아파트형 숙소',
        price: 95000,
        totalRating: 4.7,
        thumbnailUrl: 'https://example.com/images/cat-apartment.jpg',
      },
    ]);
  }),
  http.get(`${BASE_URL}/recommendations/default`, () => {
    return HttpResponse.json({
      LARGE_DOG: [
        {
          id: 1,
          name: '고양이 전용 아파트형 숙소',
          price: 150000,
          totalRating: 4.5,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
        {
          id: 2,
          name: '고양이 전용 아파트형 숙소',
          price: 120000,
          totalRating: 4.3,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
      MEDIUM_DOG: [
        {
          id: 3,
          name: '고양이 전용 아파트형 숙소',
          price: 80000,
          totalRating: 4.2,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
      SMALL_DOG: [
        {
          id: 4,
          name: '고양이 전용 아파트형 숙소',
          price: 60000,
          totalRating: 4.0,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
      CAT: [
        {
          id: 5,
          name: '고양이 전용 아파트형 숙소',
          price: 50000,
          totalRating: 4.8,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
        {
          id: 6,
          name: '고양이 전용 아파트형 숙소',
          price: 45000,
          totalRating: 4.7,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
    });
  }),
  /*회원 allview*/
  http.get(`${BASE_URL}/recommendations/default/more`, () => {
    return HttpResponse.json({
      LARGE_DOG: [
        {
          id: 1,
          name: '고양이 전용 아파트형 숙소',
          price: 150000,
          totalRating: 4.5,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
        {
          id: 2,
          name: '고양이 전용 아파트형 숙소',
          price: 120000,
          totalRating: 4.3,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
      MEDIUM_DOG: [
        {
          id: 3,
          name: '고양이 전용 아파트형 숙소',
          price: 80000,
          totalRating: 4.2,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
      SMALL_DOG: [
        {
          id: 4,
          name: '고양이 전용 아파트형 숙소',
          price: 60000,
          totalRating: 4.0,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
      CAT: [
        {
          id: 5,
          name: '고양이 전용 아파트형 숙소',
          price: 50000,
          totalRating: 4.8,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
        {
          id: 6,
          name: '고양이 전용 아파트형 숙소',
          price: 45000,
          totalRating: 4.7,
          thumbnailUrl: 'https://i.imgur.com/TuefC4N.jpeg',
        },
      ],
    });
  }),
];
