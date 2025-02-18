import { ReservationResponse } from './types';

// 예약 내역
export const mockReservationResponse: ReservationResponse = {
  cursorId: 5,
  reservations: [
    {
      id: 1,
      teamId: 'team1',
      userId: 1,
      activity: {
        bannerImageUrl: '/api/placeholder/400/200',
        title: '함께 배우면 즐거운 스트릿 댄스',
        id: 1,
      },
      scheduleId: 1,
      status: 'pending',
      reviewSubmitted: false,
      totalPrice: 10000,
      headCount: 10,
      date: '2025-02-17',
      startTime: '11:00',
      endTime: '12:30',
      createdAt: '2025-02-10T04:42:58.359Z',
      updatedAt: '2025-02-14T04:42:58.359Z',
    },
    {
      id: 2,
      teamId: 'team2',
      userId: 1,
      activity: {
        bannerImageUrl: '/api/placeholder/400/200',
        title: '내 강아지 인생사진 찍어주기',
        id: 2,
      },
      scheduleId: 2,
      status: 'canceled',
      reviewSubmitted: false,
      totalPrice: 10000,
      headCount: 10,
      date: '2025-02-14',
      startTime: '11:00',
      endTime: '12:30',
      createdAt: '2025-02-10T04:42:58.359Z',
      updatedAt: '2025-02-14T04:42:58.359Z',
    },
    {
      id: 3,
      teamId: 'team3',
      userId: 1,
      activity: {
        bannerImageUrl: '/api/placeholder/400/200',
        title: '이색 앵무새 카페에서 앵무새와 친구되기',
        id: 3,
      },
      scheduleId: 3,
      status: 'declined',
      reviewSubmitted: false,
      totalPrice: 10000,
      headCount: 10,
      date: '2025-02-18',
      startTime: '11:00',
      endTime: '12:30',
      createdAt: '2025-02-10T04:42:58.359Z',
      updatedAt: '2025-02-14T04:42:58.359Z',
    },
    {
      id: 4,
      teamId: 'team4',
      userId: 1,
      activity: {
        bannerImageUrl: '/api/placeholder/400/200',
        title: '발리 코끼리 목욕 체험',
        id: 4,
      },
      scheduleId: 4,
      status: 'completed',
      reviewSubmitted: true,
      totalPrice: 10000,
      headCount: 10,
      date: '2025-02-14',
      startTime: '11:00',
      endTime: '12:30',
      createdAt: '2025-02-10T04:42:58.359Z',
      updatedAt: '2025-02-14T04:42:58.359Z',
    },
    {
      id: 5,
      teamId: 'team5',
      userId: 1,
      activity: {
        bannerImageUrl: '/api/placeholder/400/200',
        title: '열기구 페스티벌',
        id: 5,
      },
      scheduleId: 5,
      status: 'confirmed',
      reviewSubmitted: false,
      totalPrice: 10000,
      headCount: 10,
      date: '2025-02-14',
      startTime: '11:00',
      endTime: '12:30',
      createdAt: '2025-02-10T04:42:58.359Z',
      updatedAt: '2025-02-14T04:42:58.359Z',
    },
    {
      id: 6,
      teamId: 'team6',
      userId: 1,
      activity: {
        bannerImageUrl: '/api/placeholder/400/200',
        title: '발리 코끼리 목욕 체험',
        id: 6,
      },
      scheduleId: 6,
      status: 'completed',
      reviewSubmitted: false,
      totalPrice: 10000,
      headCount: 10,
      date: '2025-02-14',
      startTime: '11:00',
      endTime: '12:30',
      createdAt: '2025-02-10T04:42:58.359Z',
      updatedAt: '2025-02-14T04:42:58.359Z',
    },
  ],
  totalCount: 6,
};

// 내 체험 리스트 조회
export const mockActivityList = {
  cursorId: 2,
  totalCount: 2,
  activities: [
    {
      id: 1,
      userId: 101,
      title: '한강 요트 체험',
      description: '한강에서 요트를 타며 서울의 야경을 즐겨보세요.',
      category: '레저',
      price: 50000,
      address: '서울특별시 영등포구 여의도동',
      bannerImageUrl: 'https://example.com/yacht.jpg',
      rating: 4.8,
      reviewCount: 25,
      createdAt: '2025-01-15T10:00:00.000Z',
      updatedAt: '2025-02-08T12:30:00.000Z',
    },
    {
      id: 2,
      userId: 101,
      title: '강릉 서핑 클래스',
      description: '서핑의 기초부터 배우고 바다를 즐겨보세요.',
      category: '스포츠',
      price: 70000,
      address: '강원도 강릉시 경포해변',
      bannerImageUrl: 'https://example.com/surfing.jpg',
      rating: 4.9,
      reviewCount: 32,
      createdAt: '2025-01-20T08:45:00.000Z',
      updatedAt: '2025-02-07T14:15:00.000Z',
    },
  ],
};

// 내 체험 월별 예약 현황 조회
export const mockMonthlyReservationStatus = [
  {
    date: '2025-02-10',
    reservations: {
      completed: 0,
      confirmed: 1,
      pending: 0,
    },
  },
  {
    date: '2025-02-12',
    reservations: {
      completed: 0,
      confirmed: 0,
      pending: 1,
    },
  },
];

// 내 체험 날짜별 예약 정보(신청, 승인, 거절) 가 있는 스케줄 조회
export const mockDailySchedule = [
  {
    scheduleId: 101,
    startTime: '14:00',
    endTime: '16:00',
    count: {
      declined: 1,
      confirmed: 2,
      pending: 1,
    },
  },
  {
    scheduleId: 102,
    startTime: '10:00',
    endTime: '12:00',
    count: {
      declined: 0,
      confirmed: 1,
      pending: 1,
    },
  },
];

// 내 체험 예약 시간대별 예약 내역 조회
export const mockTimeSchedule = {
  cursorId: 2,
  totalCount: 2,
  reservations: [
    {
      id: 201,
      nickname: '김민수',
      userId: 301,
      teamId: 'A123',
      activityId: 1, // 한강 요트 체험
      scheduleId: 101,
      status: 'confirmed',
      reviewSubmitted: false,
      totalPrice: 100000,
      headCount: 2,
      date: '2025-02-10',
      startTime: '14:00',
      endTime: '16:00',
      createdAt: '2025-02-05T09:30:00.000Z',
      updatedAt: '2025-02-08T15:45:00.000Z',
    },
    {
      id: 202,
      nickname: '박지연',
      userId: 302,
      teamId: 'B456',
      activityId: 2, // 강릉 서핑 클래스
      scheduleId: 102,
      status: 'pending',
      reviewSubmitted: false,
      totalPrice: 70000,
      headCount: 1,
      date: '2025-02-12',
      startTime: '10:00',
      endTime: '12:00',
      createdAt: '2025-02-06T12:15:00.000Z',
      updatedAt: '2025-02-08T18:20:00.000Z',
    },
  ],
};
