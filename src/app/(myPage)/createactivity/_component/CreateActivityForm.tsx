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
import { Schedule, SubImage } from '@/types/activity';
import { MY_ACTIVITY_QUERY_KEYS } from '@/services/MyActivity';
import { useQueryClient } from '@tanstack/react-query';

interface CreateActivityFormProps {
  defaultValues?: {
    title: string;
    category: string;
    description: string;
    address: string;
    price: number;
    schedules: Schedule[];
    bannerImageUrl: string;
    subImages: SubImage[];
  };
  isEdit?: boolean;
  activityId?: number;
}

export default function CreateActivityForm({
  defaultValues,
  isEdit,
  activityId,
}: CreateActivityFormProps = {}) {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  const { openModal } = modalStore();
  const [schedules, setSchedules] = useState<Schedule[]>(
    defaultValues?.schedules || []
  );
  const [bannerImage, setBannerImage] = useState<string | null>(
    defaultValues?.bannerImageUrl || null
  );
  const [introImages, setIntroImages] = useState<string[]>(
    defaultValues?.subImages?.map((img) => img.imageUrl) || []
  );
  const [address, setAddress] = useState(defaultValues?.address || '');
  const [category, setCategory] = useState(defaultValues?.category || '');
  const [title, setTitle] = useState(defaultValues?.title || '');
  const [description, setDescription] = useState(
    defaultValues?.description || ''
  );
  const [price, setPrice] = useState(defaultValues?.price?.toString() || '');

  const hasChanges = () => {
    if (!defaultValues) return true;

    const hasScheduleChanges =
      JSON.stringify(schedules) !== JSON.stringify(defaultValues.schedules);
    const hasImageChanges =
      bannerImage !== defaultValues.bannerImageUrl ||
      JSON.stringify(introImages) !==
        JSON.stringify(defaultValues.subImages.map((img) => img.imageUrl));

    return (
      title !== defaultValues.title ||
      category !== defaultValues.category ||
      description !== defaultValues.description ||
      address !== defaultValues.address ||
      price !== defaultValues.price.toString() ||
      hasScheduleChanges ||
      hasImageChanges
    );
  };

  const hasScheduleChanges = () => {
    if (!defaultValues) return true;
    return (
      JSON.stringify(schedules) !== JSON.stringify(defaultValues.schedules)
    );
  };

  const isFormValid = () => {
    if (isEdit) {
      // 수정 모드에서는 스케줄이 변경되지 않았다면 기존 스케줄 사용
      const hasValidSchedules = hasScheduleChanges()
        ? schedules.length > 0
        : (defaultValues?.schedules?.length ?? 0) > 0;
      return hasChanges() && hasValidSchedules;
    }

    return (
      title.trim().length >= 2 &&
      category !== '' &&
      description.trim().length >= 1 &&
      address.trim() !== '' &&
      Number(price) > 0 &&
      schedules.length > 0 &&
      bannerImage !== null &&
      introImages.length > 0
    );
  };

  const setSchedulesAction = (newSchedules: Schedule[]) => {
    setSchedules(newSchedules);
  };

  return (
    <div>
      <Form
        action={async (formData) => {
          try {
            if (isEdit && activityId) {
              formData.append('id', activityId.toString());
              // 현재 스케줄과 이미지 정보 추가
              formData.append(
                'currentSchedules',
                JSON.stringify(defaultValues?.schedules || [])
              );
              formData.append(
                'currentSubImages',
                JSON.stringify(defaultValues?.subImages || [])
              );
            }
            formData.append('token', token || '');
            formData.append('title', title);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('address', address);
            formData.append('price', price);
            formData.append('schedules', JSON.stringify(schedules));
            formData.append('introImages', JSON.stringify(introImages));
            formData.append('bannerImageUrl', bannerImage || '');

            const result = await createActions(formData);
            console.log('Form submission result:', result);

            // 쿼리 무효화 추가
            queryClient.invalidateQueries({
              queryKey: [MY_ACTIVITY_QUERY_KEYS.myActivities],
            });

            if (isEdit) {
              window.location.href = '/myactivity';
            } else {
              openModal('activitycomplete');
            }
          } catch (error) {
            console.error('Form submission error:', error);
            alert(
              error instanceof Error ? error.message : '오류가 발생했습니다.'
            );
          }
        }}
        className="mx-auto flex w-full max-w-[343px] flex-col md:max-w-[429px] lg:max-w-[936px]"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {isEdit ? '내 체험 수정' : '내 체험 등록'}
          </h1>
          <Button type="submit" disabled={!isFormValid()}>
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
        </div>
        <input
          type="text"
          name="title"
          placeholder="제목"
          className="mt-6 h-14 w-full rounded-md border border-[#A1A1A1] px-4 text-lg placeholder-gray-700 focus:outline-none"
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
          className="mt-6 h-[346px] w-full resize-none rounded-md border border-[#A1A1A1] p-4 text-lg focus:outline-none"
        />
        <label className="mt-6 block text-[20px] font-bold text-black md:text-2xl">
          가격
        </label>
        <input
          type="number"
          name="price"
          placeholder="가격"
          value={price}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 8);
            setPrice(newValue);
          }}
          className="mt-4 h-14 w-full rounded-md border border-[#A1A1A1] px-4 focus:outline-none"
        />
        <AddressInput address={address} setAddress={setAddress} />
        <ScheduleInput
          schedules={schedules}
          setSchedulesAction={setSchedulesAction}
        />
        <ImageSelector
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
          introImages={introImages}
          setIntroImages={setIntroImages}
          token={token}
        />
      </Form>
      <ActivityCompleteModal />
    </div>
  );
}
