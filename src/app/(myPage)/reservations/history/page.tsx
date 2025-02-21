'use client';
import { useState } from 'react';
import ReservationList from './_components/ReservationList';
import { ReservationFilter } from './_components/ReservationFilter';

export default function HistoryPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="flex flex-col h-[calc(100vh-142px)]">
      <div className="p-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-black mb-4">예약 내역</h1>
          <ReservationFilter
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto pb-4">
        <ReservationList selectedStatus={selectedStatus} />
      </div>
    </div>
  );
}
