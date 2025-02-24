import { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { SubImage } from '@/lib/activitydetail/activitydetailTypes';
import SubImageBanner from '@/components/activitydetail/SubImage';
import CustomArrow from '@/components/activitydetail/CustomArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BannerImageProps {
  bannerImages: string;
  subImages: SubImage[];
}

const BannerImage = ({ bannerImages, subImages }: BannerImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [{ imageUrl: bannerImages }, ...subImages];

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  return (
    <div className="relative">
      {/* 모바일에서는 슬라이더 적용 */}
      {images.length > 1 ? (
        <div className="md:hidden block w-full h-[310px]">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-[310px]">
                <Image
                  src={image.imageUrl}
                  alt={`Image ${index}`}
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
      <div className="hidden md:flex flex-row w-full h-auto gap-[8px] overflow-hidden rounded-[12px]">
        <div className="w-1/2 h-[50vw] max-h-[534px] overflow-hidden rounded-l-[12px]">
          <Image
            src={bannerImages}
            alt="배너 이미지"
            width={subImages.length === 0 ? 1198 : 595}
            height={534}
            className="w-full h-full object-cover"
            onClick={() => setSelectedImage(bannerImages)}
          />
        </div>
        <div className="w-1/2 h-[50vw] max-h-[534px] overflow-hidden rounded-r-[12px]">
          <SubImageBanner
            subImages={subImages}
            setSelectedImage={setSelectedImage}
          />
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-[80%] max-w-[600px] h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-[10px] right-[10px] bg-white text-nomad-black rounded-full w-8 h-8 flex items-center justify-center z-10"
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
