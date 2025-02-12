'use client';

import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { usePopularActivities } from '@/hooks/usePopularActivities';
import { Activity } from '@/lib/popularactivity/popularactivityTypes';
import { Spinner } from '../common/Spinner';
import PopularActivityCard from './PopularActivityCard';

// 상수 정의
const ITEMS_PER_PAGE = 3; // lg 화면에서 한 페이지에 표시할 체험 수
const SCROLL_THRESHOLD = 100; // 스크롤 임계값 (px)
const MAX_ITEMS_PER_REQUEST = 20; // 서버에서 받아오는 최대 아이템 수
const LAST_PAGE_INDEX = MAX_ITEMS_PER_REQUEST - ITEMS_PER_PAGE; // 마지막 페이지 인덱스

// PopularActivity 컴포넌트의 props 타입 정의
interface PopularActivityProps {
  page: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

// 인기 체험 섹션
function PopularActivity({ page, onPrevPage, onNextPage }: PopularActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastValidData, setLastValidData] = useState<Activity[]>([]);
  const { data, isLoading, isFetching, error } = usePopularActivities(page);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowSize();

  const handleScroll = useCallback(() => {
    if (!isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const isNearEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - SCROLL_THRESHOLD;

    if (
      isNearEnd &&
      !isFetching &&
      data?.activities.length === ITEMS_PER_PAGE
    ) {
      onNextPage();
    }
  }, [isFetching, onNextPage, data?.activities.length]);



  useEffect(() => {
    if (data?.activities && data.activities.length > 0) {
      setLastValidData(data.activities);
    }
  }, [data]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isMobile]);

  // 현재 화면에 표시할 체험들을 계산
  const displayedActivities = data?.activities.length
    ? isMobile
      ? data.activities
      : data.activities.slice(currentIndex, currentIndex + ITEMS_PER_PAGE)
    : lastValidData;

  // 다음 페이지 데이터 필요 여부 확인
  const needsNextPage =
    !isMobile &&
    currentIndex + ITEMS_PER_PAGE >= (data?.activities.length || 0);

  // 다음 버튼 클릭 처리
  const handleNext = useCallback(() => {
    if (isMobile) {
      onNextPage();
      return;
    }

    if (currentIndex + ITEMS_PER_PAGE < (data?.activities.length || 0)) {
      // 현재 페이지의 다음 항목들이 있는 경우
      setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
    } else if (needsNextPage && data?.activities.length === MAX_ITEMS_PER_REQUEST) {
      // 다음 페이지 데이터가 필요한 경우
      onNextPage();
      setCurrentIndex(0);
    }
  }, [
    currentIndex,
    data?.activities.length,
    isMobile,
    needsNextPage,
    onNextPage,
  ]);

  // 이전 버튼 클릭 처리
  const handlePrev = useCallback(() => {
    if (isMobile) {
      onPrevPage();
      return;
    }

    if (currentIndex >= ITEMS_PER_PAGE) {
      // 현재 페이지의 이전 항목들로 이동
      setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
    } else if (page > 1) {
      // 이전 페이지로 이동
      onPrevPage();
      setCurrentIndex(LAST_PAGE_INDEX); // 이전 페이지의 마지막 항목들로 이동
    }
  }, [currentIndex, page, isMobile, onPrevPage]);

  // 버튼 비활성화 조건
  const isPrevDisabled = isMobile ? page <= 1 : page <= 1 && currentIndex === 0;
  const isNextDisabled = isMobile
    ? !data?.activities || data.activities.length === 0
    : (!data?.activities || data.activities.length < MAX_ITEMS_PER_REQUEST) &&
      currentIndex + ITEMS_PER_PAGE >= (data?.activities.length || 0);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p>데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="flex items-center justify-between mb-[16px] md:mb-[32px]">
          <div className="flex items-center gap-2">
            <h2 className="md:text-[36px] text-[18px] font-bold text-black leading-[43px] font-pretendard">
              🔥 인기 체험
            </h2>
          </div>
          <div className="flex gap-[8px]">
            <button
              onClick={handlePrev}
              className="hidden lg:block"
              disabled={isPrevDisabled}
            >
              <Image
                src="/icons/icon-arrow-left.svg"
                alt="이전"
                width={44}
                height={44}
                className={isPrevDisabled ? 'opacity-50' : ''}
              />
            </button>
            <button
              onClick={handleNext}
              className="hidden lg:block"
              disabled={isNextDisabled}
            >
              <Image
                src="/icons/icon-arrow-right.svg"
                alt="다음"
                width={44}
                height={44}
                className={isNextDisabled ? 'opacity-50' : ''}
              />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex gap-[16px] overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {displayedActivities.map((activity) => (
            <PopularActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {isFetching && (
          <div className="flex justify-center items-center mt-4">
            <Spinner className="w-12 h-12" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PopularActivity;
