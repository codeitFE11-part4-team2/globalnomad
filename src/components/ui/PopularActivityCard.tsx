'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Activity } from '@/lib/popularactivity/popularactivityTypes';

const PRICE_FORMATTER = new Intl.NumberFormat('ko-KR');

// PopularActivityCard 컴포넌트의 props 타입 정의
interface PopularActivityCardProps {
  activity: Activity;
}

// 개별 체험 카드
function PopularActivityCard({ activity }: PopularActivityCardProps) {
  const { bannerImageUrl, title, rating, reviewCount, price } = activity;

  return (
    <Link
      href={`/activity/${activity.id}`}
      className="flex-none w-[186px] md:w-[384px] rounded-[20px] overflow-hidden cursor-pointer"
    >
      <div className="relative h-[186px] md:h-[384px]">
        <Image
          src={bannerImageUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-33.33% to-black/80 to-91.67%">
          <div className="absolute inset-0 flex flex-col justify-end items-start gap-[6px] md:gap-[20px] p-[24px_20px] md:p-[30px_20px]">
            <div className="flex items-center gap-[5px]">
              <Image
                src="/icons/icon-star.svg"
                alt="별점"
                width={18}
                height={18}
              />
              <span className="text-[14px] font-semibold leading-[24px] text-white">
                {rating}
              </span>
              <span className="text-[14px] font-semibold leading-[24px] text-white">
                ({reviewCount})
              </span>
            </div>
            <h3 className="md:text-[32px] text-[18px] font-bold leading-[26px] md:leading-[42px] text-white font-pretendard max-w-[251px] min-h-[52px] md:min-h-[84px] break-keep line-clamp-2">
              {title}
            </h3>
            <p className="font-pretendard">
              <span className="text-[20px] font-bold md:leading-[32px] leading-[26px] text-white">
                ₩ {PRICE_FORMATTER.format(price)}
              </span>
              <span className="text-[14px] font-normal leading-[24px] text-gray-700">
                {' '}
                / 인
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PopularActivityCard;
