'use client';
import Link from 'next/link';
import Image from 'next/image';
import CancelModal from './CancelModal';
import { useState } from 'react';
import {
  useReservationCancel,
  useReservationList,
} from '@/services/ReservationHistory';
import { ReservationStatus, Reservation } from '@/types/ReservationHistory';
import NoReservations from './NoReservations';

interface ReservationListProps {
  selectedStatus: string;
}

export default function ReservationList({
  selectedStatus,
}: ReservationListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);

  // 리액트 쿼리로 예약 목록 조회
  const { data, isLoading, error } = useReservationList({
    status:
      selectedStatus === 'all'
        ? undefined
        : (selectedStatus as ReservationStatus),
  });

  // 예약 취소
  const { mutate: cancelReservation, isPending: isCanceling } =
    useReservationCancel();

  const handleCancelClick = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedReservationId) {
      cancelReservation(selectedReservationId, {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedReservationId(null);
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  const filteredReservations =
    selectedStatus === 'all'
      ? data?.reservations
      : data?.reservations.filter(
          (reservation) => reservation.status === selectedStatus
        );

  // 데이터가 없거나 필터링된 결과가 없는 경우
  if (!filteredReservations || filteredReservations.length === 0) {
    return <NoReservations />;
  }

  const getStatusStyle = (status: string) => {
    const styles = {
      pending: 'text-blue-2',
      completed: 'text-gray-800',
      confirmed: 'text-orange-2',
      canceled: 'text-gray-800',
      declined: 'text-red-3',
    };
    return styles[status as keyof typeof styles] || 'text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: '예약 완료',
      completed: '체험 완료',
      confirmed: '예약 승인',
      canceled: '예약 취소',
      declined: '예약 거절',
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getActionButton = (reservation: Reservation) => {
    const commonButtonClasses = 'px-4 py-2 rounded-lg text-sm font-medium';

    if (reservation.status === 'pending') {
      return (
        <button
          className={`${commonButtonClasses} bg-white text-nomad-black border border-nomad-black hover:bg-red-50`}
          onClick={() => handleCancelClick(reservation.id)}
        >
          예약 취소
        </button>
      );
    }

    if (reservation.status === 'completed') {
      if (reservation.reviewSubmitted) {
        return (
          <span className="text-gray-700 text-sm font-medium">
            후기 작성 완료
          </span>
        );
      }
      return (
        <Link
          href={{
            pathname: `/reservations/review/${reservation.id}`,
            query: {
              title: reservation.activity.title,
              date: reservation.date,
              time: `${reservation.startTime}-${reservation.endTime}`,
              headCount: reservation.headCount,
              imageUrl: reservation.activity.bannerImageUrl,
              price: reservation.totalPrice,
            },
          }}
          className={`${commonButtonClasses} bg-nomad-black text-white hover:bg-gray-900`}
        >
          후기 작성
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      <div className="space-y-4">
        {filteredReservations?.map((reservation) => (
          <div key={reservation.id} className="border shadow-md rounded-3xl">
            <div className="flex">
              {/* 왼쪽 이미지 */}
              <div className="relative w-48 h-48">
                <Image
                  src={reservation.activity.bannerImageUrl}
                  alt={reservation.activity.title}
                  fill
                  className="object-cover rounded-l-lg"
                />
              </div>

              {/* 오른쪽 내용 */}
              <div className="relative flex-1 p-4">
                <div className="flex flex-col h-full">
                  {/* 상태 */}
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`py-1 rounded-full text-sm font-medium ${getStatusStyle(reservation.status)}`}
                    >
                      {getStatusText(reservation.status)}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="font-semibold text-lg text-black mb-2">
                    {reservation.activity.title}
                  </h3>

                  {/* 날짜/시간/인원 */}
                  <div className="text-gray-900 text-md mb-2">
                    {reservation.date} · {reservation.startTime}-
                    {reservation.endTime} · {reservation.headCount}명
                  </div>

                  {/* 가격과 액션 버튼 */}
                  <div className="flex justify-between items-center text-lg font-bold text-black mt-auto">
                    <span>￦{reservation.totalPrice.toLocaleString()}</span>
                    <div>{getActionButton(reservation)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CancelModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReservationId(null);
        }}
        onConfirm={handleConfirmCancel}
        isLoading={isCanceling}
      />
    </>
  );
}
