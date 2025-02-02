import { SubImage } from '@/lib/activitydetail/activitydetailTypes';
import Image from 'next/image';
import React from 'react';
import SubImageBanner from '@/components/activitydetail/SubImage';

interface BannerImageProps {
  bannerImages: string;
  subImages: SubImage[];
}

const BannerImage = ({ bannerImages, subImages }: BannerImageProps) => {
  return (
    <div className="flex flex-row lg:w-[1198px] lg:h-[534px] md:w-[696px] w-[375px] h-[310px] lg:gap-[8px] md:gap-[4.65px] gap-0 rounded-[12px] overflow-hidden">
      <div className="lg:w-[595px] lg:h-[534px] md:w-[348px] md:h-[300px] w-[187.5px] h-[310px]">
        {subImages.length === 0 ? (
          <Image
            src={bannerImages}
            alt="배너 이미지"
            width={1198}
            height={534}
          />
        ) : (
          <Image
            src={bannerImages}
            alt="배너 이미지"
            width={595}
            height={534}
          />
        )}
      </div>
      <div className="lg:w-[595px] lg:h-[534px] md:w-[348px] md:h-[300px] w-[187.5px] h-[310px]">
        <SubImageBanner subImages={subImages} />
      </div>
    </div>
  );
};

export default BannerImage;
