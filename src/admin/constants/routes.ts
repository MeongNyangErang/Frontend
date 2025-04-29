const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  notices: {
    root: '/notices',
    new: '/notices/new',
    edit: (noticeId: number) => `/notices/${noticeId}/edit`,
  },
  reports: {
    root: '/reports',
    detail: (reportId: number) => `/reports/${reportId}`,
  },
  hosts: {
    root: '/hosts',
    detail: (hostId: number) => `/hosts/${hostId}`,
  },
};

export default ROUTES;
