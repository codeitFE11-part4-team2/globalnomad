import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Pagination from '@/components/ui/pagination';
import { fetchReviews } from '@/lib/activitydetail/activitydetail';
import {
  ReviewsResponse,
  Review,
} from '@/lib/activitydetail/activitydetailTypes';
import { format } from 'date-fns';
import rating from '@/lib/activitydetail/rating';
import StarIcon from '../../../public/icons/icon-star.svg';

interface ReviewListProps {
  activityId: number;
  pageSize: number;
}

const ReviewList = ({ activityId, pageSize = 3 }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]); // 리뷰 리스트
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지
  const [totalCount, setTotalCount] = useState<number>(0); // 총 리뷰 개수
  const [averageRating, setAverageRating] = useState<number>(0); // 평균 평점
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태

  // 데이터 로드
  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true); // 로딩 시작
      try {
        const data: ReviewsResponse = await fetchReviews(
          activityId,
          currentPage,
          pageSize
        );
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
        setAverageRating(data.averageRating);
      } catch (error) {
        console.error('리뷰 데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    loadReviews();
  }, [activityId, currentPage, pageSize]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 닉네임 첫 글자 가져오기
  const getInitial = (nickname: string) => {
    const firstChar = nickname.charAt(0);
    const isKorean = /^[가-힣]+$/.test(nickname);
    const isAlphabet = /^[a-zA-Z]$/.test(firstChar);

    if (isKorean) {
      return nickname; // 한글은 전체 표시
    } else if (isAlphabet) {
      return firstChar; // 알파벳은 대소문자 그대로 표시
    } else {
      return firstChar.toUpperCase(); // 그 외는 대문자로 표시
    }
  };

  return (
    <div>
      <div>
        <p className="lg:text-2lg text-xl font-bold">후기</p>
        {totalCount ? (
          <div className="flex items-center lg:mt-[24px] mt-[18px] gap-[16px]">
            <p className="text-[50px] font-semibold">
              {averageRating.toFixed(1)}
            </p>
            <div>
              <p className="text-2lg font-regular">{rating(averageRating)}</p>
              <div className="flex items-center gap-[6px]">
                <Image src={StarIcon} alt="별" width={16} height={16} />
                <p className="text-md font-regular">{totalCount}개 후기</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-md font-regular">후기가 없습니다.</p>
        )}
      </div>

      {/* 로딩 상태 처리 */}
      {loading ? (
        <div>
          <p>로딩 중...</p>
        </div>
      ) : (
        <div>
          {/* 리뷰 리스트 */}
          {reviews.length > 0 && (
            <div className="space-y-8 mt-[24px]">
              {reviews.map((review, index) => (
                <div key={review.id}>
                  <div className="flex items-start gap-[16px]">
                    {review.user.profileImageUrl ? (
                      <Image
                        src={review.user.profileImageUrl}
                        alt={`프로필 이미지`}
                        width={45}
                        height={45}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-[#E3E5E8] text-nomad-black rounded-full w-[45px] h-[45px] text-lg font-bold overflow-hidden">
                        {getInitial(review.user.nickname)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-[8px]">
                        <p className="text-lg font-bold">
                          {review.user.nickname}
                        </p>
                        <p className="text-md font-regular">|</p>
                        <p className="text-md font-bold text-gray-600">
                          {format(new Date(review.createdAt), 'yyyy.MM.dd')}
                        </p>
                      </div>
                      <p className="text-lg font-regular mt-[8px]">
                        {review.content}
                      </p>
                    </div>
                  </div>
                  {index < reviews.length - 1 && (
                    <hr className="w-full lg:h-[0.5px] h-[1px] opacity-25 border-t-[1px] border-nomad-black mt-[24px] mb-[24px]" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {totalCount > 3 && (
            <div className="lg:mt-[72px] md:mt-[90px] mt-[40px]">
              <Pagination
                totalPageNum={totalPages}
                activePageNum={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
