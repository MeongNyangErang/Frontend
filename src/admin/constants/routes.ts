const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  notices: {
    root: '/notices',
    new: '/notices/new',
    edit: (noticeId: number) => `/notices/${noticeId}/edit`,
  },
};

export default ROUTES;
