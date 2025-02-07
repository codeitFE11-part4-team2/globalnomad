'use client';

import { modalStore } from '@/store/modalStore';
import { Button } from '../common/Button';

export default function PwErrorModal() {
  const { isOpen, closeModal } = modalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[540px] h-[250px] relative flex flex-col justify-center items-center">
        <h2 className="text-2lg font-medium text-center font-pretendard">
          비밀번호가 일치하지 않습니다.
        </h2>
        <div className="absolute bottom-6 right-6">
          <Button
            type="submit"
            variant="nomad-black"
            size="medium"
            onClick={closeModal}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
