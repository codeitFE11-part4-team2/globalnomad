import Image from 'next/image';
import React from 'react';
import Minus from '../../../public/icons/icon-minus.svg';
import Plus from '../../../public/icons/icon-plus.svg';

interface ParticipantProps {
  participants: number; // 현재 참가자 수.
  onParticipantsChange: (step: number) => void; // 참가자 수 변경을 처리.
}

const Participant = ({
  participants,
  onParticipantsChange,
}: ParticipantProps) => {
  const handleOnParticipantsChange = (step: number) => {
    onParticipantsChange(step);
  };

  return (
    <div className="w-[120px] h-[40px] flex items-center mt-2 mb-6 rounded-[6px] border border-[#CDD0DC] border-solid ">
      <button
        onClick={() => handleOnParticipantsChange(-1)}
        className="p-[10px]"
      >
        <Image src={Minus} alt="minus" width={20} height={20} />
      </button>
      <input
        type="text"
        value={participants} // 현재 참가자 수를 입력 필드에 표시.
        onChange={(e) =>
          onParticipantsChange(Math.max(1, parseInt(e.target.value)))
        } // 참가자 수가 최소 1이 되도록 설정.
        min="1" // input 속성을 통해 최소값을 1로 제한
        className="w-full h-full p-2 outline-none text-center text-md font-regular"
      />
      <button
        onClick={() => handleOnParticipantsChange(1)}
        className="p-[10px]"
      >
        <Image src={Plus} alt="plus" width={20} height={20} />
      </button>
    </div>
  );
};

export default Participant;
