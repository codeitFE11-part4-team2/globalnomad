import React from 'react';

interface AvailableTimesProps {
  availableTimes: string[]; // 예약 가능 시간
  selectedTime: string | null; // 현재 선택된 시간
  onTimeChange: (time: string) => void; // 선택된 시간 변경
}

const AvailableTimes = ({
  availableTimes,
  selectedTime,
  onTimeChange,
}: AvailableTimesProps) => {
  return (
    <div>
      {availableTimes.length > 0 ? ( //  예약 가능한 시간이 있는 경우만 버튼 렌더링
        <div>
          {availableTimes.map((time, index) => (
            <button
              key={index}
              onClick={() => onTimeChange(time)}
              className={`w-[117px] h-[46px] flex items-center justify-center border-[1px] border-nomad-black rounded-[8px] text-lg font-medium gap-[12px] ${
                selectedTime === time ? 'bg-nomad-black text-white' : 'bg-white'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-lg font-medium text-center">날짜를 선택해주세요.</p>
      )}
    </div>
  );
};

export default AvailableTimes;
