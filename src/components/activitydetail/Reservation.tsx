import { ActivityDetailResponse } from '@/lib/activitydetail/activitydetailTypes';
import React, { useState } from 'react';
import CalendarModal from '@/components/activitydetail/CalendarModal';
import { Button } from '../common/Button';
import Participant from '@/components/activitydetail/Participant';
import AvailableTimes from './AvailableTimes';
import { addDays, eachDayOfInterval, format } from 'date-fns';
import ConfirmationModal from '@/components/activitydetail/ConfirmationModal';
import router from 'next/router';
import ParticipantSelectionModal from './ParticipantSelectionModal';
import DateSelectionModal from './DateSelectionModal';
import { bookActivity } from '@/lib/activitydetail/activitydetail';
import { useAuthStore } from '@/store';

interface ReservationProps {
  activity: ActivityDetailResponse;
}

const Reservation = ({ activity }: ReservationProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [headCount, setHeadCount] = useState(1);
  const [loading, setLoading] = useState(false);

  // 모달 상태
  const [showDateModal, setShowDateModal] = useState(false); // 날짜 선택 모달
  const [showParticipantModal, setShowParticipantModal] = useState(false); // 인원 선택 모달
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // 예약 완료 모달

  const pricePerPerson = activity.price;
  const schedules = activity.schedules;

  // 예약 가능한 날짜 반환 함수
  const getAvailableDates = () => {
    const today = new Date();
    const endDate = addDays(today, 30);
    const allDates = eachDayOfInterval({ start: today, end: endDate });

    return allDates.filter((date) => getAvailableTimes(date).length > 0);
  };

  // 예약 가능한 시간 반환 함수
  const getAvailableTimes = (date: Date | null) => {
    if (!date) return [];
    return schedules
      .filter(
        (schedule) =>
          format(new Date(schedule.date), 'yyyy-MM-dd') ===
          format(date, 'yyyy-MM-dd')
      )
      .map(
        (schedule) =>
          `${schedule.startTime} ~ ${schedule.endTime === '00:00' ? '24:00' : schedule.endTime}`
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

  const totalPrice = pricePerPerson * headCount; // 총 가격

  // 예약하기
  const handleReservation = async () => {
    const token = useAuthStore.getState().token; // 현재 로그인 상태 확인

    if (!token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login'; // 로그인 페이지로 이동
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해 주세요.');
      return;
    }

    const selectedSchedule = schedules.find(
      (schedule) =>
        format(new Date(schedule.date), 'yyyy-MM-dd') ===
          format(selectedDate, 'yyyy-MM-dd') &&
        schedule.startTime === selectedTime.split(' ~ ')[0]
    );

    if (!selectedSchedule) {
      alert('선택한 시간에 대한 예약이 불가능합니다.');
      return;
    }

    try {
      setLoading(true);
      await bookActivity(activity.id, selectedSchedule.id, headCount);
      setShowConfirmationModal(true);
    } catch (error) {
      console.error('예약 실패', error);
      alert('예약에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:relative flex">
      <div className="hidden md:block justify-center lg:w-[384px] w-[251px] h-auto lg:p-[16px] p-[24px] border border-solid border-gray-300 rounded-xl shadow-sm bg-white">
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
          disabled={!selectedDate || !selectedTime}
          className="lg:w-[336px] md:w-[203px] md:h-[56px] w-[106px] h-[48px] lg:mt-[24px] md:mt-[32px]"
        >
          예약하기
        </Button>
        <hr className="lg:w-[336px] border-[1px] border-solid border-gray-300 mt-[24px]" />
        <div className="hidden mt-[16px] md:flex items-center justify-between">
          <p className="font-bold text-xl">총 합계</p>
          <p className="font-bold text-xl">₩ {totalPrice.toLocaleString()}</p>
        </div>
      </div>

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
          onClick={() => {
            if (!selectedDate || !selectedTime) return;
          }}
          disabled={!selectedTime}
          className="w-[120px] h-[48px]"
        >
          예약하기
        </Button>
      </div>

      {/* 날짜 선택 모달 */}
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

      {/* 인원 선택 모달 */}
      {showParticipantModal && (
        <ParticipantSelectionModal
          headCount={headCount}
          onParticipantsChange={(step) =>
            setHeadCount((prev) => Math.max(1, prev + step))
          }
          closeModal={() => setShowParticipantModal(false)}
        />
      )}

      {/* 예약 완료 모달 */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <ConfirmationModal
              onClose={() => {
                setShowConfirmationModal(false);
                router.push(`/activity-details/${activity.id}`);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
