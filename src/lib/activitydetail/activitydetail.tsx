import { AxiosResponse } from 'axios';
import { api, publicApi } from '@/lib/axios';
import { useAuthStore } from '@/store/auth';
import {
  ActivityDetailResponse,
  AvailableScheduleResponse,
  ReviewsResponse,
  BookReservationResponse,
  DeleteActivityResponse,
  AvailableReservations,
} from '@/lib/activitydetail/activitydetailTypes';

const TEAMID = '11-2';
const BASEURL = 'https://sp-globalnomad-api.vercel.app';

const PATHS = {
  ACTIVITIES: `${BASEURL}/${TEAMID}/activities/`,
  MY_ACTIVITIES: `${BASEURL}/${TEAMID}/my-activities/`,
  MY_RESERVATIONS: `${BASEURL}/${TEAMID}/my-reservations`,
  AUTH: `${BASEURL}/${TEAMID}/auth/tokens`,
};

// Bearer Token 및 userId 가져오기 함수
const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getCurrentUserId = () => {
  const user = useAuthStore.getState().user;
  return user ? user.id : null;
};

// 체험 상세 조회 (인증 불필요)
export const fetchActivityDetails = async (
  activityId: number
): Promise<ActivityDetailResponse> => {
  const response: AxiosResponse<ActivityDetailResponse> = await publicApi.get(
    `${PATHS.ACTIVITIES}${activityId}`
  );
  return response.data;
};

// 체험 예약 가능일 조회 (인증 불필요)
export const fetchAvailableSchedules = async (
  activityId: number
): Promise<AvailableScheduleResponse[]> => {
  const response: AxiosResponse<AvailableScheduleResponse[]> =
    await publicApi.get(`${PATHS.ACTIVITIES}${activityId}/available-schedule`);
  return response.data;
};

// 내 예약 내역 조회 (로그인 필요)
export const fetchMyReservations = async (
  cursorId?: number
): Promise<AvailableReservations> => {
  const token = useAuthStore.getState().token; // 토큰 가져오기

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const response: AxiosResponse<AvailableReservations> = await api.get(
    PATHS.MY_RESERVATIONS,
    {
      headers: getAuthHeaders(),
      params: cursorId ? { cursorId } : {},
    }
  );
  return response.data;
};

// 체험 리뷰 조회 (인증 불필요)
export const fetchReviews = async (
  activityId: number,
  page: number,
  pageSize: number
): Promise<ReviewsResponse> => {
  const response: AxiosResponse<ReviewsResponse> = await publicApi.get(
    `${PATHS.ACTIVITIES}${activityId}/reviews`,
    {
      params: { method: 'offset', page, pageSize },
    }
  );
  return response.data;
};

// 체험 예약 신청 (로그인 필요)
export const bookActivity = async (
  activityId: number,
  scheduleId: number,
  headCount: number
): Promise<BookReservationResponse> => {
  const response: AxiosResponse<BookReservationResponse> = await api.post(
    `${PATHS.ACTIVITIES}${activityId}/reservations`,
    { scheduleId: Number(scheduleId), headCount: Number(headCount) },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// 내 체험 삭제 (로그인 필요, `userId` 검증 추가)
export const deleteActivity = async (
  activityId: number,
  ownerId: number // 삭제 요청 시 ownerId 필요
): Promise<DeleteActivityResponse> => {
  const currentUserId = getCurrentUserId();
  const token = useAuthStore.getState().token; // 토큰 가져오기

  // 클라이언트에서 먼저 `userId` 검증
  if (!currentUserId || currentUserId !== ownerId) {
    throw new Error('삭제 권한이 없습니다.');
  }

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const response: AxiosResponse<DeleteActivityResponse> = await api.delete(
    `${PATHS.MY_ACTIVITIES}${activityId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { userId: ownerId },
    }
  );

  return response.data;
};
