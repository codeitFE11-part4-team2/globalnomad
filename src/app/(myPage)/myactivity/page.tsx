'use client';

import { Button } from '@/components/common/Button';
import MyActivityCard from './_component/MyActivityCard';
import CardModal from './_component/CardModal';
import { useMyActivities } from '@/services/MyActivity';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { data, isLoading, error } = useMyActivities({ size: 20 });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">내 체험 관리</h2>
        <Button onClick={() => router.push('/createactivity')}>
          체험 등록하기
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {data?.activities.map((activity) => (
          <MyActivityCard
            key={activity.id}
            id={activity.id}
            bannerImageUrl={activity.bannerImageUrl}
            rating={activity.rating}
            reviewCount={activity.reviewCount}
            title={activity.title}
            price={activity.price}
          />
        ))}
      </div>
      <CardModal />
    </div>
  );
}
