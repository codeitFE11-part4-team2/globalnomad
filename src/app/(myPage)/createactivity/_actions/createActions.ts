import { activitySchema, ActivityFormData } from '../_schemas/activitySchema';

export async function createActions(formData: FormData): Promise<void> {
  const token = formData.get('token') as string;
  if (!token) {
    console.error('인증 토큰이 없습니다.');
    return;
  }
  let schedules = [];
  try {
    const schedulesData = formData.get('schedules');
    console.log('Raw schedules data:', schedulesData);
    if (schedulesData) {
      schedules = JSON.parse(schedulesData as string);
      console.log('Parsed schedules:', schedules);
      if (Array.isArray(schedules)) {
        schedules = schedules.map((schedule) => {
          // 이미 YYYY-MM-DD 형식인 경우 그대로 사용
          if (schedule.date.includes('-')) {
            return schedule;
          }
          
          // YY/MM/DD 형식인 경우 변환
          try {
            const [year, month, day] = schedule.date.split('/');
            if (year && month && day) {
              return {
                ...schedule,
                date: `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
              };
            }
          } catch (error) {
            console.error('날짜 형식 변환 오류:', error);
          }
          
          // 오류 발생 시 기존 데이터 그대로 사용
          return schedule;
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
    subImageUrls: JSON.parse(formData.get('introImages') as string) || [],
  });

  console.log('Validated data being sent to server:', validatedData);

  const activityId = formData.get('id');
  const isEdit = !!activityId;

  const url = isEdit
    ? `${process.env.NEXT_PUBLIC_API_URL}/my-activities/${activityId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/activities`;

  const response = await fetch(url, {
    method: isEdit ? 'PATCH' : 'POST',
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
