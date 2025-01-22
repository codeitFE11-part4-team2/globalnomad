import { ReservationHistoryContainer } from './ReservationHistoryContainer';
import { fetchReservations } from '@/services/reservation';

export default async function ReservationHistoryPage() {
  // 예시: 초기 데이터 페칭
  const initialReservations = await fetchReservations();

  return <ReservationHistoryContainer initialData={initialReservations} />;
}
