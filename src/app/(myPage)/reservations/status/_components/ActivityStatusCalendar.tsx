'use client';

import { MonthlyReservationStatus } from '@/lib/reservations/types';
import { useEffect, useState } from 'react';
import ReservationStatus from './ReservationStatus';
import {
  mockMonthlyReservationStatus,
  mockTimeSchedule,
} from '@/lib/reservations/mockData';

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
  // 예약 데이터
  const [monthlyData, setMonthlyData] = useState<MonthlyReservationStatus[]>(
    []
  );

  // 요일
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 현재 날짜
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // 이전월의 마지막 날짜들 계산(첫 주 채우기 용)
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

  // 다음달시작 날짜들(마지막주 채우기용)
  const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
  }));

  // 전체 날짜 배열
  const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  // 월 변경 행들러
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

  // 예약 데이터 가져오기 (실제로는 API 호출 예정)
  useEffect(() => {
    const fetchMonthlyData = async () => {
      // activityId가 일치하는 예약 데이터만 필터링
      const filteredReservations = mockTimeSchedule.reservations
        .filter((reservation) => reservation.activityId === activityId)
        .map((reservation) => ({
          date: reservation.date, // 날짜
          reservations: {
            completed: reservation.status === 'completed' ? 1 : 0,
            confirmed: reservation.status === 'confirmed' ? 1 : 0,
            pending: reservation.status === 'pending' ? 1 : 0,
          },
        }));

      setMonthlyData(filteredReservations);
    };

    fetchMonthlyData();
  }, [activityId, currentDate]);

  // 날짜에 해당하는 예약 상태 찾기
  const getReservationStatus = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return (
      monthlyData.find((data) => data.date === dateStr)?.reservations || {
        completed: 0,
        confirmed: 0,
        pending: 0,
      }
    );
  };

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
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

  // 날짜 렌더 메서드
  const renderDateCell = (day: DayInfo, idx: number) => {
    const date = calculateDate(day);
    const status = getReservationStatus(date);

    return (
      <div
        key={idx}
        onClick={() => day.isCurrentMonth && onSelectDate(formatDate(date))}
        className={`p-2 text-center hover:bg-gray-100 cursor-pointer ${
          !day.isCurrentMonth ? 'text-gray-400' : ''
        }`}
      >
        {day.day}
        <ReservationStatus {...status} />
      </div>
    );
  };

  return (
    <>
      <div className="p-4">
        {/* 월 내비게이션 */}
        <div className="flex justify-between items-center">
          <button onClick={handlePrevMonth}>이전</button>
          <span>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button onClick={handleNextMonth}>다음</button>
        </div>
        {/* 달력 */}
        <div>
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) => renderDateCell(day, idx))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityStatusCalendar;
