import Image from 'next/image';

export default function MyActivityCard() {
  const rating = 2;

  return (
    <div className="w-full h-[204px] flex rounded-3xl bg-gray-300 overflow-hidden">
      <div className="h-full aspect-square relative">
        <div
          style={{
            backgroundImage: `url('/icons/testimg.png')`,
          }}
          className="absolute inset-0 bg-cover bg-center"
        ></div>
      </div>
      <div className="flex-1 bg-gray-200 px-6 py-3.5">
        <div>
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 sm:w-4 sm:h-4">
              <img
                src="/icons/emptyStar_icon.svg"
                alt="빈별아이콘"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <img
                src="/icons/filledStar_icon.svg"
                alt="꽉찬별아이콘"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  clipPath: `inset(0 ${(1 - rating / 5) * 100}% 0 0)`,
                }}
              />
            </div>
            <span className="text-sm sm:text-xs">3.0 (293)</span>
          </div>

          <h3>함께 배우면 즐거운 스트릿 댄스</h3>
        </div>
        <div></div>
      </div>
    </div>
  );
}
