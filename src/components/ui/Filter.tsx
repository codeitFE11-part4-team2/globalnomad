import { useState, useRef } from 'react';
import Image from 'next/image';
import useOutsideClick from '@/hooks/useOutsideClick';

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('가격');

  const filterRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭을 감지하기 위한 ref 설정

  const filters = ['낮은순', '높은순'];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
    setIsOpen(false);
  };

  //외부 클릭시 드롭다운 닫기
  useOutsideClick(filterRef, () => setIsOpen(false));

  return (
    <div ref={filterRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-[90px] lg:w-[127px] md:w-[120px] h-[41px] md:h-[53px] px-3 lg:px-5 md:px-5 py-4 justify-between items-center border border-green-3 rounded-[15px] bg-white"
      >
        <span
          className={`text-green-3 text-md lg:text-2lg font-medium leading-[26px] ${selectedFilter === '가격' ? 'text-2lg' : 'lg:text-2lg md:text-lg'}`}
        >
          {selectedFilter}
        </span>
        <Image
          src="/icons/icon-filter.svg"
          width="22"
          height="22"
          alt="filter"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운이 열려 있는 경우에만 필터 목록 표시 */}
      {isOpen && (
        <div className="absolute mt-2 w-[90px] lg:w-[127px] md:w-[120px] z-50">
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`flex w-full py-[18px] px-[5px] lg:px-[12px] md:px-[8.5px] justify-center text-gray-900 text-md lg:text-2lg font-medium items-center text-center border border-gray-300 bg-white hover:bg-gray-50
                ${index === 0 ? 'rounded-t-[6px] border-b-0' : ''} 
                ${index === filters.length - 1 ? 'rounded-b-[6px]' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
