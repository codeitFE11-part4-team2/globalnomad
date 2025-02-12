import React from 'react';
import CalendarModal from '@/components/activitydetail/CalendarModal';
import AvailableTimes from './AvailableTimes';
import { format } from 'date-fns';
import Image from 'next/image';
import x from '../../../public/icons/icon-x.svg';
import { Button } from '../common/Button';

interface DateSelectionModalProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  getAvailableDates: () => Date[];
  getAvailableTimes: (date: Date | null) => string[];
  handleDateChange: (date: Date | null) => void;
  handleTimeChange: (time: string | null) => void;
  closeModal: () => void;
}

const DateSelectionModal = ({
  selectedDate,
  selectedTime,
  getAvailableDates,
  getAvailableTimes,
  handleDateChange,
  handleTimeChange,
  closeModal,
}: DateSelectionModalProps) => {
  return (
    <div className="md:absolute md:bottom-0 md:left-0 md:z-20 fixed right-0 top-0 z-50 flex md:w-[480px] md:h-[559px] h-full w-full items-center justify-center">
      <div className="relative bg-white p-5 md:rounded-[24px] md:w-[480px] md:h-auto w-full h-full">
        <p className="mb-[20px] text-[28px] font-bold">날짜 선택</p>
        <button
          onClick={closeModal}
          className="absolute right-[24px] top-[28px] flex items-center justify-center"
        >
          <Image src={x} alt="x" width={40} height={40} />
        </button>
        <CalendarModal
          selectedDate={selectedDate}
          onChange={handleDateChange}
          getAvailableDates={getAvailableDates}
        />
        <p className="mt-[32px] mb-[14px] font-bold text-2lg">
          예약 가능한 시간
        </p>
        <AvailableTimes
          availableTimes={getAvailableTimes(selectedDate)}
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
        />
        <div className="flex items-center justify-center mb-[32px]">
          <Button
            onClick={closeModal}
            disabled={!selectedDate || !selectedTime}
            className="hidden md:block mt-[64px] w-[432px] h-[56px]"
          >
            예약하기
          </Button>
          <Button
            onClick={closeModal}
            disabled={!selectedDate || !selectedTime}
            className="block md:hidden mt-[64px] w-[432px] h-[56px]"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectionModal;
