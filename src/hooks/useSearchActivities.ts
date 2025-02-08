import { useState, useEffect } from 'react';
import { publicAxios } from '@/lib/axios';
import { Activity } from '@/lib/activity/activity';

interface SearchResult {
  totalCount: number;
  activities: Activity[];
}

export const useSearchActivities = (keyword: string, category: string) => {
  const [data, setData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!keyword && category === '전체') return;
      
      setIsLoading(true);
      try {
        const response = await publicAxios.get<SearchResult>('https://sp-globalnomad-api.vercel.app/11-2/activities', {
          params: {
            keyword,
            category: category !== '전체' ? category : undefined
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [keyword, category]);

  return { data, isLoading, error };
};
