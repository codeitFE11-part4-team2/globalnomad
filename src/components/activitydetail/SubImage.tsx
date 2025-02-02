import { SubImage } from '@/lib/activitydetail/activitydetailTypes';
import Image from 'next/image';

interface SubImageBannerProps {
  subImages: SubImage[];
}

const SubImageBanner = ({ subImages }: SubImageBannerProps) => {
  const newSubImages = [];

  // 서브 이미지가 없을 때
  if (subImages.length === 0) {
    return <div />;
  }

  // 서브 이미지가 1개일 때
  if (subImages.length === 1) {
    newSubImages.push(
      <Image
        key={subImages[0].id}
        src={subImages[0].imageUrl}
        alt="서브 이미지"
        width={595}
        height={534}
        className="w-full h-full object-cover"
      />
    );
    return <div className="w-full h-full">{newSubImages}</div>;
  }

  // 서브 이미지가 2개일 때
  if (subImages.length === 2) {
    for (let index = 0; index < 2; index += 1) {
      newSubImages.push(
        <Image
          key={subImages[index].id}
          src={subImages[index].imageUrl}
          alt={`서브 이미지 ${index + 1}`}
          width={595}
          height={263}
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <div className="grid grid-cols-1 lg:h-[534px] h-[310px]">
        {newSubImages}
      </div>
    );
  }

  // 서브 이미지가 3개일 때
  if (subImages.length === 3) {
    for (let index = 0; index < 3; index += 1) {
      if (index === 2) {
        newSubImages.push(
          <Image
            key={subImages[index].id}
            src={subImages[index].imageUrl}
            alt={`서브 이미지 ${index + 1}`}
            width={293.5}
            height={263}
            className="w-full object-cover col-span-2"
          />
        );
        break;
      }
      newSubImages.push(
        <Image
          key={subImages[index].id}
          src={subImages[index].imageUrl}
          alt={`서브 이미지 ${index + 1}`}
          width={293.5}
          height={263}
          className="w-full object-cover"
        />
      );
    }
    return (
      <div className="grid grid-cols-2 lg:h-[534px] h-[310px]">
        {newSubImages}
      </div>
    );
  }

  // 서브 이미지가 4개일 때
  if (subImages.length === 4) {
    for (let index = 0; index < 4; index += 1) {
      newSubImages.push(
        <Image
          key={subImages[index].id}
          src={subImages[index].imageUrl}
          alt={`서브 이미지 ${index + 1}`}
          width={293.5}
          height={263}
          className="w-full object-cover"
        />
      );
    }
    return (
      <div className="grid grid-cols-2 lg:h-[534px] h-[310px]">
        {newSubImages}
      </div>
    );
  }

  return null;
};

export default SubImageBanner;
