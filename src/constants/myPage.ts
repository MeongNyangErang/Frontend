import ROUTES from './routes';

export const USER_MY_PAGE_MENU = [
  { name: '내 반려동물', path: ROUTES.myPage.user.myPet },
  { name: '숙소 예약 내역', path: ROUTES.myPage.user.reservationList },
  { name: '찜한 숙소', path: ROUTES.myPage.user.wishlist },
  { name: '내 리뷰', path: ROUTES.myPage.user.reviews },
  { name: '내 정보 관리', path: ROUTES.myPage.user.profileEdit },
] as const;

export const HOST_MY_PAGE_MENU = [
  { name: '예약 내역', path: ROUTES.myPage.host.reservation },
  { name: '리뷰 내역', path: ROUTES.myPage.host.reviews },
  { name: '숙소 관리', path: ROUTES.myPage.host.registerAccommodation },
  { name: '객실 관리', path: ROUTES.myPage.host.roomList },
  { name: '내 정보 관리', path: ROUTES.myPage.host.profileEdit },
] as const;

export const USER_OVERVEIW_LIST = [
  {
    name: '숙소 예약 내역',
    desc: '예약중이거나 이용완료한 숙소 내역을 확인 할 수 있어요.',
    path: ROUTES.myPage.user.reservationList,
  },
  {
    name: '찜한 숙소',
    desc: '찜해둔 숙소 목록을 확인 할 수 있어요.',
    path: ROUTES.myPage.user.wishlist,
  },
  {
    name: '내 리뷰',
    desc: '내가 남긴 리뷰를 확인하고 수정 할 수 있어요.',
    path: ROUTES.myPage.user.reviews,
  },
] as const;

export const HOST_OVERVIEW_LIST = [
  {
    name: '예약 내역',
    desc: '내 숙소의 예약 내역을 확인 할 수 있어요.',
    path: ROUTES.myPage.host.reservation,
  },
  {
    name: '리뷰 내역',
    desc: '멍냥이랑 고객들이 내 숙소에 남긴 리뷰를 확인 할 수 있어요.',
    path: ROUTES.myPage.host.reviews,
  },
  {
    name: '숙소 관리',
    desc: '내 숙소 정보를 등록하고 수정 할 수 있어요.',
    path: ROUTES.myPage.host.registerAccommodation,
  },
  {
    name: '객실 관리',
    desc: '객실 정보를 등록하고 수정 할 수 있어요.',
    path: ROUTES.myPage.host.roomList,
  },
] as const;
