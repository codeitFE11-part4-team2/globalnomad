'use client';

import { cardModalStore } from '@/store/cardModal';

export default function CardModal() {
  const { isOpen, selectedCardId, closeModal } = cardModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[298px] h-[184px] flex flex-col justify-center gap-4">
        <h2 className="text-xl font-medium text-center">삭제하시겠습니까?</h2>
        <div className="flex justify-center gap-3 mt-4">
          <button
            className="px-4 py-1 rounded-lg text-xl border border-nomad-black text-nomad-black"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="px-4 py-1 bg-nomad-black text-xl text-white rounded-lg"
            onClick={() => {
              closeModal();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
