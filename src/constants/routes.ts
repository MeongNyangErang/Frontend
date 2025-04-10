import AccommodationList from '@pages/host/register/AccommodationList';

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
      myPet: 'mypage/user/my-pet',
      reservationList: '/mypage/user/reservation-list',
      reviews: '/mypage/user/reviews',
      wishlist: '/mypage/user/wishlist',
    },
    host: {
      root: '/mypage/host',
      profile: '/mypage/host/profile',
      reservation: '/mypage/host/reservation',
      reviews: '/mypage/host/reviews',
      registerAccommodation: '/mypage/host/register/registerAccommodation',
      registerRoom: '/mypage/host/register/registerRoom',
      roomList: '/mypage/host/register/RoomList',
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
} as const;

export default ROUTES;
