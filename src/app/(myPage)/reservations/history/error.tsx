'use client';

interface ErrorProps {
  error: Error;
  reset: () => void; // Next.js가 제공하는 페이지 리셋 함수
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-xl font-bold">예약 내역을 불러오는데 실패했습니다</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
