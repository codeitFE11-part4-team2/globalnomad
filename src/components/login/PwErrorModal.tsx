'use client';

import { modalStore } from '@/store/modalStore';
import { Button } from '../common/Button';

export default function PwErrorModal() {
  const { isOpen, closeModal } = modalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[327px] h-[220px] relative flex flex-col justify-center items-center
      md:w-[540px] md:h-[250px]
      "
      >
        <h2
          className="text-lg font-medium text-center font-pretendard mb-10
        md:text-2lg md:mb-[0px]
        "
        >
          비밀번호가 일치하지 않습니다.
        </h2>
        <div
          className="absolute bottom-6 right-50 
        md:right-[20px]
        "
        >
          <Button
            type="submit"
            variant="nomad-black"
            size="medium"
            onClick={() => closeModal('pwerror')}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
