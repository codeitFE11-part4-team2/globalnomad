import { useState, useEffect } from 'react';
import { DailySchedule, TimeReservation } from '@/lib/reservations/types';
import {
  mockDailySchedule,
  mockTimeSchedule,
} from '@/lib/reservations/mockData';

interface ActivityReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  date: string;
}

export default function ActivityReservationModal({
  isOpen,
  onClose,
  activityId,
  date,
}: ActivityReservationModalProps) {
  const [schedules, setSchedules] = useState<DailySchedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [reservations, setReservations] = useState<TimeReservation[]>([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        // 해당 날짜의 예약만 필터링
        const filteredReservations = mockTimeSchedule.reservations.filter(
          (reservation) => reservation.date === date
        );

        if (filteredReservations.length > 0) {
          // 예약이 있는 스케줄 ID들 추출
          const schedulesWithReservations = new Set(
            filteredReservations.map((reservation) => reservation.scheduleId)
          );

          // 예약이 있는 스케줄만 필터링
          const filteredSchedules = mockDailySchedule.filter((schedule) =>
            schedulesWithReservations.has(schedule.scheduleId)
          );

          setSchedules(filteredSchedules);
          setReservations(filteredReservations);
        } else {
          setSchedules([]);
          setReservations([]);
        }
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
        setSchedules([]);
        setReservations([]);
      }
    };

    if (isOpen) {
      fetchScheduleData();
    }
  }, [isOpen, activityId, date]);

  const handleConfirm = async (reservationId: number, scheduleId: number) => {
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === reservationId) {
        return {
          ...reservation,
          status: 'confirmed',
          updatedAt: new Date().toISOString(),
        };
      }
      return reservation;
    });
    setReservations(updatedReservations);
  };

  const handleDecline = async (reservationId: number) => {
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === reservationId) {
        return {
          ...reservation,
          status: 'declined',
          updatedAt: new Date().toISOString(),
        };
      }
      return reservation;
    });
    setReservations(updatedReservations);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            {new Date(date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            예약 현황
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            닫기
          </button>
        </div>

        <div className="space-y-6">
          {schedules.map((schedule) => (
            <div key={schedule.scheduleId} className="border rounded-lg p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setSelectedSchedule(
                    selectedSchedule === schedule.scheduleId
                      ? null
                      : schedule.scheduleId
                  )
                }
              >
                <div>
                  <span className="font-medium">
                    {schedule.startTime} - {schedule.endTime}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    승인: {schedule.count.confirmed} | 대기:{' '}
                    {schedule.count.pending} | 거절: {schedule.count.declined}
                  </div>
                </div>
                <span className="text-blue-500">▼</span>
              </div>

              {selectedSchedule === schedule.scheduleId && (
                <div className="mt-4 space-y-4">
                  {reservations
                    .filter((r) => r.scheduleId === schedule.scheduleId)
                    .map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <div className="font-medium">
                            {reservation.nickname}
                          </div>
                          <div className="text-sm text-gray-600">
                            인원: {reservation.headCount}명 | 금액:{' '}
                            {reservation.totalPrice.toLocaleString()}원
                          </div>
                        </div>
                        <div className="space-x-2">
                          {reservation.status === 'pending' && (
                            <>
                              <button
                                onClick={() =>
                                  handleConfirm(
                                    reservation.id,
                                    schedule.scheduleId
                                  )
                                }
                                className="px-4 py-2 bg-nomad-black text-white rounded hover:bg-gray-900"
                              >
                                확정하기
                              </button>
                              <button
                                onClick={() => handleDecline(reservation.id)}
                                className="px-4 py-2 bg-white text-nomad-black rounded hover:bg-gray-800"
                              >
                                거절하기
                              </button>
                            </>
                          )}
                          {reservation.status === 'confirmed' && (
                            <span className="text-green-600">승인됨</span>
                          )}
                          {reservation.status === 'declined' && (
                            <span className="text-red-600">거절됨</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
