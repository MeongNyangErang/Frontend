const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  notices: {
    root: '/notices',
    new: '/notices/new',
    edit: (noticeId: number) => `/notices/${noticeId}/edit`,
  },
  reports: {
    root: (page: number) => `/reports?page=${page}`,
    detail: (reportId: number) => `/reports/${reportId}`,
  },
  hosts: {
    root: (page: number) => `/hosts?page=${page}`,
    detail: (hostId: number) => `/hosts/${hostId}`,
  },
};

export default ROUTES;
