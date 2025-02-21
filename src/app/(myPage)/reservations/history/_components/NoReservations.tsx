import Image from 'next/image';

export default function NoReservations() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      {/* 빈 페이지 아이콘 */}
      <div className="relative w-16 h-16">
        <Image
          src="/icons/empty.svg"
          alt="빈 페이지"
          fill
          className="object-contain"
        />
      </div>

      {/* 메시지 */}
      <p className="text-gray-800 text-lg font-medium">
        아직 등록한 체험이 없어요
      </p>
    </div>
  );
}
