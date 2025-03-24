const ROUTES = {
  home: '/',
  logIn: '/logIn',
  signUp: {
    user: '/signup/user',
    host: '/signup/host',
  },
  myPage: {
    user: '/mypage/user',
    host: '/mypage/host',
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
