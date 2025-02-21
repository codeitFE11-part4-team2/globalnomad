'use client';

import { useState } from 'react';
import { createActions } from '../_actions/createActions';
import Form from 'next/form';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store';
import { modalStore } from '@/store/modalStore';
import ActivityCompleteModal from '@/components/activity/ActivityCompleteModal';
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
  const { openModal } = modalStore();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [introImages, setIntroImages] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const isFormValid = () => {
    return (
      title.trim().length >= 2 &&
      category !== '' &&
      description.trim().length >= 3 &&
      address.trim() !== '' &&
      Number(price) > 0 &&
      schedules.length > 0 &&
      bannerImage !== null
    );
  };

  return (
    <div>
      <Form
        action={async (formData) => {
          await createActions(formData);
          openModal('activitycomplete');
        }}
        className="flex flex-col"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 체험 등록</h1>
          <Button type="submit" disabled={!isFormValid()}>
            등록하기
          </Button>
        </div>

        <input
          type="text"
          name="title"
          placeholder="제목"
          className="w-full h-14 border border-gray-800 rounded-md px-4 focus:outline-none text-lg placeholder-gray-700 mt-6"
          value={title}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 20);
            setTitle(newValue);
          }}
        />

        <CategorySelector category={category} setCategory={setCategory} />

        <textarea
          placeholder="설명"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-[346px] p-4 text-lg border border-gray-800 rounded-md focus:outline-none resize-none mt-6"
        />

        <label className="block text-black text-2xl font-bold mt-6">가격</label>
        <input
          type="number"
          name="price"
          placeholder="가격"
          value={price}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 8);
            setPrice(newValue);
          }}
          className="w-full h-14 border border-gray-800 rounded-md px-4 mt-4 focus:outline-none"
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
        <input type="hidden" name="address" value={address} />
        <input
          type="hidden"
          name="schedules"
          value={JSON.stringify(schedules)}
        />
        <input type="hidden" name="category" value={category} />
      </Form>
      <ActivityCompleteModal />
    </div>
  );
}
