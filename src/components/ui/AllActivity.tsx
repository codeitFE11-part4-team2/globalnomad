'use client';

import Image from 'next/image';
import { Activity } from '@/lib/activity/activity';

interface AllActivityProps {
  activities: Activity[];
}

function ActivityCard({ activity }: { activity: Activity }) {
  const { bannerImageUrl, title, rating, reviewCount, price } = activity;

  return (
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
          <p className="text-black font-pretendard md:text-2xl text-xl font-bold leading-[26px]">
            {price.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}

//모든 Activity를 그리드로 렌더링
export default function AllActivity({ activities }: AllActivityProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-4 lg:gap-x-6 gap-y-[5px] md:gap-y-8 lg:gap-y-12">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
