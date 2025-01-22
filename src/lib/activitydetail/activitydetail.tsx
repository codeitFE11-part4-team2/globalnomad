import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  ActivityDetailResponse,
  AvailableScheduleResponse,
  ReviewsResponse,
  BookReservationResponse,
  CreateImageUrlResponse,
  DeleteActivityResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
} from '@/lib/activitydetail/activitydetailTypes';

const TEAMID = '11-2';
const API_BASE_URL = 'https://sp-globalnomad-api.vercel.app';

const PATHS = {
  ACTIVITIES: `/teamId/activities/`.replace('teamId', TEAMID),
  MY_ACTIVITIES: `/teamId/my-activities/`.replace('teamId', TEAMID),
  AUTH: `/teamId/auth/tokens`.replace('teamId', TEAMID),
};

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 체험 상세 조회
export const fetchActivityDetails = async (
  activityId: number
): Promise<ActivityDetailResponse> => {
  const response: AxiosResponse<ActivityDetailResponse> = await instance.get(
    `${PATHS.ACTIVITIES}${activityId}`
  );
  return response.data;
};

// 체험 예약 가능일 조회
export const fetchAvailableSchedules = async (
  activityId: number
): Promise<AvailableScheduleResponse[]> => {
  const response: AxiosResponse<AvailableScheduleResponse[]> =
    await instance.get(`${PATHS.ACTIVITIES}${activityId}/available-schedule`);
  return response.data;
};

// 체험 리뷰 조회
export const fetchReviews = async (
  activityId: number,
  page: number
): Promise<ReviewsResponse> => {
  const response: AxiosResponse<ReviewsResponse> = await instance.get(
    `${PATHS.ACTIVITIES}${activityId}/reviews`,
    {
      params: { page },
    }
  );
  return response.data;
};

// 체험 예약 신청 (로그인 필요)
export const bookActivity = async (
  activityId: number,
  scheduleId: number,
  headCount: number,
  accessToken: string
): Promise<BookReservationResponse> => {
  const response: AxiosResponse<BookReservationResponse> = await instance.post(
    `${PATHS.ACTIVITIES}${activityId}/reservations`,
    { scheduleId, headCount },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// 체험 이미지 URL 생성
export const createImageUrl = async (
  imageUrl: string
): Promise<CreateImageUrlResponse> => {
  const response: AxiosResponse<CreateImageUrlResponse> = await instance.post(
    `${PATHS.ACTIVITIES}image`,
    {
      activityImageUrl: imageUrl,
    }
  );
  return response.data;
};

// 내 체험 삭제 (로그인 필요, userId 일치해야 함)
export const deleteActivity = async (
  activityId: number,
  accessToken: string
): Promise<DeleteActivityResponse> => {
  const response: AxiosResponse<DeleteActivityResponse> = await instance.delete(
    `${PATHS.MY_ACTIVITIES}${activityId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// 내 체험 수정 (로그인 필요, userId 일치해야 함)
export const updateActivity = async (
  activityId: number,
  updateData: UpdateActivityRequest,
  accessToken: string
): Promise<UpdateActivityResponse> => {
  const response: AxiosResponse<UpdateActivityResponse> = await instance.put(
    `${PATHS.MY_ACTIVITIES}${activityId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
