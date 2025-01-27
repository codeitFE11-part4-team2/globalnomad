'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePopularActivities } from '@/hooks/usePopularActivities';
import { Activity } from '@/lib/popularactivity/popularactivityTypes';
import { Spinner } from '../common/Spinner';

const ITEMS_PER_PAGE = 3; // 한 페이지에 표시할 체험 수
const PRICE_FORMATTER = new Intl.NumberFormat('ko-KR');

// ActivityCard 컴포넌트: 개별 체험 정보를 표시
interface ActivityCardProps {
  activity: Activity;
}

declare global {
  // 전역 객체 window에 popularActivityRef 속성을 추가
  interface Window {
    popularActivityRef: {
      handleNextPage: () => void;
      handlePrevPage: () => void;
    } | null;
  }
}

// 개별 체험 카드
function ActivityCard({ activity }: ActivityCardProps) {
  const { bannerImageUrl, title, rating, reviewCount, price } = activity;

  return (
    <div className="flex-none w-[186px] md:w-[384px] rounded-[20px] overflow-hidden cursor-pointer">
      <div className="relative h-[186px] md:h-[384px]">
        <Image
          src={bannerImageUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-33.33% to-black/80 to-91.67%">
          <div className="absolute inset-0 flex flex-col justify-end items-start gap-[6px] md:gap-[20px] p-[24px_20px] md:p-[30px_20px]">
            <div className="flex items-center gap-[5px]">
              <Image
                src="/icons/icon-star.svg"
                alt="별점"
                width={18}
                height={18}
              />
              <span className="text-[14px] font-semibold leading-[24px] text-white">
                {rating}
              </span>
              <span className="text-[14px] font-semibold leading-[24px] text-white">
                ({reviewCount})
              </span>
            </div>
            <h3 className="md:text-[32px] text-[18px] font-bold leading-[26px] md:leading-[42px] text-white font-pretendard max-w-[251px] min-h-[52px] md:min-h-[84px] break-keep line-clamp-2">
              {title}
            </h3>
            <p className="font-pretendard">
              <span className="text-[20px] font-bold md:leading-[32px] leading-[26px] text-white">
                ₩ {PRICE_FORMATTER.format(price)}
              </span>
              <span className="text-[14px] font-normal leading-[24px] text-gray-700">
                {' '}
                / 인
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 인기 체험 리스트 컴포넌트
export default function PopularActivity() {
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isFetching, error } = usePopularActivities(page);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg 브레이크포인트
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !isMobile) return;

    const container = containerRef.current;
    const isNearEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 100;

    if (isNearEnd && !isFetching && data?.activities.length === 20) {
      setPage((prev) => prev + 1);
    }
  }, [data?.activities.length, isFetching, isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isMobile]);

  // 다음 페이지로 이동
  const handleNextPage = useCallback(() => {
    const activities = data?.activities || [];
    const totalCount = data?.totalCount || 0;

    if (activities.length > currentIndex + ITEMS_PER_PAGE) {
      setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
    } else if (totalCount > activities.length) {
      setPage((prev) => prev + 1);
      setCurrentIndex(0);
    }
  }, [currentIndex, data]);

  // 이전 페이지로 이동
  const handlePrevPage = useCallback(() => {
    if (currentIndex >= ITEMS_PER_PAGE) {
      setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
    } else if (page > 1) {
      setPage((prev) => prev - 1);
      setCurrentIndex(0);
    }
  }, [currentIndex, page]);

  useEffect(() => {
    window.popularActivityRef = {
      handleNextPage,
      handlePrevPage,
    };

    return () => {
      window.popularActivityRef = null;
    };
  }, [handleNextPage, handlePrevPage]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[384px]">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex justify-center items-center h-[384px] text-red-3">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  // 데이터가 없을 때 처리
  if (!data?.activities || data.activities.length === 0) {
    return (
      <div className="flex justify-center items-center h-[384px]">
        표시할 체험이 없습니다.
      </div>
    );
  }

  const visibleActivities = isMobile
    ? data?.activities || []
    : (data?.activities || []).slice(
        currentIndex,
        currentIndex + ITEMS_PER_PAGE
      );

  return (
    <div
      ref={containerRef}
      className={`flex gap-6 ${
        isMobile ? 'overflow-x-auto scrollbar-hide snap-x snap-mandatory' : ''
      } w-full`}
    >
      {visibleActivities.map((activity) => (
        <div key={activity.id} className={`${isMobile ? 'snap-start' : ''}`}>
          <ActivityCard activity={activity} />
        </div>
      ))}
      {isFetching && (
        <div className="flex justify-center items-center w-[384px]">
          <Spinner className="w-12 h-12" />
        </div>
      )}
    </div>
  );
}
