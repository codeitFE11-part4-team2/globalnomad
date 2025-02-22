'use server';

import { activitySchema, ActivityFormData } from '../_schemas/activitySchema';

export async function createActions(formData: FormData): Promise<void> {
  const activityId = formData.get('id');
  const isEdit = !!activityId;
  const token = formData.get('token') as string;
  if (!token) {
    console.error('인증 토큰이 없습니다.');
    return;
  }
  formData.delete('token');

  let schedules = [];
  try {
    const schedulesData = formData.get('schedules');
    console.log('Raw schedules data:', schedulesData);
    if (schedulesData) {
      schedules = JSON.parse(schedulesData as string);
      console.log('Parsed schedules:', schedules);
      if (Array.isArray(schedules)) {
        schedules = schedules.map((schedule) => {
          if (schedule.date.includes('/')) {
            const [year, month, day] = schedule.date.split('/');
            return {
              ...schedule,
              date: `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
            };
          }
          return schedule;
        });
        console.log('Formatted schedules:', schedules);
      }
    }
  } catch (error) {
    console.error('스케줄 데이터 처리 중 오류:', error);
    throw new Error('예약 가능한 시간을 추가해주세요.');
  }

  // 이미지 URL들을 subImages 형식으로 변환
  const introImages = JSON.parse(formData.get('introImages') as string) || [];
  const subImages = introImages.map((url: string, index: number) => ({
    id: index + 1,
    imageUrl: url
  }));

  const validatedData: ActivityFormData = activitySchema.parse({
    title: formData.get('title'),
    category: formData.get('category'),
    description: formData.get('description'),
    address: formData.get('address'),
    price: Number(formData.get('price')),
    schedules,
    bannerImageUrl: formData.get('bannerImageUrl'),
    subImages,
  });

  console.log('Validated data being sent to server:', validatedData);

  const url = isEdit
    ? `${process.env.NEXT_PUBLIC_API_URL}/my-activities/${activityId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/activities`;

  console.log('Sending request to:', url);
  console.log('Request method:', isEdit ? 'PATCH' : 'POST');
  console.log('Request body:', validatedData);
  
  const response = await fetch(url, {
    method: isEdit ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validatedData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', response.status, errorText);
    throw new Error(`체험 ${isEdit ? '수정' : '등록'} 중 오류가 발생했습니다. (${response.status})`);
  }

  console.log('폼 제출 성공');
}
