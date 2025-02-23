'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface Props {
  schedules: Schedule[];
  setSchedulesAction: (schedules: Schedule[]) => void;
}

export default function ScheduleInput({
  schedules,
  setSchedulesAction,
}: Props) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const formatDate = (date: string) => {
    if (!date) return '';
    return date; // HTML date input이 이미 YYYY-MM-DD 형식을 사용하므로 그대로 반환
  };
  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };
  const isOverlapping = (newDate: string, newStart: string, newEnd: string) => {
    const newStartMinutes = timeToMinutes(newStart);
    const newEndMinutes = timeToMinutes(newEnd);

    return schedules.some(({ date, startTime, endTime }) => {
      if (date !== newDate) return false;

      const existingStart = timeToMinutes(startTime);
      const existingEnd = timeToMinutes(endTime);

      return (
        (newStartMinutes >= existingStart && newStartMinutes < existingEnd) ||
        (newEndMinutes > existingStart && newEndMinutes <= existingEnd) ||
        (newStartMinutes <= existingStart && newEndMinutes >= existingEnd)
      );
    });
  };
  const addSchedule = () => {
    const dateInput = dateInputRef.current?.value;
    if (!dateInput || !startTime || !endTime) {
      alert('날짜와 시간을 선택해주세요');
      return;
    }
    const formattedDate = formatDate(dateInput);
    if (isOverlapping(formattedDate, startTime, endTime)) {
      alert('이미 예약된 시간과 겹칩니다. 다른 시간을 선택해주세요');
      return;
    }
    console.log('Current schedules:', schedules);
    const newSchedule = {
      id: Date.now(),
      date: formattedDate,
      startTime,
      endTime,
    };
    console.log('Adding new schedule:', newSchedule);
    setSchedulesAction([...schedules, newSchedule]);
    console.log('Updated schedules:', [...schedules, newSchedule]);
    if (dateInputRef.current) dateInputRef.current.value = '';
    setStartTime('');
    setEndTime('');
  };
  const removeSchedule = (id: number) => {
    setSchedulesAction(schedules.filter((schedule) => schedule.id !== id));
  };
  return (
    <>
      <span className="mt-6 hidden text-2xl font-bold text-black md:block">
        예약 가능한 시간대
      </span>
      <div className="w-full mt-6">
        <div className="flex items-end">
          <div className="relative flex w-[130px] flex-col gap-2.5 mr-[5px] md:w-[149px] lg:w-[379px] lg:mr-5">
            <label className="font-pretendard text-base font-medium leading-[26px] text-[#4B4B4B]">
              날짜
            </label>
            <div className="relative">
              <input
                type="date"
                ref={dateInputRef}
                className="h-[44px] w-full border border-[#A1A1A1] rounded-md text-lg peer pl-2 md:h-14"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                onClick={() => dateInputRef.current?.showPicker()}
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8">
                  <Image src="/icons/calendar_icon.svg" alt="달력아이콘" fill />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-[79px] flex-col gap-2.5 md:w-[104px] lg:w-[140px]">
            <span className="font-pretendard text-base font-medium leading-[26px] text-[#4B4B4B]">
              시작 시간
            </span>
            <select
              name="new_schedule_start"
              className="h-[44px] rounded-md border border-[#A1A1A1] pl-2 md:h-14"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setEndTime('');
              }}
            >
              <option value="" disabled hidden>
                선택
              </option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                  {i.toString().padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>
          <span className="mx-3 hidden pb-4 text-xl font-bold md:block">~</span>
          <div className="ml-[5px] flex w-[79px] flex-col gap-2.5 md:w-[104px] lg:w-[140px] lg:ml-0">
            <span className="font-pretendard text-base font-medium leading-[26px] text-[#4B4B4B]">
              종료 시간
            </span>
            <select
              name="new_schedule_end"
              className="h-[44px] rounded-md border border-[#A1A1A1] pl-2 md:h-14"
              value={endTime || ''}
              onChange={(e) => setEndTime(e.target.value)}
            >
              <option value="" disabled hidden>
                선택
              </option>
              {Array.from({ length: 25 }, (_, i) => {
                const hour = i === 24 ? '23' : i.toString().padStart(2, '0');
                const timeLabel = i === 24 ? '24:00' : `${hour}:00`;
                const realValue = i === 24 ? '24:00' : `${hour}:00`;

                return (
                  realValue > startTime && (
                    <option key={i} value={realValue}>
                      {timeLabel}
                    </option>
                  )
                );
              })}
            </select>
          </div>
          <div
            className="relative ml-[5px] h-[44px] w-[44px] cursor-pointer md:h-14 md:w-14 lg:ml-5"
            onClick={addSchedule}
          >
            <Image src="/icons/plusbtn_icon.svg" fill alt="추가버튼" />
          </div>
        </div>

        <div className="w-full border-[1px] my-5 border-[#DDD]"></div>

        {schedules.map((schedule) => (
          <div key={schedule.id} className="w-full flex items-center mb-5">
            <div className="w-[130px] md:w-[149px] lg:w-[379px] mr-[5px] lg:mr-5">
              <div className="h-[44px] md:h-14 border border-[#A1A1A1] rounded-md text-lg flex items-center pl-4 bg-white">
                <span className="text-lg text-black">{schedule.date}</span>
              </div>
            </div>

            <div className="w-[79px] md:w-[104px] lg:w-[140px]">
              <div className="h-[44px] md:h-14 border border-[#A1A1A1] rounded-md text-lg flex items-center pl-4 bg-white">
                <span>{schedule.startTime}</span>
              </div>
            </div>
            <span className="mx-3 hidden md:block text-xl font-bold">~</span>
            <div className="ml-[5px] w-[79px] md:w-[104px] lg:w-[140px] lg:ml-0">
              <div className="h-[44px] md:h-14 border border-[#A1A1A1] rounded-md text-lg flex items-center pl-4 bg-white">
                <span>{schedule.endTime}</span>
              </div>
            </div>
            <div
              className="relative ml-[5px] h-[44px] w-[44px] cursor-pointer md:h-14 md:w-14 lg:ml-5"
              onClick={() => removeSchedule(schedule.id)}
            >
              <Image src="/icons/minusbtn_icon.svg" fill alt="삭제버튼" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
