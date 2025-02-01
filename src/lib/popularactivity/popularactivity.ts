import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';
import { PopularActivityResponse } from './popularactivityTypes';

const PATHS = {
  ACTIVITIES: `https://sp-globalnomad-api.vercel.app/11-2/activities`,
};

// 인기 체험 목록 조회 (리뷰 수 기준 정렬)
export const fetchPopularActivities = async (
  page: number,
  size: number = 20
): Promise<PopularActivityResponse> => {
  try {
    console.log('Fetching activities with URL:', PATHS.ACTIVITIES);
    const response: AxiosResponse<PopularActivityResponse> =
      await axiosInstance.get(PATHS.ACTIVITIES, {
        params: {
          method: 'offset',
          page,
          size,
          sort: 'most_reviewed',
        },
      });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};
