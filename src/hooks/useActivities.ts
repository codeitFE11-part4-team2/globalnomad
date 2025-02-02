import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '@/lib/activity/activity';

export function useActivities(page: number, pageSize: number) {
  return useQuery({
    queryKey: ['activities', page, pageSize],
    queryFn: () => fetchActivities(page, pageSize),
    staleTime: 1000 * 60, // 1분
    placeholderData: (previousData) => previousData, // 페이지네이션 시 이전 데이터 유지
  });
}
