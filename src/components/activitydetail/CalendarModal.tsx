import React from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일
import '@/styles/calendar.css';

interface CalendarModalProps {
  selectedDate: Date | null; // 현재 선택된 날짜
  onChange: (date: Date | null) => void; // 날짜 변경 시 호출
  getAvailableDates?: () => Date[]; // 예약 가능한 날짜 목록 반환
}

const CalendarModal = ({
  selectedDate,
  onChange,
  getAvailableDates,
}: CalendarModalProps) => {
  const availableDates = getAvailableDates ? getAvailableDates() : []; // 예약 가능 날짜 목록 가져오기

  // 날짜 셀의 클래스 설정
  const tileClassName = ({ date }: { date: Date }) => {
    const isAvailable = availableDates.some(
      (d) => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return isAvailable ? 'available' : 'pointer-events-none opacity-50';
  };

  // 날짜 변경 핸들러
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (Array.isArray(value)) {
      onChange(value[0]);
    } else {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Calendar
        onChange={handleDateChange} // 날짜 변경
        value={selectedDate} // 현재 선택된 날짜
        minDate={new Date()} // 최소 선택 날짜 (오늘 이후의 날짜만 선택 가능)
        calendarType="gregory"
        locale="en"
        formatDay={(locale, date) => date.getDate().toString()}
        tileClassName={getAvailableDates && tileClassName}
        tileDisabled={({ date }) =>
          !availableDates.some(
            (d) => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          )
        } // 예약 불가일 비활성화
        next2Label={null} // 다음 연도로 이동하는 버튼 제거
        prev2Label={null} // 이전 연도로 이동하는 버튼 제거
      />
    </div>
  );
};

export default CalendarModal;
