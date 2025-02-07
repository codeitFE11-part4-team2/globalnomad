'use server';

import { revalidatePath } from 'next/cache';

export async function createActions(
  prevState: any, // 이전 상태
  formData: FormData // 새로 입력된 데이터
) {
  try {
    // 폼 데이터 정리
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;
    const price = Number(formData.get('price'));

    // 일정 데이터 파싱
    const schedules = JSON.parse(formData.get('schedules') as string);

    // 이미지 파일 업로드 처리
    const bannerImage = formData.get('bannerImage') as File;
    const subImages = JSON.parse(formData.get('subImages') as string);

    // 업로드된 이미지 URL (실제로는 Presigned URL 또는 클라우드 스토리지 사용)
    const bannerImageUrl = `https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/${bannerImage.name}`;

    // 최종 데이터 객체
    const requestData = {
      title,
      category,
      description,
      address,
      price,
      schedules,
      bannerImageUrl,
      subImageUrls: subImages,
    };

    console.log('📩 제출된 데이터:', requestData);

    // 실제 API로 제출하는 코드 (백엔드 엔드포인트 필요)
    const response = await fetch('https://your-api-endpoint.com/submit', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { error: '폼 제출 실패!' };
    }

    // 페이지 리로드 & 캐시 무효화
    revalidatePath('/activity');

    return { success: '활동이 성공적으로 등록되었습니다!' };
  } catch (error) {
    return { error: '서버에서 문제가 발생했습니다.' };
  }
}
