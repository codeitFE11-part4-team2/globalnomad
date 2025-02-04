import { ReservationResponse } from '@/lib/reservations/types';
import { mockReservationResponse } from '@/lib/reservations/mockData';

export async function fetchReservations(): Promise<ReservationResponse> {
  // mock 데이터를 사용하여 API 호출 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReservationResponse);
    }, 1000); // 1초 딜레이
  });
}
