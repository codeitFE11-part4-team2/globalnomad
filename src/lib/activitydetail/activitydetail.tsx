import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';
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
const BASEURL = 'https://sp-globalnomad-api.vercel.app';

const PATHS = {
  ACTIVITIES: `${BASEURL}/teamId/activities/`.replace('teamId', TEAMID),
  MY_ACTIVITIES: `${BASEURL}/teamId/my-activities/`.replace('teamId', TEAMID),
  AUTH: `${BASEURL}/teamId/auth/tokens`.replace('teamId', TEAMID),
};

// 체험 상세 조회
export const fetchActivityDetails = async (
  activityId: number
): Promise<ActivityDetailResponse> => {
  const response: AxiosResponse<ActivityDetailResponse> =
    await axiosInstance.get(`${PATHS.ACTIVITIES}${activityId}`);
  return response.data;
};

// 체험 예약 가능일 조회
export const fetchAvailableSchedules = async (
  activityId: number
): Promise<AvailableScheduleResponse[]> => {
  const response: AxiosResponse<AvailableScheduleResponse[]> =
    await axiosInstance.get(
      `${PATHS.ACTIVITIES}${activityId}/available-schedule`
    );
  return response.data;
};

// 체험 리뷰 조회
export const fetchReviews = async (
  activityId: number,
  page: number,
  pageSize: number
): Promise<ReviewsResponse> => {
  const response: AxiosResponse<ReviewsResponse> = await axiosInstance.get(
    `${PATHS.ACTIVITIES}${activityId}/reviews`,
    {
      params: {
        method: 'offset',
        page,
        pageSize,
      },
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
  const response: AxiosResponse<BookReservationResponse> =
    await axiosInstance.post(
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
  const response: AxiosResponse<CreateImageUrlResponse> =
    await axiosInstance.post(`${PATHS.ACTIVITIES}image`, {
      activityImageUrl: imageUrl,
    });
  return response.data;
};

// 내 체험 삭제 (로그인 필요, userId 일치해야 함)
export const deleteActivity = async (
  activityId: number,
  accessToken: string
): Promise<DeleteActivityResponse> => {
  const response: AxiosResponse<DeleteActivityResponse> =
    await axiosInstance.delete(`${PATHS.MY_ACTIVITIES}${activityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  return response.data;
};

// 내 체험 수정 (로그인 필요, userId 일치해야 함)
export const updateActivity = async (
  activityId: number,
  updateData: UpdateActivityRequest,
  accessToken: string
): Promise<UpdateActivityResponse> => {
  const response: AxiosResponse<UpdateActivityResponse> =
    await axiosInstance.put(`${PATHS.MY_ACTIVITIES}${activityId}`, updateData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  return response.data;
};
