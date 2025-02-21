import { ImageUrl } from '../api/ImageUrl';
import Image from 'next/image';

interface Props {
  bannerImage: string | null;
  setBannerImage: React.Dispatch<React.SetStateAction<string | null>>;
  introImages: string[];
  setIntroImages: React.Dispatch<React.SetStateAction<string[]>>;
  token: string | null;
}

export default function ImageSelector({
  bannerImage,
  introImages,
  setBannerImage,
  setIntroImages,
  token,
}: Props) {
  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await ImageUrl(file, token);
      setBannerImage(uploadedUrl);
      console.log('배너 이미지 URL:', uploadedUrl);
    } catch (error) {
      console.error('배너 이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleIntroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => ImageUrl(file, token))
      );
      setIntroImages((prev) => {
        const newImages = [...prev, ...uploadedUrls];
        return newImages.length > 4 ? newImages.slice(-4) : newImages;
      });
      console.log('상세 이미지 URL들:', uploadedUrls);
    } catch (error) {
      console.error('상세 이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
  };

  const removeIntroImage = (index: number) => {
    setIntroImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  return (
    <div className="w-full">
      <div>
        <p className="text-black text-2xl font-bold mt-6">배너 이미지</p>
        <div className="flex items-center space-x-4 mt-6">
          <label className="w-[180px] aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleBannerUpload}
            />
            <span className="flex flex-col items-center gap-6 text-2xl text-gray-900">
              <span className="text-[50px]">+</span> 이미지 등록
            </span>
          </label>
          {bannerImage && (
            <div className="relative w-[180px] aspect-square">
              <Image
                src={bannerImage}
                alt="배너 이미지"
                className="rounded-md object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
                priority
              />
              <button
                className="absolute top-1 right-1 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={removeBannerImage}
              >
                <Image
                  src="/icons/icon-delete.svg"
                  alt="삭제"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-black text-2xl font-bold mt-6">소개 이미지</p>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <label className="w-[180px] aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer">
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleIntroUpload}
            />
            <span className="flex flex-col items-center gap-6 text-2xl text-gray-900">
              <span className="text-[50px]">+</span> 이미지 등록
            </span>
          </label>

          {introImages.map((url, index) => (
            <div key={index} className="relative w-[180px] aspect-square">
              <Image
                src={url}
                alt={`소개 이미지 ${index + 1}`}
                className="rounded-md object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
                loading="lazy"
              />
              <button
                className="absolute top-1 right-1 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => removeIntroImage(index)}
              >
                <Image
                  src="/icons/icon-delete.svg"
                  alt="삭제"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          ))}
        </div>
        <p className="text-2lg text-gray-900 mt-6 mb-28">
          *이미지는 최대 4개까지 등록 가능합니다.
        </p>

        {bannerImage && (
          <input type="hidden" name="bannerImageUrl" value={bannerImage} />
        )}

        {introImages.length > 0 && (
          <input
            type="hidden"
            name="subImageUrls"
            value={JSON.stringify(introImages)}
          />
        )}
      </div>
    </div>
  );
}
