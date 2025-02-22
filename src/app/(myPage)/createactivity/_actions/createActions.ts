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

  const activityId = formData.get('id');
  const isEdit = !!activityId;

  let validatedData: ActivityFormData;

  if (isEdit) {
    // 수정 모드일 때는 변경된 항목만 전송
    const currentSchedules =
      JSON.parse(formData.get('currentSchedules') as string) || [];
    const currentSubImages =
      JSON.parse(formData.get('currentSubImages') as string) || [];

    const scheduleIdsToRemove = currentSchedules
      .filter((schedule) => !schedules.find((s) => s.id === schedule.id))
      .map((schedule) => schedule.id);

    const schedulesToAdd = schedules.filter((schedule) => !schedule.id);

    const subImageIdsToRemove = currentSubImages
      .filter(
        (img) =>
          !JSON.parse(formData.get('introImages') as string).includes(
            img.imageUrl
          )
      )
      .map((img) => img.id);

    const subImageUrlsToAdd = JSON.parse(
      formData.get('introImages') as string
    ).filter((url) => !currentSubImages.find((img) => img.imageUrl === url));

    validatedData = activitySchema.parse({
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      address: formData.get('address'),
      price: Number(formData.get('price')),
      bannerImageUrl: formData.get('bannerImageUrl'),
      scheduleIdsToRemove,
      schedulesToAdd,
      subImageIdsToRemove,
      subImageUrlsToAdd,
    });
  } else {
    // 생성 모드
    validatedData = activitySchema.parse({
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      address: formData.get('address'),
      price: Number(formData.get('price')),
      schedules,
      bannerImageUrl: formData.get('bannerImageUrl'),
      subImageUrls: JSON.parse(formData.get('introImages') as string) || [],
    });
  }

  console.log('Validated data being sent to server:', validatedData);

  try {
    const { axiosInstance } = await import('@/lib/axios');

    const endpoint = isEdit ? `/my-activities/${activityId}` : '/activities';

    const response = isEdit
      ? await axiosInstance.patch(endpoint, validatedData)
      : await axiosInstance.post(endpoint, validatedData);

    console.log('폼 제출 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}
