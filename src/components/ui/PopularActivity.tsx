'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePopularActivities } from '@/hooks/usePopularActivities';
import { Activity } from '@/lib/popularactivity/popularactivityTypes';
import { Spinner } from '../common/Spinner';

const ITEMS_PER_PAGE = 3; // lg 화면에서 한 페이지에 표시할 체험 수
const PRICE_FORMATTER = new Intl.NumberFormat('ko-KR');

// ActivityCard 컴포넌트의 props 타입 정의
interface ActivityCardProps {
  activity: Activity;
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
interface PopularActivityProps {
  onPrevPage: () => void;
  onNextPage: () => void;
  page: number;
}

export default function PopularActivity({
  onPrevPage,
  onNextPage,
  page,
}: PopularActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastValidData, setLastValidData] = useState<Activity[]>([]);
  const { data, isLoading, isFetching, error } = usePopularActivities(page);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (data?.activities && data.activities.length > 0) {
      setLastValidData(data.activities);
    }
  }, [data]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1440); // lg 브레이크포인트
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

    if (
      isNearEnd &&
      !isFetching &&
      data?.activities.length === ITEMS_PER_PAGE
    ) {
      onNextPage();
    }
  }, [isFetching, isMobile, onNextPage, data?.activities.length]);

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
    } else if (needsNextPage && data?.activities.length === 20) {
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
      setCurrentIndex(17); // 이전 페이지의 마지막 항목들로 이동 (20 - 3)
    }
  }, [currentIndex, page, isMobile, onPrevPage]);

  // 버튼 비활성화 조건
  const isPrevDisabled = isMobile ? page <= 1 : page <= 1 && currentIndex === 0;
  const isNextDisabled = isMobile
    ? !data?.activities || data.activities.length === 0
    : (!data?.activities || data.activities.length < 20) &&
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
            <ActivityCard key={activity.id} activity={activity} />
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
