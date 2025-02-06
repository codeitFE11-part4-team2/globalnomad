'use server';

import { z } from 'zod';

const experienceSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  description: z.string().min(10, '설명을 10자 이상 입력해주세요.'),
  price: z.string().min(1, '가격을 입력해주세요.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
});

export async function createActions(
  state: { message: string },
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validation = experienceSchema.safeParse(data);

  if (!validation.success) {
    return { message: validation.error.errors[0].message };
  }

  console.log('폼 제출 성공:', data);
  return { message: '체험이 등록되었습니다!' };
}
