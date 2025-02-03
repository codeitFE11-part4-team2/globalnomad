'use client';

import { Filter } from './_components/ReservationFilter';
import { ReservationList } from './_components/ReservationList';
import { useState } from 'react';
import { ReservationResponse, Reservation } from '@/lib/reservations/types';

interface ReservationHistoryContainerProps {
  initialData: ReservationResponse;
}

export const ReservationHistoryContainer = ({
  initialData,
}: ReservationHistoryContainerProps) => {
  const [reservations, setReservations] = useState<Reservation[]>(
    initialData.reservations
  );
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredReservations = reservations.filter((reservation) =>
    selectedStatus === 'all' ? true : reservation.status === selectedStatus
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">예약 내역</h1>
      <Filter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <ReservationList reservations={filteredReservations} />
    </div>
  );
};
