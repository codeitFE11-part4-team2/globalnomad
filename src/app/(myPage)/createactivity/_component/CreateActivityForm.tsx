'use client';

import { useState } from 'react';
import { createActions } from '../_actions/createActions';
import Form from 'next/form';
import { Button } from '@/components/common/Button';
import Image from 'next/image';
import { useAuthStore } from '@/store';
import { ImageUrl } from '../api/ImageUrl';
import AddressInput from './AddressInput';
import ScheduleInput from './ScheduleInput';

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export default function CreateActivityForm() {
  const { token } = useAuthStore();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [introImages, setIntroImages] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');

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

  return (
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

      <AddressInput address={address} setAddress={setAddress} />
      <ScheduleInput schedules={schedules} setSchedules={setSchedules} />

      <div className="w-full">
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
  );
}
