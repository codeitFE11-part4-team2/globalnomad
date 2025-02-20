'use client';

import { useEffect, useState } from 'react';
import ReservationStatus from './ReservationStatus';
import { useMonthlyDashboard } from '@/services/ReservationStatus';

interface ActivityCalendarProps {
  activityId: number;
  onSelectDate: (date: string) => void;
}

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
}

const ActivityStatusCalendar = ({
  activityId,
  onSelectDate,
}: ActivityCalendarProps) => {
  // 요일
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 현재 날짜
  const [currentDate, setCurrentDate] = useState(new Date());

  // API 호출
  const { data: monthlyData } = useMonthlyDashboard(
    activityId,
    currentDate.getFullYear().toString(),
    (currentDate.getMonth() + 1).toString().padStart(2, '0')
  );

  // 현재 월의 시작일, 종료일 계산
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // 이전월의 마지막 날짜들 계산
  const startDay = startDate.getDay();
  const prevMonthDays = Array.from({ length: startDay }, (_, i) => ({
    day: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      -i
    ).getDate(),
    isCurrentMonth: false,
  })).reverse();

  // 현재 월의 날짜들
  const currentMonthDays = Array.from(
    { length: endDate.getDate() },
    (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
    })
  );

  // 다음달 시작 날짜들
  const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
  }));

  // 전체 날짜 배열
  const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  // 월 변경 핸들러
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // 날짜에 해당하는 예약 상태 찾기
  const getReservationStatus = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return (
      monthlyData?.find((data) => data.date === dateStr)?.reservations || {
        completed: 0,
        confirmed: 0,
        pending: 0,
      }
    );
  };

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // 날짜 계산
  const calculateDate = (day: DayInfo) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + (day.isCurrentMonth ? 0 : day.day > 15 ? -1 : 1),
      day.day
    );
    date.setHours(12); // 날짜 밀림 방지
    return date;
  };

  // 날짜 셀 렌더링
  const renderDateCell = (day: DayInfo, idx: number) => {
    const date = calculateDate(day);
    const status = getReservationStatus(date);

    return (
      <div
        key={idx}
        className={`px-2 text-left h-full  ${
          !day.isCurrentMonth ? 'text-gray-400' : ''
        }`}
      >
        {day.day}
        <div
          className="cursor-pointer"
          onClick={() => day.isCurrentMonth && onSelectDate(formatDate(date))}
        >
          <ReservationStatus {...status} />
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* 월 내비게이션 */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          &lt;&lt;
        </button>
        <span className="text-lg font-medium">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </span>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          &gt;&gt;
        </button>
      </div>

      {/* 달력 */}
      <div className="border border-gray-200 ">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-0">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-left font-medium p-2 bg-gray-50 border border-gray-200"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-0">
          {days.map((day, idx) => (
            <div key={idx} className="border border-gray-200 h-20">
              {renderDateCell(day, idx)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStatusCalendar;
