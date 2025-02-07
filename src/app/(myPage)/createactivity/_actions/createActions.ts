'use server';

import { activitySchema, ActivityFormData } from '../_schemas/activitySchema';

export async function createActions(formData: FormData, token: string) {
  try {
    if (!token) {
      return { error: '인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.' };
    }

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;
    const price = Number(formData.get('price'));
    const schedules = JSON.parse(formData.get('schedules') as string);

    const bannerImageUrl = formData.get('bannerImageUrl') as string;
    const subImageUrls = JSON.parse(formData.get('subImageUrls') as string);

    const validatedData: ActivityFormData = activitySchema.parse({
      title,
      category,
      description,
      address,
      price,
      schedules,
      bannerImageUrl,
      subImageUrls,
    });

    console.log('최종데이터', validatedData);

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
      return { error: '폼 제출 실패!' };
    }

    return { success: '활동이 성공적으로 등록되었습니다!' };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: '서버에서 문제가 발생했습니다.' };
  }
}
