'use client';

import { useState } from 'react';
import SelectActivity from './_components/SelectActivity';
import ActivityStatusCalendar from './_components/ActivityStatusCalendar';
import ActivityReservationModal from './_components/ActivityReservationModal';
import { useMyActivities } from '@/services/ReservationStatus';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <div className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        아직 등록한 체험이 없어요
      </h3>
      <p className="text-gray-600 text-center mb-6">
        새로운 체험을 등록하고 예약을 받아보세요
      </p>
      <a
        href="/createactivity"
        className="px-6 py-3 bg-nomad-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      >
        체험 등록하기
      </a>
    </div>
  );
}

export default function ReservationStatusPage() {
  const { data: activitiesData, isLoading } = useMyActivities({
    size: 100,
  });

  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black mb-6">예약 현황</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // 활동이 없을 때
  if (!activitiesData?.activities.length) {
    return (
      <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black mb-6">예약 현황</h1>
        <EmptyState />
      </div>
    );
  }

  // 활동이 있지만 선택된 활동이 없을 때 첫 번째 활동 선택
  if (!selectedActivity) {
    setSelectedActivity(activitiesData.activities[0].id);
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">예약 현황</h1>
      <div className="space-y-6">
        <SelectActivity
          activities={activitiesData.activities}
          selectedActivityId={selectedActivity}
          onSelectActivity={setSelectedActivity}
        />
        {selectedActivity && (
          <ActivityStatusCalendar
            activityId={selectedActivity}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setIsModalOpen(true);
            }}
          />
        )}
        {selectedDate && selectedActivity && (
          <ActivityReservationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            activityId={selectedActivity}
            date={selectedDate}
          />
        )}
      </div>
    </div>
  );
}
