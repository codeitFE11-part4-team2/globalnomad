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
    return <div>{newSubImages}</div>;
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
          className="w-full object-cover lg:h-[263px] md:h-[152.68px] h-[310px]"
        />
      );
    }
    return <div className="w-full grid grid-cols-1">{newSubImages}</div>;
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
            className="w-full object-cover lg:h-[263px] md:h-[152.68px] h-[310px] col-span-2"
          />
        );
        break;
      }
      newSubImages.push(
        <img
          key={subImages[index].id}
          src={subImages[index].imageUrl}
          alt={`서브 이미지 ${index + 1}`}
          width={293.5}
          height={263}
          className="w-full object-cover lg:h-[263px] md:h-[152.68px] h-[310px]"
        />
      );
    }
    return <div className="grid grid-cols-2">{newSubImages}</div>;
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
          className="w-full object-cover lg:h-[263px] md:h-[152.68px] h-[310px]"
        />
      );
    }
  }

  return <div className="grid grid-cols-2">{newSubImages}</div>;
};

export default SubImageBanner;
