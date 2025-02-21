import { api } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 공통 에러 타입
interface ApiError {
  message: string;
}

// 체험 정보 타입
export interface Activity {
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

// 응답 타입
interface MyActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

// API 서비스
export const MyActivityService = {
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

  // 내 체험 삭제
  deleteActivity: async (activityId: number) => {
    try {
      await api.delete(`/my-activities/${activityId}`);
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
export const MY_ACTIVITY_QUERY_KEYS = {
  myActivities: 'myActivities',
} as const;

// 리액트 쿼리 커스텀 훅
export const useMyActivities = (params: {
  cursorId?: number;
  size?: number;
}) => {
  return useQuery({
    queryKey: [MY_ACTIVITY_QUERY_KEYS.myActivities, params],
    queryFn: () => MyActivityService.getMyActivities(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) =>
      MyActivityService.deleteActivity(activityId),

    onSuccess: () => {
      // 체험 리스트 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [MY_ACTIVITY_QUERY_KEYS.myActivities],
      });
    },
  });
};

// 에러 체크 유틸리티
export const isApiError = (error: unknown): error is AxiosError<ApiError> => {
  return error instanceof AxiosError;
};
