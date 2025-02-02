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
        width={293.5}
        height={263}
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
          width={293.5}
          height={263}
        />
      );
    }
    return <div>{newSubImages}</div>;
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
        />
      );
    }
    return <div>{newSubImages}</div>;
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
          height={534}
        />
      );
    }
  }

  return <div>{newSubImages}</div>;
};

export default SubImageBanner;
