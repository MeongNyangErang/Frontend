const ROUTES = {
  home: '/',
  logIn: '/logIn',
  signUp: {
    user: '/signup/user',
    host: '/signup/host',
  },
  myPage: {
    user: {
      root: '/mypage/user',
      profile: '/mypage/user/profile',
      myPet: '/mypage/user/my-pet',
      reservationList: '/mypage/user/reservation-list',
      reviews: '/mypage/user/reviews',
      wishlist: '/mypage/user/wishlist',
    },
    host: {
      root: '/mypage/host',
      profile: '/mypage/host/profile',
      reservation: '/mypage/host/reservation',
      reviews: '/mypage/host/reviews',
      registerAccommodation: '/mypage/host/hostregister/registeraccommodation',
      registerRoom: '/mypage/host/hostregister/registerroom',
      roomList: '/mypage/host/hostlist/roomList',
      detailAccommodation: '/mypage/host/hostregister/detailAccommodation',
      RoomReview: '/mypage/host/hostregister/roomReview',
    },
  },
  search: '/search',
  detail: (accommodationId: number) => `/accommodation/${accommodationId}`,
  reservation: (accommodationId: number) =>
    `/accommodation/${accommodationId}/reservation`,
  chat: {
    list: '/chat',
    room: (roomId: string) => `/chat/${roomId}`,
  },
  notification: '/notification',
} as const;

export default ROUTES;
