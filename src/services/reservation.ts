interface Reservation {
  id: string;
  date: string;
  status: 'completed' | 'cancelled' | 'pending';
  serviceName: string;
}

export async function fetchReservations(): Promise<Reservation[]> {
  // 실제 API 호출을 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          date: '2024-01-20',
          status: 'completed',
          serviceName: '헤어컷',
        },
        {
          id: '2',
          date: '2024-01-15',
          status: 'cancelled',
          serviceName: '염색',
        },
        {
          id: '3',
          date: '2024-01-25',
          status: 'pending',
          serviceName: '펌',
        },
      ]);
    }, 1000); // 1초 딜레이
  });
}
