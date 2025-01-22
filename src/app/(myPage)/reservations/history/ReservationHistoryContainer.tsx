'use client';

import { ReservationList } from './_components/ReservationList';
import { useState } from 'react';

interface Reservation {
  id: string;
  date: string;
  status: 'completed' | 'cancelled' | 'pending';
  serviceName: string;
}

interface ReservationHistoryContainerProps {
  initialData?: Reservation[];
}

export const ReservationHistoryContainer = ({
  initialData = [],
}: ReservationHistoryContainerProps) => {
  // 상태 관리, 이벤트 핸들러 등 로직 추가
  const [reservations, setReservations] = useState(initialData);

  const handleSomeAction = () => {
    alert('리스트');
  };

  return (
    <ReservationList
      reservations={reservations}
      onSomeAction={handleSomeAction}
    />
  );
};
