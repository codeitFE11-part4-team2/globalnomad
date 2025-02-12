'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Activity } from '@/lib/activity/activity';

interface ActivityCardProps {
  activity: Activity;
  isPriority?: boolean;
}

function ActivityCard({ activity, isPriority = false }: ActivityCardProps) {
  const { bannerImageUrl, title, rating, reviewCount, price } = activity;

  return (
    <Link href={`/activity/${activity.id}`} className="cursor-pointer">
      <div className="flex flex-col gap-4">
        <div className="relative w-full lg:w-[283px] aspect-square rounded-[20px] overflow-hidden">
          <Image
            src={bannerImageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={isPriority}
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

export default ActivityCard;
