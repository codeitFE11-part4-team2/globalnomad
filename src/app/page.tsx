'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Footer from '@/components/common/Footer';
import Category from '@/components/ui/Category';
import Filter from '@/components/ui/Filter';
import SearchBar from '@/components/ui/SearchBar';
import PopularActivity from '@/components/ui/PopularActivity';
import AllActivity from '@/components/ui/AllActivity';
import { useActivities } from '@/hooks/useActivities';
import Pagination from '@/components/ui/pagination';
import { usePopularActivities } from '@/hooks/usePopularActivities';
import { Spinner } from '@/components/common/Spinner';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [popularActivityPage, setPopularActivityPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState<'낮은순' | '높은순' | '가격'>('가격');
  const { data: popularData, isFetching } =
    usePopularActivities(popularActivityPage);

  useEffect(() => {
    setWindowWidth(window.innerWidth); // 첫 렌더링 시 창 너비를 설정
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 디바이스 크기에 따라 페이지당 아이템 수 계산
  const getItemsPerPage = () => {
    if (windowWidth >= 1440) return 8; // lg: 4열 x 2행 = 8개
    if (windowWidth >= 744) return 9; // md: 3열 x 3행 = 9개
    return 4; // 모바일: 2열 x 2행 = 4개
  };

  const itemsPerPage = getItemsPerPage();

  // 전체 데이터를 가져옴 (페이지 크기를 매우 크게 설정)
  const { data, isLoading, error } = useActivities(1, 1000);
  const activities = data?.activities || [];

  // 선택된 카테고리에 해당하는 활동만 필터링
  const filteredActivities = activities.filter((activity) => {
    if (selectedCategory === '전체') return true;
    return activity.category === selectedCategory;
  });

  // 가격 필터 적용
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (priceFilter === '낮은순') {
      return a.price - b.price;
    }
    if (priceFilter === '높은순') {
      return b.price - a.price;
    }
    // 기본 정렬 (최신순)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // 현재 페이지에 해당하는 데이터만 선택
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageActivities = sortedActivities.slice(startIndex, endIndex);

  // 필터링된 전체 데이터 개수를 기반으로 totalPages 계산
  const totalPages = Math.ceil(sortedActivities.length / itemsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 1페이지로 리셋
  };

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-12 h-12" />
      </div>
    );
  if (error) return <div>에러가 발생했습니다.</div>;

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
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      {/* 여백 추가 (검색바가 겹치는 부분만큼) */}
      <div className="lg:h-[158px] md:h-[142px] h-[93px]" />
      <div className="max-w-[1200px] mx-auto pl-4 md:pl-6 lg:px-0">
        <PopularActivity
          page={popularActivityPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-0 pt-[40px] pb-[24px] md:pt-[60px] md:pb-[35px]">
        <div className="flex items-center justify-between gap-6 relative">
          <Category
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
          <div className="absolute right-[90px] md:right-[120px] lg:right-[127px] w-[60px] h-[41px] md:h-[58px] flex-shrink-0 bg-gradient-to-l from-[#FAFBFC] via-[rgba(250,251,252,0.8)] to-transparent" />

          <Filter
            onFilterChange={(filter) => {
              setPriceFilter(filter as '낮은순' | '높은순' | '가격');
              setCurrentPage(1); // 필터 변경 시 1페이지로 리셋
            }}
          />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 pb-[64px]">
        <div className="flex justify-between items-center md:mb-[32px] mb-[24px]">
          <h2 className="md:text-[36px] text-[18px] font-bold leading-[43px] text-black font-pretendard">
            {selectedCategory === '전체' ? '🛼 모든 체험' : selectedCategory}
          </h2>
        </div>
        <AllActivity
          activities={currentPageActivities}
          selectedCategory={selectedCategory}
        />
      </div>
      <Pagination
        totalPageNum={totalPages}
        activePageNum={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
      <Footer />
    </div>
  );
}
