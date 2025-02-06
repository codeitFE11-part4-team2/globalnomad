import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '@/lib/activity/activity';

export function useActivities(page: number, pageSize: number, keyword?: string) {
  return useQuery({
    queryKey: ['activities', page, pageSize, keyword],
    queryFn: () => fetchActivities(page, pageSize, keyword),
    staleTime: 1000 * 60, // 1분
    placeholderData: (previousData) => previousData, // 페이지네이션 시 이전 데이터 유지
  });
}
