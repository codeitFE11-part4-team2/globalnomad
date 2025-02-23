'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Activity } from '@/types/activity';
import { useAuthStore } from '@/store';
import { axiosInstance } from '@/lib/axios';
import CreateActivityForm from '../../_component/CreateActivityForm';

export default function EditActivityPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchActivity = async () => {
      if (!id) return;

      try {
        const { data } = await axiosInstance.get(`/activities/${id}`);
        setActivity(data);
      } catch (error) {
        console.error('체험 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchActivity();
    }
  }, [id, token]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-bold">로딩 중...</div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-bold">체험을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <CreateActivityForm
        defaultValues={{
          title: activity.title,
          category: activity.category,
          description: activity.description,
          address: activity.address,
          price: activity.price,
          schedules: activity.schedules,
          bannerImageUrl: activity.bannerImageUrl,
          subImages: activity.subImages,
        }}
        isEdit
        activityId={activity.id}
      />
    </div>
  );
}
