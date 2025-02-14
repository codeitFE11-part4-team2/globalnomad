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
      <label className="block text-black text-2xl font-bold mt-6">주소</label>
      <input
        type="text"
        placeholder="주소를 입력해주세요"
        value={address}
        readOnly
        onClick={() => openModal('address')}
        className="w-full h-14 border border-gray-800 rounded-md px-4 mt-4 focus:outline-none"
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
