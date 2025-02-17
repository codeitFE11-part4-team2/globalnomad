import Image from 'next/image';
import Link from 'next/link';

const NoReservations = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Image
        src="/icons/no-reservations.svg" // 적절한 이미지 에셋 필요
        alt="예약 내역 없음"
        width={120}
        height={120}
      />
      <p className="mt-4 text-lg font-medium text-gray-900">
        예약 내역이 없습니다
      </p>
      <p className="mt-2 text-gray-600">
        새로운 체험을 예약하고 특별한 경험을 만들어보세요
      </p>
      <Link
        href="/activities"
        className="mt-6 px-6 py-3 bg-nomad-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      >
        체험 둘러보기
      </Link>
    </div>
  );
};

export default NoReservations;
