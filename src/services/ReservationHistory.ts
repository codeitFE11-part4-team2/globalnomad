import { api } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 공통 에러 타입
interface ApiError {
  message: string;
}

// 예약 상태 타입
type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

// 활동 정보 타입
interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

// 예약 정보 타입
interface Reservation {
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

// 예약 상세 정보 타입 (activity 필드가 없는 버전)
interface ReservationDetail {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
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

// 리뷰 정보 타입
interface Review {
  id: number;
  teamId: string;
  activityId: number;
  userId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// 1. 예약 목록 조회 관련 타입과 함수
interface ReservationListParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}

interface ReservationListResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

export const getMyReservations = async (params: ReservationListParams) => {
  try {
    const { data } = await api.get<ReservationListResponse>(
      '/my-reservations',
      {
        params,
      }
    );
    return data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "status는 pending, confirmed, completed, declined, canceled  중 하나로 입력해주세요."
    }
    if (error.response?.status === 401) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "Unauthorized"
    }
    throw error;
  }
};

// 2. 예약 취소 관련 타입과 함수
interface UpdateReservationRequest {
  status: 'canceled';
}

export const cancelReservation = async (reservationId: number) => {
  try {
    const { data } = await api.patch<ReservationDetail>(
      `/my-reservations/${reservationId}`,
      { status: 'canceled' } as UpdateReservationRequest
    );
    return data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "예약 취소는 예약 신청 상태에서만 가능합니다."
    }
    if (error.response?.status === 401) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "Unauthorized"
    }
    if (error.response?.status === 403) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "본인의 예약만 취소할 수 있습니다."
    }
    throw error;
  }
};

// 3. 리뷰 작성 관련 타입과 함수
interface CreateReviewRequest {
  rating: number;
  content: string;
}

export const createReservationReview = async (
  reservationId: number,
  reviewData: CreateReviewRequest
) => {
  try {
    const { data } = await api.post<Review>(
      `/my-reservations/${reservationId}/review`,
      reviewData
    );
    return data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "체험 완료 후 리뷰를 작성할 수 있습니다."
    }
    if (error.response?.status === 401) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "Unauthorized"
    }
    if (error.response?.status === 403) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "본인의 예약만 리뷰를 작성할 수 있습니다."
    }
    if (error.response?.status === 404) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "존재하지 않는 예약입니다."
    }
    if (error.response?.status === 409) {
      const errorData = error.response.data as ApiError;
      throw new Error(errorData.message); // "이미 리뷰를 작성했습니다."
    }
  }
};

// 리액트 쿼리 커스텀 훅
export const useReservationList = (params: ReservationListParams) => {
  return useQuery({
    queryKey: ['reservations', params],
    queryFn: () => getMyReservations(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useReservationCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useReservationReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      reviewData,
    }: {
      reservationId: number;
      reviewData: CreateReviewRequest;
    }) => createReservationReview(reservationId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};
