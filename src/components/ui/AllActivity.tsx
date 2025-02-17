'use client';

import { useState, useEffect } from 'react';
import { Activity } from '@/lib/activity/activity';
import { useActivities } from '@/hooks/useActivities';
import { useWindowSize } from '@/hooks/useWindowSize';
import ActivityCard from './ActivityCard';
import { Spinner } from '../common/Spinner';
import Pagination from './pagination';

interface AllActivityProps {
  selectedCategory: string;
  priceFilter: '낮은순' | '높은순' | '가격';
  searchKeyword: string;
}

// 디바이스 크기에 따른 페이지당 아이템 수 계산
const getItemsPerPage = (windowWidth: number) => {
  if (windowWidth >= 1440) return 8; // lg: 4열 x 2행 = 8개
  if (windowWidth >= 744) return 9; // md: 3열 x 3행 = 9개
  return 4; // 모바일: 2열 x 2행 = 4개
};

//모든 Activity를 그리드로 렌더링
export default function AllActivity({
  selectedCategory,
  priceFilter,
  searchKeyword,
}: AllActivityProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { width: windowWidth } = useWindowSize();
  const itemsPerPage = getItemsPerPage(windowWidth);

  // 전체 데이터를 가져옴 (페이지 크기를 매우 크게 설정)
  // 검색어나 카테고리가 변경될 때 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchKeyword]);

  const { data, isLoading, error } = useActivities(
    1, // 항상 첫 번째 페이지 요청
    100, // 데이터 갯수 요청
    searchKeyword
  );
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!currentPageActivities || currentPageActivities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">해당 카테고리의 체험이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {searchKeyword && (
        <p className="text-black">총 {sortedActivities.length}개의 결과</p>
      )}{' '}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-4 lg:gap-x-6 gap-y-[5px] md:gap-y-8 lg:gap-y-12">
        {currentPageActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isPriority={currentPage === 1 && activity.id <= 4}
          />
        ))}
      </div>
      <div className="mt-[6px] md:mt-[48px]">
        <Pagination
          activePageNum={currentPage}
          totalPageNum={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
