'use client';

import { modalStore } from '@/store/modalStore';
import { useDeleteActivity } from '@/services/MyActivity';

export default function CardModal() {
  const { isOpen, closeModal, modalData } = modalStore();
  const deleteActivity = useDeleteActivity();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await deleteActivity.mutateAsync(modalData);
      closeModal('card');
    } catch (error) {
      console.error('체험 삭제 실패:', error);
      // 에러 처리 (에러 메시지 표시 등)
    }
  };

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
            onClick={handleDelete}
            disabled={deleteActivity.isPending}
          >
            {deleteActivity.isPending ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  );
}
