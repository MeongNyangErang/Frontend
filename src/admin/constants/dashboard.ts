import ROUTES from './routes';

const DASH_BOARD_MENU_LIST = [
  { name: '공지사항 관리', path: ROUTES.notices.root },
  { name: '신고 관리', path: ROUTES.reports.root(0) },
  { name: '호스트 회원 관리', path: ROUTES.hosts.root(0) },
] as const;

export { DASH_BOARD_MENU_LIST };
