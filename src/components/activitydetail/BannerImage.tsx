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
    <div>
      <div>
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
        <SubImageBanner subImages={subImages} />
      </div>
    </div>
  );
};

export default BannerImage;
