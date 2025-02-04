'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface FilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

// Outside click 훅
const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export const ReservationFilter = ({
  selectedStatus,
  onStatusChange,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const statuses = [
    { label: '전체', value: 'all' },
    { label: '예약 승인', value: 'confirmed' },
    { label: '예약 취소', value: 'canceled' },
    { label: '예약 거절', value: 'declined' },
    { label: '체험 완료', value: 'completed' },
  ];

  // 현재 선택된 라벨
  const selectedLabel =
    statuses.find((status) => status.value === selectedStatus)?.label || '전체';

  useOutsideClick(filterRef, () => setIsOpen(false));

  const handleStatusClick = (value: string) => {
    onStatusChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={filterRef} className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-40 px-4 py-2 border border-nomad-black rounded-lg bg-white flex items-center justify-between text-sm text-nomad-black focus:outline-none"
      >
        <span>{selectedLabel}</span>
        <Image
          src="/icons/icon-filter.svg"
          width={16}
          height={16}
          alt="filter"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-40 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {statuses.map((status, index) => (
            <button
              key={status.value}
              onClick={() => handleStatusClick(status.value)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50
                ${status.value === selectedStatus ? 'bg-gray-50' : ''}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === statuses.length - 1 ? 'rounded-b-lg' : ''}
              `}
            >
              {status.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
