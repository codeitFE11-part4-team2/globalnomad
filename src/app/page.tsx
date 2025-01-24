'use client';

import { useState } from 'react';
import Image from 'next/image';
import Footer from '@/components/common/Footer';
import Category from '@/components/ui/Category';
import Filter from '@/components/ui/Filter';
import SearchBar from '@/components/ui/SearchBar';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // TODO : 여기서 선택된 카테고리에 따라 리스트를 필터링
  };

  return (
    <div className="relative bg-gray-100">
      {/* 메인 배너 섹션 */}
      <section className="relative w-full lg:h-[550px] md:h-[550px] h-[240px]">
        <Image
          src="/images/img-main-banner.png"
          alt="메인 배너 이미지"
          fill
          priority
          className="object-cover"
        />
        {/* 배너 내용 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.40) 100%)',
          }}
        >
          <div className="max-w-[1200px] mx-auto h-full px-4 md:px-8 lg:px-0">
            <div className="flex flex-col justify-center h-full font-pretendard">
              <h1 className="lg:text-[68px] md:text-[54px] text-[24px] font-bold lg:leading-[81px] md:leading-[64px] leading-[29px] text-white">
                함께 배우면 즐거운
                <br /> 스트릿 댄스
              </h1>

              <p className="lg:text-2xl md:text-[20px] text-[14px] font-bold text-white mt-2 lg:mt-5 font-pretendard">
                1월의 인기 체험 BEST 🔥
              </p>
            </div>
          </div>
          {/* 검색바 */}
          <div className="absolute w-full flex justify-center md:-bottom-[120px] -bottom-[72px] px-4 md:px-6 lg:px-0">
            <div className="w-[1200px]">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      {/* 여백 추가 (검색바가 겹치는 부분만큼) */}
      <div className="h-[154px]" />
      <div className="max-w-[1200px] mx-auto">
        <Category onSelectCategory={handleCategorySelect} />
        <Filter
          onFilterChange={(filter) => {
            // TODO : 선택된 필터 값으로 정렬
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
