'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useCallback } from 'react';
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

const PAGE_SIZE = 10;

export default function ReservationList({
  selectedStatus,
}: ReservationListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);

  // Intersection Observer를 위한 ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReservationList({
    status:
      selectedStatus === 'all'
        ? undefined
        : (selectedStatus as ReservationStatus),
    size: PAGE_SIZE,
    cursorId: undefined,
  });

  const { mutate: cancelReservation, isPending: isCanceling } =
    useReservationCancel();

  // 무한 스크롤 구현
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // selectedStatus가 변경될 때 cursorId 초기화
  useEffect(() => {
    setCursorId(undefined);
  }, [selectedStatus]);

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

  const allReservations =
    data?.pages.flatMap((page) => page.reservations) ?? [];

  const filteredReservations =
    selectedStatus === 'all'
      ? allReservations
      : allReservations.filter(
          (reservation) => reservation.status === selectedStatus
        );

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
    const commonButtonClasses = 'px-2 py-1 rounded-lg text-sm font-medium';

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
            <div className="flex min-h-[8rem]">
              {/* 이미지 컨테이너 - 반응형 조정 */}
              <div className="relative w-32 min-h-[8rem]">
                <Image
                  src={reservation.activity.bannerImageUrl}
                  alt={reservation.activity.title}
                  fill
                  className="object-cover rounded-l-3xl"
                />
              </div>

              {/* 컨텐츠 컨테이너 - 반응형 패딩 및 레이아웃 조정 */}
              <div className="relative flex-1 p-4">
                <div className="flex flex-col h-full">
                  {/* 상태 표시 */}
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        reservation.status
                      )}`}
                    >
                      {getStatusText(reservation.status)}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="font-semibold text-lg md:text-2lg text-black mb-2">
                    {reservation.activity.title}
                  </h3>

                  {/* 예약 정보 - 모바일에서 더 작은 텍스트 */}
                  <div className="text-gray-900 text-sm md:text-md mb-2">
                    {reservation.date} · {reservation.startTime}-
                    {reservation.endTime} · {reservation.headCount}명
                  </div>

                  {/* 가격과 버튼 */}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm sm:text-md md:text-lg font-bold text-black">
                      ￦{reservation.totalPrice.toLocaleString()}
                    </span>
                    <div>{getActionButton(reservation)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Intersection Observer를 위한 타겟 요소 */}
        <div ref={loadMoreRef} className="h-10">
          {isFetchingNextPage && <div>더 불러오는 중...</div>}
        </div>
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
