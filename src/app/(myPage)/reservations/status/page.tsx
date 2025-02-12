'use client';

import { useState } from 'react';
import SelectActivity from './_components/SelectActivity';
import ActivityStatusCalendar from './_components/ActivityStatusCalendar';
import ActivityReservationModal from './_components/ActivityReservationModal';
import { mockActivityList } from '@/lib/reservations/mockData';

export default function ReservationStatusPage() {
  const [selectedActivity, setSelectedActivity] = useState(
    mockActivityList.activities[0]
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-black mb-6">내 체험 예약 현황</h1>
      <div className="space-y-6">
        <SelectActivity
          activities={mockActivityList.activities}
          selectedActivity={selectedActivity}
          onSelectActivity={setSelectedActivity}
        />
        <ActivityStatusCalendar
          activityId={selectedActivity.id}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setIsModalOpen(true);
          }}
        />
        {selectedDate && (
          <ActivityReservationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            activityId={selectedActivity.id}
            date={selectedDate}
          />
        )}
      </div>
    </div>
  );
}
