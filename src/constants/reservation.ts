export const RESERVATION_STATUS = [
  'reserved',
  'completed',
  'canceled',
] as const;

export const RESERVATION_STATUS_MAP = {
  reserved: '이용 전',
  completed: '이용 완료',
  canceled: '취소됨',
} as const;
