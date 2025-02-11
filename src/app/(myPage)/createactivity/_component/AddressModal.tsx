'use client';
import ReactDOM from 'react-dom';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { useEffect } from 'react';
import { modalStore } from '@/store/modalStore';

interface Props {
  onComplete: (data: Address) => void;
}

export default function AddressModal({ onComplete }: Props) {
  const { closeModal } = modalStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white md:w-[450px] p-4 rounded-md">
        <DaumPostcode
          onComplete={(data) => {
            onComplete(data);
            closeModal('address');
          }}
        />
        <button
          className="mt-2 w-full bg-red-500 text-white py-2 rounded"
          onClick={() => closeModal('address')}
        >
          닫기
        </button>
      </div>
    </div>,
    document.body
  );
}
