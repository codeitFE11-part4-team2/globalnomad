import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';

const PATHS = {
  ACTIVITIES: `https://sp-globalnomad-api.vercel.app/11-2/activities`,
};

export interface Activity {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  bannerImageUrl: string;
  createdAt: string;
}

export interface ActivityResponse {
  activities: Activity[];
  totalCount: number;
}

export async function fetchActivities(
  page: number = 1,
  size: number = 10
): Promise<ActivityResponse> {
  try {
    const response: AxiosResponse<ActivityResponse> = await axiosInstance.get(
      PATHS.ACTIVITIES,
      {
        params: {
          method: 'offset',
          page,
          size,
          sort: 'latest',
        },
      }
    );
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return { activities: [], totalCount: 0 };
  }
}
