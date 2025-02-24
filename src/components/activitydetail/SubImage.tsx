import { SubImage } from '@/lib/activitydetail/activitydetailTypes';
import Image from 'next/image';

interface SubImageBannerProps {
  subImages: SubImage[];
  setSelectedImage: (image: string | null) => void;
}

const SubImageBanner = ({
  subImages,
  setSelectedImage,
}: SubImageBannerProps) => {
  const newSubImages = [];

  // 서브 이미지가 없을 때
  if (subImages.length === 0) {
    return <div />;
  }

  // 서브 이미지가 1개일 때
  if (subImages.length === 1) {
    newSubImages.push(
      <div
        key={subImages[0].id}
        className="w-full h-full cursor-pointer"
        onClick={() => setSelectedImage(subImages[0].imageUrl)}
      >
        <Image
          src={subImages[0].imageUrl}
          alt="서브 이미지"
          width={595}
          height={534}
          className="w-full h-full object-cover rounded-r-[12px]"
        />
      </div>
    );
    return <div className="w-full h-full">{newSubImages}</div>;
  }

  // 서브 이미지가 2개일 때 (세로 배치)
  if (subImages.length === 2) {
    for (let index = 0; index < 2; index += 1) {
      newSubImages.push(
        <div
          key={subImages[index].id}
          className="w-full h-full cursor-pointer"
          onClick={() => setSelectedImage(subImages[index].imageUrl)}
        >
          <Image
            src={subImages[index].imageUrl}
            alt={`서브 이미지 ${index + 1}`}
            width={595}
            height={263}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return (
      <div className="grid grid-rows-2 h-full gap-2 rounded-r-[12px] overflow-hidden">
        {newSubImages}
      </div>
    );
  }

  // 서브 이미지가 3개일 때 (위 1개 + 아래 2개 배치)
  if (subImages.length === 3) {
    newSubImages.push(
      <div
        key={subImages[0].id}
        className="w-full h-full cursor-pointer col-span-2"
        onClick={() => setSelectedImage(subImages[0].imageUrl)}
      >
        <Image
          src={subImages[0].imageUrl}
          alt="서브 이미지 1"
          width={595}
          height={263}
          className="w-full h-full object-cover"
        />
      </div>
    );
    for (let index = 1; index < 3; index += 1) {
      newSubImages.push(
        <div
          key={subImages[index].id}
          className="w-full h-full cursor-pointer"
          onClick={() => setSelectedImage(subImages[index].imageUrl)}
        >
          <Image
            src={subImages[index].imageUrl}
            alt={`서브 이미지 ${index + 1}`}
            width={293.5}
            height={263}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return (
      <div className="grid grid-rows-2 grid-cols-2 h-full gap-2 rounded-r-[12px] overflow-hidden">
        {newSubImages}
      </div>
    );
  }

  // 서브 이미지가 4개일 때 (2x2 배치)
  if (subImages.length === 4) {
    for (let index = 0; index < 4; index += 1) {
      newSubImages.push(
        <div
          key={subImages[index].id}
          className="w-full h-full cursor-pointer"
          onClick={() => setSelectedImage(subImages[index].imageUrl)}
        >
          <Image
            src={subImages[index].imageUrl}
            alt={`서브 이미지 ${index + 1}`}
            width={293.5}
            height={263}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return (
      <div className="grid grid-cols-2 grid-rows-2 h-full gap-2 rounded-r-[12px] overflow-hidden">
        {newSubImages}
      </div>
    );
  }

  return null;
};

export default SubImageBanner;
