import { useState } from 'react';
import {
  useDailySchedule,
  useReservations,
  useUpdateReservationStatus,
} from '@/services/ReservationStatus';

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
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);

  // 날짜별 예약 스케줄 조회
  const { data: schedules = [] } = useDailySchedule(activityId, date, {
    enabled: isOpen,
  });

  // 예약 상태 업데이트 뮤테이션
  const { mutate: updateStatus } = useUpdateReservationStatus();

  // 선택된 스케줄의 예약 목록 조회
  const { data: pendingReservations } = useReservations(
    {
      activityId,
      scheduleId: selectedSchedule ?? 0,
      status: 'pending',
      size: 100,
    },
    { enabled: !!selectedSchedule }
  );

  const { data: confirmedReservations } = useReservations(
    {
      activityId,
      scheduleId: selectedSchedule ?? 0,
      status: 'confirmed',
      size: 100,
    },
    { enabled: !!selectedSchedule }
  );

  const { data: declinedReservations } = useReservations(
    {
      activityId,
      scheduleId: selectedSchedule ?? 0,
      status: 'declined',
      size: 100,
    },
    { enabled: !!selectedSchedule }
  );

  // 모든 예약을 합치고 정렬
  const allReservations = [
    ...(pendingReservations?.reservations ?? []),
    ...(confirmedReservations?.reservations ?? []),
    ...(declinedReservations?.reservations ?? []),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleConfirm = async (reservationId: number) => {
    updateStatus({
      activityId,
      reservationId,
      status: 'confirmed',
    });
  };

  const handleDecline = async (reservationId: number) => {
    updateStatus({
      activityId,
      reservationId,
      status: 'declined',
    });
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
            })}{' '}
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
                <span className="text-blue-500">
                  {selectedSchedule === schedule.scheduleId ? '▲' : '▼'}
                </span>
              </div>

              {selectedSchedule === schedule.scheduleId && (
                <div className="mt-4 space-y-4">
                  {allReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className={`flex justify-between items-center p-3 rounded ${
                        reservation.status === 'pending'
                          ? 'bg-yellow-50'
                          : reservation.status === 'confirmed'
                            ? 'bg-green-50'
                            : 'bg-red-50'
                      }`}
                    >
                      <div>
                        <div className="font-medium">
                          {reservation.nickname}
                        </div>
                        <div className="text-sm text-gray-600">
                          인원: {reservation.headCount}명 | 금액:{' '}
                          {reservation.totalPrice.toLocaleString()}원 |{' '}
                          {new Date(reservation.createdAt).toLocaleDateString(
                            'ko-KR',
                            {
                              year: '2-digit',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </div>
                      </div>
                      <div className="space-x-2">
                        {reservation.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleConfirm(reservation.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              확정하기
                            </button>
                            <button
                              onClick={() => handleDecline(reservation.id)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
                            >
                              거절하기
                            </button>
                          </>
                        )}
                        {reservation.status === 'confirmed' && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                            승인됨
                          </span>
                        )}
                        {reservation.status === 'declined' && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">
                            거절됨
                          </span>
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
