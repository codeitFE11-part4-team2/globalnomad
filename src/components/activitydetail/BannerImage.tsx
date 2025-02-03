import { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { SubImage } from '@/lib/activitydetail/activitydetailTypes';
import SubImageBanner from '@/components/activitydetail/SubImage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BannerImageProps {
  bannerImages: string;
  subImages: SubImage[];
}

const BannerImage = ({ bannerImages, subImages }: BannerImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [{ id: 0, imageUrl: bannerImages }, ...subImages];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative">
      {/* 모바일에서는 슬라이더 적용 */}
      {subImages.length > 0 ? (
        <div className="md:hidden block w-full h-[310px]">
          <Slider {...settings}>
            {images.map((image) => (
              <div key={image.id} className="relative w-full h-[310px]">
                <Image
                  src={image.imageUrl}
                  alt={`Image ${image.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover rounded-[12px]"
                  onClick={() => setSelectedImage(image.imageUrl)}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="md:hidden block w-full h-[310px]">
          <Image
            src={bannerImages}
            alt="배너 이미지"
            layout="fill"
            objectFit="cover"
            className="object-cover rounded-[12px]"
            onClick={() => setSelectedImage(bannerImages)}
          />
        </div>
      )}

      {/* 데스크탑 및 태블릿 */}
      <div className="hidden md:flex flex-row lg:w-[1198px] lg:h-[534px] md:w-[696px] w-[375px] h-[310px] lg:gap-[8px] md:gap-[4.65px] gap-0 overflow-hidden rounded-[12px]">
        <div className="lg:w-[595px] lg:h-[534px] md:w-[348px] md:h-[300px] w-[187.5px] h-[310px]">
          {subImages.length === 0 ? (
            <Image
              src={bannerImages}
              alt="배너 이미지"
              width={1198}
              height={534}
              className="w-full h-full object-cover"
              onClick={() => setSelectedImage(bannerImages)}
            />
          ) : (
            <Image
              src={bannerImages}
              alt="배너 이미지"
              width={595}
              height={534}
              className="w-full h-full object-cover"
              onClick={() => setSelectedImage(bannerImages)}
            />
          )}
        </div>
        <div className="lg:w-[595px] lg:h-[534px] md:w-[348px] md:h-[300px] w-[187.5px] h-[310px]">
          <SubImageBanner
            subImages={subImages}
            setSelectedImage={setSelectedImage}
          />
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-[80%] max-w-[600px] h-auto">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full px-2 py-1 z-10"
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="확대된 이미지"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerImage;
