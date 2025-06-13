const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  notices: {
    root: (page: number) => `/notices?page=${page}`,
    detail: (noticeId: number) => `/notices/${noticeId}`,
    edit: (noticeId: number) => `/notices/${noticeId}/edit`,
    new: '/notices/new',
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
