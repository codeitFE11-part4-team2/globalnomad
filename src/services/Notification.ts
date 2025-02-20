import { api } from '@/lib/axios';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 타입들
export interface Notification {
  id: number;
  teamId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface NotificationResponse {
  cursorId: number | null;
  notifications: Notification[];
  totalCount: number;
}

interface ApiError {
  message: string;
}

// api Service
export const NotificationService = {
  // 내 알림 리스트 조회
  getNotifications: async (
    cursorId: number | undefined | null,
    size: number = 10
  ) => {
    try {
      const params: Record<string, string> = {};
      if (cursorId != null) params.cursorId = cursorId.toString();
      if (size !== 10) params.size = size.toString();

      const { data } = await api.get<NotificationResponse>(
        '/my-notifications',
        {
          params,
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          const errorData = error.response.data as ApiError;
          throw new Error(errorData.message);
        }
        if (error.response?.status === 401) {
          const errorData = error.response.data as ApiError;
          throw new Error(errorData.message);
        }
      }
      throw new Error('알림 목록을 불러오는데 실패했습니다.');
    }
  },

  // 알림 삭제
  deleteNotification: async (notificationId: number) => {
    try {
      await api.delete(`/my-notifications/${notificationId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
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
      }
      throw new Error('알림 삭제에 실패했습니다.');
    }
  },
};

// 리액트 쿼리 커스텀 훅
// 알림 리스트 조회 커스텀 훅
export const useNotifications = (size: number = 10) => {
  return useInfiniteQuery<
    NotificationResponse,
    Error,
    InfiniteData<NotificationResponse>,
    string[],
    number | null
  >({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) =>
      NotificationService.getNotifications(pageParam, size),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.notifications.length < size) {
        return null;
      }
      return lastPage.cursorId;
    },
  });
};

// 알림 삭제 커스텀 훅
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      NotificationService.deleteNotification(notificationId),
    onSuccess: () => {
      // 삭제 성공 시 알림 리스트 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });
};

// 알림 데이터 가공을 위한 유틸리티 함수
export const getFlattedNotifications = (
  pages: NotificationResponse[] | undefined
): Notification[] => {
  if (!pages) return [];
  return pages.flatMap((page) => page.notifications);
};
