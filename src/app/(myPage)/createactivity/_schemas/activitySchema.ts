import { z } from 'zod';

const scheduleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 날짜 형식이 아닙니다.'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, '올바른 시간 형식이 아닙니다.'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, '올바른 시간 형식이 아닙니다.'),
});

export const activitySchema = z.object({
  title: z.string().min(2, '제목은 최소 2글글자 이상 입력해야 합니다.'),
  category: z.enum(['문화예술', '식음료', '스포츠', '투어', '관광', '웰빙']),
  description: z.string().min(5, '설명은 최소 5글자 이상 입력해야 합니다.'),
  address: z.string().min(5, '주소를 입력해주세요.'),
  price: z.number().positive('가격은 양수여야 합니다.'),
  schedules: z.array(scheduleSchema).min(1, '예약 가능한 시간을 추가해주세요.'),
  bannerImageUrl: z.string().url('올바른 이미지 URL을 입력해주세요.'),
  subImageUrls: z.array(z.string().url('올바른 이미지 URL을 입력해주세요.')),
});

export type ActivityFormData = z.infer<typeof activitySchema>;
