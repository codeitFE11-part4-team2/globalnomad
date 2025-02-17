export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

// 활동 정보 타입
export interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

// 예약 정보 타입
export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// API 응답 타입
export interface ReservationListResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

// API 요청 파라미터 타입
export interface ReservationListParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}
