import React from 'react';
import Participant from '@/components/activitydetail/Participant';
import Image from 'next/image';
import x from '../../../public/icons/icon-x.svg';
import { Button } from '../common/Button';

interface ParticipantSelectionModalProps {
  participants: number;
  onParticipantsChange: (step: number) => void;
  closeModal: () => void;
}

const ParticipantSelectionModal = ({
  participants,
  onParticipantsChange,
  closeModal,
}: ParticipantSelectionModalProps) => {
  return (
    <div className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 md:rounded-[24px] md:w-[480px] md:h-[400px] w-full h-full">
        <p className="text-[28px] font-bold">인원 선택</p>
        <p className="mt-[39px] mb-[24px] text-xl font-medium">
          예약할 인원을 선택해주세요.
        </p>
        <button
          onClick={closeModal}
          className="absolute right-[24px] top-[28px] flex items-center justify-center"
        >
          <Image src={x} alt="x" width={40} height={40} />
        </button>
        <Participant
          participants={participants}
          onParticipantsChange={onParticipantsChange}
        />
        <div className="flex items-center justify-center">
          <Button onClick={closeModal} className="mt-[32px] w-[432px] h-[56px]">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantSelectionModal;
