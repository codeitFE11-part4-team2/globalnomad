import { api } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 타입 정의
interface AvailableTime {
  id: number;
  startTime: string;
  endTime: string;
}

interface AvailableDate {
  date: string;
  times: AvailableTime[];
}

interface ReservationRequest {
  scheduleId: number;
  headCount: number;
}

interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: 'pending';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiError {
  message: string;
}

// API 서비스
export const ActivityReservationService = {
  // 예약 가능 일정 조회
  getAvailableSchedule: async (
    activityId: number,
    year: string,
    month: string
  ) => {
    try {
      const { data } = await api.get<AvailableDate[]>(
        `/activities/${activityId}/available-schedule`,
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
      throw error;
    }
  },

  // 예약 신청
  createReservation: async (
    activityId: number,
    reservationData: ReservationRequest
  ) => {
    try {
      const { data } = await api.post<Reservation>(
        `/activities/${activityId}/reservations`,
        reservationData
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
      if (error.response?.status === 404) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      if (error.response?.status === 409) {
        const errorData = error.response.data as ApiError;
        throw new Error(errorData.message);
      }
      throw error;
    }
  },
};

// 쿼리 키 추가
export const QUERY_KEYS = {
  availableSchedule: 'availableSchedule',
  activityReservation: 'activityReservation',
} as const;

// 커스텀 훅
export const useAvailableSchedule = (
  activityId: number,
  year: string,
  month: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.availableSchedule, activityId, year, month],
    queryFn: () =>
      ActivityReservationService.getAvailableSchedule(activityId, year, month),
    staleTime: 1000 * 60 * 5, // 5분
    enabled: options?.enabled,
  });
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activityId,
      reservationData,
    }: {
      activityId: number;
      reservationData: ReservationRequest;
    }) =>
      ActivityReservationService.createReservation(activityId, reservationData),

    onSuccess: () => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.availableSchedule],
      });
    },
  });
};
