import { api } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 공통 에러 타입
interface ApiError {
  message: string;
}

// 예약 상태 타입
export type ReservationStatus = 'pending' | 'confirmed' | 'declined';

// 체험 정보 타입
interface Activity {
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
}

// 예약 정보 타입
interface Reservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
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

// 응답 타입
interface MyActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

interface ReservationsResponse {
  cursorId: number;
  totalCount: number;
  reservations: Reservation[];
}

interface DailyReservationCount {
  completed: number;
  confirmed: number;
  pending: number;
}

interface ReservationDashboard {
  date: string;
  reservations: DailyReservationCount;
}

interface ReservationCount {
  declined: number;
  confirmed: number;
  pending: number;
}

interface ScheduleReservation {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ReservationCount;
}

// API 서비스
export const ReservationService = {
  // 내 체험 리스트 조회
  getMyActivities: async (params: { cursorId?: number; size?: number }) => {
    try {
      const { data } = await api.get<MyActivitiesResponse>('/my-activities', {
        params,
      });
      return data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 401) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      throw error;
    }
  },

  // 내 체험 월별 예약 현황 조회
  getMonthlyDashboard: async (
    activityId: number,
    year: string,
    month: string
  ) => {
    try {
      const { data } = await api.get<ReservationDashboard[]>(
        `/my-activities/${activityId}/reservation-dashboard`,
        { params: { year, month } }
      );
      return data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 401) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 403) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      throw error;
    }
  },

  // 내 체험 날짜별 예약 정보 조회
  getDailySchedule: async (activityId: number, date: string) => {
    try {
      const { data } = await api.get<ScheduleReservation[]>(
        `/my-activities/${activityId}/reserved-schedule`,
        { params: { date } }
      );
      return data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 401) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 403) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      throw error;
    }
  },

  // 내 체험 예약 시간대별 예약 내역 조회
  getReservations: async (params: {
    activityId: number;
    scheduleId: number;
    status: ReservationStatus;
    cursorId?: number;
    size?: number;
  }) => {
    try {
      const { activityId, ...queryParams } = params;
      const { data } = await api.get<ReservationsResponse>(
        `/my-activities/${activityId}/reservations`,
        { params: queryParams }
      );
      return data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 401) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 403) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      throw error;
    }
  },

  // 내 체험 예약 상태 업데이트
  updateReservationStatus: async (
    activityId: number,
    reservationId: number,
    status: ReservationStatus
  ) => {
    try {
      const { data } = await api.patch<Reservation>(
        `/my-activities/${activityId}/reservations/${reservationId}`,
        { status }
      );
      return data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 401) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 403) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 404) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      throw error;
    }
  },
};

// 쿼리 키
export const QUERY_KEYS = {
  myActivities: 'myActivities',
  monthlyDashboard: 'monthlyDashboard',
  dailySchedule: 'dailySchedule',
  reservations: 'reservations',
} as const;

// 리액트 쿼리 커스텀 훅
export const useMyActivities = (params: {
  cursorId?: number;
  size?: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.myActivities, params],
    queryFn: () => ReservationService.getMyActivities(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useMonthlyDashboard = (
  activityId: number,
  year: string,
  month: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.monthlyDashboard, activityId, year, month],
    queryFn: () =>
      ReservationService.getMonthlyDashboard(activityId, year, month),
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled,
  });
};

export const useDailySchedule = (
  activityId: number,
  date: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.dailySchedule, activityId, date],
    queryFn: () => ReservationService.getDailySchedule(activityId, date),
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled,
  });
};

export const useReservations = (
  params: {
    activityId: number;
    scheduleId: number;
    status: ReservationStatus;
    cursorId?: number;
    size?: number;
  },
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.reservations, params],
    queryFn: () => ReservationService.getReservations(params),
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled,
  });
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activityId,
      reservationId,
      status,
    }: {
      activityId: number;
      reservationId: number;
      status: ReservationStatus;
    }) =>
      ReservationService.updateReservationStatus(
        activityId,
        reservationId,
        status
      ),

    onSuccess: () => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.reservations] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.monthlyDashboard],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.dailySchedule] });
    },
  });
};

// 에러 체크 유틸리티
export const isApiError = (error: unknown): error is AxiosError<ApiError> => {
  return error instanceof AxiosError;
};
