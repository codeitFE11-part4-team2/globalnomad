'use server';

import { activitySchema, ActivityFormData } from '../_schemas/activitySchema';

export async function createActions(formData: FormData): Promise<void> {
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
          const [year, month, day] = schedule.date.split('/');
          return {
            ...schedule,
            date: `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
          };
        });
        console.log('Formatted schedules:', schedules);
      }
    }
  } catch (error) {
    console.error('스케줄 데이터 처리 중 오류:', error);
    schedules = [];
  }

  const validatedData: ActivityFormData = activitySchema.parse({
    title: formData.get('title'),
    category: formData.get('category'),
    description: formData.get('description'),
    address: formData.get('address'),
    price: Number(formData.get('price')),
    schedules,
    bannerImageUrl: formData.get('bannerImageUrl'),
    subImageUrls: JSON.parse(formData.get('subImageUrls') as string) || [],
  });

  console.log('Validated data being sent to server:', validatedData);

  const response = await fetch(
    'https://sp-globalnomad-api.vercel.app/11-2/activities',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('폼 제출 실패:', response.status, errorData);
  } else {
    console.log('폼 제출 성공');
  }
}
