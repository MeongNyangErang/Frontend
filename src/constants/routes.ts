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
      registerAccommodation: '/mypage/host/register-accommodation',
      registerRoom: '/mypage/host/register-room',
      roomList: '/mypage/host/room-list',
    },
  },
  search: '/search',
  accommodationDetail: {
    root: (accommodationId: number) => `/accommodation/${accommodationId}`,
    room: (accommodationId: number, roomId: number) =>
      `/accommodation/${accommodationId}/room/${roomId}`,
    review: (accommodationId: number) =>
      `/accommodation/${accommodationId}/review`,
    reservation: (accommodationId: number) =>
      `/accommodation/${accommodationId}/reservation`,
  },
  chat: {
    list: '/chat',
    room: (roomId: string) => `/chat/${roomId}`,
  },
  notification: '/notification',
} as const;

export default ROUTES;
