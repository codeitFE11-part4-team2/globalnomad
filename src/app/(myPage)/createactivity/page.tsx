'use client';

import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { createActions } from './_actions/createActions';
import Form from 'next/form';
import { Button } from '@/components/common/Button';
import Image from 'next/image';

const initialState = {
  message: '',
};

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export default function Page() {
  const [state, formAction] = useFormState(createActions, initialState);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${year.slice(2)}/${month}/${day}`;
  };

  // 🔹 시간을 "HH:MM" → "분 단위"로 변환하는 함수
  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  // 🔹 기존 예약과 겹치는지 확인하는 함수
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

  // 🔹 새 예약 추가
  const addSchedule = () => {
    const dateInput = dateInputRef.current?.value;

    if (!dateInput || !startTime || !endTime) {
      alert('날짜와 시간을 선택해주세요!');
      return;
    }

    const formattedDate = formatDate(dateInput);

    if (isOverlapping(formattedDate, startTime, endTime)) {
      alert('이미 예약된 시간과 겹칩니다. 다른 시간을 선택해주세요!');
      return;
    }

    setSchedules([
      ...schedules,
      {
        id: Date.now(),
        date: formattedDate,
        startTime,
        endTime,
      },
    ]);

    // 입력 초기화
    if (dateInputRef.current) dateInputRef.current.value = '';
    setStartTime('');
    setEndTime('');
  };

  // 🔹 특정 시간대 삭제
  const removeSchedule = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <div className="w-full">
      <Form action={formAction} className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 체험 등록</h1>
          <Button>등록하기</Button>
        </div>

        <input
          type="text"
          placeholder="제목"
          className="w-full h-14 border border-gray-800 rounded-md px-4 focus:outline-none text-lg placeholder-gray-700 mt-6"
        />

        <select className="w-full text-lg h-14 mt-6 border border-gray-800 rounded-md px-2 focus:outline-none text-gray-800 appearance-none bg-[url('/icons/selectArrow_icon.svg')] bg-no-repeat bg-right">
          <option value="" disabled selected hidden>
            카테고리
          </option>
          <option>문화예술</option>
          <option>식음료</option>
          <option>스포츠</option>
          <option>투어</option>
          <option>관광</option>
          <option>웰빙</option>
        </select>

        <textarea
          placeholder="설명"
          className="w-full h-[346px] p-4 text-lg border border-gray-800 rounded-md focus:outline-none resize-none mt-6"
        ></textarea>

        <label className="block text-black text-2xl font-bold mt-6">가격</label>
        <input
          type="text"
          placeholder="가격"
          className="w-full h-14 border border-gray-800 rounded-md px-4 mt-4 focus:outline-none"
        />

        <label className="block text-black text-2xl font-bold mt-6">주소</label>
        <input
          type="text"
          placeholder="주소를 입력해주세요"
          className="w-full h-14 border border-gray-800 rounded-md px-4 mt-4 focus:outline-none"
        />

        <span className="text-black text-2xl font-bold mt-6">
          예약 가능한 시간대
        </span>
        <div className="w-full mt-6">
          <div className="flex items-end">
            <div className="flex flex-col gap-2.5 w-[379px] mr-5 relative">
              <label className="text-xl font-medium">날짜</label>
              <input
                type="date"
                name="new_schedule_date"
                ref={dateInputRef}
                className="border h-14 border-gray-800 rounded-md text-lg peer pl-4"
              />
              <div
                className="absolute bottom-3 right-3 cursor-pointer"
                onClick={() => dateInputRef.current?.showPicker()}
              >
                <div className="relative w-8 h-8">
                  <Image src="icons/calendar_icon.svg" alt="달력아이콘" fill />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 w-[140px] ">
              <span className="text-xl font-medium">시작 시간</span>
              <select
                name="new_schedule_start"
                className="border h-14 border-gray-800 rounded-md pl-4"
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
            <span className="mx-3 pb-4 text-xl font-bold">~</span>
            <div className="flex flex-col gap-2.5 w-[140px]">
              <span className="text-xl font-medium">종료 시간</span>
              <select
                name="new_schedule_end"
                className="border h-14 border-gray-800 rounded-md pl-4"
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
              className="relative h-14 w-14 ml-5 cursor-pointer"
              onClick={addSchedule}
            >
              <Image src="/icons/plusbtn_icon.svg" fill alt="추가버튼" />
            </div>
          </div>

          <div className="w-full border my-5 border-gray-300"></div>

          {schedules.map((schedule) => (
            <div key={schedule.id} className="w-full flex items-center mb-5">
              <div className="border h-14 border-gray-800 rounded-md text-lg w-[379px] flex items-center pl-4 mr-5">
                <span className="text-lg text-black">{schedule.date}</span>
              </div>

              <div className="border h-14 border-gray-800 rounded-md text-lg w-[140px] flex items-center pl-4">
                <span>{schedule.startTime}</span>
              </div>
              <span className="mx-3 text-xl font-bold">~</span>
              <div className="border h-14 border-gray-800 rounded-md text-lg w-[140px] flex items-center pl-4">
                <span>{schedule.endTime}</span>
              </div>
              <div
                className="relative h-14 w-14 ml-5 cursor-pointer"
                onClick={() => removeSchedule(schedule.id)}
              >
                <Image src="/icons/minusbtn_icon.svg" fill alt="삭제버튼" />
              </div>
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
}
