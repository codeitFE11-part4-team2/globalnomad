import { z } from 'zod';

const scheduleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 날짜 형식이 아닙니다.'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, '올바른 시간 형식이 아닙니다.'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, '올바른 시간 형식이 아닙니다.'),
});

export const activitySchema = z.object({
  title: z.string().min(2, '제목은 최소 2글자 이상 입력해야 합니다.'),
  category: z.enum(['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙']),
  description: z.string().min(1, '설명을 입력해주세요.'),
  address: z.string().min(5, '주소를 입력해주세요.'),
  price: z.number().positive('가격은 양수여야 합니다.'),
  bannerImageUrl: z
    .string()
    .url('올바른 이미지 URL을 입력해주세요.')
    .regex(/\.(jpeg|jpg|png|gif)$/i, '이미지 URL이어야 합니다.'),

  // 생성 모드 필드
  schedules: z
    .array(scheduleSchema)
    .min(1, '예약 가능한 시간을 추가해주세요.')
    .optional(),
  subImageUrls: z
    .array(
      z
        .string()
        .url('올바른 이미지 URL을 입력해주세요.')
        .regex(/\.(jpeg|jpg|png|gif)$/i, '이미지 URL이어야 합니다.')
    )
    .optional(),

  // 수정 모드 필드
  scheduleIdsToRemove: z.array(z.number()).optional(),
  schedulesToAdd: z.array(scheduleSchema).optional(),
  subImageIdsToRemove: z.array(z.number()).optional(),
  subImageUrlsToAdd: z
    .array(
      z
        .string()
        .url('올바른 이미지 URL을 입력해주세요.')
        .regex(/\.(jpeg|jpg|png|gif)$/i, '이미지 URL이어야 합니다.')
    )
    .optional(),
});

export type ActivityFormData = z.infer<typeof activitySchema>;
