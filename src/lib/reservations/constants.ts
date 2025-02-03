export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DECLINED: 'declined',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
} as const;

export const RESERVATION_STATUS_LABEL = {
  [RESERVATION_STATUS.PENDING]: '예약 대기',
  [RESERVATION_STATUS.CONFIRMED]: '예약 승인',
  [RESERVATION_STATUS.DECLINED]: '예약 거절',
  [RESERVATION_STATUS.CANCELED]: '예약 취소',
  [RESERVATION_STATUS.COMPLETED]: '체험 완료',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
