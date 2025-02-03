import { useQuery } from '@tanstack/react-query';
import { fetchPopularActivities } from '@/lib/popularactivity/popularactivity';

export function usePopularActivities(page: number) {
  return useQuery({
    queryKey: ['popularActivities', page],
    // React Query 캐싱을 위한 고유 키
    queryFn: () => fetchPopularActivities(page),
    // 데이터를 가져오기 위한 비동기 함수
    staleTime: 1000 * 60 * 5, // 5분
    // 데이터가 'stale(오래된)' 상태로 간주되기까지의 시간 (밀리초 단위)
    gcTime: 1000 * 60 * 60, // 1시간
    // 캐시된 데이터가 가비지 컬렉션(GC)으로 제거되기까지의 시간 (밀리초 단위)
  });
}
