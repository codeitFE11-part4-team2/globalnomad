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
  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');

  // 날짜별 예약 스케줄 조회
  const { data: schedules = [] } = useDailySchedule(activityId, date, {
    enabled: isOpen,
  });

  // 전체 예약 개수 계산
  const totalCounts = schedules.reduce(
    (acc, schedule) => ({
      pending: acc.pending + schedule.count.pending,
      confirmed: acc.confirmed + schedule.count.confirmed,
      declined: acc.declined + schedule.count.declined,
    }),
    { pending: 0, confirmed: 0, declined: 0 }
  );

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
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-bold">예약 정보</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* 탭 영역 */}
        <div className="flex gap-4 mt-6 mb-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex gap-2 px-4 py-2 rounded-full ${
              activeTab === 'pending' ? 'text-nomad-black' : 'text-gray-500'
            }`}
          >
            신청
            <span className="font-medium">{totalCounts.pending}</span>
          </button>
          <button
            onClick={() => setActiveTab('confirmed')}
            className={`flex gap-2 px-4 py-2 rounded-full  ${
              activeTab === 'confirmed' ? 'text-nomad-black' : 'text-gray-500'
            }`}
          >
            승인<span className="font-medium">{totalCounts.confirmed}</span>
          </button>
          <button
            onClick={() => setActiveTab('declined')}
            className={`flex gap-2 px-4 py-2 rounded-full ${
              activeTab === 'declined' ? 'text-nomad-black' : 'text-gray-500'
            }`}
          >
            거절<span className="font-medium">{totalCounts.declined}</span>
          </button>
        </div>

        {/* 날짜 영역 */}
        <div className="mb-4">
          <div className="text-sm text-gray-500">예약 날짜</div>
          <div className="text-lg font-medium">
            {new Date(date).toISOString().split('T')[0]}
          </div>
        </div>

        {/* 스케줄 선택 필터 */}
        <div className="mb-6">
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedSchedule ?? ''}
            onChange={(e) =>
              setSelectedSchedule(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">시간을 선택하세요</option>
            {schedules.map((schedule) => (
              <option key={schedule.scheduleId} value={schedule.scheduleId}>
                {schedule.startTime} - {schedule.endTime}
              </option>
            ))}
          </select>
        </div>

        {/* 예약 내역 카드 목록 */}
        <div className="space-y-4">
          {allReservations
            .filter((reservation) =>
              activeTab === 'pending'
                ? reservation.status === 'pending'
                : activeTab === 'confirmed'
                  ? reservation.status === 'confirmed'
                  : reservation.status === 'declined'
            )
            .map((reservation) => (
              <div
                key={reservation.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-lg font-medium">
                      닉네임 {reservation.nickname}
                    </div>
                    <div className="text-sm text-gray-600">
                      인원 {reservation.headCount}명
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(reservation.createdAt).toLocaleTimeString(
                      'ko-KR',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </div>
                </div>

                {reservation.status === 'pending' && (
                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      onClick={() => handleConfirm(reservation.id)}
                      className="px-4 py-2 bg-nomad-black text-white rounded-lg hover:bg-gray-900"
                    >
                      승인하기
                    </button>
                    <button
                      onClick={() => handleDecline(reservation.id)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      거절하기
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
