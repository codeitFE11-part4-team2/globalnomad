import React from 'react';
import Image from 'next/image';
import Left from '../../../public/icons/left.svg';
import LeftActive from '../../../public/icons/left_active.svg';
import Right from '../../../public/icons/right.svg';
import RightActive from '../../../public/icons/right_active.svg';

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
          activePageNum > 1 ? 'text-[#0B3B2D]' : 'pointer-events-none'
        }`}
        disabled={activePageNum <= 1}
      >
        <Image
          src={activePageNum > 1 ? LeftActive : Left}
          width={55}
          height={55}
          alt="Previous"
          className="md:w-[55px] md:h-[55px] w-[40px] h-[40px]"
        />
      </button>

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`lg:w-[48px] lg:h-[48px] w-[34px] h-[34px] lg:text-[18px] text-[16px] flex items-center justify-center border-[1px] border-[#0B3B2D] rounded-[15px] ${
            activePageNum === page
              ? 'bg-[#0B3B2D] text-[#ffffff]'
              : 'bg-[#ffffff] text-[#0B3B2D]'
          } md:w-[55px] md:h-[55px] w-[40px] h-[40px]`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(activePageNum + 1)}
        className={`flex items-center justify-center rounded-[15px] ${
          activePageNum < totalPageNum
            ? 'text-[#0B3B2D]'
            : 'pointer-events-none'
        }`}
        disabled={activePageNum >= totalPageNum}
      >
        <Image
          src={activePageNum < totalPageNum ? RightActive : Right}
          width={55}
          height={55}
          alt="Next"
          className="md:w-[55px] md:h-[55px] w-[40px] h-[40px]"
        />
      </button>
    </div>
  );
}
