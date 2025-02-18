'use client';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function CancelModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: CancelModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백드롭(반투명 검은 배경) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="relative bg-white rounded-2xl w-full max-w-[400px] mx-4 p-6">
        <div className="flex flex-col items-center">
          {/* Icon */}
          체크모양 아이콘 예정
          {/* Title */}
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            예약을 취소하시겠습니까?
          </h2>
          {/* Buttons */}
          <div className="flex gap-2 w-full mt-6">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              아니오
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3 text-sm font-medium text-white bg-red-3 rounded-lg hover:bg-red-4"
            >
              {isLoading ? '취소 중...' : '취소하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
