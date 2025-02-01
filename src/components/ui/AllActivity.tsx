'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Activity } from '@/lib/activity/activity';

interface AllActivityProps {
  activities: Activity[];
  selectedCategory: string;
}

function ActivityCard({ activity }: { activity: Activity }) {
  const { bannerImageUrl, title, rating, reviewCount, price } = activity;

  return (
    <Link href={`/11-2/activities/${activity.id}`} className="cursor-pointer">
      <div className="flex flex-col gap-4">
        <div className="relative w-full lg:w-[283px] aspect-square rounded-[20px] overflow-hidden">
          <Image
            src={bannerImageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={activity.id <= 4}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-1">
            <Image src="/icons/icon-star.svg" alt="별점" width={20} height={20} />
            <span className="text-black font-pretendard text-lg font-medium leading-[26px]">
              {rating}
            </span>
            <span className="text-gray-600 font-pretendard text-lg font-medium leading-[26px]">
              ({reviewCount})
            </span>
          </div>
          <div className="flex flex-col gap-[15px]">
            <h3 className="text-black font-pretendard md:text-2xl text-2lg font-semibold leading-[28px]">
              {title}
            </h3>
            <div className="flex items-center gap-1">
              <p className="text-black font-pretendard md:text-2xl text-xl font-bold leading-[26px]">
                {price.toLocaleString()}원
              </p>
              <span className="text-[#4B4B4B] font-pretendard md:text-xl text-base font-normal md:leading-6 leading-[26px]">
                / 인
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

//모든 Activity를 그리드로 렌더링
export default function AllActivity({
  activities,
  selectedCategory,
}: AllActivityProps) {
  // 이미 정렬된 데이터를 받으므로, 여기서는 필터링만 수행
  const filteredActivities = activities?.filter((activity) => {
    if (selectedCategory === '전체') return true;
    return activity.category === selectedCategory;
  });

  if (!filteredActivities || filteredActivities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">해당 카테고리의 체험이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-4 lg:gap-x-6 gap-y-[5px] md:gap-y-8 lg:gap-y-12">
      {filteredActivities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
