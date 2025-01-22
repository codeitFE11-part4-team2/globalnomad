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
  date: string;
  times: TimeSlot[];
}

export interface TimeSlot {
  endTime: string;
  startTime: string;
  id: number;
}

// 체험 리뷰 조회 응답 타입
export interface ReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
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

// 내 체험 수정 요청 타입
export interface UpdateActivityRequest {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  address?: string;
  bannerImageUrl?: string;
  subImageUrlsToAdd?: string[];
  subImageIdsToRemove?: number[];
  schedulesToAdd?: Schedule[];
  scheduleIdsToRemove?: number[];
}

// 내 체험 수정 응답 타입
export interface UpdateActivityResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImage[];
  schedules: Schedule[];
}
