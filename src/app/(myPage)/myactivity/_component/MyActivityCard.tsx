'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CardDropdown from './CardDropdown';
import { modalStore } from '@/store/modalStore';

interface Props {
  id: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  price: number;
  title: string;
}

export default function MyActivityCard({
  id,
  bannerImageUrl,
  rating,
  reviewCount,
  title,
  price,
}: Props) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openModal } = modalStore();

  const handleEdit = (activityId: number) => {
    setIsDropdownOpen(false);
    router.push(`/editactivity/${activityId}`);
  };

  const handleDelete = (activityId: number) => {
    setIsDropdownOpen(false);
    openModal('card', activityId);
  };

  return (
    <div className="w-full h-[128px] md:h-[156px] lg:h-[204px] flex rounded-3xl shadow-card relative">
      <div className="rounded-l-3xl overflow-hidden">
        <div className="h-full aspect-square relative">
          <Image
            src={bannerImageUrl}
            alt="테스트 이미지"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="flex-1 px-2 py-[9.5px] md:p-3 lg:px-6 lg:py-3.5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="relative md:w-5 md:h-5 w-4 h-4">
              <Image
                src="/icons/emptyStar_icon.svg"
                alt="빈별아이콘"
                fill
                className="object-contain"
              />
              <Image
                src="/icons/filledStar_icon.svg"
                alt="꽉찬별아이콘"
                fill
                className="object-contain"
                style={{
                  clipPath: `inset(0 ${(1 - rating / 5) * 100}% 0 0)`,
                }}
              />
            </div>
            <span className="text-md md:text-lg">
              {rating} ({reviewCount})
            </span>
          </div>
          <h3 className="text-md md:text-lg lg:text-xl font-bold md:mt-1.5">
            {title}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg md:text-xl lg:text-2xl text-gray-900 font-medium">
            ₩{price.toLocaleString('ko-KR')}
          </div>
          <div className="relative">
            <div
              className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Image
                src="/icons/cardmenu_icon.svg"
                alt="메뉴아이콘"
                fill
                className="object-contain"
              />
            </div>
            <CardDropdown
              activityId={id}
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
