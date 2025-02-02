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

  return (
    <div>
      <div>
        <h2>후기</h2>
        {totalCount ? (
          <div>
            <span>{averageRating}</span>
            <span>{rating(averageRating)}</span>
            <span>({totalCount}개 후기)</span>
          </div>
        ) : (
          <p>후기가 없습니다.</p>
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
            <div>
              {reviews.map((review) => (
                <div key={review.id}>
                  <div>
                    <Image
                      src={review.user.profileImageUrl}
                      alt={`프로필 이미지`}
                      width={45}
                      height={45}
                    />
                    <div>
                      <p>{review.user.nickname}</p>
                      <p>{format(new Date(review.createdAt), 'yyyy.MM.dd')}</p>
                    </div>
                  </div>
                  <p>{review.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          <Pagination
            totalPageNum={totalPages}
            activePageNum={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewList;
