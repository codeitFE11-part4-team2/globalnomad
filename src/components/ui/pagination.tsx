import React from 'react';
import Image from 'next/image';
import Left from '../../../public/icons/left_active.svg';
import Right from '../../../public/icons/right_active.svg';

interface PaginationProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  const startPage = Math.max(
    Math.min(
      activePageNum - halfVisiblePages,
      totalPageNum - maxVisiblePages + 1
    ),
    1
  );
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPageNum);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center space-x-[10px]">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(activePageNum - 1)}
        className={`flex items-center justify-center rounded-[15px] ${
          activePageNum > 1 ? 'text-green-3' : 'pointer-events-none'
        }`}
        disabled={activePageNum <= 1}
      >
        <Image
          src={Left}
          width={55}
          height={55}
          alt="Previous"
          className={`md:w-[55px] md:h-[55px] w-[40px] h-[40px] ${
            activePageNum > 1 ? 'opacity-100' : 'opacity-50'
          }`}
        />
      </button>

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`md:w-[55px] md:h-[55px] w-[40px] h-[40px] text-2lg font-regular flex items-center justify-center border-[1.5px] border-green-3 rounded-[15px] ${
            activePageNum === page
              ? 'bg-green-3 text-[#ffffff]'
              : 'bg-[#ffffff] text-green-3'
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(activePageNum + 1)}
        className={`flex items-center justify-center rounded-[15px] ${
          activePageNum < totalPageNum ? 'text-green-3' : 'pointer-events-none'
        }`}
        disabled={activePageNum >= totalPageNum}
      >
        <Image
          src={Right}
          width={55}
          height={55}
          alt="Next"
          className={`md:w-[55px] md:h-[55px] w-[40px] h-[40px] ${
            activePageNum < totalPageNum ? 'opacity-100' : 'opacity-50'
          }`}
        />
      </button>
    </div>
  );
}
