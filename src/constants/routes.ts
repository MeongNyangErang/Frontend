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
      reservation: '/mypage/user/reservation',
      reviews: '/mypage/user/reviews',
      wishlist: '/mypage/user/wishlist',
    },
    host: {
      root: '/mypage/host',
      profile: '/mypage/host/profile',
      reservation: '/mypage/host/reservation',
      reviews: '/mypage/host/reviews',
      registerAccommodation: '/mypage/host/register/accommodation',
      registerRoom: '/mypage/host/register/room',
    },
  },
  search: '/search',
  detail: (id: string) => `/accommodation/${id}`,
  chat: {
    list: '/chat',
    room: (roomId: string) => `/chat/${roomId}`,
  },
  notification: '/notification',
};

export default ROUTES;
