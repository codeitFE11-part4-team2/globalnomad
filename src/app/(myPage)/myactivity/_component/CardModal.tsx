'use client';

import { modalStore } from '@/store/modalStore';

export default function CardModal() {
  const { isOpen, closeModal } = modalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[298px] h-[184px] flex flex-col justify-center gap-4">
        <h2 className="text-xl font-medium text-center">삭제하시겠습니까?</h2>
        <div className="flex justify-center gap-3 mt-4">
          <button
            className="px-4 py-1 rounded-lg text-xl border border-nomad-black text-nomad-black"
            onClick={() => closeModal('card')}
          >
            취소
          </button>
          <button
            className="px-4 py-1 bg-nomad-black text-xl text-white rounded-lg"
            onClick={() => {
              closeModal('card');
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
