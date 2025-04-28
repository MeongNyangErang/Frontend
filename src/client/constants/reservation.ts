export const RESERVATION_STATUS = [
  'RESERVED',
  'COMPLETED',
  'CANCELED',
] as const;

export const RESERVATION_STATUS_MAP = {
  RESERVED: '이용 전',
  COMPLETED: '이용 완료',
  CANCELED: '취소됨',
} as const;
