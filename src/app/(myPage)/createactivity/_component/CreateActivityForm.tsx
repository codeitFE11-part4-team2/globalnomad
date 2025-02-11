'use client';

import { useState } from 'react';
import { createActions } from '../_actions/createActions';
import Form from 'next/form';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store';
import AddressInput from './AddressInput';
import ScheduleInput from './ScheduleInput';
import ImageSelector from './ImageSelector';
import CategorySelector from './CategorySelector';

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

      <CategorySelector category={category} setCategory={setCategory} />

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
      <ImageSelector
        bannerImage={bannerImage}
        setBannerImage={setBannerImage}
        introImages={introImages}
        setIntroImages={setIntroImages}
        token={token}
      />

      <input type="hidden" name="token" value={token ?? ''} />
    </Form>
  );
}
