'use client';
import { modalStore } from '@/store/modalStore';
import AddressModal from './AddressModal';

export default function AddressInput({
  address,
  setAddress,
}: {
  address: string;
  setAddress: (address: string) => void;
}) {
  const { isOpen, modalType, openModal, closeModal } = modalStore();

  return (
    <>
      <label className="mt-6 block text-[20px] font-bold text-black md:text-2xl">주소</label>
      <input
        type="text"
        placeholder="주소를 입력해주세요"
        value={address}
        readOnly
        onClick={() => openModal('address')}
        className="mt-4 h-14 w-full rounded-md border border-[#A1A1A1] px-4 focus:outline-none"
      />
      {isOpen && modalType === 'address' && (
        <AddressModal
          onComplete={(data) => {
            setAddress(data.address);
            closeModal('address');
          }}
        />
      )}
    </>
  );
}
