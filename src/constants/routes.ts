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
      reservationList: '/mypage/user/reservation-list',
      reviews: '/mypage/user/reviews',
      wishlist: '/mypage/user/wishlist',
    },
    host: {
      root: '/mypage/host',
      profile: '/mypage/host/profile',
      reservationList: '/mypage/host/reservation-list',
      reviews: '/mypage/host/reviews',
      registerAccommodation: '/mypage/host/register/accommodation',
      registerRoom: '/mypage/host/register/room',
    },
  },
  search: '/search',
  detail: (accommodationId: string) => `/accommodation/${accommodationId}`,
  reservation: (accommodationId: string) =>
    `/accommodation/${accommodationId}/reservation`,
  chat: {
    list: '/chat',
    room: (roomId: string) => `/chat/${roomId}`,
  },
  notification: '/notification',
};

export default ROUTES;
