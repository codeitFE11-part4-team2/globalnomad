import { AxiosResponse } from 'axios';
import { publicApi } from '@/lib/axios';

const PATHS = {
  ACTIVITIES: 'https://sp-globalnomad-api.vercel.app/11-2/activities',
};

export interface Activity {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  bannerImageUrl: string;
  createdAt: string;
  category: string;
}

export interface ActivityResponse {
  activities: Activity[];
  totalCount: number;
}

export async function fetchActivities(
  page: number = 1,
  size: number = 10,
  keyword?: string
): Promise<ActivityResponse> {
  try {
    const response: AxiosResponse<ActivityResponse> = await publicApi.get(
      PATHS.ACTIVITIES,
      {
        params: {
          method: 'offset',
          page,
          size,
          ...(keyword && { keyword }),
          sort: keyword ? 'latest' : undefined
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
