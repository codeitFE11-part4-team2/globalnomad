import {
  ActivityDetailResponse,
  AvailableReservations,
} from '@/lib/activitydetail/activitydetailTypes';
import React, { useState } from 'react';
import CalendarModal from '@/components/activitydetail/CalendarModal';
import { Button } from '../common/Button';
import Participant from '@/components/activitydetail/Participant';
import AvailableTimes from './AvailableTimes';
import { addDays, eachDayOfInterval, format } from 'date-fns';
import ConfirmationModal from '@/components/activitydetail/ConfirmationModal';
import { useRouter } from 'next/navigation';
import ParticipantSelectionModal from './ParticipantSelectionModal';
import DateSelectionModal from './DateSelectionModal';
import { useAuthStore } from '@/store';
import {
  useAvailableSchedule,
  useCreateReservation,
} from '@/services/ActivityReservation';
import { useQuery } from '@tanstack/react-query';
import { fetchMyReservations } from '@/lib/activitydetail/activitydetail';

interface ReservationProps {
  activity: ActivityDetailResponse;
}

const Reservation = ({ activity }: ReservationProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [headCount, setHeadCount] = useState(1);
  const router = useRouter();

  // 모달 상태
  const [showDateModal, setShowDateModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const pricePerPerson = activity.price;
  const schedules = activity.schedules;

  // 커스텀 훅을 사용하여 예약 가능한 일정 조회
  const currentDate = new Date();
  const { data: availableSchedules } = useAvailableSchedule(
    activity.id,
    format(currentDate, 'yyyy'),
    format(currentDate, 'MM')
  );

  // 예약 생성 뮤테이션 훅
  const createReservation = useCreateReservation();

  // 내 예약 내역 가져오기
  const { data: myReservations } = useQuery<AvailableReservations | null>({
    queryKey: ['myReservations', activity.id],
    queryFn: async () => {
      const data = await fetchMyReservations(Number(activity.id));
      if ('message' in data) {
        console.log('데이터 오류');
      }
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // 예약 가능한 날짜 반환 함수
  const getAvailableDates = () => {
    if (!availableSchedules) return [];
    const today = new Date();
    const endDate = addDays(today, 30);
    const allDates = eachDayOfInterval({ start: today, end: endDate });

    return allDates.filter((date) => getAvailableTimes(date).length > 0);
  };

  // 예약 가능한 시간 반환 함수
  const getAvailableTimes = (date: Date | null) => {
    if (!date || !availableSchedules) return [];

    const dateString = format(date, 'yyyy-MM-dd');
    const availableDate = availableSchedules.find(
      (schedule) => format(new Date(schedule.date), 'yyyy-MM-dd') === dateString
    );

    if (!availableDate) return [];

    const availableTimeSlots = availableDate.times;

    // 로그인한 경우에만 내 예약 시간 제외
    if (myReservations) {
      const myReservedTimes = myReservations.reservations
        .filter(
          (reservation) =>
            format(new Date(reservation.date), 'yyyy-MM-dd') === dateString
        )
        .map((reservation) => ({
          startTime: reservation.startTime,
          endTime: reservation.endTime,
        }));

      return availableTimeSlots
        .filter(
          (timeSlot) =>
            !myReservedTimes.some(
              (reserved) =>
                reserved.startTime === timeSlot.startTime &&
                reserved.endTime === timeSlot.endTime
            )
        )
        .map(
          (timeSlot) =>
            `${timeSlot.startTime} ~ ${timeSlot.endTime === '00:00' ? '24:00' : timeSlot.endTime}`
        );
    }

    // 로그인하지 않은 경우 모든 가능한 시간 반환
    return availableTimeSlots.map(
      (timeSlot) =>
        `${timeSlot.startTime} ~ ${timeSlot.endTime === '00:00' ? '24:00' : timeSlot.endTime}`
    );
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  // 시간 변경 핸들러
  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time);
  };

  const totalPrice = pricePerPerson * headCount;

  // 예약하기 핸들러
  const handleReservation = async () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해 주세요.');
      return;
    }

    // 선택된 시간에 해당하는 scheduleId 찾기
    const selectedSchedule = availableSchedules
      ?.find(
        (schedule) =>
          format(new Date(schedule.date), 'yyyy-MM-dd') ===
          format(selectedDate, 'yyyy-MM-dd')
      )
      ?.times.find(
        (time) =>
          `${time.startTime} ~ ${time.endTime === '00:00' ? '24:00' : time.endTime}` ===
          selectedTime
      );

    if (!selectedSchedule) {
      alert('선택한 시간에 대한 예약이 불가능합니다.');
      return;
    }

    try {
      await createReservation.mutateAsync({
        activityId: activity.id,
        reservationData: {
          scheduleId: selectedSchedule.id,
          headCount: headCount,
        },
      });
      setShowConfirmationModal(true);
    } catch (error) {
      console.error('예약 실패', error);
      alert(error);
    }
  };

  return (
    <div className="md:relative flex">
      <div className="hidden md:block justify-center lg:w-[384px] w-[251px] h-auto lg:p-[16px] p-[24px] border border-solid border-gray-300 rounded-xl shadow-sm bg-white">
        {/* 기존 JSX 유지 */}
        <div className="flex items-center gap-2">
          <p className="lg:text-3xl md:text-2xl text-xl font-bold">
            ₩ {pricePerPerson.toLocaleString()}
          </p>
          <p className="lg:text-xl md:text-lg text-2lg md:font-regular font-medium">
            {' '}
            / 인
          </p>
        </div>
        <hr className="lg:w-[336px] border-[1px] border-solid border-gray-300 mt-[16px]" />
        <p className="lg:mt-[16px] mt-[13px] font-bold text-xl">날짜</p>
        <div className="mt-[16px] hidden lg:block">
          <CalendarModal
            selectedDate={selectedDate}
            onChange={handleDateChange}
            getAvailableDates={getAvailableDates}
          />
        </div>
        <button
          onClick={() => setShowDateModal(true)}
          className="underline lg:hidden md:text-lg md:mt-[5px] mt-[8px] text-md font-semibold "
        >
          {selectedDate && selectedTime
            ? `${format(selectedDate, 'yy/MM/dd')} ${selectedTime}`
            : '날짜 선택하기'}
        </button>
        <p className="lg:block hidden mt-[16px] mb-[14px] font-bold text-2lg">
          예약 가능한 시간
        </p>
        <div className="lg:block hidden">
          <AvailableTimes
            availableTimes={getAvailableTimes(selectedDate)}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />
        </div>
        <hr className="lg:w-[336px] hidden lg:block border-[1px] border-solid border-gray-300 mt-[16px]" />
        <p className="lg:mt-[12px] mt-[27px] lg:mb-[8px] mb-[5px] font-bold lg:text-2lg text-xl">
          참여 인원 수
        </p>
        <Participant
          headCount={headCount}
          onParticipantsChange={(step) =>
            setHeadCount((prev) => Math.max(1, prev + step))
          }
        />
        <Button
          onClick={handleReservation}
          disabled={
            !selectedDate || !selectedTime || createReservation.isPending
          }
          className="lg:w-[336px] md:w-[203px] md:h-[56px] w-[106px] h-[48px] lg:mt-[24px] md:mt-[32px]"
        >
          {createReservation.isPending ? '예약 중...' : '예약하기'}
        </Button>
        <hr className="lg:w-[336px] border-[1px] border-solid border-gray-300 mt-[24px]" />
        <div className="hidden mt-[16px] md:flex items-center justify-between">
          <p className="font-bold text-xl">총 합계</p>
          <p className="font-bold text-xl">₩ {totalPrice.toLocaleString()}</p>
        </div>
      </div>

      {/* 모달 컴포넌트들 */}
      {showDateModal && (
        <DateSelectionModal
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          getAvailableDates={getAvailableDates}
          getAvailableTimes={getAvailableTimes}
          handleDateChange={handleDateChange}
          handleTimeChange={handleTimeChange}
          closeModal={() => setShowDateModal(false)}
        />
      )}

      {showParticipantModal && (
        <ParticipantSelectionModal
          headCount={headCount}
          onParticipantsChange={(step) =>
            setHeadCount((prev) => Math.max(1, prev + step))
          }
          closeModal={() => setShowParticipantModal(false)}
        />
      )}

      {showConfirmationModal && (
        <div
          className="hidden md:flex fixed inset-0 z-30 items-center justify-center bg-black bg-opacity-70"
          onClick={() => {
            setShowConfirmationModal(false);
            router.refresh();
          }}
        >
          <div
            className="w-[540px] h-[250px] bg-white rounded-lg shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ConfirmationModal
              onClose={() => {
                setShowConfirmationModal(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      )}

      {/* 모바일 전용 하단 바 */}
      <div className="fixed z-10 bottom-0 left-0 w-full h-[83px] bg-white border-t border-gray-300 p-4 flex justify-between items-center md:hidden">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-[6px]">
            <p className="font-bold text-xl text-nomad-black">
              ₩ {totalPrice.toLocaleString()} /
            </p>
            <button
              className="font-bold text-lg underline text-nomad-black"
              onClick={() => setShowParticipantModal(true)}
            >
              {headCount}명
            </button>
          </div>
          <button
            className="text-nomad-black underline text-md font-semibold"
            onClick={() => setShowDateModal(true)}
          >
            {selectedDate && selectedTime
              ? `${format(selectedDate, 'yy/MM/dd')} ${selectedTime}`
              : '날짜 선택하기'}
          </button>
        </div>
        <Button
          onClick={handleReservation}
          disabled={!selectedTime || createReservation.isPending}
          className="w-[120px] h-[48px]"
        >
          {createReservation.isPending ? '예약 중...' : '예약하기'}
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
