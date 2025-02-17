'use client';

import { useState, useCallback } from 'react';
import { usePopularActivities } from '@/hooks/usePopularActivities';
import { useSearchActivities } from '@/hooks/useSearchActivities';
import Image from 'next/image';
import Footer from '@/components/common/Footer';
import Category from '@/components/ui/Category';
import Filter from '@/components/ui/Filter';
import SearchBar from '@/components/ui/SearchBar';
import PopularActivity from '@/components/ui/PopularActivity';
import AllActivity from '@/components/ui/AllActivity';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [priceFilter, setPriceFilter] = useState<'낮은순' | '높은순' | '가격'>(
    '가격'
  );
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const [popularActivityPage, setPopularActivityPage] = useState(1);
  const { data: popularData, isFetching } =
    usePopularActivities(popularActivityPage);

  const handlePrevPage = useCallback(() => {
    if (isFetching) return; // 데이터 로딩 중에는 페이지 변경 방지
    setPopularActivityPage((prev) => Math.max(prev - 1, 1));
  }, [isFetching]);

  const handleNextPage = useCallback(() => {
    setPopularActivityPage((prev) => {
      // 데이터가 없거나 마지막 페이지인 경우 현재 페이지 유지
      if (!popularData?.activities || popularData.activities.length === 0) {
        return prev;
      }
      return prev + 1;
    });
  }, [popularData?.activities]);

  const handleSearchAction = async (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const { data, isLoading } = useSearchActivities(
    searchKeyword,
    selectedCategory
  );

  return (
    <div className="relative bg-gray-100">
      {/* 메인 배너 섹션 */}
      <section className="relative w-full lg:h-[550px] md:h-[550px] h-[240px]">
        <Image
          src="/images/img-main-banner.png"
          alt="메인 배너"
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
              <SearchBar onSearchAction={handleSearchAction} />
            </div>
          </div>
        </div>
      </section>
      {/* 여백 추가 (검색바가 겹치는 부분만큼) */}
      <div className="lg:h-[158px] md:h-[142px] h-[93px]" />
      <div className="max-w-[1200px] mx-auto pl-4 md:pl-6 lg:px-0">
        {!searchKeyword && (
          <PopularActivity
            page={popularActivityPage}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        )}
      </div>
      <div
        className={`max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 ${
          searchKeyword ? 'md:h-[40px] h-[24px]' : 'pb-[0px]'
        }`}
      >
        <div
          className={
            searchKeyword
              ? 'flex justify-between items-center md:mb-[32px] mb-[24px]'
              : 'flex items-center justify-between gap-6 relative pt-[40px] pb-[24px] md:pt-[60px] md:pb-[35px]'
          }
        >
          {!searchKeyword && (
            <Category
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          )}
          <div className="absolute right-[90px] md:right-[120px] lg:right-[127px] w-[60px] h-[41px] md:h-[58px] flex-shrink-0 bg-gradient-to-l from-[#FAFBFC] via-[rgba(250,251,252,0.8)] to-transparent" />

          {!searchKeyword && (
            <Filter
              onFilterChange={(filter) => {
                setPriceFilter(filter as '낮은순' | '높은순' | '가격');
                setPopularActivityPage(1); // 필터 변경 시 1페이지로 리셋
              }}
            />
          )}
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 pb-[64px]">
        <div className="flex justify-between items-center md:mb-[32px] mb-[24px]">
          {searchKeyword ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] md:text-[32px] font-pretendard leading-[26px]">
                <span className="text-black font-bold">{searchKeyword}</span>
                <span className="text-black font-normal">
                  {' '}
                  으로 검색한 결과입니다.
                </span>
              </h2>
            </div>
          ) : (
            <h2 className="md:text-[36px] text-[18px] font-bold leading-[43px] text-black font-pretendard">
              {selectedCategory === '전체' ? '🛼 모든 체험' : selectedCategory}
            </h2>
          )}
        </div>
        <AllActivity
          selectedCategory={selectedCategory}
          priceFilter={priceFilter}
          searchKeyword={searchKeyword}
        />
      </div>
      <Footer />
    </div>
  );
}
