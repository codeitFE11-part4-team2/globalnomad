// 체험 상세 조회 응답
export interface ActivityDetailResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

// 체험 예약 가능일 조회 응답 타입
export interface AvailableScheduleResponse {
  activityId: number;
  date: string;
  times: TimeSlot[];
}

export interface TimeSlot {
  endTime: string;
  startTime: string;
  id: number;
}

// 내 예약 내역 조회
export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailableReservations {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

// 체험 리뷰 조회 응답 타입
export interface ReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
  totalPages: number; // 총 페이지 수
  currentPage: number; // 현재 페이지 번호
}

export interface Review {
  id: number;
  user: User;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

// 체험 예약 신청 응답 타입
export interface BookReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// 체험 이미지 URL 생성 응답 타입
export interface CreateImageUrlResponse {
  activityImageUrl: string;
}

// 내 체험 삭제 응답 타입
export interface DeleteActivityResponse {
  success: boolean;
  message: string;
}
