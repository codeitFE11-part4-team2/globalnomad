'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-col max-w-[1200px] h-[178px] px-6 py-8 rounded-2xl bg-white shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)]">
      <div className="flex gap-5 flex-col self-stretch">
        <label className="text-nomad-black sm:text-lg md:text-xl font-bold leading-[32px] self-stretch">
          무엇을 체험하고 싶으신가요?
        </label>
        <div className="flex gap-3 items-start">
          <div className="relative flex-1">
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="
                w-full
                rounded
                border border-gray-500
                bg-white
                px-12 py-[14px]
                text-lg
                focus:outline-none
                focus:border-gray-900
              "
              />
              <span
                className={`absolute left-14 transition-all duration-200 pointer-events-none
                ${
                  isFocused || inputValue
                    ? '-top-3 left-[44px] text-lg bg-white px-2 text-gray-600'
                    : 'top-1/2 -translate-y-1/2 text-[14px] md:text-[16px] text-gray-500'
                }`}
              >
                내가 원하는 체험은
              </span>
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Image
                  src="/icons/icon-search.svg"
                  alt="검색"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="
              flex justify-center items-center
              h-[56px]
              md:px-10 py-2
              px-5
              gap-1
              rounded
              bg-nomad-black
              text-white
              text-lg font-bold leading-[26px]
              hover:bg-opacity-90
            "
          >
            검색하기
          </button>
        </div>
      </div>{' '}
    </div>
  );
}
