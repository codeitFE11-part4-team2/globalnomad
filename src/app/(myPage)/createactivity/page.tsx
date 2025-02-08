'use client';

import { useEffect, useRef, useState } from 'react';
import { createActions } from './_actions/createActions';
import Form from 'next/form';
import { Button } from '@/components/common/Button';
import Image from 'next/image';
import DaumPostcode from 'react-daum-postcode';
import { useAuthStore } from '@/store';
import { ImageUrl } from './api/ImageUrl';

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export default function Page() {
  const { token } = useAuthStore();
  console.log('Token:', token);

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [introImages, setIntroImages] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  /** 예약 날짜 관련 함수들 */
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${year.slice(2)}/${month}/${day}`;
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
    setSchedules([
      ...schedules,
      {
        id: Date.now(),
        date: formattedDate,
        startTime,
        endTime,
      },
    ]);
    if (dateInputRef.current) dateInputRef.current.value = '';
    setStartTime('');
    setEndTime('');
  };
  const removeSchedule = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  /** 이미지 관련 함수들 */

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedUrl = await ImageUrl(file, token);
        setBannerImage(uploadedUrl);
        console.log('배너 이미지 URL:', uploadedUrl);
      } catch (error) {
        console.error('배너 이미지 업로드 실패:', error);
      }
    }
  };

  const handleIntroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => ImageUrl(file, token))
      );
      setIntroImages((prev) => {
        const newImages = [...prev, ...uploadedUrls];
        return newImages.length > 4 ? newImages.slice(-4) : newImages;
      });
      console.log('상세 이미지 URL들:', uploadedUrls);
    } catch (error) {
      console.error('상세 이미지 업로드 실패:', error);
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
  };

  const removeIntroImage = (index: number) => {
    setIntroImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  /** 주소입력 관련 함수 */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleComplete = (data: any) => {
    setAddress(data.address);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <Form action={createActions} className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 체험 등록</h1>
          <Button type="submit">등록하기</Button>
        </div>

        <input
          type="text"
          name="title"
          placeholder="제목"
          className="w-full h-14 border border-gray-800 rounded-md px-4 focus:outline-none text-lg placeholder-gray-700 mt-6"
          onChange={(e) => {
            if (e.target.value.length > 20) {
              e.target.value = e.target.value.slice(0, 20);
            }
          }}
        />

        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full text-lg h-14 mt-6 border border-gray-800 rounded-md px-2 focus:outline-none text-gray-800 appearance-none bg-[url('/icons/selectArrow_icon.svg')] bg-no-repeat bg-right"
        >
          <option value="" disabled hidden>
            카테고리
          </option>
          <option value="문화예술">문화예술</option>
          <option value="식음료">식음료</option>
          <option value="스포츠">스포츠</option>
          <option value="투어">투어</option>
          <option value="관광">관광</option>
          <option value="웰빙">웰빙</option>
        </select>

        <textarea
          placeholder="설명"
          name="description"
          className="w-full h-[346px] p-4 text-lg border border-gray-800 rounded-md focus:outline-none resize-none mt-6"
        ></textarea>

        <label className="block text-black text-2xl font-bold mt-6">가격</label>
        <input
          type="number"
          name="price"
          placeholder="가격"
          className="w-full h-14 border border-gray-800 rounded-md px-4 mt-4 focus:outline-none"
          onChange={(e) => {
            if (e.target.value.length > 8) {
              e.target.value = e.target.value.slice(0, 8);
            }
          }}
        />

        <label className="block text-black text-2xl font-bold mt-6">주소</label>
        <input
          type="text"
          name="address"
          placeholder="주소를 입력해주세요"
          value={address}
          readOnly
          onClick={() => setIsOpen(true)}
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
          <input
            type="hidden"
            name="schedules"
            value={JSON.stringify(schedules)}
          />

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

        <div className="w-full space-y-6">
          <div>
            <p className="text-black text-2xl font-bold mt-6">배너 이미지</p>
            <div className="flex items-center space-x-4 mt-6">
              <label className="w-[180px] aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleBannerUpload}
                />
                <span className="flex flex-col items-center gap-6 text-2xl text-gray-900">
                  <span className="text-[50px]">+</span> 이미지 등록
                </span>
              </label>
              {bannerImage && (
                <div className="relative w-[180px] aspect-square">
                  <Image
                    src={bannerImage}
                    alt="배너 이미지"
                    className="rounded-md object-cover"
                    fill
                  />
                  <button
                    className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={removeBannerImage}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-black text-2xl font-bold mt-6">소개 이미지</p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <label className="w-[180px] aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleIntroUpload}
                />
                <span className="flex flex-col items-center gap-6 text-2xl text-gray-900">
                  <span className="text-[50px]">+</span> 이미지 등록
                </span>
              </label>

              {introImages.map((url, index) => (
                <div key={index} className="relative w-[180px] aspect-square">
                  <Image
                    src={url}
                    alt={`소개 이미지 ${index + 1}`}
                    className="rounded-md object-cover"
                    fill
                  />
                  <button
                    className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => removeIntroImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <p className="text-2lg text-gray-900 mt-6 mb-28">
              *이미지는 최대 4개까지 등록 가능합니다.
            </p>

            {bannerImage && (
              <input type="hidden" name="bannerImageUrl" value={bannerImage} />
            )}

            {introImages.length > 0 && (
              <input
                type="hidden"
                name="subImageUrls"
                value={JSON.stringify(introImages)}
              />
            )}
            <input type="hidden" name="token" value={token ?? ''} />
          </div>
        </div>
      </Form>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white md:w-[450px]  p-2 md:p-4 rounded-md">
            <DaumPostcode onComplete={handleComplete} />
            <button
              className="mt-2 w-full bg-red-500 text-white py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
